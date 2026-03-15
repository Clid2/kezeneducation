"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Target, BarChart3, Users, Globe } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { useI18n } from "@/lib/i18n-context";

export default function AboutPageClient() {
  const { t } = useI18n();
  const a = t.about as typeof t.about & { whyBadge: string; whyTitle: string; whySubtitle: string; features: Array<{ title: string; desc: string; color: string }> };

  const icons = [Target, BarChart3, Users, Globe] as const;

  const colorMap = {
    blue:    { bg: "bg-blue-50 dark:bg-blue-500/10",    icon: "text-blue-600 dark:text-blue-400",    border: "border-blue-100 dark:border-blue-500/20"    },
    indigo:  { bg: "bg-indigo-50 dark:bg-indigo-500/10", icon: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-100 dark:border-indigo-500/20" },
    violet:  { bg: "bg-violet-50 dark:bg-violet-500/10", icon: "text-violet-600 dark:text-violet-400", border: "border-violet-100 dark:border-violet-500/20" },
    emerald: { bg: "bg-emerald-50 dark:bg-emerald-500/10",icon: "text-emerald-600 dark:text-emerald-400",border: "border-emerald-100 dark:border-emerald-500/20"},
  } as const;

  return (
    <div className="pt-20 bg-white dark:bg-[#06091a]">

      {/* ── HERO ── */}
      <section className="relative pt-20 pb-0 overflow-hidden bg-[#f5f7ff] dark:bg-[#06091a]">
        {/* light */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[400px] rounded-full bg-blue-200/60 blur-3xl pointer-events-none dark:hidden" />
        <div className="absolute bottom-0 -left-20 w-[400px] h-[300px] rounded-full bg-indigo-200/50 blur-3xl pointer-events-none dark:hidden" />
        {/* dark */}
        <div className="absolute -top-40 right-0 w-[500px] h-[350px] rounded-full bg-blue-500/12 blur-3xl pointer-events-none hidden dark:block" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-indigo-500/8 blur-3xl pointer-events-none hidden dark:block" />
        <div className="absolute top-1/2 right-1/3 w-[200px] h-[200px] rounded-full bg-violet-500/6 blur-2xl pointer-events-none hidden dark:block" />
        <div className="absolute inset-0 bg-grid opacity-20 dark:opacity-10 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge variant="blue" className="mb-6 text-sm px-5 py-2">{a.badge}</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-6 leading-[1.08]"
          >
            {a.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed mb-12"
          >
            {a.heroDesc}
          </motion.p>

          {/* Value cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
          >
            {a.values.map((v, i) => (
              <div key={i} className="bg-white/8 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 rounded-2xl p-5 text-left">
                <div className="text-2xl mb-3">{["🎯", "📊", "❤️"][i]}</div>
                <div className="font-bold text-slate-900 dark:text-white text-sm mb-1.5">{v.title}</div>
                <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{v.desc}</div>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="h-12 bg-gradient-to-b from-transparent to-white dark:to-[#06091a] pointer-events-none mt-10" />
      </section>

      {/* ── MISSION + VALUES ── */}
      <section className="relative pt-10 pb-20 bg-white dark:bg-[#06091a] overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-blue-400/4 dark:bg-blue-500/6 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[250px] bg-indigo-400/4 dark:bg-indigo-500/5 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">
                <span className="w-4 h-px bg-blue-600 dark:bg-blue-400" />
                {a.missionBadge}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-5 leading-snug">{a.missionTitle}</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{a.missionDesc1}</p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{a.missionDesc2}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {a.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-slate-50 dark:bg-[#0d1424] border border-slate-100 dark:border-white/10 rounded-2xl p-5"
                >
                  <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mb-1">{stat.value}</div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white mb-0.5">{stat.label}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{stat.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY KEZEN ── */}
      <section className="relative py-20 bg-slate-50 dark:bg-[#08091e] overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-blue-400/4 dark:bg-blue-500/6 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-slate-200 dark:border-white/8 mb-16" />
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">
              <span className="w-4 h-px bg-blue-600 dark:bg-blue-400" />
              {a.whyBadge}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">{a.whyTitle}</h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-xl">{a.whySubtitle}</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {a.features.map((f, i) => {
              const Icon = icons[i];
              const c = colorMap[f.color as keyof typeof colorMap];
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.18 } }}
                  className={`bg-white dark:bg-[#0d1424] rounded-2xl border ${c.border} p-6 shadow-sm hover:shadow-md transition-all duration-200`}
                >
                  <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center mb-4`}>
                    <Icon size={18} className={c.icon} />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── GEOGRAPHY ── */}
      <section className="relative py-20 bg-white dark:bg-[#06091a] overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[300px] bg-emerald-400/4 dark:bg-emerald-500/6 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-slate-100 dark:border-white/8 mb-16" />
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-3">
              <span className="w-4 h-px bg-emerald-600 dark:bg-emerald-400" />
              {a.geoBadge}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">{a.geoTitle}</h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-xl">{a.geoSubtitle}</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {a.regions.map((region, i) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="bg-slate-50 dark:bg-[#0d1424] border border-slate-100 dark:border-white/10 rounded-2xl p-4 text-center"
              >
                <div className="text-3xl mb-2">{region.flag}</div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-0.5">{region.students}</div>
                <div className="font-bold text-slate-900 dark:text-white text-sm">{region.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 bg-slate-50 dark:bg-[#06091a] overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/2 dark:bg-blue-500/4 pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-10 md:p-14 text-white shadow-xl shadow-blue-200 dark:shadow-blue-900/30"
          >
            <div className="text-3xl md:text-4xl font-bold mb-4">{a.ctaTitle}</div>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">{a.ctaSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors duration-200 group">
                {a.ctaPrimary}
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/sat"
                className="inline-flex items-center justify-center gap-2 bg-white/15 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/25 transition-colors duration-200 border border-white/20">
                {a.ctaSecondary}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}