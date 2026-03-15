"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { useI18n } from "@/lib/i18n-context";
import { useEffect, useState } from "react";
import type { Post } from "@/lib/posts";

const catColors: Record<string, string> = {
  SAT:      "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30",
  IELTS:    "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30",
  Strategy: "bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600",
};

const accentColors: Record<string, string> = {
  blue:  "from-blue-500 to-blue-600",
  green: "from-emerald-500 to-emerald-600",
  slate: "from-slate-400 to-slate-500",
};

const glowColors: Record<string, string> = {
  blue:  "bg-blue-500/8 dark:bg-blue-500/12",
  green: "bg-emerald-500/8 dark:bg-emerald-500/12",
  slate: "bg-slate-500/5 dark:bg-slate-500/8",
};

export default function BlogPageClient() {
  const { t } = useI18n();
  const b = t.blog;
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((d) => setPosts(d.posts ?? []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-20 bg-white dark:bg-[#06091a]">

      {/* ── HERO ── */}
      <section className="relative py-24 md:py-28 overflow-hidden bg-[#f8f9ff] dark:bg-[#06091a]">
        {/* light glows */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[400px] rounded-full bg-blue-200/60 blur-3xl pointer-events-none dark:hidden" />
        <div className="absolute bottom-0 -left-20 w-[400px] h-[300px] rounded-full bg-indigo-200/50 blur-3xl pointer-events-none dark:hidden" />
        {/* dark glows */}
        <div className="absolute -top-40 right-0 w-[500px] h-[350px] rounded-full bg-blue-500/12 blur-3xl pointer-events-none hidden dark:block" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-indigo-500/8 blur-3xl pointer-events-none hidden dark:block" />
        <div className="absolute top-1/2 right-1/3 w-[200px] h-[200px] rounded-full bg-violet-500/6 blur-2xl pointer-events-none hidden dark:block" />
        {/* grid */}
        <div className="absolute inset-0 bg-grid opacity-20 dark:opacity-10 pointer-events-none" />
        {/* dots */}
        <div className="absolute top-20 right-[20%] w-3 h-3 rounded-full bg-blue-400/40 dark:bg-blue-400/25 pointer-events-none" />
        <div className="absolute top-36 left-[18%] w-2 h-2 rounded-full bg-indigo-400/30 dark:bg-indigo-400/20 pointer-events-none" />
        <div className="absolute bottom-20 right-[15%] w-2 h-2 rounded-full bg-blue-300/30 dark:bg-blue-400/15 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge variant="blue" className="mb-6">{b.badge}</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-5 leading-[1.08]"
          >
            {b.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto"
          >
            {b.subtitle}
          </motion.p>
        </div>
        <div className="h-12 bg-gradient-to-b from-transparent to-white dark:to-[#06091a] pointer-events-none mt-8" />
      </section>

      {/* ── POSTS ── */}
      <section className="relative py-16 bg-white dark:bg-[#06091a] overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-blue-400/4 dark:bg-blue-500/6 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[250px] bg-indigo-400/4 dark:bg-indigo-500/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-slate-100 dark:border-white/8 mb-12" />

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-72 bg-slate-100 dark:bg-white/5 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 text-slate-400 dark:text-slate-500">
              <p className="text-lg">Статьи пока не опубликованы.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                  whileHover={{ y: -4, transition: { duration: 0.18 } }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex flex-col bg-white dark:bg-[#0d1424] rounded-2xl border border-slate-100 dark:border-white/10 shadow-sm hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-500/30 transition-all duration-200 overflow-hidden group h-full"
                  >
                    {/* top gradient accent */}
                    <div className={`h-1 w-full bg-gradient-to-r ${accentColors[post.color] ?? accentColors.slate}`} />

                    {/* subtle top glow */}
                    <div className={`absolute top-0 inset-x-0 h-16 ${glowColors[post.color] ?? glowColors.slate} pointer-events-none`} />

                    <div className="relative p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${catColors[post.category] ?? catColors.Strategy}`}>
                          {post.category}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                          <Clock size={11} />
                          {post.readTime} {b.readTime}
                        </div>
                      </div>

                      <h3 className="font-bold text-slate-900 dark:text-white mb-3 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-base flex-1">
                        {post.title}
                      </h3>

                      <p className="text-sm text-slate-500 dark:text-slate-300 leading-relaxed mb-5 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50 dark:border-white/6">
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{post.date}</span>
                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                          {t.common.readMore}
                          <ArrowRight size={11} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}