import { forwardRef, type ReactNode } from "react";

type ScrollIndicatorProps = {
  className?: string;
  style?: React.CSSProperties;
};

export const ScrollIndicator = forwardRef<HTMLDivElement, ScrollIndicatorProps>(
  function ScrollIndicator({ className = "", style }, ref): ReactNode {
    return (
      <div
        ref={ref}
        className={`absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 ${className}`}
        style={style}
        aria-hidden="true"
      >
        <span
          className="text-[9px] uppercase tracking-[0.28em] text-white/30"
          style={{ fontFamily: "var(--font-dm-sans, sans-serif)" }}
        >
          Scroll
        </span>
        <div className="relative h-10 w-px overflow-hidden bg-white/15">
          <div className="absolute inset-x-0 top-0 h-full bg-white/60 animate-scroll-down" />
        </div>
      </div>
    );
  }
);

ScrollIndicator.displayName = "ScrollIndicator";
