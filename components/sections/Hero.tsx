"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";
import Button from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n-context";

export default function Hero() {
  const { t } = useI18n();
  const h = t.hero;

  const stats = [
    { value: "500+", label: h.stat1Label },
    { value: "+200", label: h.stat2Label },
    { value: "96%", label: h.stat3Label },
  ];

  const badges = [h.featureCurriculum, h.featureMocks, h.featureTracking, h.featureGamified];

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-[#f0f6ff] dark:bg-[#06091a]">
      {/* light */}
      <div className="absolute -top-20 -right-20 w-[550px] h-[550px] rounded-full bg-blue-200/70 blur-3xl pointer-events-none dark:hidden" />
      <div className="absolute top-1/3 -left-32 w-[400px] h-[400px] rounded-full bg-indigo-200/60 blur-3xl pointer-events-none dark:hidden" />
      <div className="absolute bottom-0 right-1/3 w-[350px] h-[350px] rounded-full bg-cyan-200/50 blur-3xl pointer-events-none dark:hidden" />
      {/* dark */}
      <div className="absolute -top-40 right-0 w-[600px] h-[400px] rounded-full bg-blue-500/15 blur-3xl pointer-events-none hidden dark:block" />
      <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-3xl pointer-events-none hidden dark:block" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-cyan-500/8 blur-3xl pointer-events-none hidden dark:block" />
      <div className="absolute top-1/4 left-1/3 w-[200px] h-[200px] rounded-full bg-blue-600/8 blur-2xl pointer-events-none hidden dark:block" />
      <div className="absolute inset-0 bg-grid opacity-20 dark:opacity-10 pointer-events-none" />
      <div className="absolute top-24 right-[18%] w-3 h-3 rounded-full bg-blue-400/50 dark:bg-blue-400/30 pointer-events-none" />
      <div className="absolute top-44 right-[30%] w-2 h-2 rounded-full bg-indigo-400/40 dark:bg-indigo-400/20 pointer-events-none" />
      <div className="absolute bottom-36 left-[12%] w-4 h-4 rounded-full bg-blue-300/40 dark:bg-blue-400/20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-300 rounded-full px-4 py-1.5 text-sm font-medium mb-8"
          >
            <TrendingUp size={14} />
            <span>{h.badge}</span>
            <span className="text-blue-400">→</span>
          </motion.div>
  <motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-navy-950 dark:text-white tracking-tight text-balance leading-[1.05]"
>
  {h.title.includes("SAT и IELTS") ? (
    <>
      {h.title.split("SAT и IELTS")[0]}
      <span className="text-blue-600 dark:text-blue-400"> SAT и IELTS</span>
      {h.title.split("SAT и IELTS")[1]}
    </>
  ) : h.title.includes("SAT & IELTS") ? (
    <>
      {h.title.split("SAT & IELTS")[0]}
      <span className="text-blue-600 dark:text-blue-400"> SAT & IELTS</span>
      {h.title.split("SAT & IELTS")[1]}
    </>
  ) : h.title.includes("SAT және IELTS-ке") ? (
    <>
      {h.title.split("SAT және IELTS-ке")[0]}
      <span className="text-blue-600 dark:text-blue-400"> SAT және IELTS-ке </span>
      {h.title.split("SAT және IELTS-ке")[1]}
    </>
  ) : (
    h.title
  )}
</motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto"
          >
            {h.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 mt-6"
          >
            {badges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/20 rounded-full px-3 py-1.5 shadow-sm"
              >
                <CheckCircle2 size={12} className="text-blue-600 dark:text-blue-400" />
                {badge}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10"
          >
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact" className="group">
                {h.cta1}
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/pricing">{h.cta2}</Link>
            </Button>
          </motion.div>


        </div>

        {/* Platform preview card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl border border-slate-200 dark:border-white/10 shadow-card dark:shadow-none overflow-hidden bg-white dark:bg-[#0d1424]">
            {/* Browser bar */}
            <div className="bg-slate-50 dark:bg-[#080b1a] border-b border-slate-200 dark:border-white/8 px-4 py-3 flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-md px-3 py-1.5 text-xs text-slate-400 text-center">
                {h.browserBar}
              </div>
            </div>

            {/* Dashboard mock */}
            <div className="bg-slate-50 dark:bg-[#06091a] p-6 grid grid-cols-1 md:grid-cols-4 gap-4 min-h-[280px]">
              {/* Sidebar */}
              <div className="hidden md:block bg-[#06091a] dark:bg-[#030610] rounded-xl p-4 space-y-1">
                <div className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-4 px-2">Menu</div>
                {h.dashboardMenu.map((item, i) => (
                  <div
                    key={item}
                    className={`text-xs px-3 py-2 rounded-lg font-medium ${i === 0 ? "bg-blue-600 text-white" : "text-white/50 hover:text-white/80"}`}
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="md:col-span-3 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: h.dashboardStats.score, value: "1320", delta: "+180" },
                    { label: h.dashboardStats.tests, value: "12", delta: h.dashboardStats.completed },
                    { label: h.dashboardStats.points, value: "2,450", delta: "pts" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white dark:bg-white/5 rounded-xl p-3 border border-slate-100 dark:border-white/8 shadow-sm">
                      <div className="text-xs text-slate-400">{s.label}</div>
                      <div className="text-xl font-bold text-navy-950 dark:text-white mt-1">{s.value}</div>
                      <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{s.delta}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-white dark:bg-white/5 rounded-xl p-4 border border-slate-100 dark:border-white/8 shadow-sm">
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">{h.scoreProgress}</div>
                  <div className="flex items-end gap-2 h-16">
                    {[1140, 1180, 1210, 1250, 1280, 1310, 1320].map((score, i) => {
                      const height = ((score - 1100) / 250) * 100;
                      return (
                        <div key={i} className="flex-1 relative group">
                          <div
                            className="w-full rounded-sm bg-blue-100 dark:bg-blue-900/40 group-last:bg-blue-600 transition-colors"
                            style={{ height: `${height}%` }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    <div className="h-12 bg-gradient-to-b from-transparent to-white dark:to-[#06091a] pointer-events-none" />
    </section>
  );
}