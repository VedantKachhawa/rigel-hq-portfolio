"use client";

import dynamic from "next/dynamic";
import type { GalleryImage } from "@/components/infinite-gallery";

const InfiniteGallery = dynamic(() => import("@/components/infinite-gallery"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[70vh] bg-black rounded-2xl animate-pulse" />
  ),
});

const GALLERY_IMAGES: GalleryImage[] = [
  // Kaleidogami — portrait 3:4
  { url: "/projects/kaleidogami/1.png",  width: 675, height: 900 },
  { url: "/projects/kaleidogami/2.png",  width: 675, height: 900 },
  { url: "/projects/kaleidogami/3.png",  width: 675, height: 900 },
  { url: "/projects/kaleidogami/4.png",  width: 675, height: 900 },
  { url: "/projects/kaleidogami/5.png",  width: 675, height: 900 },
  { url: "/projects/kaleidogami/6.png",  width: 675, height: 900 },
  { url: "/projects/kaleidogami/7.png",  width: 675, height: 900 },
  { url: "/projects/kaleidogami/8.png",  width: 675, height: 900 },
  { url: "/projects/kaleidogami/9.png",  width: 675, height: 900 },
  { url: "/projects/kaleidogami/10.png", width: 675, height: 900 },
  { url: "/projects/kaleidogami/11.png", width: 675, height: 900 },
  { url: "/projects/kaleidogami/12.png", width: 675, height: 900 },
  // Orphic — portrait 3:4
  { url: "/projects/orphic/1.png",  width: 675, height: 900 },
  { url: "/projects/orphic/2.png",  width: 675, height: 900 },
  { url: "/projects/orphic/3.png",  width: 675, height: 900 },
  { url: "/projects/orphic/4.png",  width: 675, height: 900 },
  { url: "/projects/orphic/5.png",  width: 675, height: 900 },
  { url: "/projects/orphic/6.png",  width: 675, height: 900 },
  { url: "/projects/orphic/7.png",  width: 675, height: 900 },
  { url: "/projects/orphic/8.png",  width: 675, height: 900 },
  { url: "/projects/orphic/9.png",  width: 675, height: 900 },
  { url: "/projects/orphic/10.png", width: 675, height: 900 },
  // Shani — portrait 3:4
  { url: "/projects/shani/1.png", width: 675, height: 900 },
  { url: "/projects/shani/2.png", width: 675, height: 900 },
  { url: "/projects/shani/3.png", width: 675, height: 900 },
  { url: "/projects/shani/4.png", width: 675, height: 900 },
  { url: "/projects/shani/5.png", width: 675, height: 900 },
  { url: "/projects/shani/6.png", width: 675, height: 900 },
  { url: "/projects/shani/7.png", width: 675, height: 900 },
  { url: "/projects/shani/8.png", width: 675, height: 900 },
  { url: "/projects/shani/9.png", width: 675, height: 900 },
  // NAVIRA — portrait 3:4
  { url: "/projects/navira/1.png", width: 675, height: 900 },
  { url: "/projects/navira/2.png", width: 675, height: 900 },
  { url: "/projects/navira/3.png", width: 675, height: 900 },
  { url: "/projects/navira/4.png", width: 675, height: 900 },
  { url: "/projects/navira/5.png", width: 675, height: 900 },
  { url: "/projects/navira/6.png", width: 675, height: 900 },
  { url: "/projects/navira/7.png", width: 675, height: 900 },
  { url: "/projects/navira/8.png", width: 675, height: 900 },
  // SOLCHAKRA — portrait 3:4
  { url: "/projects/solchakra/1.png", width: 675, height: 900 },
  { url: "/projects/solchakra/2.png", width: 675, height: 900 },
  { url: "/projects/solchakra/3.png", width: 675, height: 900 },
  { url: "/projects/solchakra/4.png", width: 675, height: 900 },
  { url: "/projects/solchakra/5.png", width: 675, height: 900 },
  { url: "/projects/solchakra/6.png", width: 675, height: 900 },
  { url: "/projects/solchakra/7.png", width: 675, height: 900 },
  { url: "/projects/solchakra/8.png", width: 675, height: 900 },
  { url: "/projects/solchakra/9.png", width: 675, height: 900 },
  // Malabar — portrait 3:4
  { url: "/projects/malabar-diamonds/1.png",  width: 675, height: 900 },
  { url: "/projects/malabar-diamonds/2.png",  width: 675, height: 900 },
  { url: "/projects/malabar-diamonds/3.png",  width: 675, height: 900 },
  { url: "/projects/malabar-diamonds/4.png",  width: 675, height: 900 },
  { url: "/projects/malabar-diamonds/5.png",  width: 675, height: 900 },
  { url: "/projects/malabar-diamonds/6.png",  width: 675, height: 900 },
  { url: "/projects/malabar-diamonds/7.png",  width: 675, height: 900 },
  { url: "/projects/malabar-diamonds/8.png",  width: 675, height: 900 },
  { url: "/projects/malabar-diamonds/9.png",  width: 675, height: 900 },
  { url: "/projects/malabar-diamonds/10.png", width: 675, height: 900 },
  { url: "/projects/malabar-diamonds/11.png", width: 675, height: 900 },
  { url: "/projects/malabar-diamonds/12.png", width: 675, height: 900 },
  { url: "/projects/malabar-diamonds/15.png", width: 675, height: 900 },
  { url: "/projects/malabar-diamonds/18.png", width: 675, height: 900 },
  { url: "/projects/malabar-diamonds/21.png", width: 675, height: 900 },
  // Supreme — portrait 9:16
  { url: "/projects/supreme/1.png",  width: 675, height: 1200 },
  { url: "/projects/supreme/2.png",  width: 675, height: 1200 },
  { url: "/projects/supreme/3.png",  width: 675, height: 1200 },
  { url: "/projects/supreme/4.png",  width: 675, height: 1200 },
  { url: "/projects/supreme/5.png",  width: 675, height: 1200 },
  { url: "/projects/supreme/6.png",  width: 675, height: 1200 },
  // SOL — landscape 16:9 posters
  { url: "/projects/sol/p1.jpg", width: 1280, height: 720 },
  { url: "/projects/sol/p2.jpg", width: 1280, height: 720 },
  { url: "/projects/sol/p3.jpg", width: 1280, height: 720 },
  { url: "/projects/sol/p4.jpg", width: 1280, height: 720 },
  { url: "/projects/sol/p5.jpg", width: 1280, height: 720 },
  // ALDAR — landscape 16:9
  { url: "/projects/aldar/p3.jpg", width: 1280, height: 720 },
  { url: "/projects/aldar/p4.jpg", width: 1280, height: 720 },
  // Sobha — landscape 16:9
  { url: "/projects/sobha/p1.jpg", width: 1280, height: 720 },
  { url: "/projects/sobha/p2.jpg", width: 1280, height: 720 },
  { url: "/projects/sobha/p3.jpg", width: 1280, height: 720 },
  { url: "/projects/sobha/p4.jpg", width: 1280, height: 720 },
  // Ralph Lauren — landscape 16:9
  { url: "/projects/ralph-lauren/p1.jpg", width: 1280, height: 720 },
  { url: "/projects/ralph-lauren/p2.jpg", width: 1280, height: 720 },
  { url: "/projects/ralph-lauren/p3.jpg", width: 1280, height: 720 },
  // Hershey's — landscape 16:9
  { url: "/projects/hersheys/p1.jpg", width: 1280, height: 720 },
  // Patagonia — landscape 16:9
  { url: "/projects/patagonia/p1.jpg", width: 1280, height: 720 },
];

export function InfiniteGallerySection() {
  return (
    <section className="w-full px-6 sm:px-10 py-6">
      <div className="mx-auto w-full max-w-275">
        <InfiniteGallery
          images={GALLERY_IMAGES}
          height="70vh"
          width="100%"
          className="rounded-2xl overflow-hidden"
          backgroundColor="#0a0a0a"
          fogColor="#0a0a0a"
          fogNear={100}
          fogFar={280}
          density={4}
          imageSize={12}
          cellSize={100}
          viewRange={2}
          dragSpeed={1}
          driftAmount={6}
          friction={0.9}
          autoZoom={false}
          imageRadius={0.05}
          allowImageFocusOnClick={true}
        />
        <p className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-foreground/20">
          Drag to explore · Click to focus
        </p>
      </div>
    </section>
  );
}
