import {
  Award,
  Building2,
  Clock,
  Crown,
  Eye,
  Film,
  Gem,
  Heart,
  Hexagon,
  Home,
  Leaf,
  Mic2,
  Scissors,
  Sparkles,
  Star,
  Sun,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type MediaType = "both" | "video-only" | "photo-only";

export type ProjectCategory =
  | "real-estate"
  | "fashion-luxury"
  | "concept-fashion"
  | "food-beverage"
  | "technology";

export type ProjectImage = {
  src: string;
  alt: string;
  aspect: "square" | "landscape" | "portrait" | "wide";
};

export type ProjectVideo = {
  label: string;
  poster: string;
  /** Local or remote MP4 path, e.g. /projects/aldar/v1.mp4 */
  src?: string;
  vimeoId?: string;
  /** padding-top % for the iframe aspect ratio, e.g. "56.25%" = 16:9 */
  vimeoPadding?: string;
};

export type Project = {
  id: string;
  icon: LucideIcon;
  iconLabel: string;
  tagline: string;
  description: string;
  meta: string;
  imageRatio: number;
  cardImage: string;
  cardImageAlt: string;
  mediaType: MediaType;
  category: ProjectCategory;
  images: ProjectImage[];
  videos: ProjectVideo[];
  displayMode?: "grid" | "carousel";
  bgAccent: string;
};

export type ProjectCollection = {
  id: string;
  icon: LucideIcon;
  iconLabel: string;
  tagline: string;
  description: string;
  meta: string;
  cardImage: string;
  cardImageAlt: string;
  category: ProjectCategory;
  subProjects: Project[];
  bgAccent: string;
};

const PIC = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const ASPECT_CYCLE: ProjectImage["aspect"][] = [
  "wide",
  "landscape",
  "portrait",
  "square",
  "landscape",
  "wide",
  "landscape",
  "portrait",
  "square",
  "landscape",
  "wide",
  "landscape",
  "portrait",
  "square",
  "landscape",
  "wide",
];

function buildImages(id: string, label: string, count = 6): ProjectImage[] {
  return Array.from({ length: count }, (_, i) => {
    const aspect = ASPECT_CYCLE[i % ASPECT_CYCLE.length] as ProjectImage["aspect"];
    const [w, h] =
      aspect === "wide"
        ? [1600, 900]
        : aspect === "landscape"
          ? [1200, 800]
          : aspect === "portrait"
            ? [800, 1000]
            : [1000, 1000];
    return {
      src: PIC(`${id}-${i + 1}`, w, h),
      alt: `${label} ${i + 1}`,
      aspect,
    };
  });
}

function buildVideos(id: string, count = 2): ProjectVideo[] {
  return Array.from({ length: count }, (_, i) => ({
    label: `Video ${String(i + 1).padStart(2, "0")}`,
    poster: PIC(`${id}-v${i + 1}`, 1920, 1080),
  }));
}

// ── Flat projects ─────────────────────────────────────────────────────────────
export const PROJECTS: Project[] = [
  // ── Real Estate ──────────────────────────────────────────
  {
    id: "sol",
    icon: Sun,
    iconLabel: "SOL",
    tagline: "Residential campaign",
    description: "Video production",
    meta: "SOL · Dubai, 2026",
    imageRatio: 16 / 9,
    cardImage: "/projects/sol/p1.jpg",
    cardImageAlt: "SOL",
    category: "real-estate",
    mediaType: "video-only",
    bgAccent: "#D4A574",
    images: [],
    videos: [
      { label: "SOL Walkthrough 01", poster: "/projects/sol/p1.jpg", src: "/projects/sol/v1.mp4" },
      { label: "SOL Walkthrough 02", poster: "/projects/sol/p2.jpg", src: "/projects/sol/v2.mp4" },
      { label: "SOL Walkthrough 03", poster: "/projects/sol/p3.jpg", src: "/projects/sol/v3.mp4" },
      { label: "SOL Walkthrough 04", poster: "/projects/sol/p4.jpg", src: "/projects/sol/v4.mp4" },
      { label: "SOL Walkthrough 05", poster: "/projects/sol/p5.jpg", src: "/projects/sol/v5.mp4" },
    ],
  },
  {
    id: "aldar",
    icon: Building2,
    iconLabel: "ALDAR",
    tagline: "Property showcase",
    description: "Video production",
    meta: "ALDAR · Abu Dhabi, 2026",
    imageRatio: 16 / 9,
    cardImage: "/projects/aldar/p3.jpg",
    cardImageAlt: "ALDAR",
    category: "real-estate",
    mediaType: "video-only",
    bgAccent: "#B8956A",
    images: [],
    videos: [
      { label: "ALDAR Walkthrough 01", poster: "/projects/aldar/p3.jpg", src: "/projects/aldar/v3.mp4" },
      { label: "ALDAR Walkthrough 02", poster: "/projects/aldar/p4.jpg", src: "/projects/aldar/v4.mp4" },
    ],
  },
  {
    id: "sobha",
    icon: Home,
    iconLabel: "Sobha",
    tagline: "Development film",
    description: "Video production",
    meta: "Sobha · Dubai, 2026",
    imageRatio: 16 / 9,
    cardImage: "/projects/sobha/p1.jpg",
    cardImageAlt: "Sobha",
    category: "real-estate",
    mediaType: "video-only",
    bgAccent: "#2D6A4F",
    images: [],
    videos: [
      { label: "Sobha Walkthrough 01", poster: "/projects/sobha/p1.jpg", src: "/projects/sobha/v1.mp4" },
      { label: "Sobha Walkthrough 02", poster: "/projects/sobha/p2.jpg", src: "/projects/sobha/v2.mp4" },
      { label: "Sobha Walkthrough 03", poster: "/projects/sobha/p3.jpg", src: "/projects/sobha/v3.mp4" },
      { label: "Sobha Walkthrough 04", poster: "/projects/sobha/p4.jpg", src: "/projects/sobha/v4.mp4" },
    ],
  },

  // ── Fashion & Luxury ──────────────────────────────────────
  {
    id: "dior",
    icon: Star,
    iconLabel: "DIOR",
    tagline: "Fashion film",
    description: "Video production",
    meta: "DIOR · Dubai, 2026",
    imageRatio: 16 / 9,
    cardImage: "/projects/dior/cover.jpg",
    cardImageAlt: "DIOR",
    category: "fashion-luxury",
    mediaType: "video-only",
    bgAccent: "#C8A4A4",
    images: [],
    videos: [
      { label: "DIOR 01", poster: "/projects/dior/p1.jpg", src: "/projects/dior/v1.mp4" },
      { label: "DIOR 02", poster: "/projects/dior/p2.jpg", src: "/projects/dior/v2.mp4" },
      { label: "DIOR 03", poster: "/projects/dior/p3.jpg", src: "/projects/dior/v3.mp4" },
      { label: "DIOR 04", poster: "/projects/dior/p4.jpg", src: "/projects/dior/v4.mp4" },
      { label: "DIOR 05", poster: "/projects/dior/p5.jpg", src: "/projects/dior/v5.mp4" },
      { label: "DIOR 06", poster: "/projects/dior/p6.jpg", src: "/projects/dior/v6.mp4" },
    ],
  },
  {
    id: "ralph-lauren",
    icon: Award,
    iconLabel: "Ralph Lauren",
    tagline: "Brand campaign",
    description: "Video production",
    meta: "Ralph Lauren · Dubai, 2026",
    imageRatio: 16 / 9,
    cardImage: "/projects/ralph-lauren/cover.jpg",
    cardImageAlt: "Ralph Lauren",
    category: "fashion-luxury",
    mediaType: "video-only",
    bgAccent: "#2C3E6B",
    images: [],
    videos: [
      { label: "Ralph Lauren Advertisement 01", poster: "/projects/ralph-lauren/p1.jpg", src: "/projects/ralph-lauren/v1.mp4" },
      { label: "Ralph Lauren Advertisement 02", poster: "/projects/ralph-lauren/p2.jpg", src: "/projects/ralph-lauren/v2.mp4" },
      { label: "Ralph Lauren Advertisement 03", poster: "/projects/ralph-lauren/p3.jpg", src: "/projects/ralph-lauren/v3.mp4" },
    ],
  },
  {
    id: "supreme",
    icon: Crown,
    iconLabel: "Supreme",
    tagline: "Drop photography",
    description: "Photography",
    meta: "Supreme · Dubai, 2026",
    imageRatio: 9 / 16,
    cardImage: "/projects/supreme/7.png",
    cardImageAlt: "Supreme",
    category: "fashion-luxury",
    mediaType: "photo-only",
    bgAccent: "#C41E3A",
    images: Array.from({ length: 15 }, (_, i) => ({
      src: `/projects/supreme/${i + 1}.png`,
      alt: `Supreme ${String(i + 1).padStart(2, "0")}`,
      aspect: "portrait" as const,
    })),
    videos: [],
  },
  {
    id: "orphic",
    icon: Eye,
    iconLabel: "Orphic",
    tagline: "Brand editorial",
    description: "Photo & video",
    meta: "Orphic · Dubai, 2026",
    imageRatio: 3 / 4,
    cardImage: "/projects/orphic/cover.jpg",
    cardImageAlt: "Orphic",
    category: "fashion-luxury",
    mediaType: "both",
    bgAccent: "#5B3A8C",
    displayMode: "carousel",
    images: [
      { src: "/projects/orphic/1.png",  alt: "Orphic 01",  aspect: "portrait" as const },
      { src: "/projects/orphic/2.png",  alt: "Orphic 02",  aspect: "portrait" as const },
      { src: "/projects/orphic/3.png",  alt: "Orphic 03",  aspect: "portrait" as const },
      { src: "/projects/orphic/4.png",  alt: "Orphic 04",  aspect: "portrait" as const },
      { src: "/projects/orphic/5.png",  alt: "Orphic 05",  aspect: "portrait" as const },
      { src: "/projects/orphic/6.png",  alt: "Orphic 06",  aspect: "portrait" as const },
      { src: "/projects/orphic/7.png",  alt: "Orphic 07",  aspect: "portrait" as const },
      { src: "/projects/orphic/8.png",  alt: "Orphic 08",  aspect: "portrait" as const },
      { src: "/projects/orphic/9.png",  alt: "Orphic 09",  aspect: "portrait" as const },
      { src: "/projects/orphic/10.png", alt: "Orphic 10",  aspect: "portrait" as const },
    ],
    videos: [
      { label: "Orphic 01", poster: "/projects/orphic/p1.jpg", src: "/projects/orphic/v1.mp4" },
      { label: "Orphic 02", poster: "/projects/orphic/p2.jpg", src: "/projects/orphic/v2.mp4" },
      { label: "Orphic 03", poster: "/projects/orphic/p3.jpg", src: "/projects/orphic/v3.mp4" },
      { label: "Orphic 04", poster: "/projects/orphic/p4.jpg", src: "/projects/orphic/v4.mp4" },
    ],
  },
  {
    id: "jacob-and-co",
    icon: Clock,
    iconLabel: "Jacob & Co",
    tagline: "Watchmaking film",
    description: "Video production",
    meta: "Jacob & Co · Dubai, 2026",
    imageRatio: 16 / 9,
    cardImage: PIC("jacob-and-co-card", 800, 450),
    cardImageAlt: "Jacob & Co",
    category: "fashion-luxury",
    mediaType: "video-only",
    bgAccent: "#C9A84C",
    images: [],
    videos: buildVideos("jacob-and-co"),
  },
  {
    id: "ismojo",
    icon: Zap,
    iconLabel: "ISMOJO",
    tagline: "Lifestyle editorial",
    description: "Photography",
    meta: "ISMOJO · Dubai, 2026",
    imageRatio: 4 / 3,
    cardImage: PIC("ismojo-card", 800, 600),
    cardImageAlt: "ISMOJO",
    category: "technology",
    mediaType: "photo-only",
    bgAccent: "#1D6FA4",
    images: buildImages("ismojo", "ISMOJO", 16),
    videos: [],
  },
  {
    id: "patagonia",
    icon: Leaf,
    iconLabel: "Patagonia",
    tagline: "Outdoor editorial",
    description: "Photo & video",
    meta: "Patagonia · Dubai, 2026",
    imageRatio: 4 / 3,
    cardImage: "/projects/patagonia/p2.jpg",
    cardImageAlt: "Patagonia",
    category: "fashion-luxury",
    mediaType: "video-only",
    bgAccent: "#2E8B8B",
    images: [],
    videos: [
      { label: "Patagonia 01", poster: "/projects/patagonia/p1.jpg", src: "/projects/patagonia/v1.mp4" },
    ],
  },

  // ── Concept Fashion ───────────────────────────────────────
  {
    id: "avant-grande",
    icon: Film,
    iconLabel: "Avant-Grande",
    tagline: "Multi-brand video",
    description: "Video production",
    meta: "Avant-Grande · KCAL · Balenciaga, 2026",
    imageRatio: 16 / 9,
    cardImage: PIC("avant-grande-card", 800, 450),
    cardImageAlt: "Avant-Grande",
    category: "concept-fashion",
    mediaType: "video-only",
    bgAccent: "#607080",
    images: [],
    videos: buildVideos("avant-grande"),
  },

  // ── Food & Beverage ───────────────────────────────────────
  {
    id: "fizzbears",
    icon: Sparkles,
    iconLabel: "Fizzbears",
    tagline: "Product campaign",
    description: "Video production",
    meta: "Fizzbears · Dubai, 2026",
    imageRatio: 16 / 9,
    cardImage: "/projects/fizzbears/p2.jpg",
    cardImageAlt: "Fizzbears",
    category: "food-beverage",
    mediaType: "video-only",
    bgAccent: "#E05A8A",
    images: [],
    videos: [
      { label: "Fizzbears 01", poster: "/projects/fizzbears/p1.jpg", src: "/projects/fizzbears/v1.mp4" },
      { label: "Fizzbears 02", poster: "/projects/fizzbears/p2.jpg", src: "/projects/fizzbears/v2.mp4" },
    ],
  },
  {
    id: "hersheys",
    icon: Heart,
    iconLabel: "Hershey's",
    tagline: "Brand film",
    description: "Photo & video",
    meta: "Hershey's · Middle East, 2026",
    imageRatio: 4 / 3,
    cardImage: "/projects/hersheys/p1.jpg",
    cardImageAlt: "Hershey's",
    category: "food-beverage",
    mediaType: "video-only",
    bgAccent: "#4A2106",
    images: [],
    videos: [
      { label: "Hershey's 01", poster: "/projects/hersheys/p1.jpg", src: "/projects/hersheys/v1.mp4" },
    ],
  },
];

// ── Collections (nested brand folders) ───────────────────────────────────────
export const COLLECTIONS: ProjectCollection[] = [
  {
    id: "totem",
    icon: Hexagon,
    iconLabel: "TOTEM",
    tagline: "Creative editorial",
    description: "Photo & video",
    meta: "TOTEM · Dubai, 2026",
    cardImage: "/projects/shani/cover.jpg",
    cardImageAlt: "TOTEM",
    category: "concept-fashion",
    bgAccent: "#8B5E3C",
    subProjects: [
      {
        id: "navira",
        icon: Sparkles,
        iconLabel: "NAVIRA",
        tagline: "Concept fashion",
        description: "Photo & video",
        meta: "TOTEM · NAVIRA · Dubai, 2026",
        imageRatio: 3 / 4,
        cardImage: "/projects/navira/1.png",
        cardImageAlt: "NAVIRA",
        category: "concept-fashion",
        mediaType: "both",
        displayMode: "carousel",
        bgAccent: "#8B5E3C",
        images: Array.from({ length: 8 }, (_, i) => ({
          src: `/projects/navira/${i + 1}.png`,
          alt: `NAVIRA ${String(i + 1).padStart(2, "0")}`,
          aspect: "portrait" as const,
        })),
        videos: [
          { label: "NAVIRA 01", poster: "/projects/navira/p1.jpg", src: "/projects/navira/v1.mp4" },
          { label: "NAVIRA 02", poster: "/projects/navira/p2.jpg", src: "/projects/navira/v2.mp4" },
          { label: "NAVIRA 03", poster: "/projects/navira/p3.jpg", src: "/projects/navira/v3.mp4" },
          { label: "NAVIRA 04", poster: "/projects/navira/p4.jpg", src: "/projects/navira/v4.mp4" },
        ],
      },
      {
        id: "shani",
        icon: Scissors,
        iconLabel: "shani",
        tagline: "Concept fashion film",
        description: "Photo & video",
        meta: "TOTEM · shani · Dubai, 2026",
        imageRatio: 3 / 4,
        cardImage: "/projects/shani/1.png",
        cardImageAlt: "shani",
        category: "concept-fashion",
        mediaType: "both",
        displayMode: "carousel",
        bgAccent: "#8B5E3C",
        images: Array.from({ length: 9 }, (_, i) => ({
          src: `/projects/shani/${i + 1}.png`,
          alt: `shani ${String(i + 1).padStart(2, "0")}`,
          aspect: "portrait" as const,
        })),
        videos: [
          { label: "Shani 01", poster: "/projects/shani/p1.jpg", src: "/projects/shani/v1.mp4" },
          { label: "Shani 02", poster: "/projects/shani/p2.jpg", src: "/projects/shani/v2.mp4" },
          { label: "Shani 03", poster: "/projects/shani/p3.jpg", src: "/projects/shani/v3.mp4" },
          { label: "Shani 04", poster: "/projects/shani/p4.jpg", src: "/projects/shani/v4.mp4" },
        ],
      },
      {
        id: "solchakra",
        icon: Sparkles,
        iconLabel: "SOLCHAKRA",
        tagline: "Concept fashion",
        description: "Photo & video",
        meta: "TOTEM · SOLCHAKRA · Dubai, 2026",
        imageRatio: 3 / 4,
        cardImage: "/projects/solchakra/1.png",
        cardImageAlt: "SOLCHAKRA",
        category: "concept-fashion",
        mediaType: "both",
        displayMode: "carousel",
        bgAccent: "#8B5E3C",
        images: Array.from({ length: 9 }, (_, i) => ({
          src: `/projects/solchakra/${i + 1}.png`,
          alt: `SOLCHAKRA ${String(i + 1).padStart(2, "0")}`,
          aspect: "portrait" as const,
        })),
        videos: [
          { label: "SOLCHAKRA 01", poster: "/projects/solchakra/p1.jpg", src: "/projects/solchakra/v1.mp4" },
          { label: "SOLCHAKRA 02", poster: "/projects/solchakra/p2.jpg", src: "/projects/solchakra/v2.mp4" },
          { label: "SOLCHAKRA 03", poster: "/projects/solchakra/p3.jpg", src: "/projects/solchakra/v3.mp4" },
          { label: "SOLCHAKRA 04", poster: "/projects/solchakra/p4.jpg", src: "/projects/solchakra/v4.mp4" },
        ],
      },
    ],
  },
  {
    id: "call-me-krazy",
    icon: Mic2,
    iconLabel: "Call Me Krazy",
    tagline: "Campaign production",
    description: "Photo & video",
    meta: "Call Me Krazy · Dubai, 2026",
    cardImage: "/projects/kaleidogami/cover.jpg",
    cardImageAlt: "Call Me Krazy",
    category: "concept-fashion",
    bgAccent: "#8B2FC9",
    subProjects: [
      {
        id: "kaleidogami",
        icon: Sparkles,
        iconLabel: "Kaleidogami",
        tagline: "Call Me Krazy",
        description: "Photography",
        meta: "Call Me Krazy · Kaleidogami · Dubai, 2026",
        imageRatio: 3 / 4,
        cardImage: "/projects/kaleidogami/1.png",
        cardImageAlt: "Kaleidogami — Call Me Krazy",
        category: "concept-fashion",
        mediaType: "both",
        displayMode: "carousel",
        bgAccent: "#8B2FC9",
        images: [
          { src: "/projects/kaleidogami/1.png",  alt: "Kaleidogami 01",  aspect: "portrait" },
          { src: "/projects/kaleidogami/2.png",  alt: "Kaleidogami 02",  aspect: "portrait" },
          { src: "/projects/kaleidogami/3.png",  alt: "Kaleidogami 03",  aspect: "portrait" },
          { src: "/projects/kaleidogami/4.png",  alt: "Kaleidogami 04",  aspect: "portrait" },
          { src: "/projects/kaleidogami/5.png",  alt: "Kaleidogami 05",  aspect: "portrait" },
          { src: "/projects/kaleidogami/6.png",  alt: "Kaleidogami 06",  aspect: "portrait" },
          { src: "/projects/kaleidogami/7.png",  alt: "Kaleidogami 07",  aspect: "portrait" },
          { src: "/projects/kaleidogami/8.png",  alt: "Kaleidogami 08",  aspect: "portrait" },
          { src: "/projects/kaleidogami/9.png",  alt: "Kaleidogami 09",  aspect: "portrait" },
          { src: "/projects/kaleidogami/10.png", alt: "Kaleidogami 10",  aspect: "portrait" },
          { src: "/projects/kaleidogami/11.png", alt: "Kaleidogami 11",  aspect: "portrait" },
          { src: "/projects/kaleidogami/12.png", alt: "Kaleidogami 12",  aspect: "portrait" },
        ],
        videos: [
          { label: "Kaleidogami 01", poster: "/projects/kaleidogami/p1.jpg", src: "/projects/kaleidogami/v1.mp4" },
          { label: "Kaleidogami 02", poster: "/projects/kaleidogami/p2.jpg", src: "/projects/kaleidogami/v2.mp4" },
          { label: "Kaleidogami 03", poster: "/projects/kaleidogami/p3.jpg", src: "/projects/kaleidogami/v3.mp4" },
        ],
      },
      {
        id: "campaign",
        icon: Mic2,
        iconLabel: "Campaign",
        tagline: "Campaign production",
        description: "Photo & video",
        meta: "Call Me Krazy · Dubai, 2026",
        imageRatio: 4 / 3,
        cardImage: PIC("call-me-krazy-card", 800, 600),
        cardImageAlt: "Call Me Krazy — Campaign",
        category: "concept-fashion",
        mediaType: "both",
        bgAccent: "#8B2FC9",
        images: buildImages("call-me-krazy", "Call Me Krazy", 16),
        videos: buildVideos("call-me-krazy"),
      },
    ],
  },
  {
    id: "malabar-gold-diamonds",
    icon: Gem,
    iconLabel: "Malabar Gold & Diamonds",
    tagline: "Jewellery production",
    description: "Video production",
    meta: "Malabar Gold & Diamonds · Dubai, 2026",
    cardImage: "/projects/malabar-diamonds/5.png",
    cardImageAlt: "Malabar Gold & Diamonds",
    category: "fashion-luxury",
    bgAccent: "#D4AF37",
    subProjects: [
      {
        id: "necklace",
        icon: Gem,
        iconLabel: "Necklace",
        tagline: "Necklace film",
        description: "Photo & video",
        meta: "Malabar Gold & Diamonds · Dubai, 2026",
        imageRatio: 3 / 4,
        cardImage: "/projects/malabar-diamonds/1.png",
        cardImageAlt: "Malabar Gold & Diamonds — Necklace",
        category: "fashion-luxury",
        mediaType: "both",
        displayMode: "carousel",
        bgAccent: "#D4AF37",
        images: Array.from({ length: 21 }, (_, i) => ({
          src: `/projects/malabar-diamonds/${i + 1}.png`,
          alt: `Necklace ${String(i + 1).padStart(2, "0")}`,
          aspect: "portrait" as const,
        })),
        videos: [
          { label: "Necklace Film", poster: "/projects/malabar-diamonds/p1.jpg", src: "/projects/malabar-diamonds/v1.mp4" },
        ],
      },
    ],
  },
];

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  "real-estate": "Real Estate",
  "fashion-luxury": "Fashion & Luxury",
  "concept-fashion": "Concept Fashion",
  "food-beverage": "Food & Beverage",
  "technology": "Technology",
};

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.id === slug);
}

export function getCollection(slug: string): ProjectCollection | undefined {
  return COLLECTIONS.find((c) => c.id === slug);
}

export function getSubProject(collectionSlug: string, subSlug: string): Project | undefined {
  return getCollection(collectionSlug)?.subProjects.find((p) => p.id === subSlug);
}

export function getAdjacentProjects(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const idx = PROJECTS.findIndex((p) => p.id === slug);
  return {
    prev: idx > 0 ? (PROJECTS[idx - 1] ?? null) : null,
    next: idx < PROJECTS.length - 1 ? (PROJECTS[idx + 1] ?? null) : null,
  };
}

export function getAdjacentSubProjects(
  collectionSlug: string,
  subSlug: string
): { prev: Project | null; next: Project | null } {
  const collection = getCollection(collectionSlug);
  if (!collection) return { prev: null, next: null };
  const idx = collection.subProjects.findIndex((p) => p.id === subSlug);
  return {
    prev: idx > 0 ? (collection.subProjects[idx - 1] ?? null) : null,
    next: idx < collection.subProjects.length - 1 ? (collection.subProjects[idx + 1] ?? null) : null,
  };
}
