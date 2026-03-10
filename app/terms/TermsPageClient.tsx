"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { useI18n } from "@/lib/i18n-context";

interface Section {
  heading: string;
  body: string | string[];
}

export default function TermsPageClient() {
  const { t } = useI18n();

  const sections: Section[] = [
    {
      heading: "1. Acceptance of Terms",
      body: "By accessing or using the Kezen Education platform (\"Platform\"), registering for any course, or submitting any contact or enrollment form, you agree to be bound by these Terms of Service and all applicable laws. If you do not agree with these terms, please do not use our services."
    },
    {
      heading: "2. Description of Services",
      body: [
        "Kezen Education provides online and hybrid test preparation services for the SAT and IELTS examinations. Our services include, but are not limited to:",
        "Structured group and individual lessons delivered via online platforms",
        "Access to a student dashboard, mock tests, and the Mistake Bank",
        "Progress tracking, leaderboard participation, and points/prizes system",
        "Free diagnostic test assessments",
        "Educational content, resources, and blog articles",
      ]
    },
    {
      heading: "3. Enrollment and Payment",
      body: "Enrollment in any Kezen Education program is subject to availability and diagnostic placement. Fees are quoted in Kazakhstani Tenge (₸) unless otherwise stated. Payment must be completed before the start of your program. We accept Kaspi Pay, Stripe (Visa/Mastercard), and direct bank transfer. Installment plans may be available through Kaspi — please contact us for details."
    },
    {
      heading: "4. Refund Policy",
      body: "Refunds are available within 7 calendar days of program start if less than 20% of lessons have been completed. After this period, no refunds will be issued. If Kezen Education cancels a program without alternative scheduling, a full refund will be provided. All refund requests must be submitted to hello@kezen.edu."
    },
    {
      heading: "5. Student Conduct",
      body: "Students are expected to attend scheduled lessons, complete assigned homework, and engage respectfully with teachers and peers. Kezen Education reserves the right to remove any student from a program without refund for misconduct, dishonesty, or abuse of platform systems."
    },
    {
      heading: "6. Intellectual Property",
      body: "All content on the Kezen Education Platform — including lesson materials, mock test questions, written guides, and visual assets — is the intellectual property of Kezen Education. You may not reproduce, distribute, or commercially exploit any content without prior written permission."
    },
    {
      heading: "7. Gamification and Prizes",
      body: "Points, lottery tickets, and prizes earned through the Kezen gamification system have no monetary value outside of the system. Prizes are awarded at Kezen Education's discretion. The company reserves the right to modify prize structures with 30 days' notice."
    },
    {
      heading: "8. Data and Privacy",
      body: "Your use of this Platform is also governed by our Privacy Policy. By using our services, you consent to the collection and use of information as described therein."
    },
    {
      heading: "9. Limitation of Liability",
      body: "Kezen Education does not guarantee any specific score improvement or exam outcome. Our programs are designed to maximize your preparation, but final results depend on individual effort, exam conditions, and other factors beyond our control. To the maximum extent permitted by law, Kezen Education shall not be liable for any indirect, incidental, or consequential damages."
    },
    {
      heading: "10. Modifications",
      body: "Kezen Education reserves the right to update these Terms of Service at any time. Continued use of the Platform after changes constitutes acceptance of the revised terms. We will notify active students of material changes via email."
    },
    {
      heading: "11. Governing Law",
      body: "These Terms of Service are governed by the laws of the Republic of Kazakhstan. Any disputes shall be resolved through good-faith negotiation, and if necessary, through the competent courts of Almaty, Kazakhstan."
    },
    {
      heading: "12. Contact",
      body: "For any questions regarding these Terms, contact us at hello@kezen.edu or by phone at +7 707 695 76 88."
    },
  ];

  return (
    <div className="pt-20 bg-white dark:bg-slate-900 min-h-screen">
      {/* Hero */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge variant="slate" className="mb-4">{t.terms.badge}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-navy-950 dark:text-white mb-3">
              {t.terms.title}
            </h1>
            <p className="text-sm text-slate-400 dark:text-slate-500">{t.terms.lastUpdated}</p>
            <p className="mt-4 text-slate-500 dark:text-slate-400 leading-relaxed">{t.terms.intro}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="prose prose-slate dark:prose-invert max-w-none"
          >
            {sections.map((section) => (
              <div key={section.heading} className="mb-8">
                <h2 className="text-lg font-bold text-navy-950 dark:text-white mb-3">{section.heading}</h2>
                {Array.isArray(section.body) ? (
                  <div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-3">{section.body[0]}</p>
                    <ul className="space-y-1.5 pl-1">
                      {section.body.slice(1).map((item) => (
                        <li key={item} className="flex items-start gap-2 text-slate-600 dark:text-slate-400 text-sm">
                          <span className="text-blue-500 mt-1.5 flex-shrink-0">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{section.body}</p>
                )}
              </div>
            ))}
          </motion.div>

          <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm text-slate-400 dark:text-slate-500">
            <span>© {new Date().getFullYear()} Kezen Education</span>
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Privacy Policy</Link>
              <Link href="/contact" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
