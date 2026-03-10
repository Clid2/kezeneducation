"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Star } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import CTA from "@/components/sections/CTA";
import { useI18n } from "@/lib/i18n-context";

export default function PricingPageClient() {
  const { t } = useI18n();
  const p = t.pricing;

  return (
    <div className="pt-20 bg-white dark:bg-slate-900">
      {/* Hero */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge variant="blue" className="mb-5">{p.badge}</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-navy-950 dark:text-white tracking-tight mb-4"
          >
            {p.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto"
          >
            {p.subtitle}
          </motion.p>
        </div>
      </section>

      {/* SAT Plans */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={p.satBadge} title={p.satTitle} subtitle={p.satSubtitle} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {p.satPlans.map((plan, i) => (
              <PricingCard key={plan.name} plan={plan} delay={i * 0.1} mostPopular={p.mostPopular} bestValue={p.bestValue} enrollLabel={t.common.enrollNow} />
            ))}
          </div>
        </div>
      </section>

      {/* IELTS Plans */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={p.ieltsBadge} title={p.ieltsTitle} subtitle={p.ieltsSubtitle} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {p.ieltsPlans.map((plan, i) => (
              <PricingCard key={plan.name} plan={plan} delay={i * 0.1} mostPopular={p.mostPopular} bestValue={p.bestValue} enrollLabel={t.common.enrollNow} />
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={p.paymentBadge} title={p.paymentTitle} subtitle={p.paymentSubtitle} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto mb-8">
            {p.paymentMethods.map((method, i) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 text-center"
              >
                <div className="text-3xl mb-3">{method.icon}</div>
                <div className="font-semibold text-navy-950 dark:text-white mb-1">{method.name}</div>
                <div className="text-xs text-slate-400 dark:text-slate-500">{method.desc}</div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-400 dark:text-slate-500">{p.installmentNote}</p>
        </div>
      </section>

      <CTA title={p.ctaTitle} subtitle={p.ctaSubtitle} primaryLabel={p.ctaPrimary} secondaryLabel={p.ctaSecondary} secondaryHref="/contact" />
    </div>
  );
}

interface Plan {
  name: string;
  tagline: string;
  price: string;
  currency: string;
  period: string;
  duration: string;
  highlight: boolean;
  badge?: string;
  features: readonly string[];
}

function PricingCard({ plan, delay, mostPopular, bestValue, enrollLabel }: {
  plan: Plan; delay: number; mostPopular: string; bestValue: string; enrollLabel: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`relative rounded-2xl p-7 border flex flex-col ${
        plan.highlight
          ? "bg-navy-950 dark:bg-slate-950 border-transparent text-white"
          : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 shadow-card dark:shadow-none"
      }`}
    >
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-blue">
            <Star size={11} fill="currentColor" />
            {plan.badge === "Most Popular" ? mostPopular : bestValue}
          </span>
        </div>
      )}

      <div className="mb-5">
        <div className={`text-lg font-bold mb-0.5 ${plan.highlight ? "text-white" : "text-navy-950 dark:text-white"}`}>
          {plan.name}
        </div>
        <div className={`text-sm ${plan.highlight ? "text-slate-400" : "text-slate-500 dark:text-slate-400"}`}>
          {plan.tagline}
        </div>
      </div>

      <div className="mb-5">
        <div className="flex items-end gap-1">
          <span className={`text-4xl font-black ${plan.highlight ? "text-white" : "text-navy-950 dark:text-white"}`}>
            {plan.currency}{plan.price}
          </span>
          <span className={`text-sm mb-1.5 ${plan.highlight ? "text-slate-400" : "text-slate-400"}`}>
            {plan.period}
          </span>
        </div>
        <div className={`text-xs mt-1 ${plan.highlight ? "text-blue-300" : "text-slate-400 dark:text-slate-500"}`}>
          {plan.duration}
        </div>
      </div>

      <ul className="space-y-2.5 mb-7 flex-1">
        {plan.features.map((feat) => (
          <li key={feat} className="flex items-start gap-2.5 text-sm">
            <CheckCircle2 size={14} className={`flex-shrink-0 mt-0.5 ${plan.highlight ? "text-blue-400" : "text-blue-500 dark:text-blue-400"}`} />
            <span className={plan.highlight ? "text-slate-300" : "text-slate-600 dark:text-slate-300"}>{feat}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={plan.highlight ? "primary" : "outline"}
        size="md"
        className="w-full"
        asChild
      >
        <Link href="/contact" className="group">
          {enrollLabel}
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </Button>
    </motion.div>
  );
}
