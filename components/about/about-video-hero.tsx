"use client";

import type { ReactNode } from "react";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { AmbientVideo } from "@/components/ui/ambient-video";
import { VIDEOS } from "@/lib/media";


export function AboutVideoHero(): ReactNode {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <AmbientVideo
        src={VIDEOS.aboutHero}
        style={{ objectPosition: "center 60%" }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true" />

      {/* Bottom gradient fade into page background */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 z-10"
        style={{ background: "linear-gradient(to bottom, transparent 0%, var(--background) 100%)" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex h-full min-h-screen flex-col items-start justify-end px-8 pb-16 sm:px-14 sm:pb-20">
        <p
          className="text-[11px] uppercase tracking-[0.22em] text-white/50 mb-3"
          style={{ fontFamily: "var(--font-dm-sans, sans-serif)" }}
        >
          Rigel HQ · Studio
        </p>
        <h1
          className="text-[3rem] sm:text-[4rem] md:text-[5rem] font-normal leading-[0.95] tracking-tight text-white"
          style={{
            fontFamily: "'Instrument Serif', var(--font-instrument-serif), serif",
          }}
        >
          Where craft
          <br />
          <em className="not-italic text-white/50">meets vision.</em>
        </h1>
      </div>

      <ScrollIndicator />
    </div>
  );
}
