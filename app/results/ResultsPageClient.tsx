"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import Badge from "@/components/ui/Badge";
import SectionHeader from "@/components/ui/SectionHeader";
import CTA from "@/components/sections/CTA";
import { useI18n } from "@/lib/i18n-context";

const studentResults = [
  { name: "Asel K.", before: 1080, after: 1380, program: "SAT", months: 4, quote: "" },
  { name: "Timur B.", before: 4.5, after: 7.0, program: "IELTS", months: 3, quote: "" },
  { name: "Darina M.", before: 1120, after: 1450, program: "SAT", months: 4, quote: "" },
  { name: "Arman S.", before: 5.0, after: 7.5, program: "IELTS", months: 3, quote: "" },
  { name: "Madina T.", before: 990, after: 1310, program: "SAT", months: 4, quote: "" },
  { name: "Yerassyl N.", before: 1200, after: 1480, program: "SAT", months: 2, quote: "" },
  { name: "Zhuldyz A.", before: 5.5, after: 8.0, program: "IELTS", months: 2, quote: "" },
  { name: "Dias K.", before: 1050, after: 1360, program: "SAT", months: 4, quote: "" },
  { name: "Ainur D.", before: 4.0, after: 6.5, program: "IELTS", months: 3, quote: "" },
  { name: "Bekzat M.", before: 1100, after: 1390, program: "SAT", months: 4, quote: "" },
  { name: "Sabina E.", before: 5.0, after: 7.5, program: "IELTS", months: 2, quote: "" },
  { name: "Alisher T.", before: 1150, after: 1500, program: "SAT", months: 4, quote: "" },
];

export default function ResultsPageClient() {
  const { t } = useI18n();
  const r = t.results;

  const stats = [
    { value: "+250", label: r.avgSAT, color: "text-blue-600 dark:text-blue-400" },
    { value: "+2.0", label: r.avgIELTS, color: "text-emerald-600 dark:text-emerald-400" },
    { value: "96%", label: r.improvedRate, color: "text-amber-600 dark:text-amber-400" },
  ];

  return (
    <div className="pt-20 bg-white dark:bg-slate-900">
      {/* Hero */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge variant="blue" className="mb-5">{r.badge}</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-navy-950 dark:text-white tracking-tight mb-4"
          >
            {r.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-10"
          >
            {r.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-3 gap-6 max-w-lg mx-auto"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`text-3xl md:text-4xl font-black mb-1 ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 leading-tight">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Results grid */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={r.badge} title={r.title} subtitle={r.subtitle} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {studentResults.map((s, i) => {
              const isSAT = s.program === "SAT";
              const increase = isSAT ? `+${s.after - s.before}` : `+${(s.after - s.before).toFixed(1)}`;
              return (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-card dark:shadow-none p-5 hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl bg-navy-950 dark:bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{s.name.split(" ").map((n) => n[0]).join("")}</span>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      isSAT ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                    }`}>
                      {s.program}
                    </span>
                  </div>

                  <div className="font-semibold text-navy-950 dark:text-white mb-3 text-sm">{s.name}</div>

                  <div className="flex items-center justify-between mb-1">
                    <div className="text-center">
                      <div className="text-xs text-slate-400 dark:text-slate-500 mb-0.5">{r.before}</div>
                      <div className="text-lg font-bold text-slate-500 dark:text-slate-400">{s.before}</div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-1">
                        <div className="w-8 h-px bg-slate-200 dark:bg-slate-600" />
                        <TrendingUp size={14} className="text-emerald-500" />
                        <div className="w-8 h-px bg-slate-200 dark:bg-slate-600" />
                      </div>
                      <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{increase}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-slate-400 dark:text-slate-500 mb-0.5">{r.after}</div>
                      <div className="text-lg font-bold text-navy-950 dark:text-white">{s.after}</div>
                    </div>
                  </div>
                  <div className="text-xs text-center text-slate-400 dark:text-slate-500 mt-2">
                    {s.months} {r.program}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTA title={r.ctaTitle} subtitle={r.ctaSubtitle} primaryLabel={r.ctaPrimary} secondaryLabel={r.ctaSecondary} />
    </div>
  );
}
