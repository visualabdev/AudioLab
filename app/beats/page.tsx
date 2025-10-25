import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TrackGrid } from "@/components/track-grid"
import { mockTracks } from "@/lib/mock-data"

export default function BeatsPage() {
  const beats = mockTracks.filter(track => track.category === "beat")

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black mb-4 animate-gradient-text">Beats Premium</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubre nuestra colección de beats profesionales listos para tus proyectos musicales
            </p>
          </div>
          <TrackGrid tracks={beats} />
        </div>
      </main>
      <Footer />
    </div>
  )
}