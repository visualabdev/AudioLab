import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface SiteConfig {
  logo: {
    type: 'icon' | 'image'
    iconName: string
    imageUrl: string
    text: string
    subtitle: string
  }
  colors: {
    primary: string
    secondary: string
    background: string
    foreground: string
  }
}

interface ConfigStore {
  config: SiteConfig
  updateConfig: (config: Partial<SiteConfig>) => void
  resetConfig: () => void
}

const defaultConfig: SiteConfig = {
  logo: {
    type: 'icon',
    iconName: 'Music2',
    imageUrl: '',
    text: 'AudioLab',
    subtitle: 'Premium Beats'
  },
  colors: {
    primary: 'oklch(0.646 0.222 286.75)', // Purple
    secondary: 'oklch(0.696 0.17 197.137)', // Cyan
    background: 'oklch(0.051 0 0)', // Dark
    foreground: 'oklch(0.985 0 0)' // Light
  }
}

export const useConfigStore = create<ConfigStore>()(
  persist(
    (set) => ({
      config: defaultConfig,
      updateConfig: (newConfig) =>
        set((state) => ({
          config: { ...state.config, ...newConfig }
        })),
      resetConfig: () => set({ config: defaultConfig })
    }),
    {
      name: 'audiolab-config'
    }
  )
)