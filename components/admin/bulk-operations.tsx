'use client'

import { useState } from 'react'
import { Upload, FileMusic, Trash2, Edit, Download, Check, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useTracksStore } from '@/lib/tracks-store'
import { toast } from '@/lib/toast'

interface BulkUploadFile {
  file: File
  title: string
  artist: string
  genre: string
  bpm: number
  key: string
  price: number
  category: 'beat' | 'sample' | 'midi'
  status: 'pending' | 'processing' | 'success' | 'error'
  error?: string
}

export function BulkOperations() {
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [uploadFiles, setUploadFiles] = useState<BulkUploadFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [defaultSettings, setDefaultSettings] = useState({
    artist: '',
    genre: 'trap',
    category: 'beat' as 'beat' | 'sample' | 'midi',
    price: 25
  })

  const { addTrack } = useTracksStore()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const audioFiles = files.filter(file => 
      file.type.startsWith('audio/') || 
      file.name.endsWith('.mid') || 
      file.name.endsWith('.midi')
    )

    const newFiles: BulkUploadFile[] = audioFiles.map(file => {
      const fileName = file.name.replace(/\.[^/.]+$/, '')
      const isMidi = file.name.endsWith('.mid') || file.name.endsWith('.midi')
      
      return {
        file,
        title: fileName,
        artist: defaultSettings.artist,
        genre: defaultSettings.genre,
        bpm: 140,
        key: 'C',
        price: defaultSettings.price,
        category: isMidi ? 'midi' : defaultSettings.category,
        status: 'pending'
      }
    })

    setUploadFiles([...uploadFiles, ...newFiles])
  }

  const updateFile = (index: number, updates: Partial<BulkUploadFile>) => {
    setUploadFiles(files => 
      files.map((file, i) => i === index ? { ...file, ...updates } : file)
    )
  }

  const removeFile = (index: number) => {
    setUploadFiles(files => files.filter((_, i) => i !== index))
  }

  const applyDefaultsToAll = () => {
    setUploadFiles(files => 
      files.map(file => ({
        ...file,
        artist: defaultSettings.artist || file.artist,
        genre: defaultSettings.genre,
        category: file.file.name.endsWith('.mid') || file.file.name.endsWith('.midi') 
          ? 'midi' 
          : defaultSettings.category,
        price: defaultSettings.price
      }))
    )
  }

  const processUploads = async () => {
    setIsProcessing(true)
    
    for (let i = 0; i < uploadFiles.length; i++) {
      const file = uploadFiles[i]
      
      // Update status to processing
      updateFile(i, { status: 'processing' })
      
      try {
        // Simulate file processing
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Create audio URL
        const audioUrl = URL.createObjectURL(file.file)
        
        // Add track to store
        addTrack({
          title: file.title,
          artist: file.artist,
          genre: file.genre,
          bpm: file.bpm,
          key: file.key,
          price: file.price,
          category: file.category,
          audio_file_url: audioUrl,
          cover_image_url: '/placeholder.svg',
          description: `${file.category} en ${file.key} a ${file.bpm} BPM`,
          tags: [file.genre, file.category, `${file.bpm}bpm`],
          is_featured: false,
          exclusive: false,
          license: 'basic'
        })
        
        updateFile(i, { status: 'success' })
        
      } catch (error) {
        updateFile(i, { 
          status: 'error', 
          error: 'Error al procesar el archivo' 
        })
      }
    }
    
    setIsProcessing(false)
    toast.success(`${uploadFiles.filter(f => f.status === 'success').length} archivos subidos exitosamente`)
  }

  const clearCompleted = () => {
    setUploadFiles(files => files.filter(file => file.status !== 'success'))
  }

  const getStatusIcon = (status: BulkUploadFile['status']) => {
    switch (status) {
      case 'pending':
        return <FileMusic className="w-4 h-4 text-muted-foreground" />
      case 'processing':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
      case 'success':
        return <Check className="w-4 h-4 text-green-500" />
      case 'error':
        return <X className="w-4 h-4 text-red-500" />
    }
  }

  const getStatusColor = (status: BulkUploadFile['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-muted'
      case 'processing':
        return 'bg-blue-50 border-blue-200'
      case 'success':
        return 'bg-green-50 border-green-200'
      case 'error':
        return 'bg-red-50 border-red-200'
    }
  }

  return (
    <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
          <Upload className="w-4 h-4 mr-2" />
          Subida Masiva
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Subida Masiva de Archivos</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Default Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Configuración por Defecto</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="default-artist">Artista</Label>
                <Input
                  id="default-artist"
                  value={defaultSettings.artist}
                  onChange={(e) => setDefaultSettings({ ...defaultSettings, artist: e.target.value })}
                  placeholder="Nombre del artista"
                />
              </div>
              
              <div>
                <Label htmlFor="default-genre">Género</Label>
                <Select 
                  value={defaultSettings.genre} 
                  onValueChange={(value) => setDefaultSettings({ ...defaultSettings, genre: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trap">Trap</SelectItem>
                    <SelectItem value="hip-hop">Hip Hop</SelectItem>
                    <SelectItem value="r&b">R&B</SelectItem>
                    <SelectItem value="pop">Pop</SelectItem>
                    <SelectItem value="electronic">Electronic</SelectItem>
                    <SelectItem value="drill">Drill</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="default-category">Categoría</Label>
                <Select 
                  value={defaultSettings.category} 
                  onValueChange={(value: 'beat' | 'sample' | 'midi') => setDefaultSettings({ ...defaultSettings, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beat">Beat</SelectItem>
                    <SelectItem value="sample">Sample</SelectItem>
                    <SelectItem value="midi">MIDI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="default-price">Precio ($)</Label>
                <Input
                  id="default-price"
                  type="number"
                  value={defaultSettings.price}
                  onChange={(e) => setDefaultSettings({ ...defaultSettings, price: Number(e.target.value) })}
                  min="1"
                />
              </div>
            </CardContent>
          </Card>

          {/* File Upload */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Archivos</h3>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={applyDefaultsToAll}
                  disabled={uploadFiles.length === 0}
                >
                  Aplicar Configuración a Todos
                </Button>
                <Button
                  variant="outline"
                  onClick={clearCompleted}
                  disabled={!uploadFiles.some(f => f.status === 'success')}
                >
                  Limpiar Completados
                </Button>
              </div>
            </div>

            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <input
                type="file"
                multiple
                accept="audio/*,.mid,.midi"
                onChange={handleFileSelect}
                className="hidden"
                id="bulk-upload"
              />
              <label htmlFor="bulk-upload" className="cursor-pointer">
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium mb-2">Selecciona archivos de audio</p>
                <p className="text-muted-foreground">
                  Soporta MP3, WAV, FLAC, MIDI. Puedes seleccionar múltiples archivos.
                </p>
              </label>
            </div>
          </div>

          {/* File List */}
          {uploadFiles.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Archivos Seleccionados ({uploadFiles.length})
                </h3>
                <div className="flex space-x-2">
                  <Button
                    onClick={processUploads}
                    disabled={isProcessing || uploadFiles.length === 0}
                    className="bg-gradient-to-r from-green-500 to-emerald-500"
                  >
                    {isProcessing ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4 mr-2" />
                    )}
                    Procesar Todos
                  </Button>
                </div>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {uploadFiles.map((file, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg ${getStatusColor(file.status)}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(file.status)}
                        <div>
                          <p className="font-medium">{file.file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(file.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{file.category}</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          disabled={file.status === 'processing'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {file.status === 'error' && file.error && (
                      <div className="mb-3 p-2 bg-red-100 border border-red-200 rounded text-sm text-red-700">
                        {file.error}
                      </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      <div>
                        <Label className="text-xs">Título</Label>
                        <Input
                          value={file.title}
                          onChange={(e) => updateFile(index, { title: e.target.value })}
                          disabled={file.status === 'processing' || file.status === 'success'}
                          className="h-8 text-sm"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-xs">Artista</Label>
                        <Input
                          value={file.artist}
                          onChange={(e) => updateFile(index, { artist: e.target.value })}
                          disabled={file.status === 'processing' || file.status === 'success'}
                          className="h-8 text-sm"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-xs">BPM</Label>
                        <Input
                          type="number"
                          value={file.bpm}
                          onChange={(e) => updateFile(index, { bpm: Number(e.target.value) })}
                          disabled={file.status === 'processing' || file.status === 'success'}
                          className="h-8 text-sm"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-xs">Tonalidad</Label>
                        <Select 
                          value={file.key} 
                          onValueChange={(value) => updateFile(index, { key: value })}
                          disabled={file.status === 'processing' || file.status === 'success'}
                        >
                          <SelectTrigger className="h-8 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].map(key => (
                              <SelectItem key={key} value={key}>{key}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="text-xs">Precio ($)</Label>
                        <Input
                          type="number"
                          value={file.price}
                          onChange={(e) => updateFile(index, { price: Number(e.target.value) })}
                          disabled={file.status === 'processing' || file.status === 'success'}
                          className="h-8 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}