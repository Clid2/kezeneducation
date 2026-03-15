"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2, ArrowRight, BookOpen, Calculator,
  PenLine, Clock, Target, TrendingUp, Zap, BarChart3, Trophy
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import { useI18n } from "@/lib/i18n-context";

/* ─── Animated counter ─── */
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18 });
  const display = useTransform(spring, (v) => Math.round(v).toString() + suffix);

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

/* ─── Score bar chart ─── */
const SCORES = [1100, 1150, 1200, 1260, 1300, 1350, 1400];

function ScoreChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="flex items-end gap-1.5 h-20">
      {SCORES.map((s, i) => {
        const pct = ((s - 1080) / 360) * 100;
        const isLast = i === SCORES.length - 1;
        return (
          <motion.div
            key={s}
            className="flex-1 rounded-sm relative group"
            initial={{ height: 0 }}
            animate={inView ? { height: `${pct}%` } : { height: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.07, ease: [0.34, 1.2, 0.64, 1] }}
            style={{ alignSelf: "flex-end" }}
          >
            <div
              className={`w-full h-full rounded-sm transition-colors ${
                isLast ? "bg-blue-600" : "bg-blue-100 dark:bg-blue-900/40"
              }`}
            />
            {isLast && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9 }}
                className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap"
              >
                {s}
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── Curriculum pill list ─── */
const COLORS = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    border: "border-blue-100 dark:border-blue-800",
    icon: "text-blue-600 dark:text-blue-400",
    check: "text-blue-500 dark:text-blue-400",
    badge: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
    header: "bg-blue-600",
    num: "text-blue-600 dark:text-blue-400",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-900/20",
    border: "border-purple-100 dark:border-purple-800",
    icon: "text-purple-600 dark:text-purple-400",
    check: "text-purple-500 dark:text-purple-400",
    badge: "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300",
    header: "bg-purple-600",
    num: "text-purple-600 dark:text-purple-400",
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    border: "border-emerald-100 dark:border-emerald-800",
    icon: "text-emerald-600 dark:text-emerald-400",
    check: "text-emerald-500 dark:text-emerald-400",
    badge: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300",
    header: "bg-emerald-600",
    num: "text-emerald-600 dark:text-emerald-400",
  },
} as const;

type ColorKey = keyof typeof COLORS;

/* ─── Step connector ─── */
function ProcessStep({
  step, i, total
}: {
  step: { step: string; title: string; description: string };
  i: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const isLast = i === total - 1;

  return (
    <div ref={ref} className="relative flex gap-5">
      {/* connector line */}
      {!isLast && (
        <motion.div
          className="absolute left-[19px] top-10 bottom-0 w-[2px] bg-blue-100 dark:bg-blue-900/40 origin-top"
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      )}

      {/* circle */}
      <motion.div
        className="relative z-10 w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-200 dark:shadow-blue-900/40"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: i * 0.08 }}
      >
        {i + 1}
      </motion.div>

      {/* card */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.45, delay: 0.1 + i * 0.08, ease: "easeOut" }}
        className="flex-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-5 mb-4"
      >
        <div className="font-semibold text-navy-950 dark:text-white mb-1">{step.title}</div>
        <div className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.description}</div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
export default function SATPageClient() {
  const { t } = useI18n();
  const s = t.sat;

  const heroRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<ColorKey>("blue");

  const curriculumData: { icon: typeof PenLine; section: string; sub: string; items: string[]; color: ColorKey }[] = [
    { icon: PenLine,    section: s.writingSection, sub: s.writingSubtitle, items: s.curriculum.writing, color: "blue" },
    { icon: BookOpen,   section: s.readingSection, sub: s.readingSubtitle, items: s.curriculum.reading, color: "purple" },
    { icon: Calculator, section: s.mathSection,    sub: s.mathSubtitle,    items: s.curriculum.math,    color: "emerald" },
  ];

  const activeData = curriculumData.find((d) => d.color === activeTab)!;

  return (
    <div className="pt-20 bg-white dark:bg-slate-900">

      {/* ── HERO ── */}
      <section className="relative py-24 md:py-32 overflow-hidden" ref={heroRef}>
        {/* grid bg */}
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        {/* glow */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-500/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge variant="blue" className="mb-6">{s.badge}</Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-950 dark:text-white tracking-tight mb-6 leading-[1.05]"
              >
                {s.heroTitle.split("1400+")[0]}
                <span className="relative inline-block">
                  <span className="text-blue-600 dark:text-blue-400">1400+</span>
                  {/* underline squiggle */}
                  <motion.svg
                    viewBox="0 0 120 8" className="absolute -bottom-1 left-0 w-full"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.7 }}
                  >
                    <motion.path
                      d="M2 5 Q30 1 60 5 Q90 9 118 5"
                      fill="none" stroke="#3b82f6" strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.7, delay: 0.7 }}
                    />
                  </motion.svg>
                </span>
                {s.heroTitle.split("1400+")[1] ?? ""}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-lg"
              >
                {s.heroDesc}
              </motion.p>

              {/* stat pills */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-2.5 mb-10"
              >
                {[
                  { icon: Clock, text: s.statLabels[0] },
                  { icon: Target, text: s.statLabels[1] },
                  { icon: TrendingUp, text: s.statLabels[2] },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-full px-3.5 py-1.5 text-sm text-blue-700 dark:text-blue-300 font-medium"
                  >
                    <Icon size={13} />
                    {text}
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.38 }}
                className="flex flex-wrap gap-3"
              >
                <Button variant="primary" size="lg" asChild>
                  <Link href="/contact" className="group">
                    {t.common.takeDiagnostic}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/pricing">{t.common.seePricing}</Link>
                </Button>
              </motion.div>
            </div>

            {/* Right — animated score card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
              className="hidden lg:block"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/60 dark:shadow-none overflow-hidden">
                {/* browser bar */}
                <div className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-md px-3 py-1 text-xs text-slate-400 text-center">
                    app.kezen.edu/dashboard
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  {/* score row */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400 mb-0.5">SAT Score</div>
                      <div className="text-4xl font-bold text-navy-950 dark:text-white">
                        <AnimatedNumber value={1400} />
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400 mb-0.5">Прирост</div>
                      <div className="text-2xl font-bold text-emerald-500">
                        +<AnimatedNumber value={300} />
                      </div>
                    </div>
                  </div>

                  {/* chart */}
                  <div>
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">История баллов</div>
                    <ScoreChart />
                    <div className="flex justify-between mt-1.5 text-[10px] text-slate-400">
                      <span>Старт</span>
                      <span>Сейчас</span>
                    </div>
                  </div>

                  {/* mini stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: BarChart3, label: "Тестов", value: "12" },
                      { icon: Zap, label: "Streak", value: "21д" },
                      { icon: Trophy, label: "Рейтинг", value: "#3" },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3 text-center">
                        <Icon size={14} className="text-blue-600 dark:text-blue-400 mx-auto mb-1" />
                        <div className="text-sm font-bold text-navy-950 dark:text-white">{value}</div>
                        <div className="text-[10px] text-slate-400">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── PROGRAM OVERVIEW ── */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={s.programBadge} title={s.programTitle} subtitle={s.programSubtitle} />

          {/* stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: BookOpen, stat: s.stat1, color: "blue" as ColorKey, num: 30 },
              { icon: Target,   stat: s.stat2, color: "emerald" as ColorKey, num: 6 },
              { icon: Calculator, stat: s.stat3, color: "purple" as ColorKey, num: 8 },
            ].map(({ icon: Icon, stat, color, num }, i) => {
              const c = COLORS[color];
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 text-center group hover:shadow-md transition-shadow duration-300"
                >
                  <div className={`w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center ${c.bg}`}>
                    <Icon size={22} className={c.icon} />
                  </div>
                  <div className={`text-4xl font-bold mb-1 ${c.num}`}>
                    <AnimatedNumber value={num} suffix={num === 8 ? "+" : ""} />
                  </div>
                  <div className="font-semibold text-navy-950 dark:text-white mb-2">{stat.label}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{stat.desc}</div>
                </motion.div>
              );
            })}
          </div>

          {/* lesson structure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-8"
          >
            <h3 className="font-semibold text-navy-950 dark:text-white text-lg mb-6">{s.lessonPattern}</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              {s.lessons.map((lesson, i) => {
                const isVerbal = lesson.type === "verbal";
                return (
                  <motion.div
                    key={lesson.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.1 + i * 0.08 }}
                    whileHover={{ y: -3 }}
                    className={`flex-1 rounded-xl p-5 border cursor-default ${
                      isVerbal
                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800"
                        : "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800"
                    }`}
                  >
                    <span className={`text-xs font-semibold uppercase tracking-wider ${
                      isVerbal ? "text-blue-500 dark:text-blue-400" : "text-emerald-500 dark:text-emerald-400"
                    }`}>
                      Lesson {i + 1}
                    </span>
                    <div className={`font-semibold mt-1 ${
                      isVerbal ? "text-blue-900 dark:text-blue-100" : "text-emerald-900 dark:text-emerald-100"
                    }`}>{lesson.label}</div>
                    <div className={`text-sm mt-0.5 ${
                      isVerbal ? "text-blue-600 dark:text-blue-300" : "text-emerald-600 dark:text-emerald-300"
                    }`}>{lesson.desc}</div>
                  </motion.div>
                );
              })}
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">{s.lessonNote}</p>
          </motion.div>
        </div>
      </section>

      {/* ── CURRICULUM — tabbed ── */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={s.curriculumBadge} title={s.curriculumTitle} subtitle={s.curriculumSubtitle} />

          {/* tab switcher */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {curriculumData.map(({ section, color, icon: Icon }) => {
              const c = COLORS[color];
              const active = activeTab === color;
              return (
                <button
                  key={color}
                  onClick={() => setActiveTab(color)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                    active
                      ? `${c.bg} ${c.border} ${c.icon} shadow-sm`
                      : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:border-slate-300"
                  }`}
                >
                  <Icon size={14} />
                  {section}
                </button>
              );
            })}
          </div>

          {/* tab content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`max-w-2xl mx-auto rounded-2xl border p-8 ${COLORS[activeTab].bg} ${COLORS[activeTab].border}`}
          >
            <div className="flex items-center gap-3 mb-6">
              {(() => {
                const Icon = activeData.icon;
                const c = COLORS[activeTab];
                return (
                  <>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm`}>
                      <Icon size={18} className={c.icon} />
                    </div>
                    <div>
                      <div className="font-semibold text-navy-950 dark:text-white">{activeData.section}</div>
                      <div className="text-xs text-slate-400">{activeData.sub}</div>
                    </div>
                  </>
                );
              })()}
            </div>
            <ul className="space-y-3">
              {activeData.items.map((topic, i) => (
                <motion.li
                  key={topic}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                  className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200"
                >
                  <CheckCircle2 size={15} className={COLORS[activeTab].check} />
                  {topic}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={s.processBadge} title={s.processTitle} subtitle={s.processSubtitle} />
          <div className="max-w-2xl mx-auto">
            {s.process.map((step, i) => (
              <ProcessStep key={step.step} step={step} i={i} total={s.process.length} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
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
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors duration-200 group"
              >
                {s.ctaPrimary}
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 bg-white/15 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/25 transition-colors duration-200 border border-white/20"
              >
                {s.ctaSecondary}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}