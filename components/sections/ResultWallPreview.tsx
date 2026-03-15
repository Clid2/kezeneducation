"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Trophy, Star, Users, TrendingUp, Lock } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

export default function ResultWallPreview() {
  const { t } = useI18n();
  const r = t.resultsPreview;

  const placeholders = [
    { label: "SAT",   months: 4, slot: r.slot1 },
    { label: "SAT",   months: 3, slot: r.slot2 },
    { label: "IELTS", months: 4, slot: r.slot3 },
    { label: "SAT",   months: 5, slot: r.slot4 },
    { label: "IELTS", months: 3, slot: r.slot5 },
    { label: "SAT",   months: 4, slot: r.slot1 },
  ];

  return (
    <section className="relative py-24 bg-slate-50 dark:bg-[#06091a] overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-blue-400/4 dark:bg-blue-500/6 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[250px] bg-emerald-400/4 dark:bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-slate-200 dark:border-white/8 mb-16" />

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-4">
            <Trophy size={12} />
            {r.sectionLabel}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">
            {r.emptyTitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg max-w-xl mx-auto">
            {r.emptyDesc}
          </p>
        </motion.div>

        {/* Placeholder cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {placeholders.map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="relative bg-white dark:bg-[#0d1424] rounded-2xl border border-dashed border-slate-300 dark:border-white/15 p-5 overflow-hidden"
            >
              {/* blur overlay */}
              <div className="absolute inset-0 backdrop-blur-[1px] bg-white/40 dark:bg-[#0d1424]/60 z-10 flex flex-col items-center justify-center gap-2 rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/8 border border-slate-200 dark:border-white/10 flex items-center justify-center">
                  <Lock size={16} className="text-slate-400 dark:text-slate-500" />
                </div>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{item.slot}</span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${item.label === "SAT" ? "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300" : "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300"}`}>
                  {item.label} · {item.months} {r.program}
                </span>
              </div>

              {/* fake content behind blur */}
              <div className="flex items-center justify-between mb-4 opacity-30">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-white/10" />
                  <div>
                    <div className="h-3 w-20 bg-slate-300 dark:bg-white/20 rounded" />
                    <div className="h-2 w-14 bg-slate-200 dark:bg-white/10 rounded mt-1" />
                  </div>
                </div>
                <div className="h-5 w-10 bg-slate-200 dark:bg-white/10 rounded-full" />
              </div>
              <div className="flex items-center gap-3 opacity-30">
                <div className="flex-1 bg-slate-100 dark:bg-white/5 rounded-xl p-3">
                  <div className="h-2 w-8 bg-slate-300 dark:bg-white/20 rounded mx-auto mb-1" />
                  <div className="h-5 w-12 bg-slate-300 dark:bg-white/20 rounded mx-auto" />
                </div>
                <TrendingUp size={18} className="text-slate-300 dark:text-white/20" />
                <div className="flex-1 bg-blue-50 dark:bg-blue-500/10 rounded-xl p-3">
                  <div className="h-2 w-8 bg-blue-200 dark:bg-blue-400/20 rounded mx-auto mb-1" />
                  <div className="h-5 w-12 bg-blue-200 dark:bg-blue-400/20 rounded mx-auto" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA block */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-10 text-center overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <div className="flex items-center gap-2 mb-2">
                <Users size={16} className="text-blue-200" />
                <span className="text-blue-200 text-sm font-medium">{r.ctaEnrollOpen}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{r.ctaEnrollTitle}</h3>
              <p className="text-blue-100 text-sm leading-relaxed max-w-md">
                {r.ctaEnrollDesc}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/contact"
                className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-colors duration-200 text-sm group">
                {r.ctaEnrollPrimary}
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/pricing"
                className="inline-flex items-center gap-2 bg-white/15 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/25 transition-colors duration-200 border border-white/20 text-sm">
                {r.ctaEnrollSecondary}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}