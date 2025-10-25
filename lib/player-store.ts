import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Track } from './types'

export interface PlayerState {
  // Current track info
  currentTrack: Track | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
  isLoading: boolean
  
  // Queue management
  queue: Track[]
  currentIndex: number
  isShuffled: boolean
  repeatMode: 'none' | 'one' | 'all'
  
  // Actions
  playTrack: (track: Track) => void
  pauseTrack: () => void
  resumeTrack: () => void
  stopTrack: () => void
  nextTrack: () => void
  previousTrack: () => void
  seekTo: (time: number) => void
  setVolume: (volume: number) => void
  toggleMute: () => void
  setDuration: (duration: number) => void
  setCurrentTime: (time: number) => void
  setIsLoading: (loading: boolean) => void
  addToQueue: (track: Track) => void
  removeFromQueue: (index: number) => void
  clearQueue: () => void
  toggleShuffle: () => void
  toggleRepeat: () => void
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentTrack: null,
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      volume: 1,
      isMuted: false,
      isLoading: false,
      queue: [],
      currentIndex: -1,
      isShuffled: false,
      repeatMode: 'none',

      // Actions
      playTrack: (track) => {
        const state = get()
        
        // If it's the same track, just resume
        if (state.currentTrack?.id === track.id) {
          set({ isPlaying: true })
          return
        }
        
        // Add to queue if not already there
        const existingIndex = state.queue.findIndex(t => t.id === track.id)
        let newQueue = [...state.queue]
        let newIndex = existingIndex
        
        if (existingIndex === -1) {
          newQueue.push(track)
          newIndex = newQueue.length - 1
        }
        
        set({
          currentTrack: track,
          isPlaying: true,
          currentTime: 0,
          queue: newQueue,
          currentIndex: newIndex,
          isLoading: true
        })
      },

      pauseTrack: () => {
        set({ isPlaying: false })
      },

      resumeTrack: () => {
        set({ isPlaying: true })
      },

      stopTrack: () => {
        set({
          isPlaying: false,
          currentTime: 0
        })
      },

      nextTrack: () => {
        const state = get()
        if (state.queue.length === 0) return
        
        let nextIndex = state.currentIndex + 1
        
        // Handle repeat modes
        if (nextIndex >= state.queue.length) {
          if (state.repeatMode === 'all') {
            nextIndex = 0
          } else {
            return // End of queue
          }
        }
        
        const nextTrack = state.queue[nextIndex]
        if (nextTrack) {
          set({
            currentTrack: nextTrack,
            currentIndex: nextIndex,
            currentTime: 0,
            isLoading: true
          })
        }
      },

      previousTrack: () => {
        const state = get()
        if (state.queue.length === 0) return
        
        let prevIndex = state.currentIndex - 1
        
        if (prevIndex < 0) {
          if (state.repeatMode === 'all') {
            prevIndex = state.queue.length - 1
          } else {
            return // Beginning of queue
          }
        }
        
        const prevTrack = state.queue[prevIndex]
        if (prevTrack) {
          set({
            currentTrack: prevTrack,
            currentIndex: prevIndex,
            currentTime: 0,
            isLoading: true
          })
        }
      },

      seekTo: (time) => {
        set({ currentTime: time })
      },

      setVolume: (volume) => {
        set({ volume, isMuted: volume === 0 })
      },

      toggleMute: () => {
        const state = get()
        set({ isMuted: !state.isMuted })
      },

      setDuration: (duration) => {
        set({ duration, isLoading: false })
      },

      setCurrentTime: (currentTime) => {
        set({ currentTime })
      },

      setIsLoading: (isLoading) => {
        set({ isLoading })
      },

      addToQueue: (track) => {
        const state = get()
        const exists = state.queue.find(t => t.id === track.id)
        if (!exists) {
          set({ queue: [...state.queue, track] })
        }
      },

      removeFromQueue: (index) => {
        const state = get()
        const newQueue = state.queue.filter((_, i) => i !== index)
        let newIndex = state.currentIndex
        
        if (index < state.currentIndex) {
          newIndex = state.currentIndex - 1
        } else if (index === state.currentIndex) {
          newIndex = -1
          set({ currentTrack: null, isPlaying: false })
        }
        
        set({ queue: newQueue, currentIndex: newIndex })
      },

      clearQueue: () => {
        set({
          queue: [],
          currentIndex: -1,
          currentTrack: null,
          isPlaying: false
        })
      },

      toggleShuffle: () => {
        set({ isShuffled: !get().isShuffled })
      },

      toggleRepeat: () => {
        const state = get()
        const modes: Array<'none' | 'one' | 'all'> = ['none', 'one', 'all']
        const currentModeIndex = modes.indexOf(state.repeatMode)
        const nextMode = modes[(currentModeIndex + 1) % modes.length]
        set({ repeatMode: nextMode })
      }
    }),
    {
      name: 'player-storage',
      partialize: (state) => ({
        volume: state.volume,
        isMuted: state.isMuted,
        isShuffled: state.isShuffled,
        repeatMode: state.repeatMode,
        queue: state.queue,
        currentIndex: state.currentIndex,
        currentTrack: state.currentTrack
      })
    }
  )
)