"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, ShoppingCart, Clock, Music, Info } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Track } from "@/lib/types"
import { useCartStore } from "@/lib/cart-store"

interface TrackCardProps {
  track: Track
  onPlay: (track: Track) => void
}

export function TrackCard({ track, onPlay }: TrackCardProps) {
  const { addItem } = useCartStore()

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "0:00"
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAddToCart = () => {
    addItem(track)
  }

  return (
    <Card className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={track.cover_image_url || "/placeholder.svg"}
          alt={track.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            onClick={() => onPlay(track)}
            className="h-16 w-16 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
          >
            <Play className="h-8 w-8 fill-white" />
          </Button>
        </div>

        {/* Duration badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full glass text-xs font-medium">
          <Clock className="h-3 w-3" />
          {formatDuration(track.duration)}
        </div>

        {/* Featured badge */}
        {track.is_featured && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary text-white">Featured</Badge>
          </div>
        )}
      </div>

      <div className="p-5 space-y-4">
        <div className="space-y-2">
          <h3 className="font-bold text-xl text-balance group-hover:text-primary transition-colors line-clamp-1">
            {track.title}
          </h3>
          <p className="text-sm text-muted-foreground">{track.artist}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="text-xs">
            <Music className="h-3 w-3 mr-1" />
            {track.genre}
          </Badge>
          {track.bpm && (
            <Badge variant="outline" className="text-xs">
              {track.bpm} BPM
            </Badge>
          )}
          {track.key && (
            <Badge variant="outline" className="text-xs">
              {track.key}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 gap-2">
          <div className="text-2xl font-bold text-primary">${track.price.toFixed(2)}</div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="icon" className="h-9 w-9 bg-transparent">
              <Link href={`/track/${track.id}`}>
                <Info className="h-4 w-4" />
              </Link>
            </Button>
            <Button onClick={handleAddToCart} className="bg-primary hover:bg-primary/90">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Buy
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
