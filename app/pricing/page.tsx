import type { Metadata } from "next";
import PricingPageClient from "./PricingPageClient";

export const metadata: Metadata = {
  title: "Programs & Pricing — SAT & IELTS Preparation",
  description: "Choose your SAT or IELTS preparation program.",
};

export default function Page() {
  return <PricingPageClient />;
}
