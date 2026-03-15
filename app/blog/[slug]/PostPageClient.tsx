"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
import type { Post } from "@/lib/posts";

interface Props {
  post: Post;
}

const catColors: Record<string, string> = {
  SAT: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
  IELTS: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300",
  Strategy: "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300",
};

const accentColors: Record<string, string> = {
  blue: "bg-blue-500",
  green: "bg-emerald-500",
  slate: "bg-slate-400",
};

/**
 * Renders markdown-like content:
 *  ## Heading   → <h2>
 *  **text**     → <strong>
 *  Blank line   → paragraph break
 */
function renderContent(raw: string) {
  const paragraphs = raw.split(/\n\n+/);

  return paragraphs.map((block, i) => {
    const trimmed = block.trim();

    // ## Heading
    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="text-xl font-bold text-navy-950 dark:text-white mt-8 mb-3"
        >
          {trimmed.slice(3)}
        </h2>
      );
    }

    // Regular paragraph — handle **bold** inline
    const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p
        key={i}
        className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4"
      >
        {parts.map((part, j) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={j} className="font-semibold text-navy-950 dark:text-white">
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        })}
      </p>
    );
  });
}

export default function PostPageClient({ post }: Props) {
  return (
    <div className="pt-20 bg-white dark:bg-slate-900 min-h-screen">
      {/* Hero stripe */}
      <div className={`h-1.5 w-full ${accentColors[post.color]}`} />

      {/* Back link */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          Назад к блогу
        </Link>
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Category badge */}
          <span
            className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-6 ${
              catColors[post.category] ?? catColors.Strategy
            }`}
          >
            {post.category}
          </span>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-950 dark:text-white leading-tight mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-400 dark:text-slate-500 mb-10 pb-8 border-b border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1.5">
              <User size={13} />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {post.readTime} мин чтения
            </span>
          </div>

          {/* Excerpt */}
          <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-8 italic border-l-4 border-blue-200 dark:border-blue-800 pl-5">
            {post.excerpt}
          </p>

          {/* Content */}
          <div>{renderContent(post.content)}</div>
        </motion.div>

        {/* CTA */}
        <div className="mt-16 p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 text-center">
          <h3 className="font-bold text-navy-950 dark:text-white text-lg mb-2">
            Готовы применить это на практике?
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-5">
            Пройдите бесплатную диагностику — подберём программу под ваш уровень.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-blue-600 text-white font-medium text-sm px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Пройти диагностику бесплатно
          </Link>
        </div>
      </article>
    </div>
  );
}
