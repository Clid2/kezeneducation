"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { useI18n } from "@/lib/i18n-context";

interface Section {
  heading: string;
  body: string | string[];
}

export default function PrivacyPageClient() {
  const { t } = useI18n();

  const sections: Section[] = [
    {
      heading: "1. Introduction",
      body: "Kezen Education ('we', 'our', 'us') is committed to protecting your personal information. This Privacy Policy explains what data we collect, how we use it, and your rights regarding your personal data. By using our Platform, you agree to the practices described in this policy."
    },
    {
      heading: "2. Information We Collect",
      body: [
        "We collect the following categories of personal data:",
        "Identity & Contact: Full name, email address, phone number, city of residence",
        "Enrollment Information: Program of interest, diagnostic test results, learning goals",
        "Usage Data: Pages visited, lesson completion rates, mock test scores, time on platform",
        "Device & Technical Data: IP address, browser type, operating system, session duration",
        "Communications: Messages submitted through contact forms, email correspondence",
        "Cookies & Tracking: Session cookies, analytics cookies (see Cookie section below)",
      ]
    },
    {
      heading: "3. How We Use Your Information",
      body: [
        "Your personal information is used strictly for the following purposes:",
        "To enroll you in the correct program and track your learning progress",
        "To communicate with you about your preparation, schedule, and results",
        "To contact you about your inquiry if you submit a form",
        "To improve our curriculum, platform features, and student experience",
        "To send educational updates and resources (you may opt out at any time)",
        "To comply with legal obligations under the laws of Kazakhstan",
      ]
    },
    {
      heading: "4. Contact Form & Lead Storage",
      body: "When you submit a contact or enrollment form on our website, the data you provide (name, email, phone, program interest, and message) is securely stored in our internal systems. This data is accessed only by the Kezen Education team for the purpose of following up with your inquiry. We do not sell, trade, or rent this data to any third parties."
    },
    {
      heading: "5. Cookies and Analytics",
      body: "Our Platform uses cookies and similar tracking technologies to improve user experience and measure site performance. We use Google Analytics to understand how visitors use our website. This data is anonymized and aggregated — we do not use analytics to identify individual users. You may disable cookies in your browser settings; however, some platform features may not function correctly."
    },
    {
      heading: "6. Third-Party Services",
      body: [
        "We use the following third-party services that may process your data:",
        "Google Analytics — website traffic analysis",
        "Stripe — payment processing (Stripe handles payment data under their own privacy policy)",
        "Kaspi Pay — local payment processing",
        "Email service providers — for sending communications",
        "These services process data according to their respective privacy policies and are contractually bound to protect your information."
      ]
    },
    {
      heading: "7. Data Retention",
      body: "We retain your personal data for as long as necessary to provide our services and fulfill our legal obligations. Student records are retained for up to 3 years after program completion. Contact form submissions are retained for up to 12 months unless you request deletion."
    },
    {
      heading: "8. Your Rights",
      body: [
        "You have the following rights regarding your personal data:",
        "Right to access — request a copy of the data we hold about you",
        "Right to rectification — request correction of inaccurate data",
        "Right to erasure — request deletion of your data in certain circumstances",
        "Right to object — object to certain types of data processing",
        "Right to withdraw consent — withdraw consent for marketing communications at any time",
        "To exercise any of these rights, email us at hello@kezen.edu.",
      ]
    },
    {
      heading: "9. Data Security",
      body: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, disclosure, alteration, or destruction. All data is transmitted over encrypted connections (HTTPS). Access to student data is restricted to authorized Kezen Education staff only."
    },
    {
      heading: "10. Children's Privacy",
      body: "Our services are available to users of all ages, including minors under 18. If you are under 18, please ensure a parent or legal guardian has reviewed this policy. We require parental consent for students under 16 to enroll in our programs. We do not knowingly collect data from children under 13 without verifiable parental consent."
    },
    {
      heading: "11. Changes to This Policy",
      body: "We may update this Privacy Policy from time to time. When we do, we will update the 'Last Updated' date at the top of this page. Material changes will be communicated to active students via email. Continued use of the Platform after changes constitutes your acceptance of the updated policy."
    },
    {
      heading: "12. Contact Us",
      body: "If you have any questions or concerns about this Privacy Policy or your personal data, please contact us: email hello@kezen.edu, phone +7 707 695 76 88, address Almaty, Kazakhstan."
    },
  ];

  return (
    <div className="pt-20 bg-white dark:bg-slate-900 min-h-screen">
      {/* Hero */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge variant="slate" className="mb-4">{t.privacy.badge}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-navy-950 dark:text-white mb-3">
              {t.privacy.title}
            </h1>
            <p className="text-sm text-slate-400 dark:text-slate-500">{t.privacy.lastUpdated}</p>
            <p className="mt-4 text-slate-500 dark:text-slate-400 leading-relaxed">{t.privacy.intro}</p>
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
              <Link href="/terms" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Terms of Service</Link>
              <Link href="/contact" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
