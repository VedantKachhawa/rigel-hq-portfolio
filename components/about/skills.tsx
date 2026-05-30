import type { ReactNode } from "react";

const SERVICES = [
  {
    name: "Content Production",
    tagline: "Photos and video built for impact",
  },
  {
    name: "Ad Campaigns",
    tagline: "Creative that converts",
  },
  {
    name: "Website Development",
    tagline: "2D and 3D, built to perform",
  },
  {
    name: "Social Media Management",
    tagline: "Growth with intention",
  },
  {
    name: "Strategy and Planning",
    tagline: "Research-led, results-driven",
  },
];

export function Skills(): ReactNode {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
        Here&rsquo;s what we do
      </h3>
      <div className="rounded-4xl border border-foreground/5 bg-foreground/2 p-3 dark:bg-foreground/5 sm:p-5">
        <ul className="flex flex-col divide-y divide-foreground/5">
          {SERVICES.map((s) => (
            <li
              key={s.name}
              className="flex items-baseline gap-3 py-3 first:pt-1 last:pb-1"
            >
              <span
                className="shrink-0 text-foreground/30 text-[13px] select-none"
                aria-hidden="true"
              >
                →
              </span>
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="text-[15px] font-semibold tracking-tight text-foreground sm:text-[16px]">
                  {s.name}
                </span>
                <span className="text-[13px] tracking-tight text-foreground/50">
                  — {s.tagline}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
