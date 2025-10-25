"use client"

import { useState } from 'react'
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
import { AdminAnalyticsTab } from '@/components/admin/analytics-tab'
import { Save, RotateCcw, Upload, BarChart3, Music, ShoppingCart, Settings, Palette } from 'lucide-react'

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
  const [tempConfig, setTempConfig] = useState(config)
  const [activeTab, setActiveTab] = useState('analytics')

  const handleSave = () => {
    updateConfig(tempConfig)
    alert('Configuración guardada exitosamente!')
  }

  const handleReset = () => {
    resetConfig()
    setTempConfig(config)
    alert('Configuración restablecida a valores por defecto!')
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
    return colorMap[hex] || hex
  }

  const tabs = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'beats', label: 'Beats', icon: Music },
    { id: 'samples', label: 'Samples', icon: Music },
    { id: 'midis', label: 'MIDIs', icon: Music },
    { id: 'purchases', label: 'Compras', icon: ShoppingCart },
    { id: 'customization', label: 'Personalización', icon: Palette }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <AdminAnalyticsTab />
      case 'beats':
        return <AdminTracksTab category="beat" />
      case 'samples':
        return <AdminTracksTab category="sample" />
      case 'midis':
        return <AdminTracksTab category="midi" />
      case 'purchases':
        return <AdminPurchasesTab />
      case 'customization':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Vista Previa
                </CardTitle>
                <CardDescription>Así se verá tu logo con la configuración actual</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-8">
                <DynamicLogo />
              </CardContent>
            </Card>

            {/* Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Configuración
                </CardTitle>
                <CardDescription>Personaliza el logo y los colores de tu sitio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Logo Configuration */}
                <div className="space-y-4">
                  <h4 className="font-medium text-lg">Configuración del Logo</h4>

                  <div className="space-y-2">
                    <Label htmlFor="logo-text">Texto del Logo</Label>
                    <Input
                      id="logo-text"
                      value={tempConfig.logo.text}
                      onChange={(e) => setTempConfig({
                        ...tempConfig,
                        logo: { ...tempConfig.logo, text: e.target.value }
                      })}
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
                        <SelectItem value="icon">Icono</SelectItem>
                        <SelectItem value="image">Imagen Personalizada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

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
                <div className="space-y-4 border-t pt-6">
                  <h4 className="font-medium text-lg">Configuración de Colores</h4>

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

                <div className="flex gap-2 mt-6">
                  <Button onClick={handleSave} className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Cambios
                  </Button>
                  <Button onClick={handleReset} variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
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
    <div className="min-h-screen bg-background pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Panel de Administración</h1>
          <p className="text-muted-foreground">Gestiona tu tienda de beats y personaliza tu sitio</p>
        </div>

        {/* Custom Tab Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 p-1 bg-muted rounded-lg">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab.id
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                    }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}