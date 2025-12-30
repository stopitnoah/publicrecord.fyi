export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            submissions: {
                Row: {
                    id: string
                    official_name: string
                    title: string
                    state: string
                    date: string
                    description: string | null
                    file_url: string
                    file_type: string
                    vote_count: number
                    report_count: number
                    view_count: number
                    created_at: string
                    client_fingerprint: string | null
                    category: string
                    magnet_uri: string | null
                    ipfs_cid: string | null
                    thumbnail_url: string | null
                    extracted_text: string | null
                    download_count: number
                }
                Insert: {
                    id?: string
                    official_name: string
                    title: string
                    state: string
                    date: string
                    description?: string | null
                    file_url: string
                    file_type: string
                    vote_count?: number
                    report_count?: number
                    view_count?: number
                    created_at?: string
                    client_fingerprint?: string | null
                    category?: string
                    magnet_uri?: string | null
                    ipfs_cid?: string | null
                    thumbnail_url?: string | null
                    extracted_text?: string | null
                    download_count?: number
                }
                Update: {
                    id?: string
                    official_name?: string
                    title?: string
                    state?: string
                    date?: string
                    description?: string | null
                    file_url?: string
                    file_type?: string
                    vote_count?: number
                    report_count?: number
                    view_count?: number
                    created_at?: string
                    client_fingerprint?: string | null
                    category?: string
                    magnet_uri?: string | null
                    ipfs_cid?: string | null
                    thumbnail_url?: string | null
                    extracted_text?: string | null
                    download_count?: number
                }
            }
            votes: {
                Row: {
                    id: string
                    submission_id: string
                    client_fingerprint: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    submission_id: string
                    client_fingerprint: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    submission_id?: string
                    client_fingerprint?: string
                    created_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            increment_view_count: {
                Args: {
                    row_id: string
                }
                Returns: void
            }
            increment_report_count: {
                Args: {
                    row_id: string
                }
                Returns: void
            }
            increment_download_count: {
                Args: {
                    row_id: string
                }
                Returns: void
            }
            vote_submission: {
                Args: {
                    sub_id: string
                    fp: string
                }
                Returns: void
            }
        }
        Enums: {
            [_ in never]: never
        }
    }
}
