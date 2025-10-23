"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Track } from "./types"

interface CartItem {
  track: Track
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (track: Track) => void
  removeItem: (trackId: string) => void
  clearCart: () => void
  getTotalPrice: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (track) => {
        const items = get().items
        const existingItem = items.find((item) => item.track.id === track.id)

        if (existingItem) {
          // Track already in cart, don't add again
          return
        }

        set({ items: [...items, { track, quantity: 1 }] })
      },
      removeItem: (trackId) => {
        set({ items: get().items.filter((item) => item.track.id !== trackId) })
      },
      clearCart: () => {
        set({ items: [] })
      },
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.track.price * item.quantity, 0)
      },
      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: "audiolab-cart",
    },
  ),
)
