"use client";

import dynamic from "next/dynamic";
import { Component, type ErrorInfo, type ReactNode, useRef, useState } from "react";

const Lanyard = dynamic(() => import("@/components/studio/lanyard"), { ssr: false });

class LanyardErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo): void {
    this.props.onError();
  }

  render(): ReactNode {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export function LanyardLoader() {
  const [open, setOpen] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => {
          setLoadError(false);
          setOpen((o) => !o);
        }}
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

      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            pointerEvents: "auto",
          }}
        >
          {loadError ? (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
              }}
            >
              Unable to load ID card. Please refresh and try again.
            </div>
          ) : (
            <LanyardErrorBoundary onError={() => setLoadError(true)}>
              <Lanyard position={[0, 0, 22]} gravity={[0, -40, 0]} transparent />
            </LanyardErrorBoundary>
          )}
        </div>
      )}
    </>
  );
}
