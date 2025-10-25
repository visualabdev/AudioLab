'use client'

import { useState } from 'react'
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

export interface SearchFilters {
  query: string
  category: string
  genre: string
  bpmRange: [number, number]
  priceRange: [number, number]
  key: string
  tags: string[]
  exclusive: boolean
  featured: boolean
  license: string
  sortBy: string
  sortOrder: 'asc' | 'desc'
}

interface SearchFiltersProps {
  filters: SearchFilters
  onFiltersChange: (filters: SearchFilters) => void
  className?: string
}

const GENRES = [
  'Trap', 'Hip Hop', 'R&B', 'Pop', 'Rock', 'Electronic', 
  'Jazz', 'Reggaeton', 'Drill', 'Afrobeat', 'House', 'Techno'
]

const KEYS = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
]

const LICENSES = [
  { value: 'basic', label: 'Básica' },
  { value: 'premium', label: 'Premium' },
  { value: 'exclusive', label: 'Exclusiva' }
]

const SORT_OPTIONS = [
  { value: 'newest', label: 'Más Recientes' },
  { value: 'oldest', label: 'Más Antiguos' },
  { value: 'price-low', label: 'Precio: Menor a Mayor' },
  { value: 'price-high', label: 'Precio: Mayor a Menor' },
  { value: 'popular', label: 'Más Populares' },
  { value: 'title', label: 'Título A-Z' }
]

export function SearchFilters({ filters, onFiltersChange, className }: SearchFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const updateFilters = (updates: Partial<SearchFilters>) => {
    onFiltersChange({ ...filters, ...updates })
  }

  const clearFilters = () => {
    onFiltersChange({
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
  }

  const activeFiltersCount = [
    filters.category,
    filters.genre,
    filters.key,
    filters.license,
    filters.exclusive,
    filters.featured,
    ...filters.tags
  ].filter(Boolean).length

  const removeTag = (tagToRemove: string) => {
    updateFilters({
      tags: filters.tags.filter(tag => tag !== tagToRemove)
    })
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Buscar beats, samples, MIDIs..."
          value={filters.query}
          onChange={(e) => updateFilters({ query: e.target.value })}
          className="pl-10 pr-4"
        />
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <Select value={filters.category} onValueChange={(value) => updateFilters({ category: value })}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="beats">Beats</SelectItem>
            <SelectItem value="samples">Samples</SelectItem>
            <SelectItem value="midis">MIDIs</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.genre} onValueChange={(value) => updateFilters({ genre: value })}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Género" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {GENRES.map(genre => (
              <SelectItem key={genre} value={genre.toLowerCase()}>{genre}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value })}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Advanced Filters Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="relative">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filtros
              {activeFiltersCount > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-80 overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filtros Avanzados</SheetTitle>
            </SheetHeader>
            
            <div className="space-y-6 mt-6">
              {/* BPM Range */}
              <div className="space-y-3">
                <label className="text-sm font-medium">BPM: {filters.bpmRange[0]} - {filters.bpmRange[1]}</label>
                <Slider
                  value={filters.bpmRange}
                  onValueChange={(value) => updateFilters({ bpmRange: value as [number, number] })}
                  min={60}
                  max={200}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Precio: ${filters.priceRange[0]} - ${filters.priceRange[1]}</label>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Key */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Tonalidad</label>
                <Select value={filters.key} onValueChange={(value) => updateFilters({ key: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tonalidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {KEYS.map(key => (
                      <SelectItem key={key} value={key}>{key}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* License Type */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Tipo de Licencia</label>
                <Select value={filters.license} onValueChange={(value) => updateFilters({ license: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar licencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    {LICENSES.map(license => (
                      <SelectItem key={license.value} value={license.value}>{license.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Special Filters */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Especiales</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="exclusive"
                      checked={filters.exclusive}
                      onCheckedChange={(checked) => updateFilters({ exclusive: !!checked })}
                    />
                    <label htmlFor="exclusive" className="text-sm">Solo Exclusivos</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={filters.featured}
                      onCheckedChange={(checked) => updateFilters({ featured: !!checked })}
                    />
                    <label htmlFor="featured" className="text-sm">Solo Destacados</label>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="w-full"
              >
                Limpiar Filtros
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="w-4 h-4 mr-1" />
            Limpiar
          </Button>
        )}
      </div>

      {/* Active Tags */}
      {filters.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">Tags:</span>
          {filters.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
              {tag}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}