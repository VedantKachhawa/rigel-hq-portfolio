"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";

// ─── Assets ────────────────────────────────────────────────────────────────────
const PORTAL_BG     = "https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1779707217/image_1_vdzwae.png";
const CURTAIN_LEFT  = "https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1779706559/curtain_left_znkmva.png";
const CURTAIN_RIGHT = "https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1779706564/curtain_right_paeyym.png";
const WORLD_BG      = "https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1779706392/image_2_gkcdlx.png";
const BOTTOM_CLOUDS = "https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1779706555/bottom_clouds_xskut6.png";
const REEL_CARDS = [
  { label: "ALDAR",         href: "/projects/aldar",         poster: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780272541/ALDAR_coverpage_brvjsd.png" },
  { label: "TOTEM",         href: "/projects/totem",         poster: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268160/WhatsApp_Image_2026-05-26_at_2.56.36_AM_1_vazmeg.jpg" },
  { label: "Hershey's",     href: "/projects/hersheys",      poster: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780272319/Hershey_coverpage_qfr96q.png" },
  { label: "Call Me Krazy", href: "/projects/call-me-krazy", poster: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780269508/WhatsApp_Image_2026-05-25_at_3.34.03_AM_5_mcahol.jpg" },
] as const;

// ─── Card data ─────────────────────────────────────────────────────────────────
const ARC_CARDS = [
  { title: "Content Production",  desc: "Photos and video built for impact",       color: "#f3cdd6" },
  { title: "Ad Campaigns",        desc: "Creative that converts",                  color: "#dcedc2" },
  { title: "Website Development", desc: "2D and 3D, built to perform",             color: "#c3e3f4" },
  { title: "Social Media",        desc: "Growth with intention",                   color: "#f0e4c0" },
  { title: "Strategy & Planning", desc: "Research-led, results-driven",            color: "#dcd2f2" },
  { title: "Video Production",    desc: "Cinematic storytelling at every scale",   color: "#f3cdd6" },
  { title: "Photography",         desc: "Stills that hold attention",              color: "#c3e3f4" },
  { title: "Brand Identity",      desc: "Visual systems built to endure",          color: "#f0e4c0" },
  { title: "Creative Direction",  desc: "Concept to final deliverable",            color: "#dcedc2" },
] as const;
type ArcCard = (typeof ARC_CARDS)[number];

// ─── Parallax magnitudes ───────────────────────────────────────────────────────
const MAG = { world: 6, clouds: 9, portal: 7, curtainL: 14, curtainR: 14 };

// Delay all entrance animations to play after the loading screen clears
const ENTRANCE_OFFSET = 3200;

// ─── Helpers ───────────────────────────────────────────────────────────────────
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
const lerp      = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp     = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

// ─── useIsMobile ───────────────────────────────────────────────────────────────
function useIsMobile() {
  const [v, setV] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setV(mq.matches);
    const h = (e: MediaQueryListEvent) => setV(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  return v;
}

// ─── PlayButton ────────────────────────────────────────────────────────────────
function PlayButton({ size = 26 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width={size * 0.38} height={size * 0.45} viewBox="0 0 10 12" fill="none">
        <path d="M1 1L9 6L1 11V1Z" fill="#111" />
      </svg>
    </div>
  );
}

// ─── MiniCard ──────────────────────────────────────────────────────────────────
function MiniCard({
  imgUrl,
  size,
  borderRadius,
  children,
}: {
  imgUrl: string;
  size: number;
  borderRadius: number;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius,
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60%",
          background:
            "linear-gradient(to top,rgba(0,0,0,0.72) 0%,rgba(0,0,0,0.3) 50%,transparent 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "44%",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          maskImage: "linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 100%)",
        }}
      />
      {children}
    </div>
  );
}

// ─── ArcCardSlider ─────────────────────────────────────────────────────────────
function ArcCardSlider({
  cards,
  rotationOffsetRef,
  isMobile,
}: {
  cards: readonly ArcCard[];
  rotationOffsetRef: React.RefObject<number>;
  isMobile: boolean;
}) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>(
    new Array(cards.length).fill(null) as null[],
  );

  useEffect(() => {
    const spacing  = isMobile ? 12 : 9;
    const center   = Math.floor(cards.length / 2);
    const radius   = isMobile ? 700 : 1100;
    const cw       = isMobile ? 160 : 220;
    const botOff   = isMobile ? 140 : 200;

    let raf: number;
    const loop = () => {
      const offset = rotationOffsetRef.current ?? 0;
      cards.forEach((_, i) => {
        const el = cardRefs.current[i];
        if (!el) return;
        const deg = (i - center) * spacing - offset + center * spacing;
        const rad = (deg * Math.PI) / 180;
        const x   = Math.sin(rad) * radius;
        const y   = radius - Math.cos(rad) * radius;
        el.style.bottom    = `${-y + botOff}px`;
        el.style.left      = `calc(50% + ${x}px - ${cw / 2}px)`;
        el.style.transform = `rotate(${deg}deg)`;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isMobile, cards, rotationOffsetRef]);

  const spacing  = isMobile ? 12 : 9;
  const center   = Math.floor(cards.length / 2);
  const radius   = isMobile ? 700 : 1100;
  const cw       = isMobile ? 160 : 220;
  const ch       = isMobile ? 175 : 230;
  const sliderH  = isMobile ? 260 : 360;
  const botOff   = isMobile ? 140 : 200;
  const br       = isMobile ? 18 : 26;

  return (
    <div style={{ position: "relative", width: "100%", height: sliderH, overflow: "hidden" }}>
      {cards.map((card, i) => {
        const deg0 = (i - center) * spacing + center * spacing;
        const rad0 = (deg0 * Math.PI) / 180;
        const x0   = Math.sin(rad0) * radius;
        const y0   = radius - Math.cos(rad0) * radius;
        return (
          <div
            key={card.title}
            ref={(el) => { cardRefs.current[i] = el; }}
            style={{
              position: "absolute",
              bottom: -y0 + botOff,
              left: `calc(50% + ${x0}px - ${cw / 2}px)`,
              width: cw,
              height: ch,
              transform: `rotate(${deg0}deg)`,
              transformOrigin: `${cw / 2}px ${radius}px`,
              borderRadius: br,
              background: card.color,
              boxShadow: "0 8px 40px rgba(80,40,60,0.18)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                width: 24,
                height: 24,
                borderRadius: "50%",
                border: "1.5px solid rgba(80,50,60,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(80,50,60,0.6)",
                fontSize: 10,
                fontFamily: "var(--font-dm-sans,'DM Sans',sans-serif)",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <div style={{ position: "absolute", bottom: 12, left: 12, right: 12 }}>
              <div
                style={{
                  fontFamily: "'Instrument Serif',var(--font-instrument-serif),serif",
                  fontSize: isMobile ? 22 : 30,
                  color: "#3a2530",
                  lineHeight: 1.1,
                  marginBottom: 4,
                }}
              >
                {card.title}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-dm-sans,'DM Sans',sans-serif)",
                  fontSize: isMobile ? 12 : 15,
                  color: "rgba(58,37,48,0.65)",
                  lineHeight: 1.4,
                }}
              >
                {card.desc}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── ScrollChevron ─────────────────────────────────────────────────────────────
function ScrollChevron() {
  return (
    <div
      style={{
        width: 34,
        height: 34,
        borderRadius: "50%",
        border: "1.5px solid rgba(255,255,255,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "introBobaUp 1.8s ease-in-out infinite",
      }}
    >
      <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
        <path
          d="M1 1L7 7.5L13 1"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// ─── SliderDots ────────────────────────────────────────────────────────────────
function SliderDots({ style }: { style?: CSSProperties }) {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center", ...style }}>
      {([28, 14, 14, 14] as number[]).map((w, i) => (
        <div
          key={i}
          style={{
            width: w,
            height: 4,
            borderRadius: 2,
            background: i === 0 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
          }}
        />
      ))}
    </div>
  );
}

// ─── ImmersiveIntro ────────────────────────────────────────────────────────────
export function ImmersiveIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const worldRef     = useRef<HTMLDivElement>(null);
  const cloudsRef    = useRef<HTMLDivElement>(null);
  const portalRef    = useRef<HTMLDivElement>(null);
  const curtainLRef  = useRef<HTMLDivElement>(null);
  const curtainRRef  = useRef<HTMLDivElement>(null);
  const scene1Ref    = useRef<HTMLDivElement>(null);
  const scene2Ref    = useRef<HTMLDivElement>(null);
  const arcWrapRef   = useRef<HTMLDivElement>(null);
  const veilRef      = useRef<HTMLDivElement>(null);

  const scrollRef    = useRef(0);
  const mouseRef     = useRef({ x: 0, y: 0 });
  const smoothMouse  = useRef({ x: 0, y: 0 });
  const rotOffsetRef = useRef(0);
  const entranceDone = useRef(false);
  const rafRef       = useRef<number>(0);

  const [uiVisible, setUiVisible] = useState(false);
  const isMobile = useIsMobile();

  // Inject bobUp keyframe (fonts already loaded via next/font in layout)
  useEffect(() => {
    if (!document.getElementById("intro-kf")) {
      const s       = document.createElement("style");
      s.id          = "intro-kf";
      s.textContent = "@keyframes introBobaUp{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}";
      document.head.appendChild(s);
    }
  }, []);

  // Entrance animation — offset so it fires after the loading screen clears
  useEffect(() => {
    const cL = curtainLRef.current;
    const cR = curtainRRef.current;
    if (!cL || !cR) return;

    cL.style.transition = "none";
    cR.style.transition = "none";
    cL.style.transform  = "translateX(0%)";
    cR.style.transform  = "translateX(0%)";

    const t1 = setTimeout(() => {
      cL.style.transition = "transform 1.8s cubic-bezier(0.16,1,0.3,1)";
      cR.style.transition = "transform 1.8s cubic-bezier(0.16,1,0.3,1)";
      cL.style.transform  = "translateX(-62%)";
      cR.style.transform  = "translateX(62%)";
    }, ENTRANCE_OFFSET);

    const t2 = setTimeout(() => setUiVisible(true), ENTRANCE_OFFSET + 600);

    const t3 = setTimeout(() => {
      if (cL) cL.style.transition = "none";
      if (cR) cR.style.transition = "none";
      entranceDone.current = true;
    }, ENTRANCE_OFFSET + 2100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Mouse + scroll + RAF parallax loop
  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth  - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const max         = el.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const loop = () => {
      smoothMouse.current.x = lerp(smoothMouse.current.x, mouseRef.current.x, 0.07);
      smoothMouse.current.y = lerp(smoothMouse.current.y, mouseRef.current.y, 0.07);

      const sp = scrollRef.current;
      const ep = easeInOut(sp);
      const mx = smoothMouse.current.x;
      const my = smoothMouse.current.y;

      // World BG
      if (worldRef.current) {
        worldRef.current.style.transform = `translate(${-mx * MAG.world}px,${-my * MAG.world}px) scale(${lerp(1, 1.18, ep)})`;
      }

      // Bottom Clouds
      if (cloudsRef.current) {
        cloudsRef.current.style.transform = `translate(${-mx * MAG.clouds}px,${-my * MAG.clouds * 0.4}px) scale(${lerp(1, 1.4, ep)})`;
        cloudsRef.current.style.opacity   = String(lerp(0.7, 1, clamp(sp / 0.05, 0, 1)));
      }

      // Portal
      if (portalRef.current) {
        portalRef.current.style.transform = `translate(${-mx * MAG.portal}px,${-my * MAG.portal}px) scale(${lerp(1, 7.5, ep)})`;
        portalRef.current.style.opacity   = String(
          sp < 0.65 ? 1 : clamp(1 - (sp - 0.65) / 0.2, 0, 1),
        );
      }

      // Curtains (post-entrance parallax)
      if (entranceDone.current) {
        const shift = lerp(0, 150, ep);
        const cs    = lerp(1, 1.3, ep);
        if (curtainLRef.current) {
          curtainLRef.current.style.transform = `translateX(calc(-62% - ${shift}%)) translate(${-mx * MAG.curtainL}px,${-my * MAG.curtainL * 0.3}px) scale(${cs})`;
        }
        if (curtainRRef.current) {
          curtainRRef.current.style.transform = `translateX(calc(62% + ${shift}%)) translate(${-mx * MAG.curtainR}px,${-my * MAG.curtainR * 0.3}px) scale(${cs})`;
        }
      }

      // Arc rotation
      rotOffsetRef.current = lerp(
        0,
        (ARC_CARDS.length - 1) * 10,
        clamp((sp - 0.7) / 0.3, 0, 1),
      );

      // Scene opacities
      if (scene1Ref.current) {
        scene1Ref.current.style.opacity      = String(clamp(1 - sp / 0.22, 0, 1));
        scene1Ref.current.style.pointerEvents = sp > 0.1 ? "none" : "auto";
      }

      // Scene 2: fade in on scroll, then rise + fade out during exit sequence
      if (scene2Ref.current) {
        const s2In   = clamp((sp - 0.68) / 0.16, 0, 1);
        const exitT  = clamp((sp - 0.84) / 0.16, 0, 1);
        const exitEased = exitT < 0.5 ? 2 * exitT * exitT : -1 + (4 - 2 * exitT) * exitT;
        const s2Opacity = s2In * (1 - exitEased);
        scene2Ref.current.style.opacity        = String(s2Opacity);
        scene2Ref.current.style.transform      = `translateY(${-36 * exitEased}px)`;
        scene2Ref.current.style.pointerEvents  = s2Opacity > 0.05 ? "auto" : "none";
      }
      if (arcWrapRef.current) {
        const exitT = clamp((sp - 0.84) / 0.16, 0, 1);
        arcWrapRef.current.style.opacity  = String(
          clamp((sp - 0.68) / 0.16, 0, 1) * (1 - exitT)
        );
      }

      // Exit veil — fades to full black as intro closes
      if (veilRef.current) {
        veilRef.current.style.opacity = String(clamp((sp - 0.84) / 0.16, 0, 1));
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Fade-in helper for Scene 1 UI elements
  const fi = (delay: string): CSSProperties => ({
    opacity:    uiVisible ? 1 : 0,
    transform:  uiVisible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.9s ease ${delay}, transform 0.9s ease ${delay}`,
  });

  return (
    <div ref={containerRef} style={{ height: "480vh", position: "relative" }}>
      {/* ── Sticky viewport ──────────────────────────────────────────────────── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "#0a0608",
        }}
      >
        {/* ── Exit veil — fades over everything as intro closes ──────────────── */}
        <div
          ref={veilRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 80,
            background: "#0a0608",
            opacity: 0,
            pointerEvents: "none",
          }}
        />

        {/* ── Layer 1: World BG ─────────────────────────────────────────────── */}
        <div
          ref={worldRef}
          style={{ position: "absolute", inset: 0, transformOrigin: "50% 50%" }}
        >
          <img
            src={WORLD_BG}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* ── Layer 2: Bottom Clouds ────────────────────────────────────────── */}
        <div
          ref={cloudsRef}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            transformOrigin: "50% 100%",
            opacity: 0.7,
          }}
        >
          <img
            src={BOTTOM_CLOUDS}
            alt=""
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* ── Layer 2.5: Arc Slider ─────────────────────────────────────────── */}
        <div
          ref={arcWrapRef}
          style={{
            position: "absolute",
            bottom: isMobile ? 60 : 80,
            left: 0,
            right: 0,
            zIndex: 9,
            opacity: 0,
          }}
        >
          <ArcCardSlider
            cards={ARC_CARDS}
            rotationOffsetRef={rotOffsetRef}
            isMobile={isMobile}
          />
        </div>

        {/* ── Layer 3: Portal ───────────────────────────────────────────────── */}
        <div
          ref={portalRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 15,
            transformOrigin: "52% 38%",
          }}
        >
          <img
            src={PORTAL_BG}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* ── Layer 3.5: Bottom Fade ────────────────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: "linear-gradient(to top,rgba(0,0,0,0.45) 0%,transparent 100%)",
            zIndex: 16,
            pointerEvents: "none",
          }}
        />

        {/* ── Layer 4L: Curtain Left ────────────────────────────────────────── */}
        <div
          ref={curtainLRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 16,
            transformOrigin: "left center",
          }}
        >
          <img
            src={CURTAIN_LEFT}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "right center",
              display: "block",
            }}
          />
        </div>

        {/* ── Layer 4R: Curtain Right ───────────────────────────────────────── */}
        <div
          ref={curtainRRef}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 16,
            transformOrigin: "right center",
          }}
        >
          <img
            src={CURTAIN_RIGHT}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "left center",
              display: "block",
            }}
          />
        </div>

        {/* ── Top Fade Gradient ─────────────────────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "42vh",
            background: "linear-gradient(to bottom,rgba(0,0,0,0.45) 0%,transparent 100%)",
            zIndex: 45,
            pointerEvents: "none",
          }}
        />

        {/* ══ Scene 1 UI ═══════════════════════════════════════════════════════ */}
        <div
          ref={scene1Ref}
          style={{ position: "absolute", inset: 0, zIndex: 20 }}
        >
          {/* — Mobile layout — */}
          <div
            className="flex flex-col md:hidden"
            style={{
              height: "100%",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "80px 24px 100px",
              gap: 16,
            }}
          >
            <div style={fi("0.3s")}>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "'Instrument Serif',var(--font-instrument-serif),serif",
                    fontSize: "clamp(36px,10vw,56px)",
                    letterSpacing: "0.04em",
                    color: "white",
                    lineHeight: 1.1,
                    textShadow: "0 2px 20px rgba(0,0,0,0.6)",
                  }}
                >
                  WE CREATE.
                </div>
                <div
                  style={{
                    fontFamily: "'Instrument Serif',var(--font-instrument-serif),serif",
                    fontSize: "clamp(36px,10vw,56px)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1,
                    color: "rgba(255,255,255,0.65)",
                    fontStyle: "italic",
                    textShadow: "0 2px 20px rgba(0,0,0,0.6)",
                  }}
                >
                  you lead.
                </div>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans,'DM Sans',sans-serif)",
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.72)",
                  maxWidth: 280,
                  textAlign: "center",
                  margin: "12px auto 0",
                  textShadow: "0 1px 8px rgba(0,0,0,0.5)",
                }}
              >
                Combining human creative direction with intelligent execution — delivering content that moves people.
              </p>
            </div>

            <div style={fi("0.55s")}>
              <Link href={REEL_CARDS[0].href} style={{ textDecoration: "none", display: "block" }}>
                <MiniCard imgUrl={REEL_CARDS[0].poster} size={140} borderRadius={22}>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 10,
                      left: 10,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      zIndex: 2,
                    }}
                  >
                    <PlayButton size={26} />
                    <span style={{ fontFamily: "var(--font-dm-sans,'DM Sans',sans-serif)", fontSize: 13, color: "white" }}>
                      {REEL_CARDS[0].label}
                    </span>
                  </div>
                </MiniCard>
              </Link>
            </div>

            <SliderDots style={fi("0.8s")} />
          </div>

          {/* — Tablet layout — */}
          <div
            className="hidden md:flex lg:hidden"
            style={{
              height: "100%",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              padding: "80px 32px 96px",
              gap: 28,
            }}
          >
            <div style={fi("0.3s")}>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "'Instrument Serif',var(--font-instrument-serif),serif",
                    fontSize: "clamp(32px,5.5vw,52px)",
                    letterSpacing: "0.04em",
                    color: "white",
                    lineHeight: 1.1,
                    textShadow: "0 2px 20px rgba(0,0,0,0.6)",
                  }}
                >
                  WE CREATE.
                </div>
                <div
                  style={{
                    fontFamily: "'Instrument Serif',var(--font-instrument-serif),serif",
                    fontSize: "clamp(32px,5.5vw,52px)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1,
                    color: "rgba(255,255,255,0.65)",
                    fontStyle: "italic",
                    textShadow: "0 2px 20px rgba(0,0,0,0.6)",
                  }}
                >
                  you lead.
                </div>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans,'DM Sans',sans-serif)",
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: "rgba(255,255,255,0.72)",
                  maxWidth: 400,
                  textAlign: "center",
                  margin: "12px auto 0",
                  textShadow: "0 1px 8px rgba(0,0,0,0.5)",
                }}
              >
                Combining human creative direction with intelligent execution — delivering content that moves people.
              </p>
            </div>

            <div style={{ ...fi("0.55s"), display: "flex", gap: 14 }}>
              {([0, 1, 2] as const).map((idx) => (
                <Link key={idx} href={REEL_CARDS[idx].href} style={{ textDecoration: "none", display: "block" }}>
                  <MiniCard imgUrl={REEL_CARDS[idx].poster} size={140} borderRadius={22}>
                    <div style={{ position: "absolute", bottom: 10, left: 10, display: "flex", alignItems: "center", gap: 6, zIndex: 2 }}>
                      <PlayButton size={26} />
                      <span style={{ fontFamily: "var(--font-dm-sans,'DM Sans',sans-serif)", fontSize: 13, color: "white" }}>
                        {REEL_CARDS[idx].label}
                      </span>
                    </div>
                  </MiniCard>
                </Link>
              ))}
            </div>

            <SliderDots style={fi("0.8s")} />
          </div>

          {/* — Desktop layout — */}

          {/* Heading block */}
          <div
            className="hidden lg:block"
            style={{ position: "absolute", top: "46%", left: 60, maxWidth: 440 }}
          >
            <div style={{ ...fi("0.3s"), transform: uiVisible ? "translateY(-50%)" : "translateY(calc(-50% + 20px))" }}>
              <div
                style={{
                  fontFamily: "'Instrument Serif',var(--font-instrument-serif),serif",
                  fontSize: "clamp(36px,5vw,64px)",
                  lineHeight: 1.05,
                  letterSpacing: "0.04em",
                  color: "white",
                  textShadow: "0 2px 24px rgba(0,0,0,0.7),0 1px 4px rgba(0,0,0,0.9)",
                }}
              >
                WE CREATE.
              </div>
              <div
                style={{
                  fontFamily: "'Instrument Serif',var(--font-instrument-serif),serif",
                  fontSize: "clamp(36px,5vw,64px)",
                  lineHeight: 1,
                  letterSpacing: "-0.01em",
                  fontStyle: "italic",
                  color: "rgba(255,255,255,0.6)",
                  textShadow: "0 2px 24px rgba(0,0,0,0.7),0 1px 4px rgba(0,0,0,0.9)",
                }}
              >
                you lead.
              </div>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans,'DM Sans',sans-serif)",
                  fontSize: 18,
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.75)",
                  maxWidth: 340,
                  marginTop: 20,
                  textShadow: "0 1px 12px rgba(0,0,0,0.8)",
                }}
              >
                Combining human creative direction with intelligent execution — delivering content that moves people and campaigns that perform.
              </p>
            </div>
          </div>

          {/* Desktop cards */}
          <div
            className="hidden lg:flex"
            style={{
              position: "absolute",
              right: 40,
              top: "50%",
              transform: "translateY(-50%)",
              gap: 12,
              ...fi("0.55s"),
            }}
          >
            {([0, 1, 2] as const).map((idx) => (
              <Link key={idx} href={REEL_CARDS[idx].href} style={{ textDecoration: "none", display: "block" }}>
                <MiniCard imgUrl={REEL_CARDS[idx].poster} size={158} borderRadius={28}>
                  <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", alignItems: "center", gap: 8, zIndex: 2 }}>
                    <PlayButton size={30} />
                    <span style={{ fontFamily: "var(--font-dm-sans,'DM Sans',sans-serif)", fontSize: 18, color: "white" }}>
                      {REEL_CARDS[idx].label}
                    </span>
                  </div>
                </MiniCard>
              </Link>
            ))}
          </div>

          {/* Desktop slider dots */}
          <div
            className="hidden lg:flex"
            style={{ position: "absolute", bottom: 40, left: 60, ...fi("0.8s") }}
          >
            <SliderDots />
          </div>

          {/* Desktop scroll cue */}
          <div
            className="hidden lg:flex"
            style={{
              position: "absolute",
              bottom: 36,
              left: "50%",
              transform: "translateX(-50%)",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              ...fi("0.9s"),
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-dm-sans,'DM Sans',sans-serif)",
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              SCROLL
            </span>
            <ScrollChevron />
          </div>
        </div>

        {/* ══ Scene 2 UI ═══════════════════════════════════════════════════════ */}
        <div
          ref={scene2Ref}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 46,
            opacity: 0,
            pointerEvents: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            textAlign: "center",
            paddingTop: isMobile ? "8vh" : "12vh",
            paddingLeft: 24,
            paddingRight: 24,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Instrument Serif',var(--font-instrument-serif),serif",
                fontSize: isMobile ? "clamp(28px,8vw,44px)" : "clamp(38px,6.5vw,72px)",
                color: "white",
                letterSpacing: "0.05em",
                lineHeight: 1.05,
                textShadow: "0 2px 20px rgba(0,0,0,0.5)",
              }}
            >
              WHERE CRAFT MEETS VISION.
            </div>
            <p
              style={{
                fontFamily: "var(--font-dm-sans,'DM Sans',sans-serif)",
                fontSize: isMobile ? 14 : 20,
                lineHeight: 1.6,
                letterSpacing: "-0.01em",
                maxWidth: isMobile ? 260 : 480,
                margin: "12px auto 0",
                color: "rgba(255,255,255,0.82)",
              }}
            >
              Fashion. F&amp;B. Real estate. B2B. Consumer brands. We make content that moves people and campaigns that actually perform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
