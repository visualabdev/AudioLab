import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { GlobalPlayer } from "@/components/global-player"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AudioLab - Premium Beats & Instrumentals",
  description: "Discover and purchase high-quality beats and instrumentals for your next project",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
          <GlobalPlayer />
        </ThemeProvider>
      </body>
    </html>
  )
}
