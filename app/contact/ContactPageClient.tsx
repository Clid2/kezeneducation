"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2, AlertCircle, ArrowRight,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import { useI18n } from "@/lib/i18n-context";

const inputBase =
  "w-full px-4 py-3 text-sm bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 dark:focus:border-blue-500/60 transition-all duration-200";

export default function ContactPageClient() {
  const { t, locale } = useI18n();
  const c = t.contact;

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", program: "", message: "" });

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
      if (data.success) setSubmitted(true);
      else setServerError(Array.isArray(data.errors) ? data.errors.join(" ") : c.errorMsg);
    } catch {
      setServerError(c.errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const contactItems = [
    { icon: Mail,          label: c.emailInfo,    value: "hello@kezen.edu",  href: "mailto:hello@kezen.edu", color: "blue" },
    { icon: Phone,         label: c.phoneInfo,    value: "+7 700 230 68 30", href: "tel:+77002306830",        color: "emerald" },
    { icon: MessageCircle, label: c.telegramInfo, value: c.telegram,          href: "https://t.me/kezen_edu", color: "indigo" },
    { icon: MapPin,        label: c.locationInfo, value: c.location,          href: "#",                      color: "amber" },
  ];

  const iconColors: Record<string, string> = {
    blue:    "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-500/20 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20",
    emerald: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-500/20",
    indigo:  "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-500/20 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20",
    amber:   "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-500/20 group-hover:bg-amber-100 dark:group-hover:bg-amber-500/20",
  };

  return (
    <div className="pt-20 bg-white dark:bg-[#06091a] min-h-screen">

      {/* ── HERO ── */}
      <section className="relative py-24 overflow-hidden bg-[#f5f7ff] dark:bg-[#06091a]">
        <div className="absolute -top-20 -right-20 w-[500px] h-[400px] rounded-full bg-blue-200/60 blur-3xl pointer-events-none dark:hidden" />
        <div className="absolute bottom-0 -left-20 w-[400px] h-[300px] rounded-full bg-indigo-200/50 blur-3xl pointer-events-none dark:hidden" />
        <div className="absolute -top-40 right-0 w-[500px] h-[350px] rounded-full bg-blue-500/12 blur-3xl pointer-events-none hidden dark:block" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full bg-indigo-500/8 blur-3xl pointer-events-none hidden dark:block" />
        <div className="absolute inset-0 bg-grid opacity-20 dark:opacity-10 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge variant="blue" className="mb-6 text-sm px-5 py-2">{c.badge}</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mb-5 leading-[1.08]"
          >
            {c.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto"
          >
            {c.subtitle}
          </motion.p>
        </div>
        <div className="h-12 bg-gradient-to-b from-transparent to-white dark:to-[#06091a] pointer-events-none mt-8" />
      </section>

      {/* ── FORM + INFO ── */}
      <section className="relative py-16 bg-white dark:bg-[#06091a] overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-blue-400/4 dark:bg-blue-500/6 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[250px] bg-indigo-400/4 dark:bg-indigo-500/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 items-start">

            {/* ── FORM ── */}
            <motion.div
              initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-3"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="bg-emerald-50 dark:bg-[#0d1424] border border-emerald-200 dark:border-emerald-500/25 rounded-2xl p-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={28} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{c.successTitle}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{c.successDesc}</p>
                </motion.div>
              ) : (
                <div className="bg-white dark:bg-[#0d1424] rounded-2xl border border-slate-100 dark:border-white/10 shadow-sm p-8">
                  {/* top accent */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent rounded-t-2xl" />

                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">{c.formTitle}</h2>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                          {c.nameLabel} <span className="text-red-500 normal-case">*</span>
                        </label>
                        <input type="text" required value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className={inputBase} placeholder={c.namePlaceholder} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                          {c.phoneLabel}
                        </label>
                        <input type="tel" value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className={inputBase} placeholder={c.phonePlaceholder} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                        {c.emailLabel} <span className="text-red-500 normal-case">*</span>
                      </label>
                      <input type="email" required value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputBase} placeholder={c.emailPlaceholder} />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                        {c.programLabel}
                      </label>
                      <select value={form.program}
                        onChange={(e) => setForm({ ...form, program: e.target.value })}
                        className={`${inputBase} cursor-pointer`}>
                        <option value="">{c.programPlaceholder}</option>
                        {c.programOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                        {c.messageLabel}
                      </label>
                      <textarea rows={4} value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className={`${inputBase} resize-none`} placeholder={c.messagePlaceholder} />
                    </div>

                    {serverError && (
                      <div className="flex items-start gap-2.5 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-xl px-4 py-3">
                        <AlertCircle size={15} className="text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-red-600 dark:text-red-400">{serverError}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors duration-200 group"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          {c.submit}...
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          {c.submit}
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>

            {/* ── INFO ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="lg:col-span-2 space-y-4"
            >
              {/* Contact cards */}
              {contactItems.map(({ icon: Icon, label, value, href, color }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-[#0d1424] rounded-2xl border border-slate-100 dark:border-white/10 hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-md transition-all duration-200 group"
                >
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 transition-colors ${iconColors[color]}`}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">{label}</div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{value}</div>
                  </div>
                  {href !== "#" && (
                    <ArrowRight size={14} className="ml-auto text-slate-300 dark:text-slate-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  )}
                </motion.a>
              ))}

              {/* Diagnostic info */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="bg-blue-50 dark:bg-[#0d1424] rounded-2xl border border-blue-100 dark:border-blue-500/20 p-6 mt-2"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center">
                    <CheckCircle2 size={13} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{c.diagnosticTitle}</h4>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{c.diagnosticDesc}</p>
                <div className="space-y-2">
                  {c.diagnosticFeatures.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}