import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Kezen Education — Our Mission",
  description: "Learn about Kezen Education's mission.",
};

export default function Page() {
  return <AboutPageClient />;
}
