"use client";
import { motion } from "framer-motion";
import Badge from "./Badge";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  badgeVariant?: "blue" | "green" | "amber" | "slate" | "navy";
}

export default function SectionHeader({
  badge, title, subtitle, centered = true, className, badgeVariant = "blue",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(centered && "text-center", "mb-16", className)}
    >
      {badge && (
        <div className={cn("mb-4", centered && "flex justify-center")}>
          <Badge variant={badgeVariant}>{badge}</Badge>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-navy-950 dark:text-white tracking-tight text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-slate-500 dark:text-slate-400 max-w-2xl text-balance leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
