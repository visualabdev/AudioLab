import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { XCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="p-12 text-center space-y-6">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto">
                <XCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold">Payment Cancelled</h1>
                <p className="text-muted-foreground">Your payment was cancelled. No charges were made.</p>
              </div>
              <div className="flex gap-4 justify-center">
                <Button asChild variant="outline" size="lg">
                  <Link href="/catalog">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Continue Shopping
                  </Link>
                </Button>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/checkout">Try Again</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
