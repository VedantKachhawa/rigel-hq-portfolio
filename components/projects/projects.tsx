"use client";

import { ArrowUpRight, Layers } from "lucide-react";
import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Backlight } from "@/components/ui/backlight";
import {
  PROJECTS,
  COLLECTIONS,
  CATEGORY_LABELS,
  type Project,
  type ProjectCollection,
  type ProjectCategory,
} from "@/lib/projects";

type FilterId = "all" | "folders" | ProjectCategory;

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "folders", label: "Folders" },
  { id: "real-estate", label: "Real Estate" },
  { id: "fashion-luxury", label: "Fashion & Luxury" },
  { id: "concept-fashion", label: "Concept Fashion" },
  { id: "food-beverage", label: "Food & Beverage" },
  { id: "technology", label: "Technology" },
];

const COL_SPANS = [7, 5, 5, 7] as const;
const EASE = [0.25, 0.1, 0.25, 1] as const;

type DisplayItem =
  | { type: "project"; data: Project }
  | { type: "collection"; data: ProjectCollection };

const ALL_ITEMS: DisplayItem[] = [
  ...PROJECTS.map((p) => ({ type: "project" as const, data: p })),
  ...COLLECTIONS.map((c) => ({ type: "collection" as const, data: c })),
];

export function Projects(): ReactNode {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");

  const filtered =
    activeFilter === "all"
      ? ALL_ITEMS
      : activeFilter === "folders"
        ? ALL_ITEMS.filter((item) => item.type === "collection")
        : ALL_ITEMS.filter((item) => item.data.category === activeFilter);

  return (
    <section className="relative w-full py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE }}
          className="mb-10 md:mb-14"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px w-8 bg-foreground/20" />
            <span
              className="text-xs uppercase tracking-[0.3em] text-foreground/40"
              style={{ fontFamily: "var(--font-dm-sans, sans-serif)" }}
            >
              Selected Work
            </span>
          </div>
          <h2
            className="text-[2.4rem] font-normal leading-[1.02] tracking-tight text-foreground sm:text-[3rem] md:text-[3.6rem]"
            style={{
              fontFamily:
                "'Instrument Serif', var(--font-instrument-serif), serif",
            }}
          >
            Featured{" "}
            <em className="not-italic text-foreground/35">projects</em>
          </h2>
          <p
            className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/45 sm:text-base"
            style={{ fontFamily: "var(--font-dm-sans, sans-serif)" }}
          >
            A selection of projects we&rsquo;ve worked on, from concept to
            launch.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="mb-10 flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActiveFilter(f.id)}
              className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium tracking-tight transition-colors ${
                activeFilter === f.id
                  ? "bg-foreground text-background"
                  : "border border-foreground/10 text-foreground/60 hover:border-foreground/25 hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
          {activeFilter !== "all" && (
            <span className="ml-1 text-xs tracking-tight text-foreground/35">
              {filtered.length} project{filtered.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Bento grid */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center text-sm text-foreground/40">
            No projects in this category yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
            {filtered.map((item, index) =>
              item.type === "project" ? (
                <BentoCard
                  key={item.data.id}
                  project={item.data}
                  index={index}
                  colSpan={COL_SPANS[index % COL_SPANS.length]}
                />
              ) : (
                <CollectionBentoCard
                  key={item.data.id}
                  collection={item.data}
                  index={index}
                  colSpan={COL_SPANS[index % COL_SPANS.length]}
                />
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function BentoCard({
  project,
  index,
  colSpan,
}: {
  project: Project;
  index: number;
  colSpan: (typeof COL_SPANS)[number];
}): ReactNode {
  const Icon = project.icon;
  const isWide = colSpan === 7;
  const hasRealCover = !project.cardImage.startsWith("https://");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay: Math.min(index * 0.05, 0.25),
        ease: EASE,
      }}
      className={isWide ? "md:col-span-7" : "md:col-span-5"}
    >
      <Backlight blur={8}>
        <Link
          href={`/projects/${project.id}`}
          className="group block cursor-pointer overflow-hidden rounded-3xl border border-foreground/8 bg-foreground/5"
        >
          {/* Image area */}
          <div
            className={`relative w-full overflow-hidden ${
              isWide ? "aspect-[16/10]" : "aspect-[4/3]"
            }`}
          >
            {hasRealCover ? (
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
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/5">
                <span
                  className="text-sm text-foreground/30"
                  style={{ fontFamily: "var(--font-dm-sans, sans-serif)" }}
                >
                  Uploading Soon
                </span>
              </div>
            )}

            {/* Halftone */}
            <div
              className="pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #000 1px, transparent 1px)",
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
                  style={{
                    fontFamily:
                      "'Instrument Serif', var(--font-instrument-serif), serif",
                  }}
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
                <p className="mt-0.5 text-[11px] text-foreground/40">
                  {CATEGORY_LABELS[project.category]}
                </p>
              </div>
            </div>
            <span className="text-[11px] uppercase tracking-widest text-foreground/25">
              {project.meta.split("·")[1]?.trim()}
            </span>
          </div>
        </Link>
      </Backlight>
    </motion.div>
  );
}

function CollectionBentoCard({
  collection,
  index,
  colSpan,
}: {
  collection: ProjectCollection;
  index: number;
  colSpan: (typeof COL_SPANS)[number];
}): ReactNode {
  const Icon = collection.icon;
  const isWide = colSpan === 7;
  const count = collection.subProjects.length;
  const hasRealCover = !collection.cardImage.startsWith("https://");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay: Math.min(index * 0.05, 0.25),
        ease: EASE,
      }}
      className={isWide ? "md:col-span-7" : "md:col-span-5"}
    >
      <Backlight blur={8}>
        <Link
          href={`/projects/${collection.id}`}
          className="group relative block cursor-pointer overflow-hidden rounded-3xl border border-foreground/8 bg-foreground/5"
        >
          {/* Image area */}
          <div
            className={`relative w-full overflow-hidden ${
              isWide ? "aspect-[16/10]" : "aspect-[4/3]"
            }`}
          >
            {hasRealCover ? (
              <Image
                src={collection.cardImage}
                alt={collection.cardImageAlt}
                fill
                sizes={
                  isWide
                    ? "(min-width: 768px) 680px, 100vw"
                    : "(min-width: 768px) 480px, 100vw"
                }
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                priority={index < 2}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/5">
                <span
                  className="text-sm text-foreground/30"
                  style={{ fontFamily: "var(--font-dm-sans, sans-serif)" }}
                >
                  Uploading Soon
                </span>
              </div>
            )}

            {/* Halftone */}
            <div
              className="pointer-events-none absolute inset-0 opacity-20 mix-blend-multiply"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #000 1px, transparent 1px)",
                backgroundSize: "4px 4px",
              }}
              aria-hidden="true"
            />

            {/* Collection badge — top right */}
            <div className="absolute right-3 top-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white/70 backdrop-blur-sm">
                <Layers className="h-3 w-3" aria-hidden="true" />
                {count} {count === 1 ? "project" : "projects"}
              </span>
            </div>

            {/* Hover overlay */}
            <div
              className="absolute inset-0 bg-background/70 opacity-0 backdrop-blur-lg transition-opacity duration-400 group-hover:opacity-100"
              aria-hidden="true"
            />

            {/* Hover pill */}
            <div className="absolute bottom-4 left-4 translate-y-2 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-medium text-black">
                <span>Open</span>
                <span className="text-black/50">—</span>
                <em
                  className="not-italic"
                  style={{
                    fontFamily:
                      "'Instrument Serif', var(--font-instrument-serif), serif",
                  }}
                >
                  {collection.iconLabel}
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
                  {collection.iconLabel}
                </p>
                <p className="mt-0.5 text-[11px] text-foreground/40">
                  {CATEGORY_LABELS[collection.category]}
                </p>
              </div>
            </div>
            <span className="text-[11px] uppercase tracking-widest text-foreground/25">
              {collection.meta.split("·")[1]?.trim()}
            </span>
          </div>
        </Link>
      </Backlight>
    </motion.div>
  );
}
