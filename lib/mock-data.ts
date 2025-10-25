import type { Track, Stem } from "./types"

export const mockTracks: Track[] = [
  {
    id: "1",
    title: "Midnight Dreams",
    artist: "AudioLab",
    genre: "Hip Hop",
    bpm: 140,
    key: "C Minor",
    price: 29.99,
    description: "Dark and atmospheric hip hop beat with haunting melodies",
    is_featured: true,
    category: "beat",
    cover_image_url: "/placeholder.svg",
    audio_url: "/audio/midnight-dreams.mp3",
    created_at: "2025-01-20"
  },
  {
    id: "2",
    title: "Summer Vibes",
    artist: "AudioLab",
    genre: "Pop",
    bpm: 120,
    key: "G Major",
    price: 24.99,
    description: "Uplifting pop beat perfect for summer anthems",
    is_featured: true,
    category: "beat",
    cover_image_url: "/placeholder.svg",
    audio_url: "/audio/summer-vibes.mp3",
    created_at: "2025-01-19"
  },
  {
    id: "3",
    title: "Electronic Dreams",
    artist: "AudioLab",
    genre: "Electronic",
    bpm: 128,
    key: "A Minor",
    price: 27.99,
    description: "Futuristic electronic beat with synth leads",
    is_featured: false,
    category: "beat",
    cover_image_url: "/placeholder.svg",
    audio_url: "/audio/electronic-dreams.mp3",
    created_at: "2025-01-18"
  },
  {
    id: "4",
    title: "Trap Energy",
    artist: "AudioLab",
    genre: "Trap",
    bpm: 150,
    key: "F# Minor",
    price: 34.99,
    description: "High-energy trap beat with heavy 808s",
    is_featured: true,
    category: "beat",
    cover_image_url: "/placeholder.svg",
    audio_url: "/audio/trap-energy.mp3",
    created_at: "2025-01-17"
  },
  {
    id: "5",
    title: "Lo-Fi Chill",
    artist: "AudioLab",
    genre: "Lo-Fi",
    bpm: 85,
    key: "D Major",
    price: 19.99,
    description: "Relaxing lo-fi beat for study sessions",
    is_featured: false,
    category: "sample",
    cover_image_url: "/placeholder.svg",
    audio_url: "/audio/lofi-chill.mp3",
    created_at: "2025-01-16"
  },
  {
    id: "6",
    title: "Piano Melody",
    artist: "AudioLab",
    genre: "Classical",
    bpm: 90,
    key: "C Major",
    price: 15.99,
    description: "Beautiful piano melody MIDI file",
    is_featured: false,
    category: "midi",
    cover_image_url: "/placeholder.svg",
    audio_url: "/audio/piano-melody.mid",
    created_at: "2025-01-15"
  }
]

export const mockStems: Stem[] = [
  {
    id: "1",
    track_id: "1",
    name: "Drums",
    type: "drums",
    audio_url: "/stems/midnight-dreams-drums.wav"
  },
  {
    id: "2",
    track_id: "1",
    name: "Bass",
    type: "bass",
    audio_url: "/stems/midnight-dreams-bass.wav"
  },
  {
    id: "3",
    track_id: "1",
    name: "Melody",
    type: "melody",
    audio_url: "/stems/midnight-dreams-melody.wav"
  }
]