import { ProjectsHero } from "@/components/projects/projects-hero";
import { Projects } from "@/components/projects/projects";
import { ProjectsBackground } from "@/components/projects/projects-background";
import { WorkMarquee } from "@/components/projects/work-marquee";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "Work",
  description: "Selected projects and case studies by Rigel HQ.",
  path: "/projects",
});

export default function ProjectsPage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <ProjectsHero />
      <WorkMarquee className="!bg-black" />
      <div className="relative">
        <ProjectsBackground />
        <Projects />
      </div>
      <div className="h-12 sm:h-16" />
    </main>
  );
}
