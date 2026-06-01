"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SEGMENT = "BUILDING THE FUTURE • ";

export function WorkMarquee({ className }: { className?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const text = SEGMENT.repeat(10);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 22,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className={`overflow-hidden py-3 select-none pointer-events-none bg-background${className ? ` ${className}` : ""}`}>
      <div
        ref={trackRef}
        className="flex whitespace-nowrap will-change-transform"
        style={{ width: "200%" }}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            aria-hidden={i === 1 ? "true" : undefined}
            className="text-[4.5rem] sm:text-[6rem] md:text-[8rem] leading-none font-normal text-foreground/[0.08]"
            style={{
              fontFamily:
                "'Instrument Serif', var(--font-instrument-serif), serif",
              fontStyle: "italic",
            }}
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
