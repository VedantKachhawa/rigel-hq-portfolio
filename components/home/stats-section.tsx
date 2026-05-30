"use client";
import { motion } from "motion/react";
import { NumberTicker } from "@/components/ui/number-ticker";

const STATS = [
  { value: 13, suffix: "+", label: "Projects Delivered" },
  { value: 4,  suffix: "",   label: "Industries Served" },
  { value: 100, suffix: "%", label: "In-House Creative" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function StatsSection() {
  return (
    <section className="px-6 sm:px-10 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-275">
        <div className="flex flex-wrap justify-center gap-10 sm:gap-16 border-t border-foreground/8 pt-12">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
              className="flex flex-col gap-2"
            >
              <span
                className="text-4xl sm:text-5xl font-normal leading-none tracking-tight text-foreground"
                style={{
                  fontFamily: "'Instrument Serif', var(--font-instrument-serif), serif",
                  fontStyle: "italic",
                }}
              >
                <NumberTicker
                  value={stat.value}
                  delay={i * 0.1}
                  className="text-4xl sm:text-5xl font-normal leading-none tracking-tight text-foreground"
                  style={{
                    fontFamily: "'Instrument Serif', var(--font-instrument-serif), serif",
                    fontStyle: "italic",
                  }}
                />
                {stat.suffix}
              </span>
              <span
                className="text-[11px] uppercase tracking-[0.2em] text-foreground/35"
                style={{ fontFamily: "var(--font-dm-sans, sans-serif)" }}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
