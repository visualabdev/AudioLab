import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from './cart-store'

export interface PaymentMethod {
  id: string
  type: 'card' | 'paypal' | 'crypto'
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
  paymentMethod: PaymentMethod
  createdAt: string
  completedAt?: string
  downloadLinks?: { [itemId: string]: string }
}

export interface PaymentStore {
  paymentMethods: PaymentMethod[]
  orders: Order[]
  isProcessing: boolean
  
  // Actions
  addPaymentMethod: (method: Omit<PaymentMethod, 'id'>) => void
  removePaymentMethod: (id: string) => void
  setDefaultPaymentMethod: (id: string) => void
  processPayment: (items: CartItem[], paymentMethodId: string) => Promise<Order | null>
  getOrderById: (id: string) => Order | undefined
  getUserOrders: () => Order[]
}

// Mock payment processing
const mockPaymentProcess = async (amount: number): Promise<boolean> => {
  // Simulate payment processing delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // 95% success rate for demo
  return Math.random() > 0.05
}

export const usePaymentStore = create<PaymentStore>()(
  persist(
    (set, get) => ({
      paymentMethods: [
        {
          id: '1',
          type: 'card',
          last4: '4242',
          brand: 'visa',
          expiryMonth: 12,
          expiryYear: 2025,
          isDefault: true
        }
      ],
      orders: [],
      isProcessing: false,

      addPaymentMethod: (method) => {
        const newMethod: PaymentMethod = {
          ...method,
          id: Date.now().toString(),
        }
        
        // If this is the first method or marked as default, make it default
        if (get().paymentMethods.length === 0 || method.isDefault) {
          set({
            paymentMethods: get().paymentMethods.map(m => ({ ...m, isDefault: false }))
          })
          newMethod.isDefault = true
        }
        
        set({
          paymentMethods: [...get().paymentMethods, newMethod]
        })
      },

      removePaymentMethod: (id) => {
        const methods = get().paymentMethods.filter(m => m.id !== id)
        
        // If we removed the default method, make the first remaining method default
        if (methods.length > 0 && !methods.some(m => m.isDefault)) {
          methods[0].isDefault = true
        }
        
        set({ paymentMethods: methods })
      },

      setDefaultPaymentMethod: (id) => {
        set({
          paymentMethods: get().paymentMethods.map(m => ({
            ...m,
            isDefault: m.id === id
          }))
        })
      },

      processPayment: async (items, paymentMethodId) => {
        const paymentMethod = get().paymentMethods.find(m => m.id === paymentMethodId)
        if (!paymentMethod) return null

        set({ isProcessing: true })

        try {
          const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
          const success = await mockPaymentProcess(total)

          if (success) {
            const order: Order = {
              id: `order_${Date.now()}`,
              items,
              total,
              status: 'completed',
              paymentMethod,
              createdAt: new Date().toISOString(),
              completedAt: new Date().toISOString(),
              downloadLinks: items.reduce((links, item) => {
                // Generate mock download links
                links[item.id] = `https://downloads.beatstore.com/${item.id}/${Date.now()}`
                return links
              }, {} as { [itemId: string]: string })
            }

            set({
              orders: [...get().orders, order],
              isProcessing: false
            })

            return order
          } else {
            const order: Order = {
              id: `order_${Date.now()}`,
              items,
              total,
              status: 'failed',
              paymentMethod,
              createdAt: new Date().toISOString()
            }

            set({
              orders: [...get().orders, order],
              isProcessing: false
            })

            return order
          }
        } catch (error) {
          set({ isProcessing: false })
          return null
        }
      },

      getOrderById: (id) => {
        return get().orders.find(order => order.id === id)
      },

      getUserOrders: () => {
        return get().orders.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      }
    }),
    {
      name: 'payment-storage',
      partialize: (state) => ({ 
        paymentMethods: state.paymentMethods,
        orders: state.orders 
      })
    }
  )
)