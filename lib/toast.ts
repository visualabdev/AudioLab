// Simple toast implementation without external dependencies

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface ToastOptions {
  duration?: number
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

class ToastManager {
  private container: HTMLElement | null = null
  private toasts: Map<string, HTMLElement> = new Map()

  private createContainer() {
    if (this.container) return this.container

    this.container = document.createElement('div')
    this.container.className = 'fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none'
    document.body.appendChild(this.container)
    return this.container
  }

  private createToast(message: string, type: ToastType, options: ToastOptions = {}) {
    const { duration = 3000 } = options
    const id = Math.random().toString(36).substr(2, 9)
    
    const toast = document.createElement('div')
    toast.className = `
      pointer-events-auto
      bg-background border border-border
      rounded-lg shadow-lg p-4 min-w-[300px] max-w-[400px]
      transform transition-all duration-300 ease-in-out
      translate-x-full opacity-0
    `

    const colors = {
      success: 'border-green-500 bg-green-50 dark:bg-green-950',
      error: 'border-red-500 bg-red-50 dark:bg-red-950',
      warning: 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950',
      info: 'border-blue-500 bg-blue-50 dark:bg-blue-950'
    }

    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    }

    toast.className += ` ${colors[type]}`
    
    toast.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-current text-white text-sm">
          ${icons[type]}
        </div>
        <div class="flex-1 text-sm font-medium text-foreground">
          ${message}
        </div>
        <button class="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors">
          ✕
        </button>
      </div>
    `

    const closeButton = toast.querySelector('button')
    if (closeButton) {
      closeButton.addEventListener('click', () => this.removeToast(id))
    }

    const container = this.createContainer()
    container.appendChild(toast)
    this.toasts.set(id, toast)

    // Animate in
    requestAnimationFrame(() => {
      toast.style.transform = 'translateX(0)'
      toast.style.opacity = '1'
    })

    // Auto remove
    setTimeout(() => {
      this.removeToast(id)
    }, duration)

    return id
  }

  private removeToast(id: string) {
    const toast = this.toasts.get(id)
    if (!toast) return

    toast.style.transform = 'translateX(100%)'
    toast.style.opacity = '0'

    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast)
      }
      this.toasts.delete(id)
    }, 300)
  }

  success(message: string, options?: ToastOptions) {
    return this.createToast(message, 'success', options)
  }

  error(message: string, options?: ToastOptions) {
    return this.createToast(message, 'error', options)
  }

  warning(message: string, options?: ToastOptions) {
    return this.createToast(message, 'warning', options)
  }

  info(message: string, options?: ToastOptions) {
    return this.createToast(message, 'info', options)
  }
}

export const toast = new ToastManager()