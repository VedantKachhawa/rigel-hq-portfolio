import type { ReactNode } from "react";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4";

export function ProjectsHero(): ReactNode {
  return (
    <section className="relative isolate h-screen w-full overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        src={VIDEO_SRC}
      />
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

      <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-start justify-end px-8 pb-16 sm:px-14 sm:pb-20">
        <p
          className="text-[11px] uppercase tracking-[0.22em] text-white/50 mb-3"
          style={{ fontFamily: "var(--font-dm-sans, sans-serif)" }}
        >
          Rigel HQ · Work
        </p>
        <h1
          className="text-[3rem] sm:text-[4rem] md:text-[5rem] font-normal leading-[0.95] tracking-tight text-white"
          style={{
            fontFamily: "'Instrument Serif', var(--font-instrument-serif), serif",
          }}
        >
          Our work,
          <br />
          <em className="not-italic text-white/50">built to last.</em>
        </h1>
      </div>

      <ScrollIndicator />
    </section>
  );
}
