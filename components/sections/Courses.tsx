"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen, Target, Users, CheckCircle2, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

/* ── Animated score number ── */
function ScoreDiff({ from, to, color }: { from: string; to: string; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-center">
        <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-0.5">Старт</div>
        <div className="text-2xl font-black text-white/50">{from}</div>
      </div>
      <div className="flex items-center gap-1 flex-1">
        <div className={`h-px flex-1 ${color === "blue" ? "bg-blue-500/40" : "bg-emerald-500/40"}`} />
        <motion.div
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowRight size={14} className={color === "blue" ? "text-blue-400" : "text-emerald-400"} />
        </motion.div>
        <div className={`h-px flex-1 ${color === "blue" ? "bg-blue-500/40" : "bg-emerald-500/40"}`} />
      </div>
      <div className="text-center">
        <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-0.5">Результат</div>
        <div className={`text-2xl font-black ${color === "blue" ? "text-blue-400" : "text-emerald-400"}`}>{to}</div>
      </div>
    </div>
  );
}

/* ── Tilt card ── */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Courses() {
  const { t } = useI18n();
  const c = t.courses;
  const [hoveredHighlight, setHoveredHighlight] = useState<string | null>(null);

  const satHighlights = [
    { icon: Clock,    text: c.lessons },
    { icon: BookOpen, text: c.verbalMath },
    { icon: Target,   text: c.scoreImprove },
    { icon: Users,    text: c.smallGroup },
  ];
  const ieltsHighlights = [
    { icon: Clock,    text: c.allSections },
    { icon: BookOpen, text: c.writingSpeaking },
    { icon: Target,   text: c.mockEssays },
    { icon: Users,    text: c.aiDrills },
  ];

  return (
    <section className="relative py-24 bg-white dark:bg-[#06091a] overflow-hidden">
      {/* ambient glows */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-blue-500/6 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-emerald-500/6 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-indigo-500/4 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">
            <span className="w-4 h-px bg-blue-600 dark:bg-blue-400" />{c.badge}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">{c.title}</h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg max-w-xl">{c.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* ── SAT CARD ── */}
          <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <TiltCard>
              <div className="relative rounded-3xl overflow-hidden bg-[#080d1f] border border-blue-500/20 shadow-2xl shadow-blue-900/20">

                {/* animated noise bg */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'repeat',
                }} />

                {/* top glow beam */}
                <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-blue-400/80 to-transparent" />
                <motion.div
                  className="absolute -top-20 left-1/4 w-1/2 h-40 bg-blue-500/10 blur-2xl"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* corner decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
                  <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-blue-400/60 to-transparent" />
                  <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-blue-400/60 to-transparent" />
                </div>

                <div className="relative p-7">
                  {/* top row */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/25 mb-4">
                        <Sparkles size={10} />
                        {c.satTag}
                      </div>
                      <h3 className="text-2xl font-black text-white leading-tight">{c.satTitle}</h3>
                    </div>
                    <div className="text-4xl opacity-80">📐</div>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6">{c.satDesc}</p>

                  {/* score */}
                  <div className="bg-white/4 rounded-2xl border border-white/8 p-4 mb-6">
                    <ScoreDiff from="1100" to="1430" color="blue" />
                  </div>

                  {/* highlights */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {satHighlights.map(({ icon: Icon, text }) => (
                      <motion.div key={text}
                        onHoverStart={() => setHoveredHighlight(text)}
                        onHoverEnd={() => setHoveredHighlight(null)}
                        className="relative flex items-center gap-2.5 rounded-xl px-3 py-2.5 border border-white/6 bg-white/4 overflow-hidden cursor-default"
                        whileHover={{ borderColor: "rgba(96,165,250,0.3)", backgroundColor: "rgba(59,130,246,0.08)" }}
                        transition={{ duration: 0.15 }}
                      >
                        <Icon size={13} className="text-blue-400 flex-shrink-0" />
                        <span className="text-xs font-medium text-slate-200">{text}</span>
                        <CheckCircle2 size={11} className="text-blue-500/60 ml-auto flex-shrink-0" />
                      </motion.div>
                    ))}
                  </div>

                  {/* curriculum pills */}
                  <div className="flex flex-wrap gap-1.5 mb-7">
                    {c.satCurriculum.map((item, i) => (
                      <motion.span key={item}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        className="text-xs bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-full px-2.5 py-1 font-medium"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link href="/sat"
                      className="relative flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm text-white overflow-hidden group"
                      style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }} />
                      <span className="relative">{c.explore} {c.satTitle}</span>
                      <ArrowRight size={15} className="relative group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* ── IELTS CARD ── */}
          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}>
            <TiltCard>
              <div className="relative rounded-3xl overflow-hidden bg-[#081a10] border border-emerald-500/20 shadow-2xl shadow-emerald-900/20">

                <div className="absolute inset-0 opacity-[0.03]" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'repeat',
                }} />

                <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent" />
                <motion.div
                  className="absolute -top-20 left-1/4 w-1/2 h-40 bg-emerald-500/10 blur-2xl"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />

                <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
                  <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-emerald-400/60 to-transparent" />
                  <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-emerald-400/60 to-transparent" />
                </div>

                <div className="relative p-7">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 mb-4">
                        <Sparkles size={10} />
                        {c.ieltsTag}
                      </div>
                      <h3 className="text-2xl font-black text-white leading-tight">{c.ieltsTitle}</h3>
                    </div>
                    <div className="text-4xl opacity-80">🌍</div>
                  </div>

                  <p className="text-slate-300 text-sm leading-relaxed mb-6">{c.ieltsDesc}</p>

                  <div className="bg-white/4 rounded-2xl border border-white/8 p-4 mb-6">
                    <ScoreDiff from="5.5" to="7.5" color="emerald" />
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {ieltsHighlights.map(({ icon: Icon, text }) => (
                      <motion.div key={text}
                        className="relative flex items-center gap-2.5 rounded-xl px-3 py-2.5 border border-white/6 bg-white/4 overflow-hidden cursor-default"
                        whileHover={{ borderColor: "rgba(52,211,153,0.3)", backgroundColor: "rgba(16,185,129,0.08)" }}
                        transition={{ duration: 0.15 }}
                      >
                        <Icon size={13} className="text-emerald-400 flex-shrink-0" />
                        <span className="text-xs font-medium text-slate-200">{text}</span>
                        <CheckCircle2 size={11} className="text-emerald-500/60 ml-auto flex-shrink-0" />
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-7">
                    {c.ieltsCurriculum.map((item, i) => (
                      <motion.span key={item}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.05 }}
                        className="text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-full px-2.5 py-1 font-medium"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link href="/ielts"
                      className="relative flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm text-white overflow-hidden group"
                      style={{ background: "linear-gradient(135deg, #059669, #047857)" }}
                    >
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: "linear-gradient(135deg, #10b981, #059669)" }} />
                      <span className="relative">{c.explore} {c.ieltsTitle}</span>
                      <ArrowRight size={15} className="relative group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </TiltCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}