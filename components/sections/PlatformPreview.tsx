"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  LayoutDashboard,
  Brain,
  ClipboardList,
  Trophy,
  Coins,
  ArrowRight,
} from "lucide-react";

import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n-context";

const iconMap = {
  LayoutDashboard,
  ClipboardList,
  Brain,
  Trophy,
  Coins,
};

const colorMap = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-100 dark:border-blue-800",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-900/20",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-100 dark:border-purple-800",
  },
  amber: {
    bg: "bg-amber-50 dark:bg-amber-900/20",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-100 dark:border-amber-800",
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-100 dark:border-emerald-800",
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-900/20",
    text: "text-orange-600 dark:text-orange-400",
    border: "border-orange-100 dark:border-orange-800",
  },
};

const featureIcons = [
  LayoutDashboard,
  Brain,
  ClipboardList,
  Trophy,
  Coins,
];

export default function PlatformPreview() {
  const { t } = useI18n();
  const p = t.platformPreview;

  const features = [
    {
      title: p.dashboardTitle,
      description: p.dashboardDesc,
      color: "blue" as const,
    },
    {
      title: p.mistakeTitle,
      description: p.mistakeDesc,
      color: "purple" as const,
    },
    {
      title: p.mocksTitle,
      description: p.mocksDesc,
      color: "emerald" as const,
    },
    {
      title: p.leaderTitle,
      description: p.leaderDesc,
      color: "amber" as const,
    },
    {
      title: p.pointsTitle,
      description: p.pointsDesc,
      color: "orange" as const,
    },
  ];

  return (
    <section className="py-24 overflow-hidden bg-white dark:bg-[#06091a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          badge={p.badge}
          title={p.title}
          subtitle={p.subtitle}
        />

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {features.map((feature, i) => {
            const colors = colorMap[feature.color];
            const Icon = featureIcons[i];

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative bg-white dark:bg-slate-800 rounded-2xl border ${colors.border} p-6 shadow-card dark:shadow-none hover:shadow-card-hover transition-all duration-300`}
              >
                <div
                  className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}
                >
                  <Icon size={18} className={colors.text} />
                </div>

                <h3 className="font-semibold text-navy-950 dark:text-white mb-2">
                  {feature.title}
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Platform visual */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="bg-navy-950 dark:bg-slate-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">

            {/* Titlebar */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/10">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>

              <div className="flex-1 text-center text-xs text-white/30">
                {p.browserBar}
              </div>
            </div>

            {/* App content */}
            <div className="p-5 grid grid-cols-12 gap-4 min-h-[360px]">

              {/* Sidebar */}
              <div className="col-span-2 hidden md:flex flex-col gap-1">
                {p.appMenu.map((label, i) => (
                  <div
                    key={label}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${
                      i === 0
                        ? "bg-blue-600 text-white"
                        : "text-white/40 hover:text-white/60"
                    }`}
                  >
                    {React.createElement(
                      featureIcons[i] || LayoutDashboard,
                      { size: 13 }
                    )}
                    <span className="hidden lg:block">{label}</span>
                  </div>
                ))}
              </div>

              {/* Main area */}
              <div className="col-span-12 md:col-span-7 space-y-3">

                <div className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">
                  {p.yourProgress}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "SAT Score", val: "1,380", sub: "+280", up: true },
                    { label: p.appMenu[1], val: "14", sub: p.appMenu[1], up: false },
                    { label: "Streak", val: "21d", sub: "🔥", up: true },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="bg-white/5 rounded-xl p-3 border border-white/10"
                    >
                      <div className="text-white/40 text-xs">{s.label}</div>
                      <div className="text-white font-bold text-lg">{s.val}</div>
                      <div
                        className={`text-xs font-medium ${
                          s.up ? "text-emerald-400" : "text-white/40"
                        }`}
                      >
                        {s.sub}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="text-white/50 text-xs mb-2">
                    {p.scoreHistory}
                  </div>

                  <div className="flex items-end gap-1.5 h-14">
                    {[1100,1150,1200,1240,1280,1320,1360,1380].map((s,i)=>(
                      <div key={i} className="flex-1">
                        <div
                          className="w-full rounded-sm"
                          style={{
                            height: `${((s-1080)/320)*100}%`,
                            background:
                              i===7
                                ? "#2563eb"
                                : `rgba(37,99,235,${0.2 + i*0.08})`
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="text-white/50 text-xs mb-2.5">
                    {p.recentMistakes}
                  </div>

                  <div className="space-y-1.5">
                    {[
                      "Algebra — Quadratics",
                      "Reading — Inference",
                      "Writing — Transitions"
                    ].map((m)=>(
                      <div
                        key={m}
                        className="flex items-center gap-2 text-xs text-white/50"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400/70"/>
                        {m}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right column */}
              <div className="col-span-12 md:col-span-3 space-y-3">

                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="text-white/50 text-xs mb-2.5 flex items-center gap-1.5">
                    <Trophy size={11} className="text-amber-400"/>
                    {p.leaderboard}
                  </div>

                  {[
                    { rank:"1", name:"Timur K.", pts:"3,240", you:false },
                    { rank:"2", name:"Aizat M.", pts:"2,980", you:false },
                    { rank:"3", name:"You", pts:"2,450", you:true },
                  ].map((l)=>(
                    <div
                      key={l.name}
                      className={`flex items-center justify-between text-xs px-2 py-1.5 rounded-lg mb-1 ${
                        l.you
                          ? "bg-blue-600/20 border border-blue-500/30"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-white/30 w-4 text-center">
                          {l.rank}
                        </span>
                        <span className={l.you ? "text-blue-300 font-semibold" : "text-white/60"}>
                          {l.name}
                        </span>
                      </div>

                      <span className={l.you ? "text-blue-300 font-bold" : "text-white/40"}>
                        {l.pts}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="text-white/50 text-xs mb-1">{p.yourPoints}</div>

                  <div className="text-2xl font-bold text-amber-400">
                    2,450
                  </div>

                  <div className="text-white/30 text-xs">
                    = 24 {p.lotteryTickets}
                  </div>

                  <div className="mt-2 h-1.5 bg-white/10 rounded-full">
                    <div className="h-full w-3/5 bg-amber-400 rounded-full"/>
                  </div>

                  <div className="text-white/30 text-xs mt-1">
                    550 {p.toNextPrize}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity:0 }}
          whileInView={{ opacity:1 }}
          viewport={{ once:true }}
          transition={{ duration:0.5, delay:0.3 }}
          className="mt-8 text-center"
        >
          <Button variant="primary" size="lg" asChild>
            <Link href="/platform" className="group">
              {t.common.explorePlatform}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
