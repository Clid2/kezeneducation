"use client";

import { ThemeProvider } from "next-themes";
import { I18nProvider } from "@/lib/i18n-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <I18nProvider>{children}</I18nProvider>
    </ThemeProvider>
  );
}
