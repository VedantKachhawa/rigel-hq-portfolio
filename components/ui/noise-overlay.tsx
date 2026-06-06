"use client";
import dynamic from "next/dynamic";

const Noise = dynamic(() => import("@/components/ui/noise"), { ssr: false });

export function NoiseOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      <Noise patternAlpha={12} patternRefreshInterval={6} />
    </div>
  );
}
