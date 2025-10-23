import { NextResponse } from "next/server"

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
    const { items, buyer_email, buyer_name } = body

    // Calculate total
    const total = items.reduce((sum: number, item: any) => sum + item.price, 0)

    // Get PayPal access token
    const accessToken = await getAccessToken()

    // Create PayPal order
    const orderResponse = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: total.toFixed(2),
              breakdown: {
                item_total: {
                  currency_code: "USD",
                  value: total.toFixed(2),
                },
              },
            },
            items: items.map((item: any) => ({
              name: item.title,
              unit_amount: {
                currency_code: "USD",
                value: item.price.toFixed(2),
              },
              quantity: "1",
            })),
          },
        ],
        application_context: {
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/checkout/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/checkout/cancel`,
          brand_name: "AudioLab",
          user_action: "PAY_NOW",
        },
      }),
    })

    const orderData = await orderResponse.json()

    if (orderData.id) {
      // Find approval URL
      const approvalUrl = orderData.links.find((link: any) => link.rel === "approve")?.href

      return NextResponse.json({
        orderId: orderData.id,
        approvalUrl,
      })
    } else {
      throw new Error("Failed to create PayPal order")
    }
  } catch (error) {
    console.error("[v0] PayPal create order error:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
