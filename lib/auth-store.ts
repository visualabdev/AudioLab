import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'user' | 'admin'
  createdAt: string
  preferences: {
    favoriteGenres: string[]
    notifications: boolean
    newsletter: boolean
  }
}

export interface AuthStore {
  user: User | null
  isLoading: boolean
  isLoginOpen: boolean
  isSignupOpen: boolean
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  setLoginOpen: (open: boolean) => void
  setSignupOpen: (open: boolean) => void
  
  // Computed
  isAuthenticated: () => boolean
  isAdmin: () => boolean
}

// Mock users for demo
const MOCK_USERS: (User & { password: string })[] = [
  {
    id: '1',
    email: 'admin@beatstore.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2024-01-01',
    preferences: {
      favoriteGenres: ['trap', 'hip-hop'],
      notifications: true,
      newsletter: true
    }
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'user123',
    name: 'John Doe',
    role: 'user',
    createdAt: '2024-01-15',
    preferences: {
      favoriteGenres: ['r&b', 'pop'],
      notifications: false,
      newsletter: true
    }
  }
]

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isLoginOpen: false,
      isSignupOpen: false,

      login: async (email, password) => {
        set({ isLoading: true })
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const user = MOCK_USERS.find(u => u.email === email && u.password === password)
        
        if (user) {
          const { password: _, ...userWithoutPassword } = user
          set({ 
            user: userWithoutPassword, 
            isLoading: false, 
            isLoginOpen: false 
          })
          return true
        } else {
          set({ isLoading: false })
          return false
        }
      },

      signup: async (email, password, name) => {
        set({ isLoading: true })
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Check if user already exists
        const existingUser = MOCK_USERS.find(u => u.email === email)
        if (existingUser) {
          set({ isLoading: false })
          return false
        }
        
        // Create new user
        const newUser: User = {
          id: Date.now().toString(),
          email,
          name,
          role: 'user',
          createdAt: new Date().toISOString(),
          preferences: {
            favoriteGenres: [],
            notifications: true,
            newsletter: false
          }
        }
        
        // Add to mock users (in real app, this would be API call)
        MOCK_USERS.push({ ...newUser, password })
        
        set({ 
          user: newUser, 
          isLoading: false, 
          isSignupOpen: false 
        })
        return true
      },

      logout: () => {
        set({ user: null })
      },

      updateUser: (updates) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } })
        }
      },

      setLoginOpen: (open) => {
        set({ isLoginOpen: open, isSignupOpen: false })
      },

      setSignupOpen: (open) => {
        set({ isSignupOpen: open, isLoginOpen: false })
      },

      isAuthenticated: () => {
        return get().user !== null
      },

      isAdmin: () => {
        const user = get().user
        return user?.role === 'admin'
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user })
    }
  )
)