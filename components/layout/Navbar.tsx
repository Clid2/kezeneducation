"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, GraduationCap, BookOpen,
  Zap, Sun, Moon, Monitor, BarChart3, LayoutDashboard,
} from "lucide-react";
import { useTheme } from "next-themes";
import Button from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n-context";
import type { Locale } from "@/lib/i18n-context";
import { cn } from "@/lib/utils";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-9 h-9" />;
  const icons = { light: Sun, dark: Moon, system: Monitor };
  const next: Record<string, string> = { light: "dark", dark: "system", system: "light" };
  const current = theme || "system";
  const Icon = icons[current as keyof typeof icons] || Monitor;
  return (
    <button
      onClick={() => setTheme(next[current])}
      aria-label={`Switch theme (current: ${current})`}
      className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/8 transition-all"
    >
      <Icon size={16} />
    </button>
  );
}

function LangToggle() {
  const { locale, setLocale } = useI18n();
  const locales: Locale[] = ["ru", "kk", "en"];
  return (
    <div className="flex items-center gap-0.5 px-1.5 py-1 rounded-lg border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-sm">
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          <button
            onClick={() => setLocale(l)}
            className={cn(
              "text-xs font-semibold px-1.5 py-0.5 rounded transition-colors",
              locale === l
                ? "text-slate-900 dark:text-white"
                : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
            )}
          >
            {l.toUpperCase()}
          </button>
          {i < locales.length - 1 && <span className="text-slate-300 dark:text-white/20 text-xs">/</span>}
        </span>
      ))}
    </div>
  );
}

const programIcons: Record<string, typeof GraduationCap> = {
  "/sat": GraduationCap,
  "/ielts": BookOpen,
  "/system": Zap,
  "/platform": LayoutDashboard,
  "/results": BarChart3,
};

const programColors: Record<string, string> = {
  "/sat":      "bg-blue-50 dark:bg-blue-500/15 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/25",
  "/ielts":    "bg-emerald-50 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/25",
  "/system":   "bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/25",
  "/platform": "bg-purple-50 dark:bg-purple-500/15 text-purple-600 dark:text-purple-400 group-hover:bg-purple-100 dark:group-hover:bg-purple-500/25",
  "/results":  "bg-amber-50 dark:bg-amber-500/15 text-amber-600 dark:text-amber-400 group-hover:bg-amber-100 dark:group-hover:bg-amber-500/25",
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { t } = useI18n();

  const navLinks = [
    {
      label: t.nav.programs,
      children: [
        { label: t.nav.sat,   href: "/sat",   icon: programIcons["/sat"],   description: t.nav.satDesc,   color: programColors["/sat"] },
        { label: t.nav.ielts, href: "/ielts", icon: programIcons["/ielts"], description: t.nav.ieltsDesc, color: programColors["/ielts"] },
      ],
    },
    {
      label: t.nav.learn,
      children: [
        { label: t.nav.system,   href: "/system",   icon: programIcons["/system"],   description: t.nav.systemDesc,   color: programColors["/system"] },
        { label: t.nav.platform, href: "/platform", icon: programIcons["/platform"], description: t.nav.platformDesc, color: programColors["/platform"] },
        { label: t.nav.results,  href: "/results",  icon: programIcons["/results"],  description: t.nav.resultsDesc,  color: programColors["/results"] },
      ],
    },
    { label: t.nav.pricing,    href: "/pricing" },
    { label: t.nav.ambassador, href: "/ambassador" },
    { label: t.nav.blog,       href: "/blog" },
    { label: t.nav.about,      href: "/about" },
  ];

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => { setMobileOpen(false); setActiveDropdown(null); }, [pathname]);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      scrolled
        ? "bg-white/80 dark:bg-[#06091a]/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/8 shadow-sm shadow-black/5"
        : "bg-transparent"
    )}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-blue-500 transition-colors">
              <span className="text-white font-black text-sm">K</span>
            </div>
            <span className="font-bold text-slate-900 dark:text-white text-lg tracking-tight">Kezen</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}>
                  <button className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150",
                    activeDropdown === link.label
                      ? "text-slate-900 dark:text-white bg-black/5 dark:bg-white/8"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                  )}>
                    {link.label}
                    <ChevronDown size={13} className={cn("transition-transform duration-200 opacity-60", activeDropdown === link.label && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.98 }}
                        transition={{ duration: 0.13 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white/90 dark:bg-[#0d1424]/95 backdrop-blur-xl rounded-2xl border border-slate-100 dark:border-white/10 shadow-xl shadow-black/10 dark:shadow-none p-2"
                      >
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent rounded-t-2xl" />
                        {link.children.map((child) => (
                          <Link key={child.href} href={child.href}
                            className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                          >
                            <div className={cn("mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors", child.color)}>
                              <child.icon size={14} />
                            </div>
                            <div>
                              <div className={cn("text-sm font-semibold transition-colors",
                                pathname === child.href ? "text-blue-600 dark:text-blue-400" : "text-slate-800 dark:text-white"
                              )}>{child.label}</div>
                              <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 leading-snug">{child.description}</div>
                            </div>
                            {pathname === child.href && (
                              <div className="ml-auto mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                            )}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={(link as { label: string; href: string }).href}
                  href={(link as { label: string; href: string }).href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150",
                    pathname === (link as { label: string; href: string }).href
                      ? "text-slate-900 dark:text-white bg-black/5 dark:bg-white/8"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-2">
            <LangToggle />
            <ThemeToggle />
            <Link href="/contact"
              className="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-all duration-150">
              {t.nav.contact}
            </Link>
            <Button variant="primary" size="sm" asChild>
              <Link href="/pricing">{t.common.getStarted}</Link>
            </Button>
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-1.5">
            <LangToggle />
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-black/5 dark:hover:bg-white/8 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white/90 dark:bg-[#06091a]/95 backdrop-blur-xl border-b border-slate-100 dark:border-white/8 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <div className="px-3 py-1.5 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-4 first:mt-0">
                      {link.label}
                    </div>
                    {link.children.map((child) => (
                      <Link key={child.href} href={child.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors",
                          pathname === child.href
                            ? "bg-black/5 dark:bg-white/8"
                            : "hover:bg-black/5 dark:hover:bg-white/5"
                        )}
                      >
                        <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0", child.color)}>
                          <child.icon size={14} />
                        </div>
                        <span className={cn("text-sm font-medium",
                          pathname === child.href ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"
                        )}>{child.label}</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={(link as { label: string; href: string }).href}
                    href={(link as { label: string; href: string }).href}
                    className={cn(
                      "block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                      pathname === (link as { label: string; href: string }).href
                        ? "bg-black/5 dark:bg-white/8 text-slate-900 dark:text-white"
                        : "text-slate-700 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="pt-4 pb-2 border-t border-slate-100 dark:border-white/8 mt-4 flex flex-col gap-2">
                <Button variant="outline" size="md" className="w-full" asChild>
                  <Link href="/contact">{t.nav.contact}</Link>
                </Button>
                <Button variant="primary" size="md" className="w-full" asChild>
                  <Link href="/pricing">{t.common.getStarted}</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}