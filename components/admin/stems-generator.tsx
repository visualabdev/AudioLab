"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, Music, Loader2, Download, Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"

interface StemResult {
  id: string
  original_filename: string
  vocals_url: string | null
  drums_url: string | null
  bass_url: string | null
  other_url: string | null
  status: string
  created_at: string
}

export function StemsGenerator() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [stems, setStems] = useState<StemResult | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [playingUrl, setPlayingUrl] = useState<string | null>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type.includes("audio")) {
        setFile(droppedFile)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setLoading(true)
    setStems(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/stems/generate", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setStems(data.stems)
      } else {
        alert(data.error || "Failed to generate stems")
      }
    } catch (error) {
      console.error("[v0] Error uploading file:", error)
      alert("Failed to generate stems")
    } finally {
      setLoading(false)
    }
  }

  const togglePlay = (url: string) => {
    if (playingUrl === url) {
      setPlayingUrl(null)
    } else {
      setPlayingUrl(url)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
          Generador de Stems IA (Demucs)
        </h2>
        <p className="text-muted-foreground">
          Sube un beat o canción y sepáralo automáticamente en vocals, drums, bass y other
        </p>
      </div>

      {/* Upload Area */}
      <Card className="p-8 border-2 border-dashed">
        <div
          className={cn(
            "flex flex-col items-center justify-center space-y-4 transition-colors",
            dragActive && "bg-primary/5",
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <Upload className="h-8 w-8 text-white" />
          </div>

          <div className="text-center">
            <p className="text-lg font-semibold mb-1">{file ? file.name : "Arrastra tu archivo aquí"}</p>
            <p className="text-sm text-muted-foreground">o haz clic para seleccionar (MP3, WAV)</p>
          </div>

          <Input type="file" accept=".mp3,.wav,audio/mpeg,audio/wav" onChange={handleFileChange} className="max-w-xs" />

          <Button
            onClick={handleUpload}
            disabled={!file || loading}
            className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Procesando con IA...
              </>
            ) : (
              <>
                <Music className="mr-2 h-4 w-4" />
                Generar Stems
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Demo Notice */}
      <Card className="p-4 bg-amber-500/10 border-amber-500/20">
        <p className="text-sm text-amber-200">
          <strong>Modo Demo:</strong> Esta es una demostración. En producción, necesitarás un servidor Node.js con
          Python 3.9+ y Demucs instalado para procesar audio real.
        </p>
      </Card>

      {/* Results */}
      {stems && (
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">Stems Generados</h3>
          <div className="space-y-3">
            {[
              { label: "Vocals", url: stems.vocals_url, icon: "🎤", color: "from-pink-500 to-rose-500" },
              { label: "Drums", url: stems.drums_url, icon: "🥁", color: "from-orange-500 to-red-500" },
              { label: "Bass", url: stems.bass_url, icon: "🎸", color: "from-blue-500 to-cyan-500" },
              { label: "Other", url: stems.other_url, icon: "🎹", color: "from-purple-500 to-violet-500" },
            ].map((stem) => (
              <div key={stem.label} className="flex items-center justify-between p-4 rounded-lg bg-card/50 border">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "h-10 w-10 rounded-full bg-gradient-to-br flex items-center justify-center text-xl",
                      stem.color,
                    )}
                  >
                    {stem.icon}
                  </div>
                  <div>
                    <p className="font-semibold">{stem.label}</p>
                    <p className="text-xs text-muted-foreground">{stems.original_filename}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {stem.url && (
                    <>
                      <Button size="sm" variant="outline" onClick={() => togglePlay(stem.url!)}>
                        {playingUrl === stem.url ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href={stem.url} download>
                          <Download className="h-4 w-4" />
                        </a>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Hidden audio player */}
          {playingUrl && <audio src={playingUrl} autoPlay onEnded={() => setPlayingUrl(null)} className="hidden" />}
        </Card>
      )}
    </div>
  )
}
