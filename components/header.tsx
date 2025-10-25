"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { CartSheet } from "@/components/cart-sheet"
import { Button } from "@/components/ui/button"
import { DynamicLogo } from "@/components/dynamic-logo"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-4 py-4 flex flex-col items-center justify-center">
        {/* Logo */}
        <Link href="/" className="mb-4">
          <DynamicLogo />
        </Link>

        {/* Navigation */}
        <div className="flex items-center justify-between w-full max-w-4xl">
          <nav className="hidden md:flex items-center gap-8 mx-auto">

            <Link
              href="/"
              className="text-sm font-medium text-foreground hover:text-primary transition-all duration-300 relative group"
            >
              Inicio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/beats"
              className="text-sm font-medium text-foreground hover:text-primary transition-all duration-300 relative group"
            >
              Beats
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/samples"
              className="text-sm font-medium text-foreground hover:text-primary transition-all duration-300 relative group"
            >
              Samples
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/midis"
              className="text-sm font-medium text-foreground hover:text-primary transition-all duration-300 relative group"
            >
              Midis
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="/contacto"
              className="text-sm font-medium text-foreground hover:text-primary transition-all duration-300 relative group"
            >
              Contacto
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
            </Link>
          </nav>

          <div className="flex items-center gap-3 md:absolute md:right-4">
            <CartSheet />
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
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
              href="/beats"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Beats
            </Link>
            <Link
              href="/samples"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Samples
            </Link>
            <Link
              href="/midis"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Midis
            </Link>
            <Link
              href="/contacto"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contacto
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
