"use client"

import { useState } from 'react'
import { useContentStore } from '@/lib/content-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Save, RotateCcw, FileText, Home, Users, Phone, HelpCircle, Eye } from 'lucide-react'

export function AdminContentTab() {
  const { pages, updatePage, updateSection, resetPage } = useContentStore()
  const [selectedPage, setSelectedPage] = useState('home')
  const [previewMode, setPreviewMode] = useState(false)

  const pagesList = [
    { id: 'home', name: 'Página de Inicio', icon: Home },
    { id: 'about', name: 'Sobre Nosotros', icon: Users },
    { id: 'contact', name: 'Contacto', icon: Phone },
    { id: 'faq', name: 'FAQ', icon: HelpCircle }
  ]

  const currentPage = pages[selectedPage]

  const handlePageUpdate = (field: string, value: string) => {
    if (!currentPage) return
    
    const updatedPage = { ...currentPage, [field]: value }
    updatePage(selectedPage, updatedPage)
  }

  const handleSectionUpdate = (sectionId: string, field: string, value: any) => {
    if (!currentPage) return
    
    const section = currentPage.sections.find(s => s.id === sectionId)
    if (!section) return
    
    const updatedContent = { ...section.content, [field]: value }
    updateSection(selectedPage, sectionId, updatedContent)
  }

  const handleResetPage = () => {
    if (confirm('¿Estás seguro de que quieres restablecer esta página a su contenido original?')) {
      resetPage(selectedPage)
    }
  }

  const renderSectionEditor = (section: any) => {
    switch (section.type) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Título Principal</Label>
              <Input
                value={section.content.mainTitle || ''}
                onChange={(e) => handleSectionUpdate(section.id, 'mainTitle', e.target.value)}
                placeholder="Título principal del hero"
              />
            </div>
            <div className="space-y-2">
              <Label>Subtítulo</Label>
              <Textarea
                value={section.content.subtitle || ''}
                onChange={(e) => handleSectionUpdate(section.id, 'subtitle', e.target.value)}
                placeholder="Descripción o subtítulo"
                rows={3}
              />
            </div>
            {section.content.ctaText && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Texto Botón Principal</Label>
                  <Input
                    value={section.content.ctaText || ''}
                    onChange={(e) => handleSectionUpdate(section.id, 'ctaText', e.target.value)}
                    placeholder="Texto del botón"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Texto Botón Secundario</Label>
                  <Input
                    value={section.content.ctaSecondary || ''}
                    onChange={(e) => handleSectionUpdate(section.id, 'ctaSecondary', e.target.value)}
                    placeholder="Texto del botón secundario"
                  />
                </div>
              </div>
            )}
          </div>
        )

      case 'text':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Contenido</Label>
              <Textarea
                value={section.content.text || ''}
                onChange={(e) => handleSectionUpdate(section.id, 'text', e.target.value)}
                placeholder="Contenido de texto"
                rows={6}
              />
            </div>
          </div>
        )

      case 'contact':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email Principal</Label>
                <Input
                  value={section.content.email || ''}
                  onChange={(e) => handleSectionUpdate(section.id, 'email', e.target.value)}
                  placeholder="contact@audiolab.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Email de Soporte</Label>
                <Input
                  value={section.content.supportEmail || ''}
                  onChange={(e) => handleSectionUpdate(section.id, 'supportEmail', e.target.value)}
                  placeholder="support@audiolab.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Teléfono</Label>
                <Input
                  value={section.content.phone || ''}
                  onChange={(e) => handleSectionUpdate(section.id, 'phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label>Dirección</Label>
                <Input
                  value={section.content.address || ''}
                  onChange={(e) => handleSectionUpdate(section.id, 'address', e.target.value)}
                  placeholder="Los Angeles, CA"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Horarios de Atención</Label>
              <div className="grid grid-cols-3 gap-2">
                <Input
                  value={section.content.hours?.weekdays || ''}
                  onChange={(e) => handleSectionUpdate(section.id, 'hours', { 
                    ...section.content.hours, 
                    weekdays: e.target.value 
                  })}
                  placeholder="Lun-Vie"
                />
                <Input
                  value={section.content.hours?.saturday || ''}
                  onChange={(e) => handleSectionUpdate(section.id, 'hours', { 
                    ...section.content.hours, 
                    saturday: e.target.value 
                  })}
                  placeholder="Sábados"
                />
                <Input
                  value={section.content.hours?.sunday || ''}
                  onChange={(e) => handleSectionUpdate(section.id, 'hours', { 
                    ...section.content.hours, 
                    sunday: e.target.value 
                  })}
                  placeholder="Domingos"
                />
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="p-4 bg-muted/30 rounded-lg text-center">
            <p className="text-muted-foreground">
              Editor para tipo "{section.type}" no implementado aún
            </p>
          </div>
        )
    }
  }

  if (!currentPage) {
    return (
      <div className="text-center py-12">
        <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-2xl font-semibold mb-2">Página no encontrada</h3>
        <p className="text-muted-foreground">Selecciona una página válida para editar.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">Gestión de Contenido</h2>
          <p className="text-sm text-muted-foreground">
            Edita el contenido de todas las páginas del sitio web
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            {previewMode ? 'Editar' : 'Vista Previa'}
          </Button>
          <Button
            variant="outline"
            onClick={handleResetPage}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Restablecer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Page Selector */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Páginas</CardTitle>
            <CardDescription>Selecciona una página para editar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {pagesList.map((page) => {
              const Icon = page.icon
              return (
                <Button
                  key={page.id}
                  variant={selectedPage === page.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedPage(page.id)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {page.name}
                </Button>
              )
            })}
          </CardContent>
        </Card>

        {/* Content Editor */}
        <div className="lg:col-span-3 space-y-6">
          {/* Page Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Configuración de Página
              </CardTitle>
              <CardDescription>
                Configuración general de la página seleccionada
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Título de la Página</Label>
                  <Input
                    value={currentPage.title}
                    onChange={(e) => handlePageUpdate('title', e.target.value)}
                    placeholder="Título principal"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subtítulo (opcional)</Label>
                  <Input
                    value={currentPage.subtitle || ''}
                    onChange={(e) => handlePageUpdate('subtitle', e.target.value)}
                    placeholder="Subtítulo de la página"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Descripción</Label>
                <Textarea
                  value={currentPage.description || ''}
                  onChange={(e) => handlePageUpdate('description', e.target.value)}
                  placeholder="Descripción de la página"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Sections Editor */}
          <Card>
            <CardHeader>
              <CardTitle>Secciones de Contenido</CardTitle>
              <CardDescription>
                Edita el contenido de cada sección de la página
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentPage.sections.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No hay secciones configuradas para esta página.</p>
                </div>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {currentPage.sections.map((section, index) => (
                    <AccordionItem key={section.id} value={section.id}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-xs">
                            {section.type}
                          </Badge>
                          <span>{section.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
                        {renderSectionEditor(section)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>

          {/* Save Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Button 
                  className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg shadow-primary/30"
                  size="lg"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Guardar Cambios
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => window.open(`/${selectedPage === 'home' ? '' : selectedPage}`, '_blank')}
                  size="lg"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Ver Página
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}