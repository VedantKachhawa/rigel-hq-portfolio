"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Play } from "lucide-react";

type MediaModalProps = {
  imgSrc?: string;
  videoSrc?: string;
  vimeoId?: string;
  vimeoPadding?: string;
  label?: string;
  poster?: string;
};

export function MediaModal({ imgSrc, videoSrc, vimeoId, vimeoPadding = "56.25%", label, poster }: MediaModalProps) {
  const [open, setOpen] = useState(false);
  const isVideo = !!(videoSrc || vimeoId);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Thumbnail */}
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative w-full overflow-hidden rounded-2xl bg-foreground/5 cursor-zoom-in"
        style={{ aspectRatio: isVideo ? "16/9" : "3/4" }}
      >
        {imgSrc && (
          <Image
            src={imgSrc}
            alt={label ?? "Media"}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {poster && (
          <Image
            src={poster}
            alt={label ?? "Video"}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm ring-1 ring-white/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-black/70">
              <Play className="h-5 w-5 translate-x-0.5 text-white" fill="white" />
            </div>
          </div>
        )}
        {label && (
          <div className="absolute bottom-3 left-3 rounded-md bg-black/50 px-2 py-0.5 text-[10px] tracking-wide text-white/70 backdrop-blur-sm">
            {label}
          </div>
        )}
      </motion.button>

      {/* Modal */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/92 backdrop-blur-md p-4"
              onClick={() => setOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-4xl"
                onClick={e => e.stopPropagation()}
              >
                {imgSrc && (
                  <Image
                    src={imgSrc}
                    alt={label ?? "Media"}
                    width={1200}
                    height={1600}
                    className="max-h-[90vh] w-auto mx-auto rounded-2xl object-contain"
                    priority
                  />
                )}

                {videoSrc && (
                  <video
                    src={videoSrc}
                    controls
                    autoPlay
                    playsInline
                    className="w-full rounded-2xl"
                    style={{ maxHeight: "90vh" }}
                  />
                )}

                {vimeoId && (
                  <div className="w-full rounded-2xl overflow-hidden" style={{ position: "relative", paddingTop: vimeoPadding }}>
                    <iframe
                      src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&badge=0&autopause=0&title=0&byline=0&portrait=0`}
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                      title={label ?? "Video"}
                    />
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
