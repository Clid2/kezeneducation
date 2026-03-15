"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, LayoutDashboard, Brain, ClipboardList, Trophy, Coins } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { useI18n } from "@/lib/i18n-context";

const featureIcons = [LayoutDashboard, Brain, ClipboardList, Trophy, Coins];

const colorMap = {
  blue:    { bg: "bg-blue-50 dark:bg-blue-500/10",     text: "text-blue-600 dark:text-blue-400",    border: "border-blue-200 dark:border-blue-500/30",    check: "text-blue-500 dark:text-blue-400",    glow: "bg-blue-500/8 dark:bg-blue-500/12",    topline: "via-blue-400/50 dark:via-blue-400/30" },
  purple:  { bg: "bg-purple-50 dark:bg-purple-500/10",  text: "text-purple-600 dark:text-purple-400", border: "border-purple-200 dark:border-purple-500/30", check: "text-purple-500 dark:text-purple-400", glow: "bg-purple-500/8 dark:bg-purple-500/12", topline: "via-purple-400/50 dark:via-purple-400/30" },
  amber:   { bg: "bg-amber-50 dark:bg-amber-500/10",    text: "text-amber-600 dark:text-amber-400",   border: "border-amber-200 dark:border-amber-500/30",   check: "text-amber-500 dark:text-amber-400",   glow: "bg-amber-500/8 dark:bg-amber-500/12",   topline: "via-amber-400/50 dark:via-amber-400/30" },
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-500/10",text: "text-emerald-600 dark:text-emerald-400",border: "border-emerald-200 dark:border-emerald-500/30",check: "text-emerald-500 dark:text-emerald-400",glow: "bg-emerald-500/8 dark:bg-emerald-500/12",topline: "via-emerald-400/50 dark:via-emerald-400/30" },
  orange:  { bg: "bg-orange-50 dark:bg-orange-500/10",  text: "text-orange-600 dark:text-orange-400", border: "border-orange-200 dark:border-orange-500/30", check: "text-orange-500 dark:text-orange-400", glow: "bg-orange-500/8 dark:bg-orange-500/12", topline: "via-orange-400/50 dark:via-orange-400/30" },
} as const;

function FeatureCard({ feature, i }: { feature: { title: string; tagline: string; description: string; items: string[]; color: string }; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const colors = colorMap[feature.color as keyof typeof colorMap] || colorMap.blue;
  const Icon = featureIcons[i];
  const isEven = i % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -24 : 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`relative bg-white dark:bg-[#0d1424] rounded-2xl border ${colors.border} shadow-sm p-8 overflow-hidden`}
    >
      {/* top accent line */}
      <div className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent ${colors.topline} to-transparent`} />
      {/* subtle bg glow */}
      <div className={`absolute top-0 inset-x-0 h-24 ${colors.glow} blur-2xl pointer-events-none rounded-t-2xl`} />

      <div className="relative flex items-start gap-5">
        <div className={`w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center flex-shrink-0`}>
          <Icon size={22} className={colors.text} />
        </div>
        <div className="flex-1 min-w-0">
          <div className={`text-xs font-bold uppercase tracking-widest mb-1.5 ${colors.text}`}>{feature.tagline}</div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">{feature.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {feature.items.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <CheckCircle2 size={13} className={colors.check} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PlatformPageClient() {
  const { t } = useI18n();
  const p = t.platform;

  return (
    <div className="pt-20 bg-white dark:bg-[#06091a]">

      {/* ── HERO ── */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-[#06091a]">
        {/* glows */}
        <div className="absolute -top-40 right-0 w-[600px] h-[400px] rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-[300px] h-[300px] rounded-full bg-violet-500/8 blur-3xl pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 w-[200px] h-[200px] rounded-full bg-cyan-500/8 blur-2xl pointer-events-none" />
        {/* grid */}
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        {/* dots */}
        <div className="absolute top-24 right-[20%] w-3 h-3 rounded-full bg-blue-400/30 pointer-events-none" />
        <div className="absolute top-40 left-[15%] w-2 h-2 rounded-full bg-indigo-400/25 pointer-events-none" />
        <div className="absolute bottom-28 right-[15%] w-4 h-4 rounded-full bg-violet-400/20 pointer-events-none" />
        <div className="absolute bottom-20 left-[28%] w-2 h-2 rounded-full bg-blue-400/25 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge variant="blue" className="mb-6">{p.badge}</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-[1.08]"
          >
            {p.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            {p.heroDesc}
          </motion.p>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {p.features.map((feat, i) => {
              const colors = colorMap[feat.color as keyof typeof colorMap] || colorMap.blue;
              const Icon = featureIcons[i];
              return (
                <span key={feat.title} className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border ${colors.bg} ${colors.border} ${colors.text}`}>
                  <Icon size={12} />
                  {feat.title}
                </span>
              );
            })}
          </motion.div>
        </div>
        <div className="h-12 bg-gradient-to-b from-transparent to-white dark:to-[#06091a] pointer-events-none mt-10" />
      </section>

      {/* ── FEATURE DEEP-DIVES ── */}
      <section className="relative py-20 bg-white dark:bg-[#06091a] overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[350px] bg-blue-400/4 dark:bg-blue-500/8 blur-3xl pointer-events-none" />
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
              Возможности
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">Каждый инструмент продуман</h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-xl">Не адаптированная LMS, а платформа, созданная специально для роста баллов.</p>
          </motion.div>
          <div className="space-y-6 max-w-3xl mx-auto">
            {p.features.map((feature, i) => (
              <FeatureCard key={feature.title} feature={feature} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ALL IN ONE ── */}
      <section className="relative py-20 bg-slate-50 dark:bg-[#06091a] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-blue-400/4 dark:bg-blue-500/8 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-slate-100 dark:border-white/8 mb-16" />
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">
              <span className="w-4 h-px bg-blue-600 dark:bg-blue-400" />
              {p.allInOneBadge}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">{p.allInOneTitle}</h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg">{p.allInOneSubtitle}</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-3xl mx-auto">
            {p.features.map((feat, i) => {
              const colors = colorMap[feat.color as keyof typeof colorMap] || colorMap.blue;
              const Icon = featureIcons[i];
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  whileHover={{ y: -3, transition: { duration: 0.18 } }}
                  className={`bg-white dark:bg-[#0d1424] rounded-xl border ${colors.border} p-4 text-center hover:shadow-md transition-all duration-200`}
                >
                  <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center mx-auto mb-3`}>
                    <Icon size={18} className={colors.text} />
                  </div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">{feat.title}</div>
                </motion.div>
              );
            })}
          </div>
          <div className="text-center mt-6">
            <span className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <CheckCircle2 size={14} className="text-emerald-500" />
              {p.available}
            </span>
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
            <div className="text-3xl md:text-4xl font-bold mb-4">{p.ctaTitle}</div>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">{p.ctaSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors duration-200 group">
                {p.ctaPrimary}
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/pricing"
                className="inline-flex items-center justify-center gap-2 bg-white/15 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/25 transition-colors duration-200 border border-white/20">
                {p.ctaSecondary}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}