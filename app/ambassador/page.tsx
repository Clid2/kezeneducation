import type { Metadata } from "next";
import AmbassadorPageClient from "./AmbassadorPageClient";

export const metadata: Metadata = {
  title: "Ambassador Program — Represent Kezen Education",
  description: "Join the Kezen Ambassador Program.",
};

export default function Page() {
  return <AmbassadorPageClient />;
}
