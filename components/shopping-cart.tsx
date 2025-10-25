'use client'

import { useState } from 'react'
import { ShoppingCart as ShoppingCartIcon, Plus, Minus, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { CheckoutDialog } from '@/components/checkout/checkout-dialog'
import { useCartStore } from '@/lib/cart-store'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface ShoppingCartProps {
  className?: string
}

export function ShoppingCart({ className }: ShoppingCartProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  
  const {
    items,
    isOpen,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    setCartOpen,
    getTotalItems,
    getTotalPrice
  } = useCartStore()

  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  const handleCheckout = () => {
    setCartOpen(false)
    setIsCheckoutOpen(true)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setCartOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className={cn("relative", className)}>
          <ShoppingCartIcon className="w-4 h-4" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-96 flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Carrito de Compras
            {items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearCart}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <ShoppingCartIcon className="w-16 h-16 text-muted-foreground" />
              <div>
                <h3 className="font-semibold text-lg">Tu carrito está vacío</h3>
                <p className="text-muted-foreground">Agrega algunos beats, samples o MIDIs</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.license}`} className="flex items-center space-x-3 p-3 border rounded-lg">
                  {/* Item Image */}
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <ShoppingCartIcon className="w-6 h-6 text-white" />
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">{item.title}</h4>
                    <p className="text-xs text-muted-foreground truncate">{item.artist}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {item.license}
                      </Badge>
                    </div>
                    <p className="font-semibold text-sm mt-1">${item.price}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(`${item.id}-${item.license}`, item.quantity - 1)}
                        className="w-6 h-6 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(`${item.id}-${item.license}`, item.quantity + 1)}
                        className="w-6 h-6 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(`${item.id}-${item.license}`)}
                      className="w-6 h-6 p-0 text-destructive hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {items.length > 0 && (
          <div className="border-t pt-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
            </div>
            
            <div className="space-y-2">
              <Button 
                onClick={handleCheckout}
                className="w-full"
                size="lg"
              >
                Proceder al Pago (${totalPrice.toFixed(2)})
              </Button>
              <Button 
                variant="outline"
                onClick={() => setCartOpen(false)}
                className="w-full"
              >
                Continuar Comprando
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
      
      <CheckoutDialog 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />
    </Sheet>
  )
}