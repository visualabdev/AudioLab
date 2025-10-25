export interface Track {
  id: string
  title: string
  artist: string
  genre: string
  bpm?: number
  key?: string
  price: number
  description?: string
  tags?: string[]
  is_featured: boolean
  exclusive?: boolean
  license?: "basic" | "premium" | "exclusive"
  category: "beat" | "sample" | "midi"
  cover_image_url?: string
  audio_url?: string
  duration?: number
  created_at?: string
}

export interface Stem {
  id: string
  track_id: string
  name: string
  type: "drums" | "bass" | "melody" | "vocals" | "other"
  audio_url: string
}

export interface Purchase {
  id: string
  track_id: string
  buyer_email: string
  buyer_name: string
  amount: number
  status: "completed" | "pending" | "failed"
  transaction_id: string
  created_at: string
}