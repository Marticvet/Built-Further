This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Contact form email

Project briefs and appointment requests are delivered through the Hostinger SMTP mailbox. Copy `.env.example` to `.env.local` and configure the `SMTP_*` and `MAIL_*` values. `MAIL_FROM_ADDRESS`, `MAIL_TO_ADDRESS`, and `SMTP_USER` should all use `hello@builtfurther.com`; the endpoint sends an internal notification there and an acknowledgement to the visitor. In Netlify, add the same variables under **Project configuration → Environment variables**, then redeploy.

## Product analytics

The site has a consent-gated PostHog integration for landing-page attribution, page views and duration, click autocapture, heatmaps, dead clicks, web performance, and session replay. Create a PostHog Cloud project in the EU region, then add its project token and hosts from `.env.example` to `.env.local` and Netlify. Redeploy after setting `NEXT_PUBLIC_*` variables because Next.js embeds them at build time.

No PostHog code is loaded until a visitor allows analytics. Visitors can withdraw consent using **Privacy choices** in the footer. Session replay masks every form input, does not record console output or cross-origin iframes, and only records sessions when Session Replay is enabled in the PostHog project. Keep the site's privacy notice and PostHog data-processing settings aligned with the production configuration.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
