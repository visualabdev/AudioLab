"use client"

import { useEffect } from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Ensure dark mode is applied
    document.documentElement.classList.add('dark')
    document.body.classList.add('dark')
    
    // Set the theme color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', '#0d0d0d')
    } else {
      const meta = document.createElement('meta')
      meta.name = 'theme-color'
      meta.content = '#0d0d0d'
      document.head.appendChild(meta)
    }
  }, [])

  return <>{children}</>
}