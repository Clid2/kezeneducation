"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen, Target, Users } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n-context";

export default function Courses() {
  const { t } = useI18n();
  const c = t.courses;

  const courses = [
    {
      tag: c.satTag,
      emoji: "📐",
      title: c.satTitle,
      description: c.satDesc,
      href: "/sat",
      color: "blue",
      highlights: [
        { icon: Clock, text: c.lessons },
        { icon: BookOpen, text: c.verbalMath },
        { icon: Target, text: c.scoreImprove },
        { icon: Users, text: c.smallGroup },
      ],
      scoreExample: { from: "1100", to: "1430" },
      curriculum: c.satCurriculum,
    },
    {
      tag: c.ieltsTag,
      emoji: "🌍",
      title: c.ieltsTitle,
      description: c.ieltsDesc,
      href: "/ielts",
      color: "green",
      highlights: [
        { icon: Clock, text: c.allSections },
        { icon: BookOpen, text: c.writingSpeaking },
        { icon: Target, text: c.mockEssays },
        { icon: Users, text: c.aiDrills },
      ],
      scoreExample: { from: "5.5", to: "7.5" },
      curriculum: c.ieltsCurriculum,
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader badge={c.badge} title={c.title} subtitle={c.subtitle} />

        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((course, i) => (
            <motion.div
              key={course.tag}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-card dark:shadow-none hover:shadow-card-hover transition-all duration-300 overflow-hidden"
            >
              <div className={`h-1 w-full ${course.color === "blue" ? "bg-blue-600" : "bg-emerald-500"}`} />

              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${course.color === "blue" ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" : "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"}`}>
                      {course.tag}
                    </span>
                    <h3 className="text-2xl font-bold text-navy-950 dark:text-white">{course.title}</h3>
                  </div>
                  <div className="text-4xl">{course.emoji}</div>
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">{course.description}</p>

                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4 mb-6 flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-xs text-slate-400 mb-1">{c.avgStart}</div>
                    <div className="text-2xl font-bold text-slate-400">{course.scoreExample.from}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`h-0.5 w-10 ${course.color === "blue" ? "bg-blue-200 dark:bg-blue-800" : "bg-emerald-200 dark:bg-emerald-800"}`} />
                    <ArrowRight size={18} className={course.color === "blue" ? "text-blue-500 dark:text-blue-400" : "text-emerald-500 dark:text-emerald-400"} />
                    <div className={`h-0.5 w-10 ${course.color === "blue" ? "bg-blue-200 dark:bg-blue-800" : "bg-emerald-200 dark:bg-emerald-800"}`} />
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-slate-400 mb-1">{c.avgEnd}</div>
                    <div className={`text-2xl font-bold ${course.color === "blue" ? "text-blue-600 dark:text-blue-400" : "text-emerald-600 dark:text-emerald-400"}`}>{course.scoreExample.to}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 mb-6">
                  {course.highlights.map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Icon size={14} className={course.color === "blue" ? "text-blue-500 dark:text-blue-400" : "text-emerald-500 dark:text-emerald-400"} />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {course.curriculum.map((item) => (
                    <span key={item} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full px-2.5 py-1 font-medium">
                      {item}
                    </span>
                  ))}
                </div>

                <Button
                  variant={course.color === "blue" ? "primary" : "secondary"}
                  className="w-full group"
                  asChild
                >
                  <Link href={course.href}>
                    {c.explore} {course.title}
                    <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
