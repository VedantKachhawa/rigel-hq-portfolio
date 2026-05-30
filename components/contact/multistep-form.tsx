"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Check, Loader2, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: "you",     title: "About You"   },
  { id: "project", title: "The Project" },
  { id: "details", title: "Details"     },
];

const PROJECT_TYPES = [
  "Content Production",
  "Ad Campaign",
  "Website Development",
  "Social Media Management",
  "Strategy & Planning",
  "Other",
];

const DELIVERABLES = [
  "Social Media Edit",
  "Photoshoot",
  "Photo & Video",
  "Website",
  "Social Media Package",
  "Other",
];

const CONTACT_PREFS = ["Email", "WhatsApp", "Phone call"];

const INDUSTRIES = [
  "Real Estate",
  "Fashion & Luxury",
  "Food & Beverage",
  "Technology",
  "Healthcare",
  "Retail",
  "Other",
];

interface FormData {
  name: string;
  email: string;
  company: string;
  industry: string;
  projectType: string;
  deliverable: string;
  message: string;
  contactPref: string;
}

const slideVariants = {
  hidden:  (dir: number) => ({ opacity: 0, x: dir * 48 }),
  visible: { opacity: 1, x: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
  exit:    (dir: number) => ({ opacity: 0, x: dir * -48, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }),
};

function RadioCard({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "w-full rounded-xl border px-4 py-3 text-left text-[14px] tracking-tight transition-colors duration-150",
        selected
          ? "border-foreground/40 bg-foreground/8 text-foreground"
          : "border-foreground/10 bg-foreground/2 text-foreground/60 hover:border-foreground/20 hover:text-foreground/80",
      )}
    >
      <span className="flex items-center gap-3">
        <span
          className={cn(
            "inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
            selected ? "border-foreground bg-foreground" : "border-foreground/25",
          )}
        >
          {selected && <span className="h-1.5 w-1.5 rounded-full bg-background" />}
        </span>
        {label}
      </span>
    </motion.button>
  );
}

export function MultistepContactForm() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "", email: "", company: "", industry: "",
    projectType: "", deliverable: "",
    message: "", contactPref: "",
  });

  const set = (key: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm(prev => ({ ...prev, [key]: e.target.value }));

  const setVal = (key: keyof FormData, value: string) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const isValid = () => {
    if (step === 0) return form.name.trim() !== "" && form.email.trim() !== "" && form.company.trim() !== "" && form.industry !== "";
    if (step === 1) return form.projectType !== "" && form.deliverable !== "";
    return form.message.trim() !== "" && form.contactPref !== "";
  };

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const fireConfetti = () => {
    const end = Date.now() + 4000;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };
    const rand = (a: number, b: number) => Math.random() * (b - a) + a;
    const iv = window.setInterval(() => {
      const left = end - Date.now();
      if (left <= 0) return clearInterval(iv);
      const count = 40 * (left / 4000);
      confetti({ ...defaults, particleCount: count, origin: { x: rand(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount: count, origin: { x: rand(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch { /* silently continue */ }

    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company / Brand: ${form.company}`,
      `Industry: ${form.industry}`,
      `Project Type: ${form.projectType}`,
      `Deliverable: ${form.deliverable}`,
      `Preferred Contact: ${form.contactPref}`,
      "",
      form.message,
    ].join("\n");
    const subject = encodeURIComponent(`Project Inquiry — ${form.company || form.name}`);
    window.location.href = `mailto:vedant@rigelstudios.co?subject=${subject}&body=${encodeURIComponent(body)}`;

    fireConfetti();
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-start gap-5 rounded-3xl border border-foreground/8 bg-foreground/2 p-10"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background">
          <Check className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-xl font-medium tracking-tight text-foreground">Message sent.</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-foreground/60">
            Your email client should have opened with the details filled in. If not, drop us a line at{" "}
            <a href="mailto:vedant@rigelstudios.co" className="text-foreground underline underline-offset-2">
              vedant@rigelstudios.co
            </a>.
          </p>
        </div>
        <button
          type="button"
          onClick={() => { setSubmitted(false); setStep(0); setForm({ name:"",email:"",company:"",industry:"",projectType:"",deliverable:"",message:"",contactPref:"" }); }}
          className="text-sm text-foreground/40 hover:text-foreground transition-colors"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* ── Progress bar ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-3"
      >
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => i < step && go(i)}
              className={cn(
                "flex items-center gap-2 text-[12px] font-medium uppercase tracking-widest transition-colors",
                i === step ? "text-foreground" : i < step ? "text-foreground/50 hover:text-foreground/70" : "text-foreground/20",
              )}
            >
              <span
                className={cn(
                  "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] transition-all duration-300",
                  i < step
                    ? "border-foreground/40 bg-foreground/10 text-foreground"
                    : i === step
                    ? "border-foreground bg-foreground text-background"
                    : "border-foreground/15 text-foreground/20",
                )}
              >
                {i < step ? <Check className="h-2.5 w-2.5" /> : i + 1}
              </span>
              <span className="hidden sm:inline">{s.title}</span>
            </button>
          ))}
        </div>
        <div className="h-px w-full overflow-hidden rounded-full bg-foreground/8">
          <motion.div
            className="h-full bg-foreground/40"
            initial={{ width: 0 }}
            animate={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </motion.div>

      {/* ── Step content ── */}
      <div className="rounded-3xl border border-foreground/8 bg-foreground/2">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="p-7 sm:p-9"
          >
            {/* Step 1 */}
            {step === 0 && (
              <div className="flex flex-col gap-5">
                <div>
                  <h3 className="text-[1.15rem] font-medium tracking-tight text-foreground">Tell us about yourself</h3>
                  <p className="mt-1 text-[13.5px] text-foreground/45">We&apos;ll get back to you within 24 hours.</p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FieldGroup label="Full Name" required>
                    <input type="text" placeholder="Your name" required value={form.name} onChange={set("name")} className="input-field" />
                  </FieldGroup>
                  <FieldGroup label="Email" required>
                    <input type="email" placeholder="you@example.com" required value={form.email} onChange={set("email")} className="input-field" />
                  </FieldGroup>
                </div>
                <FieldGroup label="Company / Brand" required>
                  <input type="text" placeholder="Your brand or company" required value={form.company} onChange={set("company")} className="input-field" />
                </FieldGroup>
                <FieldGroup label="Industry" required>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {INDUSTRIES.map((ind, i) => (
                      <motion.div
                        key={ind}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: i * 0.04, duration: 0.3 } }}
                      >
                        <RadioCard label={ind} selected={form.industry === ind} onClick={() => setVal("industry", ind)} />
                      </motion.div>
                    ))}
                  </div>
                </FieldGroup>
              </div>
            )}

            {/* Step 2 */}
            {step === 1 && (
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-[1.15rem] font-medium tracking-tight text-foreground">The project</h3>
                  <p className="mt-1 text-[13.5px] text-foreground/45">What are we making together?</p>
                </div>
                <FieldGroup label="Project Type" required>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {PROJECT_TYPES.map((t, i) => (
                      <motion.div
                        key={t}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: i * 0.04, duration: 0.3 } }}
                      >
                        <RadioCard label={t} selected={form.projectType === t} onClick={() => setVal("projectType", t)} />
                      </motion.div>
                    ))}
                  </div>
                </FieldGroup>
                <FieldGroup label="Deliverable" required>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {DELIVERABLES.map((d, i) => (
                      <motion.div
                        key={d}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: i * 0.04 + 0.1, duration: 0.3 } }}
                      >
                        <RadioCard label={d} selected={form.deliverable === d} onClick={() => setVal("deliverable", d)} />
                      </motion.div>
                    ))}
                  </div>
                </FieldGroup>
              </div>
            )}

            {/* Step 3 */}
            {step === 2 && (
              <div className="flex flex-col gap-5">
                <div>
                  <h3 className="text-[1.15rem] font-medium tracking-tight text-foreground">Final details</h3>
                  <p className="mt-1 text-[13.5px] text-foreground/45">Tell us more and how to reach you.</p>
                </div>
                <FieldGroup label="Message" required>
                  <textarea
                    placeholder="Tell us about your project, timeline, and goals..."
                    required
                    rows={4}
                    value={form.message}
                    onChange={set("message")}
                    className="input-field resize-none"
                  />
                </FieldGroup>
                <FieldGroup label="Preferred contact method" required>
                  <div className="flex flex-wrap gap-2">
                    {CONTACT_PREFS.map((c, i) => (
                      <motion.div
                        key={c}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: i * 0.06, duration: 0.3 } }}
                      >
                        <RadioCard label={c} selected={form.contactPref === c} onClick={() => setVal("contactPref", c)} />
                      </motion.div>
                    ))}
                  </div>
                </FieldGroup>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Navigation ── */}
      <div className="flex items-center justify-between">
        <motion.button
          type="button"
          onClick={() => go(step - 1)}
          disabled={step === 0}
          whileHover={{ scale: step === 0 ? 1 : 1.04 }}
          whileTap={{ scale: step === 0 ? 1 : 0.96 }}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-5 py-2.5 text-[13px] font-medium tracking-tight transition-colors",
            step === 0
              ? "border-foreground/5 text-foreground/20 cursor-default"
              : "border-foreground/12 text-foreground/60 hover:border-foreground/25 hover:text-foreground",
          )}
        >
          <ChevronLeft className="h-3.5 w-3.5" /> Back
        </motion.button>

        {step < STEPS.length - 1 ? (
          <motion.button
            type="button"
            onClick={() => isValid() && go(step + 1)}
            disabled={!isValid()}
            whileHover={{ scale: isValid() ? 1.04 : 1 }}
            whileTap={{ scale: isValid() ? 0.96 : 1 }}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-6 py-2.5 text-[13px] font-medium tracking-tight transition-all",
              isValid()
                ? "bg-foreground text-background hover:opacity-90"
                : "bg-foreground/10 text-foreground/30 cursor-default",
            )}
          >
            Next <ChevronRight className="h-3.5 w-3.5" />
          </motion.button>
        ) : (
          <motion.button
            type="submit"
            disabled={!isValid() || submitting}
            whileHover={{ scale: isValid() && !submitting ? 1.04 : 1 }}
            whileTap={{ scale: isValid() && !submitting ? 0.96 : 1 }}
            className={cn(
              "group inline-flex items-center gap-2 rounded-full px-7 py-2.5 text-[13px] font-medium tracking-tight transition-all",
              isValid() && !submitting
                ? "bg-foreground text-background hover:opacity-90"
                : "bg-foreground/10 text-foreground/30 cursor-default",
            )}
          >
            {submitting ? (
              <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Sending…</>
            ) : (
              <>Send message <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" /></>
            )}
          </motion.button>
        )}
      </div>

      <p className="text-[11px] text-foreground/25 tracking-tight">
        Step {step + 1} of {STEPS.length} — {STEPS[step].title}
      </p>
    </form>
  );
}

function FieldGroup({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-medium uppercase tracking-widest text-foreground/40">
        {label}{required && <span className="ml-0.5 text-foreground/25">*</span>}
      </label>
      {children}
    </div>
  );
}
