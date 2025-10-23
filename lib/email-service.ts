import { generatePurchaseEmail, generateAdminNotificationEmail } from "./email-templates"
import type { Track } from "./types"

interface SendPurchaseEmailParams {
  customerName: string
  customerEmail: string
  tracks: Track[]
  transactionId: string
  totalAmount: number
}

export async function sendPurchaseEmail({
  customerName,
  customerEmail,
  tracks,
  transactionId,
  totalAmount,
}: SendPurchaseEmailParams) {
  try {
    const emailHtml = generatePurchaseEmail({
      customerName,
      tracks,
      transactionId,
      totalAmount,
    })

    // Send email using your preferred email service
    // This is a placeholder - integrate with Resend, SendGrid, etc.
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: customerEmail,
        subject: `Your AudioLab Purchase - ${tracks.length} Track${tracks.length > 1 ? "s" : ""}`,
        html: emailHtml,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to send email")
    }

    return { success: true }
  } catch (error) {
    console.error("[v0] Error sending purchase email:", error)
    return { success: false, error }
  }
}

export async function sendAdminNotification({
  customerName,
  customerEmail,
  tracks,
  transactionId,
  totalAmount,
}: SendPurchaseEmailParams) {
  try {
    const emailHtml = generateAdminNotificationEmail({
      customerName,
      customerEmail,
      tracks,
      transactionId,
      totalAmount,
    })

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: process.env.ADMIN_EMAIL || "admin@audiolab.com",
        subject: `New Purchase: $${totalAmount.toFixed(2)} from ${customerName}`,
        html: emailHtml,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to send admin notification")
    }

    return { success: true }
  } catch (error) {
    console.error("[v0] Error sending admin notification:", error)
    return { success: false, error }
  }
}
