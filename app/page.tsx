import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedTracks } from "@/components/featured-tracks"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedTracks />
      </main>
      <Footer />
    </div>
  )
}
