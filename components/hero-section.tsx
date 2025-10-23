"use client"

import { Button } from "@/components/ui/button"
import { Play, ArrowRight, Sparkles, Zap, Music, Disc3, Piano } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

// Deterministic pseudo-random function for consistent server/client values
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 w-full h-full">
        {/* Custom animated background to replace Spline */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated gradient blobs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/20 via-secondary/15 to-primary/20 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-secondary/20 via-primary/15 to-secondary/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-primary/15 via-secondary/20 to-primary/15 rounded-full blur-3xl animate-blob animation-delay-4000"></div>

          {/* Additional floating orbs */}
          <div className="absolute top-1/6 right-1/3 w-64 h-64 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-full blur-2xl animate-blob animation-delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/6 w-56 h-56 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-2xl animate-blob animation-delay-3000"></div>
        </div>
      </div>

      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      {/* Enhanced grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${seededRandom(i * 1000 + 1) * 100}%`,
              top: `${seededRandom(i * 1000 + 2) * 100}%`,
              animationDelay: `${seededRandom(i * 1000 + 3) * 5}s`,
              animationDuration: `${5 + seededRandom(i * 1000 + 4) * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          {/* Enhanced badge with shimmer effect */}
          <div
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-primary/30 transition-all duration-700 shimmer ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary shadow-lg shadow-primary/50"></span>
            </span>
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Beats Premium de Alta Calidad</span>
          </div>

          {/* Enhanced main heading with better gradient */}
          <h1
            className={`text-6xl md:text-8xl font-black leading-tight transition-all duration-700 delay-100 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            <span className="text-balance block">
              Eleva Tu Música Con{" "}
              <span className="relative inline-block">
                <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-primary via-secondary to-primary opacity-50" />
                <span className="relative animate-gradient-text">Beats Profesionales</span>
              </span>
            </span>
          </h1>

          {/* Enhanced description */}
          <p
            className={`text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed transition-all duration-700 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            Descubre instrumentales de alta calidad creados por productores profesionales. Descarga instantánea,
            licencias libres de regalías y calidad de sonido inigualable.
          </p>

          {/* Enhanced CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-5 transition-all duration-700 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white group px-8 py-6 text-lg font-semibold shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
            >
              <Link href="/catalog">
                <Play className="mr-2 h-6 w-6 group-hover:scale-110 transition-transform fill-white" />
                Explorar Catálogo
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-primary/30 hover:bg-primary/10 bg-transparent backdrop-blur-sm px-8 py-6 text-lg font-semibold group"
            >
              <Link href="#featured">
                <Zap className="mr-2 h-5 w-5 group-hover:text-primary transition-colors" />
                Ver Destacados
              </Link>
            </Button>
          </div>

          <div
            className={`grid grid-cols-3 gap-6 max-w-3xl mx-auto pt-16 transition-all duration-700 delay-500 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* Beats Card - Purple/Violet */}
            <Link href="/catalog" className="group">
              <div className="glass-card p-8 rounded-2xl space-y-4 hover:border-violet-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/20 bg-gradient-to-br from-violet-500/10 to-transparent">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mx-auto group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-violet-500/30">
                  <Music className="h-7 w-7 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-black bg-gradient-to-br from-violet-400 to-purple-600 bg-clip-text text-transparent">
                  Beats
                </div>
              </div>
            </Link>

            {/* Samples Card - Cyan/Blue */}
            <Link href="/samples" className="group">
              <div className="glass-card p-8 rounded-2xl space-y-4 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-transparent">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-cyan-500/30">
                  <Disc3 className="h-7 w-7 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-black bg-gradient-to-br from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                  Samples
                </div>
              </div>
            </Link>

            {/* MIDI Card - Pink/Rose */}
            <Link href="/midi" className="group">
              <div className="glass-card p-8 rounded-2xl space-y-4 hover:border-pink-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 bg-gradient-to-br from-pink-500/10 to-transparent">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mx-auto group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-pink-500/30">
                  <Piano className="h-7 w-7 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-black bg-gradient-to-br from-pink-400 to-rose-600 bg-clip-text text-transparent">
                  MIDI
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-7 h-12 rounded-full border-2 border-primary/40 flex items-start justify-center p-2 glass">
          <div className="w-1.5 h-4 bg-gradient-to-b from-primary to-secondary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
