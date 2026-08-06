import { AmbientVideo } from "@/components/ui/ambient-video";
import { VIDEOS } from "@/lib/media";

export function ProjectsBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <AmbientVideo src={VIDEOS.projectsHero} />
      {/* Dark overlay so project cards remain legible */}
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />
    </div>
  );
}
