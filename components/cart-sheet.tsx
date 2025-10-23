"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Trash2, CreditCard } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function CartSheet() {
  const { items, removeItem, getTotalPrice, getItemCount } = useCartStore()
  const itemCount = getItemCount()
  const totalPrice = getTotalPrice()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({itemCount})</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full pt-6">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
              <ShoppingCart className="h-16 w-16 text-muted-foreground" />
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Your cart is empty</h3>
                <p className="text-sm text-muted-foreground">Add some tracks to get started</p>
              </div>
              <Button asChild>
                <Link href="/catalog">Browse Catalog</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {items.map((item) => (
                  <div key={item.track.id} className="flex gap-4 p-4 rounded-lg bg-card border border-border">
                    <div className="relative h-20 w-20 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={item.track.cover_image_url || "/placeholder.svg"}
                        alt={item.track.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div>
                        <h4 className="font-semibold text-sm line-clamp-1">{item.track.title}</h4>
                        <p className="text-xs text-muted-foreground">{item.track.artist}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          {item.track.genre}
                        </Badge>
                        <span className="font-bold text-primary">${item.track.price.toFixed(2)}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 flex-shrink-0"
                      onClick={() => removeItem(item.track.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-4">
                <div className="flex items-center justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${totalPrice.toFixed(2)}</span>
                </div>
                <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90">
                  <Link href="/checkout">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Proceed to Checkout
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
