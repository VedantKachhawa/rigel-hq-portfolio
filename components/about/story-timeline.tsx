"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const STORY = [
  {
    year: "2020",
    headline: "It started with a lens.",
    body: "A passion for visual storytelling led to freelancing — editing videos for esports organisations, content creators, and brands across the globe.",
  },
  {
    year: "2021",
    headline: "The studio takes shape.",
    body: "Rigel HQ was founded with a clear vision: build a creative production studio that refuses to compromise on quality, regardless of the brief.",
  },
  {
    year: "2023",
    headline: "First real proof.",
    body: "TOTEM and Call Me Krazy became the first real clients — proving the studio could deliver campaign-level content at a professional standard.",
  },
  {
    year: "2024",
    headline: "The roster expands.",
    body: "Supreme, Hershey's, Malabar, Orphic, Fizzbears — the client list grows across categories and the studio's identity sharpens.",
  },
  {
    year: "2026",
    headline: "Eyes on the world.",
    body: "DIOR, Ralph Lauren, Jacob & Co, ALDAR, SOL, Sobha — Rigel HQ now operates on a global stage from its base in Dubai, UAE.",
  },
];

export function StoryTimeline(): ReactNode {
  return (
    <>
      <h2 className="mb-10 text-[15px] font-semibold tracking-tight text-foreground">
        Our story
      </h2>
      <ol className="relative flex flex-col gap-0">
        {STORY.map((beat, i) => (
          <motion.li
            key={beat.year}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.5,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex gap-6 pb-10 last:pb-0"
          >
            {/* Timeline connector */}
            {i < STORY.length - 1 && (
              <span
                className="absolute left-[23px] top-12 bottom-0 w-px bg-foreground/8"
                aria-hidden="true"
              />
            )}

            {/* Year badge */}
            <div className="relative z-10 flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-2xl border border-foreground/8 bg-background">
              <span className="text-[11px] font-semibold tracking-wider text-foreground/50">
                {beat.year}
              </span>
            </div>

            {/* Content */}
            <div className="pt-2.5 flex flex-col gap-1">
              <h3 className="text-[17px] font-semibold tracking-tight text-foreground">
                {beat.headline}
              </h3>
              <p className="text-[14px] leading-[1.65] tracking-tight text-foreground/60">
                {beat.body}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </>
  );
}
