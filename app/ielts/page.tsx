import type { Metadata } from "next";
import IELTSPageClient from "./IELTSPageClient";

export const metadata: Metadata = {
  title: "IELTS Preparation — All 4 Skills Covered",
  description: "Comprehensive IELTS preparation covering Listening, Reading, Writing, and Speaking.",
};

export default function Page() {
  return <IELTSPageClient />;
}
