"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { posterFor } from "@/lib/media";
import { cn } from "@/lib/utils";

interface AmbientVideoProps {
  /** Video URL. Prefer a key from `VIDEOS` in lib/media.ts. */
  src: string;
  /** Optional explicit poster. Auto-derived for Cloudinary sources. */
  poster?: string;
  className?: string;
  style?: CSSProperties;
  /**
   * Fade the video in once it can actually play, instead of flashing black.
   * Defaults to true.
   */
  fadeIn?: boolean;
}

/**
 * Drop-in replacement for the raw `<video autoPlay loop muted playsInline>`
 * blocks that were scattered across the site.
 *
 * WHAT IT FIXES
 * 1. CRASHES ON IOS. Previously every background video on a page was mounted
 *    and decoding simultaneously. iOS Safari has a hard per-tab memory budget
 *    and a hard cap on concurrent video decoders; blowing either produces the
 *    "A problem repeatedly occurred" screen. This component only ever attaches
 *    a source while the element is actually near the viewport, and it fully
 *    releases the decoder when the element leaves.
 * 2. SLOW FIRST LOAD. `preload="none"` plus a poster means the browser paints
 *    immediately and only spends bandwidth on video the user will really see.
 * 3. BATTERY AND FRAME DROPS. Playback pauses when the tab is hidden.
 * 4. SILENT FAILURE. If the source 404s (which the temporary CloudFront links
 *    eventually will), the poster stays visible instead of showing the broken
 *    media icon.
 *
 * Visually identical to the old markup — same object-cover fill, same loop,
 * same muted autoplay. Nothing is removed, it is just loaded intelligently.
 */
export function AmbientVideo({
  src,
  poster,
  className,
  style,
  fadeIn = true,
}: AmbientVideoProps): ReactNode {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const resolvedPoster = poster ?? posterFor(src);

  // Attach/detach based on proximity to the viewport.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    // No IntersectionObserver (very old browsers): just load it.
    if (typeof IntersectionObserver === "undefined") {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => setIsNearViewport(entries[0]?.isIntersecting ?? false),
      // 200px of runway so the video is ready by the time it scrolls in,
      // but not so much that offscreen sections all load at once.
      { rootMargin: "200px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Load, play, and — critically — release the decoder on exit.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isNearViewport) {
      if (video.getAttribute("src") !== src) {
        video.setAttribute("src", src);
        video.load();
      }
      void video.play().catch(() => {
        // Autoplay blocked (low power mode, iOS data saver). Poster remains.
      });
      return;
    }

    // Offscreen: stop decoding and hand the memory back to the browser.
    video.pause();
    video.removeAttribute("src");
    video.load();
    setIsReady(false);
  }, [isNearViewport, src]);

  // Don't burn frames on a hidden tab.
  useEffect(() => {
    const onVisibility = (): void => {
      const video = videoRef.current;
      if (!video) return;
      if (document.hidden) {
        video.pause();
      } else if (isNearViewport) {
        void video.play().catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [isNearViewport]);

  return (
    <div ref={containerRef} className={cn("absolute inset-0", className)} style={style}>
      {resolvedPoster ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${resolvedPoster})` }}
        />
      ) : null}

      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="none"
        poster={resolvedPoster}
        aria-hidden="true"
        onCanPlay={() => setIsReady(true)}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          opacity: fadeIn ? (isReady ? 1 : 0) : 1,
          transition: fadeIn ? "opacity 700ms ease" : undefined,
        }}
      />
    </div>
  );
}
