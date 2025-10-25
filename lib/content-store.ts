import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface PageContent {
  id: string
  title: string
  subtitle?: string
  description?: string
  sections: ContentSection[]
}

export interface ContentSection {
  id: string
  type: 'hero' | 'text' | 'list' | 'stats' | 'team' | 'faq' | 'contact'
  title: string
  content: any
}

interface ContentStore {
  pages: { [key: string]: PageContent }
  updatePage: (pageId: string, content: PageContent) => void
  updateSection: (pageId: string, sectionId: string, content: any) => void
  resetPage: (pageId: string) => void
}

const defaultContent = {
  home: {
    id: 'home',
    title: 'AudioLab',
    subtitle: 'Premium Beats & Instrumentals',
    description: 'Descubre y compra beats e instrumentales de alta calidad para tu próximo proyecto',
    sections: [
      {
        id: 'hero',
        type: 'hero' as const,
        title: 'Hero Section',
        content: {
          mainTitle: 'Eleva Tu Música Con Beats Profesionales',
          subtitle: 'Descubre instrumentales de alta calidad creados por productores profesionales. Descarga instantánea, licencias libres de regalías y calidad de sonido inigualable.',
          ctaText: 'Explorar Catálogo',
          ctaSecondary: 'Ver Destacados'
        }
      }
    ]
  },
  about: {
    id: 'about',
    title: 'Sobre AudioLab',
    description: 'Conoce nuestra historia, equipo y valores',
    sections: [
      {
        id: 'hero',
        type: 'hero' as const,
        title: 'Hero Section',
        content: {
          mainTitle: 'Sobre AudioLab',
          subtitle: 'Somos un estudio de producción musical dedicado a crear beats, samples y contenido MIDI de la más alta calidad. Nuestra misión es empoderar a artistas y productores con herramientas musicales profesionales.'
        }
      },
      {
        id: 'story',
        type: 'text' as const,
        title: 'Nuestra Historia',
        content: {
          text: 'AudioLab nació en 2016 de la pasión por la música y la tecnología. Lo que comenzó como un pequeño estudio casero se ha convertido en una plataforma reconocida mundialmente por la calidad de sus producciones.'
        }
      },
      {
        id: 'mission',
        type: 'text' as const,
        title: 'Nuestra Misión',
        content: {
          text: 'Democratizar la producción musical proporcionando acceso a contenido de calidad profesional a precios accesibles para artistas de todos los niveles.'
        }
      }
    ]
  },
  contact: {
    id: 'contact',
    title: 'Contacto',
    description: '¿Tienes alguna pregunta o necesitas ayuda? Estamos aquí para ayudarte',
    sections: [
      {
        id: 'contact-info',
        type: 'contact' as const,
        title: 'Información de Contacto',
        content: {
          email: 'contact@audiolab.com',
          supportEmail: 'support@audiolab.com',
          phone: '+1 (555) 123-4567',
          address: 'Los Angeles, CA, Estados Unidos',
          hours: {
            weekdays: '9:00 AM - 6:00 PM',
            saturday: '10:00 AM - 4:00 PM',
            sunday: 'Cerrado'
          }
        }
      }
    ]
  },
  faq: {
    id: 'faq',
    title: 'Preguntas Frecuentes',
    description: 'Encuentra respuestas a las preguntas más comunes sobre nuestros productos y servicios',
    sections: [
      {
        id: 'faq-categories',
        type: 'faq' as const,
        title: 'Categorías de FAQ',
        content: {
          categories: [
            {
              title: 'Compras y Pagos',
              faqs: [
                {
                  question: '¿Qué métodos de pago aceptan?',
                  answer: 'Aceptamos todas las tarjetas de crédito principales (Visa, MasterCard, American Express), PayPal, y transferencias bancarias.'
                }
              ]
            }
          ]
        }
      }
    ]
  }
}

export const useContentStore = create<ContentStore>()(
  persist(
    (set, get) => ({
      pages: defaultContent,
      updatePage: (pageId, content) =>
        set((state) => ({
          pages: { ...state.pages, [pageId]: content }
        })),
      updateSection: (pageId, sectionId, content) =>
        set((state) => {
          const page = state.pages[pageId]
          if (!page) return state
          
          const updatedSections = page.sections.map(section =>
            section.id === sectionId ? { ...section, content } : section
          )
          
          return {
            pages: {
              ...state.pages,
              [pageId]: { ...page, sections: updatedSections }
            }
          }
        }),
      resetPage: (pageId) =>
        set((state) => ({
          pages: { ...state.pages, [pageId]: defaultContent[pageId as keyof typeof defaultContent] }
        }))
    }),
    {
      name: 'audiolab-content'
    }
  )
)