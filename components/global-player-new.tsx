'use client'

import { useEffect, useRef, useState } from 'react'
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Repeat, 
  Shuffle,
  Heart,
  ChevronUp,
  Music,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { usePlayerStore } from '@/lib/player-store'
import { AudioStorage } from '@/lib/audio-storage'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function GlobalPlayerNew() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isLoading,
    repeatMode,
    isShuffled,
    pauseTrack,
    resumeTrack,
    nextTrack,
    previousTrack,
    seekTo,
    setVolume,
    toggleMute,
    setDuration,
    setCurrentTime,
    setIsLoading,
    toggleRepeat,
    toggleShuffle,
    stopTrack
  } = usePlayerStore()

  const audioRef = useRef<HTMLAudioElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Audio management
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentTrack || !isClient) return

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0)
      setIsLoading(false)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0
        audio.play()
      } else {
        nextTrack()
      }
    }

    const handleCanPlay = () => {
      setIsLoading(false)
    }

    const handleError = (e: Event) => {
      setIsLoading(false)
      console.warn('⚠️ No se pudo cargar el audio:', currentTrack.audio_url)
      console.info('💡 Solución: Usa el botón "Limpiar Datos" en /admin para eliminar archivos inválidos')
      // Stop playing if there's an error
      pauseTrack()
    }

    const handleLoadStart = () => {
      setIsLoading(true)
    }

    // Add listeners
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('error', handleError)
    audio.addEventListener('loadstart', handleLoadStart)

    // Load track with error handling
    if (currentTrack.audio_url) {
      try {
        const audioUrl = currentTrack.audio_url
        
        console.log('🎵 Intentando cargar audio:', {
          track: currentTrack.title,
          url: audioUrl,
          esBlobURL: AudioStorage.isBlobURL(audioUrl)
        })
        
        // Validate audio file extension
        const validExtensions = ['.mp3', '.wav', '.flac', '.ogg', '.m4a']
        const isValidAudioFile = validExtensions.some(ext => 
          audioUrl.toLowerCase().includes(ext)
        ) || audioUrl.startsWith('blob:')
        
        if (!isValidAudioFile) {
          console.warn('⚠️ Archivo no reproducible:', audioUrl)
          console.info('💡 Los archivos MIDI no se pueden reproducir en navegadores')
          setIsLoading(false)
          pauseTrack()
          return
        }
        
        // Check if it's a blob URL and if it's still valid
        if (audioUrl.startsWith('blob:')) {
          fetch(audioUrl, { method: 'HEAD' })
            .then(() => {
              audio.src = audioUrl
              audio.load()
            })
            .catch(() => {
              console.error('Blob URL is no longer valid:', audioUrl)
              setIsLoading(false)
              pauseTrack()
            })
        } else {
          audio.src = audioUrl
          audio.load()
        }
      } catch (error) {
        console.error('Error setting audio source:', error)
        setIsLoading(false)
        pauseTrack()
      }
    }

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('loadstart', handleLoadStart)
    }
  }, [currentTrack, isClient])

  // Play/pause control
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !isClient || !currentTrack?.audio_url) return

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error('Error playing audio:', error)
        pauseTrack()
        setIsLoading(false)
      })
    } else {
      audio.pause()
    }
  }, [isPlaying, isClient, currentTrack])

  // Volume control
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !isClient) return

    audio.volume = isMuted ? 0 : volume
  }, [volume, isMuted, isClient])

  // Seek control
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !isClient) return

    if (Math.abs(audio.currentTime - currentTime) > 1) {
      audio.currentTime = currentTime
    }
  }, [currentTime, isClient])

  const handlePlayPause = () => {
    if (!currentTrack?.audio_url) {
      console.warn('No audio URL available')
      return
    }
    
    if (isPlaying) {
      pauseTrack()
    } else {
      resumeTrack()
    }
  }

  const handleSeek = (value: number[]) => {
    const newTime = (value[0] / 100) * duration
    seekTo(newTime)
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0] / 100)
  }

  const formatTime = (time: number) => {
    if (!time || !isFinite(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0

  if (!isClient || !currentTrack) return null

  return (
    <>
      <audio ref={audioRef} preload="metadata" />
      
      <div className={cn(
        "fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border shadow-2xl transition-all duration-300",
        isExpanded ? "h-96" : "h-20"
      )}>
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0">
          <Slider
            value={[progressPercentage]}
            onValueChange={handleSeek}
            max={100}
            step={0.1}
            className="w-full h-1"
          />
        </div>

        {/* Main Player Bar */}
        <div className="flex items-center justify-between px-4 py-3 h-20">
          {/* Track Info */}
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              {currentTrack.cover_image_url ? (
                <Image
                  src={currentTrack.cover_image_url}
                  alt={currentTrack.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Music className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
            
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-sm truncate">{currentTrack.title}</h4>
              <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
            </div>

            <Button variant="ghost" size="sm" className="flex-shrink-0">
              <Heart className="w-4 h-4" />
            </Button>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleShuffle}
              className={cn(isShuffled && "text-primary")}
            >
              <Shuffle className="w-4 h-4" />
            </Button>
            
            <Button variant="ghost" size="sm" onClick={previousTrack}>
              <SkipBack className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={handlePlayPause}
              disabled={isLoading}
              className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white ml-0.5" />
              )}
            </Button>
            
            <Button variant="ghost" size="sm" onClick={nextTrack}>
              <SkipForward className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleRepeat}
              className={cn(repeatMode !== 'none' && "text-primary")}
            >
              <Repeat className="w-4 h-4" />
            </Button>
          </div>

          {/* Volume & Expand */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={toggleMute}>
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume * 100]}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="w-20"
              />
            </div>

            <div className="text-xs text-muted-foreground">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <ChevronUp className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-180")} />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={stopTrack}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Expanded View */}
        {isExpanded && (
          <div className="p-6 pt-2 border-t border-border">
            <div className="text-center">
              <h3 className="font-bold text-lg mb-2">{currentTrack.title}</h3>
              <p className="text-muted-foreground mb-4">{currentTrack.artist}</p>
              {currentTrack.description && (
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  {currentTrack.description}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}