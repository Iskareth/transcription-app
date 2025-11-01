export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      transcriptions: {
        Row: {
          id: string
          user_id: string
          video_url: string
          platform: 'tiktok' | 'instagram'
          title: string | null
          transcript: string | null
          audio_url: string | null
          duration_seconds: number | null
          status: 'processing' | 'completed' | 'failed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          video_url: string
          platform: 'tiktok' | 'instagram'
          title?: string | null
          transcript?: string | null
          audio_url?: string | null
          duration_seconds?: number | null
          status?: 'processing' | 'completed' | 'failed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          video_url?: string
          platform?: 'tiktok' | 'instagram'
          title?: string | null
          transcript?: string | null
          audio_url?: string | null
          duration_seconds?: number | null
          status?: 'processing' | 'completed' | 'failed'
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Convenience type for a transcription row
export type Transcription = Database['public']['Tables']['transcriptions']['Row']

