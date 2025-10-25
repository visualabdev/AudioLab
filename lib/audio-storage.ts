// Audio storage utilities for handling uploaded files
// SIMPLIFIED VERSION - No IndexedDB, just in-memory storage

// Extend Window interface to include our audio files map
declare global {
  interface Window {
    __audioFiles?: Map<string, File>
  }
}

export class AudioStorage {
  // Store audio file - Creates blob URL and stores in memory
  static async storeAudioFile(id: string, file: File): Promise<string> {
    console.log('💾 Almacenando archivo de audio:', {
      id,
      nombre: file.name,
      tipo: file.type,
      tamaño: `${(file.size / 1024 / 1024).toFixed(2)} MB`
    })
    
    // Create blob URL directly - simple and reliable
    const blobUrl = URL.createObjectURL(file)
    console.log('✅ Blob URL creada:', blobUrl)
    
    // Store file reference in memory for this session
    if (typeof window !== 'undefined') {
      if (!window.__audioFiles) {
        window.__audioFiles = new Map()
      }
      window.__audioFiles.set(id, file)
      console.log('✅ Archivo almacenado en memoria para esta sesión')
    }
    
    return blobUrl
  }

  // Retrieve audio file from memory
  static async getAudioFile(id: string): Promise<string | null> {
    console.log('🔍 Buscando archivo en memoria:', id)
    
    // Try to get from memory
    if (typeof window !== 'undefined' && window.__audioFiles) {
      const file = window.__audioFiles.get(id)
      if (file) {
        const blobUrl = URL.createObjectURL(file)
        console.log('✅ Archivo encontrado en memoria, blob URL creada:', blobUrl)
        return blobUrl
      }
    }
    
    console.warn('⚠️ Archivo no encontrado en memoria')
    console.info('💡 Nota: Los archivos solo persisten durante la sesión actual')
    return null
  }

  // Delete audio file from memory
  static async deleteAudioFile(id: string): Promise<void> {
    console.log('🗑️ Eliminando archivo de memoria:', id)
    
    if (typeof window !== 'undefined' && window.__audioFiles) {
      window.__audioFiles.delete(id)
      console.log('✅ Archivo eliminado de la memoria')
    }
  }

  // Clear all audio files from memory
  static async clearAllAudioFiles(): Promise<void> {
    console.log('🗑️ Limpiando todos los archivos de audio de la memoria')
    
    if (typeof window !== 'undefined' && window.__audioFiles) {
      window.__audioFiles.clear()
      console.log('✅ Todos los archivos limpiados de la memoria')
    }
  }

  // Check if URL is a blob URL
  static isBlobURL(url: string): boolean {
    return url.startsWith('blob:')
  }
}
