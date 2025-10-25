"use client"

import { useConfigStore } from '@/lib/config-store'
import { useEffect } from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { config } = useConfigStore()

  useEffect(() => {
    const root = document.documentElement
    
    // Función para convertir colores a un formato CSS válido
    const processColor = (color: string) => {
      // Si es OKLCH, usar tal como está
      if (color.includes('oklch')) return color
      // Si es hex, usar tal como está (CSS moderno lo soporta)
      if (color.startsWith('#')) return color
      // Fallback
      return color
    }
    
    // Apply custom colors to CSS variables
    root.style.setProperty('--primary', processColor(config.colors.primary))
    root.style.setProperty('--secondary', processColor(config.colors.secondary))
    root.style.setProperty('--background', processColor(config.colors.background))
    root.style.setProperty('--foreground', processColor(config.colors.foreground))
    
    // Also update the color- prefixed variables for Tailwind
    root.style.setProperty('--color-primary', processColor(config.colors.primary))
    root.style.setProperty('--color-secondary', processColor(config.colors.secondary))
    root.style.setProperty('--color-background', processColor(config.colors.background))
    root.style.setProperty('--color-foreground', processColor(config.colors.foreground))
    
    // Debug: log the applied colors
    console.log('Applied colors:', {
      primary: config.colors.primary,
      secondary: config.colors.secondary
    })
  }, [config.colors])

  return <>{children}</>
}