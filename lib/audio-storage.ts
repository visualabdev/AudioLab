// Audio storage utilities for handling uploaded files
export class AudioStorage {
  private static dbName = 'AudioLabDB'
  private static version = 1
  private static storeName = 'audioFiles'

  // Initialize IndexedDB
  static async initDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName, { keyPath: 'id' })
        }
      }
    })
  }

  // Store audio file
  static async storeAudioFile(id: string, file: File): Promise<string> {
    try {
      console.log('💾 Iniciando almacenamiento en IndexedDB:', {
        id,
        nombre: file.name,
        tipo: file.type,
        tamaño: `${(file.size / 1024 / 1024).toFixed(2)} MB`
      })
      
      const db = await this.initDB()
      const transaction = db.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      
      // Convert file to ArrayBuffer for storage
      const arrayBuffer = await file.arrayBuffer()
      console.log('✅ Archivo convertido a ArrayBuffer:', arrayBuffer.byteLength, 'bytes')
      
      await new Promise((resolve, reject) => {
        const request = store.put({
          id,
          name: file.name,
          type: file.type,
          size: file.size,
          data: arrayBuffer,
          timestamp: Date.now()
        })
        request.onsuccess = () => {
          console.log('✅ Archivo guardado en IndexedDB exitosamente')
          resolve(request.result)
        }
        request.onerror = () => {
          console.error('❌ Error guardando en IndexedDB:', request.error)
          reject(request.error)
        }
      })
      
      db.close()
      const customUrl = `audiolab://audio/${id}`
      console.log('✅ URL personalizada generada:', customUrl)
      return customUrl
    } catch (error) {
      console.error('❌ Error storing audio file:', error)
      // Fallback to blob URL
      const blobUrl = URL.createObjectURL(file)
      console.warn('⚠️ Usando blob URL como fallback:', blobUrl)
      return blobUrl
    }
  }

  // Retrieve audio file
  static async getAudioFile(id: string): Promise<string | null> {
    try {
      console.log('🔍 Buscando archivo en IndexedDB:', id)
      
      const db = await this.initDB()
      const transaction = db.transaction([this.storeName], 'readonly')
      const store = transaction.objectStore(this.storeName)
      
      const result = await new Promise<any>((resolve, reject) => {
        const request = store.get(id)
        request.onsuccess = () => {
          if (request.result) {
            console.log('✅ Archivo encontrado en IndexedDB:', {
              nombre: request.result.name,
              tipo: request.result.type,
              tamaño: `${(request.result.size / 1024 / 1024).toFixed(2)} MB`
            })
          } else {
            console.warn('⚠️ Archivo no encontrado en IndexedDB:', id)
          }
          resolve(request.result)
        }
        request.onerror = () => {
          console.error('❌ Error buscando en IndexedDB:', request.error)
          reject(request.error)
        }
      })
      
      db.close()
      
      if (result) {
        // Convert ArrayBuffer back to Blob and create URL
        const blob = new Blob([result.data], { type: result.type })
        const blobUrl = URL.createObjectURL(blob)
        console.log('✅ Blob URL creada:', blobUrl)
        return blobUrl
      }
      
      console.warn('⚠️ No se pudo recuperar el archivo')
      return null
    } catch (error) {
      console.error('❌ Error retrieving audio file:', error)
      return null
    }
  }

  // Delete audio file
  static async deleteAudioFile(id: string): Promise<void> {
    try {
      const db = await this.initDB()
      const transaction = db.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      
      await new Promise<void>((resolve, reject) => {
        const request = store.delete(id)
        request.onsuccess = () => resolve()
        request.onerror = () => reject(request.error)
      })
      
      db.close()
    } catch (error) {
      console.error('Error deleting audio file:', error)
    }
  }

  // Clear all audio files
  static async clearAllAudioFiles(): Promise<void> {
    try {
      const db = await this.initDB()
      const transaction = db.transaction([this.storeName], 'readwrite')
      const store = transaction.objectStore(this.storeName)
      
      await new Promise<void>((resolve, reject) => {
        const request = store.clear()
        request.onsuccess = () => resolve()
        request.onerror = () => reject(request.error)
      })
      
      db.close()
    } catch (error) {
      console.error('Error clearing audio files:', error)
    }
  }

  // Check if URL is a custom audio URL
  static isCustomAudioURL(url: string): boolean {
    return url.startsWith('audiolab://audio/')
  }

  // Extract ID from custom URL
  static extractIdFromURL(url: string): string | null {
    if (this.isCustomAudioURL(url)) {
      return url.replace('audiolab://audio/', '')
    }
    return null
  }
}