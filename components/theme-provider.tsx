"use client"

import { useConfigStore } from '@/lib/config-store'
import { useEffect } from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { config } = useConfigStore()

  useEffect(() => {
    const root = document.documentElement
    
    // Apply custom colors to CSS variables
    root.style.setProperty('--primary', config.colors.primary)
    root.style.setProperty('--secondary', config.colors.secondary)
    root.style.setProperty('--background', config.colors.background)
    root.style.setProperty('--foreground', config.colors.foreground)
    
    // Also update the color- prefixed variables for Tailwind
    root.style.setProperty('--color-primary', config.colors.primary)
    root.style.setProperty('--color-secondary', config.colors.secondary)
    root.style.setProperty('--color-background', config.colors.background)
    root.style.setProperty('--color-foreground', config.colors.foreground)
  }, [config.colors])

  return <>{children}</>
}