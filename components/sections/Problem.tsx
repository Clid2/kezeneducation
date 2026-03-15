"use client";

import { motion } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { useI18n } from "@/lib/i18n-context";

export default function Problem() {
  const { t } = useI18n();
  const p = t.problem;

  const problems = [
    { title: p.p1Title, description: p.p1Desc, icon: "📚" },
    { title: p.p2Title, description: p.p2Desc, icon: "📊" },
    { title: p.p3Title, description: p.p3Desc, icon: "📣" },
    { title: p.p4Title, description: p.p4Desc, icon: "😴" },
  ];

  return (
    <section className="relative py-24 bg-slate-50 dark:bg-[#06091a] overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-red-400/4 dark:bg-red-500/6 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[250px] bg-amber-400/4 dark:bg-amber-500/5 blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-slate-100 dark:border-white/8 mb-16" />
        <SectionHeader
          badge={p.badge}
          title={p.title}
          subtitle={p.subtitle}
          badgeVariant="amber"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white dark:bg-[#0d1424] rounded-2xl border border-slate-100 dark:border-white/10 p-6 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow duration-200"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 dark:bg-red-900/10 rounded-full -translate-y-16 translate-x-16 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-start gap-4">
                <div className="text-3xl">{problem.icon}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">{problem.title}</h3>
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                      <X size={11} className="text-red-500 dark:text-red-400" />
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{problem.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-navy-950 dark:bg-slate-950 rounded-3xl p-10 md:p-14 overflow-hidden"
        >
          <div className="absolute inset-0 bg-dots opacity-20" />
          <div className="absolute -right-24 -top-24 w-64 h-64 rounded-full bg-blue-600/10 blur-2xl" />
          <div className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full bg-blue-600/10 blur-2xl" />

          <div className="relative grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-6">
                {p.solutionBadge}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{p.solutionTitle}</h3>
              <p className="text-slate-400 leading-relaxed">{p.solutionDesc}</p>
            </div>

            <div className="space-y-3">
              {p.solutions.map((solution, i) => (
                <motion.div
                  key={solution}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                  className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10"
                >
                  <CheckCircle2 size={16} className="text-blue-400 flex-shrink-0" />
                  <span className="text-sm text-slate-300">{solution}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}