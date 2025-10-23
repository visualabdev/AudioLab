"use client"

import Link from "next/link"
import { Music2, Menu } from "lucide-react"
import { CartSheet } from "@/components/cart-sheet"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-primary/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full animate-pulse-glow" />
            <div className="relative bg-gradient-to-br from-primary to-secondary p-2.5 rounded-xl">
              <Music2 className="h-7 w-7 text-white transition-transform group-hover:scale-110 group-hover:rotate-12" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold animate-gradient-text">AudioLab</span>
            <span className="text-[10px] text-muted-foreground tracking-wider uppercase">Premium Beats</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-foreground hover:text-primary transition-all duration-300 relative group"
          >
            Inicio
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="/catalog"
            className="text-sm font-medium text-foreground hover:text-primary transition-all duration-300 relative group"
          >
            Catálogo
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="/admin"
            className="text-sm font-medium text-foreground hover:text-primary transition-all duration-300 relative group"
          >
            Admin
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <CartSheet />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-t border-primary/10">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <Link
              href="/"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/catalog"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Catálogo
            </Link>
            <Link
              href="/admin"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
