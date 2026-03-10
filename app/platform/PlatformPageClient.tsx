"use client";

import { motion } from "framer-motion";
import { CheckCircle2, LayoutDashboard, Brain, ClipboardList, Trophy, Coins } from "lucide-react";
import Badge from "@/components/ui/Badge";
import SectionHeader from "@/components/ui/SectionHeader";
import CTA from "@/components/sections/CTA";
import { useI18n } from "@/lib/i18n-context";

const featureIcons = [LayoutDashboard, Brain, ClipboardList, Trophy, Coins];

const colorMap = {
  blue: { bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-600 dark:text-blue-400", border: "border-blue-100 dark:border-blue-800", check: "text-blue-500 dark:text-blue-400" },
  purple: { bg: "bg-purple-50 dark:bg-purple-900/20", text: "text-purple-600 dark:text-purple-400", border: "border-purple-100 dark:border-purple-800", check: "text-purple-500 dark:text-purple-400" },
  amber: { bg: "bg-amber-50 dark:bg-amber-900/20", text: "text-amber-600 dark:text-amber-400", border: "border-amber-100 dark:border-amber-800", check: "text-amber-500 dark:text-amber-400" },
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-900/20", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-100 dark:border-emerald-800", check: "text-emerald-500 dark:text-emerald-400" },
  orange: { bg: "bg-orange-50 dark:bg-orange-900/20", text: "text-orange-600 dark:text-orange-400", border: "border-orange-100 dark:border-orange-800", check: "text-orange-500 dark:text-orange-400" },
};

export default function PlatformPageClient() {
  const { t } = useI18n();
  const p = t.platform;

  return (
    <div className="pt-20 bg-white dark:bg-slate-900">
      {/* Hero — dark */}
      <section className="py-20 md:py-28 bg-navy-950 dark:bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-800 bg-blue-900/30 text-blue-300 uppercase tracking-wide mb-6">
              {p.badge}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6"
          >
            {p.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            {p.heroDesc}
          </motion.p>
        </div>
      </section>

      {/* Feature deep-dives */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 max-w-3xl mx-auto">
            {p.features.map((feature, i) => {
              const colors = colorMap[feature.color as keyof typeof colorMap] || colorMap.blue;
              const Icon = featureIcons[i];
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: isEven ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`bg-white dark:bg-slate-800 rounded-2xl border ${colors.border} shadow-card dark:shadow-none p-8`}
                >
                  <div className="flex items-start gap-5">
                    <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={22} className={colors.text} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${colors.text}`}>
                        {feature.tagline}
                      </div>
                      <h3 className="text-xl font-bold text-navy-950 dark:text-white mb-3">{feature.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5">{feature.description}</p>
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
            })}
          </div>
        </div>
      </section>

      {/* All in one */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={p.allInOneBadge} title={p.allInOneTitle} subtitle={p.allInOneSubtitle} />
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
                  className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-card dark:shadow-none p-4 text-center"
                >
                  <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center mx-auto mb-3`}>
                    <Icon size={18} className={colors.text} />
                  </div>
                  <div className="text-xs font-semibold text-navy-950 dark:text-white leading-tight">{feat.title}</div>
                </motion.div>
              );
            })}
          </div>
          <div className="text-center mt-6">
            <span className="inline-flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500">
              <CheckCircle2 size={14} className="text-emerald-500" />
              {p.available}
            </span>
          </div>
        </div>
      </section>

      <CTA title={p.ctaTitle} subtitle={p.ctaSubtitle} primaryLabel={p.ctaPrimary} secondaryLabel={p.ctaSecondary} secondaryHref="/pricing" />
    </div>
  );
}
