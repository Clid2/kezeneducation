import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Kezen Education — SAT & IELTS Preparation",
    template: "%s | Kezen Education",
  },

  description:
    "The most systematic SAT & IELTS preparation platform. Structured preparation, real score growth, transparent progress tracking.",

  keywords: [
    "SAT preparation",
    "IELTS preparation",
    "SAT course online",
    "IELTS course online",
    "SAT Kazakhstan",
    "IELTS Kazakhstan",
  ],

  authors: [{ name: "Kezen Education" }],
  creator: "Kezen Education",

  metadataBase: new URL("https://kezen.edu"),

  openGraph: {
    title: "Kezen Education — SAT & IELTS Preparation",
    description:
      "Structured preparation. Real score growth. Transparent progress tracking.",
    url: "https://kezen.edu",
    siteName: "Kezen Education",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Kezen Education",
    description: "The most systematic SAT & IELTS preparation platform.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>

      <head>

        {/* Google Analytics — replace GA_MEASUREMENT_ID */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script> */}

        {/* Meta Pixel — replace META_PIXEL_ID */}
        {/* <script>fbq('init', 'META_PIXEL_ID');</script> */}

        {/* TikTok Pixel — replace TIKTOK_PIXEL_ID */}
        {/* <script>ttq.load('TIKTOK_PIXEL_ID');</script> */}

      </head>

      <body className="antialiased bg-white dark:bg-[#06091a] transition-colors duration-300">

        <Providers>

          <Navbar />

          <main>
            {children}
          </main>

          <Footer />

        </Providers>

      </body>
    </html>
  );
}
