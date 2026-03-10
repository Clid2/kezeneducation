import type { Metadata } from "next";
import SATPageClient from "./SATPageClient";

export const metadata: Metadata = {
  title: "SAT Preparation — 36-Lesson Structured Program",
  description: "Comprehensive SAT preparation program.",
};

export default function Page() {
  return <SATPageClient />;
}
