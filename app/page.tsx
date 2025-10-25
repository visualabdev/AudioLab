import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedTracksNew } from "@/components/featured-tracks-new"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedTracksNew />
      </main>
      <Footer />
    </div>
  )
}