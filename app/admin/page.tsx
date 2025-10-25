"use client"

import { useState } from 'react'
import { useConfigStore } from '@/lib/config-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DynamicLogo } from '@/components/dynamic-logo'
import { Save, RotateCcw, Upload } from 'lucide-react'

const iconOptions = [
  { value: 'Music2', label: 'Music Note' },
  { value: 'Disc3', label: 'Disc' },
  { value: 'Piano', label: 'Piano' },
  { value: 'Headphones', label: 'Headphones' },
  { value: 'Mic', label: 'Microphone' },
  { value: 'Radio', label: 'Radio' }
]

const colorPresets = [
  { name: 'Purple & Cyan (Default)', primary: 'oklch(0.646 0.222 286.75)', secondary: 'oklch(0.696 0.17 197.137)' },
  { name: 'Blue & Green', primary: 'oklch(0.6 0.25 240)', secondary: 'oklch(0.7 0.2 150)' },
  { name: 'Red & Orange', primary: 'oklch(0.6 0.25 20)', secondary: 'oklch(0.7 0.2 60)' },
  { name: 'Pink & Purple', primary: 'oklch(0.65 0.25 320)', secondary: 'oklch(0.7 0.2 280)' },
  { name: 'Teal & Blue', primary: 'oklch(0.6 0.2 180)', secondary: 'oklch(0.65 0.25 220)' }
]

export default function AdminPage() {
  const { config, updateConfig, resetConfig } = useConfigStore()
  const [tempConfig, setTempConfig] = useState(config)

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

  return (
    <div className="min-h-screen bg-background pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Panel de Administración</h1>
          <p className="text-muted-foreground">Personaliza el logo y los colores de tu sitio</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Vista Previa</CardTitle>
              <CardDescription>Así se verá tu logo con la configuración actual</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center p-8">
              <DynamicLogo />
            </CardContent>
          </Card>

          {/* Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Configuración</CardTitle>
              <CardDescription>Personaliza el logo y los colores</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="logo" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="logo">Logo</TabsTrigger>
                  <TabsTrigger value="colors">Colores</TabsTrigger>
                </TabsList>

                <TabsContent value="logo" className="space-y-4">
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
                        <SelectItem value="image">Imagen</SelectItem>
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
                      <Label htmlFor="logo-upload">Subir Imagen</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="logo-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="flex-1"
                        />
                        <Button size="icon" variant="outline">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="colors" className="space-y-4">
                  <div className="space-y-4">
                    <h4 className="font-medium">Presets de Colores</h4>
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
                                style={{ backgroundColor: `color(${preset.primary})` }}
                              />
                              <div 
                                className="w-4 h-4 rounded-full border"
                                style={{ backgroundColor: `color(${preset.secondary})` }}
                              />
                            </div>
                            <span className="text-sm">{preset.name}</span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="primary-color">Color Primario</Label>
                    <Input
                      id="primary-color"
                      value={tempConfig.colors.primary}
                      onChange={(e) => setTempConfig({
                        ...tempConfig,
                        colors: { ...tempConfig.colors, primary: e.target.value }
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondary-color">Color Secundario</Label>
                    <Input
                      id="secondary-color"
                      value={tempConfig.colors.secondary}
                      onChange={(e) => setTempConfig({
                        ...tempConfig,
                        colors: { ...tempConfig.colors, secondary: e.target.value }
                      })}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-2 mt-6">
                <Button onClick={handleSave} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Guardar
                </Button>
                <Button onClick={handleReset} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Restablecer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}