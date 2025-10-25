import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TrackGrid } from "@/components/track-grid"
import { mockTracks } from "@/lib/mock-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Music, Disc3, Piano } from "lucide-react"

export default function CatalogPage() {
  const beats = mockTracks.filter(track => track.category === "beat")
  const samples = mockTracks.filter(track => track.category === "sample")
  const midis = mockTracks.filter(track => track.category === "midi")

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black mb-4 animate-gradient-text">Catálogo Completo</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explora toda nuestra colección de beats, samples y archivos MIDI profesionales
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 max-w-2xl mx-auto">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Music className="h-4 w-4" />
                Todos ({mockTracks.length})
              </TabsTrigger>
              <TabsTrigger value="beats" className="flex items-center gap-2">
                <Music className="h-4 w-4" />
                Beats ({beats.length})
              </TabsTrigger>
              <TabsTrigger value="samples" className="flex items-center gap-2">
                <Disc3 className="h-4 w-4" />
                Samples ({samples.length})
              </TabsTrigger>
              <TabsTrigger value="midis" className="flex items-center gap-2">
                <Piano className="h-4 w-4" />
                MIDIs ({midis.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <TrackGrid tracks={mockTracks} />
            </TabsContent>

            <TabsContent value="beats">
              <TrackGrid tracks={beats} />
            </TabsContent>

            <TabsContent value="samples">
              <TrackGrid tracks={samples} />
            </TabsContent>

            <TabsContent value="midis">
              <TrackGrid tracks={midis} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}