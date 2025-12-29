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
    }
}
