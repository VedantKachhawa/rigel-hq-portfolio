"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS, CATEGORY_LABELS } from "@/lib/projects";
import { motion, useInView } from "motion/react";
import { Backlight } from "@/components/ui/backlight";

gsap.registerPlugin(ScrollTrigger);

const FEATURED = PROJECTS.slice(0, 5);
const LEFT_PROJECTS  = FEATURED.slice(0, 3);
const RIGHT_PROJECTS = FEATURED.slice(3);

const EASE = [0.22, 1, 0.36, 1] as const;

function ProjectCard({ project, size = "normal" }: { project: (typeof PROJECTS)[0]; size?: "normal" | "large" }) {
  const Icon = project.icon;
  return (
    <Backlight blur={18}>
    <Link
      href={`/projects/${project.id}`}
      className="group relative block overflow-hidden rounded-2xl border border-foreground/8 bg-foreground/4 cursor-pointer pointer-events-auto"
      style={{ aspectRatio: size === "large" ? "4/3" : "3/4" }}
    >
      {/* Image */}
      <Image
        src={project.cardImage}
        alt={project.cardImageAlt}
        fill
        sizes="320px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-107"
        style={{ objectPosition: project.cardImagePosition ?? "center" }}
        unoptimized
      />

      {/* Halftone overlay */}
      <div
        className="absolute inset-0 opacity-15 mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "4px 4px" }}
        aria-hidden="true"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-400" aria-hidden="true" />

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-[12px] font-medium text-black backdrop-blur-sm">
            <Icon className="h-3 w-3" />
            <em className="not-italic" style={{ fontFamily: "'Instrument Serif', var(--font-instrument-serif), serif" }}>
              {project.iconLabel}
            </em>
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-black">
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
        <p className="mt-2 text-[11px] text-white/50 uppercase tracking-wider">
          {CATEGORY_LABELS[project.category]}
        </p>
      </div>
    </Link>
    </Backlight>
  );
}

export function HomeBento() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const inView     = useInView(headerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      /* Natural page scroll moves the cards through the viewport.
         GSAP only adds a small speed differential between columns. */
      gsap.to(leftRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      gsap.fromTo(
        rightRef.current,
        { y: 80 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.8,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── DESKTOP: Sticky viewport + GSAP-driven columns ── */}
      <section
        ref={sectionRef}
        className="relative hidden md:block"
        style={{ height: "280vh" }}
      >
        {/* Sticky center — stays pinned at viewport center the whole scroll */}
        <div
          className="sticky top-0 h-screen flex items-center justify-center z-30 pointer-events-none"
        >
          <div
            ref={headerRef}
            className="flex flex-col items-center text-center px-8 max-w-lg pointer-events-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EASE }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-6 h-px bg-foreground/20" />
              <span
                className="text-[11px] uppercase tracking-[0.28em] text-foreground/40"
                style={{ fontFamily: "var(--font-dm-sans, sans-serif)" }}
              >
                Selected Work
              </span>
              <div className="w-6 h-px bg-foreground/20" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: EASE }}
              className="text-[3rem] md:text-[4rem] font-normal leading-[1.02] tracking-tight text-foreground mb-6"
              style={{
                fontFamily:
                  "'Instrument Serif', var(--font-instrument-serif), serif",
              }}
            >
              Featured{" "}
              <em className="not-italic text-foreground/35">projects</em>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              className="text-sm text-foreground/45 leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-dm-sans, sans-serif)" }}
            >
              From fashion houses to real estate — content
              <br />we&rsquo;re proud to have made.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            >
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 px-6 py-2.5 text-[13px] text-foreground/60 hover:text-foreground hover:border-foreground/35 transition-all duration-300"
              >
                View all work
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Left column — absolute in the section so natural scroll carries it upward.
            Starts at 100vh so it enters from below when section top hits viewport top. */}
        <div
          ref={leftRef}
          className="absolute left-[5%] lg:left-[7%] w-[25%] flex flex-col gap-5 z-10 pointer-events-auto"
          style={{ top: "100vh", willChange: "transform" }}
        >
          {LEFT_PROJECTS.map((project, i) => (
            <div key={project.id} style={{ rotate: `${i % 2 === 0 ? -1.5 : 1}deg` }}>
              <ProjectCard project={project} size={i % 3 === 1 ? "large" : "normal"} />
            </div>
          ))}
        </div>

        {/* Right column — starts 40vh lower than left for stagger depth */}
        <div
          ref={rightRef}
          className="absolute right-[5%] lg:right-[7%] w-[25%] flex flex-col gap-5 z-10 pointer-events-auto"
          style={{ top: "140vh", willChange: "transform" }}
        >
          {RIGHT_PROJECTS.map((project, i) => (
            <div key={project.id} style={{ rotate: `${i % 2 === 0 ? 1.5 : -1}deg` }}>
              <ProjectCard project={project} size={i % 3 === 2 ? "large" : "normal"} />
            </div>
          ))}
        </div>
      </section>

      {/* ── MOBILE: simple grid ── */}
      <section className="md:hidden px-6 py-16">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-foreground/20" />
            <span className="text-[11px] uppercase tracking-[0.28em] text-foreground/40"
              style={{ fontFamily: "var(--font-dm-sans, sans-serif)" }}>
              Selected Work
            </span>
          </div>
          <h2 className="text-[2.4rem] font-normal leading-[1.02] tracking-tight text-foreground"
            style={{ fontFamily: "'Instrument Serif', var(--font-instrument-serif), serif" }}>
            Featured{" "}
            <em className="not-italic text-foreground/35">projects</em>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {FEATURED.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-6 py-2.5 text-[13px] text-foreground/60">
            View all work <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
