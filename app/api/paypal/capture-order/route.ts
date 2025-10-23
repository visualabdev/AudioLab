import { NextResponse } from "next/server"
import { sendPurchaseEmail, sendAdminNotification } from "@/lib/email-service"
import { mockTracks } from "@/lib/mock-data"

const PAYPAL_API_BASE = process.env.PAYPAL_SANDBOX ? "https://api-m.sandbox.paypal.com" : "https://api-m.paypal.com"

async function getAccessToken() {
  const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString("base64")

  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  })

  const data = await response.json()
  return data.access_token
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { orderId, customerEmail, customerName, trackIds } = body

    // Get PayPal access token
    const accessToken = await getAccessToken()

    // Capture the order
    const captureResponse = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const captureData = await captureResponse.json()

    if (captureData.status === "COMPLETED") {
      // Get purchased tracks
      const purchasedTracks = mockTracks.filter((track) => trackIds?.includes(track.id))
      const totalAmount = purchasedTracks.reduce((sum, track) => sum + track.price, 0)

      await sendPurchaseEmail({
        customerName: customerName || "Customer",
        customerEmail: customerEmail || "customer@example.com",
        tracks: purchasedTracks,
        transactionId: captureData.id,
        totalAmount,
      })

      await sendAdminNotification({
        customerName: customerName || "Customer",
        customerEmail: customerEmail || "customer@example.com",
        tracks: purchasedTracks,
        transactionId: captureData.id,
        totalAmount,
      })

      // TODO: Save purchase to database when Supabase is connected

      return NextResponse.json({
        success: true,
        transactionId: captureData.id,
        captureData,
      })
    } else {
      throw new Error("Payment capture failed")
    }
  } catch (error) {
    console.error("[v0] PayPal capture order error:", error)
    return NextResponse.json({ error: "Failed to capture payment" }, { status: 500 })
  }
}
