"use client";

import dynamic from "next/dynamic";
import type { AntigravityProps } from "./antigravity-canvas";

const AntigravityCanvas = dynamic(
  () =>
    import("./antigravity-canvas").then((m) => ({
      default: m.AntigravityCanvas,
    })),
  { ssr: false }
);

export function Antigravity(props: AntigravityProps) {
  return <AntigravityCanvas {...props} />;
}
