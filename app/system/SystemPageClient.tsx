"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ClipboardList, Users, BookOpen, BarChart2, Brain, TrendingUp } from "lucide-react";
import Badge from "@/components/ui/Badge";
import SectionHeader from "@/components/ui/SectionHeader";
import CTA from "@/components/sections/CTA";
import { useI18n } from "@/lib/i18n-context";
import type { LucideIcon } from "lucide-react";

const stepIconMap: Record<string, LucideIcon> = {
  ClipboardList,
  Users,
  BookOpen,
  BarChart2,
  Brain,
  TrendingUp,
};

const colorMap = {
  blue: { dot: "bg-blue-600", badge: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400", border: "border-l-blue-400" },
  purple: { dot: "bg-purple-600", badge: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400", border: "border-l-purple-400" },
  amber: { dot: "bg-amber-500", badge: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400", border: "border-l-amber-400" },
  emerald: { dot: "bg-emerald-600", badge: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400", border: "border-l-emerald-400" },
  red: { dot: "bg-red-500", badge: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400", border: "border-l-red-400" },
  orange: { dot: "bg-orange-500", badge: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400", border: "border-l-orange-400" },
};

export default function SystemPageClient() {
  const { t } = useI18n();
  const s = t.system;

  return (
    <div className="pt-20 bg-white dark:bg-slate-900">
      {/* Hero */}
      <section className="py-20 md:py-28 bg-slate-50 dark:bg-slate-800/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge variant="blue" className="mb-5">{s.badge}</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-950 dark:text-white tracking-tight mb-6"
          >
            {s.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            {s.heroDesc}
          </motion.p>
        </div>
      </section>

      {/* 6 Steps */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 max-w-3xl mx-auto">
            {s.steps.map((step, i) => {
              const colors = colorMap[step.color as keyof typeof colorMap] || colorMap.blue;
              const Icon = stepIconMap[step.icon] || ClipboardList;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-card dark:shadow-none p-7 border-l-4 ${colors.border}`}
                >
                  <div className="flex items-start gap-5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colors.badge.split(" ").slice(0, 2).join(" ")}`}>
                      <Icon size={18} className={colors.badge.split(" ").slice(-2).join(" ")} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                          {step.step}
                        </span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">·</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{step.subtitle}</span>
                      </div>
                      <h3 className="font-bold text-lg text-navy-950 dark:text-white mb-2">{step.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{step.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {step.outcomes.map((outcome) => (
                          <div key={outcome} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                            <CheckCircle2 size={13} className={colors.badge.split(" ").slice(-2).join(" ")} />
                            {outcome}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={s.principlesBadge} title={s.principlesTitle} subtitle={s.principlesSubtitle} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {s.principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-card dark:shadow-none p-7"
              >
                <div className="text-3xl mb-4">{p.icon}</div>
                <h3 className="font-bold text-navy-950 dark:text-white mb-3">{p.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
}
