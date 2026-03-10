"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Zap, Gift, Users, BookOpen, Clock, TrendingUp } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { useI18n } from "@/lib/i18n-context";

const earnIcons = [BookOpen, Clock, TrendingUp, Users];

const colorMap = {
  blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800",
  green: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800",
  purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-800",
  amber: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-800",
};

const earnColors: Array<keyof typeof colorMap> = ["blue", "green", "purple", "amber"];

export default function Gamification() {
  const { t } = useI18n();
  const g = t.gamification;

  return (
    <section className="py-24 bg-navy-950 dark:bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-6">
            <Trophy size={13} />
            {g.badge}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            {g.title.split(".")[0]}.{" "}
            <span className="text-amber-400">{g.title.split(".")[1]?.trim()}.</span>{" "}
            {g.title.split(".")[2]?.trim()}.
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
            {g.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start mb-12">
          {/* How to earn */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <Zap size={18} className="text-blue-400" />
              {g.howEarn}
            </h3>
            <div className="space-y-3">
              {g.ways.map((way, i) => (
                <motion.div
                  key={way.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-4 py-3.5"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${colorMap[earnColors[i]]}`}>
                      {React.createElement(earnIcons[i], { size: 15 })}
                    </div>
                    <span className="text-sm font-medium text-white">{way.label}</span>
                  </div>
                  <span className="text-sm font-bold text-amber-400">{way.points}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 bg-blue-600/10 border border-blue-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star size={15} className="text-amber-400" fill="currentColor" />
                <span className="text-sm font-semibold text-white">{g.lotteryTitle}</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                <span className="text-white font-semibold">{g.lotteryDesc.split(".")[0]}.</span>{" "}
                {g.lotteryDesc.split(".").slice(1).join(".")}
              </p>
            </div>
          </motion.div>

          {/* Prizes */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
              <Gift size={18} className="text-amber-400" />
              {g.whatWin}
            </h3>
            <div className="space-y-3">
              {g.prizes.map((prize, i) => {
                const isGrand = "grand" in prize && prize.grand === true;
                return (
                  <motion.div
                    key={prize.name}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className={`relative flex items-center justify-between rounded-xl px-4 py-3.5 border transition-all ${
                      isGrand
                        ? "bg-gradient-to-r from-amber-500/20 to-orange-500/10 border-amber-500/30"
                        : "bg-white/5 border-white/10"
                    }`}
                  >
                    {isGrand && (
                      <div className="absolute -top-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
                    )}
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{prize.emoji}</div>
                      <div>
                        <div className={`text-sm font-semibold ${isGrand ? "text-amber-300" : "text-white"}`}>
                          {prize.name}
                        </div>
                        {isGrand && (
                          <div className="text-xs text-amber-500 font-medium">{g.grandPrize}</div>
                        )}
                      </div>
                    </div>
                    <div className={`text-sm font-bold ${isGrand ? "text-amber-400" : "text-slate-400"}`}>
                      {prize.points}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-8 py-5">
            <Trophy size={20} className="text-amber-400" />
            <span className="text-white font-semibold">
              {g.topPrize.replace("iPhone 17", "")}{" "}
              <span className="text-amber-400">iPhone 17</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

