"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Headphones, BookOpen, PenLine, Mic, Zap, Bot } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import CTA from "@/components/sections/CTA";
import { useI18n } from "@/lib/i18n-context";

const SECTION_COLORS = {
  blue:    { bg: "bg-blue-50 dark:bg-blue-500/10",    border: "border-blue-200 dark:border-blue-500/30",    text: "text-blue-600 dark:text-blue-400",    check: "text-blue-500 dark:text-blue-400",    tab: "bg-blue-600",    pill: "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30" },
  purple:  { bg: "bg-purple-50 dark:bg-purple-500/10", border: "border-purple-200 dark:border-purple-500/30", text: "text-purple-600 dark:text-purple-400", check: "text-purple-500 dark:text-purple-400", tab: "bg-purple-600", pill: "bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-500/30" },
  amber:   { bg: "bg-amber-50 dark:bg-amber-500/10",   border: "border-amber-200 dark:border-amber-500/30",   text: "text-amber-600 dark:text-amber-400",   check: "text-amber-500 dark:text-amber-400",   tab: "bg-amber-500",   pill: "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30" },
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-500/10",border: "border-emerald-200 dark:border-emerald-500/30",text: "text-emerald-600 dark:text-emerald-400",check: "text-emerald-500 dark:text-emerald-400",tab: "bg-emerald-600", pill: "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30" },
} as const;

const ICONS = [Headphones, BookOpen, PenLine, Mic];

/* ── Band score display ── */
function BandScore({ label, value, color }: { label: string; value: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        className={`text-4xl md:text-5xl font-black mb-1 ${color}`}
      >
        {value}
      </motion.div>
      <div className="text-xs text-slate-400 font-medium">{label}</div>
    </div>
  );
}

/* ── Writing step ── */
function WritingStep({ stage, i, total }: { stage: { step: string; label: string; desc: string }; i: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="relative flex gap-5">
      {i < total - 1 && (
        <motion.div
          className="absolute left-[19px] top-10 bottom-0 w-[2px] bg-amber-100 dark:bg-amber-900/40 origin-top"
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      )}
      <motion.div
        className="relative z-10 w-10 h-10 rounded-full bg-amber-500 text-white font-black text-sm flex items-center justify-center flex-shrink-0 shadow-md shadow-amber-200 dark:shadow-amber-900/40"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: i * 0.1 }}
      >
        {stage.step}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
        className="flex-1 bg-white dark:bg-slate-800 border border-slate-100 dark:border-white/8 rounded-2xl p-5 mb-4 hover:border-amber-200 dark:hover:border-amber-500/30 transition-colors duration-200"
      >
        <div className="font-semibold text-slate-900 dark:text-white mb-1">{stage.label}</div>
        <div className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{stage.desc}</div>
      </motion.div>
    </div>
  );
}

export default function IELTSPageClient() {
  const { t } = useI18n();
  const il = t.ielts;
  const [activeTab, setActiveTab] = useState(0);
  const activeSection = il.sections[activeTab];
  const activeColors = SECTION_COLORS[activeSection.color as keyof typeof SECTION_COLORS] || SECTION_COLORS.blue;
  const ActiveIcon = ICONS[activeTab];

  return (
    <div className="pt-20 bg-white dark:bg-slate-900">

      {/* ── HERO ── */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-500/6 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-teal-500/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Badge variant="green" className="mb-6">{il.badge}</Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-6 leading-[1.05]"
              >
                {il.heroTitle.split("Band 7+")[0]}
                <span className="relative inline-block">
                  <span className="text-emerald-600 dark:text-emerald-400">Band 7+</span>
                  <motion.svg viewBox="0 0 100 8" className="absolute -bottom-1 left-0 w-full"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                    <motion.path d="M2 5 Q25 1 50 5 Q75 9 98 5" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round"
                      initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.7 }} />
                  </motion.svg>
                </span>
                {il.heroTitle.split("Band 7+")[1] ?? ""}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-lg"
              >
                {il.heroDesc}
              </motion.p>

              {/* Feature pills */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="flex flex-wrap gap-2 mb-10"
              >
                {["Все 4 секции", "AI-тренировки Speaking", "Еженедельные эссе", "Пробные тесты"].map((f) => (
                  <span key={f} className="inline-flex items-center gap-1.5 text-xs font-medium bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/25 rounded-full px-3 py-1.5">
                    <CheckCircle2 size={11} />
                    {f}
                  </span>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="flex flex-wrap gap-3"
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

            {/* Right — Band score card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="hidden lg:block"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/60 dark:shadow-none overflow-hidden">
                {/* Browser bar */}
                <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-md px-3 py-1 text-xs text-slate-400 text-center">
                    app.kezen.edu/ielts-progress
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  {/* Band scores */}
                  <div className="grid grid-cols-4 gap-3 pb-5 border-b border-slate-100 dark:border-white/8">
                    {[
                      { label: "Listening", value: "8.5", color: "text-blue-600 dark:text-blue-400" },
                      { label: "Reading",   value: "8.0", color: "text-purple-600 dark:text-purple-400" },
                      { label: "Writing",   value: "7.5", color: "text-amber-600 dark:text-amber-400" },
                      { label: "Speaking",  value: "7.5", color: "text-emerald-600 dark:text-emerald-400" },
                    ].map((s) => <BandScore key={s.label} {...s} />)}
                  </div>

                  {/* Overall */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400 mb-0.5">Overall Band</div>
                      <div className="text-5xl font-black text-slate-900 dark:text-white leading-none">7.5</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400 mb-0.5">Прирост</div>
                      <div className="text-2xl font-bold text-emerald-500">+2.0</div>
                      <div className="text-xs text-slate-400">за 4 мес.</div>
                    </div>
                  </div>

                  {/* AI speaking */}
                  <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <Bot size={15} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">AI Speaking Coach</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Готов к тренировке • 14 сессий</div>
                    </div>
                    <div className="ml-auto">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-emerald-500"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 4 SECTIONS — TABBED ── */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-3">
              <span className="w-4 h-px bg-emerald-600 dark:bg-emerald-400" />
              {il.sectionsBadge}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">{il.sectionsTitle}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-base max-w-xl">{il.sectionsSubtitle}</p>
          </motion.div>

          {/* Tab buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            {il.sections.map((sec, i) => {
              const c = SECTION_COLORS[sec.color as keyof typeof SECTION_COLORS] || SECTION_COLORS.blue;
              const Icon = ICONS[i];
              const active = activeTab === i;
              return (
                <button
                  key={sec.title}
                  onClick={() => setActiveTab(i)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                    active
                      ? `${c.bg} ${c.border} ${c.text} shadow-sm`
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300"
                  }`}
                >
                  <Icon size={14} />
                  {sec.title}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`rounded-2xl border p-8 ${activeColors.bg} ${activeColors.border}`}
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-48 flex-shrink-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center">
                    <ActiveIcon size={18} className={activeColors.text} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{activeSection.title}</div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${activeColors.pill}`}>
                      {activeSection.band}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeSection.points.map((point, i) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                    className="flex items-center gap-2.5 bg-white dark:bg-slate-800/60 rounded-xl px-4 py-3 border border-white dark:border-white/8"
                  >
                    <CheckCircle2 size={14} className={activeColors.check} />
                    <span className="text-sm text-slate-700 dark:text-slate-200 font-medium">{point}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WRITING SYSTEM ── */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-3">
              <span className="w-4 h-px bg-amber-600 dark:bg-amber-400" />
              {il.writingBadge}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">{il.writingTitle}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-base max-w-xl">{il.writingDesc}</p>
          </motion.div>

          <div className="max-w-2xl">
            {il.writingSystem.map((stage, i) => (
              <WritingStep key={stage.step} stage={stage} i={i} total={il.writingSystem.length} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SPEAKING SYSTEM ── */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-3">
              <span className="w-4 h-px bg-emerald-600 dark:bg-emerald-400" />
              {il.speakingBadge}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">{il.speakingTitle}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-base max-w-xl">{il.speakingDesc}</p>
          </motion.div>

          <div className="max-w-2xl space-y-4">
            {il.speakingSystem.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-white/8 p-5 flex items-start gap-4 hover:border-emerald-200 dark:hover:border-emerald-500/30 hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  {i === 0 ? <Bot size={16} className="text-emerald-600 dark:text-emerald-400" /> :
                   i === 1 ? <Mic size={16} className="text-emerald-600 dark:text-emerald-400" /> :
                   <Zap size={16} className="text-emerald-600 dark:text-emerald-400" />}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900 dark:text-white mb-1">{item.label}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</div>
                </div>
                {i === 0 && (
                  <div className="flex-shrink-0 flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 px-2.5 py-1 rounded-full">
                    <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-500" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                    AI
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA title={il.ctaTitle} subtitle={il.ctaSubtitle} primaryLabel={il.ctaPrimary} secondaryLabel={il.ctaSecondary} secondaryHref="/pricing" />
    </div>
  );
}