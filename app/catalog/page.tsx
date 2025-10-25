'use client'

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TrackGrid } from "@/components/track-grid"
import { SearchFilters, type SearchFilters as SearchFiltersType } from "@/components/search-filters"
import { useTracksStore } from "@/lib/tracks-store"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Music, Disc3, Piano, LayoutGrid, List } from "lucide-react"

export default function CatalogPage() {
  const { tracks, getTracksByCategory } = useTracksStore()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filters, setFilters] = useState<SearchFiltersType>({
    query: '',
    category: 'all',
    genre: 'all',
    bpmRange: [60, 200],
    priceRange: [0, 100],
    key: 'all',
    tags: [],
    exclusive: false,
    featured: false,
    license: 'all',
    sortBy: 'newest',
    sortOrder: 'desc'
  })

  const beats = getTracksByCategory("beat")
  const samples = getTracksByCategory("sample")
  const midis = getTracksByCategory("midi")

  const filteredTracks = useMemo(() => {
    let filtered = [...tracks]

    // Text search
    if (filters.query) {
      const query = filters.query.toLowerCase()
      filtered = filtered.filter(track =>
        track.title.toLowerCase().includes(query) ||
        track.artist.toLowerCase().includes(query) ||
        track.genre.toLowerCase().includes(query) ||
        track.tags?.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Category filter
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(track => track.category === filters.category)
    }

    // Genre filter
    if (filters.genre && filters.genre !== 'all') {
      filtered = filtered.filter(track => track.genre.toLowerCase() === filters.genre)
    }

    // BPM range
    if (filters.bpmRange) {
      filtered = filtered.filter(track => 
        track.bpm && track.bpm >= filters.bpmRange[0] && track.bpm <= filters.bpmRange[1]
      )
    }

    // Price range
    if (filters.priceRange) {
      filtered = filtered.filter(track => 
        track.price >= filters.priceRange[0] && track.price <= filters.priceRange[1]
      )
    }

    // Key filter
    if (filters.key && filters.key !== 'all') {
      filtered = filtered.filter(track => track.key === filters.key)
    }

    // Tags filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter(track =>
        track.tags?.some(tag => filters.tags.includes(tag))
      )
    }

    // Exclusive filter
    if (filters.exclusive) {
      filtered = filtered.filter(track => track.exclusive)
    }

    // Featured filter
    if (filters.featured) {
      filtered = filtered.filter(track => track.is_featured)
    }

    // License filter
    if (filters.license && filters.license !== 'all') {
      filtered = filtered.filter(track => track.license === filters.license)
    }

    // Sorting
    filtered.sort((a, b) => {
      let comparison = 0
      
      switch (filters.sortBy) {
        case 'newest':
          comparison = new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
          break
        case 'oldest':
          comparison = new Date(a.created_at || '').getTime() - new Date(b.created_at || '').getTime()
          break
        case 'price-low':
          comparison = a.price - b.price
          break
        case 'price-high':
          comparison = b.price - a.price
          break
        case 'title':
          comparison = a.title.localeCompare(b.title)
          break
        case 'popular':
          const aPopularity = (a.is_featured ? 100 : 0) + a.price
          const bPopularity = (b.is_featured ? 100 : 0) + b.price
          comparison = bPopularity - aPopularity
          break
        default:
          comparison = 0
      }

      return filters.sortOrder === 'desc' ? comparison : -comparison
    })

    return filtered
  }, [tracks, filters])

  const filteredBeats = useMemo(() => {
    return filteredTracks.filter(track => track.category === 'beat')
  }, [filteredTracks])

  const filteredSamples = useMemo(() => {
    return filteredTracks.filter(track => track.category === 'sample')
  }, [filteredTracks])

  const filteredMidis = useMemo(() => {
    return filteredTracks.filter(track => track.category === 'midi')
  }, [filteredTracks])

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-black mb-4 animate-gradient-text">Catálogo Completo</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explora toda nuestra colección de beats, samples y archivos MIDI profesionales
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <SearchFilters
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>

          <Tabs defaultValue="all" className="w-full">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <TabsList className="grid grid-cols-4 max-w-2xl">
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <Music className="h-4 w-4" />
                  Todos ({filteredTracks.length})
                </TabsTrigger>
                <TabsTrigger value="beats" className="flex items-center gap-2">
                  <Music className="h-4 w-4" />
                  Beats ({filteredBeats.length})
                </TabsTrigger>
                <TabsTrigger value="samples" className="flex items-center gap-2">
                  <Disc3 className="h-4 w-4" />
                  Samples ({filteredSamples.length})
                </TabsTrigger>
                <TabsTrigger value="midis" className="flex items-center gap-2">
                  <Piano className="h-4 w-4" />
                  MIDIs ({filteredMidis.length})
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="all">
              <TrackGrid tracks={filteredTracks} />
            </TabsContent>

            <TabsContent value="beats">
              <TrackGrid tracks={filteredBeats} />
            </TabsContent>

            <TabsContent value="samples">
              <TrackGrid tracks={filteredSamples} />
            </TabsContent>

            <TabsContent value="midis">
              <TrackGrid tracks={filteredMidis} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}