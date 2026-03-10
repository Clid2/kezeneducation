# Kezen Education — SAT & IELTS Preparation Platform

> The most systematic SAT & IELTS preparation platform. Structured preparation. Real score growth. Transparent progress tracking.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone or unzip the project
cd kezen-education

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
kezen-education/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (Navbar + Footer)
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles + Tailwind imports
│   ├── sat/                    # SAT Preparation page
│   ├── ielts/                  # IELTS Preparation page
│   ├── system/                 # Our System page
│   ├── pricing/                # Programs & Pricing page
│   ├── results/                # Result Wall page
│   ├── platform/               # Learning Platform page
│   ├── ambassador/             # Ambassador Program page
│   ├── about/                  # About Kezen page
│   ├── blog/                   # Blog & Resources page
│   └── contact/                # Contact page
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Responsive navbar with dropdowns
│   │   └── Footer.tsx          # Full footer with links
│   ├── ui/
│   │   ├── Button.tsx          # Button component (4 variants)
│   │   ├── Badge.tsx           # Badge/tag component
│   │   ├── Card.tsx            # Card wrapper component
│   │   └── SectionHeader.tsx   # Section title component
│   └── sections/
│       ├── Hero.tsx            # Home hero with platform preview
│       ├── Problem.tsx         # Problem/solution section
│       ├── Courses.tsx         # SAT + IELTS course cards
│       ├── ResultWallPreview.tsx # Score results preview
│       ├── PlatformPreview.tsx # Platform feature showcase
│       ├── Gamification.tsx    # Points/prizes system
│       └── CTA.tsx             # Reusable call-to-action section
│
├── lib/
│   └── utils.ts                # cn() utility for Tailwind class merging
│
├── tailwind.config.ts          # Tailwind config with custom colors/fonts
├── tsconfig.json
├── next.config.ts
├── postcss.config.js
└── package.json
```

---

## 🎨 Design System

### Color Palette

| Name    | Value     | Usage                     |
|---------|-----------|---------------------------|
| Navy    | `#0F172A` | Headings, dark sections   |
| Blue    | `#2563EB` | Primary CTA, accents      |
| White   | `#FFFFFF` | Main background           |
| Gray    | `#F8FAFC` | Section backgrounds       |

### Typography

- Font: **Inter** (Google Fonts)
- Weights: 300, 400, 500, 600, 700, 800, 900

### Animations

- Powered by **Framer Motion**
- All animations use `whileInView` for scroll-triggered reveals
- Staggered delays for grid items
- Subtle hover states on interactive elements

---

## 📱 Pages Overview

| Route          | Page                    | Key Features                           |
|----------------|-------------------------|----------------------------------------|
| `/`            | Home                    | Hero, Problem, Courses, Results, Platform, Gamification |
| `/sat`         | SAT Preparation         | Program overview, curriculum, process  |
| `/ielts`       | IELTS Preparation       | 4 sections, writing + speaking system  |
| `/system`      | Our System              | 6-step learning model                  |
| `/pricing`     | Programs & Pricing      | SAT + IELTS plans, payment methods     |
| `/results`     | Result Wall             | Student score cards                    |
| `/platform`    | Learning Platform       | Dashboard, mocks, mistake bank, etc.   |
| `/ambassador`  | Ambassador Program      | Responsibilities, benefits, apply      |
| `/about`       | About Kezen             | Mission, values, global reach          |
| `/blog`        | Blog & Resources        | Article cards                          |
| `/contact`     | Contact                 | Form + contact info                    |

---

## 🔌 Integrations (Placeholders Ready)

### Analytics

Located in `app/layout.tsx` — uncomment and replace IDs:

```tsx
// Google Analytics
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>

// Meta Pixel
fbq('init', 'META_PIXEL_ID');

// TikTok Pixel
ttq.load('TIKTOK_PIXEL_ID');
```

### Payments

Payment UI is implemented in `/pricing`. To add real payments:

- **Kaspi**: Integrate via Kaspi payment API
- **Stripe**: Install `@stripe/stripe-js` and `stripe`
- **Card payments**: Connect to any payment processor

---

## 🌐 SEO

Metadata is configured per-page using Next.js `Metadata` API:

```tsx
export const metadata: Metadata = {
  title: "Page Title | Kezen Education",
  description: "Page description optimized for SAT/IELTS keywords",
  keywords: ["SAT preparation", "IELTS preparation", ...],
  openGraph: { ... },
};
```

### Target Keywords
- SAT preparation
- IELTS preparation
- SAT course online
- IELTS course online
- SAT Kazakhstan
- IELTS Kazakhstan

---

## 🛠 Tech Stack

| Technology     | Version  | Purpose                      |
|----------------|----------|------------------------------|
| Next.js        | 14.2.5   | Framework (App Router)        |
| React          | 18.3.1   | UI library                   |
| TypeScript     | 5.x      | Type safety                  |
| Tailwind CSS   | 3.4.x    | Styling                      |
| Framer Motion  | 11.x     | Animations                   |
| Lucide React   | 0.414.0  | Icons                        |
| clsx           | 2.x      | Class name utilities         |
| tailwind-merge | 2.x      | Tailwind class deduplication |

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Other Platforms

The project is a standard Next.js app and can be deployed to:
- Vercel
- Netlify
- AWS Amplify
- Docker / any Node.js host

---

## 📧 Contact

**Kezen Education**
- Email: hello@kezen.edu
- Phone: +7 700 123 45 67
- Location: Almaty, Kazakhstan
