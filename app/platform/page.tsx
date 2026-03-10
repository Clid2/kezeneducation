import type { Metadata } from "next";
import PlatformPageClient from "./PlatformPageClient";

export const metadata: Metadata = {
  title: "Learning Platform — Dashboard, Mocks & More",
  description: "Explore the Kezen learning platform.",
};

export default function Page() {
  return <PlatformPageClient />;
}
