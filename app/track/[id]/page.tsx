'use client'

import { useParams } from 'next/navigation'
import { useTracksStore } from '@/lib/tracks-store'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AudioPlayer } from '@/components/audio-player'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ShoppingCart, Heart, Share2, Download, Music, Clock, DollarSign } from 'lucide-react'
import { useCartStore } from '@/lib/cart-store'
import { toast } from '@/lib/toast'
import Image from 'next/image'
import Link from 'next/link'

export default function TrackPage() {
  const params = useParams()
  const trackId = params.id as string
  const { getTrackById } = useTracksStore()
  const { addItem } = useCartStore()
  
  const track = getTrackById(trackId)

  const handleAddToCart = () => {
    if (!track) return
    
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: track?.title,
        text: `Escucha "${track?.title}" por ${track?.artist}`,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Enlace copiado al portapapeles')
    }
  }

  if (!track) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Track no encontrado</h1>
            <p className="text-muted-foreground mb-8">
              El track que buscas no existe o ha sido eliminado.
            </p>
            <Button asChild>
              <Link href="/catalog">Volver al Catálogo</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
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

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">Inicio</Link>
              <span>/</span>
              <Link href="/catalog" className="hover:text-foreground">Catálogo</Link>
              <span>/</span>
              <span className="text-foreground">{track.title}</span>
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Image and Player */}
            <div className="space-y-6">
              {/* Cover Image */}
              <div className="aspect-square relative overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={track.cover_image_url || '/placeholder.svg'}
                  alt={track.title}
                  fill
                  className="object-cover"
                />
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(track.category)} text-white text-sm font-semibold`}>
                  {track.category.toUpperCase()}
                </div>
                {track.is_featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-yellow-500 text-black text-sm font-semibold">
                    DESTACADO
                  </div>
                )}
              </div>

              {/* Audio Player */}
              {track.audio_url && (
                <Card>
                  <CardContent className="p-6">
                    <AudioPlayer
                      src={track.audio_url}
                      title={track.title}
                      artist={track.artist}
                      showWaveform={true}
                    />
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Track Info */}
            <div className="space-y-8">
              {/* Track Header */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-black">{track.title}</h1>
                <p className="text-xl text-muted-foreground">por {track.artist}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-sm">
                    <Music className="w-3 h-3 mr-1" />
                    {track.genre}
                  </Badge>
                  {track.bpm && (
                    <Badge variant="outline" className="text-sm">
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
                      <Clock className="w-3 h-3 mr-1" />
                      {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Description */}
              {track.description && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Descripción</h3>
                  <p className="text-muted-foreground leading-relaxed">{track.description}</p>
                </div>
              )}

              {/* Tags */}
              {track.tags && track.tags.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {track.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Price and Actions */}
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Precio</p>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-6 h-6 text-primary" />
                        <span className="text-3xl font-bold text-primary">{track.price.toFixed(2)}</span>
                      </div>
                    </div>
                    {track.exclusive && (
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                        EXCLUSIVO
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button 
                      onClick={handleAddToCart}
                      className={`bg-gradient-to-r ${getCategoryColor(track.category)} hover:opacity-90 text-white`}
                      size="lg"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Agregar al Carrito
                    </Button>
                    
                    <Button variant="outline" size="lg">
                      <Heart className="w-4 h-4 mr-2" />
                      Favoritos
                    </Button>
                  </div>

                  <Button 
                    variant="ghost" 
                    onClick={handleShare}
                    className="w-full"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartir Track
                  </Button>
                </CardContent>
              </Card>

              {/* License Info */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold">Información de Licencia</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Uso comercial permitido</p>
                    <p>• Créditos requeridos al artista</p>
                    <p>• No reventa del instrumental</p>
                    <p>• Descarga inmediata tras la compra</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Ver Licencia Completa
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Tracks */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Tracks Relacionados</h2>
            <div className="text-center py-8 text-muted-foreground">
              <Music className="w-12 h-12 mx-auto mb-4" />
              <p>Próximamente: tracks similares y recomendaciones</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}