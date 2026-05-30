"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SEGMENT = "PREMIUM CONTENT \u2022 CREATIVE DIRECTION \u2022 VISUAL STORYTELLING \u2022 RIGEL HQ \u2022 ";

export function MarqueeStrip() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 28,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  const text = SEGMENT.repeat(12);

  return (
    <div className="overflow-hidden border-y border-foreground/8 py-[14px]">
      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform" style={{ width: "200%" }}>
        <span
          className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-foreground/25 font-medium"
          style={{ fontFamily: "var(--font-dm-sans, sans-serif)" }}
        >
          {text}
        </span>
        <span
          className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-foreground/25 font-medium"
          aria-hidden="true"
          style={{ fontFamily: "var(--font-dm-sans, sans-serif)" }}
        >
          {text}
        </span>
      </div>
    </div>
  );
}
