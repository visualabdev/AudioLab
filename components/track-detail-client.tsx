"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { AudioPlayer } from "@/components/audio-player"
import { useTracksStore } from "@/lib/tracks-store"
import { Play, ShoppingCart, Music, Clock, Zap, Download, Shield } from "lucide-react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { useCartStore } from "@/lib/cart-store"
import Link from "next/link"

export function TrackDetailClient({ id }: { id: string }) {
  const { getTrackById, tracks } = useTracksStore()
  const track = getTrackById(id)
  const [currentTrack, setCurrentTrack] = useState(track || null)
  const { addItem } = useCartStore()

  if (!track) {
    notFound()
  }

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
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-24 pb-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Track image */}
            <div className="space-y-6">
              <div className="relative aspect-square rounded-lg overflow-hidden group border border-primary/20">
                <Image
                  src={track.cover_image_url || "/placeholder.svg"}
                  alt={track.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Button
                  size="icon"
                  onClick={() => setCurrentTrack(track)}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-20 w-20 rounded-full bg-primary hover:bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Play className="h-10 w-10 fill-white" />
                </Button>
              </div>

              {/* Tags */}
              {track.tags && track.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {track.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Track details */}
            <div className="space-y-6">
              {track.is_featured && <Badge className="bg-primary text-white">Featured Track</Badge>}

              <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl font-bold text-balance">{track.title}</h1>
                <p className="text-xl text-muted-foreground">{track.artist}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="text-sm">
                  <Music className="h-4 w-4 mr-2" />
                  {track.genre}
                </Badge>
                {track.bpm && (
                  <Badge variant="outline" className="text-sm">
                    <Zap className="h-4 w-4 mr-2" />
                    {track.bpm} BPM
                  </Badge>
                )}
                {track.key && (
                  <Badge variant="outline" className="text-sm">
                    {track.key}
                  </Badge>
                )}
                {track.duration && (
                  <Badge variant="outline" className="text-sm">
                    <Clock className="h-4 w-4 mr-2" />
                    {formatDuration(track.duration)}
                  </Badge>
                )}
              </div>

              {track.description && (
                <p className="text-muted-foreground text-balance leading-relaxed">{track.description}</p>
              )}

              <div className="space-y-4 pt-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">${track.price.toFixed(2)}</span>
                  <span className="text-sm text-muted-foreground">one-time payment</span>
                </div>

                <div className="flex gap-3">
                  <Button onClick={handleAddToCart} size="lg" className="flex-1 bg-primary hover:bg-primary/90">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => setCurrentTrack(track)}>
                    <Play className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* License info */}
              <Card className="p-6 bg-card/50 border-primary/20">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  What's Included
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-primary" />
                    High-quality WAV & MP3 files
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Royalty-free license for commercial use
                  </li>
                  <li className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-primary" />
                    Instant download after purchase
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Lifetime access to your purchase
                  </li>
                </ul>
              </Card>
            </div>
          </div>

          {/* Similar tracks section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Similar Tracks</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tracks
                .filter((t) => t.id !== track.id && t.genre === track.genre)
                .slice(0, 3)
                .map((similarTrack) => (
                  <Link key={similarTrack.id} href={`/track/${similarTrack.id}`}>
                    <Card className="overflow-hidden group cursor-pointer hover:border-primary/50 transition-all">
                      <div className="relative aspect-square">
                        <Image
                          src={similarTrack.cover_image_url || "/placeholder.svg"}
                          alt={similarTrack.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="font-semibold line-clamp-1">{similarTrack.title}</h3>
                        <p className="text-sm text-muted-foreground">{similarTrack.artist}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">${similarTrack.price.toFixed(2)}</span>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AudioPlayer track={currentTrack} onClose={() => setCurrentTrack(null)} />
    </div>
  )
}
