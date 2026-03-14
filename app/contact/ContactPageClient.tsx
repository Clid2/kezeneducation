"use client";

import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, AlertCircle,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useI18n } from "@/lib/i18n-context";

const inputBase =
  "w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 dark:focus:border-blue-500 transition-all";

export default function ContactPageClient() {
  const { t, locale } = useI18n();
  const c = t.contact;

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setServerError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setServerError(Array.isArray(data.errors) ? data.errors.join(" ") : c.errorMsg);
      }
    } catch {
      setServerError(c.errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const contactItems = [
    { icon: Mail, label: c.emailInfo, value: "hello@kezen.edu", href: "mailto:hello@kezen.edu" },
    { icon: Phone, label: c.phoneInfo, value: "+7 700 230 68 30", href: "tel:+77002306830" },
    { icon: MessageCircle, label: c.telegramInfo, value: c.telegram, href: "https://t.me/kezen_edu" },
    { icon: MapPin, label: c.locationInfo, value: c.location, href: "#" },
  ];

  return (
    <div className="pt-20 bg-white dark:bg-slate-900 min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge variant="blue" className="mb-5">{c.badge}</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-navy-950 dark:text-white tracking-tight mb-4"
          >
            {c.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto"
          >
            {c.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Form + info */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 rounded-2xl p-10 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-800/40 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={28} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-950 dark:text-white mb-2">{c.successTitle}</h3>
                  <p className="text-slate-500 dark:text-slate-400">{c.successDesc}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-card dark:shadow-none p-8 space-y-5">
                  <h2 className="text-xl font-bold text-navy-950 dark:text-white mb-2">{c.formTitle}</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        {c.nameLabel} <span className="text-red-500">*</span>
                      </label>
                      <input type="text" required value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputBase} placeholder={c.namePlaceholder} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{c.phoneLabel}</label>
                      <input type="tel" value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputBase} placeholder={c.phonePlaceholder} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      {c.emailLabel} <span className="text-red-500">*</span>
                    </label>
                    <input type="email" required value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputBase} placeholder={c.emailPlaceholder} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{c.programLabel}</label>
                    <select value={form.program}
                      onChange={(e) => setForm({ ...form, program: e.target.value })}
                      className={inputBase}>
                      <option value="">{c.programPlaceholder}</option>
                      {c.programOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{c.messageLabel}</label>
                    <textarea rows={4} value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${inputBase} resize-none`} placeholder={c.messagePlaceholder} />
                  </div>

                  {serverError && (
                    <div className="flex items-start gap-2.5 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl px-4 py-3">
                      <AlertCircle size={15} className="text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-600 dark:text-red-400">{serverError}</p>
                    </div>
                  )}

                  <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        {c.submit}...
                      </span>
                    ) : (
                      <><Send size={16} />{c.submit}</>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-navy-950 dark:text-white mb-5">{c.emailInfo}</h3>
                <div className="space-y-3">
                  {contactItems.map(({ icon: Icon, label, value, href }) => (
                    <a key={label} href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-start gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-card dark:shadow-none hover:shadow-card-hover transition-all duration-300 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                        <Icon size={16} className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 dark:text-slate-500">{label}</div>
                        <div className="text-sm font-semibold text-navy-950 dark:text-white mt-0.5">{value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
                <h4 className="font-semibold text-navy-950 dark:text-white mb-2">{c.diagnosticTitle}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{c.diagnosticDesc}</p>
                <div className="space-y-2">
                  {c.diagnosticFeatures.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle2 size={13} className="text-blue-500 dark:text-blue-400 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
