"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Headphones, BookOpen, PenLine, Mic, Zap } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import CTA from "@/components/sections/CTA";
import { useI18n } from "@/lib/i18n-context";

const sectionColors = {
  blue: { bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-600 dark:text-blue-400", border: "border-blue-100 dark:border-blue-800" },
  purple: { bg: "bg-purple-50 dark:bg-purple-900/20", text: "text-purple-600 dark:text-purple-400", border: "border-purple-100 dark:border-purple-800" },
  amber: { bg: "bg-amber-50 dark:bg-amber-900/20", text: "text-amber-600 dark:text-amber-400", border: "border-amber-100 dark:border-amber-800" },
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-100 dark:border-emerald-800" },
} as const;

const sectionIcons = [Headphones, BookOpen, PenLine, Mic];

export default function IELTSPageClient() {
  const { t } = useI18n();
  const il = t.ielts;

  return (
    <div className="pt-20 bg-white dark:bg-slate-900">
      {/* Hero */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge variant="green" className="mb-5">{il.badge}</Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-950 dark:text-white tracking-tight mb-6 leading-tight"
            >
              {il.heroTitle.split("Band 7+")[0]}
              <span className="text-emerald-600 dark:text-emerald-400">Band 7+</span>
              {il.heroTitle.split("Band 7+")[1] ?? ""}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-xl"
            >
              {il.heroDesc}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex gap-3"
            >
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact" className="group">
                  {il.ctaPrimary}
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/pricing">{il.ctaSecondary}</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4 Sections */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={il.sectionsBadge} title={il.sectionsTitle} subtitle={il.sectionsSubtitle} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {il.sections.map((sec, i) => {
              const colors = sectionColors[sec.color as keyof typeof sectionColors] || sectionColors.blue;
              const Icon = sectionIcons[i];
              return (
                <motion.div
                  key={sec.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`bg-white dark:bg-slate-800 rounded-2xl border ${colors.border} shadow-card dark:shadow-none p-6`}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
                      <Icon size={18} className={colors.text} />
                    </div>
                    <div>
                      <div className="font-semibold text-navy-950 dark:text-white">{sec.title}</div>
                      <div className="text-xs text-slate-400 dark:text-slate-500">{sec.band}</div>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {sec.points.map((point) => (
                      <li key={point} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                        <CheckCircle2 size={13} className={colors.text} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Writing System */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={il.writingBadge} title={il.writingTitle} subtitle={il.writingDesc} />
          <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto">
            {il.writingSystem.map((stage, i) => (
              <motion.div
                key={stage.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 relative"
              >
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 -right-3 w-6 h-6 rounded-full bg-blue-600 z-10 flex items-center justify-center">
                    <ArrowRight size={12} className="text-white" />
                  </div>
                )}
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 flex items-center justify-center mb-4">
                  <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{stage.step}</span>
                </div>
                <div className="font-semibold text-navy-950 dark:text-white mb-2">{stage.label}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{stage.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Speaking System */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={il.speakingBadge} title={il.speakingTitle} subtitle={il.speakingDesc} />
          <div className="max-w-2xl mx-auto space-y-4">
            {il.speakingSystem.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-card dark:shadow-none p-5 flex items-start gap-4"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                  <Zap size={15} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <div className="font-semibold text-navy-950 dark:text-white mb-1">{item.label}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA title={il.ctaTitle} subtitle={il.ctaSubtitle} primaryLabel={il.ctaPrimary} secondaryLabel={il.ctaSecondary} secondaryHref="/pricing" />
    </div>
  );
}
