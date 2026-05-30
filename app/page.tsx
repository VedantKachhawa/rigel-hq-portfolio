import { Hero } from "@/components/hero/hero";
import { HomeWrapper } from "@/components/home/home-wrapper";
import { ImmersiveIntro } from "@/components/home/immersive-intro";
import { MarqueeStrip } from "@/components/home/marquee-strip";
import { StatsSection } from "@/components/home/stats-section";
import { InfiniteGallerySection } from "@/components/home/infinite-gallery-section";
import { HomeBento } from "@/components/home/home-bento";
import { WorkMarquee } from "@/components/projects/work-marquee";
import { createMetadata, siteConfig } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Home",
  description: `Welcome to ${siteConfig.name}. ${siteConfig.description}`,
  path: "/",
});

export default function HomePage(): ReactNode {
  return (
    <>
      <ImmersiveIntro />
      {/* Dark breathing room — user scrolls through darkness before hero reveals */}
      <div aria-hidden="true" style={{ height: "55vh", background: "#0a0608" }} />
      <HomeWrapper>
      <main id="main-content" className="flex flex-1 flex-col">
        {/* 1 — Full-viewport cinematic hero */}
        <Hero />

        {/* 2 — Marquee strip */}
        <MarqueeStrip />

        {/* 3 — Stats */}
        <StatsSection />

        {/* 4 — Infinite gallery */}
        <InfiniteGallerySection />

        {/* 5 — Featured bento grid */}
        <HomeBento />

        <WorkMarquee />
      </main>
      </HomeWrapper>
    </>
  );
}
