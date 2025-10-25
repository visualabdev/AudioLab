"use client"

import { useState, useEffect } from 'react'
import { useConfigStore } from '@/lib/config-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ColorPicker } from '@/components/ui/color-picker'
import { DynamicLogo } from '@/components/dynamic-logo'
import { AdminTracksTab } from '@/components/admin/tracks-tab'
import { AdminPurchasesTab } from '@/components/admin/purchases-tab'
import { AnalyticsTab } from '@/components/admin/analytics-tab'
import { AdminContentTab } from '@/components/admin/content-tab'
import { useTracksStore } from '@/lib/tracks-store'
import { usePlayerStore } from '@/lib/player-store'
import { Save, RotateCcw, Upload, BarChart3, Music, ShoppingCart, Settings, Palette, ArrowLeft, FileText, Trash2 } from 'lucide-react'
import Link from 'next/link'

const iconOptions = [
  { value: 'Music2', label: 'Music Note' },
  { value: 'Disc3', label: 'Disc' },
  { value: 'Piano', label: 'Piano' },
  { value: 'Headphones', label: 'Headphones' },
  { value: 'Mic', label: 'Microphone' },
  { value: 'Radio', label: 'Radio' }
]

const colorPresets = [
  { name: 'Purple & Cyan (Default)', primary: '#8b5cf6', secondary: '#06b6d4' },
  { name: 'Blue & Green', primary: '#3b82f6', secondary: '#10b981' },
  { name: 'Red & Orange', primary: '#ef4444', secondary: '#f97316' },
  { name: 'Pink & Purple', primary: '#ec4899', secondary: '#a855f7' },
  { name: 'Teal & Blue', primary: '#14b8a6', secondary: '#3b82f6' }
]

export default function AdminPage() {
  const { config, updateConfig, resetConfig } = useConfigStore()
  const { clearAllData } = useTracksStore()
  const { stopTrack } = usePlayerStore()
  const [tempConfig, setTempConfig] = useState(config)
  const [activeTab, setActiveTab] = useState('analytics')

  // Sincronizar tempConfig con config cuando cambie
  useEffect(() => {
    setTempConfig(config)
  }, [config])

  const handleSave = () => {
    updateConfig(tempConfig)
    // Forzar actualización del estado local
    setTempConfig({ ...tempConfig })
    alert('Configuración guardada exitosamente!')
  }

  const handleReset = () => {
    resetConfig()
    setTempConfig(config)
    alert('Configuración restablecida a valores por defecto!')
  }

  const handleClearAllData = () => {
    if (confirm('¿Estás seguro de que quieres eliminar TODOS los tracks y datos? Esta acción no se puede deshacer.')) {
      stopTrack() // Stop any playing audio
      clearAllData() // Clear all tracks and localStorage
      alert('Todos los datos han sido eliminados. Ahora puedes subir contenido nuevo.')
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        setTempConfig({
          ...tempConfig,
          logo: { ...tempConfig.logo, imageUrl, type: 'image' }
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const applyColorPreset = (preset: typeof colorPresets[0]) => {
    setTempConfig({
      ...tempConfig,
      colors: {
        ...tempConfig.colors,
        primary: preset.primary,
        secondary: preset.secondary
      }
    })
  }

  const convertHexToOklch = (hex: string): string => {
    // Si ya es un valor OKLCH, devolverlo tal como está
    if (hex.includes('oklch')) return hex

    // Mapeo de colores hex comunes a OKLCH
    const colorMap: { [key: string]: string } = {
      '#8b5cf6': 'oklch(0.646 0.222 286.75)',
      '#06b6d4': 'oklch(0.696 0.17 197.137)',
      '#3b82f6': 'oklch(0.6 0.25 240)',
      '#10b981': 'oklch(0.7 0.2 150)',
      '#ef4444': 'oklch(0.6 0.25 20)',
      '#f97316': 'oklch(0.7 0.2 60)',
      '#ec4899': 'oklch(0.65 0.25 320)',
      '#a855f7': 'oklch(0.7 0.2 280)',
      '#14b8a6': 'oklch(0.6 0.2 180)'
    }

    // Si existe en el mapeo, usar el valor OKLCH
    if (colorMap[hex]) {
      return colorMap[hex]
    }

    // Para otros colores hex, usar el valor hex directamente
    // El CSS moderno soporta hex en custom properties
    return hex
  }

  const tabs = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'beats', label: 'Beats', icon: Music },
    { id: 'samples', label: 'Samples', icon: Music },
    { id: 'midis', label: 'MIDIs', icon: Music },
    { id: 'purchases', label: 'Compras', icon: ShoppingCart },
    { id: 'content', label: 'Contenido', icon: FileText },
    { id: 'customization', label: 'Personalización', icon: Palette }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <AnalyticsTab />
      case 'beats':
        return <AdminTracksTab category="beat" />
      case 'samples':
        return <AdminTracksTab category="sample" />
      case 'midis':
        return <AdminTracksTab category="midi" />
      case 'purchases':
        return <AdminPurchasesTab />
      case 'content':
        return <AdminContentTab />
      case 'customization':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Preview */}
            <Card className="glass-card border-primary/20 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                    <Settings className="h-5 w-5 text-primary" />
                  </div>
                  Vista Previa
                </CardTitle>
                <CardDescription className="text-base">Así se verá tu logo con la configuración actual</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-12 bg-gradient-to-br from-muted/30 to-transparent rounded-lg">
                <div className="p-8 rounded-2xl glass border border-primary/10">
                  <DynamicLogo />
                </div>
              </CardContent>
            </Card>

            {/* Configuration */}
            <Card className="glass-card border-primary/20 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20">
                    <Palette className="h-5 w-5 text-primary" />
                  </div>
                  Configuración
                </CardTitle>
                <CardDescription className="text-base">Personaliza el logo y los colores de tu sitio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Logo Configuration */}
                <div className="space-y-6 p-6 rounded-xl glass border border-primary/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                      <Settings className="h-5 w-5 text-blue-500" />
                    </div>
                    <h4 className="font-semibold text-xl">Configuración del Logo</h4>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logo-text">Texto del Logo</Label>
                    <Input
                      id="logo-text"
                      value={tempConfig.logo.text}
                      onChange={(e) => setTempConfig({
                        ...tempConfig,
                        logo: { ...tempConfig.logo, text: e.target.value }
                      })}
                      disabled={tempConfig.logo.type === 'image'}
                      placeholder={tempConfig.logo.type === 'image' ? 'No se usa con imagen personalizada' : 'Nombre de tu marca'}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="logo-subtitle">Subtítulo</Label>
                    <Input
                      id="logo-subtitle"
                      value={tempConfig.logo.subtitle}
                      onChange={(e) => setTempConfig({
                        ...tempConfig,
                        logo: { ...tempConfig.logo, subtitle: e.target.value }
                      })}
                      disabled={tempConfig.logo.type === 'image'}
                      placeholder={tempConfig.logo.type === 'image' ? 'No se usa con imagen personalizada' : 'Descripción corta'}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tipo de Logo</Label>
                    <Select
                      value={tempConfig.logo.type}
                      onValueChange={(value: 'icon' | 'image') => setTempConfig({
                        ...tempConfig,
                        logo: { ...tempConfig.logo, type: value }
                      })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="icon">Icono + Texto</SelectItem>
                        <SelectItem value="image">Imagen Completa (reemplaza todo)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {tempConfig.logo.type === 'image' && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        <strong>Nota:</strong> La imagen personalizada reemplazará completamente el logo (icono + texto).
                        Se recomienda usar una imagen horizontal con fondo transparente.
                      </p>
                    </div>
                  )}

                  {tempConfig.logo.type === 'icon' && (
                    <div className="space-y-2">
                      <Label>Icono</Label>
                      <Select
                        value={tempConfig.logo.iconName}
                        onValueChange={(value) => setTempConfig({
                          ...tempConfig,
                          logo: { ...tempConfig.logo, iconName: value }
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {iconOptions.map((icon) => (
                            <SelectItem key={icon.value} value={icon.value}>
                              {icon.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {tempConfig.logo.type === 'image' && (
                    <div className="space-y-2">
                      <Label htmlFor="logo-upload">Subir Imagen del Logo</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="logo-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="flex-1"
                        />
                        <Button size="icon" variant="outline" onClick={() => document.getElementById('logo-upload')?.click()}>
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                      {tempConfig.logo.imageUrl && (
                        <div className="mt-2">
                          <img
                            src={tempConfig.logo.imageUrl}
                            alt="Logo preview"
                            className="w-16 h-16 object-cover rounded border"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Color Configuration */}
                <div className="space-y-6 p-6 rounded-xl glass border border-primary/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500/20 to-orange-500/20">
                      <Palette className="h-5 w-5 text-pink-500" />
                    </div>
                    <h4 className="font-semibold text-xl">Configuración de Colores</h4>
                  </div>

                  <div className="space-y-4">
                    <h5 className="font-medium">Presets de Colores</h5>
                    <div className="grid grid-cols-1 gap-2">
                      {colorPresets.map((preset, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="justify-start h-auto p-3"
                          onClick={() => applyColorPreset(preset)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex gap-1">
                              <div
                                className="w-4 h-4 rounded-full border"
                                style={{ backgroundColor: preset.primary }}
                              />
                              <div
                                className="w-4 h-4 rounded-full border"
                                style={{ backgroundColor: preset.secondary }}
                              />
                            </div>
                            <span className="text-sm">{preset.name}</span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <ColorPicker
                    label="Color Primario"
                    value={tempConfig.colors.primary}
                    onChange={(color) => setTempConfig({
                      ...tempConfig,
                      colors: { ...tempConfig.colors, primary: convertHexToOklch(color) }
                    })}
                  />

                  <ColorPicker
                    label="Color Secundario"
                    value={tempConfig.colors.secondary}
                    onChange={(color) => setTempConfig({
                      ...tempConfig,
                      colors: { ...tempConfig.colors, secondary: convertHexToOklch(color) }
                    })}
                  />
                </div>

                <div className="flex gap-4 mt-8 p-6 rounded-xl glass border border-primary/10">
                  <Button
                    onClick={handleSave}
                    className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
                    size="lg"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Guardar Cambios
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="border-2 border-muted-foreground/20 hover:bg-muted/50"
                    size="lg"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Restablecer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return <div>Sección no encontrada</div>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="glass border-primary/20 hover:bg-primary/10"
            >
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver al Inicio
              </Link>
            </Button>
          </div>
          <div className="text-center flex-1">
            <h1 className="text-5xl font-black mb-2 animate-gradient-text">Panel de Administración</h1>
            <p className="text-muted-foreground text-lg">Gestiona tu tienda de beats y personaliza tu sitio</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleClearAllData}
              variant="outline"
              size="sm"
              className="border-red-500/50 text-red-500 hover:bg-red-500/10 hover:border-red-500"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Limpiar Datos
            </Button>
          </div>
        </div>

        {/* Modern Card Navigation */}
        <div className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id

              return (
                <Card
                  key={tab.id}
                  className={`cursor-pointer transition-all duration-300 hover:scale-105 group ${isActive
                    ? 'glass-card border-primary/50 shadow-2xl shadow-primary/20 bg-gradient-to-br from-primary/10 to-secondary/10'
                    : 'glass border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10'
                    }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <CardContent className="p-6 text-center space-y-3">
                    <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center transition-all duration-300 ${isActive
                      ? 'bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/30'
                      : 'bg-muted group-hover:bg-gradient-to-br group-hover:from-primary/20 group-hover:to-secondary/20'
                      }`}>
                      <Icon className={`h-6 w-6 transition-colors ${isActive ? 'text-white' : 'text-muted-foreground group-hover:text-primary'
                        }`} />
                    </div>
                    <h3 className={`font-semibold text-sm transition-colors ${isActive ? 'text-primary' : 'text-foreground group-hover:text-primary'
                      }`}>
                      {tab.label}
                    </h3>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Tab Content with Enhanced Styling */}
        <div className="space-y-6">
          <div className="glass-card p-8 rounded-2xl border border-border/50 shadow-2xl">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  )
}