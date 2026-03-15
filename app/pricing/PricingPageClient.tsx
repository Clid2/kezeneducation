"use client";

import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { Check, ArrowRight, Zap, Sparkles } from "lucide-react";
import Badge from "@/components/ui/Badge";
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
function AnimatedPrice({ price }: { price: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const num = parseInt(price.replace(/\s/g, ""), 10);
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 45, damping: 20 });
  const display = useTransform(spring, (v) =>
    isNaN(num) ? price : Math.round(v).toLocaleString("ru-RU")
  );
  useEffect(() => { if (inView && !isNaN(num)) mv.set(num); }, [inView, mv, num]);
  if (isNaN(num)) return <span ref={ref}>{price}</span>;
  return <motion.span ref={ref}>{display}</motion.span>;
}

/* ── Section label ── */
function SectionLabel({ text, color = "blue" }: { text: string; color?: "blue" | "indigo" }) {
  const cls = color === "indigo"
    ? "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border-indigo-100 dark:border-indigo-500/20"
    : "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20";
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-widest mb-4 ${cls}`}>
      {text}
    </span>
  );
}

/* ── Divider between sections ── */
function Divider() {
  return <div className="border-t border-slate-100 dark:border-white/8 mb-16" />;
}

/* ── Express card — highlighted center card ── */
function ExpressCard({ plan, badgeLabel }: { plan: SatPlan; badgeLabel: string }) {
  return (
    <div className="relative md:-mt-8 pt-6" style={{ zIndex: 10 }}>
      {/* floating badge */}
      <div className="absolute top-0 inset-x-0 flex justify-center" style={{ zIndex: 20 }}>
        <motion.span
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-blue-600/30 tracking-wide"
        >
          <Zap size={10} fill="currentColor" />
          {badgeLabel}
        </motion.span>
      </div>

      {/* pulse glow — only visible in dark */}
      <motion.div
        className="absolute inset-4 rounded-2xl bg-blue-600/15 blur-2xl pointer-events-none hidden dark:block"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* card */}
      <div className="relative rounded-2xl border-2 border-blue-500 bg-slate-900 dark:bg-[#07091f] overflow-hidden shadow-2xl shadow-blue-500/20">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-blue-500/10 blur-2xl pointer-events-none" />

        <div className="relative p-8">
          <div className="text-xs font-medium text-blue-400 mb-1.5 tracking-wide">{plan.tagline}</div>
          <div className="text-3xl font-bold text-white mb-6 tracking-tight">{plan.name}</div>

          <div className="pb-5 mb-5 border-b border-white/10">
            <div className="text-sm font-semibold text-slate-300 mb-1 tracking-wide uppercase">от</div>
            <div className="text-4xl font-black text-white leading-none tracking-tight">
              ₸<AnimatedPrice price={plan.price} />
            </div>
            {plan.period && <div className="text-sm text-slate-400 mt-1">{plan.period}</div>}
            <div className="flex flex-wrap gap-2 mt-3">
              {plan.duration && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/40 text-blue-100 border border-blue-400/60">
                  {plan.duration}
                </span>
              )}
              {plan.schedule && (
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/20 text-white border border-white/35">
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

/* ── Standard card (blue accent) ── */
function StandardCard({ plan, delay }: { plan: SatPlan; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.18 } }}
      className="relative flex flex-col rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0d1220] p-7 hover:border-blue-300 dark:hover:border-blue-500/40 hover:shadow-lg dark:hover:bg-[#0f1628] transition-all duration-200"
    >
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-400/40 dark:via-blue-400/25 to-transparent" />

      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1.5 tracking-wide">{plan.tagline}</div>
      <div className="text-2xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight">{plan.name}</div>

      <div className="pb-5 mb-5 border-b border-slate-100 dark:border-white/8">
        <div className="text-sm font-semibold text-slate-500 dark:text-slate-300 mb-0.5 tracking-wide uppercase">от</div>
        <div className="text-3xl font-black text-slate-900 dark:text-white leading-none tracking-tight">
          ₸<AnimatedPrice price={plan.price} />
        </div>
        {plan.period && <div className="text-sm text-slate-400 mt-1">{plan.period}</div>}
        <div className="flex flex-wrap gap-2 mt-3">
          {plan.duration && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-500/30 text-blue-700 dark:text-blue-200 border border-blue-300 dark:border-blue-400/50">
              {plan.duration}
            </span>
          )}
          {plan.schedule && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-600/60 text-slate-600 dark:text-slate-200 border border-slate-300 dark:border-slate-500">
              {plan.schedule}
            </span>
          )}
        </div>
      </div>

      <ul className="space-y-2.5 mb-7 flex-1">
        {plan.features.map((feat) => (
          <li key={feat} className="flex items-start gap-2.5">
            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-50 dark:bg-blue-500/15 border border-blue-100 dark:border-blue-500/25 flex items-center justify-center mt-0.5">
              <Check size={9} strokeWidth={3} className="text-blue-500 dark:text-blue-400" />
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-300 leading-snug">{feat}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border border-slate-200 dark:border-white/12 text-slate-700 dark:text-slate-200 hover:border-blue-400 hover:text-blue-600 dark:hover:border-blue-500/50 dark:hover:text-blue-400 transition-all duration-200 group"
      >
        Записаться
        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </motion.div>
  );
}

/* ── Individual card (amber accent) ── */
function IndividualCard({ plan, delay }: { plan: SatPlan; delay: number }) {
  const isOnRequest = plan.price === "По запросу" || plan.price === "On request" || plan.price === "Сұраныс бойынша";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.18 } }}
      className="relative flex flex-col rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#14100a] p-7 hover:border-amber-300 dark:hover:border-amber-500/40 hover:shadow-lg dark:hover:bg-[#1a1208] transition-all duration-200"
    >
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-400/50 dark:via-amber-400/25 to-transparent" />
      <Sparkles size={14} className="absolute top-5 right-5 text-amber-400/30 dark:text-amber-400/25" />

      <div className="text-xs text-slate-500 dark:text-slate-400 mb-1.5 tracking-wide">{plan.tagline}</div>
      <div className="text-2xl font-bold text-slate-900 dark:text-white mb-5 tracking-tight">{plan.name}</div>

      <div className="pb-5 mb-5 border-b border-slate-100 dark:border-white/8">
        {isOnRequest ? (
          <div className="text-3xl font-black text-amber-500 dark:text-amber-400 leading-none tracking-tight">
            {plan.price}
          </div>
        ) : (
          <>
            <div className="text-sm font-semibold text-slate-500 dark:text-slate-300 mb-0.5 tracking-wide uppercase">от</div>
            <div className="text-3xl font-black text-slate-900 dark:text-white leading-none tracking-tight">
              ₸<AnimatedPrice price={plan.price} />
            </div>
          </>
        )}
        {plan.period && <div className="text-sm text-slate-400 mt-1">{plan.period}</div>}
        <div className="flex flex-wrap gap-2 mt-3">
          {plan.duration && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-500/30 text-amber-700 dark:text-amber-200 border border-amber-300 dark:border-amber-400/50">
              {plan.duration}
            </span>
          )}
        </div>
      </div>

      <ul className="space-y-2.5 mb-7 flex-1">
        {plan.features.map((feat) => (
          <li key={feat} className="flex items-start gap-2.5">
            <div className="flex-shrink-0 w-4 h-4 rounded-full bg-amber-50 dark:bg-amber-500/15 border border-amber-100 dark:border-amber-500/25 flex items-center justify-center mt-0.5">
              <Check size={9} strokeWidth={3} className="text-amber-500 dark:text-amber-400" />
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-300 leading-snug">{feat}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border border-slate-200 dark:border-white/12 text-slate-700 dark:text-slate-200 hover:border-amber-400 hover:text-amber-600 dark:hover:border-amber-500/50 dark:hover:text-amber-400 transition-all duration-200 group"
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
      className={`relative rounded-2xl flex flex-col transition-all duration-200 p-7 ${
        isHL
          ? "border-2 border-blue-500 bg-slate-900 dark:bg-[#07091f] shadow-xl shadow-blue-500/15"
          : "border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0d1220] hover:border-indigo-300 dark:hover:border-indigo-500/40 hover:shadow-lg"
      }`}
    >
      <div className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent to-transparent ${
        isHL ? "via-blue-400" : "via-indigo-400/40 dark:via-indigo-400/25"
      }`} />

      {isHL && (
        <motion.div
          className="absolute inset-4 rounded-xl bg-blue-600/8 blur-2xl pointer-events-none"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md shadow-blue-600/25">
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
                  : "bg-indigo-100 dark:bg-indigo-500/30 text-indigo-700 dark:text-indigo-200 border-indigo-200 dark:border-indigo-400/50"
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
                  : "bg-indigo-50 dark:bg-indigo-500/15 border-indigo-100 dark:border-indigo-500/25"
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
              : "border border-slate-200 dark:border-white/12 text-slate-700 dark:text-slate-200 hover:border-indigo-400 hover:text-indigo-600 dark:hover:border-indigo-500/50 dark:hover:text-indigo-400"
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
    <div className="pt-20 bg-white dark:bg-[#06091a]">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-16 pb-0 bg-slate-50 dark:bg-[#06091a]">
        <div className="absolute inset-0 bg-grid opacity-30 dark:opacity-20 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] bg-blue-500/6 dark:bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[180px] bg-indigo-500/5 dark:bg-indigo-600/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[180px] bg-blue-500/5 dark:bg-blue-600/8 blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-14">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Badge variant="blue" className="mb-6">{p.badge}</Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-5 leading-[1.08]"
          >
            {p.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-8 leading-relaxed"
          >
            {p.subtitle}
          </motion.p>

          {/* Trust pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-8"
          >
            {["Без скрытых платежей", "Платформа включена", "Kaspi рассрочка"].map((text) => (
              <span
                key={text}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-700/80 border border-slate-200 dark:border-slate-500 rounded-full px-4 py-2 shadow-sm"
              >
                <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-400/30 flex items-center justify-center flex-shrink-0">
                  <Check size={10} strokeWidth={3} className="text-blue-600 dark:text-blue-300" />
                </span>
                {text}
              </span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.32 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-xl transition-colors duration-200 shadow-lg shadow-blue-500/20 group"
            >
              Записаться на диагностику — бесплатно
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* fade into next section */}
        <div className="h-10 bg-gradient-to-b from-transparent to-white dark:to-[#06091a] pointer-events-none" />
      </section>

      {/* ── SAT PLANS ── */}
      <section className="pt-10 pb-24 bg-white dark:bg-[#06091a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <SectionLabel text={p.satBadge} color="blue" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
              {p.satTitle}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base max-w-xl">{p.satSubtitle}</p>
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

      {/* ── IELTS PLANS ── */}
      <section className="py-6 bg-white dark:bg-[#06091a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Divider />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <SectionLabel text={p.ieltsBadge} color="indigo" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
              {p.ieltsTitle}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base max-w-xl">{p.ieltsSubtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto pb-16">
            {(p.ieltsPlans as IeltsPlan[]).map((plan, i) => (
              <IeltsCard key={plan.name} plan={plan} delay={i * 0.1} bestValueLabel={p.bestValue} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PAYMENT METHODS ── */}
      <section className="py-6 bg-white dark:bg-[#06091a]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Divider />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <SectionLabel text={p.paymentBadge} color="blue" />
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">{p.paymentTitle}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-base">{p.paymentSubtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-6 pb-16">
            {p.paymentMethods.map((method, i) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -3, transition: { duration: 0.18 } }}
                className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 text-center hover:border-blue-300 dark:hover:border-blue-500/40 hover:shadow-md dark:hover:bg-white/8 transition-all duration-200"
              >
                <div className="text-3xl mb-3">{method.icon}</div>
                <div className="font-semibold text-slate-900 dark:text-white mb-1">{method.name}</div>
                <div className="text-xs text-slate-400 dark:text-slate-500">{method.desc}</div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-400 dark:text-slate-600 pb-4">{p.installmentNote}</p>
        </div>
      </section>

      {/* ── CTA ── */}
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