import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Courses from "@/components/sections/Courses";
import ResultWallPreview from "@/components/sections/ResultWallPreview";
import PlatformPreview from "@/components/sections/PlatformPreview";
import Gamification from "@/components/sections/Gamification";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Kezen Education — SAT & IELTS Preparation Platform",
  description:
    "The most systematic SAT & IELTS preparation platform. Structured preparation, real score growth, transparent progress tracking.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <Courses />
      <ResultWallPreview />
      <PlatformPreview />
      <Gamification />
      <CTA />
    </>
  );
}
