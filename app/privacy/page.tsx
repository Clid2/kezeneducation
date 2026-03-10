import type { Metadata } from "next";
import PrivacyPageClient from "./PrivacyPageClient";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Kezen Education — how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
