import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ProjectDetail } from "@/app/projects/[slug]/page";
import {
  getSubProject,
  getAdjacentSubProjects,
  COLLECTIONS,
  CATEGORY_LABELS,
} from "@/lib/projects";
import { createMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ slug: string; subSlug: string }>;
};

export async function generateStaticParams() {
  return COLLECTIONS.flatMap((c) =>
    c.subProjects.map((p) => ({ slug: c.id, subSlug: p.id }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, subSlug } = await params;
  const project = getSubProject(slug, subSlug);
  if (!project) return {};
  return createMetadata({
    title: `${project.iconLabel} — ${CATEGORY_LABELS[project.category]}`,
    description: project.description,
    path: `/projects/${slug}/${subSlug}`,
  });
}

export default async function SubProjectPage({ params }: Props): Promise<ReactNode> {
  const { slug, subSlug } = await params;

  const project = getSubProject(slug, subSlug);
  if (!project) notFound();

  const { prev, next } = getAdjacentSubProjects(slug, subSlug);

  return (
    <ProjectDetail
      project={project}
      backHref={`/projects/${slug}`}
      backLabel="Back to collection"
      prevProject={prev}
      nextProject={next}
      prevHref={`/projects/${slug}`}
    />
  );
}
