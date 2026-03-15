import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "О нас — Наша миссия",
  description: "Learn about Kezen Education's mission.",
};

export default function Page() {
  return <AboutPageClient />;
}
