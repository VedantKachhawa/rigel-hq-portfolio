"use client";

import { useEffect, useState } from "react";

export type DeviceTier = "high" | "low";

export interface DeviceProfile {
  /** True for phones and tablets (coarse pointer). */
  isTouch: boolean;
  /** True when the OS asks for reduced motion. */
  prefersReducedMotion: boolean;
  /**
   * "low" on touch devices, low-core machines, or reduced-motion.
   * Use this to scale effects DOWN, never to remove them.
   */
  tier: DeviceTier;
  /** True until the first client-side measurement lands (SSR-safe default). */
  isResolving: boolean;
}

const DEFAULT_PROFILE: DeviceProfile = {
  isTouch: false,
  prefersReducedMotion: false,
  tier: "high",
  isResolving: true,
};

/**
 * Single source of truth for "how much GPU work can this device take".
 *
 * Every heavy component (shaders, WebGL galleries, physics, particle fields)
 * should read from this instead of re-implementing its own window.innerWidth
 * check. The site currently has at least four different ad-hoc mobile checks
 * that disagree with each other.
 *
 * IMPORTANT: a "low" tier means render the SAME effect more cheaply — fewer
 * particles, lower DPR, capped framerate. It does not mean hide the effect.
 */
export function useDeviceTier(): DeviceProfile {
  const [profile, setProfile] = useState<DeviceProfile>(DEFAULT_PROFILE);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    const resolve = (): void => {
      const isTouch = coarse.matches;
      const prefersReducedMotion = reduced.matches;
      const lowCore =
        typeof navigator !== "undefined" &&
        typeof navigator.hardwareConcurrency === "number" &&
        navigator.hardwareConcurrency <= 4;

      setProfile({
        isTouch,
        prefersReducedMotion,
        tier: isTouch || prefersReducedMotion || lowCore ? "low" : "high",
        isResolving: false,
      });
    };

    resolve();
    coarse.addEventListener("change", resolve);
    reduced.addEventListener("change", resolve);

    return () => {
      coarse.removeEventListener("change", resolve);
      reduced.removeEventListener("change", resolve);
    };
  }, []);

  return profile;
}
