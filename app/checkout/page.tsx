"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/cart-store"
import { CreditCard, Lock, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })

  const totalPrice = getTotalPrice()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Call PayPal API endpoint
      const response = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            track_id: item.track.id,
            title: item.track.title,
            price: item.track.price,
          })),
          buyer_email: formData.email,
          buyer_name: formData.name,
        }),
      })

      const data = await response.json()

      if (data.approvalUrl) {
        // Redirect to PayPal for payment
        window.location.href = data.approvalUrl
      } else {
        throw new Error("Failed to create PayPal order")
      }
    } catch (error) {
      console.error("[v0] Checkout error:", error)
      alert("Payment failed. Please try again.")
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-32">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center space-y-6 py-16">
              <h1 className="text-4xl font-bold">Your cart is empty</h1>
              <p className="text-muted-foreground">Add some tracks to your cart before checking out</p>
              <Button asChild size="lg">
                <Link href="/catalog">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Browse Catalog
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <Button asChild variant="ghost" size="sm">
                <Link href="/catalog">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Catalog
                </Link>
              </Button>
            </div>

            <h1 className="text-4xl font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Checkout form */}
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                      <p className="text-xs text-muted-foreground">Download links will be sent to this email address</p>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        "Processing..."
                      ) : (
                        <>
                          <CreditCard className="h-5 w-5 mr-2" />
                          Pay with PayPal
                        </>
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Lock className="h-3 w-3" />
                      Secure checkout powered by PayPal
                    </div>
                  </form>
                </Card>

                <Card className="p-6 bg-card/50 border-primary/20">
                  <h3 className="font-semibold mb-3">What happens next?</h3>
                  <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                    <li>Complete payment securely through PayPal</li>
                    <li>Receive instant download links via email</li>
                    <li>Access your purchases anytime from your account</li>
                    <li>Start creating with your new tracks</li>
                  </ol>
                </Card>
              </div>

              {/* Order summary */}
              <div className="space-y-6">
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.track.id} className="flex gap-4">
                        <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={item.track.cover_image_url || "/placeholder.svg"}
                            alt={item.track.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm line-clamp-1">{item.track.title}</h4>
                          <p className="text-xs text-muted-foreground">{item.track.artist}</p>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {item.track.genre}
                          </Badge>
                        </div>
                        <div className="font-bold text-primary">${item.track.price.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Processing Fee</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex items-center justify-between text-lg font-bold pt-2 border-t border-border">
                      <span>Total</span>
                      <span className="text-primary">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-card/50">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    Secure Payment
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Your payment information is encrypted and secure. We never store your credit card details.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
