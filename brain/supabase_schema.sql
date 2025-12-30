-- PUBLICRECORD.FYI SUPABASE SCHEMA
-- This script sets up the required tables, indexes, and RPC functions.

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Submissions Table
CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    official_name TEXT NOT NULL,
    title TEXT NOT NULL,
    state TEXT NOT NULL,
    date DATE NOT NULL,
    description TEXT,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'general',
    magnet_uri TEXT,
    ipfs_cid TEXT,
    thumbnail_url TEXT,
    extracted_text TEXT,
    vote_count INTEGER DEFAULT 0,
    report_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    download_count INTEGER DEFAULT 0,
    client_fingerprint TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Votes Table (To prevent double voting)
CREATE TABLE IF NOT EXISTS public.votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID REFERENCES public.submissions(id) ON DELETE CASCADE,
    client_fingerprint TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(submission_id, client_fingerprint)
);

-- 4. RPC Functions for Atomic Increments

-- Increment View Count
CREATE OR REPLACE FUNCTION public.increment_view_count(row_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.submissions
    SET view_count = view_count + 1
    WHERE id = row_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Increment Report Count
CREATE OR REPLACE FUNCTION public.increment_report_count(row_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.submissions
    SET report_count = report_count + 1
    WHERE id = row_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Increment Download Count
CREATE OR REPLACE FUNCTION public.increment_download_count(row_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.submissions
    SET download_count = download_count + 1
    WHERE id = row_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Vote Submission (Atomic record and count)
CREATE OR REPLACE FUNCTION public.vote_submission(sub_id UUID, fp TEXT)
RETURNS void AS $$
BEGIN
    INSERT INTO public.votes (submission_id, client_fingerprint)
    VALUES (sub_id, fp);
    
    UPDATE public.submissions
    SET vote_count = vote_count + 1
    WHERE id = sub_id;
EXCEPTION WHEN unique_violation THEN
    -- User already voted, do nothing
    NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Indexes for Performance
CREATE INDEX IF NOT EXISTS submissions_state_idx ON public.submissions(state);
CREATE INDEX IF NOT EXISTS submissions_category_idx ON public.submissions(category);
CREATE INDEX IF NOT EXISTS submissions_created_at_idx ON public.submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS submissions_vote_count_idx ON public.submissions(vote_count DESC);
CREATE INDEX IF NOT EXISTS votes_submission_id_idx ON public.votes(submission_id);

-- 6. Storage Policy (Assumption: Public read, Anon write if allowed)
-- Note: These are usually managed via Supabase Dashboard UI, but documented here.
-- INSERT INTO storage.buckets (id, name, public) VALUES ('submissions', 'submissions', true);
