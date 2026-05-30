import { AboutVideoHero } from "@/components/about/about-video-hero";
import { StudioFeatures } from "@/components/about/studio-features";
import { Team } from "@/components/about/team";
import { WeAreRigel } from "@/components/about/we-are-rigel";
import { StudioBackground } from "@/components/about/studio-background";
import { WorkMarquee } from "@/components/projects/work-marquee";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { LanyardLoader } from "@/components/studio/lanyard-loader";

export const metadata: Metadata = createMetadata({
  title: "Studio",
  description:
    "About Rigel HQ — our story, services, and the team behind the work.",
  path: "/about",
});

export default function AboutPage(): ReactNode {
  return (
    <main id="main-content" className="relative flex flex-1 flex-col">
      {/* PixelBlast background for content below hero */}
      <StudioBackground />

      {/* Full-screen video hero */}
      <AboutVideoHero />

      <WorkMarquee />

      {/* Main section — lanyard floats over this area only */}
      <div className="relative">
        {/* Interactive lanyard — right side, scoped to main section */}
        <LanyardLoader />

        {/* Bio */}
        <WeAreRigel />

        {/* Studio features bento */}
        <StudioFeatures />

        {/* Full team + experience */}
        <Team />
      </div>
    </main>
  );
}
