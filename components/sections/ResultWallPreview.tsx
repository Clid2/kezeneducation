"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n-context";

const results = [
  { name: "Aizat M.", program: "SAT", before: 1100, after: 1430, months: 4, flag: "🇰🇿" },
  { name: "Timur K.", program: "SAT", before: 1250, after: 1510, months: 3, flag: "🇰🇿" },
  { name: "Dina S.", program: "SAT", before: 1080, after: 1420, months: 5, flag: "🇰🇿" },
  { name: "Arman B.", program: "IELTS", before: 5.5, after: 7.5, months: 3, flag: "🇰🇿" },
  { name: "Zara N.", program: "SAT", before: 1190, after: 1490, months: 4, flag: "🇰🇿" },
  { name: "Emil A.", program: "IELTS", before: 6.0, after: 8.0, months: 4, flag: "🇰🇿" },
];

export default function ResultWallPreview() {
  const { t } = useI18n();
  const r = t.resultsPreview;

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={r.badge} title={r.title} subtitle={r.subtitle} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((res, i) => (
            <motion.div
              key={res.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-card dark:shadow-none p-5 hover:shadow-card-hover transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-lg">
                    {res.flag}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-navy-950 dark:text-white">{res.name}</div>
                    <div className="text-xs text-slate-400">{res.months} {r.program}</div>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${res.program === "SAT" ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" : "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"}`}>
                  {res.program}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 bg-slate-50 dark:bg-slate-700 rounded-xl p-3 text-center">
                  <div className="text-xs text-slate-400 mb-0.5">{r.before}</div>
                  <div className="text-xl font-bold text-slate-400">{res.before}</div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <TrendingUp size={18} className="text-emerald-500 dark:text-emerald-400" />
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    +{Number(res.after) - Number(res.before)}
                  </div>
                </div>
                <div className="flex-1 bg-blue-50 dark:bg-blue-900/30 rounded-xl p-3 text-center border border-blue-100 dark:border-blue-800">
                  <div className="text-xs text-blue-500 dark:text-blue-400 mb-0.5">{r.after}</div>
                  <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{res.after}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Button variant="outline" size="lg" asChild>
            <Link href="/results" className="group">
              {t.common.viewResults}
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
