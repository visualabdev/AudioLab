"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Music, DollarSign } from "lucide-react"
import { mockTracks } from "@/lib/mock-data"
import Image from "next/image"
import type { Track } from "@/lib/types"

interface AdminTracksTabProps {
  category: "beat" | "sample" | "midi"
}

export function AdminTracksTab({ category }: AdminTracksTabProps) {
  const [tracks, setTracks] = useState(mockTracks.filter((t) => t.category === category))
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingTrack, setEditingTrack] = useState<Track | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    artist: "AudioLab",
    genre: "Hip Hop",
    bpm: "",
    key: "",
    price: "",
    description: "",
    is_featured: false,
    category: category,
  })

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this track?")) {
      setTracks(tracks.filter((t) => t.id !== id))
    }
  }

  const handleEdit = (track: Track) => {
    setEditingTrack(track)
    setFormData({
      title: track.title,
      artist: track.artist,
      genre: track.genre,
      bpm: track.bpm?.toString() || "",
      key: track.key || "",
      price: track.price.toString(),
      description: track.description || "",
      is_featured: track.is_featured,
      category: category,
    })
    setIsAddDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save to the database
    console.log("[v0] Saving track:", formData)
    setIsAddDialogOpen(false)
    setEditingTrack(null)
    setFormData({
      title: "",
      artist: "AudioLab",
      genre: "Hip Hop",
      bpm: "",
      key: "",
      price: "",
      description: "",
      is_featured: false,
      category: category,
    })
  }

  const getCategoryName = () => {
    switch (category) {
      case "beat":
        return "Beats"
      case "sample":
        return "Samples"
      case "midi":
        return "MIDI Files"
    }
  }

  const getCategoryColor = () => {
    switch (category) {
      case "beat":
        return "from-violet-500 to-purple-600"
      case "sample":
        return "from-cyan-500 to-blue-600"
      case "midi":
        return "from-pink-500 to-rose-600"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">Manage {getCategoryName()}</h2>
          <p className="text-sm text-muted-foreground">
            {category === "beat" && "Full instrumental tracks ready for vocals"}
            {category === "sample" && "Individual sounds, loops, and one-shots"}
            {category === "midi" && "MIDI files for melodies, chords, and patterns"}
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className={`bg-gradient-to-r ${getCategoryColor()} hover:opacity-90 text-white border-0`}>
              <Plus className="h-4 w-4 mr-2" />
              Add {getCategoryName().slice(0, -1)}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTrack ? `Edit ${getCategoryName().slice(0, -1)}` : `Add New ${getCategoryName().slice(0, -1)}`}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    {category === "beat" ? "Track" : category === "sample" ? "Sample" : "MIDI"} Title *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="artist">Artist *</Label>
                  <Input
                    id="artist"
                    value={formData.artist}
                    onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="genre">Genre *</Label>
                  <Select value={formData.genre} onValueChange={(value) => setFormData({ ...formData, genre: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hip Hop">Hip Hop</SelectItem>
                      <SelectItem value="Pop">Pop</SelectItem>
                      <SelectItem value="Trap">Trap</SelectItem>
                      <SelectItem value="Lo-Fi">Lo-Fi</SelectItem>
                      <SelectItem value="Electronic">Electronic</SelectItem>
                      <SelectItem value="R&B">R&B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bpm">BPM</Label>
                  <Input
                    id="bpm"
                    type="number"
                    value={formData.bpm}
                    onChange={(e) => setFormData({ ...formData, bpm: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="key">Key</Label>
                  <Input
                    id="key"
                    value={formData.key}
                    onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                    placeholder="C Minor"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (USD) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="h-4 w-4"
                />
                <Label htmlFor="featured" className="cursor-pointer">
                  Feature this {category} on homepage
                </Label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className={`flex-1 bg-gradient-to-r ${getCategoryColor()} hover:opacity-90 text-white border-0`}
                >
                  {editingTrack ? `Update ${getCategoryName().slice(0, -1)}` : `Add ${getCategoryName().slice(0, -1)}`}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddDialogOpen(false)
                    setEditingTrack(null)
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tracks.length === 0 ? (
          <Card className="p-12 text-center">
            <Music className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No {getCategoryName()} Yet</h3>
            <p className="text-sm text-muted-foreground mb-4">Start by adding your first {category} to the catalog</p>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className={`bg-gradient-to-r ${getCategoryColor()} hover:opacity-90 text-white border-0`}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add {getCategoryName().slice(0, -1)}
            </Button>
          </Card>
        ) : (
          tracks.map((track) => (
            <Card key={track.id} className="p-6">
              <div className="flex gap-6">
                <div className="relative h-24 w-24 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={track.cover_image_url || "/placeholder.svg"}
                    alt={track.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg">{track.title}</h3>
                        {track.is_featured && (
                          <Badge className={`bg-gradient-to-r ${getCategoryColor()} text-white border-0`}>
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{track.artist}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEdit(track)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(track.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      <Music className="h-3 w-3 mr-1" />
                      {track.genre}
                    </Badge>
                    {track.bpm && <Badge variant="outline">{track.bpm} BPM</Badge>}
                    {track.key && <Badge variant="outline">{track.key}</Badge>}
                    <Badge variant="outline" className="text-primary">
                      <DollarSign className="h-3 w-3" />
                      {track.price.toFixed(2)}
                    </Badge>
                  </div>

                  {track.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{track.description}</p>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
