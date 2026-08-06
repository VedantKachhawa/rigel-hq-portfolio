import type { ReactNode } from "react";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { AmbientVideo } from "@/components/ui/ambient-video";
import { VIDEOS } from "@/lib/media";

export function ContactVideoHero(): ReactNode {
  return (
    <section className="relative isolate h-screen w-full overflow-hidden bg-black">
      {/* Background video */}
      <AmbientVideo src={VIDEOS.contactHero} className="opacity-70" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col items-start justify-end px-8 pb-16 sm:px-14 sm:pb-20">
        <p
          className="text-[11px] uppercase tracking-[0.22em] text-white/50 mb-3"
          style={{ fontFamily: "var(--font-dm-sans, sans-serif)" }}
        >
          Rigel HQ · Contact
        </p>
        <h1
          className="text-[3rem] sm:text-[4rem] md:text-[5rem] font-normal leading-[0.95] tracking-tight text-white"
          style={{ fontFamily: "'Instrument Serif', var(--font-instrument-serif), serif" }}
        >
          Let&rsquo;s work
          <br />
          <em className="not-italic text-white/50">together.</em>
        </h1>
      </div>

      <ScrollIndicator className="z-30" />

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 z-30"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, var(--background) 100%)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
