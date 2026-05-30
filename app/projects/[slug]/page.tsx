import { ArrowLeft, ArrowRight, ArrowUpRight, Layers } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { FadeIn } from "@/components/ui/motion-primitives";
import { DragCarousel } from "@/components/projects/drag-carousel";
import {
  getProject,
  getCollection,
  getAdjacentProjects,
  PROJECTS,
  COLLECTIONS,
  CATEGORY_LABELS,
  type Project,
  type ProjectCollection,
} from "@/lib/projects";
import { createMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projectParams = PROJECTS.map((p) => ({ slug: p.id }));
  const collectionParams = COLLECTIONS.map((c) => ({ slug: c.id }));
  return [...projectParams, ...collectionParams];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (project) {
    return createMetadata({
      title: project.iconLabel,
      description: project.description,
      path: `/projects/${project.id}`,
    });
  }
  const collection = getCollection(slug);
  if (collection) {
    return createMetadata({
      title: collection.iconLabel,
      description: collection.description,
      path: `/projects/${collection.id}`,
    });
  }
  return {};
}

export default async function ProjectPage({ params }: Props): Promise<ReactNode> {
  const { slug } = await params;

  // ── Collection landing ────────────────────────────────────
  const collection = getCollection(slug);
  if (collection) return <CollectionLanding collection={collection} />;

  // ── Project detail ────────────────────────────────────────
  const project = getProject(slug);
  if (!project) notFound();

  return <ProjectDetail project={project} backHref="/projects" backLabel="All work" />;
}

// ─────────────────────────────────────────────────────────────────────────────
// Collection landing page
// ─────────────────────────────────────────────────────────────────────────────
const COL_SPANS = [7, 5, 5, 7] as const;

function CollectionLanding({ collection }: { collection: ProjectCollection }): ReactNode {
  const Icon = collection.icon;
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <div className="pointer-events-none fixed inset-0 z-[2]" aria-hidden="true">
        {/* Layer 1: blurred card image for texture */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={collection.cardImage}
            alt=""
            fill
            className="object-cover scale-110 opacity-[0.12]"
            style={{ filter: "blur(40px)" }}
            priority
          />
        </div>
        {/* Layer 2: brand color radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 140% 55% at 50% 0%, ${collection.bgAccent}55, transparent 65%)`
          }}
        />
        {/* Layer 3: bottom darkener */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.85) 100%)"
          }}
        />
      </div>
      <div className="mx-auto w-full max-w-[1200px] px-6 pt-32 pb-20 sm:px-10 sm:pt-44 sm:pb-28">
        <FadeIn>
          {/* Back link */}
          <Link
            href="/projects"
            className="focus-ring group mb-10 inline-flex items-center gap-2 text-sm text-foreground/50 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            All work
          </Link>

          {/* Collection header */}
          <div className="flex items-center gap-3 mt-2">
            <span className="border-foreground/10 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-background">
              <Icon className="h-4 w-4 text-foreground" aria-hidden="true" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[1.75rem] font-medium tracking-tight text-foreground sm:text-[2.25rem]">
                  {collection.iconLabel}
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full border border-foreground/10 bg-foreground/5 px-2.5 py-0.5 text-[11px] text-foreground/40">
                  <Layers className="h-3 w-3" aria-hidden="true" />
                  {collection.subProjects.length} {collection.subProjects.length === 1 ? "project" : "projects"}
                </span>
              </div>
              <p className="mt-0.5 text-[13px] tracking-tight text-foreground/40">
                <span className="capitalize">{CATEGORY_LABELS[collection.category]}</span>
                <span className="mx-2 text-foreground/20">·</span>
                {collection.meta}
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Sub-project grid */}
        <FadeIn delay={0.08} className="mt-14 sm:mt-20">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
            {collection.subProjects.map((sub, index) => (
              <SubProjectCard
                key={sub.id}
                project={sub}
                collectionId={collection.id}
                index={index}
                colSpan={COL_SPANS[index % COL_SPANS.length]}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </main>
  );
}

function SubProjectCard({
  project,
  collectionId,
  index,
  colSpan,
}: {
  project: Project;
  collectionId: string;
  index: number;
  colSpan: (typeof COL_SPANS)[number];
}): ReactNode {
  const Icon = project.icon;
  const isWide = colSpan === 7;

  return (
    <div className={isWide ? "md:col-span-7" : "md:col-span-5"}>
      <Link
        href={`/projects/${collectionId}/${project.id}`}
        className="group block cursor-pointer overflow-hidden rounded-3xl border border-foreground/8 bg-foreground/5"
      >
        {/* Image area */}
        <div
          className={`relative w-full overflow-hidden ${
            isWide ? "aspect-[16/10]" : "aspect-[4/3]"
          }`}
        >
          <Image
            src={project.cardImage}
            alt={project.cardImageAlt}
            fill
            sizes={
              isWide
                ? "(min-width: 768px) 680px, 100vw"
                : "(min-width: 768px) 480px, 100vw"
            }
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority={index < 2}
          />

          {/* Halftone */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply"
            style={{
              backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
              backgroundSize: "4px 4px",
            }}
            aria-hidden="true"
          />

          {/* Hover overlay */}
          <div
            className="absolute inset-0 bg-background/70 opacity-0 backdrop-blur-lg transition-opacity duration-400 group-hover:opacity-100"
            aria-hidden="true"
          />

          {/* Hover pill */}
          <div className="absolute bottom-4 left-4 translate-y-2 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-medium text-black">
              <span>View</span>
              <span className="text-black/50">—</span>
              <em
                className="not-italic"
                style={{ fontFamily: "'Instrument Serif', var(--font-instrument-serif), serif" }}
              >
                {project.iconLabel}
              </em>
              <ArrowUpRight className="h-3 w-3 text-black/60" />
            </span>
          </div>
        </div>

        {/* Card footer */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-foreground/10 bg-background">
              <Icon className="h-3.5 w-3.5 text-foreground/60" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[14px] font-medium leading-tight text-foreground">
                {project.iconLabel}
              </p>
              <p className="mt-0.5 text-[11px] text-foreground/40">{project.tagline}</p>
            </div>
          </div>
          <span className="text-[11px] uppercase tracking-widest text-foreground/25">
            {project.meta.split("·")[1]?.trim()}
          </span>
        </div>
      </Link>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared project detail layout
// ─────────────────────────────────────────────────────────────────────────────
export function ProjectDetail({
  project,
  backHref,
  backLabel,
  prevHref,
  nextProject,
  prevProject,
}: {
  project: Project;
  backHref: string;
  backLabel: string;
  prevHref?: string;
  nextProject?: Project | null;
  prevProject?: Project | null;
}): ReactNode {
  const Icon = project.icon;

  const images = project.mediaType !== "video-only" ? project.images : [];
  const videos = project.mediaType !== "photo-only" ? project.videos : [];
  const hasMedia = images.length > 0 || videos.length > 0;
  const hasRealMedia =
    images.some((img) => img.src.startsWith("/projects/")) ||
    videos.some((v) => v.src?.startsWith("/projects/"));

  // Fall back to adjacent flat projects if no explicit prev/next passed
  const { prev: adjPrev, next: adjNext } = getAdjacentProjects(project.id);
  const prev = prevProject !== undefined ? prevProject : adjPrev;
  const next = nextProject !== undefined ? nextProject : adjNext;

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <div className="pointer-events-none fixed inset-0 z-[2]" aria-hidden="true">
        {/* Layer 1: blurred card image for texture */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={project.cardImage}
            alt=""
            fill
            className="object-cover scale-110 opacity-[0.12]"
            style={{ filter: "blur(40px)" }}
            priority
          />
        </div>
        {/* Layer 2: brand color radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 140% 55% at 50% 0%, ${project.bgAccent}55, transparent 65%)`
          }}
        />
        {/* Layer 3: bottom darkener */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.85) 100%)"
          }}
        />
      </div>
      <div className="mx-auto w-full max-w-275 px-6 pt-32 pb-20 sm:px-10 sm:pt-44 sm:pb-28">
        {/* Header */}
        <FadeIn>
          <Link
            href={backHref}
            className="focus-ring group mb-10 inline-flex items-center gap-2 text-sm text-foreground/50 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            {backLabel}
          </Link>

          <div className="flex items-center gap-3 mt-2">
            <span className="border-foreground/10 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-background">
              <Icon className="h-4 w-4 text-foreground" aria-hidden="true" />
            </span>
            <div>
              <h1 className="text-[1.75rem] font-medium tracking-tight text-foreground sm:text-[2.25rem]">
                {project.iconLabel}
              </h1>
              <p className="mt-0.5 text-[13px] tracking-tight text-foreground/40">
                <span className="capitalize">{CATEGORY_LABELS[project.category]}</span>
                <span className="mx-2 text-foreground/20">·</span>
                {project.meta}
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Media — carousel + MediaModal videos */}
        {hasMedia && (
          <FadeIn delay={0.08} className="relative z-[10000] mt-14 sm:mt-20">
            {hasRealMedia ? (
              <DragCarousel images={images} videos={videos} />
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-foreground/8 bg-foreground/[0.03] py-20 gap-3">
                <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-foreground/25">
                  Uploading Soon
                </span>
              </div>
            )}
          </FadeIn>
        )}

        {/* Prev / Next */}
        {(prev || next) && (
          <FadeIn delay={0.16} className="mt-16 border-t border-foreground/8 pt-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              {prev && (
                <Link
                  href={prevHref ? `${prevHref}/${prev.id}` : `/projects/${prev.id}`}
                  className="focus-ring group flex-1 rounded-2xl border border-foreground/8 p-5 transition-colors hover:bg-foreground/3"
                >
                  <span className="mb-2 flex items-center gap-2 text-[11px] tracking-widest uppercase text-foreground/40">
                    <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-0.5" />
                    Previous
                  </span>
                  <span className="text-[15px] font-medium text-foreground">
                    {prev.iconLabel}
                  </span>
                </Link>
              )}
              {next && (
                <Link
                  href={prevHref ? `${prevHref}/${next.id}` : `/projects/${next.id}`}
                  className="focus-ring group flex-1 rounded-2xl border border-foreground/8 p-5 text-right transition-colors hover:bg-foreground/3"
                >
                  <span className="mb-2 flex items-center justify-end gap-2 text-[11px] tracking-widest uppercase text-foreground/40">
                    Next
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="text-[15px] font-medium text-foreground">
                    {next.iconLabel}
                  </span>
                </Link>
              )}
            </div>
          </FadeIn>
        )}
      </div>
    </main>
  );
}
