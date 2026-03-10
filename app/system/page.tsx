import type { Metadata } from "next";
import SystemPageClient from "./SystemPageClient";

export const metadata: Metadata = {
  title: "Our System — The Kezen Learning Model",
  description: "Learn about the Kezen 6-step learning model.",
};

export default function Page() {
  return <SystemPageClient />;
}
