import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Track } from './types'

interface TracksStore {
  tracks: Track[]
  addTrack: (track: Omit<Track, 'id' | 'created_at'>) => void
  updateTrack: (id: string, track: Partial<Track>) => void
  deleteTrack: (id: string) => void
  getTracksByCategory: (category: 'beat' | 'sample' | 'midi') => Track[]
  getFeaturedTracks: () => Track[]
  resetTracks: () => void
}

// Datos iniciales (se pueden eliminar después)
const initialTracks: Track[] = [
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
  },
  {
    id: "7",
    title: "Drum Loop Pack",
    artist: "AudioLab",
    genre: "Hip Hop",
    bpm: 140,
    key: "",
    price: 12.99,
    description: "Collection of hard-hitting drum loops",
    is_featured: true,
    category: "sample",
    cover_image_url: "/placeholder.svg",
    audio_url: "/audio/drum-loop-pack.wav",
    created_at: "2025-01-14"
  },
  {
    id: "8",
    title: "Bass Samples",
    artist: "AudioLab",
    genre: "Electronic",
    bpm: 128,
    key: "E Minor",
    price: 18.99,
    description: "Deep bass samples for electronic music",
    is_featured: false,
    category: "sample",
    cover_image_url: "/placeholder.svg",
    audio_url: "/audio/bass-samples.wav",
    created_at: "2025-01-13"
  },
  {
    id: "9",
    title: "Vocal Chops",
    artist: "AudioLab",
    genre: "Pop",
    bpm: 120,
    key: "C Major",
    price: 22.99,
    description: "Processed vocal chops and harmonies",
    is_featured: true,
    category: "sample",
    cover_image_url: "/placeholder.svg",
    audio_url: "/audio/vocal-chops.wav",
    created_at: "2025-01-12"
  },
  {
    id: "10",
    title: "Chord Progressions",
    artist: "AudioLab",
    genre: "Pop",
    bpm: 120,
    key: "G Major",
    price: 14.99,
    description: "Catchy chord progressions MIDI pack",
    is_featured: true,
    category: "midi",
    cover_image_url: "/placeholder.svg",
    audio_url: "/audio/chord-progressions.mid",
    created_at: "2025-01-11"
  },
  {
    id: "11",
    title: "Trap Melodies",
    artist: "AudioLab",
    genre: "Trap",
    bpm: 150,
    key: "F# Minor",
    price: 16.99,
    description: "Dark trap melodies and arpeggios",
    is_featured: false,
    category: "midi",
    cover_image_url: "/placeholder.svg",
    audio_url: "/audio/trap-melodies.mid",
    created_at: "2025-01-10"
  },
  {
    id: "12",
    title: "Jazz Chords",
    artist: "AudioLab",
    genre: "Jazz",
    bpm: 100,
    key: "Bb Major",
    price: 19.99,
    description: "Sophisticated jazz chord progressions",
    is_featured: false,
    category: "midi",
    cover_image_url: "/placeholder.svg",
    audio_url: "/audio/jazz-chords.mid",
    created_at: "2025-01-09"
  },
  {
    id: "13",
    title: "Electronic Arps",
    artist: "AudioLab",
    genre: "Electronic",
    bpm: 128,
    key: "A Minor",
    price: 17.99,
    description: "Energetic electronic arpeggios",
    is_featured: true,
    category: "midi",
    cover_image_url: "/placeholder.svg",
    audio_url: "/audio/electronic-arps.mid",
    created_at: "2025-01-08"
  }
]

export const useTracksStore = create<TracksStore>()(
  persist(
    (set, get) => ({
      tracks: initialTracks,
      
      addTrack: (trackData) => {
        const newTrack: Track = {
          ...trackData,
          id: Date.now().toString(),
          created_at: new Date().toISOString().split('T')[0]
        }
        set((state) => ({
          tracks: [...state.tracks, newTrack]
        }))
      },
      
      updateTrack: (id, updates) => {
        set((state) => ({
          tracks: state.tracks.map(track =>
            track.id === id ? { ...track, ...updates } : track
          )
        }))
      },
      
      deleteTrack: (id) => {
        set((state) => ({
          tracks: state.tracks.filter(track => track.id !== id)
        }))
      },
      
      getTracksByCategory: (category) => {
        return get().tracks.filter(track => track.category === category)
      },
      
      getFeaturedTracks: () => {
        return get().tracks.filter(track => track.is_featured)
      },
      
      resetTracks: () => {
        set({ tracks: initialTracks })
      }
    }),
    {
      name: 'audiolab-tracks'
    }
  )
)