"use client";

import Link from "next/link";
import { Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

// TikTok icon — not in Lucide, using inline SVG
function TikTokIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.94a8.16 8.16 0 0 0 4.78 1.52V7a4.85 4.85 0 0 1-1.01-.31z" />
    </svg>
  );
}

export default function Footer() {
  const { t } = useI18n();
  const f = t.footer;

  const socials = [
    {
      icon: Instagram,
      href: "https://instagram.com/kezeneducation",
      label: "Instagram",
    },
    {
      icon: TikTokIcon,
      href: "https://tiktok.com/@kezeneducation",
      label: "TikTok",
    },
    {
      icon: Youtube,
      href: "#", // Replace with real YouTube URL
      label: "YouTube",
    },
    {
      icon: Linkedin,
      href: "#", // Replace with real LinkedIn URL
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="bg-navy-950 dark:bg-slate-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">K</span>
              </div>
              <span className="font-bold text-xl tracking-tight">Kezen Education</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              {f.tagline}
            </p>
            <div className="space-y-2.5 text-sm text-slate-400">
              <a
                href="mailto:hello@kezen.edu"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Mail size={14} className="text-blue-400 flex-shrink-0" />
                hello@kezen.edu
              </a>
              <a
                href="tel:+77076957688"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Phone size={14} className="text-blue-400 flex-shrink-0" />
                +7 700 230 68 30
              </a>
              <span className="flex items-center gap-2.5">
                <MapPin size={14} className="text-blue-400 flex-shrink-0" />
                {t.contact.location}
              </span>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
              {f.programs}
            </h4>
            <ul className="space-y-2.5">
              {f.programLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
              {f.platform}
            </h4>
            <ul className="space-y-2.5">
              {f.platformLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
              {f.company}
            </h4>
            <ul className="space-y-2.5">
              {f.companyLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Kezen Education. {f.rights}
          </p>
          <div className="flex items-center gap-1.5">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              {f.privacy}
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              {f.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
