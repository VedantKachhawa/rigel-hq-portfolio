"use client";

import dynamic from "next/dynamic";

const DotGrid = dynamic(() => import("@/components/ui/dot-grid"), { ssr: false });

export function StudioBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <DotGrid
        dotSize={4}
        gap={24}
        baseColor="#2a2a2a"
        activeColor="#888888"
        proximity={120}
        shockRadius={220}
        shockStrength={4}
        resistance={800}
        returnDuration={1.5}
      />
    </div>
  );
}
