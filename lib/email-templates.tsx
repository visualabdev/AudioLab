import type { Track } from "./types"

interface PurchaseEmailProps {
  customerName: string
  tracks: Track[]
  transactionId: string
  totalAmount: number
}

export function generatePurchaseEmail({ customerName, tracks, transactionId, totalAmount }: PurchaseEmailProps) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your AudioLab Purchase</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #0d0d0d;
      color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
    }
    .logo {
      font-size: 32px;
      font-weight: bold;
      background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 10px;
    }
    .card {
      background-color: #1a1a1a;
      border: 1px solid #262626;
      border-radius: 12px;
      padding: 30px;
      margin-bottom: 20px;
    }
    .success-icon {
      width: 60px;
      height: 60px;
      background-color: rgba(139, 92, 246, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
    }
    h1 {
      font-size: 28px;
      margin: 0 0 10px 0;
      text-align: center;
    }
    .subtitle {
      color: #a3a3a3;
      text-align: center;
      margin-bottom: 30px;
    }
    .track-item {
      background-color: #0d0d0d;
      border: 1px solid #262626;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 15px;
    }
    .track-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 5px;
    }
    .track-meta {
      color: #a3a3a3;
      font-size: 14px;
      margin-bottom: 15px;
    }
    .download-button {
      display: inline-block;
      background-color: #8b5cf6;
      color: white;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 600;
      text-align: center;
    }
    .download-button:hover {
      background-color: #7c3aed;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #262626;
    }
    .info-row:last-child {
      border-bottom: none;
    }
    .info-label {
      color: #a3a3a3;
    }
    .info-value {
      font-weight: 600;
    }
    .total-row {
      font-size: 20px;
      font-weight: bold;
      color: #8b5cf6;
      padding-top: 15px;
      margin-top: 15px;
      border-top: 2px solid #262626;
    }
    .footer {
      text-align: center;
      color: #a3a3a3;
      font-size: 14px;
      margin-top: 40px;
      padding-top: 30px;
      border-top: 1px solid #262626;
    }
    .footer a {
      color: #8b5cf6;
      text-decoration: none;
    }
    .license-info {
      background-color: rgba(139, 92, 246, 0.1);
      border: 1px solid rgba(139, 92, 246, 0.2);
      border-radius: 8px;
      padding: 20px;
      margin-top: 20px;
    }
    .license-info h3 {
      margin-top: 0;
      color: #8b5cf6;
    }
    .license-info ul {
      margin: 10px 0;
      padding-left: 20px;
    }
    .license-info li {
      margin-bottom: 8px;
      color: #f5f5f5;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">AudioLab</div>
      <p style="color: #a3a3a3; margin: 0;">Premium Beats & Instrumentals</p>
    </div>

    <div class="card">
      <div class="success-icon">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      
      <h1>Payment Successful!</h1>
      <p class="subtitle">Thank you for your purchase, ${customerName}</p>

      <div style="margin-bottom: 30px;">
        ${tracks
          .map(
            (track) => `
          <div class="track-item">
            <div class="track-title">${track.title}</div>
            <div class="track-meta">${track.artist} • ${track.genre}</div>
            <a href="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/download/${track.id}" class="download-button">
              Download Track
            </a>
          </div>
        `,
          )
          .join("")}
      </div>

      <div>
        <div class="info-row">
          <span class="info-label">Transaction ID</span>
          <span class="info-value">${transactionId}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Date</span>
          <span class="info-value">${new Date().toLocaleDateString()}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Items</span>
          <span class="info-value">${tracks.length} track${tracks.length > 1 ? "s" : ""}</span>
        </div>
        <div class="info-row total-row">
          <span>Total Paid</span>
          <span>$${totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <div class="license-info">
        <h3>📄 License Information</h3>
        <p style="margin: 10px 0; color: #f5f5f5;">Your purchase includes:</p>
        <ul>
          <li>High-quality WAV & MP3 files</li>
          <li>Royalty-free license for commercial use</li>
          <li>Unlimited distribution rights</li>
          <li>Lifetime access to your downloads</li>
        </ul>
        <p style="margin: 10px 0 0 0; font-size: 14px; color: #a3a3a3;">
          Full license agreement available at <a href="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/licenses" style="color: #8b5cf6;">audiolab.com/licenses</a>
        </p>
      </div>
    </div>

    <div class="footer">
      <p>Need help? Contact us at <a href="mailto:support@audiolab.com">support@audiolab.com</a></p>
      <p style="margin-top: 20px;">
        <a href="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}">Visit AudioLab</a> • 
        <a href="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/catalog">Browse Catalog</a>
      </p>
      <p style="margin-top: 20px; font-size: 12px;">
        © ${new Date().getFullYear()} AudioLab. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
  `
}

export function generateAdminNotificationEmail({
  customerName,
  customerEmail,
  tracks,
  transactionId,
  totalAmount,
}: PurchaseEmailProps & { customerEmail: string }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Purchase - AudioLab</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f5f5f5;
      color: #0d0d0d;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .card {
      background-color: white;
      border: 1px solid #e5e5e5;
      border-radius: 12px;
      padding: 30px;
    }
    h1 {
      font-size: 24px;
      margin: 0 0 20px 0;
      color: #8b5cf6;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #e5e5e5;
    }
    .info-row:last-child {
      border-bottom: none;
    }
    .track-list {
      background-color: #f9f9f9;
      border-radius: 8px;
      padding: 15px;
      margin: 20px 0;
    }
    .track-item {
      padding: 8px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <h1>🎉 New Purchase!</h1>
      
      <div class="info-row">
        <span><strong>Customer:</strong></span>
        <span>${customerName}</span>
      </div>
      <div class="info-row">
        <span><strong>Email:</strong></span>
        <span>${customerEmail}</span>
      </div>
      <div class="info-row">
        <span><strong>Transaction ID:</strong></span>
        <span>${transactionId}</span>
      </div>
      <div class="info-row">
        <span><strong>Date:</strong></span>
        <span>${new Date().toLocaleString()}</span>
      </div>
      <div class="info-row">
        <span><strong>Total Amount:</strong></span>
        <span style="color: #8b5cf6; font-weight: bold;">$${totalAmount.toFixed(2)}</span>
      </div>

      <div class="track-list">
        <strong>Purchased Tracks:</strong>
        ${tracks
          .map(
            (track) => `
          <div class="track-item">
            • ${track.title} - $${track.price.toFixed(2)}
          </div>
        `,
          )
          .join("")}
      </div>

      <p style="margin-top: 20px; color: #666;">
        View full details in your <a href="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/admin" style="color: #8b5cf6;">admin dashboard</a>.
      </p>
    </div>
  </div>
</body>
</html>
  `
}
