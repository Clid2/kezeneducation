"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ArrowRight, Zap } from "lucide-react";
import Badge from "@/components/ui/Badge";
import SectionHeader from "@/components/ui/SectionHeader";
import CTA from "@/components/sections/CTA";
import { useI18n } from "@/lib/i18n-context";

type SatPlan = {
  name: string;
  tagline: string;
  currency: string;
  price: string;
  period?: string;
  duration?: string;
  schedule?: string;
  badge?: string;
  highlight: boolean;
  features: readonly string[];
};

type IeltsPlan = {
  name: string;
  tagline: string;
  currency: string;
  price: string;
  period?: string;
  duration?: string;
  highlight: boolean;
  badge?: string;
  features: readonly string[];
};

// ── Express card — animated border, badge above overflow ─────────────────────
function ExpressCard({ plan, badgeLabel }: { plan: SatPlan; badgeLabel: string }) {
  const showSchedule =
    plan.price !== "По запросу" &&
    plan.price !== "On request" &&
    plan.price !== "Сұраныс бойынша";

  return (
    // Outer wrapper — overflow VISIBLE so badge shows above card
    <div className="relative md:-mt-6 pt-5" style={{ zIndex: 10 }}>

      {/* Floating badge — sits ABOVE the card, outside overflow */}
      <div className="absolute top-0 left-0 right-0 flex justify-center" style={{ zIndex: 20 }}>
        <motion.span
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-blue-600/50 tracking-wide"
        >
          <Zap size={10} fill="currentColor" />
          {badgeLabel}
        </motion.span>
      </div>

      {/* Animated gradient border wrapper */}
      <div className="relative rounded-2xl p-[2px]" style={{ overflow: "hidden" }}>
        {/* Spinning gradient border */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "conic-gradient(from 0deg at 50% 50%, #2563eb, #7c3aed, #0891b2, #059669, #2563eb)",
            borderRadius: "inherit",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Card body — no overflow hidden so badge can show, but border is clipped by wrapper */}
        <div className="relative bg-navy-950 dark:bg-[#07091a] rounded-[14px] p-9 flex flex-col">

          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-blue-600/15 blur-3xl pointer-events-none" />

          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-[14px] overflow-hidden"
            style={{ zIndex: 1 }}
          >
            <motion.div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(110deg, transparent 30%, rgba(99,179,237,0.08) 50%, transparent 70%)",
              }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
            />
          </motion.div>

          {/* Content */}
          <div className="relative" style={{ zIndex: 2 }}>
            <div className="text-xs font-medium text-blue-400 mb-1.5">{plan.tagline}</div>
            <div className="text-2xl font-bold text-white mb-6">{plan.name}</div>

            <div className="pb-6 mb-6 border-b border-white/10">
              <div className="text-3xl font-bold text-white mb-1">
                {plan.currency}{plan.price}
              </div>
              {plan.period && <div className="text-sm text-slate-400">{plan.period}</div>}
              <div className="flex flex-wrap gap-2 mt-4">
                {plan.duration && (
                  <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/10 text-slate-300">
                    {plan.duration}
                  </span>
                )}
                {plan.schedule && showSchedule && (
                  <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/10 text-slate-300">
                    {plan.schedule}
                  </span>
                )}
              </div>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feat) => (
                <li key={feat} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-500/25 flex items-center justify-center mt-0.5">
                    <Check size={10} strokeWidth={3} className="text-blue-400" />
                  </div>
                  <span className="text-sm text-slate-300 leading-snug">{feat}</span>
                </li>
              ))}
            </ul>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="relative w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white overflow-hidden group transition-colors"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 2.5 }}
                />
                <span className="relative">Записаться</span>
                <ArrowRight size={14} className="relative group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Colorful supporting cards ─────────────────────────────────────────────────
const cardAccents = [
  {
    // Standard — blue tint
    bg: "bg-white dark:bg-[#0d1424]",
    ring: "ring-blue-200 dark:ring-blue-900/60",
    ringHover: "hover:ring-blue-400 dark:hover:ring-blue-600",
    topLine: "from-transparent via-blue-400/50 to-transparent",
    pill: "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    check: "bg-blue-50 dark:bg-blue-900/30",
    checkIcon: "text-blue-600 dark:text-blue-400",
    price: "text-navy-950 dark:text-white",
    glow: "bg-blue-600/5 dark:bg-blue-600/10",
  },
  {
    // Individual — emerald tint
    bg: "bg-white dark:bg-[#0a1510]",
    ring: "ring-emerald-200 dark:ring-emerald-900/60",
    ringHover: "hover:ring-emerald-400 dark:hover:ring-emerald-600",
    topLine: "from-transparent via-emerald-400/50 to-transparent",
    pill: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
    check: "bg-emerald-50 dark:bg-emerald-900/30",
    checkIcon: "text-emerald-600 dark:text-emerald-400",
    price: "text-navy-950 dark:text-white",
    glow: "bg-emerald-600/5 dark:bg-emerald-600/10",
  },
];

function SupportingCard({ plan, delay, accentIdx }: { plan: SatPlan; delay: number; accentIdx: number }) {
  const a = cardAccents[accentIdx] ?? cardAccents[0];
  const showSchedule =
    plan.price !== "По запросу" &&
    plan.price !== "On request" &&
    plan.price !== "Сұраныс бойынша";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`relative flex flex-col rounded-2xl p-8 ring-1 shadow-card hover:shadow-xl transition-all duration-300 ${a.bg} ${a.ring} ${a.ringHover}`}
    >
      {/* Top glow */}
      <div className={`absolute top-0 left-0 right-0 h-20 blur-2xl pointer-events-none rounded-t-2xl ${a.glow}`} />
      {/* Top accent line */}
      <div className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r ${a.topLine}`} />

      <div className="relative">
        <div className="text-xs font-medium text-slate-400 dark:text-slate-500 mb-1.5">{plan.tagline}</div>
        <div className="text-xl font-bold text-navy-950 dark:text-white mb-6">{plan.name}</div>

        <div className="pb-6 mb-6 border-b border-slate-100 dark:border-white/10">
          <div className={`text-3xl font-bold mb-1 ${a.price}`}>
            {plan.currency}{plan.price}
          </div>
          {plan.period && <div className="text-sm text-slate-400">{plan.period}</div>}
          <div className="flex flex-wrap gap-2 mt-4">
            {plan.duration && (
              <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${a.pill}`}>
                {plan.duration}
              </span>
            )}
            {plan.schedule && showSchedule && (
              <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${a.pill}`}>
                {plan.schedule}
              </span>
            )}
          </div>
        </div>

        <ul className="space-y-3 mb-8 flex-1">
          {plan.features.map((feat) => (
            <li key={feat} className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5 ${a.check}`}>
                <Check size={10} strokeWidth={3} className={a.checkIcon} />
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-300 leading-snug">{feat}</span>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border-2 text-navy-950 dark:text-white transition-all duration-200 group
            ${accentIdx === 0
              ? "border-blue-200 dark:border-blue-900 hover:border-blue-500 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400"
              : "border-emerald-200 dark:border-emerald-900 hover:border-emerald-500 hover:text-emerald-600 dark:hover:border-emerald-500 dark:hover:text-emerald-400"
            }`}
        >
          Записаться
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

// ── IELTS card ────────────────────────────────────────────────────────────────
const ieltsAccents = [
  {
    bg: "bg-white dark:bg-[#0a0f1a]",
    ring: "ring-indigo-200 dark:ring-indigo-900/60",
    ringHover: "hover:ring-indigo-400 dark:hover:ring-indigo-600",
    topLine: "from-transparent via-indigo-400/50 to-transparent",
    pill: "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300",
    check: "bg-indigo-50 dark:bg-indigo-900/30",
    checkIcon: "text-indigo-600 dark:text-indigo-400",
    glow: "bg-indigo-600/5 dark:bg-indigo-600/10",
  },
  {
    // highlighted — dark
    bg: "bg-navy-950 dark:bg-[#07091a]",
    ring: "ring-blue-500/40",
    ringHover: "",
    topLine: "from-transparent via-blue-400/60 to-transparent",
    pill: "bg-white/10 text-slate-300",
    check: "bg-blue-500/25",
    checkIcon: "text-blue-400",
    glow: "bg-blue-600/10",
  },
];

function IeltsCard({ plan, delay, idx, bestValueLabel }: {
  plan: IeltsPlan;
  delay: number;
  idx: number;
  bestValueLabel: string;
}) {
  const a = plan.highlight ? ieltsAccents[1] : ieltsAccents[0];
  const isHL = plan.highlight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative rounded-2xl p-7 flex flex-col ring-1 transition-all duration-300 hover:shadow-xl ${a.bg} ${a.ring} ${a.ringHover} ${isHL ? "shadow-xl shadow-blue-500/10" : "shadow-card"}`}
    >
      <div className={`absolute top-0 left-0 right-0 h-20 blur-2xl pointer-events-none rounded-t-2xl ${a.glow}`} />
      <div className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r ${a.topLine}`} />

      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-blue-600/30">
            <Zap size={10} fill="currentColor" />
            {plan.badge === "Best Value" ? bestValueLabel : plan.badge}
          </span>
        </div>
      )}

      <div className="relative mb-4">
        <div className={`text-lg font-bold mb-0.5 ${isHL ? "text-white" : "text-navy-950 dark:text-white"}`}>
          {plan.name}
        </div>
        <div className={`text-sm ${isHL ? "text-slate-400" : "text-slate-500 dark:text-slate-400"}`}>
          {plan.tagline}
        </div>
      </div>

      <div className="relative mb-5">
        <div className={`text-4xl font-black ${isHL ? "text-white" : "text-navy-950 dark:text-white"}`}>
          {plan.currency}{plan.price}
          <span className={`text-sm font-normal ml-1 ${isHL ? "text-slate-400" : "text-slate-400"}`}>
            {plan.period}
          </span>
        </div>
        <div className={`text-xs mt-1 ${isHL ? "text-blue-300" : "text-slate-400 dark:text-slate-500"}`}>
          {plan.duration}
        </div>
      </div>

      <ul className="relative space-y-2.5 mb-7 flex-1">
        {plan.features.map((feat) => (
          <li key={feat} className="flex items-start gap-2.5 text-sm">
            <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5 ${a.check}`}>
              <Check size={10} strokeWidth={3} className={a.checkIcon} />
            </div>
            <span className={isHL ? "text-slate-300" : "text-slate-600 dark:text-slate-300"}>{feat}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className={`relative w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${
          isHL
            ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25"
            : "border-2 border-indigo-200 dark:border-indigo-900 text-navy-950 dark:text-white hover:border-indigo-500 hover:text-indigo-600 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
        }`}
      >
        Записаться
        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function PricingPageClient() {
  const { t } = useI18n();
  const p = t.pricing;

  // Find express plan badge label
  const expressBadge = (p.satPlans as SatPlan[]).find((pl) => pl.highlight)?.badge ?? p.mostPopular;

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
      <section className="py-28 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">
              <span className="w-4 h-px bg-blue-600 dark:bg-blue-400" />
              {p.satBadge}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-950 dark:text-white tracking-tight mb-3">
              {p.satTitle}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl">
              {p.satSubtitle}
            </p>
          </motion.div>

          {/* Cards — overflow visible to show badge above Express */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center" style={{ overflow: "visible" }}>
            {(p.satPlans as SatPlan[]).map((plan, i) => {
              if (plan.highlight) {
                return (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <ExpressCard plan={plan} badgeLabel={expressBadge} />
                  </motion.div>
                );
              }
              // Standard = index 0, Individual = index 2 → accentIdx 0 or 1
              const accentIdx = i === 0 ? 0 : 1;
              return (
                <SupportingCard key={plan.name} plan={plan} delay={i === 0 ? 0 : 0.2} accentIdx={accentIdx} />
              );
            })}
          </div>

          {"satNote" in p && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center text-sm text-slate-400 dark:text-slate-500 mt-12 max-w-2xl mx-auto leading-relaxed"
            >
              {(p as { satNote: string }).satNote}
            </motion.p>
          )}
        </div>
      </section>

      {/* IELTS Plans */}
      <section className="py-24 bg-white dark:bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader badge={p.ieltsBadge} title={p.ieltsTitle} subtitle={p.ieltsSubtitle} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {(p.ieltsPlans as IeltsPlan[]).map((plan, i) => (
              <IeltsCard
                key={plan.name}
                plan={plan}
                delay={i * 0.1}
                idx={i}
                bestValueLabel={p.bestValue}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
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
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 text-center hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all duration-200"
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