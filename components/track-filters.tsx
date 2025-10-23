"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { useState } from "react"

interface TrackFiltersProps {
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  search: string
  genre: string
  minPrice: number
  maxPrice: number
  sortBy: string
}

export function TrackFilters({ onFilterChange }: TrackFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    genre: "all",
    minPrice: 0,
    maxPrice: 100,
    sortBy: "newest",
  })

  const handleFilterChange = (key: keyof FilterState, value: string | number) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handlePriceChange = (value: number[]) => {
    const newFilters = { ...filters, minPrice: value[0], maxPrice: value[1] }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      search: "",
      genre: "all",
      minPrice: 0,
      maxPrice: 100,
      sortBy: "newest",
    }
    setFilters(defaultFilters)
    onFilterChange(defaultFilters)
  }

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tracks, artists, genres..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="border-primary/20 hover:bg-primary/10">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Advanced filters */}
      {isOpen && (
        <div className="glass rounded-lg p-6 space-y-6 border border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Advanced Filters</h3>
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              <X className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Genre filter */}
            <div className="space-y-2">
              <Label>Genre</Label>
              <Select value={filters.genre} onValueChange={(value) => handleFilterChange("genre", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  <SelectItem value="Hip Hop">Hip Hop</SelectItem>
                  <SelectItem value="Pop">Pop</SelectItem>
                  <SelectItem value="Trap">Trap</SelectItem>
                  <SelectItem value="Lo-Fi">Lo-Fi</SelectItem>
                  <SelectItem value="Electronic">Electronic</SelectItem>
                  <SelectItem value="R&B">R&B</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort by */}
            <div className="space-y-2">
              <Label>Sort By</Label>
              <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price range */}
            <div className="space-y-3 md:col-span-2">
              <Label>
                Price Range: ${filters.minPrice} - ${filters.maxPrice}
              </Label>
              <Slider
                value={[filters.minPrice, filters.maxPrice]}
                max={100}
                step={5}
                onValueChange={handlePriceChange}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
