"use client";

import { motion } from "motion/react";
import { Instagram, Linkedin, Mail, Music2, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { AmbientVideo } from "@/components/ui/ambient-video";
import { VIDEOS } from "@/lib/media";


const LINKS = [
  {
    heading: "Work",
    items: [
      { label: "All Projects", href: "/projects" },
      { label: "Real Estate", href: "/projects?cat=real-estate" },
      { label: "Fashion & Luxury", href: "/projects?cat=fashion-luxury" },
      { label: "Concept Fashion", href: "/projects?cat=concept-fashion" },
      { label: "Food & Beverage", href: "/projects?cat=food-beverage" },
      { label: "Technology", href: "/projects?cat=technology" },
    ],
  },
  {
    heading: "Studio",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Our Story", href: "/about" },
      { label: "The Team", href: "/about" },
      { label: "Start a Project", href: "/contact" },
    ],
  },
  {
    heading: "Contact",
    items: [
      { label: "vedant@rigelstudios.co", href: "mailto:vedant@rigelstudios.co" },
      { label: "+971 50 414 2689", href: "tel:+971504142689" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/rigelhq", icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com/company/rigelhq", icon: Linkedin },
  { label: "TikTok", href: "https://tiktok.com/@rigelhq", icon: Music2 },
];

export function Footer(): ReactNode {
  return (
    <section className="relative w-full overflow-hidden">
      <AmbientVideo src={VIDEOS.footer} className="z-0" />

      <div className="absolute inset-0 bg-black/65 z-[1]" aria-hidden="true" />

      {/* Gradient bridge — dissolves page background into the footer video */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 z-[2]"
        style={{ height: "200px", background: "linear-gradient(to bottom, var(--background) 0%, transparent 100%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-275 mx-auto px-6 pt-28 pb-16 sm:px-10 sm:pt-40 sm:pb-20">
        <motion.footer
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="liquid-glass w-full rounded-3xl p-6 md:p-10 text-white/70"
        >
          {/* Top grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-10">
            {/* Logo + description */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Image
              src="https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780271054/Rigel_-_R_logo_uervhx.png"
              alt="Rigel HQ logo"
              width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
                <span className="text-xl font-medium text-white tracking-tight">
                  Rigel HQ
                </span>
              </div>

              <p className="text-sm leading-relaxed max-w-sm text-white/55">
                A creative studio producing video and photography for fashion
                houses, real estate developers, consumer brands, and
                individuals worldwide.
              </p>

              <div className="flex flex-col gap-2 mt-1">
                <a
                  href="mailto:vedant@rigelstudios.co"
                  className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  vedant@rigelstudios.co
                </a>
                <a
                  href="tel:+971504142689"
                  className="inline-flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  +971 50 414 2689
                </a>
              </div>
            </div>

            {/* Links */}
            <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
              {LINKS.map((col) => (
                <div key={col.heading}>
                  <p className="text-sm uppercase tracking-wider text-white font-medium mb-4">
                    {col.heading}
                  </p>
                  <ul className="space-y-2">
                    {col.items.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className="text-xs text-white/55 hover:text-white transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
            <p className="text-[10px] uppercase tracking-widest opacity-50">
              © 2026 Rigel HQ. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-widest opacity-50">
                Follow us:
              </span>
              <div className="flex items-center gap-3">
                {SOCIALS.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="opacity-70 hover:opacity-100 hover:text-white transition-all"
                  >
                    <Icon size={16} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
