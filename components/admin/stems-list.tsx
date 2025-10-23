"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Play, Pause, Search, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Stem } from "@/lib/types"

export function StemsList() {
  const [stems, setStems] = useState<Stem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [playingUrl, setPlayingUrl] = useState<string | null>(null)

  useEffect(() => {
    fetchStems()
  }, [])

  const fetchStems = async () => {
    try {
      const response = await fetch("/api/stems/list")
      const data = await response.json()
      setStems(data.stems || [])
    } catch (error) {
      console.error("[v0] Error fetching stems:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredStems = stems.filter((stem) => stem.original_filename.toLowerCase().includes(searchQuery.toLowerCase()))

  const togglePlay = (url: string) => {
    if (playingUrl === url) {
      setPlayingUrl(null)
    } else {
      setPlayingUrl(url)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar stems..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stems List */}
      {filteredStems.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No se encontraron stems</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredStems.map((stem) => (
            <Card key={stem.id} className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{stem.original_filename}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(stem.created_at).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium",
                      stem.status === "completed" && "bg-green-500/20 text-green-400",
                      stem.status === "processing" && "bg-yellow-500/20 text-yellow-400",
                      stem.status === "failed" && "bg-red-500/20 text-red-400",
                    )}
                  >
                    {stem.status === "completed" && "Completado"}
                    {stem.status === "processing" && "Procesando"}
                    {stem.status === "failed" && "Error"}
                  </div>
                </div>

                {stem.status === "completed" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { label: "Vocals", url: stem.vocals_url, icon: "🎤", color: "from-pink-500 to-rose-500" },
                      { label: "Drums", url: stem.drums_url, icon: "🥁", color: "from-orange-500 to-red-500" },
                      { label: "Bass", url: stem.bass_url, icon: "🎸", color: "from-blue-500 to-cyan-500" },
                      { label: "Other", url: stem.other_url, icon: "🎹", color: "from-purple-500 to-violet-500" },
                    ].map((stemType) => (
                      <div
                        key={stemType.label}
                        className="flex items-center justify-between p-3 rounded-lg bg-card/50 border"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "h-8 w-8 rounded-full bg-gradient-to-br flex items-center justify-center text-sm",
                              stemType.color,
                            )}
                          >
                            {stemType.icon}
                          </div>
                          <span className="font-medium text-sm">{stemType.label}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          {stemType.url && (
                            <>
                              <Button size="sm" variant="ghost" onClick={() => togglePlay(stemType.url!)}>
                                {playingUrl === stemType.url ? (
                                  <Pause className="h-3 w-3" />
                                ) : (
                                  <Play className="h-3 w-3" />
                                )}
                              </Button>
                              <Button size="sm" variant="ghost" asChild>
                                <a href={stemType.url} download>
                                  <Download className="h-3 w-3" />
                                </a>
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {stem.error_message && <p className="text-sm text-red-400">{stem.error_message}</p>}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Hidden audio player */}
      {playingUrl && <audio src={playingUrl} autoPlay onEnded={() => setPlayingUrl(null)} className="hidden" />}
    </div>
  )
}
