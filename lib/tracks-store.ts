import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Track } from './types'

interface TracksStore {
  tracks: Track[]
  addTrack: (track: Omit<Track, 'id' | 'created_at'>) => void
  updateTrack: (id: string, track: Partial<Track>) => void
  deleteTrack: (id: string) => void
  getTrackById: (id: string) => Track | undefined
  getTracksByCategory: (category: 'beat' | 'sample' | 'midi') => Track[]
  getFeaturedTracks: () => Track[]
  resetTracks: () => void
  clearAllData: () => void
}

// Tracks iniciales vacíos - se llenarán con contenido real subido por el usuario
const initialTracks: Track[] = []

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
        
        console.log('➕ Agregando track al store:', {
          id: newTrack.id,
          titulo: newTrack.title,
          audio_url: newTrack.audio_url,
          categoria: newTrack.category
        })
        
        set((state) => ({
          tracks: [...state.tracks, newTrack]
        }))
        
        console.log('✅ Track agregado exitosamente. Total tracks:', get().tracks.length)
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
      
      getTrackById: (id) => {
        return get().tracks.find(track => track.id === id)
      },
      
      getTracksByCategory: (category) => {
        return get().tracks.filter(track => track.category === category)
      },
      
      getFeaturedTracks: () => {
        return get().tracks.filter(track => track.is_featured)
      },
      
      resetTracks: () => {
        set({ tracks: initialTracks })
      },
      
      clearAllData: () => {
        set({ tracks: [] })
        // Clear localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('audiolab-tracks')
          // Also clear audio files from IndexedDB
          import('./audio-storage').then(({ AudioStorage }) => {
            AudioStorage.clearAllAudioFiles().catch(console.error)
          })
        }
      }
    }),
    {
      name: 'audiolab-tracks'
    }
  )
)