"use client";

import {
  BarChart2,
  Camera,
  Code2,
  Film,
  Globe,
  Layers,
  Megaphone,
  Share2,
  Sparkle,
  Target,
  ArrowUpRight,
  Mail,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon, ReactNode } from "react";
import { Backlight } from "@/components/ui/backlight";

const FOOTER_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_114316_1c7889ad-2885-410e-b493-98119fee0ddb.mp4";
const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";
const WORK_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4";

const TEAM = [
  { name: "Vedant Kachhawa", role: "Founder & CEO", initials: "VK", photo: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780270962/vedant_perf_headshot_picture_fxzuzv.jpg" },
  { name: "Siddhant Nair",   role: "Director (Client Relations)", initials: "SN", photo: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780270566/siddhant_mkjumd.jpg" },
];

type ServiceIcon = { icon: LucideIcon; label: string };

const SERVICES: ServiceIcon[] = [
  { icon: Camera,    label: "Content"    },
  { icon: Target,    label: "Campaigns"  },
  { icon: Film,      label: "Production" },
  { icon: Share2,    label: "Social"     },
  { icon: Layers,    label: "Strategy"   },
  { icon: BarChart2, label: "Planning"   },
  { icon: Code2,     label: "Web Dev"    },
  { icon: Globe,     label: "Branding"   },
  { icon: Megaphone, label: "Ads"        },
];

function SectionLabel({
  children,
  align = "center",
}: {
  children: string;
  align?: "center" | "start";
}): ReactNode {
  return (
    <div className={`flex items-center gap-2 text-white/60 ${align === "center" ? "justify-center" : "justify-start"}`}>
      <Sparkle className="h-3 w-3 shrink-0 text-white/40" strokeWidth={1.5} />
      <span className="text-[10px] uppercase tracking-[0.25em] font-medium">
        {children}
      </span>
      <Sparkle className="h-3 w-3 shrink-0 text-white/40" strokeWidth={1.5} />
    </div>
  );
}

export function StudioFeatures(): ReactNode {
  return (
    <section className="mx-auto w-full max-w-275 px-6 pb-20 sm:px-10 sm:pb-28">
      <div
        className="rounded-3xl overflow-hidden p-4 sm:p-5 md:p-5"
        style={{ background: "#080808" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">

          {/* ── Col 1: TEAM ─────────────────────────────────── */}
          <Backlight blur={5} className="h-full">
            <div className="relative overflow-hidden rounded-2xl bg-black flex flex-col h-full min-h-[480px] md:min-h-[520px]">
              <video
                autoPlay loop muted playsInline aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover opacity-55"
              >
                <source src={FOOTER_VIDEO} type="video/mp4" />
              </video>
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.78) 70%, rgba(0,0,0,0.92) 100%)" }}
                aria-hidden="true"
              />

              <div className="relative z-10 p-5 sm:p-6">
                <SectionLabel>The Team</SectionLabel>
              </div>

              <div className="relative z-10 mt-auto p-5 sm:p-6 pb-6">
                <div className="flex flex-col gap-3.5">
                  {TEAM.map((m) => (
                    <div key={m.name} className="flex items-center gap-3">
                      <span className="relative inline-flex h-9 w-9 shrink-0 overflow-hidden rounded-xl bg-white/10">
                        <Image src={m.photo} alt={m.name} fill sizes="36px" className="object-cover object-top" />
                      </span>
                      <Sparkle className="h-2.5 w-2.5 text-white/30 shrink-0" strokeWidth={1.5} />
                      <span className="flex-1 text-[13px] font-medium text-white/90 tracking-tight">{m.name}</span>
                      <span className="text-[11px] text-white/40 tracking-tight">{m.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Backlight>

          {/* ── Col 2: Testimonial + Stats ───────────────────── */}
          <div className="flex flex-col gap-3 md:gap-4">

            {/* Testimonial */}
            <Backlight blur={5}>
              <div
                className="noise-overlay relative overflow-hidden rounded-2xl p-5 sm:p-6 flex flex-col gap-4"
                style={{ background: "#111111" }}
              >
                <SectionLabel align="start">Client Voice</SectionLabel>
                <p className="text-[13.5px] leading-[1.65] text-white/80 flex-1 italic"
                   style={{ fontFamily: "'Instrument Serif', var(--font-instrument-serif), serif" }}>
                  &ldquo;Rigel brought our vision to life in a way we never
                  thought possible. The level of craft and intentionality they
                  brought to every frame was remarkable.&rdquo;
                </p>
                <p className="text-[12px] text-white/45 not-italic" style={{ fontFamily: "var(--font-dm-sans, sans-serif)" }}>
                  <strong className="text-white/70 font-semibold">TOTEM</strong>
                  {" "}— Dubai
                </p>
              </div>
            </Backlight>

            {/* Stats */}
            <Backlight blur={5}>
              <div className="relative overflow-hidden rounded-2xl bg-black flex flex-col items-center justify-center flex-1 min-h-[200px] p-5">
                <video
                  autoPlay loop muted playsInline aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                >
                  <source src={HERO_VIDEO} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <span
                    className="text-[80px] sm:text-[96px] font-light leading-none tracking-tight text-white"
                    style={{ textShadow: "0 2px 32px rgba(0,0,0,0.6)" }}
                  >
                    15+
                  </span>
                  <span className="text-[12px] text-white/60 tracking-wide uppercase">
                    Brand campaigns produced
                  </span>
                </div>
              </div>
            </Backlight>
          </div>

          {/* ── Col 3: Services + Reach ──────────────────────── */}
          <div className="flex flex-col gap-3 md:gap-4">

            {/* Services */}
            <Backlight blur={5}>
              <div className="relative overflow-hidden rounded-2xl bg-black flex flex-col flex-1 min-h-[280px]">
                <video
                  autoPlay loop muted playsInline aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                >
                  <source src={WORK_VIDEO} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

                <div className="relative z-10 p-5 sm:p-6 pb-4">
                  <SectionLabel>Here&rsquo;s what we do</SectionLabel>
                </div>

                {/* Static icon grid — 3 columns */}
                <div className="relative z-10 mt-auto p-5 pb-5 sm:p-6 sm:pb-6">
                  <div className="grid grid-cols-3 gap-2.5">
                    {SERVICES.map((s) => {
                      const Icon = s.icon;
                      return (
                        <div
                          key={s.label}
                          className="flex flex-col items-center justify-center gap-1.5 rounded-xl py-3 px-2"
                          style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(8px)" }}
                        >
                          <Icon className="h-5 w-5 text-white/75" strokeWidth={1.5} aria-hidden="true" />
                          <span className="text-[9px] uppercase tracking-wider text-white/45">{s.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Backlight>

            {/* Reach */}
            <Backlight blur={5}>
              <div
                className="noise-overlay relative overflow-hidden rounded-2xl p-5 sm:p-6"
                style={{ background: "#111111" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <SectionLabel align="start">Reach Us</SectionLabel>
                  <Link
                    href="/contact"
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-white/18 transition-colors"
                    aria-label="Go to contact page"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5 text-white/70" strokeWidth={1.5} />
                  </Link>
                </div>
                <div className="mt-4 flex flex-col gap-2.5">
                  <a
                    href="mailto:vedant@rigelstudios.co"
                    className="flex items-center gap-2 text-[13px] text-white/60 hover:text-white transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                    vedant@rigelstudios.co
                  </a>
                  <a
                    href="https://wa.me/971504142689"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[13px] text-white/60 hover:text-white transition-colors"
                  >
                    <MessageCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                    +971 50 414 2689
                  </a>
                </div>
              </div>
            </Backlight>
          </div>

        </div>
      </div>
    </section>
  );
}
