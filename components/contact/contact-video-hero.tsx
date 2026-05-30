import type { ReactNode } from "react";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4";

export function ContactVideoHero(): ReactNode {
  return (
    <section className="relative isolate h-screen w-full overflow-hidden bg-black">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        src={VIDEO_SRC}
      />

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
