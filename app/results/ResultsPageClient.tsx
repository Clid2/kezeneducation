"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingUp, ArrowRight, Lock, Target, BarChart3, Users, Zap } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { useI18n } from "@/lib/i18n-context";

const placeholders = [
  { program: "SAT",   months: 4, from: "1100", to: "1400+" },
  { program: "SAT",   months: 3, from: "1200", to: "1480+" },
  { program: "IELTS", months: 4, from: "5.5",  to: "7.5+"  },
  { program: "SAT",   months: 5, from: "980",  to: "1350+" },
  { program: "IELTS", months: 3, from: "6.0",  to: "8.0+"  },
  { program: "SAT",   months: 4, from: "1150", to: "1490+" },
  { program: "SAT",   months: 3, from: "1050", to: "1380+" },
  { program: "IELTS", months: 4, from: "5.0",  to: "7.0+"  },
  { program: "SAT",   months: 4, from: "1080", to: "1420+" },
  { program: "SAT",   months: 2, from: "1250", to: "1510+" },
  { program: "IELTS", months: 3, from: "6.5",  to: "8.0+"  },
  { program: "SAT",   months: 4, from: "990",  to: "1330+" },
];

const slots = [
  "Твой результат?", "Начни сегодня", "Твоё имя здесь",
  "Следующий — ты?", "Запишись сейчас", "Твой результат?",
  "Начни сегодня", "Твоё имя здесь", "Следующий — ты?",
  "Запишись сейчас", "Твой результат?", "Начни сегодня",
];

const principles = [
  {
    icon: Target,
    color: "blue",
    title: "Система, а не удача",
    desc: "Каждый результат — следствие структурированной программы, а не счастливого стечения обстоятельств. 36 уроков. Чёткая последовательность.",
  },
  {
    icon: BarChart3,
    color: "indigo",
    title: "Прогресс виден каждую неделю",
    desc: "Пробные тесты каждую неделю. Студент всегда знает свой текущий балл и чёткий план — что работать, чтобы вырасти дальше.",
  },
  {
    icon: Zap,
    color: "amber",
    title: "База ошибок не даёт буксовать",
    desc: "Каждая ошибка автоматически сохраняется и разбирается. Студенты не повторяют одних и тех же ошибок на финальном экзамене.",
  },
  {
    icon: Users,
    color: "emerald",
    title: "Мини-группы — максимум внимания",
    desc: "6–10 студентов на группу. Преподаватель знает каждого по имени и видит его прогресс в реальном времени.",
  },
];

const colorMap = {
  blue:    { bg: "bg-blue-50 dark:bg-blue-500/10",     icon: "text-blue-600 dark:text-blue-400",    border: "border-blue-100 dark:border-blue-500/20" },
  indigo:  { bg: "bg-indigo-50 dark:bg-indigo-500/10",  icon: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-100 dark:border-indigo-500/20" },
  amber:   { bg: "bg-amber-50 dark:bg-amber-500/10",    icon: "text-amber-600 dark:text-amber-400",   border: "border-amber-100 dark:border-amber-500/20" },
  emerald: { bg: "bg-emerald-50 dark:bg-emerald-500/10",icon: "text-emerald-600 dark:text-emerald-400",border: "border-emerald-100 dark:border-emerald-500/20" },
} as const;

export default function ResultsPageClient() {
  const { t } = useI18n();
  const r = t.results;

  return (
    <div className="pt-20 bg-white dark:bg-[#06091a]">

      {/* ── HERO ── */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-[#f5f7ff] dark:bg-[#06091a]">
        <div className="absolute -top-20 -right-20 w-[500px] h-[400px] rounded-full bg-blue-200/60 blur-3xl pointer-events-none dark:hidden" />
        <div className="absolute bottom-0 -left-20 w-[400px] h-[300px] rounded-full bg-indigo-200/50 blur-3xl pointer-events-none dark:hidden" />
        <div className="absolute -top-40 right-0 w-[500px] h-[350px] rounded-full bg-blue-500/12 blur-3xl pointer-events-none hidden dark:block" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-indigo-500/8 blur-3xl pointer-events-none hidden dark:block" />
        <div className="absolute inset-0 bg-grid opacity-20 dark:opacity-10 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge variant="blue" className="mb-6 text-sm px-5 py-2">{r.badge}</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-5 leading-[1.08]"
          >
            Стена результатов<br />
            <span className="text-blue-600 dark:text-blue-400">ждёт первых имён</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed"
          >
            Kezen только запустился. Эти места ждут первых студентов — тех, кто войдёт в историю платформы с самого начала.
          </motion.p>
        </div>
        <div className="h-12 bg-gradient-to-b from-transparent to-white dark:to-[#06091a] pointer-events-none mt-8" />
      </section>

      {/* ── PLACEHOLDER GRID ── */}
      <section className="relative py-20 bg-white dark:bg-[#06091a] overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-blue-400/4 dark:bg-blue-500/6 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[250px] bg-indigo-400/4 dark:bg-indigo-500/5 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-slate-100 dark:border-white/8 mb-16" />

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">
              <span className="w-4 h-px bg-blue-600 dark:bg-blue-400" />
              Скоро здесь
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
              12 мест — 12 историй успеха
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base max-w-lg">
              Каждая карточка — реальный студент, реальный балл. Твоё имя может появиться здесь уже через 3–4 месяца.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {placeholders.map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
                className="relative bg-white dark:bg-[#0d1424] rounded-2xl border border-dashed border-slate-300 dark:border-white/15 p-5 overflow-hidden"
              >
                {/* overlay */}
                <div className="absolute inset-0 bg-white/50 dark:bg-[#0d1424]/70 backdrop-blur-[1.5px] z-10 flex flex-col items-center justify-center gap-2 rounded-2xl">
                  <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-white/8 border border-slate-200 dark:border-white/10 flex items-center justify-center">
                    <Lock size={14} className="text-slate-400 dark:text-slate-500" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 text-center px-2">{slots[i]}</span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${item.program === "SAT" ? "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300" : "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300"}`}>
                    {item.program} · {item.months} мес.
                  </span>
                </div>

                {/* fake content behind */}
                <div className="flex items-center justify-between mb-3 opacity-25">
                  <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-white/10" />
                  <div className="h-5 w-10 bg-slate-200 dark:bg-white/10 rounded-full" />
                </div>
                <div className="h-3 w-20 bg-slate-200 dark:bg-white/10 rounded mb-4 opacity-25" />
                <div className="flex items-center gap-2 opacity-25">
                  <div className="flex-1 bg-slate-100 dark:bg-white/5 rounded-xl p-3 text-center">
                    <div className="h-2 w-6 bg-slate-300 dark:bg-white/15 rounded mx-auto mb-1.5" />
                    <div className="text-base font-bold text-slate-300 dark:text-white/20">{item.from}</div>
                  </div>
                  <TrendingUp size={16} className="text-slate-300 dark:text-white/15" />
                  <div className="flex-1 bg-blue-50 dark:bg-blue-500/10 rounded-xl p-3 text-center">
                    <div className="h-2 w-6 bg-blue-200 dark:bg-blue-400/20 rounded mx-auto mb-1.5" />
                    <div className="text-base font-bold text-blue-200 dark:text-blue-400/30">{item.to}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES ── */}
      <section className="relative py-20 bg-slate-50 dark:bg-[#06091a] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-blue-400/4 dark:bg-blue-500/8 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-slate-100 dark:border-white/8 mb-16" />
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">
              <span className="w-4 h-px bg-indigo-600 dark:bg-indigo-400" />
              Почему это работает
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
              4 причины, по которым<br />баллы растут
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-xl">
              Не мотивация. Не удача. Система — единственная причина роста.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {principles.map((p, i) => {
              const c = colorMap[p.color as keyof typeof colorMap];
              return (
                <motion.div key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -3, transition: { duration: 0.18 } }}
                  className={`bg-white dark:bg-[#0d1424] rounded-2xl border ${c.border} p-6 shadow-sm hover:shadow-md transition-all duration-200`}
                >
                  <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center mb-4`}>
                    <p.icon size={18} className={c.icon} />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-base">{p.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 bg-white dark:bg-[#06091a] overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/2 dark:bg-blue-500/4 pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55 }}
            className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-10 md:p-14 text-white shadow-xl shadow-blue-200 dark:shadow-blue-900/30">
            <div className="text-3xl md:text-4xl font-bold mb-4">{r.ctaTitle}</div>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">{r.ctaSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors duration-200 group">
                {r.ctaPrimary}
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/15 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/25 transition-colors duration-200 border border-white/20">
                {r.ctaSecondary}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}