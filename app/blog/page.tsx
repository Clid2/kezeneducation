import type { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog & Resources — SAT & IELTS Study Guides",
  description: "Free SAT and IELTS study guides from the Kezen Education team.",
};

export default function Page() {
  return <BlogPageClient />;
}
