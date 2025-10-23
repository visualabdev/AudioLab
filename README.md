# AudioLab - Premium Beats & Instrumentals Marketplace

A modern, full-stack web application for selling music tracks (beats/instrumentals) with integrated PayPal payments, admin dashboard, and email notifications.

## Features

### Customer Features
- 🎵 **Landing Page** - Animated hero section with featured tracks showcase
- 🔍 **Track Catalog** - Advanced search and filtering by genre, price, and more
- 🎧 **Audio Player** - Integrated player with playback controls and progress tracking
- 🛒 **Shopping Cart** - Persistent cart with Zustand state management
- 💳 **PayPal Checkout** - Secure payment processing with PayPal integration
- 📧 **Email Notifications** - Automated purchase confirmations with download links
- 📄 **Track Details** - Comprehensive track pages with licensing information

### Admin Features
- 📊 **Dashboard** - Overview of revenue, sales, and track performance
- ✏️ **Track Management** - Add, edit, and delete tracks with full CRUD operations
- 💰 **Purchase Tracking** - View all purchases with search and filtering
- 📈 **Analytics** - Top performing tracks, genre statistics, and recent activity

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4 with custom design tokens
- **UI Components**: shadcn/ui
- **State Management**: Zustand (cart)
- **Payments**: PayPal REST API
- **Email**: Ready for Resend, SendGrid, or AWS SES integration
- **Database**: Prepared for Supabase (SQL scripts included)

## Getting Started

### Prerequisites
- Node.js 18+ installed
- PayPal Developer account (for payment processing)
- Email service API key (optional, for production emails)

### Installation

1. Clone the repository or download the ZIP file

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local` and add your credentials:
\`\`\`env
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_SANDBOX=true
NEXT_PUBLIC_BASE_URL=http://localhost:3000
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Setup (Optional)

The application includes SQL scripts for database setup when you're ready to connect Supabase:

1. Add Supabase integration from the v0 sidebar
2. Run the SQL scripts in order:
   - `scripts/01-create-tables.sql` - Creates database schema
   - `scripts/02-seed-sample-data.sql` - Adds sample tracks

## Email Integration

To enable email notifications:

1. Sign up for an email service (Resend recommended)
2. Add your API key to `.env.local`:
\`\`\`env
RESEND_API_KEY=your_api_key
ADMIN_EMAIL=admin@audiolab.com
\`\`\`

3. Update `app/api/send-email/route.ts` with your email service integration

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel project settings
4. Deploy!

### Environment Variables for Production

Make sure to set these in your Vercel project:
- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`
- `PAYPAL_SANDBOX` (set to `false` for production)
- `NEXT_PUBLIC_BASE_URL` (your production domain)
- Email service API keys

## Project Structure

\`\`\`
audiolab/
├── app/
│   ├── admin/              # Admin dashboard
│   ├── catalog/            # Track catalog page
│   ├── checkout/           # Checkout flow
│   ├── track/[id]/         # Track detail pages
│   └── api/                # API routes
├── components/
│   ├── admin/              # Admin components
│   ├── ui/                 # shadcn/ui components
│   └── ...                 # Feature components
├── lib/
│   ├── types.ts            # TypeScript types
│   ├── mock-data.ts        # Sample data
│   ├── cart-store.ts       # Cart state management
│   ├── email-templates.tsx # Email HTML templates
│   └── email-service.ts    # Email sending logic
└── scripts/                # Database SQL scripts
\`\`\`

## Customization

### Colors & Branding
Edit `app/globals.css` to customize the color scheme and design tokens.

### Email Templates
Modify `lib/email-templates.tsx` to customize email designs.

### Track Data
Update `lib/mock-data.ts` or connect to your database for real track data.

## Support

For issues or questions:
- Check the code comments for implementation details
- Review the SQL scripts for database schema
- Consult PayPal and email service documentation

## License

This project is provided as-is for your use and modification.
