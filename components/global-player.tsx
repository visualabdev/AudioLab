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
  MoreHorizontal,
  ChevronUp,
  List
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { usePlayerStore } from '@/lib/player-store'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { toast } from '@/lib/toast'

export function GlobalPlayer() {
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
    playTrack,
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
    toggleShuffle
  } = usePlayerStore()

  const audioRef = useRef<HTMLAudioElement>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  // Audio element management
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
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
      if (isPlaying) {
        audio.play().catch(console.error)
      }
    }

    const handleError = () => {
      setIsLoading(false)
      toast.error('Error al cargar el audio')
    }

    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('error', handleError)

    // Load new track
    if (currentTrack.audio_url) {
      audio.src = currentTrack.audio_url
      audio.load()
    }

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('error', handleError)
    }
  }, [currentTrack, repeatMode, nextTrack, setDuration, setCurrentTime, setIsLoading, isPlaying])

  // Play/pause control
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play().catch(console.error)
    } else {
      audio.pause()
    }
  }, [isPlaying])

  // Volume control
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  // Seek control
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (Math.abs(audio.currentTime - currentTime) > 1) {
      audio.currentTime = currentTime
    }
  }, [currentTime])

  const handlePlayPause = () => {
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

  if (!currentTrack) return null

  return (
    <>
      {/* Audio element */}
      <audio ref={audioRef} preload="metadata" />
      
      {/* Player UI */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border shadow-2xl transition-all duration-300",
        isExpanded ? "h-96" : "h-20"
      )}>
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
                  <Play className="w-6 h-6 text-white" />
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
              {repeatMode === 'one' && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
              )}
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

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <ChevronUp className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-180")} />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0">
          <Slider
            value={[progressPercentage]}
            onValueChange={handleSeek}
            max={100}
            step={0.1}
            className="w-full h-1 bg-transparent"
          />
        </div>

        {/* Time Display */}
        <div className="absolute top-1 left-4 right-4 flex justify-between text-xs text-muted-foreground pointer-events-none">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Expanded View */}
        {isExpanded && (
          <div className="p-6 pt-2 h-76 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Track Details */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted">
                    {currentTrack.cover_image_url ? (
                      <Image
                        src={currentTrack.cover_image_url}
                        alt={currentTrack.title}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg">{currentTrack.title}</h3>
                    <p className="text-muted-foreground">{currentTrack.artist}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {currentTrack.genre}
                      </span>
                      {currentTrack.bpm && (
                        <span className="text-xs bg-muted px-2 py-1 rounded">
                          {currentTrack.bpm} BPM
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {currentTrack.description && (
                  <p className="text-sm text-muted-foreground">
                    {currentTrack.description}
                  </p>
                )}
              </div>

              {/* Right: Queue */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold flex items-center">
                    <List className="w-4 h-4 mr-2" />
                    Cola de Reproducción
                  </h4>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  <div className="text-center py-8 text-muted-foreground">
                    <List className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">La cola de reproducción aparecerá aquí</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}