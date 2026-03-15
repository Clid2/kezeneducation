"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { useI18n } from "@/lib/i18n-context";
import { useEffect, useState } from "react";
import type { Post } from "@/lib/posts";

const catColors: Record<string, string> = {
  SAT: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
  IELTS: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300",
  Strategy: "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300",
};

const accentColors: Record<string, string> = {
  blue: "bg-blue-500",
  green: "bg-emerald-500",
  slate: "bg-slate-300 dark:bg-slate-600",
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
    <div className="pt-20 bg-white dark:bg-slate-900">
      {/* Hero */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge variant="blue" className="mb-5">{b.badge}</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-navy-950 dark:text-white tracking-tight mb-4"
          >
            {b.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto"
          >
            {b.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-64 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse" />
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
                  transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
                >
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-card dark:shadow-none hover:shadow-card-hover transition-all duration-300 overflow-hidden group h-full"
                  >
                    <div className={`h-2 w-full ${accentColors[post.color] ?? accentColors.slate}`} />
                    <div className="p-6 flex flex-col h-[calc(100%-8px)]">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${catColors[post.category] ?? catColors.Strategy}`}>
                          {post.category}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                          <Clock size={11} />
                          {post.readTime} {b.readTime}
                        </div>
                      </div>
                      <h3 className="font-bold text-navy-950 dark:text-white mb-3 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xs text-slate-400 dark:text-slate-500">{post.date}</span>
                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:gap-1.5 transition-all">
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
