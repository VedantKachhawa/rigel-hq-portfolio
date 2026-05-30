"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";

type Segment = { text: string; highlight?: true };

const BODY: Segment[][] = [
  [
    { text: "Rigel HQ is a " },
    { text: "Dubai-based creative production studio", highlight: true },
    { text: " that combines intelligent execution with human direction, turning creative vision into content that resonates." },
  ],
  [
    { text: "We work at the intersection of " },
    { text: "art and commerce", highlight: true },
    { text: ". Our work speaks for itself. The brands and individuals we partner with trust us to translate their identity into " },
    { text: "moments that endure", highlight: true },
    { text: ", crafted with precision from concept to final deliverable." },
  ],
];

type WordToken = { word: string; highlight: boolean };

function buildWordList(body: Segment[][]): WordToken[] {
  const tokens: WordToken[] = [];
  for (const paragraph of body) {
    if (tokens.length > 0) {
      // paragraph break represented as two space tokens so the cascade
      // has a small gap between paragraphs
      tokens.push({ word: "\u00A0", highlight: false });
      tokens.push({ word: "\u00A0", highlight: false });
    }
    for (const seg of paragraph) {
      const words = seg.text.split(/(\s+)/);
      for (const chunk of words) {
        if (chunk === "") continue;
        tokens.push({ word: chunk, highlight: seg.highlight ?? false });
      }
    }
  }
  return tokens;
}

const WORD_TOKENS = buildWordList(BODY);
const TOTAL = WORD_TOKENS.length;

function Word({
  token,
  index,
  progress,
}: {
  token: WordToken;
  index: number;
  progress: MotionValue<number>;
}): ReactNode {
  const start = index / TOTAL;
  const end = Math.min((index + 1) / TOTAL + 0.08, 1);

  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const blur = useTransform(progress, [start, end], [4, 0]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  if (/^\s+$/.test(token.word) || token.word === "\u00A0") {
    return <span aria-hidden="true">{token.word === "\u00A0" ? <br /> : token.word}</span>;
  }

  return (
    <motion.span
      style={{ opacity, filter, display: "inline" }}
      className={
        token.highlight
          ? "font-serif italic"
          : ""
      }
    >
      {token.word}
    </motion.span>
  );
}

export function WeAreRigel(): ReactNode {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "end 0.5"],
  });

  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full max-w-4xl px-6 py-16 sm:px-10 sm:py-24"
      aria-label="About Rigel HQ"
    >
      {/* Eyebrow */}
      <div className="mb-8 flex items-center gap-4">
        <span
          className="text-[9px] uppercase tracking-[0.28em] text-foreground/35"
          style={{ fontFamily: "var(--font-sans, sans-serif)" }}
        >
          We are Rigel HQ
        </span>
        <div className="h-px flex-1 bg-foreground/10" />
      </div>

      {/* Manifesto body */}
      <p
        className="leading-[1.35] tracking-tight text-foreground"
        style={{
          fontSize: "clamp(1.1rem, 2vw, 1.75rem)",
          fontFamily: "var(--font-sans, sans-serif)",
          fontWeight: 300,
          wordBreak: "keep-all",
        }}
      >
        {WORD_TOKENS.map((token, i) => (
          <Word key={i} token={token} index={i} progress={scrollYProgress} />
        ))}
      </p>
    </section>
  );
}
