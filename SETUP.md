# Pickering MBA Website - Setup & Configuration Guide

## 📋 Overview

This is a fully-featured React + TypeScript + Tailwind CSS website for Pickering Global Campus MBA program with integrated form submission, email notifications, and responsive design.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```bash
cp .env.example .env
```

Then edit `.env` and configure:
- `SENDGRID_API_KEY` - Your SendGrid API key
- `ADMIN_EMAIL` - Admin email for notifications
- `FRONTEND_URL` - Your frontend URL

### 3. Get SendGrid API Key

1. Go to [SendGrid](https://sendgrid.com/)
2. Sign up for a free account
3. Navigate to **Settings > API Keys**
4. Create a new API key with **Mail Send** permission
5. Copy the key and paste it in your `.env` file:

```env
SENDGRID_API_KEY="SG.xxxxxxxxxxxxx"
```

### 4. Run Development Servers

**Option A: Run both frontend and backend together**
```bash
npm run server:dev
```

**Option B: Run separately**

Terminal 1 - Frontend (Vite):
```bash
npm run dev
```

Terminal 2 - Backend (Express):
```bash
npm run server
```

The frontend will be at `http://localhost:3000`
The backend will be at `http://localhost:3001`

## 📁 Project Structure

```
pickering-_-woolf-mba (3)/
├── src/
│   ├── pages/
│   │   ├── Home.tsx              # Main landing page
│   │   ├── ApplyPage.tsx         # Apply/Consult/Brochure pages
│   │   ├── GrantPage.tsx         # Scholarship page
│   │   ├── FacultyPage.tsx       # Faculty listing
│   │   └── Success.tsx           # Form submission success
│   ├── components/
│   │   ├── LeadForm.tsx          # Form with API integration
│   │   ├── BackButton.tsx        # Back navigation button
│   │   ├── StickyCTA.tsx         # Floating CTA bar & mobile nav
│   │   └── ... (other components)
│   └── constants/
│       └── content.ts            # Multi-language content
├── backend/
│   ├── server.ts                 # Express server entry point
│   ├── routes/
│   │   └── forms.ts              # Form submission endpoints
│   └── config/
│       └── email.ts              # Email configuration
├── .env                          # Environment variables
├── .env.example                  # Environment template
└── package.json

```

## 🔌 Form Submission API

### Endpoints

**POST /api/apply**
- Submit MBA application

**POST /api/consult**
- Book a consultation

**POST /api/brochure**
- Request course brochure

### Request Payload

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+65 1234 5678",
  "experience": "<3y|3-10y|10+y",
  "industry": "Technology" // optional
}
```

### Success Response

```json
{
  "success": true,
  "message": "apply form submitted successfully",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "formType": "apply",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": "Valid email is required"
}
```

## 📧 Email Notifications

When a form is submitted:

1. **User receives confirmation email** - Personalized message based on form type
2. **Admin receives notification** - Details of the submission with contact info

### Email Templates

Located in `/backend/config/email.ts`:
- Apply: Application received notification
- Consult: Consultation request confirmation
- Brochure: Brochure download confirmation

## 🎨 Features

✅ **Responsive Design**
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)

✅ **Multi-language Support**
- English
- Simplified Chinese

✅ **Form Features**
- Real-time validation
- Error handling & user feedback
- Loading states
- Success confirmation emails

✅ **Navigation**
- Back button on all sub-pages
- Sticky CTA bar on desktop
- Mobile bottom navigation

✅ **Pages**
- Home with hero, stats, curriculum, faculty, FAQ
- Apply/Consult/Brochure form pages
- Scholarship grant information page
- Faculty listing page
- Success confirmation page

## 🔧 Configuration Options

### SendGrid Alternatives

If you don't want to use SendGrid, the system gracefully falls back to console logging when `SENDGRID_API_KEY` is not configured. This is useful for development/testing.

To use a different email service, modify `/backend/config/email.ts`:

```typescript
// Replace sendgrid with your preferred service
import nodemailer from 'nodemailer';
// ... configure nodemailer
```

### CORS Settings

Backend CORS is configured to accept requests from:
- `http://localhost:3000` (local dev)
- `http://localhost:5173` (Vite default)
- Custom URLs via `FRONTEND_URL` env variable

## 📱 Testing Form Submission

### Using cURL

```bash
curl -X POST http://localhost:3001/api/apply \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "experience": "<3y"
  }'
```

### Using Frontend

1. Navigate to `http://localhost:3000/apply`
2. Fill in the form
3. Click Submit
4. Should redirect to `/success?type=apply`
5. Check your email for confirmation

## 🚢 Deployment

### Environment Variables for Production

Create a `.env.production` file:

```env
VITE_API_URL="https://api.yourdomain.com"
SENDGRID_API_KEY="your_production_key"
NODE_ENV="production"
FRONTEND_URL="https://yourdomain.com"
```

### Build

```bash
npm run build
```

### Deploy Backend

The backend is a simple Express server. Deploy to:
- Vercel
- Heroku
- Railway
- AWS Lambda
- Or any Node.js hosting

Example Vercel deployment:
```bash
vercel
```

## 📞 Support

For issues with:
- **Forms**: Check `/backend/config/email.ts` and backend logs
- **Styling**: See Tailwind configuration in `tailwind.config.js`
- **Routing**: Check `/src/App.tsx` for route definitions
- **Content**: Edit `/src/constants/content.ts` for text changes

## 📝 Notes

- The site uses **Framer Motion** for animations
- **Tailwind CSS** handles all styling
- **React Router v7** for client-side routing
- Multi-language content stored in a single `content.ts` file
- Backend gracefully handles email service failures

---

**Last Updated**: May 2024
**Maintained By**: Pickering Global Campus Team
