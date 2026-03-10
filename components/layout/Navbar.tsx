"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, GraduationCap, BookOpen, Zap, Sun, Moon, Monitor } from "lucide-react";
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
      title={current}
      className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-all"
    >
      <Icon size={16} />
    </button>
  );
}

function LangToggle() {
  const { locale, setLocale } = useI18n();
  const other: Locale = locale === "ru" ? "en" : "ru";

  return (
    <button
      onClick={() => setLocale(other)}
      aria-label={`Switch to ${other.toUpperCase()}`}
      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-all"
    >
      <span className={locale === "ru" ? "text-navy-950 dark:text-white" : "text-slate-400 dark:text-slate-500"}>RU</span>
      <span className="text-slate-300 dark:text-slate-600">/</span>
      <span className={locale === "en" ? "text-navy-950 dark:text-white" : "text-slate-400 dark:text-slate-500"}>EN</span>
    </button>
  );
}

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
        { label: t.nav.sat, href: "/sat", icon: GraduationCap, description: t.nav.satDesc },
        { label: t.nav.ielts, href: "/ielts", icon: BookOpen, description: t.nav.ieltsDesc },
      ],
    },
    {
      label: t.nav.learn,
      children: [
        { label: t.nav.system, href: "/system", icon: Zap, description: t.nav.systemDesc },
        { label: t.nav.platform, href: "/platform", icon: Zap, description: t.nav.platformDesc },
        { label: t.nav.results, href: "/results", icon: Zap, description: t.nav.resultsDesc },
      ],
    },
    { label: t.nav.pricing, href: "/pricing" },
    { label: t.nav.ambassador, href: "/ambassador" },
    { label: t.nav.blog, href: "/blog" },
    { label: t.nav.about, href: "/about" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled
        ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 shadow-sm"
        : "bg-transparent"
    )}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-blue-700 transition-colors">
              <span className="text-white font-black text-sm">K</span>
            </div>
            <span className="font-bold text-navy-950 dark:text-white text-lg tracking-tight">Kezen</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                    {link.label}
                    <ChevronDown size={14} className={cn("transition-transform duration-200", activeDropdown === link.label && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-lg p-2"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group"
                          >
                            <div className="mt-0.5 w-7 h-7 rounded-md bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                              <child.icon size={14} className="text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-navy-950 dark:text-white">{child.label}</div>
                              <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{child.description}</div>
                            </div>
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
                    "px-3 py-2 text-sm font-medium rounded-lg transition-all",
                    pathname === (link as { label: string; href: string }).href
                      ? "text-navy-950 dark:text-white bg-slate-100 dark:bg-slate-800"
                      : "text-slate-600 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop right controls */}
          <div className="hidden lg:flex items-center gap-2">
            <LangToggle />
            <ThemeToggle />
            <Button variant="ghost" size="sm" asChild>
              <Link href="/contact">{t.nav.contact}</Link>
            </Button>
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
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
            className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mt-3 first:mt-0">
                      {link.label}
                    </div>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div className="w-7 h-7 rounded-md bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                          <child.icon size={14} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <span className="text-sm font-medium text-navy-950 dark:text-white">{child.label}</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={(link as { label: string; href: string }).href}
                    href={(link as { label: string; href: string }).href}
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="pt-4 pb-2 border-t border-slate-100 dark:border-slate-800 mt-4 flex flex-col gap-2">
                <Button variant="outline" size="md" className="w-full" asChild>
                  <Link href="/contact">{t.nav.contact}</Link>
                </Button>
                <Button variant="primary" size="md" className="w-full" asChild>
                  <Link href="/pricing">{t.common.getStarted} →</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
