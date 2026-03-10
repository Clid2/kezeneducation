import type { Metadata } from "next";
import TermsPageClient from "./TermsPageClient";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Kezen Education — SAT & IELTS preparation platform.",
};

export default function TermsPage() {
  return <TermsPageClient />;
}
