"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Share2, Users, Presentation, Award, Network, Star, Globe } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n-context";

const roleIcons = [Share2, Users, Presentation];
const benefitIcons = [Award, Star, Network, Globe];

/* ── Application step with connector ── */
function AppStep({ step, i, total }: { step: { step: string; label: string; desc: string }; i: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const isLast = i === total - 1;

  return (
    <div ref={ref} className="relative flex gap-5">
      {!isLast && (
        <motion.div
          className="absolute left-[19px] top-10 bottom-0 w-[2px] bg-violet-100 dark:bg-violet-900/40 origin-top"
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      )}
      <motion.div
        className="relative z-10 w-10 h-10 rounded-full bg-violet-600 text-white font-black text-sm flex items-center justify-center flex-shrink-0 shadow-md shadow-violet-200 dark:shadow-violet-900/40"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: i * 0.08 }}
      >
        {i + 1}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
        className="flex-1 bg-white dark:bg-[#0d1424] rounded-2xl border border-slate-100 dark:border-white/10 shadow-sm p-5 mb-4"
      >
        <div className="font-bold text-slate-900 dark:text-white mb-1">{step.label}</div>
        <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{step.desc}</div>
      </motion.div>
    </div>
  );
}

export default function AmbassadorPageClient() {
  const { t } = useI18n();
  const a = t.ambassador;

  return (
    <div className="pt-20 bg-white dark:bg-[#06091a]">

      {/* ── HERO ── */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-[#07051a] dark:bg-[#06091a]">
        {/* glows */}
        <div className="absolute -top-40 right-0 w-[600px] h-[400px] rounded-full bg-violet-500/15 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 w-[200px] h-[200px] rounded-full bg-fuchsia-500/8 blur-2xl pointer-events-none" />
        {/* grid */}
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        {/* dots */}
        <div className="absolute top-24 right-[20%] w-3 h-3 rounded-full bg-violet-400/30 pointer-events-none" />
        <div className="absolute top-44 left-[15%] w-2 h-2 rounded-full bg-purple-400/25 pointer-events-none" />
        <div className="absolute bottom-28 right-[12%] w-4 h-4 rounded-full bg-indigo-400/20 pointer-events-none" />
        <div className="absolute bottom-20 left-[25%] w-2 h-2 rounded-full bg-fuchsia-400/25 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge variant="blue" className="mb-6">{a.badge}</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 leading-[1.08]"
          >
            {a.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-300 max-w-xl mx-auto leading-relaxed mb-10"
          >
            {a.heroDesc}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact" className="group">
                {a.ctaPrimary}
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
        <div className="h-12 bg-gradient-to-b from-transparent to-white dark:to-[#06091a] pointer-events-none mt-10" />
      </section>

      {/* ── RESPONSIBILITIES ── */}
      <section className="relative py-20 bg-white dark:bg-[#06091a] overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-violet-400/4 dark:bg-violet-500/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[250px] bg-purple-400/4 dark:bg-purple-500/6 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-slate-100 dark:border-white/8 mb-16" />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-3">
              <span className="w-4 h-px bg-violet-600 dark:bg-violet-400" />
              {a.roleBadge}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">{a.roleTitle}</h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-xl">{a.roleSubtitle}</p>
          </motion.div>

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
                  whileHover={{ y: -4, transition: { duration: 0.18 } }}
                  className="bg-white dark:bg-[#0d1424] rounded-2xl border border-slate-100 dark:border-violet-500/20 p-7 shadow-sm hover:shadow-md hover:border-violet-200 dark:hover:border-violet-500/40 transition-all duration-200"
                >
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-violet-400/40 dark:via-violet-400/25 to-transparent" />
                  <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 flex items-center justify-center mb-5">
                    <Icon size={18} className="text-violet-600 dark:text-violet-400" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-base">{r.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{r.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="relative py-20 bg-slate-50 dark:bg-[#06091a] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-amber-400/4 dark:bg-amber-500/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[300px] bg-orange-400/4 dark:bg-orange-500/6 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-slate-100 dark:border-white/8 mb-16" />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-3">
              <span className="w-4 h-px bg-amber-600 dark:bg-amber-400" />
              {a.benefitsBadge}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">{a.benefitsTitle}</h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-xl">{a.benefitsSubtitle}</p>
          </motion.div>

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
                  whileHover={{ y: -3, transition: { duration: 0.18 } }}
                  className="bg-white dark:bg-[#0d1424] rounded-2xl border border-slate-100 dark:border-amber-500/20 p-6 flex gap-4 shadow-sm hover:shadow-md hover:border-amber-200 dark:hover:border-amber-500/40 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white mb-1">{b.title}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">{b.desc}</div>
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 px-2.5 py-1 rounded-full inline-block">{b.value}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── APPLICATION PROCESS ── */}
      <section className="relative py-20 bg-white dark:bg-[#06091a] overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[350px] h-[350px] bg-violet-400/4 dark:bg-violet-500/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[250px] bg-purple-400/4 dark:bg-purple-500/6 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-slate-100 dark:border-white/8 mb-16" />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-3">
              <span className="w-4 h-px bg-violet-600 dark:bg-violet-400" />
              {a.processBadge}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">{a.processTitle}</h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-xl">{a.processSubtitle}</p>
          </motion.div>
          <div className="max-w-2xl mx-auto">
            {a.steps.map((step, i) => (
              <AppStep key={step.step} step={step} i={i} total={a.steps.length} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 bg-slate-50 dark:bg-[#06091a] overflow-hidden">
        <div className="absolute inset-0 bg-violet-500/2 dark:bg-violet-500/4 pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="bg-gradient-to-br from-violet-600 to-purple-600 rounded-3xl p-10 md:p-14 text-white shadow-xl shadow-violet-200 dark:shadow-violet-900/30"
          >
            <div className="text-3xl md:text-4xl font-bold mb-4">{a.ctaTitle}</div>
            <p className="text-violet-100 text-lg mb-8 leading-relaxed">{a.ctaSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-violet-600 font-semibold px-6 py-3 rounded-xl hover:bg-violet-50 transition-colors duration-200 group">
                {a.ctaPrimary}
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/about"
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