import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact — Take a Free Diagnostic Test",
  description:
    "Contact Kezen Education to take a free diagnostic test, ask questions about programs, or learn how to enroll.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
