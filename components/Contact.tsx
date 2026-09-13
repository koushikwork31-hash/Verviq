"use client";

import { useState, type FormEvent } from "react";
import Reveal from "./ui/Reveal";
import SectionTag from "./ui/SectionTag";

const interests = [
  "Campus Training",
  "Mock Interviews",
  "Placement Bootcamp",
  "College Partnership",
  "Other",
];

type FormState = {
  name: string;
  org: string;
  role: string;
  email: string;
  phone: string;
  students: string;
  interest: string;
  message: string;
};

const initial: FormState = {
  name: "",
  org: "",
  role: "",
  email: "",
  phone: "",
  students: "",
  interest: "",
  message: "",
};

const inputCls =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/35 outline-none transition-all focus:border-volt focus:ring-4 focus:ring-volt/15";

const labelCls = "mb-1.5 block font-display text-xs font-semibold uppercase tracking-wider text-ink/60";

export default function Contact() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);

  const set = (key: keyof FormState) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((err) => ({ ...err, [key]: undefined }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Please tell us your name.";
    if (!form.org.trim()) next.org = "College or organization is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.interest) next.interest = "Pick what you're interested in.";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSent(true);
    }
  };

  return (
    <section id="contact" className="section-pad bg-cream">
      <div className="wrap grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* left copy */}
        <Reveal>
          <SectionTag>Contact</SectionTag>
          <h2 className="mt-5 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Let&apos;s <span className="gradient-text">talk.</span>
          </h2>
          <p className="mt-5 max-w-md text-lg text-ink/60">
            Whether you&apos;re a TPO, principal, HR lead or a student with questions — the
            conversation starts here.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-white p-5">
              <span className="text-xl">⚡</span>
              <div>
                <p className="font-display text-sm font-bold text-ink">Fast response</p>
                <p className="mt-1 text-sm text-ink/55">We reply within one working day.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-white p-5">
              <span className="text-xl">🎓</span>
              <div>
                <p className="font-display text-sm font-bold text-ink">Built for campuses</p>
                <p className="mt-1 text-sm text-ink/55">
                  Programs shaped around your calendar and placement season.
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-ink p-5 font-mono text-xs leading-relaxed text-white/70">
              <span className="text-sky">&gt;</span> your_interviewer has entered the chat
              <span className="animate-blink text-flame">▊</span>
            </div>
          </div>
        </Reveal>

        {/* form card */}
        <Reveal delay={150}>
          <div className="rounded-3xl border border-ink/10 bg-white p-7 shadow-[0_20px_60px_-20px_rgba(10,15,44,0.2)] sm:p-9">
            {sent ? (
              <div className="animate-pop flex min-h-[480px] flex-col items-center justify-center text-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-mint/15 text-4xl">
                  ✅
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold text-ink">Message received!</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/55">
                  Thanks, {form.name.split(" ")[0] || "friend"} — this is a demo form, so nothing was
                  actually sent. In the live version, our team would get back to you within one
                  working day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(initial);
                    setSent(false);
                  }}
                  className="btn btn-ghost mt-8"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="cl-name" className={labelCls}>Name *</label>
                    <input id="cl-name" type="text" value={form.name} onChange={set("name")} placeholder="Priya Sharma" className={inputCls} />
                    {errors.name && <p className="mt-1.5 text-xs font-medium text-flame">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="cl-org" className={labelCls}>College / Organization *</label>
                    <input id="cl-org" type="text" value={form.org} onChange={set("org")} placeholder="ABC Institute of Technology" className={inputCls} />
                    {errors.org && <p className="mt-1.5 text-xs font-medium text-flame">{errors.org}</p>}
                  </div>
                  <div>
                    <label htmlFor="cl-role" className={labelCls}>Role</label>
                    <input id="cl-role" type="text" value={form.role} onChange={set("role")} placeholder="TPO / Principal / Student" className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="cl-email" className={labelCls}>Email *</label>
                    <input id="cl-email" type="email" value={form.email} onChange={set("email")} placeholder="you@college.edu" className={inputCls} />
                    {errors.email && <p className="mt-1.5 text-xs font-medium text-flame">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="cl-phone" className={labelCls}>Phone</label>
                    <input id="cl-phone" type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="cl-students" className={labelCls}>Number of Students</label>
                    <input id="cl-students" type="text" value={form.students} onChange={set("students")} placeholder="e.g. 250" className={inputCls} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="cl-interest" className={labelCls}>I&apos;m interested in *</label>
                    <select id="cl-interest" value={form.interest} onChange={set("interest")} className={`${inputCls} appearance-none`}>
                      <option value="">Select an option…</option>
                      {interests.map((i) => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                    {errors.interest && <p className="mt-1.5 text-xs font-medium text-flame">{errors.interest}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="cl-message" className={labelCls}>Message</label>
                    <textarea id="cl-message" rows={4} value={form.message} onChange={set("message")} placeholder="Tell us about your students and what you're looking for…" className={`${inputCls} resize-none`} />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary mt-7 w-full !py-3.5 !text-base">
                  Start the Conversation →
                </button>
                <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink/35">
                  demo form · no data is sent yet
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
