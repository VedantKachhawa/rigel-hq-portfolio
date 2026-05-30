"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const WORDS = ["Create", "Produce", "Elevate", "Inspire"];

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const duration = 2700;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(progress * 100));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => onCompleteRef.current(), 400);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % WORDS.length), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col overflow-hidden select-none">
      {/* Top-left label */}
      <motion.p
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute top-8 left-8 sm:top-10 sm:left-10 text-[11px] text-white/40 uppercase tracking-[0.3em]"
        style={{ fontFamily: "var(--font-dm-sans, sans-serif)" }}
      >
        Rigel HQ
      </motion.p>

      {/* Center cycling word */}
      <div className="flex-1 flex items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="text-5xl sm:text-7xl lg:text-8xl text-white/80"
            style={{
              fontFamily: "'Instrument Serif', var(--font-instrument-serif), serif",
              fontStyle: "italic",
            }}
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bottom-right counter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="absolute bottom-12 right-8 sm:bottom-16 sm:right-10 pointer-events-none"
      >
        <span
          className="text-7xl sm:text-9xl text-white tabular-nums leading-none"
          style={{ fontFamily: "'Instrument Serif', var(--font-instrument-serif), serif" }}
        >
          {String(count).padStart(3, "0")}
        </span>
      </motion.div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10">
        <div
          className="h-full origin-left"
          style={{
            background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)",
            transform: `scaleX(${count / 100})`,
            boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)",
            transition: "transform 100ms linear",
          }}
        />
      </div>
    </div>
  );
}
