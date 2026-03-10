import type { Metadata } from "next";
import ResultsPageClient from "./ResultsPageClient";

export const metadata: Metadata = {
  title: "Result Wall — Real Student Score Improvements",
  description: "See real score improvements from Kezen Education students.",
};

export default function Page() {
  return <ResultsPageClient />;
}
