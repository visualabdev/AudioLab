"use client"

import { useConfigStore } from '@/lib/config-store'
import { Music2, Disc3, Piano, Headphones, Mic, Radio } from 'lucide-react'
import Image from 'next/image'

const iconMap = {
  Music2,
  Disc3,
  Piano,
  Headphones,
  Mic,
  Radio
}

export function DynamicLogo({ className = "" }: { className?: string }) {
  const { config } = useConfigStore()
  const { logo } = config

  const IconComponent = iconMap[logo.iconName as keyof typeof iconMap] || Music2

  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full animate-pulse-glow" />
        <div className="relative bg-gradient-to-br from-primary to-secondary p-2.5 rounded-xl">
          {logo.type === 'icon' ? (
            <IconComponent className="h-7 w-7 text-white transition-transform group-hover:scale-110 group-hover:rotate-12" />
          ) : logo.imageUrl ? (
            <Image
              src={logo.imageUrl}
              alt={logo.text}
              width={28}
              height={28}
              className="transition-transform group-hover:scale-110 group-hover:rotate-12 rounded"
            />
          ) : (
            <Music2 className="h-7 w-7 text-white transition-transform group-hover:scale-110 group-hover:rotate-12" />
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold animate-gradient-text">{logo.text}</span>
        <span className="text-[10px] text-muted-foreground tracking-wider uppercase">{logo.subtitle}</span>
      </div>
    </div>
  )
}