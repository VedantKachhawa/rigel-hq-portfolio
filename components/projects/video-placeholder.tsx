import { Play } from "lucide-react";
import type { ReactNode } from "react";
import Image from "next/image";

type VideoPlaceholderProps = {
  label: string;
  posterSrc: string;
};

export function VideoPlaceholder({
  label,
  posterSrc,
}: VideoPlaceholderProps): ReactNode {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-foreground/8 bg-foreground/5 aspect-video">
      <Image
        src={posterSrc}
        alt=""
        fill
        sizes="(min-width: 1024px) 900px, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
          <Play
            className="h-7 w-7 text-white translate-x-0.5"
            fill="white"
            strokeWidth={0}
            aria-hidden="true"
          />
        </span>
        <div className="flex flex-col items-center gap-1 text-center px-4">
          <span className="text-[11px] tracking-widest uppercase text-white/50">
            Video placeholder
          </span>
          <span className="text-sm text-white/90 tracking-tight">{label}</span>
        </div>
      </div>
    </div>
  );
}
