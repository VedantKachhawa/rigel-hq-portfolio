"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "motion/react";
import { CardNav } from "@/components/layout/card-nav";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { AmbientVideo } from "@/components/ui/ambient-video";
import { VIDEOS } from "@/lib/media";

gsap.registerPlugin(ScrollTrigger);


// Original cloud transition asset (overhangs into the dark spacer above the hero).
// daklr2whx currently 401s — re-upload cloude_ws7l3z.png to a working host and update this URL.
const CLOUD_SRC =
  "https://res.cloudinary.com/daklr2whx/image/upload/v1778597725/cloude_ws7l3z.png";

function HeroCloud() {
  return (
    <img
      src={CLOUD_SRC}
      alt=""
      className="w-full h-auto block"
      referrerPolicy="no-referrer"
    />
  );
}

export function Hero(): ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);

  // Cloud parallax — maps section scroll progress to upward Y movement.
  // As the hero enters the viewport the clouds part, revealing the video beneath.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const cloudYDesktop = useTransform(scrollYProgress, [0, 0.4], [0, -130]);
  const cloudYMobile  = useTransform(scrollYProgress, [0, 0.4], [0,  -40]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section opacity scrubs 1:1 with scroll — pauses if you stop scrolling
      gsap.fromTo(sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top 25%",
            scrub: 1.2,
          },
        }
      );

      // Text staggers in once section is mostly visible (time-based, fires once)
      gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 45%",
          once: true,
        },
      })
        .fromTo(titleRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.9 })
        .fromTo(subRef.current,
          { opacity: 0, filter: "blur(4px)" },
          { opacity: 1, filter: "blur(0px)", duration: 0.75 }, "-=0.5")
        .fromTo(ctaRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 }, "-=0.4")
        .fromTo(scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 }, "-=0.3");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-visible" style={{ opacity: 0 }}>

      {/* Cloud — straddles the top edge (–50% above section), parting as you scroll.
          Desktop and mobile have different parallax magnitudes.
          Tailwind v4 `translate` property + Motion `transform` don't conflict. */}
      <motion.div
        style={{ y: cloudYDesktop, translateY: "-67%" }}
        className="pointer-events-none absolute top-0 left-0 w-full z-[100] hidden md:block"
        aria-hidden="true"
      >
        <HeroCloud />
      </motion.div>
      <motion.div
        style={{ y: cloudYMobile, translateY: "-67%" }}
        className="pointer-events-none absolute top-0 left-0 w-full z-[100] block md:hidden"
        aria-hidden="true"
      >
        <HeroCloud />
      </motion.div>

      <AmbientVideo src={VIDEOS.homeHero} className="z-0" />

      <div className="absolute inset-0 bg-black/25 z-[1]" aria-hidden="true" />

      {/* Thin top gradient backs the cloud with darkness so it reads on any background */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 z-[2]"
        style={{ height: "22%", background: "linear-gradient(to bottom, #0a0608 0%, transparent 100%)" }}
        aria-hidden="true"
      />

      {/* Bottom gradient — fades hero into page background */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-56 z-[2]"
        style={{ background: "linear-gradient(to bottom, transparent 0%, var(--background) 100%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <div className="pt-20 md:pt-28">
          <CardNav />
        </div>

        <div className="flex flex-col items-center justify-center text-center px-6 pt-28 pb-44 flex-1">

          <h1
            ref={titleRef}
            className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] max-w-7xl font-normal text-white"
            style={{
              fontFamily: "'Instrument Serif', var(--font-instrument-serif), serif",
              letterSpacing: "-2.46px",
            }}
          >
            Premium content for{" "}
            <em className="not-italic text-white/50">brands that define culture.</em>
          </h1>

          <p
            ref={subRef}
            className="text-white/50 text-sm sm:text-base max-w-xl mt-8 leading-[1.7]"
            style={{ fontFamily: "var(--font-dm-sans, sans-serif)" }}
          >
            Combining human creative direction with intelligent execution —
            delivering content that moves people and campaigns that perform.
          </p>

          <div ref={ctaRef} className="mt-12 flex flex-col sm:flex-row items-center gap-4">
            <Link href="/projects" className="group relative rounded-full text-sm px-8 py-3.5 font-medium transition-all duration-300 hover:scale-105">
              <span
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(90deg, #89AACC, #4E85BF)", padding: "1.5px" }}
                aria-hidden="true"
              >
                <span className="absolute inset-[1.5px] rounded-full bg-black" />
              </span>
              <span className="relative z-10 flex items-center gap-2 bg-white text-black group-hover:bg-transparent group-hover:text-white rounded-full px-8 py-3.5 -mx-8 -my-3.5 transition-all duration-300">
                See Works
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="-rotate-45 transition-transform group-hover:rotate-0 duration-300">
                  <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>

            <Link href="/contact" className="group relative rounded-full text-sm px-8 py-3.5 font-medium transition-all duration-300 hover:scale-105">
              <span className="absolute inset-0 rounded-full border-2 border-white/25 group-hover:border-transparent transition-colors duration-300" aria-hidden="true" />
              <span
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(90deg, #89AACC, #4E85BF)", padding: "1.5px" }}
                aria-hidden="true"
              >
                <span className="absolute inset-[1.5px] rounded-full bg-black/80 backdrop-blur-sm" />
              </span>
              <span className="relative z-10 text-white">Reach Us</span>
            </Link>
          </div>
        </div>
      </div>

      <ScrollIndicator ref={scrollRef} style={{ opacity: 0 }} />
    </section>
  );
}
