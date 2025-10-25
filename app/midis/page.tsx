"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TrackGrid } from "@/components/track-grid"
import { useTracksStore } from "@/lib/tracks-store"

export default function MidisPage() {
  const { getTracksByCategory } = useTracksStore()
  const midis = getTracksByCategory("midi")

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black mb-4 animate-gradient-text">Archivos MIDI</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Melodías, acordes y patrones MIDI para inspirar tu creatividad musical
            </p>
          </div>
          <TrackGrid tracks={midis} />
        </div>
      </main>
      <Footer />
    </div>
  )
}