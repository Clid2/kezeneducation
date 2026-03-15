"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  CheckCircle2, ArrowRight, ClipboardList, Users,
  BookOpen, BarChart2, Brain, TrendingUp
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import { useI18n } from "@/lib/i18n-context";
import type { LucideIcon } from "lucide-react";

const stepIconMap: Record<string, LucideIcon> = {
  ClipboardList, Users, BookOpen, BarChart2, Brain, TrendingUp,
};

const colorMap = {
  blue:    { bg: "bg-blue-50 dark:bg-blue-500/10",     icon: "text-blue-600 dark:text-blue-400",    border: "border-blue-200 dark:border-blue-500/30",    num: "bg-blue-600",    line: "bg-blue-100 dark:bg-blue-900/40",    check: "text-blue-500 dark:text-blue-400",    glow: "bg-blue-500/10 dark:bg-blue-500/15" },
  purple:  { bg: "bg-purple-50 dark:bg-purple-500/10",  icon: "text-purple-600 dark:text-purple-400", border: "border-purple-200 dark:border-purple-500/30", num: "bg-purple-600",  line: "bg-purple-100 dark:bg-purple-900/40", check: "text-purple-500 dark:text-purple-400", glow: "bg-purple-500/10 dark:bg-purple-500/15" },
  amber:   { bg: "bg-amber-50 dark:bg-amber-500/10",    icon: "text-amber-600 dark:text-amber-400",   border: "border-amber-200 dark:border-amber-500/30",   num: "bg-amber-500",   line: "bg-amber-100 dark:bg-amber-900/40",   check: "text-amber-500 dark:text-amber-400",   glow: "bg-amber-500/10 dark:bg-amber-500/15" },
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-500/10",icon: "text-emerald-600 dark:text-emerald-400",border: "border-emerald-200 dark:border-emerald-500/30",num: "bg-emerald-600",line: "bg-emerald-100 dark:bg-emerald-900/40",check: "text-emerald-500 dark:text-emerald-400",glow: "bg-emerald-500/10 dark:bg-emerald-500/15" },
  red:     { bg: "bg-red-50 dark:bg-red-500/10",        icon: "text-red-600 dark:text-red-400",       border: "border-red-200 dark:border-red-500/30",       num: "bg-red-500",     line: "bg-red-100 dark:bg-red-900/40",       check: "text-red-500 dark:text-red-400",       glow: "bg-red-500/10 dark:bg-red-500/15" },
  orange:  { bg: "bg-orange-50 dark:bg-orange-500/10",  icon: "text-orange-600 dark:text-orange-400", border: "border-orange-200 dark:border-orange-500/30", num: "bg-orange-500",  line: "bg-orange-100 dark:bg-orange-900/40", check: "text-orange-500 dark:text-orange-400", glow: "bg-orange-500/10 dark:bg-orange-500/15" },
} as const;

/* ── Step with connector ── */
function StepCard({ step, i, total }: {
  step: { step: string; icon: string; title: string; subtitle: string; description: string; outcomes: string[]; color: string };
  i: number; total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const colors = colorMap[step.color as keyof typeof colorMap] || colorMap.blue;
  const Icon = stepIconMap[step.icon] || ClipboardList;
  const isLast = i === total - 1;

  return (
    <div ref={ref} className="relative flex gap-6">
      {!isLast && (
        <motion.div
          className={`absolute left-[19px] top-12 bottom-0 w-[2px] ${colors.line} origin-top`}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      )}

      <motion.div
        className={`relative z-10 w-10 h-10 rounded-full ${colors.num} text-white font-black text-sm flex items-center justify-center flex-shrink-0 shadow-md`}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: i * 0.08 }}
      >
        {i + 1}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.45, delay: 0.1 + i * 0.08, ease: "easeOut" }}
        className={`flex-1 bg-white dark:bg-[#0d1424] rounded-2xl border ${colors.border} shadow-sm p-6 mb-5`}
      >
        <div className="flex items-start gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colors.bg}`}>
            <Icon size={18} className={colors.icon} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{step.step}</span>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{step.subtitle}</span>
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{step.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{step.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {step.outcomes.map((outcome) => (
                <div key={outcome} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <CheckCircle2 size={13} className={colors.check} />
                  {outcome}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function SystemPageClient() {
  const { t } = useI18n();
  const s = t.system;

  return (
    <div className="pt-20 bg-white dark:bg-[#06091a]">

      {/* ── HERO ── */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-[#f5f7ff] dark:bg-[#06091a]">
        <div className="absolute -top-20 -right-20 w-[500px] h-[400px] rounded-full bg-blue-200/60 blur-3xl pointer-events-none dark:hidden" />
        <div className="absolute bottom-0 -left-20 w-[400px] h-[300px] rounded-full bg-violet-200/50 blur-3xl pointer-events-none dark:hidden" />
        <div className="absolute -top-40 right-0 w-[500px] h-[350px] rounded-full bg-blue-500/12 blur-3xl pointer-events-none hidden dark:block" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-violet-500/8 blur-3xl pointer-events-none hidden dark:block" />
        <div className="absolute inset-0 bg-grid opacity-20 dark:opacity-10 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge variant="blue" className="mb-6 text-sm px-5 py-2">{s.badge}</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-6 leading-[1.08]"
          >
            {s.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            {s.heroDesc}
          </motion.p>
        </div>
        <div className="h-12 bg-gradient-to-b from-transparent to-white dark:to-[#06091a] pointer-events-none mt-8" />
      </section>

      {/* ── 6 STEPS ── */}
      <section className="relative py-20 bg-white dark:bg-[#06091a] overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-400/4 dark:bg-blue-500/6 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[300px] bg-indigo-400/4 dark:bg-indigo-500/6 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-slate-100 dark:border-white/8 mb-16" />
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">
              <span className="w-4 h-px bg-blue-600 dark:bg-blue-400" />
              {s.stepsLabel}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">{s.stepsTitle}</h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-xl">{s.stepsSubtitle}</p>
          </motion.div>
          <div className="max-w-3xl mx-auto">
            {s.steps.map((step, i) => (
              <StepCard key={step.step} step={step} i={i} total={s.steps.length} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES ── */}
      <section className="relative py-20 bg-slate-50 dark:bg-[#06091a] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-violet-400/4 dark:bg-violet-500/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[300px] bg-blue-400/4 dark:bg-blue-500/6 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-slate-100 dark:border-white/8 mb-16" />
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-3">
              <span className="w-4 h-px bg-violet-600 dark:bg-violet-400" />
              {s.principlesBadge}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">{s.principlesTitle}</h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-xl">{s.principlesSubtitle}</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {s.principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.18 } }}
                className="bg-white dark:bg-[#0d1424] rounded-2xl border border-slate-100 dark:border-white/10 p-7 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="text-3xl mb-5">{p.icon}</div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-3 text-lg">{p.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 bg-white dark:bg-[#06091a] overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/2 dark:bg-blue-500/4 pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-10 md:p-14 text-white shadow-xl shadow-blue-200 dark:shadow-blue-900/30"
          >
            <div className="text-3xl md:text-4xl font-bold mb-4">{s.ctaTitle}</div>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">{s.ctaSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors duration-200 group">
                {s.ctaPrimary}
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/pricing"
                className="inline-flex items-center justify-center gap-2 bg-white/15 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/25 transition-colors duration-200 border border-white/20">
                {s.ctaSecondary}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}