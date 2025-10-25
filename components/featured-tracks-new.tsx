"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, ShoppingCart, Clock, Music, TrendingUp, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTracksStore } from "@/lib/tracks-store"
import { usePlayerStore } from "@/lib/player-store"
import { useCartStore } from "@/lib/cart-store"
import { toast } from "@/lib/toast"

export function FeaturedTracksNew() {
  const [isClient, setIsClient] = useState(false)
  const { getFeaturedTracks } = useTracksStore()
  const { playTrack, pauseTrack, currentTrack, isPlaying } = usePlayerStore()
  const { addItem } = useCartStore()
  
  const featuredTracks = getFeaturedTracks()

  useEffect(() => {
    setIsClient(true)
  }, [])
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handlePlay = (track: any) => {
    if (!isClient) return
    
    if (currentTrack?.id === track.id && isPlaying) {
      pauseTrack()
    } else {
      playTrack(track)
    }
  }

  const handleAddToCart = (track: any, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!isClient) return
    
    addItem({
      id: track.id,
      title: track.title,
      artist: track.artist,
      price: track.price,
      category: track.category as 'beats' | 'samples' | 'midis',
      image: track.cover_image_url,
      license: 'basic'
    })

    toast.success(`${track.title} agregado al carrito`)
  }

  // Show placeholder if no tracks are available
  if (!isClient) {
    return <div className="py-32"><div className="container mx-auto px-4 text-center">Cargando tracks destacados...</div></div>
  }

  if (featuredTracks.length === 0) {
    return (
      <section id="featured" className="py-32 relative">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Tracks Destacados</h2>
          <p className="text-muted-foreground mb-8">No hay tracks destacados disponibles aún.</p>
          <p className="text-sm text-muted-foreground">Los administradores pueden agregar tracks desde el panel de administración.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="featured" className="py-32 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-6 mb-16">
          <Badge variant="outline" className="border-primary/30 text-primary px-4 py-2 text-sm font-semibold">
            <TrendingUp className="h-4 w-4 mr-2 inline" />
            Colección Destacada
          </Badge>
          <h2 className="text-5xl md:text-6xl font-black text-balance">
            <span className="bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Beats en Tendencia
            </span>{" "}
            <span className="animate-gradient-text">Esta Semana</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            Selección cuidadosa de nuestros instrumentales más populares y de mayor calidad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTracks.slice(0, 6).map((track) => (
            <Card
              key={track.id}
              className="group overflow-hidden glass-card border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={track.cover_image_url || ""}
                  alt={track.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Button
                    size="icon"
                    className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-2xl shadow-primary/50 animate-pulse-glow"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handlePlay(track)
                    }}
                  >
                    <Play className="h-10 w-10 fill-white" />
                  </Button>
                </div>

                {/* Duration badge */}
                {track.duration && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-xs font-semibold backdrop-blur-md">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    {formatDuration(track.duration)}
                  </div>
                )}

                {/* Trending indicator */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary to-secondary text-xs font-bold text-white shadow-lg">
                  <TrendingUp className="h-3.5 w-3.5 inline mr-1" />
                  HOT
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div className="space-y-2">
                  <h3 className="font-bold text-2xl text-balance group-hover:text-primary transition-colors leading-tight">
                    {track.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">{track.artist}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs font-semibold px-3 py-1">
                    <Music className="h-3 w-3 mr-1" />
                    {track.genre}
                  </Badge>
                  {track.bpm && (
                    <Badge variant="outline" className="text-xs font-semibold px-3 py-1 border-primary/20">
                      {track.bpm} BPM
                    </Badge>
                  )}
                  {track.key && (
                    <Badge variant="outline" className="text-xs font-semibold px-3 py-1 border-secondary/20">
                      {track.key}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <div className="text-3xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    ${track.price.toFixed(2)}
                  </div>
                  <Button
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg shadow-primary/30 font-semibold"
                    onClick={(e) => handleAddToCart(track, e)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Agregar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-primary/30 hover:bg-primary/10 bg-transparent backdrop-blur-sm px-8 py-6 text-lg font-semibold group"
          >
            <Link href="/catalog">
              Ver Todos los Tracks
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}