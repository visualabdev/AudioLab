"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, X } from "lucide-react"
import Image from "next/image"
import type { Track } from "@/lib/types"

interface AudioPlayerProps {
  track: Track | null
  onClose: () => void
}

export function AudioPlayer({ track, onClose }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [hasError, setHasError] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    if (track && audioRef.current) {
      setHasError(false)
      audioRef.current.load()
      setCurrentTime(0)
      setIsPlaying(false)
    }
  }, [track])

  const handleError = () => {
    console.log("[v0] Audio failed to load:", track?.audio_url)
    setHasError(true)
    setIsPlaying(false)
  }

  const togglePlay = () => {
    if (audioRef.current && !hasError) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch((err) => {
          console.log("[v0] Play failed:", err)
          setHasError(true)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    setIsMuted(value[0] === 0)
  }

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume
        setIsMuted(false)
      } else {
        audioRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (!track) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50 backdrop-blur-xl">
      <audio
        ref={audioRef}
        src={track.audio_url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        onError={handleError}
      />

      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-3">
          {hasError && (
            <div className="text-xs text-yellow-500 text-center py-1 bg-yellow-500/10 rounded">
              Preview no disponible - El archivo de audio se agregará después de la compra
            </div>
          )}

          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-12 text-right">{formatTime(currentTime)}</span>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="flex-1"
              disabled={hasError}
            />
            <span className="text-xs text-muted-foreground w-12">{formatTime(duration)}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="relative h-12 w-12 rounded overflow-hidden flex-shrink-0">
                <Image
                  src={track.cover_image_url || "/placeholder.svg"}
                  alt={track.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-semibold text-sm truncate">{track.title}</h4>
                <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8" disabled={hasError}>
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                onClick={togglePlay}
                size="icon"
                className="h-10 w-10 bg-primary hover:bg-primary/90"
                disabled={hasError}
              >
                {isPlaying ? <Pause className="h-5 w-5 fill-white" /> : <Play className="h-5 w-5 fill-white" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" disabled={hasError}>
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-3 flex-1 justify-end">
              <div className="hidden md:flex items-center gap-2 w-32">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleMute}>
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <Slider value={[isMuted ? 0 : volume]} max={1} step={0.01} onValueChange={handleVolumeChange} />
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
