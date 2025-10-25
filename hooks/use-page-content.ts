"use client"

import { useContentStore } from '@/lib/content-store'

export function usePageContent(pageId: string) {
  const { pages } = useContentStore()
  
  const page = pages[pageId]
  
  const getSection = (sectionId: string) => {
    return page?.sections.find(section => section.id === sectionId)
  }
  
  const getSectionContent = (sectionId: string) => {
    const section = getSection(sectionId)
    return section?.content || {}
  }
  
  return {
    page,
    getSection,
    getSectionContent,
    title: page?.title || '',
    subtitle: page?.subtitle || '',
    description: page?.description || ''
  }
}