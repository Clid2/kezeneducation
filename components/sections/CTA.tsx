"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

interface CTAProps {
  titleKey?: string;
  subtitleKey?: string;
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTA({
  title,
  subtitle,
  primaryLabel,
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref = "/pricing",
}: CTAProps) {
  const { t } = useI18n();

  const resolvedTitle = title ?? t.cta.defaultTitle;
  const resolvedSubtitle = subtitle ?? t.cta.defaultSubtitle;
  const resolvedPrimary = primaryLabel ?? t.cta.defaultPrimary;
  const resolvedSecondary = secondaryLabel ?? t.cta.defaultSecondary;

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-navy-950 dark:bg-slate-950 rounded-3xl px-8 py-14 md:px-14 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-dots opacity-10" />
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-600/15 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-blue-600/10 blur-2xl" />

          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight text-balance">
              {resolvedTitle}
            </h2>
            <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto leading-relaxed">
              {resolvedSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button variant="primary" size="lg" asChild>
                <Link href={primaryHref} className="group">
                  {resolvedPrimary}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-slate-300 hover:text-white hover:bg-white/10"
                asChild
              >
                <Link href={secondaryHref}>{resolvedSecondary}</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
