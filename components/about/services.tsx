"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState, type ReactNode } from "react";

const SERVICES = [
  {
    index: "01",
    name: "Content Production",
    tagline: "Photos and video built for impact",
    detail: "From concept to final cut — stills, reels, brand films, and editorial shoots crafted for the brands that define culture.",
  },
  {
    index: "02",
    name: "Ad Campaigns",
    tagline: "Creative that converts",
    detail: "Full-funnel campaign production: scripts, shoots, edits, and deliverables optimised for every platform and placement.",
  },
  {
    index: "03",
    name: "Website Development",
    tagline: "2D and 3D, built to perform",
    detail: "Websites that look like nothing else on the internet — interactive, fast, and built to represent the brands behind them.",
  },
  {
    index: "04",
    name: "Social Media Management",
    tagline: "Growth with intention",
    detail: "Strategy, content, scheduling, and community — everything needed to build a presence that actually means something.",
  },
  {
    index: "05",
    name: "Strategy and Planning",
    tagline: "Research-led, results-driven",
    detail: "Market research, creative direction, and campaign planning that align your content with the outcomes you actually care about.",
  },
];

function ServiceRow({
  service,
  index: rowIndex,
  isLast,
}: {
  service: (typeof SERVICES)[0];
  index: number;
  isLast: boolean;
}): ReactNode {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: rowIndex * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative ${!isLast ? "border-b border-foreground/8" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start gap-6 py-7 sm:gap-10 sm:py-8">
        {/* Number */}
        <motion.span
          className="shrink-0 pt-1 font-mono text-[11px] tracking-widest text-foreground/25 select-none"
          animate={{ opacity: hovered ? 0.7 : 0.25 }}
          transition={{ duration: 0.25 }}
        >
          {service.index}
        </motion.span>

        {/* Main content */}
        <div className="flex flex-1 flex-col gap-1.5 min-w-0">
          <motion.h3
            className="text-[1.5rem] font-medium leading-tight tracking-tight text-foreground sm:text-[1.75rem]"
            animate={{ x: hovered ? 6 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {service.name}
          </motion.h3>

          <motion.p
            className="text-[13px] tracking-tight text-foreground/45"
            animate={{ opacity: hovered ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {service.tagline}
          </motion.p>

          <motion.p
            className="text-[14px] leading-relaxed tracking-tight text-foreground/60 max-w-[52ch]"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={
              hovered
                ? { opacity: 1, height: "auto", marginTop: 8 }
                : { opacity: 0, height: 0, marginTop: 0 }
            }
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {service.detail}
          </motion.p>
        </div>

        {/* Arrow */}
        <motion.span
          className="shrink-0 pt-2 text-foreground/20 select-none text-lg"
          animate={{ x: hovered ? 4 : 0, opacity: hovered ? 0.8 : 0.2 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          →
        </motion.span>
      </div>

      {/* Hover background */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-xl bg-foreground/[0.03]"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

export function Services(): ReactNode {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-40px" });

  return (
    <section className="mx-auto w-full max-w-160 px-6 pb-16 sm:px-10 sm:pb-20">
      <motion.div
        ref={headingRef}
        initial={{ opacity: 0, y: 16 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-2"
      >
        <h2 className="text-[22px] font-semibold tracking-tight text-foreground">
          Here&rsquo;s what we do
        </h2>
        <p className="mt-1 text-[14px] text-foreground/45 tracking-tight">
          Five disciplines. One studio.
        </p>
      </motion.div>

      <div className="mt-6">
        {SERVICES.map((s, i) => (
          <ServiceRow
            key={s.index}
            service={s}
            index={i}
            isLast={i === SERVICES.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
