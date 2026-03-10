"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ArrowRight, BookOpen, Calculator, PenLine, Clock, Target, TrendingUp } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import { useI18n } from "@/lib/i18n-context";

export default function SATPageClient() {
  const { t } = useI18n();
  const s = t.sat;

  return (
    <div className="pt-20 bg-white dark:bg-slate-900">
      {/* Hero */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Badge variant="blue" className="mb-5">{s.badge}</Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-950 dark:text-white tracking-tight mb-6 leading-tight"
            >
              {s.heroTitle.split("1400+")[0]}
              <span className="text-blue-600 dark:text-blue-400">1400+</span>
              {s.heroTitle.split("1400+")[1] ?? ""}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-xl"
            >
              {s.heroDesc}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 mb-8"
            >
              {[
                { icon: Clock, text: s.statLabels[0] },
                { icon: Target, text: s.statLabels[1] },
                { icon: TrendingUp, text: s.statLabels[2] },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-full px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300">
                  <Icon size={14} className="text-blue-600 dark:text-blue-400" />
                  {text}
                </div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex gap-3"
            >
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact" className="group">
                  {t.common.takeDiagnostic}
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/pricing">{t.common.seePricing}</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={s.programBadge} title={s.programTitle} subtitle={s.programSubtitle} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: BookOpen, stat: s.stat1, color: "blue" as const },
              { icon: Target, stat: s.stat2, color: "amber" as const },
              { icon: Calculator, stat: s.stat3, color: "green" as const },
            ].map(({ icon: Icon, stat, color }) => (
              <Card key={stat.label} padding="lg" className="text-center">
                <div className={`w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
                  color === "blue" ? "bg-blue-50 dark:bg-blue-900/30" :
                  color === "amber" ? "bg-amber-50 dark:bg-amber-900/30" :
                  "bg-emerald-50 dark:bg-emerald-900/30"
                }`}>
                  <Icon size={20} className={
                    color === "blue" ? "text-blue-600 dark:text-blue-400" :
                    color === "amber" ? "text-amber-600 dark:text-amber-400" :
                    "text-emerald-600 dark:text-emerald-400"
                  } />
                </div>
                <div className="text-4xl font-bold text-navy-950 dark:text-white mb-1">{stat.count}</div>
                <div className="font-semibold text-navy-950 dark:text-white mb-2">{stat.label}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{stat.desc}</div>
              </Card>
            ))}
          </div>

          {/* Lesson structure */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-card dark:shadow-none p-8">
            <h3 className="font-semibold text-navy-950 dark:text-white text-lg mb-6">{s.lessonPattern}</h3>
            <div className="flex flex-col sm:flex-row gap-4 items-stretch">
              {s.lessons.map((lesson, i) => (
                <div key={lesson.label} className="flex-1 relative">
                  <div className={`rounded-xl p-5 border h-full ${
                    lesson.type === "verbal"
                      ? "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800"
                      : "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800"
                  }`}>
                    <span className={`text-xs font-semibold uppercase tracking-wider ${
                      lesson.type === "verbal" ? "text-blue-500 dark:text-blue-400" : "text-emerald-500 dark:text-emerald-400"
                    }`}>
                      Lesson {i + 1}
                    </span>
                    <div className={`font-semibold mt-1 ${
                      lesson.type === "verbal" ? "text-blue-900 dark:text-blue-100" : "text-emerald-900 dark:text-emerald-100"
                    }`}>{lesson.label}</div>
                    <div className={`text-sm mt-0.5 ${
                      lesson.type === "verbal" ? "text-blue-600 dark:text-blue-300" : "text-emerald-600 dark:text-emerald-300"
                    }`}>{lesson.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-4">{s.lessonNote}</p>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={s.curriculumBadge} title={s.curriculumTitle} subtitle={s.curriculumSubtitle} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: PenLine, section: s.writingSection, sub: s.writingSubtitle, items: s.curriculum.writing, color: "blue" as const, borderColor: "border-blue-100 dark:border-blue-800" },
              { icon: BookOpen, section: s.readingSection, sub: s.readingSubtitle, items: s.curriculum.reading, color: "purple" as const, borderColor: "border-purple-100 dark:border-purple-800" },
              { icon: Calculator, section: s.mathSection, sub: s.mathSubtitle, items: s.curriculum.math, color: "emerald" as const, borderColor: "border-emerald-100 dark:border-emerald-800" },
            ].map(({ icon: Icon, section, sub, items, color, borderColor }, i) => (
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`bg-white dark:bg-slate-800 rounded-2xl border ${borderColor} shadow-card dark:shadow-none p-6`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    color === "blue" ? "bg-blue-50 dark:bg-blue-900/30" :
                    color === "purple" ? "bg-purple-50 dark:bg-purple-900/30" :
                    "bg-emerald-50 dark:bg-emerald-900/30"
                  }`}>
                    <Icon size={18} className={
                      color === "blue" ? "text-blue-600 dark:text-blue-400" :
                      color === "purple" ? "text-purple-600 dark:text-purple-400" :
                      "text-emerald-600 dark:text-emerald-400"
                    } />
                  </div>
                  <div>
                    <div className="font-semibold text-navy-950 dark:text-white">{section}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500">{sub}</div>
                  </div>
                </div>
                <ul className="space-y-2.5">
                  {items.map((topic) => (
                    <li key={topic} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle2 size={14} className={
                        color === "blue" ? "text-blue-500 dark:text-blue-400" :
                        color === "purple" ? "text-purple-500 dark:text-purple-400" :
                        "text-emerald-500 dark:text-emerald-400"
                      } />
                      {topic}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Process */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={s.processBadge} title={s.processTitle} subtitle={s.processSubtitle} />

          <div className="max-w-2xl mx-auto space-y-4">
            {s.process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-card dark:shadow-none p-5 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                  {step.step}
                </div>
                <div>
                  <div className="font-semibold text-navy-950 dark:text-white mb-1">{step.title}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
