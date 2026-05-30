"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { features } from "@/lib/config";

gsap.registerPlugin(ScrollTrigger);

const LENIS_OPTIONS = {
  duration: 1.6,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
};

function scrollToTop(lenis: Lenis | null): void {
  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
    return;
  }
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

export function SmoothScroll({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof history !== "undefined") {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (!features.smoothScroll) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis(LENIS_OPTIONS);
    lenisRef.current = lenis;

    // Keep ScrollTrigger in sync with Lenis virtual scroll position
    const gsapTickerFn = (time: number) => { lenis.raf(time * 1000); };
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(gsapTickerFn);
    gsap.ticker.lagSmoothing(0);

    function handleAnchorClick(e: MouseEvent): void {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const element = document.querySelector(href);
      if (!element) return;

      e.preventDefault();
      lenis.scrollTo(element as HTMLElement, { offset: -100 });
    }

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(gsapTickerFn);
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    scrollToTop(lenisRef.current);
  }, [pathname]);

  return <>{children}</>;
}
