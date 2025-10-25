"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, ShoppingCart, Music, DollarSign } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import Image from "next/image"
import type { Track } from "@/lib/types"
import { useTracksStore } from "@/lib/tracks-store"

interface TrackGridProps {
  tracks: Track[]
}

export function TrackGrid({ tracks }: TrackGridProps) {
  const [playingTrack, setPlayingTrack] = useState<string | null>(null)
  const { addItem } = useCartStore()

  const handlePlay = (trackId: string) => {
    if (playingTrack === trackId) {
      setPlayingTrack(null)
    } else {
      setPlayingTrack(trackId)
      // Aquí iría la lógica real de reproducción de audio
      setTimeout(() => setPlayingTrack(null), 30000) // Auto-stop después de 30s
    }
  }

  const handleAddToCart = (track: Track) => {
    addItem(track)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "beat":
        return "from-violet-500 to-purple-600"
      case "sample":
        return "from-cyan-500 to-blue-600"
      case "midi":
        return "from-pink-500 to-rose-600"
      default:
        return "from-primary to-secondary"
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "beat":
        return "Beat"
      case "sample":
        return "Sample"
      case "midi":
        return "MIDI"
      default:
        return category
    }
  }

  if (tracks.length === 0) {
    return (
      <div className="text-center py-16">
        <Music className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-2xl font-semibold mb-2">No hay contenido disponible</h3>
        <p className="text-muted-foreground">
          Pronto agregaremos más contenido a esta sección.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tracks.map((track) => (
        <Card key={track.id} className="glass-card border-primary/20 shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 group">
          <CardContent className="p-0">
            {/* Cover Image */}
            <div className="relative aspect-square overflow-hidden rounded-t-lg">
              <Image
                src={track.cover_image_url || "/placeholder.svg"}
                alt={track.title}
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  size="icon"
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${getCategoryColor(track.category)} hover:scale-110 transition-transform shadow-lg`}
                  onClick={() => handlePlay(track.id)}
                >
                  {playingTrack === track.id ? (
                    <Pause className="h-8 w-8 text-white" />
                  ) : (
                    <Play className="h-8 w-8 text-white ml-1" />
                  )}
                </Button>
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <Badge className={`bg-gradient-to-r ${getCategoryColor(track.category)} text-white border-0`}>
                  {getCategoryLabel(track.category)}
                </Badge>
              </div>

              {/* Featured Badge */}
              {track.is_featured && (
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-yellow-500/90 text-black border-0">
                    Destacado
                  </Badge>
                </div>
              )}
            </div>

            {/* Track Info */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-1 line-clamp-1">{track.title}</h3>
                <p className="text-sm text-muted-foreground">{track.artist}</p>
              </div>

              {/* Track Details */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
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

              {/* Description */}
              {track.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {track.description}
                </p>
              )}

              {/* Price and Add to Cart */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="text-xl font-bold text-primary">
                    {track.price.toFixed(2)}
                  </span>
                </div>
                <Button
                  onClick={() => handleAddToCart(track)}
                  className={`bg-gradient-to-r ${getCategoryColor(track.category)} hover:opacity-90 text-white border-0`}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Agregar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}