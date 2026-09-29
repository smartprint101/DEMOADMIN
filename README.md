# CodePixel Web — Demo Admin Panel

একটি login-free, public, interactive e-commerce Admin Panel demo for CodePixel Web. এটি শুধুমাত্র demonstration-এর জন্য; সব customer, order, courier, payment ও tracking তথ্য mock/demo data.

## প্রযুক্তি

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Vercel-ready App Router

## Local development

```bash
npm install
npm run dev
```

তারপর `http://localhost:3000` খুলুন। কোনো login বা credential প্রয়োজন নেই।

## Production build

```bash
npm run build
npm start
```

## Routes

সব demo route সরাসরি open করা যায়, যেমন:

- `/admin`
- `/admin/orders`
- `/admin/products`
- `/admin/couriers`
- `/admin/pixel`
- `/admin/server-tracking`
- `/admin/landing-pages`
- `/admin/settings`

## Environment variables

`.env.example` দেখুন। বর্তমান `DEMO_MODE`-এ কোনো real API বা secret দরকার নেই। ভবিষ্যতে real courier, Meta, database বা storage integration যোগ করার জন্য placeholder রাখা হয়েছে। `.env` বা credentials কখনো commit করবেন না।

## Vercel / Cloudflare

Repository-টি Vercel-এ সরাসরি import করে deploy করা যায়। কোনো hardcoded production domain বা localhost API নেই। Cloudflare DNS থেকে Vercel-এর দেওয়া domain-এ point করলেই custom domain ব্যবহার করা যাবে।

## Demo architecture

- `config/` — centralized site, courier, WhatsApp ও admin configuration
- `data/` — centralized demo data
- `services/courier/` — latency-simulated courier service layer
- `app/` — responsive admin UI ও direct demo routes

সব integration বর্তমানে mock/demo mode-এ চলছে।
