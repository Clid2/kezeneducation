"use client";

import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Check, ArrowRight, Zap, Sparkles } from "lucide-react";
import Badge from "@/components/ui/Badge";
import SectionHeader from "@/components/ui/SectionHeader";
import CTA from "@/components/sections/CTA";
import { useI18n } from "@/lib/i18n-context";

type SatPlan = {
  name: string; tagline: string; currency: string; price: string;
  period?: string; duration?: string; schedule?: string;
  badge?: string; highlight: boolean; features: readonly string[];
};
type IeltsPlan = {
  name: string; tagline: string; currency: string; price: string;
  period?: string; duration?: string; highlight: boolean;
  badge?: string; features: readonly string[];
};

/* ── Animated price counter ── */
function AnimatedPrice({ price, currency = "" }: { price: string; currency?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const num = parseInt(price.replace(/\s/g, ""), 10);
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 45, damping: 20 });
  const display = useTransform(spring, (v) =>
    isNaN(num) ? price : currency + Math.round(v).toLocaleString("ru-RU")
  );
  useEffect(() => { if (inView && !isNaN(num)) mv.set(num); }, [inView, mv, num]);
  if (isNaN(num)) return <span ref={ref}>{price}</span>;
  return <motion.span ref={ref}>{display}</motion.span>;
}

/* ── Express card — статичная синяя рамка + pulse glow ── */
function ExpressCard({ plan, badgeLabel }: { plan: SatPlan; badgeLabel: string }) {
  return (
    <div className="relative md:-mt-8 pt-6" style={{ zIndex: 10 }}>
      {/* Badge */}
      <div className="absolute top-0 inset-x-0 flex justify-center" style={{ zIndex: 20 }}>
        <motion.span
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-blue-600/40 tracking-wide"
        >
          <Zap size={10} fill="currentColor" />
          {badgeLabel}
        </motion.span>
      </div>

      {/* Pulsing glow behind card */}
      <motion.div
        className="absolute inset-4 rounded-2xl bg-blue-600/20 blur-2xl pointer-events-none"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Card — solid blue border, no spinning */}
      <div className="relative rounded-2xl border-2 border-blue-500/70 bg-[#07091f] overflow-hidden shadow-2xl shadow-blue-900/40">
        {/* Static top glow line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-blue-500/15 blur-2xl pointer-events-none" />

        <div className="relative p-8">
          <div className="text-xs font-medium text-blue-400 mb-1.5 tracking-wide">{plan.tagline}</div>
          <div className="text-3xl font-bold text-white mb-6 tracking-tight">{plan.name}</div>

          <div className="pb-5 mb-5 border-b border-white/10">
            <div className="text-sm text-slate-500 mb-1">от</div>
            <div className="text-4xl font-black text-white leading-none tracking-tight">
              ₸<AnimatedPrice price={plan.price} />
            </div>
            {plan.period && <div className="text-sm text-slate-400 mt-1">{plan.period}</div>}
            <div className="flex flex-wrap gap-2 mt-3">
              {plan.duration && (
                <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-300 border border-blue-500/25">
                  {plan.duration}
                </span>
              )}
              {plan.schedule && (
                <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/6 text-slate-400 border border-white/10">
                  {plan.schedule}
                </span>
              )}
            </div>
          </div>

          <ul className="space-y-3 mb-7">
            {plan.features.map((feat, i) => (
              <motion.li
                key={feat}
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.04 * i }}
                className="flex items-start gap-3"
              >
                <div className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mt-0.5">
                  <Check size={9} strokeWidth={3} className="text-blue-400" />
                </div>
                <span className="text-sm text-slate-300 leading-snug">{feat}</span>
              </motion.li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors duration-200 group"
          >
            Записаться
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── Standard card ── */
function StandardCard({ plan, delay }: { plan: SatPlan; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.18 } }}
      className="relative flex flex-col rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#0d1220] p-7 shadow-sm hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-250"
    >
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" />

      <div className="text-xs text-slate-400 dark:text-slate-500 mb-1.5 tracking-wide">{plan.tagline}</div>
      <div className="text-2xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight">{plan.name}</div>

      <div className="pb-5 mb-5 border-b border-slate-100 dark:border-white/8">
        <div className="text-sm text-slate-400 mb-0.5">от</div>
        <div className="text-3xl font-black text-slate-900 dark:text-white leading-none tracking-tight">
          ₸<AnimatedPrice price={plan.price} />
        </div>
        {plan.period && <div className="text-sm text-slate-400 mt-1">{plan.period}</div>}
        <div className="flex flex-wrap gap-2 mt-3">
          {plan.duration && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50">
              {plan.duration}
            </span>
          )}
          {plan.schedule && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-white/8">
              {plan.schedule}
            </span>
          )}
        </div>
      </div>

      <ul className="space-y-2.5 mb-7 flex-1">
        {plan.features.map((feat) => (
          <li key={feat} className="flex items-start gap-2.5">
            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-50 dark:bg-blue-900/25 border border-blue-100 dark:border-blue-800/40 flex items-center justify-center mt-0.5">
              <Check size={9} strokeWidth={3} className="text-blue-500 dark:text-blue-400" />
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-300 leading-snug">{feat}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-blue-400 hover:text-blue-600 dark:hover:border-blue-500 dark:hover:text-blue-400 transition-all duration-200 group"
      >
        Записаться
        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </motion.div>
  );
}

/* ── Individual card — orange/amber accent ── */
function IndividualCard({ plan, delay }: { plan: SatPlan; delay: number }) {
  const isOnRequest = plan.price === "По запросу" || plan.price === "On request" || plan.price === "Сұраныс бойынша";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.18 } }}
      className="relative flex flex-col rounded-2xl border border-slate-200 dark:border-amber-900/40 bg-white dark:bg-[#14100a] p-7 shadow-sm hover:shadow-lg hover:border-amber-300 dark:hover:border-amber-700/60 transition-all duration-250"
    >
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      <div className="absolute top-0 inset-x-0 h-16 bg-amber-500/3 pointer-events-none rounded-t-2xl" />

      {/* sparkle */}
      <Sparkles size={15} className="absolute top-5 right-5 text-amber-400/40" />

      <div className="text-xs text-slate-400 dark:text-slate-500 mb-1.5 tracking-wide">{plan.tagline}</div>
      <div className="text-2xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight">{plan.name}</div>

      <div className="pb-5 mb-5 border-b border-slate-100 dark:border-white/8">
        {isOnRequest ? (
          <div className="text-3xl font-black text-amber-500 dark:text-amber-400 leading-none tracking-tight">
            {plan.price}
          </div>
        ) : (
          <>
            <div className="text-sm text-slate-400 mb-0.5">от</div>
            <div className="text-3xl font-black text-slate-900 dark:text-white leading-none tracking-tight">
              ₸<AnimatedPrice price={plan.price} />
            </div>
          </>
        )}
        {plan.period && <div className="text-sm text-slate-400 mt-1">{plan.period}</div>}
        <div className="flex flex-wrap gap-2 mt-3">
          {plan.duration && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-800/40">
              {plan.duration}
            </span>
          )}
        </div>
      </div>

      <ul className="space-y-2.5 mb-7 flex-1">
        {plan.features.map((feat) => (
          <li key={feat} className="flex items-start gap-2.5">
            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-amber-50 dark:bg-amber-900/25 border border-amber-100 dark:border-amber-800/40 flex items-center justify-center mt-0.5">
              <Check size={9} strokeWidth={3} className="text-amber-500 dark:text-amber-400" />
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-300 leading-snug">{feat}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border border-slate-200 dark:border-amber-900/50 text-slate-700 dark:text-slate-200 hover:border-amber-400 hover:text-amber-600 dark:hover:border-amber-600 dark:hover:text-amber-400 transition-all duration-200 group"
      >
        Записаться
        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </motion.div>
  );
}

/* ── IELTS card ── */
function IeltsCard({ plan, delay, bestValueLabel }: {
  plan: IeltsPlan; delay: number; bestValueLabel: string;
}) {
  const isHL = plan.highlight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={!isHL ? { y: -4, transition: { duration: 0.18 } } : {}}
      className={`relative rounded-2xl flex flex-col transition-all duration-250 ${
        isHL
          ? "border-2 border-blue-500/60 bg-[#07091f] shadow-xl shadow-blue-900/30 p-7"
          : "border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-[#0d1220] shadow-sm hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700 p-7"
      }`}
    >
      {/* top line */}
      <div className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent ${isHL ? "via-blue-400" : "via-indigo-300/40"} to-transparent`} />

      {isHL && (
        <motion.div
          className="absolute inset-4 rounded-xl bg-blue-600/10 blur-2xl pointer-events-none"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md shadow-blue-600/30">
            <Zap size={9} fill="currentColor" />
            {plan.badge === "Best Value" ? bestValueLabel : plan.badge}
          </span>
        </div>
      )}

      <div className="relative">
        <div className={`text-xs mb-1.5 tracking-wide ${isHL ? "text-blue-400" : "text-slate-400 dark:text-slate-500"}`}>
          {plan.tagline}
        </div>
        <div className={`text-2xl font-bold mb-5 tracking-tight ${isHL ? "text-white" : "text-slate-900 dark:text-white"}`}>
          {plan.name}
        </div>

        <div className={`pb-5 mb-5 border-b ${isHL ? "border-white/10" : "border-slate-100 dark:border-white/8"}`}>
          <div className={`text-4xl font-black leading-none tracking-tight ${isHL ? "text-white" : "text-slate-900 dark:text-white"}`}>
            {plan.currency}<AnimatedPrice price={plan.price} />
            <span className="text-sm font-normal ml-1 text-slate-400">{plan.period}</span>
          </div>
          {plan.duration && (
            <div className="mt-3">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-lg border ${
                isHL
                  ? "bg-blue-500/15 text-blue-300 border-blue-500/25"
                  : "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-800/40"
              }`}>
                {plan.duration}
              </span>
            </div>
          )}
        </div>

        <ul className="space-y-2.5 mb-7 flex-1">
          {plan.features.map((feat) => (
            <li key={feat} className="flex items-start gap-2.5">
              <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5 border ${
                isHL
                  ? "bg-blue-500/20 border-blue-500/30"
                  : "bg-indigo-50 dark:bg-indigo-900/25 border-indigo-100 dark:border-indigo-800/40"
              }`}>
                <Check size={9} strokeWidth={3} className={isHL ? "text-blue-400" : "text-indigo-500 dark:text-indigo-400"} />
              </div>
              <span className={`text-sm leading-snug ${isHL ? "text-slate-300" : "text-slate-600 dark:text-slate-300"}`}>
                {feat}
              </span>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className={`w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 group ${
            isHL
              ? "bg-blue-600 hover:bg-blue-500 text-white"
              : "border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-400 hover:text-indigo-600 dark:hover:border-indigo-500 dark:hover:text-indigo-400"
          }`}
        >
          Записаться
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════
   MAIN
══════════════════════════════════════════ */
export default function PricingPageClient() {
  const { t } = useI18n();
  const p = t.pricing;
  const expressBadge = (p.satPlans as SatPlan[]).find((pl) => pl.highlight)?.badge ?? p.mostPopular;

  return (
    <div className="pt-20 bg-white dark:bg-slate-900">

      {/* Hero */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-40 bg-blue-500/5 blur-3xl pointer-events-none" />
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
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl">{p.satSubtitle}</p>
          </motion.div>

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
              if (i === 0) return <StandardCard key={plan.name} plan={plan} delay={0} />;
              return <IndividualCard key={plan.name} plan={plan} delay={0.2} />;
            })}
          </div>

          {"satNote" in p && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
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
              <IeltsCard key={plan.name} plan={plan} delay={i * 0.1} bestValueLabel={p.bestValue} />
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
                whileHover={{ y: -3, transition: { duration: 0.18 } }}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 text-center hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md transition-all duration-200"
              >
                <div className="text-3xl mb-3">{method.icon}</div>
                <div className="font-semibold text-slate-900 dark:text-white mb-1">{method.name}</div>
                <div className="text-xs text-slate-400 dark:text-slate-500">{method.desc}</div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-400 dark:text-slate-500">{p.installmentNote}</p>
        </div>
      </section>

      <CTA
        title={p.ctaTitle}
        subtitle={p.ctaSubtitle}
        primaryLabel={p.ctaPrimary}
        secondaryLabel={p.ctaSecondary}
        secondaryHref="/contact"
      />
    </div>
  );
}