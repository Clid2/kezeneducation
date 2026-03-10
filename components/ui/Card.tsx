import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

export default function Card({ children, className, hover = false, padding = "md" }: CardProps) {
  const paddings = { sm: "p-4", md: "p-6", lg: "p-8" };

  return (
    <div className={cn(
      "bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-card dark:shadow-none",
      hover && "transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer dark:hover:border-slate-600",
      paddings[padding],
      className
    )}>
      {children}
    </div>
  );
}
