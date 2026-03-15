"use client";

import { cn } from "@/lib/utils";
import { forwardRef, cloneElement, isValidElement, Children } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, asChild = false, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none";

    const variants = {
      primary:
        "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-sm hover:shadow-blue",
      secondary:
        "bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-700 shadow-sm dark:bg-slate-700 dark:hover:bg-slate-600",
      ghost:
        "text-slate-700 hover:bg-slate-100 active:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800 dark:active:bg-slate-700",
      outline:
        "border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 active:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800",
    };

    const sizes = {
      sm: "text-sm px-4 py-2 h-9",
      md: "text-sm px-5 py-2.5 h-10",
      lg: "text-base px-7 py-3 h-12",
    };

    const composedClassName = cn(base, variants[variant], sizes[size], className);

    // asChild: merge styles into the single child element (e.g. <Link>)
    if (asChild) {
      const child = Children.only(children);
      if (isValidElement(child)) {
        return cloneElement(child as React.ReactElement<{ className?: string }>, {
          className: cn(composedClassName, (child.props as { className?: string }).className),
        });
      }
    }

    return (
      <button
        ref={ref}
        className={composedClassName}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;