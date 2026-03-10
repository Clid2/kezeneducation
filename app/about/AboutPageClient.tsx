"use client";

import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import SectionHeader from "@/components/ui/SectionHeader";
import CTA from "@/components/sections/CTA";
import { useI18n } from "@/lib/i18n-context";

export default function AboutPageClient() {
  const { t } = useI18n();
  const a = t.about;

  return (
    <div className="pt-20 bg-white dark:bg-slate-900">
      {/* Hero */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge variant="blue" className="mb-5">{a.badge}</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-navy-950 dark:text-white tracking-tight mb-6 max-w-3xl mx-auto leading-tight"
          >
            {a.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto"
          >
            {a.heroDesc}
          </motion.p>
        </div>
      </section>

      {/* Mission + Values */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <Badge variant="blue" className="mb-4">{a.missionBadge}</Badge>
              <h2 className="text-2xl font-bold text-navy-950 dark:text-white mb-5 leading-snug">{a.missionTitle}</h2>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{a.missionDesc1}</p>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{a.missionDesc2}</p>
            </div>
            <div className="space-y-4">
              {a.values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5"
                >
                  <div className="font-semibold text-navy-950 dark:text-white mb-1">{v.title}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{v.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-navy-950 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {a.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-slate-300 mb-0.5">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Geography */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={a.geoBadge} title={a.geoTitle} subtitle={a.geoSubtitle} />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {a.regions.map((region, i) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-card dark:shadow-none p-5 text-center"
              >
                <div className="text-3xl mb-2">{region.flag}</div>
                <div className="font-semibold text-navy-950 dark:text-white text-sm mb-1">{region.name}</div>
                <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">{region.students}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA title={a.ctaTitle} subtitle={a.ctaSubtitle} primaryLabel={a.ctaPrimary} secondaryLabel={a.ctaSecondary} secondaryHref="/sat" />
    </div>
  );
}
