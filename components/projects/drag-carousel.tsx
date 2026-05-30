"use client";

import { animate, motion, AnimatePresence, useMotionValue } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { ProjectImage, ProjectVideo } from "@/lib/projects";
import { MediaModal } from "@/components/ui/media-modal";

const FULL_WIDTH_PX = 120;
const COLLAPSED_WIDTH_PX = 35;
const GAP_PX = 2;
const MARGIN_PX = 2;

export function DragCarousel({ images, videos = [] }: { images: ProjectImage[]; videos?: ProjectVideo[] }) {
  const [index, setIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lightbox, setLightbox] = useState<ProjectImage | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);

  // Close lightbox on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!isDragging && containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth || 1;
      animate(x, -index * containerWidth, {
        type: "spring",
        stiffness: 300,
        damping: 30,
      });
    }
  }, [index, x, isDragging]);

  return (
    <div className="flex flex-col gap-3">
      {images.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-1">
            <p className="text-[11px] font-medium uppercase tracking-widest text-foreground/35">
              Photos — {images.length}
            </p>
            <p className="text-[11px] tracking-widest text-foreground/25 select-none">
              ← swipe →
            </p>
          </div>

          {/* Main carousel */}
          <div className="relative overflow-hidden rounded-2xl" ref={containerRef}>
            <motion.div
              className="flex"
              drag="x"
              dragElastic={0.2}
              dragMomentum={false}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(_, info) => {
                setIsDragging(false);
                const containerWidth = containerRef.current?.offsetWidth || 1;
                const { offset, velocity } = info;
                let newIndex = index;
                if (Math.abs(velocity.x) > 500) {
                  newIndex = velocity.x > 0 ? index - 1 : index + 1;
                } else if (Math.abs(offset.x) > containerWidth * 0.3) {
                  newIndex = offset.x > 0 ? index - 1 : index + 1;
                }
                setIndex(Math.max(0, Math.min(images.length - 1, newIndex)));
              }}
              style={{ x }}
            >
              {images.map((img, i) => (
                <div
                  key={img.src}
                  className="relative shrink-0 w-full aspect-[3/4] cursor-zoom-in"
                  onClick={() => !isDragging && setLightbox(img)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 700px, 100vw"
                    className="object-cover rounded-2xl select-none pointer-events-none"
                    priority={i < 2}
                    draggable={false}
                  />
                  <div className="absolute bottom-3 left-3 rounded-md bg-black/50 px-2 py-0.5 text-[10px] tracking-wide text-white/70 backdrop-blur-sm pointer-events-none">
                    {String(i + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Prev */}
            <motion.button
              type="button"
              disabled={index === 0}
              onClick={() => setIndex(i => Math.max(0, i - 1))}
              whileHover={{ scale: index === 0 ? 1 : 1.1 }}
              className={`absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-opacity ${index === 0 ? "opacity-20 cursor-not-allowed" : "opacity-70 hover:opacity-100"}`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Next */}
            <motion.button
              type="button"
              disabled={index === images.length - 1}
              onClick={() => setIndex(i => Math.min(images.length - 1, i + 1))}
              whileHover={{ scale: index === images.length - 1 ? 1 : 1.1 }}
              className={`absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-opacity ${index === images.length - 1 ? "opacity-20 cursor-not-allowed" : "opacity-70 hover:opacity-100"}`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Thumbnails */}
          <Thumbnails images={images} index={index} setIndex={setIndex} />
        </>
      )}

      {/* Videos */}
      {videos.length > 0 && (
        <div className={`flex flex-col gap-3 ${images.length > 0 ? "mt-6" : ""}`}>
          <p className="text-[11px] font-medium uppercase tracking-widest text-foreground/35">
            Videos — {videos.length}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {videos.map(v => (
              <MediaModal
                key={v.label}
                videoSrc={v.src}
                vimeoId={v.vimeoId}
                vimeoPadding={v.vimeoPadding}
                poster={v.poster}
                label={v.label}
              />
            ))}
          </div>
        </div>
      )}

      {/* Lightbox — portalled to body to escape transform stacking context */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {lightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-md"
              onClick={() => setLightbox(null)}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative max-h-[90vh] max-w-[90vw]"
                onClick={e => e.stopPropagation()}
              >
                <Image
                  src={lightbox.src}
                  alt={lightbox.alt}
                  width={900}
                  height={1200}
                  className="max-h-[90vh] w-auto rounded-2xl object-contain"
                  priority
                />
                <button
                  type="button"
                  onClick={() => setLightbox(null)}
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
    </div>
  );
}

function Thumbnails({
  images,
  index,
  setIndex,
}: {
  images: ProjectImage[];
  index: number;
  setIndex: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    let scrollPos = 0;
    for (let i = 0; i < index; i++) scrollPos += COLLAPSED_WIDTH_PX + GAP_PX;
    scrollPos += MARGIN_PX;
    const centerOffset = ref.current.offsetWidth / 2 - FULL_WIDTH_PX / 2;
    scrollPos -= centerOffset;
    ref.current.scrollTo({ left: scrollPos, behavior: "smooth" });
  }, [index]);

  return (
    <div
      ref={ref}
      className="overflow-x-auto"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div className="flex gap-0.5 h-8" style={{ width: "fit-content" }}>
        {images.map((img, i) => (
          <motion.button
            key={img.src}
            type="button"
            onClick={() => setIndex(i)}
            initial={false}
            animate={i === index ? "active" : "inactive"}
            variants={{
              active:   { width: FULL_WIDTH_PX,    marginLeft: MARGIN_PX, marginRight: MARGIN_PX },
              inactive: { width: COLLAPSED_WIDTH_PX, marginLeft: 0,         marginRight: 0 },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative shrink-0 h-full overflow-hidden rounded-lg"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="120px"
              className={`object-contain pointer-events-none select-none transition-opacity duration-200 ${i === index ? "opacity-100" : "opacity-50"}`}
              draggable={false}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
