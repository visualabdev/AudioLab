"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Download, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useCartStore } from "@/lib/cart-store"

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("token")
  const [isProcessing, setIsProcessing] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { items, clearCart } = useCartStore()

  useEffect(() => {
    const captureOrder = async () => {
      if (!orderId) {
        setError("No order ID found")
        setIsProcessing(false)
        return
      }

      try {
        const trackIds = items.map((item) => item.track.id)

        const response = await fetch("/api/paypal/capture-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId,
            trackIds,
            customerEmail: "customer@example.com", // This should come from checkout form
            customerName: "Customer", // This should come from checkout form
          }),
        })

        const data = await response.json()

        if (data.success) {
          clearCart()
          setIsProcessing(false)
        } else {
          throw new Error("Payment capture failed")
        }
      } catch (err) {
        console.error("[v0] Capture error:", err)
        setError("Failed to process payment")
        setIsProcessing(false)
      }
    }

    captureOrder()
  }, [orderId, clearCart, items])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {isProcessing ? (
              <Card className="p-12 text-center space-y-4">
                <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto" />
                <h2 className="text-2xl font-bold">Processing your payment...</h2>
                <p className="text-muted-foreground">Please wait while we confirm your purchase</p>
              </Card>
            ) : error ? (
              <Card className="p-12 text-center space-y-6">
                <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8 text-destructive" />
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold">Payment Failed</h1>
                  <p className="text-muted-foreground">{error}</p>
                </div>
                <Button asChild size="lg">
                  <Link href="/checkout">Try Again</Link>
                </Button>
              </Card>
            ) : (
              <div className="space-y-8">
                <Card className="p-12 text-center space-y-6">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold">Payment Successful!</h1>
                    <p className="text-muted-foreground">Thank you for your purchase</p>
                  </div>
                </Card>

                <Card className="p-8 space-y-6">
                  <h2 className="text-2xl font-bold">What's Next?</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Check Your Email</h3>
                        <p className="text-sm text-muted-foreground">
                          We've sent download links and license information to your email address
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Download className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Download Your Tracks</h3>
                        <p className="text-sm text-muted-foreground">
                          Click the download links in your email to get your high-quality audio files
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="flex gap-4">
                  <Button asChild size="lg" variant="outline" className="flex-1 bg-transparent">
                    <Link href="/catalog">Browse More Tracks</Link>
                  </Button>
                  <Button asChild size="lg" className="flex-1 bg-primary hover:bg-primary/90">
                    <Link href="/">
                      Back to Home
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
