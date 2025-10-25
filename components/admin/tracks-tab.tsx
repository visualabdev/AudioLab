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
import { Plus, Edit, Trash2, Music, DollarSign, Upload, Save } from "lucide-react"
import { useTracksStore } from "@/lib/tracks-store"
import { BulkOperations } from "@/components/admin/bulk-operations"
import { AudioStorage } from "@/lib/audio-storage"
import Image from "next/image"
import type { Track } from "@/lib/types"

interface AdminTracksTabProps {
  category: "beat" | "sample" | "midi"
}

export function AdminTracksTab({ category }: AdminTracksTabProps) {
  const { getTracksByCategory, addTrack, updateTrack, deleteTrack } = useTracksStore()
  const tracks = getTracksByCategory(category)
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
    tags: "",
    is_featured: false,
    exclusive: false,
    license: "basic",
    category: category,
    coverPreview: "",
    coverFile: null as File | null,
    audioFile: null as File | null,
    audioFileName: ""
  })

  const resetFormData = () => ({
    title: "",
    artist: "AudioLab",
    genre: "Hip Hop",
    bpm: "",
    key: "",
    price: "",
    description: "",
    tags: "",
    is_featured: false,
    exclusive: false,
    license: "basic",
    category: category,
    coverPreview: "",
    coverFile: null as File | null,
    audioFile: null as File | null,
    audioFileName: ""
  })

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este track?")) {
      deleteTrack(id)
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
      tags: track.tags?.join(", ") || "",
      is_featured: track.is_featured,
      exclusive: track.exclusive || false,
      license: track.license || "basic",
      category: category,
      coverPreview: track.cover_image_url || "",
      coverFile: null,
      audioFile: null,
      audioFileName: ""
    })
    setIsAddDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Process cover image
    let coverImageUrl = formData.coverPreview || "/placeholder.svg"
    if (formData.coverFile) {
      coverImageUrl = formData.coverPreview
    }

    // Process audio file - REQUERIDO
    if (!formData.audioFile && !editingTrack) {
      alert('⚠️ Debes seleccionar un archivo de audio')
      return
    }
    
    let audioUrl = editingTrack?.audio_url || ''
    
    if (formData.audioFile) {
      // Generate unique ID for the audio file
      const audioId = `${Date.now()}-${formData.title.toLowerCase().replace(/\s+/g, '-')}`
      console.log('📤 Subiendo archivo de audio:', {
        nombre: formData.audioFile.name,
        tipo: formData.audioFile.type,
        tamaño: `${(formData.audioFile.size / 1024 / 1024).toFixed(2)} MB`,
        id: audioId
      })
      
      try {
        audioUrl = await AudioStorage.storeAudioFile(audioId, formData.audioFile)
        console.log('✅ Archivo almacenado exitosamente:', audioUrl)
      } catch (error) {
        console.error('❌ Error almacenando archivo:', error)
        audioUrl = URL.createObjectURL(formData.audioFile)
        console.warn('⚠️ Usando blob URL como fallback:', audioUrl)
      }
    }

    // Process tags
    const tags = formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : []
    
    const trackData = {
      title: formData.title,
      artist: formData.artist,
      genre: formData.genre,
      bpm: formData.bpm ? parseInt(formData.bpm) : undefined,
      key: formData.key || undefined,
      price: parseFloat(formData.price),
      description: formData.description || undefined,
      tags: tags.length > 0 ? tags : undefined,
      is_featured: formData.is_featured,
      exclusive: formData.exclusive,
      license: formData.license as "basic" | "premium" | "exclusive",
      category: category,
      cover_image_url: coverImageUrl,
      audio_url: audioUrl,
      duration: formData.audioFile ? Math.floor(Math.random() * 180) + 60 : undefined
    }

    if (editingTrack) {
      updateTrack(editingTrack.id, trackData)
    } else {
      addTrack(trackData)
    }

    setIsAddDialogOpen(false)
    setEditingTrack(null)
    setFormData(resetFormData())
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
          <h2 className="text-2xl font-bold mb-1">Gestionar {getCategoryName()}</h2>
          <p className="text-sm text-muted-foreground">
            {category === "beat" && "Beats instrumentales completos listos para vocales"}
            {category === "sample" && "Sonidos individuales, loops y one-shots"}
            {category === "midi" && "Archivos MIDI para melodías, acordes y patrones"}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <BulkOperations />
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className={`bg-gradient-to-r ${getCategoryColor()} hover:opacity-90 text-white border-0`}>
                <Plus className="h-4 w-4 mr-2" />
                Agregar {getCategoryName().slice(0, -1)}
              </Button>
            </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {editingTrack ? `Editar ${getCategoryName().slice(0, -1)}` : `Agregar Nuevo ${getCategoryName().slice(0, -1)}`}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Cover Image Upload */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Imagen de Portada</Label>
                <div className="flex gap-4">
                  <div className="w-32 h-32 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted/30 overflow-hidden">
                    {formData.coverPreview ? (
                      <img 
                        src={formData.coverPreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Subir imagen</p>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onload = (e) => {
                            setFormData({ 
                              ...formData, 
                              coverPreview: e.target?.result as string,
                              coverFile: file
                            })
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground">
                      Formatos: JPG, PNG, WebP. Tamaño recomendado: 800x800px
                    </p>
                    {formData.coverPreview && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setFormData({ ...formData, coverPreview: "", coverFile: null })}
                      >
                        Eliminar imagen
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Audio File Upload */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">
                  Archivo de Audio {category === 'midi' ? '(MIDI)' : '(MP3/WAV)'} *
                </Label>
                {!editingTrack && !formData.audioFile && (
                  <p className="text-sm text-red-500">⚠️ Debes seleccionar un archivo de audio para continuar</p>
                )}
                <div className="space-y-3">
                  <Input
                    type="file"
                    accept={category === 'midi' ? '.mid,.midi' : 'audio/*'}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setFormData({ 
                          ...formData, 
                          audioFile: file,
                          audioFileName: file.name
                        })
                      }
                    }}
                    className="cursor-pointer"
                  />
                  {formData.audioFileName && (
                    <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                      <Music className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium flex-1">{formData.audioFileName}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setFormData({ ...formData, audioFile: null, audioFileName: "" })}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {category === 'midi' 
                      ? 'Formatos: .mid, .midi' 
                      : 'Formatos: MP3, WAV, FLAC. Calidad recomendada: 320kbps o superior'
                    }
                  </p>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    {category === "beat" ? "Título del Beat" : category === "sample" ? "Nombre del Sample" : "Título del MIDI"} *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    placeholder="Ej: Dark Trap Beat"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="artist">Artista/Productor *</Label>
                  <Input
                    id="artist"
                    value={formData.artist}
                    onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                    required
                    placeholder="AudioLab"
                  />
                </div>
              </div>

              {/* Musical Details */}
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="genre">Género *</Label>
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
                      <SelectItem value="Reggaeton">Reggaeton</SelectItem>
                      <SelectItem value="Drill">Drill</SelectItem>
                      <SelectItem value="Afrobeat">Afrobeat</SelectItem>
                      <SelectItem value="Jazz">Jazz</SelectItem>
                      <SelectItem value="Rock">Rock</SelectItem>
                      <SelectItem value="Classical">Classical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bpm">BPM</Label>
                  <Input
                    id="bpm"
                    type="number"
                    min="60"
                    max="200"
                    value={formData.bpm}
                    onChange={(e) => setFormData({ ...formData, bpm: e.target.value })}
                    placeholder="140"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="key">Tonalidad</Label>
                  <Select value={formData.key} onValueChange={(value) => setFormData({ ...formData, key: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="C Major">C Major</SelectItem>
                      <SelectItem value="C Minor">C Minor</SelectItem>
                      <SelectItem value="D Major">D Major</SelectItem>
                      <SelectItem value="D Minor">D Minor</SelectItem>
                      <SelectItem value="E Major">E Major</SelectItem>
                      <SelectItem value="E Minor">E Minor</SelectItem>
                      <SelectItem value="F Major">F Major</SelectItem>
                      <SelectItem value="F Minor">F Minor</SelectItem>
                      <SelectItem value="G Major">G Major</SelectItem>
                      <SelectItem value="G Minor">G Minor</SelectItem>
                      <SelectItem value="A Major">A Major</SelectItem>
                      <SelectItem value="A Minor">A Minor</SelectItem>
                      <SelectItem value="B Major">B Major</SelectItem>
                      <SelectItem value="B Minor">B Minor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Precio (USD) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    placeholder="29.99"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (separados por comas)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="dark, atmospheric, trap, 808, melody"
                />
                <p className="text-xs text-muted-foreground">
                  Ayuda a los usuarios a encontrar tu {category}. Ej: dark, atmospheric, 808s, melody
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  placeholder={`Describe tu ${category}... Ej: Beat oscuro y atmosférico perfecto para rap. Incluye 808s pesados y melodías envolventes.`}
                />
              </div>

              {/* Additional Options */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Opciones Adicionales</Label>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      className="h-4 w-4 rounded border-border"
                    />
                    <Label htmlFor="featured" className="cursor-pointer">
                      Destacar en página principal
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="exclusive"
                      checked={formData.exclusive}
                      onChange={(e) => setFormData({ ...formData, exclusive: e.target.checked })}
                      className="h-4 w-4 rounded border-border"
                    />
                    <Label htmlFor="exclusive" className="cursor-pointer">
                      Contenido exclusivo
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="license">Tipo de Licencia</Label>
                  <Select value={formData.license} onValueChange={(value) => setFormData({ ...formData, license: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Licencia Básica</SelectItem>
                      <SelectItem value="premium">Licencia Premium (+$50)</SelectItem>
                      <SelectItem value="exclusive">Licencia Exclusiva (Consultar)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t">
                <Button
                  type="submit"
                  className={`flex-1 bg-gradient-to-r ${getCategoryColor()} hover:opacity-90 text-white border-0 h-12`}
                  disabled={!formData.title || !formData.price || (!formData.audioFile && !editingTrack)}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingTrack ? `Actualizar ${getCategoryName().slice(0, -1)}` : `Agregar ${getCategoryName().slice(0, -1)}`}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddDialogOpen(false)
                    setEditingTrack(null)
                    setFormData(resetFormData())
                  }}
                  className="h-12"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        </div>
      </div>

      {/* Tracks List */}
      <div className="grid grid-cols-1 gap-4">
        {tracks.length === 0 ? (
          <Card className="p-12 text-center">
            <Music className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No hay {getCategoryName()} aún</h3>
            <p className="text-sm text-muted-foreground mb-4">Comienza agregando tu primer {category} al catálogo</p>
            <Button
              onClick={() => setIsAddDialogOpen(true)}
              className={`bg-gradient-to-r ${getCategoryColor()} hover:opacity-90 text-white border-0`}
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar {getCategoryName().slice(0, -1)}
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
                            Destacado
                          </Badge>
                        )}
                        {track.exclusive && (
                          <Badge variant="outline" className="text-yellow-500 border-yellow-500/20">
                            Exclusivo
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
                    {track.license && (
                      <Badge variant="outline" className="capitalize">
                        {track.license}
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-primary">
                      <DollarSign className="h-3 w-3" />
                      {track.price.toFixed(2)}
                    </Badge>
                  </div>

                  {track.tags && track.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {track.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}

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