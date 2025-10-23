export interface Track {
  id: string
  title: string
  artist: string
  genre: string
  category?: "beat" | "sample" | "midi"
  bpm: number | null
  key: string | null
  price: number
  description: string | null
  audio_url: string
  cover_image_url: string | null
  duration: number | null
  tags: string[] | null
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface Purchase {
  id: string
  track_id: string
  buyer_email: string
  buyer_name: string | null
  amount: number
  paypal_transaction_id: string | null
  status: "pending" | "completed" | "failed"
  download_count: number
  created_at: string
}

export interface AdminUser {
  id: string
  email: string
  name: string | null
  created_at: string
}

export interface TrackWithPurchaseCount extends Track {
  purchase_count?: number
}

export interface Stem {
  id: string
  track_id: string | null
  original_filename: string
  vocals_url: string | null
  drums_url: string | null
  bass_url: string | null
  other_url: string | null
  status: "processing" | "completed" | "failed"
  error_message: string | null
  created_at: string
  updated_at: string
}
