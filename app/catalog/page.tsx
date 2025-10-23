"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TrackFilters, type FilterState } from "@/components/track-filters"
import { TrackCard } from "@/components/track-card"
import { AudioPlayer } from "@/components/audio-player"
import { mockTracks } from "@/lib/mock-data"
import type { Track } from "@/lib/types"
import { Music } from "lucide-react"

export default function CatalogPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    genre: "all",
    minPrice: 0,
    maxPrice: 100,
    sortBy: "newest",
  })
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)

  const beatTracks = useMemo(() => {
    return mockTracks.filter((track) => track.category === "beat")
  }, [])

  const filteredTracks = useMemo(() => {
    let tracks = [...beatTracks]

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      tracks = tracks.filter(
        (track) =>
          track.title.toLowerCase().includes(searchLower) ||
          track.artist.toLowerCase().includes(searchLower) ||
          track.genre.toLowerCase().includes(searchLower) ||
          track.tags?.some((tag) => tag.toLowerCase().includes(searchLower)),
      )
    }

    // Genre filter
    if (filters.genre !== "all") {
      tracks = tracks.filter((track) => track.genre === filters.genre)
    }

    // Price filter
    tracks = tracks.filter((track) => track.price >= filters.minPrice && track.price <= filters.maxPrice)

    // Sort
    switch (filters.sortBy) {
      case "newest":
        tracks.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case "oldest":
        tracks.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        break
      case "price-low":
        tracks.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        tracks.sort((a, b) => b.price - a.price)
        break
      case "popular":
        // For now, featured tracks first
        tracks.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0))
        break
    }

    return tracks
  }, [beatTracks, filters])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-32">
        <div className="container mx-auto px-4">
          <div className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500/10 via-purple-500/10 to-violet-600/10 p-12 border border-violet-500/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.1),transparent)]" />
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-violet-500/20 backdrop-blur-sm border border-violet-500/30">
                  <Music className="w-8 h-8 text-violet-400" />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                  Beats
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl text-balance">
                Instrumentales profesionales listos para usar. Descarga instantánea con licencia libre de regalías y
                calidad de estudio garantizada.
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20">
                  <Music className="w-4 h-4 text-violet-400" />
                  <span className="text-violet-300">{beatTracks.length} Beats Disponibles</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20">
                  <span className="text-violet-300">Calidad de Estudio</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20">
                  <span className="text-violet-300">Descarga Instantánea</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <TrackFilters onFilterChange={setFilters} />
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Mostrando {filteredTracks.length} {filteredTracks.length === 1 ? "beat" : "beats"}
            </p>
          </div>

          {/* Track grid */}
          {filteredTracks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTracks.map((track) => (
                <TrackCard key={track.id} track={track} onPlay={setCurrentTrack} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">No se encontraron beats con estos filtros</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <AudioPlayer track={currentTrack} onClose={() => setCurrentTrack(null)} />
    </div>
  )
}
