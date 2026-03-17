"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Headphones, BookOpen, PenLine, Mic, Zap, Bot } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n-context";

const SECTION_COLORS = {
  blue:    { bg: "bg-blue-50 dark:bg-blue-500/10",     border: "border-blue-200 dark:border-blue-500/30",     text: "text-blue-600 dark:text-blue-400",    check: "text-blue-500 dark:text-blue-400",    pill: "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-400/40" },
  purple:  { bg: "bg-purple-50 dark:bg-purple-500/10",  border: "border-purple-200 dark:border-purple-500/30",  text: "text-purple-600 dark:text-purple-400", check: "text-purple-500 dark:text-purple-400", pill: "bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-400/40" },
  amber:   { bg: "bg-amber-50 dark:bg-amber-500/10",    border: "border-amber-200 dark:border-amber-500/30",    text: "text-amber-600 dark:text-amber-400",   check: "text-amber-500 dark:text-amber-400",   pill: "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-400/40" },
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-500/10",border: "border-emerald-200 dark:border-emerald-500/30",text: "text-emerald-600 dark:text-emerald-400",check: "text-emerald-500 dark:text-emerald-400",pill: "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-400/40" },
} as const;

const ICONS = [Headphones, BookOpen, PenLine, Mic];

/* ── Band score card ── */
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

/* ── Writing step with connector ── */
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
        className="flex-1 bg-white dark:bg-[#0d1424] border border-slate-100 dark:border-white/12 rounded-2xl p-5 mb-4 hover:border-amber-300 dark:hover:border-amber-500/40 shadow-sm transition-all duration-200"
      >
        <div className="font-bold text-slate-900 dark:text-white mb-1.5 text-base">{stage.label}</div>
        <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{stage.desc}</div>
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
    <div className="pt-20 bg-white dark:bg-[#06091a]">

      {/* ── HERO ── */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-[#f0fdf8] dark:bg-[#06091a]">
        {/* light mode */}
        <div className="absolute -top-20 -right-20 w-[550px] h-[550px] rounded-full bg-emerald-200/70 blur-3xl pointer-events-none dark:hidden" />
        <div className="absolute top-1/3 -left-32 w-[400px] h-[400px] rounded-full bg-teal-200/60 blur-3xl pointer-events-none dark:hidden" />
        <div className="absolute bottom-0 right-1/3 w-[350px] h-[350px] rounded-full bg-cyan-200/50 blur-3xl pointer-events-none dark:hidden" />
        {/* dark mode */}
        <div className="absolute -top-40 right-0 w-[600px] h-[400px] rounded-full bg-emerald-500/12 blur-3xl pointer-events-none hidden dark:block" />
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full bg-teal-500/8 blur-3xl pointer-events-none hidden dark:block" />
        <div className="absolute inset-0 bg-grid opacity-20 dark:opacity-10 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Badge variant= "green" className="mb-6 text-sm px-5 py-2">{il.badge}</Badge>
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
                className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-lg"
              >
                {il.heroDesc}
              </motion.p>

              {/* Feature pills — из переводов */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="flex flex-wrap gap-2 mb-10"
              >
                {il.heroPills.map((f: string) => (
                  <span key={f} className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 rounded-full px-3.5 py-1.5">
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
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="relative bg-white dark:bg-[#0d1424] rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl p-8 overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

                <div className="space-y-6">
                  {/* Band scores grid */}
                  <div className="grid grid-cols-4 gap-4 pb-4 border-b border-slate-100 dark:border-white/10">
                    {[
                      { label: "Listening", value: "8.0", color: "text-blue-500 dark:text-blue-400" },
                      { label: "Reading",   value: "7.5", color: "text-purple-500 dark:text-purple-400" },
                      { label: "Writing",   value: "7.0", color: "text-amber-500 dark:text-amber-400" },
                      { label: "Speaking",  value: "7.5", color: "text-emerald-500 dark:text-emerald-400" },
                    ].map((s) => <BandScore key={s.label} {...s} />)}
                  </div>

                  {/* Overall */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400 mb-0.5">Overall Band</div>
                      <div className="text-5xl font-black text-slate-900 dark:text-white leading-none">7.5</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400 mb-0.5">{il.scoreIncrease}</div>
                      <div className="text-2xl font-bold text-emerald-500">+2.0</div>
                      <div className="text-xs text-slate-400">4 {il.monthLabel}</div>
                    </div>
                  </div>

                  {/* AI speaking */}
                  <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/25 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <Bot size={15} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">AI Speaking Coach</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{il.aiCoachReady} • 14 {il.aiCoachSessions}</div>
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
        <div className="h-12 bg-gradient-to-b from-transparent to-white dark:to-[#06091a] pointer-events-none mt-8" />
      </section>

      {/* ── 4 SECTIONS ── */}
      <section className="relative py-20 bg-white dark:bg-[#06091a] overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-blue-400/4 dark:bg-blue-500/6 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-slate-100 dark:border-white/8 mb-16" />
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-3">
              <span className="w-4 h-px bg-emerald-600 dark:bg-emerald-400" />
              {il.sectionsBadge}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">{il.sectionsTitle}</h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-xl">{il.sectionsSubtitle}</p>
          </motion.div>

          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 mb-10">
            {il.sections.map((section, i) => {
              const Icon = ICONS[i];
              const isActive = activeTab === i;
              const c = SECTION_COLORS[section.color as keyof typeof SECTION_COLORS] || SECTION_COLORS.blue;
              return (
                <button
                  key={section.title}
                  onClick={() => setActiveTab(i)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                    isActive
                      ? `${c.bg} ${c.border} ${c.text}`
                      : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/20"
                  }`}
                >
                  <Icon size={14} />
                  {section.title}
                </button>
              );
            })}
          </div>

          {/* Active section content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`${activeColors.bg} ${activeColors.border} border rounded-2xl p-8`}
          >
            <div className="flex items-start gap-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${activeColors.bg} border ${activeColors.border}`}>
                <ActiveIcon size={22} className={activeColors.text} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{activeSection.title}</h3>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${activeColors.pill}`}>
                    {activeSection.band}
                  </span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeSection.points.map((point) => (
                    <li key={point} className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 size={14} className={activeColors.check} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WRITING SYSTEM ── */}
      <section className="relative py-20 bg-slate-50 dark:bg-[#08091e] overflow-hidden">
        <div className="absolute top-0 right-1/3 w-[400px] h-[300px] bg-amber-400/5 dark:bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-slate-100 dark:border-white/8 mb-16" />
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-3">
              <span className="w-4 h-px bg-amber-600 dark:bg-amber-400" />
              {il.writingBadge}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">{il.writingTitle}</h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-xl">{il.writingDesc}</p>
          </motion.div>
          <div className="max-w-2xl">
            {il.writingSystem.map((stage, i) => (
              <WritingStep key={stage.step} stage={stage} i={i} total={il.writingSystem.length} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SPEAKING SYSTEM ── */}
      <section className="relative py-20 bg-white dark:bg-[#06091a] overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[350px] h-[350px] bg-emerald-400/5 dark:bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[250px] bg-teal-400/5 dark:bg-teal-500/8 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-slate-100 dark:border-white/8 mb-16" />
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-3">
              <span className="w-4 h-px bg-emerald-600 dark:bg-emerald-400" />
              {il.speakingBadge}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">{il.speakingTitle}</h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-xl">{il.speakingDesc}</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {il.speakingSystem.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.18 } }}
                className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/25 rounded-2xl p-6 hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mb-4">
                  <Zap size={18} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{item.label}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 bg-slate-50 dark:bg-[#06091a] overflow-hidden">
        <div className="absolute inset-0 bg-emerald-500/2 dark:bg-emerald-500/4 pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-10 md:p-14 text-white shadow-xl shadow-emerald-200 dark:shadow-emerald-900/30"
          >
            <div className="text-3xl md:text-4xl font-bold mb-4">{il.ctaTitle}</div>
            <p className="text-emerald-100 text-lg mb-8 leading-relaxed">{il.ctaSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-emerald-600 font-semibold px-6 py-3 rounded-xl hover:bg-emerald-50 transition-colors duration-200 group">
                {il.ctaPrimary}
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/pricing"
                className="inline-flex items-center justify-center gap-2 bg-white/15 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/25 transition-colors duration-200 border border-white/20">
                {il.ctaSecondary}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}