"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4";

export function AboutVideoHero(): ReactNode {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = "0";
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          video.style.transition = "opacity 0.8s ease";
          video.style.opacity = "1";
        })
        .catch(() => {
          // autoplay blocked — show video anyway
          video.style.opacity = "1";
        });
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0, objectPosition: "center 60%" }}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

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
