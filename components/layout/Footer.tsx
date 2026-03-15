"use client";

import Link from "next/link";
import { Instagram, Youtube, Linkedin, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

function TikTokIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.94a8.16 8.16 0 0 0 4.78 1.52V7a4.85 4.85 0 0 1-1.01-.31z" />
    </svg>
  );
}

export default function Footer() {
  const { t } = useI18n();
  const f = t.footer;

  const socials = [
    { icon: Instagram,  href: "https://instagram.com/kezeneducation", label: "Instagram" },
    { icon: TikTokIcon, href: "https://tiktok.com/@kezeneducation",   label: "TikTok" },
    { icon: Youtube,    href: "#",                                     label: "YouTube" },
    { icon: Linkedin,   href: "#",                                     label: "LinkedIn" },
  ];

  return (
    <footer className="bg-[#06091a] text-white relative overflow-hidden">
      {/* subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-blue-500/8 blur-3xl pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Main */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:bg-blue-500 transition-colors">
                <span className="text-white font-black text-sm">K</span>
              </div>
              <span className="font-bold text-xl tracking-tight">Kezen Education</span>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-8">
              {f.tagline}
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-8">
              <a href="mailto:hello@kezen.edu"
                className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-all">
                  <Mail size={13} className="text-blue-400" />
                </div>
                hello@kezen.edu
              </a>
              <a href="tel:+77002306830"
                className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-all">
                  <Phone size={13} className="text-blue-400" />
                </div>
                +7 700 230 68 30
              </a>
              <span className="flex items-center gap-3 text-sm text-slate-400">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center flex-shrink-0">
                  <MapPin size={13} className="text-blue-400" />
                </div>
                {t.contact.location}
              </span>
            </div>

            {/* CTA mini */}
            <Link href="/contact"
              className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors group">
              Бесплатная диагностика
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-5">
              {f.programs}
            </h4>
            <ul className="space-y-3">
              {f.programLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors hover:translate-x-0.5 inline-block duration-150">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-5">
              {f.platform}
            </h4>
            <ul className="space-y-3">
              {f.platformLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors hover:translate-x-0.5 inline-block duration-150">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-5">
              {f.company}
            </h4>
            <ul className="space-y-3">
              {f.companyLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors hover:translate-x-0.5 inline-block duration-150">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Kezen Education. {f.rights}
          </p>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 hover:bg-blue-500/20 hover:border-blue-500/30 flex items-center justify-center text-slate-500 hover:text-blue-400 transition-all duration-150">
                <Icon size={14} />
              </a>
            ))}
          </div>

          {/* Legal */}
          <div className="flex items-center gap-5 text-xs text-slate-600">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">{f.privacy}</Link>
            <Link href="/terms"   className="hover:text-slate-300 transition-colors">{f.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}