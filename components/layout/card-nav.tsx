"use client";

import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

interface NavLink {
  label: string;
  href: string;
  ariaLabel?: string;
  external?: boolean;
}

interface NavItem {
  label: string;
  bgColor: string;
  textColor: string;
  links: NavLink[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Work",
    bgColor: "#111111",
    textColor: "#ffffff",
    links: [
      { label: "Real Estate", href: "/projects?cat=real-estate" },
      { label: "Fashion & Luxury", href: "/projects?cat=fashion-luxury" },
      { label: "Concept Fashion", href: "/projects?cat=concept-fashion" },
      { label: "Food & Beverage", href: "/projects?cat=food-beverage" },
      { label: "Technology", href: "/projects?cat=technology" },
    ],
  },
  {
    label: "Studio",
    bgColor: "#1a1a1a",
    textColor: "#ffffff",
    links: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/about#services" },
    ],
  },
  {
    label: "Reach Us",
    bgColor: "#1e1e1e",
    textColor: "#ffffff",
    links: [
      { label: "Contact", href: "/contact" },
      {
        label: "WhatsApp",
        href: "https://wa.me/971504142689",
        external: true,
      },
      {
        label: "Email",
        href: "mailto:vedant@rigelstudios.co",
        external: true,
      },
    ],
  },
];

function injectCardNavStyles() {
  if (typeof document === "undefined") return;
  const id = "card-nav-styles";
  if (document.getElementById(id)) return;
  const s = document.createElement("style");
  s.id = id;
  s.textContent = `
.card-nav-container{position:absolute;top:2em;left:50%;transform:translateX(-50%);width:90%;max-width:800px;z-index:99;box-sizing:border-box}
.card-nav{display:block;height:60px;padding:0;border:0.5px solid rgba(255,255,255,0.15);border-radius:0.75rem;box-shadow:0 4px 32px rgba(0,0,0,0.4);position:relative;overflow:hidden;will-change:height;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}
.card-nav-top{position:absolute;top:0;left:0;right:0;height:60px;display:flex;align-items:center;justify-content:space-between;padding:0.5rem 0.65rem 0.55rem 1.1rem;z-index:2}
.card-hamburger{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;gap:6px;color:#fff}
.card-hamburger:hover .card-hamburger-line{opacity:0.7}
.card-hamburger-line{width:28px;height:1.5px;background:currentColor;transition:transform 0.25s ease,opacity 0.2s ease;transform-origin:50% 50%}
.card-hamburger.open .card-hamburger-line:first-child{transform:translateY(3.75px) rotate(45deg)}
.card-hamburger.open .card-hamburger-line:last-child{transform:translateY(-3.75px) rotate(-45deg)}
.card-nav-logo{display:flex;align-items:center;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);gap:8px}
.card-nav-cta{border:none;border-radius:calc(0.75rem - 0.35rem);padding:0 1rem;height:calc(100% - 12px);font-weight:500;cursor:pointer;transition:background-color 0.2s ease;display:inline-flex;align-items:center;text-decoration:none;font-size:13px;white-space:nowrap}
.card-nav-cta:hover{opacity:0.85}
.card-nav-content{position:absolute;left:0;right:0;top:60px;bottom:0;padding:0.5rem;display:flex;align-items:flex-end;gap:10px;visibility:hidden;pointer-events:none;z-index:1}
.card-nav.open .card-nav-content{visibility:visible;pointer-events:auto}
.nav-card{height:100%;flex:1 1 0;min-width:0;border-radius:calc(0.75rem - 0.2rem);position:relative;display:flex;flex-direction:column;padding:12px 14px;gap:6px;user-select:none}
.nav-card-label{font-weight:400;font-size:20px;letter-spacing:-0.5px}
.nav-card-links{margin-top:auto;display:flex;flex-direction:column;gap:1px}
.nav-card-link{font-size:14px;cursor:pointer;text-decoration:none;transition:opacity 0.2s ease;display:inline-flex;align-items:center;gap:5px;opacity:0.65}
.nav-card-link:hover{opacity:1}
.nav-card-link-icon{width:12px;height:12px;flex-shrink:0}
@media(max-width:768px){
  .card-nav-container{width:92%;top:1em}
  .card-nav-logo{position:static;transform:none;order:1}
  .card-hamburger{order:2}
  .card-nav-cta{display:none}
  .card-nav-content{flex-direction:column;align-items:stretch;gap:6px;padding:0.5rem;justify-content:flex-start}
  .nav-card{height:auto;min-height:56px;flex:none}
  .nav-card-label{font-size:17px}
}`;
  document.head.appendChild(s);
}

export function CardNav(): ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    injectCardNavStyles();
  }, []);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector<HTMLElement>(".card-nav-content");
      if (contentEl) {
        const prevVis = contentEl.style.visibility;
        const prevPE = contentEl.style.pointerEvents;
        const prevPos = contentEl.style.position;
        const prevH = contentEl.style.height;
        contentEl.style.visibility = "visible";
        contentEl.style.pointerEvents = "auto";
        contentEl.style.position = "static";
        contentEl.style.height = "auto";
        void contentEl.offsetHeight;
        const h = 60 + contentEl.scrollHeight + 16;
        contentEl.style.visibility = prevVis;
        contentEl.style.pointerEvents = prevPE;
        contentEl.style.position = prevPos;
        contentEl.style.height = prevH;
        return h;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;
    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });
    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease: "power3.out" });
    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease: "power3.out", stagger: 0.08 },
      "-=0.1"
    );
    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;
      tlRef.current.kill();
      const newTl = createTimeline();
      if (!newTl) return;
      if (isExpanded) newTl.progress(1);
      tlRef.current = newTl;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  const toggle = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };

  return (
    <div className="card-nav-container">
      <nav
        ref={navRef}
        className={`card-nav${isExpanded ? " open" : ""}`}
        style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
      >
        <div className="card-nav-top">
          {/* Hamburger */}
          <button
            type="button"
            className={`card-hamburger${isOpen ? " open" : ""}`}
            onClick={toggle}
            aria-label={isExpanded ? "Close menu" : "Open menu"}
          >
            <div className="card-hamburger-line" />
            <div className="card-hamburger-line" />
          </button>

          {/* Logo */}
          <div className="card-nav-logo">
            <Image
              src="https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780271054/Rigel_-_R_logo_uervhx.png"
              alt="Rigel HQ"
              width={28}
              height={28}
              className="object-contain"
              style={{ height: 28, width: "auto" }}
            />
            <span
              className="text-white text-base tracking-tight"
              style={{
                fontFamily:
                  "'Instrument Serif', var(--font-instrument-serif), serif",
              }}
            >
              Rigel HQ
            </span>
          </div>

          {/* CTA */}
          <Link
            href="/contact"
            className="card-nav-cta"
            style={{
              backgroundColor: "rgba(255,255,255,0.12)",
              color: "#ffffff",
              border: "0.5px solid rgba(255,255,255,0.2)",
            }}
          >
            Reach Us
          </Link>
        </div>

        {/* Cards */}
        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {NAV_ITEMS.map((item, idx) => (
            <div
              key={item.label}
              className="nav-card"
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links.map((lnk) =>
                  lnk.external ? (
                    <a
                      key={lnk.label}
                      href={lnk.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nav-card-link"
                      aria-label={lnk.ariaLabel ?? lnk.label}
                      style={{ color: item.textColor }}
                    >
                      <ArrowUpRight className="nav-card-link-icon" aria-hidden />
                      {lnk.label}
                    </a>
                  ) : (
                    <Link
                      key={lnk.label}
                      href={lnk.href}
                      className="nav-card-link"
                      aria-label={lnk.ariaLabel ?? lnk.label}
                      style={{ color: item.textColor }}
                    >
                      <ArrowUpRight className="nav-card-link-icon" aria-hidden />
                      {lnk.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
