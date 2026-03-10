"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Share2, Users, Presentation, Award, Network, Star, Globe } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import CTA from "@/components/sections/CTA";
import { useI18n } from "@/lib/i18n-context";

const roleIcons = [Share2, Users, Presentation];
const benefitIcons = [Award, Star, Network, Globe];

export default function AmbassadorPageClient() {
  const { t } = useI18n();
  const a = t.ambassador;

  return (
    <div className="pt-20 bg-white dark:bg-slate-900">
      {/* Hero — dark */}
      <section className="py-20 md:py-28 bg-navy-950 dark:bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-dots opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-800 bg-blue-900/30 text-blue-300 uppercase tracking-wide mb-6">
              {a.badge}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6"
          >
            {a.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed mb-8"
          >
            {a.heroDesc}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact" className="group">
                {a.ctaPrimary}
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Responsibilities */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={a.roleBadge} title={a.roleTitle} subtitle={a.roleSubtitle} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {a.responsibilities.map((r, i) => {
              const Icon = roleIcons[i];
              return (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-7"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-bold text-navy-950 dark:text-white mb-2">{r.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{r.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={a.benefitsBadge} title={a.benefitsTitle} subtitle={a.benefitsSubtitle} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {a.benefits.map((b, i) => {
              const Icon = benefitIcons[i];
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-card dark:shadow-none p-6 flex gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-navy-950 dark:text-white mb-1">{b.title}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-2">{b.desc}</div>
                    <div className="text-xs font-semibold text-amber-600 dark:text-amber-400">{b.value}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={a.processBadge} title={a.processTitle} subtitle={a.processSubtitle} />
          <div className="max-w-2xl mx-auto">
            {a.steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex gap-5 mb-6 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-navy-950 dark:bg-blue-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {step.step}
                  </div>
                  {i < a.steps.length - 1 && <div className="w-px flex-1 bg-slate-100 dark:bg-slate-700 mt-2" />}
                </div>
                <div className={`${i < a.steps.length - 1 ? "pb-6" : ""}`}>
                  <div className="font-semibold text-navy-950 dark:text-white mb-1">{step.label}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA title={a.ctaTitle} subtitle={a.ctaSubtitle} primaryLabel={a.ctaPrimary} secondaryLabel={a.ctaSecondary} />
    </div>
  );
}
