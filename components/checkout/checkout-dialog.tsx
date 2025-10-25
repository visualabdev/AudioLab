'use client'

import { useState } from 'react'
import { CreditCard, PayPal, Bitcoin, Check, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '@/lib/cart-store'
import { usePaymentStore } from '@/lib/payment-store'
import { useAuthStore } from '@/lib/auth-store'
import { toast } from '@/lib/toast'

interface CheckoutDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function CheckoutDialog({ isOpen, onClose }: CheckoutDialogProps) {
  const [step, setStep] = useState<'payment' | 'processing' | 'success' | 'error'>('payment')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [newCard, setNewCard] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  })
  const [orderId, setOrderId] = useState('')

  const { items, getTotalPrice, clearCart } = useCartStore()
  const { paymentMethods, processPayment, isProcessing } = usePaymentStore()
  const { user, isAuthenticated } = useAuthStore()

  const total = getTotalPrice()

  const handlePayment = async () => {
    if (!isAuthenticated()) {
      toast.error('Debes iniciar sesión para realizar una compra')
      return
    }

    if (!selectedPaymentMethod) {
      toast.error('Selecciona un método de pago')
      return
    }

    setStep('processing')

    try {
      const order = await processPayment(items, selectedPaymentMethod)
      
      if (order && order.status === 'completed') {
        setOrderId(order.id)
        setStep('success')
        clearCart()
        toast.success('¡Pago procesado exitosamente!')
      } else {
        setStep('error')
        toast.error('Error al procesar el pago. Intenta nuevamente.')
      }
    } catch (error) {
      setStep('error')
      toast.error('Error inesperado. Intenta nuevamente.')
    }
  }

  const handleClose = () => {
    setStep('payment')
    setSelectedPaymentMethod('')
    setNewCard({ number: '', expiry: '', cvc: '', name: '' })
    setOrderId('')
    onClose()
  }

  const renderPaymentStep = () => (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h3 className="font-semibold mb-3">Resumen del Pedido</h3>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={`${item.id}-${item.license}`} className="flex justify-between text-sm">
              <span>{item.title} ({item.license})</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        <h3 className="font-semibold">Método de Pago</h3>
        
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedPaymentMethod === method.id
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedPaymentMethod(method.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5" />
                <div>
                  <p className="font-medium">
                    **** **** **** {method.last4}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {method.brand?.toUpperCase()} • Expira {method.expiryMonth}/{method.expiryYear}
                  </p>
                </div>
              </div>
              {method.isDefault && (
                <Badge variant="secondary">Por defecto</Badge>
              )}
            </div>
          </div>
        ))}

        {/* Add New Card */}
        <div className="border rounded-lg p-4 space-y-4">
          <h4 className="font-medium">Agregar Nueva Tarjeta</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="card-name">Nombre en la Tarjeta</Label>
              <Input
                id="card-name"
                placeholder="John Doe"
                value={newCard.name}
                onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="card-number">Número de Tarjeta</Label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                value={newCard.number}
                onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="card-expiry">Fecha de Expiración</Label>
              <Input
                id="card-expiry"
                placeholder="MM/YY"
                value={newCard.expiry}
                onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="card-cvc">CVC</Label>
              <Input
                id="card-cvc"
                placeholder="123"
                value={newCard.cvc}
                onChange={(e) => setNewCard({ ...newCard, cvc: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-3">
        <Button variant="outline" onClick={handleClose} className="flex-1">
          Cancelar
        </Button>
        <Button 
          onClick={handlePayment} 
          disabled={!selectedPaymentMethod && !newCard.number}
          className="flex-1"
        >
          Pagar ${total.toFixed(2)}
        </Button>
      </div>
    </div>
  )

  const renderProcessingStep = () => (
    <div className="text-center py-8">
      <Loader2 className="w-16 h-16 mx-auto mb-4 animate-spin text-primary" />
      <h3 className="text-xl font-semibold mb-2">Procesando Pago</h3>
      <p className="text-muted-foreground">
        Por favor espera mientras procesamos tu pago...
      </p>
    </div>
  )

  const renderSuccessStep = () => (
    <div className="text-center py-8">
      <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
        <Check className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">¡Pago Exitoso!</h3>
      <p className="text-muted-foreground mb-4">
        Tu pedido #{orderId} ha sido procesado correctamente.
      </p>
      <p className="text-sm text-muted-foreground mb-6">
        Recibirás un email con los enlaces de descarga en breve.
      </p>
      <Button onClick={handleClose} className="w-full">
        Continuar
      </Button>
    </div>
  )

  const renderErrorStep = () => (
    <div className="text-center py-8">
      <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
        <X className="w-8 h-8 text-red-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Error en el Pago</h3>
      <p className="text-muted-foreground mb-6">
        Hubo un problema al procesar tu pago. Por favor intenta nuevamente.
      </p>
      <div className="flex space-x-3">
        <Button variant="outline" onClick={handleClose} className="flex-1">
          Cancelar
        </Button>
        <Button onClick={() => setStep('payment')} className="flex-1">
          Intentar Nuevamente
        </Button>
      </div>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 'payment' && 'Finalizar Compra'}
            {step === 'processing' && 'Procesando Pago'}
            {step === 'success' && 'Pago Completado'}
            {step === 'error' && 'Error en el Pago'}
          </DialogTitle>
        </DialogHeader>

        {step === 'payment' && renderPaymentStep()}
        {step === 'processing' && renderProcessingStep()}
        {step === 'success' && renderSuccessStep()}
        {step === 'error' && renderErrorStep()}
      </DialogContent>
    </Dialog>
  )
}