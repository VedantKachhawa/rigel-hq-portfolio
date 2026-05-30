"use client";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

const Lanyard = dynamic(() => import("@/components/studio/lanyard"), { ssr: false });

export function LanyardLoader() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      {/* Toggle button — fixed bottom-right, always visible on the studio page */}
      <button
        ref={btnRef}
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 10002,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          background: open
            ? "rgba(255,255,255,0.18)"
            : "rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.22)",
          color: "white",
          padding: "0.55rem 1.1rem",
          borderRadius: "100px",
          fontSize: "0.72rem",
          letterSpacing: "0.12em",
          fontFamily: "inherit",
          fontWeight: 500,
          cursor: "pointer",
          transition: "background 0.2s ease, transform 0.15s ease",
          userSelect: "none",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(255,255,255,0.24)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = open
            ? "rgba(255,255,255,0.18)"
            : "rgba(255,255,255,0.07)")
        }
      >
        {/* small lanyard icon */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0 }}
        >
          <rect x="5" y="10" width="14" height="11" rx="2" />
          <path d="M12 10V3" />
          <path d="M8 3h8" />
        </svg>
        {open ? "HIDE CARD" : "ID CARD"}
      </button>

      {/* Fullscreen canvas — pointer-events off when hidden so page is usable */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            pointerEvents: "auto",
          }}
        >
          <Lanyard position={[0, 0, 22]} gravity={[0, -40, 0]} transparent />

        </div>
      )}
    </>
  );
}
