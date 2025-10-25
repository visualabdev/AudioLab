"use client"

import { usePageContent } from '@/hooks/use-page-content'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface DynamicContentProps {
  pageId: string
  sectionId: string
  fallback?: React.ReactNode
  className?: string
}

export function DynamicContent({ pageId, sectionId, fallback, className }: DynamicContentProps) {
  const { getSectionContent } = usePageContent(pageId)
  const content = getSectionContent(sectionId)
  
  if (!content && fallback) {
    return <>{fallback}</>
  }
  
  return (
    <div className={className}>
      {content}
    </div>
  )
}

interface DynamicHeroProps {
  pageId: string
  className?: string
  showButtons?: boolean
}

export function DynamicHero({ pageId, className, showButtons = false }: DynamicHeroProps) {
  const { getSectionContent } = usePageContent(pageId)
  const heroContent = getSectionContent('hero')
  
  return (
    <div className={className}>
      {heroContent.mainTitle && (
        <h1 className="text-5xl font-black mb-4 animate-gradient-text">
          {heroContent.mainTitle}
        </h1>
      )}
      {heroContent.subtitle && (
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {heroContent.subtitle}
        </p>
      )}
      {showButtons && (heroContent.ctaText || heroContent.ctaSecondary) && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-8">
          {heroContent.ctaText && (
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white group px-8 py-6 text-lg font-semibold shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
            >
              <Link href="/catalog">
                {heroContent.ctaText}
              </Link>
            </Button>
          )}
          {heroContent.ctaSecondary && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-primary/30 hover:bg-primary/10 bg-transparent backdrop-blur-sm px-8 py-6 text-lg font-semibold group"
            >
              <Link href="#featured">
                {heroContent.ctaSecondary}
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

interface DynamicTextProps {
  pageId: string
  sectionId: string
  className?: string
  fallback?: string
}

export function DynamicText({ pageId, sectionId, className, fallback }: DynamicTextProps) {
  const { getSectionContent } = usePageContent(pageId)
  const content = getSectionContent(sectionId)
  
  const text = content.text || fallback || ''
  
  return (
    <div className={className}>
      <p className="text-muted-foreground leading-relaxed">
        {text}
      </p>
    </div>
  )
}

interface DynamicContactProps {
  pageId: string
  className?: string
}

export function DynamicContact({ pageId, className }: DynamicContactProps) {
  const { getSectionContent } = usePageContent(pageId)
  const contactContent = getSectionContent('contact-info')
  
  return (
    <div className={className}>
      {contactContent.email && (
        <p className="text-muted-foreground">
          <strong>Email:</strong> {contactContent.email}
        </p>
      )}
      {contactContent.supportEmail && (
        <p className="text-muted-foreground">
          <strong>Soporte:</strong> {contactContent.supportEmail}
        </p>
      )}
      {contactContent.phone && (
        <p className="text-muted-foreground">
          <strong>Teléfono:</strong> {contactContent.phone}
        </p>
      )}
      {contactContent.address && (
        <p className="text-muted-foreground">
          <strong>Dirección:</strong> {contactContent.address}
        </p>
      )}
      {contactContent.hours && (
        <div className="mt-4">
          <p className="text-muted-foreground">
            <strong>Horarios:</strong>
          </p>
          <div className="text-sm text-muted-foreground ml-4">
            {contactContent.hours.weekdays && (
              <p>Lunes - Viernes: {contactContent.hours.weekdays}</p>
            )}
            {contactContent.hours.saturday && (
              <p>Sábados: {contactContent.hours.saturday}</p>
            )}
            {contactContent.hours.sunday && (
              <p>Domingos: {contactContent.hours.sunday}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}