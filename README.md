<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/a9445da4-cc84-4528-8915-0982358d6f99

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env.local`
3. Run the app:
   `npm run dev`

## Form Email Setup

The site supports two form submission modes:

1. Static email fallback:
   Set `VITE_FORM_RECIPIENT_EMAIL=admissions@pickering.education` in `.env.local`. When visitors submit a form, their email client opens with the enquiry prefilled.

2. Production endpoint:
   Set `VITE_FORM_ENDPOINT` to a POST endpoint from your backend, Formspree, Make, Zapier, or another form service. The frontend sends JSON with `name`, `email`, `phone`, `experience`, and `formType`.

If you build a SendGrid backend, use `SENDGRID_API_KEY`, `FROM_EMAIL`, and `ADMIN_EMAIL` from `.env.example`, then point `VITE_FORM_ENDPOINT` to that backend route.

## Database and Lark Setup

Local submissions are appended to `data/leads.jsonl` by the Express backend. Run both frontend and backend with `npm run server:dev`; each lead is stored as one JSON line with name, email, phone, experience, form type, and timestamp.

To sync leads to Lark or Feishu, create a group custom bot, copy its webhook URL, and set `LARK_WEBHOOK_URL` in `.env`. New submissions will still save locally if Lark is not configured or temporarily unavailable.

## Social Links

WhatsApp, email, and website links are always available. Add optional desktop and mobile social links with `VITE_SOCIAL_LINKEDIN_URL`, `VITE_SOCIAL_INSTAGRAM_URL`, and `VITE_SOCIAL_FACEBOOK_URL` in `.env.local`.
