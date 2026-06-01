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
  /** CSS object-position for cover crops, e.g. "center 20%" */
  cardImagePosition?: string;
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
  /** CSS object-position for cover crops, e.g. "center 20%" */
  cardImagePosition?: string;
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
    cardImage: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780272545/SOL_coverpage_zzbyvx.png",
    cardImageAlt: "SOL",
    category: "real-estate",
    mediaType: "video-only",
    bgAccent: "#D4A574",
    images: [],
    videos: [
      { label: "SOL Walkthrough 01", poster: "/projects/sol/p1.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780176766/sol_1_ahmaet.mp4" },
      { label: "SOL Walkthrough 02", poster: "/projects/sol/p2.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780176766/sol_2_mbccrk.mp4" },
      { label: "SOL Walkthrough 03", poster: "/projects/sol/p3.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780176746/sol_3_fkiub3.mp4" },
      { label: "SOL Walkthrough 04", poster: "/projects/sol/p4.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780176769/sol_4_zkt8oo.mp4" },
      { label: "SOL Walkthrough 05", poster: "/projects/sol/p5.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780176717/sol_5_sr9vgm.mp4" },
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
    cardImage: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780272541/ALDAR_coverpage_brvjsd.png",
    cardImageAlt: "ALDAR",
    category: "real-estate",
    mediaType: "video-only",
    bgAccent: "#B8956A",
    images: [],
    videos: [
      { label: "ALDAR Walkthrough 01", poster: "/projects/aldar/p3.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780177004/ALDAR_1_d5jcit.mp4" },
      { label: "ALDAR Walkthrough 02", poster: "/projects/aldar/p4.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780177243/ALDAR_2_1_p27r4t.mp4" },
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
    cardImage: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780272543/SOBHA_coverpage_f45d0i.png",
    cardImageAlt: "Sobha",
    category: "real-estate",
    mediaType: "video-only",
    bgAccent: "#2D6A4F",
    images: [],
    videos: [
      { label: "Sobha Walkthrough 01", poster: "/projects/sobha/p1.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780236550/Sobha_1_1_yqftdc.mp4" },
      { label: "Sobha Walkthrough 02", poster: "/projects/sobha/p2.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780236629/Sobha_2_1_rmd7rl.mp4" },
      { label: "Sobha Walkthrough 03", poster: "/projects/sobha/p3.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780236631/Sobha_3_1_wpipct.mp4" },
      { label: "Sobha Walkthrough 04", poster: "/projects/sobha/p4.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780236608/Sobha_4_1_pfy2vh.mp4" },
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
    cardImage: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780271861/dior_coverpahe_eriydu.png",
    cardImageAlt: "DIOR",
    category: "fashion-luxury",
    mediaType: "video-only",
    bgAccent: "#C8A4A4",
    images: [],
    videos: [
      { label: "DIOR 01", poster: "/projects/dior/p1.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780240311/DIOR_1_1_udl3mj.mp4" },
      { label: "DIOR 02", poster: "/projects/dior/p2.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780240284/DIOR_2_1_1_n4seli.mp4" },
      { label: "DIOR 03", poster: "/projects/dior/p3.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780240330/DIOR_3_1_izig0d.mp4" },
      { label: "DIOR 04", poster: "/projects/dior/p4.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780240338/DIOR_4_1_lagmts.mp4" },
      { label: "DIOR 05", poster: "/projects/dior/p5.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780240315/DIOR_5_1_gdu18g.mp4" },
      { label: "DIOR 06", poster: "/projects/dior/p6.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780240308/DIOR_6_1_i7saud.mp4" },
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
    cardImage: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780271979/Ralph_coverpage_fnnuob.png",
    cardImageAlt: "Ralph Lauren",
    category: "fashion-luxury",
    mediaType: "video-only",
    bgAccent: "#2C3E6B",
    images: [],
    videos: [
      { label: "Ralph Lauren Advertisement 01", poster: "/projects/ralph-lauren/p1.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780242781/Ralph_1_2_1_cwohfm.mp4" },
      { label: "Ralph Lauren Advertisement 02", poster: "/projects/ralph-lauren/p2.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780242765/Ralph_2_2_1_utfrtg.mp4" },
      { label: "Ralph Lauren Advertisement 03", poster: "/projects/ralph-lauren/p3.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780242743/Ralph_3_2_1_x5b5pg.mp4" },
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
    cardImage: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780244194/WhatsApp_Image_2026-05-25_at_1.52.44_AM_6_bpufdb.jpg",
    cardImageAlt: "Supreme",
    cardImagePosition: "center 22%",
    category: "fashion-luxury",
    mediaType: "photo-only",
    bgAccent: "#C41E3A",
    images: [
      { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780244201/WhatsApp_Image_2026-05-25_at_1.52.44_AM_lecpij.jpg", alt: "Supreme 01", aspect: "portrait" as const },
      { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780244201/WhatsApp_Image_2026-05-25_at_1.52.45_AM_6_nrzcel.jpg", alt: "Supreme 02", aspect: "portrait" as const },
      { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780244200/WhatsApp_Image_2026-05-25_at_1.52.45_AM_5_je7q3r.jpg", alt: "Supreme 03", aspect: "portrait" as const },
      { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780244199/WhatsApp_Image_2026-05-25_at_1.52.45_AM_4_mgmitt.jpg", alt: "Supreme 04", aspect: "portrait" as const },
      { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780244198/WhatsApp_Image_2026-05-25_at_1.52.45_AM_3_szpejc.jpg", alt: "Supreme 05", aspect: "portrait" as const },
      { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780244198/WhatsApp_Image_2026-05-25_at_1.52.45_AM_2_fddnjp.jpg", alt: "Supreme 06", aspect: "portrait" as const },
      { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780244196/WhatsApp_Image_2026-05-25_at_1.52.45_AM_1_jgggzq.jpg", alt: "Supreme 07", aspect: "portrait" as const },
      { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780244196/WhatsApp_Image_2026-05-25_at_1.52.45_AM_krnk0i.jpg", alt: "Supreme 08", aspect: "portrait" as const },
      { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780244195/WhatsApp_Image_2026-05-25_at_1.52.44_AM_7_pssbcc.jpg", alt: "Supreme 09", aspect: "portrait" as const },
      { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780244194/WhatsApp_Image_2026-05-25_at_1.52.44_AM_6_bpufdb.jpg", alt: "Supreme 10", aspect: "portrait" as const },
      { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780244193/WhatsApp_Image_2026-05-25_at_1.52.44_AM_5_d3d5kd.jpg", alt: "Supreme 11", aspect: "portrait" as const },
      { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780244193/WhatsApp_Image_2026-05-25_at_1.52.44_AM_3_gs33w6.jpg", alt: "Supreme 12", aspect: "portrait" as const },
      { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780244192/WhatsApp_Image_2026-05-25_at_1.52.44_AM_4_zdsn8x.jpg", alt: "Supreme 13", aspect: "portrait" as const },
      { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780244191/WhatsApp_Image_2026-05-25_at_1.52.44_AM_2_nh2sxt.jpg", alt: "Supreme 14", aspect: "portrait" as const },
      { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780244191/WhatsApp_Image_2026-05-25_at_1.52.44_AM_1_klruyu.jpg", alt: "Supreme 15", aspect: "portrait" as const },
    ],
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
    cardImage: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780247202/WhatsApp_Image_2026-05-25_at_5.05.35_PM_3_e0jl0m.jpg",
    cardImageAlt: "Orphic",
    category: "fashion-luxury",
    mediaType: "both",
    bgAccent: "#5B3A8C",
    displayMode: "carousel",
    images: [
      { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780247209/WhatsApp_Image_2026-05-25_at_5.05.35_PM_csq9lj.jpg", alt: "Orphic 01", aspect: "portrait" as const },
      { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780247208/WhatsApp_Image_2026-05-25_at_5.05.36_PM_1_tsqsb0.jpg", alt: "Orphic 02", aspect: "portrait" as const },
      { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780247207/WhatsApp_Image_2026-05-25_at_5.05.36_PM_ucjbq5.jpg", alt: "Orphic 03", aspect: "portrait" as const },
      { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780247206/WhatsApp_Image_2026-05-25_at_5.05.35_PM_7_fgqkny.jpg", alt: "Orphic 04", aspect: "portrait" as const },
      { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780247205/WhatsApp_Image_2026-05-25_at_5.05.35_PM_6_syntue.jpg", alt: "Orphic 05", aspect: "portrait" as const },
      { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780247204/WhatsApp_Image_2026-05-25_at_5.05.35_PM_5_xsttw1.jpg", alt: "Orphic 06", aspect: "portrait" as const },
      { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780247203/WhatsApp_Image_2026-05-25_at_5.05.35_PM_4_wx4uc2.jpg", alt: "Orphic 07", aspect: "portrait" as const },
      { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780247202/WhatsApp_Image_2026-05-25_at_5.05.35_PM_3_e0jl0m.jpg", alt: "Orphic 08", aspect: "portrait" as const },
      { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780247202/WhatsApp_Image_2026-05-25_at_5.05.35_PM_2_cifsoz.jpg", alt: "Orphic 09", aspect: "portrait" as const },
      { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780247201/WhatsApp_Image_2026-05-25_at_5.05.35_PM_1_fvkfvg.jpg", alt: "Orphic 10", aspect: "portrait" as const },
    ],
    videos: [
      { label: "Orphic 01", poster: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780247209/WhatsApp_Image_2026-05-25_at_5.05.35_PM_csq9lj.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780248186/WhatsApp_Video_2026-05-25_at_5.06.37_PM_5_ytrxdf.mp4" },
      { label: "Orphic 02", poster: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780247208/WhatsApp_Image_2026-05-25_at_5.05.36_PM_1_tsqsb0.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780248187/WhatsApp_Video_2026-05-25_at_5.06.37_PM_1_2_riwvqa.mp4" },
      { label: "Orphic 03", poster: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780247207/WhatsApp_Image_2026-05-25_at_5.05.36_PM_ucjbq5.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780248188/WhatsApp_Video_2026-05-25_at_5.06.37_PM_2_1_qcxajk.mp4" },
      { label: "Orphic 04", poster: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780247206/WhatsApp_Image_2026-05-25_at_5.05.35_PM_7_fgqkny.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780248189/WhatsApp_Video_2026-05-25_at_5.06.37_PM_1_1_t5fbxf.mp4" },
      { label: "Orphic 05", poster: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780247205/WhatsApp_Image_2026-05-25_at_5.05.35_PM_6_syntue.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780248198/WhatsApp_Video_2026-05-25_at_5.06.37_PM_4_wzai9d.mp4" },
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
    cardImage: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780272147/Patagonia_coverpage_wbysxj.png",
    cardImageAlt: "Patagonia",
    category: "fashion-luxury",
    mediaType: "video-only",
    bgAccent: "#2E8B8B",
    images: [],
    videos: [
      { label: "Patagonia 01", poster: "/projects/patagonia/p1.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780266859/WhatsApp_Video_2026-06-01_at_2.31.46_AM_g0bbs5.mp4" },
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
    cardImage: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780272245/Fizzbear_coverpage_r8gilz.png",
    cardImageAlt: "Fizzbears",
    category: "food-beverage",
    mediaType: "video-only",
    bgAccent: "#E05A8A",
    images: [],
    videos: [
      { label: "Fizzbears 01", poster: "/projects/fizzbears/p1.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780267838/fizzbear_1_1_p6375b.mp4" },
      { label: "Fizzbears 02", poster: "/projects/fizzbears/p2.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780267771/fizzbear_2_1_owewqp.mp4" },
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
    cardImage: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780272319/Hershey_coverpage_qfr96q.png",
    cardImageAlt: "Hershey's",
    category: "food-beverage",
    mediaType: "video-only",
    bgAccent: "#4A2106",
    images: [],
    videos: [
      { label: "Hershey's 01", poster: "/projects/hersheys/p1.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780267964/hersheys_1_dc0gsd.mp4" },
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
    cardImage: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268160/WhatsApp_Image_2026-05-26_at_2.56.36_AM_1_vazmeg.jpg",
    cardImageAlt: "TOTEM",
    cardImagePosition: "center 18%",
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
        cardImage: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268781/WhatsApp_Image_2026-05-26_at_2.28.07_AM_3_vobioq.jpg",
        cardImageAlt: "NAVIRA",
        category: "concept-fashion",
        mediaType: "both",
        displayMode: "carousel",
        bgAccent: "#8B5E3C",
        images: [
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268781/WhatsApp_Image_2026-05-26_at_2.28.07_AM_3_vobioq.jpg", alt: "NAVIRA 01", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268782/WhatsApp_Image_2026-05-26_at_2.28.07_AM_4_fq0qhm.jpg", alt: "NAVIRA 02", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268782/WhatsApp_Image_2026-05-26_at_2.28.07_AM_5_z5frma.jpg", alt: "NAVIRA 03", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268783/WhatsApp_Image_2026-05-26_at_2.28.07_AM_6_k5jqr1.jpg", alt: "NAVIRA 04", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268785/WhatsApp_Image_2026-05-26_at_2.28.06_AM_ihwzm2.jpg", alt: "NAVIRA 05", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268786/WhatsApp_Image_2026-05-26_at_2.28.07_AM_e8cikz.jpg", alt: "NAVIRA 06", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268787/WhatsApp_Image_2026-05-26_at_2.28.07_AM_1_qe0i6m.jpg", alt: "NAVIRA 07", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268789/WhatsApp_Image_2026-05-26_at_2.28.07_AM_2_xmhpjx.jpg", alt: "NAVIRA 08", aspect: "portrait" as const },
        ],
        videos: [
          { label: "NAVIRA 01", poster: "/projects/navira/p1.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780269125/WhatsApp_Video_2026-05-25_at_6.35.01_PM_aew9wn.mp4" },
          { label: "NAVIRA 02", poster: "/projects/navira/p2.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780269140/WhatsApp_Video_2026-05-25_at_6.35.03_PM_tqtrai.mp4" },
          { label: "NAVIRA 03", poster: "/projects/navira/p3.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780269142/WhatsApp_Video_2026-05-25_at_6.34.59_PM_vlbisf.mp4" },
          { label: "NAVIRA 04", poster: "/projects/navira/p4.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780269328/WhatsApp_Video_2026-05-25_at_6.35.30_PM_4_stp5lh.mp4" },
        ],
      },
      {
        id: "shani",
        icon: Scissors,
        iconLabel: "SHANI",
        tagline: "Concept fashion film",
        description: "Photo & video",
        meta: "TOTEM · SHANI · Dubai, 2026",
        imageRatio: 3 / 4,
        cardImage: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268863/WhatsApp_Image_2026-05-26_at_12.46.57_AM_2_qnvjfp.jpg",
        cardImageAlt: "SHANI",
        category: "concept-fashion",
        mediaType: "both",
        displayMode: "carousel",
        bgAccent: "#8B5E3C",
        images: [
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268863/WhatsApp_Image_2026-05-26_at_12.46.57_AM_2_qnvjfp.jpg", alt: "SHANI 01", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268864/WhatsApp_Image_2026-05-26_at_12.46.57_AM_3_egw45p.jpg", alt: "SHANI 02", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268865/WhatsApp_Image_2026-05-26_at_12.46.57_AM_4_pqwp9c.jpg", alt: "SHANI 03", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268867/WhatsApp_Image_2026-05-26_at_12.46.57_AM_5_q8rxhn.jpg", alt: "SHANI 04", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268868/WhatsApp_Image_2026-05-26_at_12.46.57_AM_6_pzdwgc.jpg", alt: "SHANI 05", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268870/WhatsApp_Image_2026-05-26_at_12.46.57_AM_7_trisw6.jpg", alt: "SHANI 06", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268871/WhatsApp_Image_2026-05-26_at_12.46.57_AM_8_nmtvlw.jpg", alt: "SHANI 07", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268872/WhatsApp_Image_2026-05-26_at_12.46.57_AM_oyfquq.jpg", alt: "SHANI 08", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268874/WhatsApp_Image_2026-05-26_at_12.46.57_AM_1_qlxecn.jpg", alt: "SHANI 09", aspect: "portrait" as const },
        ],
        videos: [
          { label: "SHANI 01", poster: "/projects/shani/p1.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780269134/WhatsApp_Video_2026-05-25_at_6.35.03_PM_1_ibndbg.mp4" },
          { label: "SHANI 02", poster: "/projects/shani/p2.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780269351/WhatsApp_Video_2026-05-25_at_6.35.30_PM_mc6opq.mp4" },
          { label: "SHANI 03", poster: "/projects/shani/p3.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780269365/WhatsApp_Video_2026-05-25_at_6.35.27_PM_y03v6b.mp4" },
          { label: "SHANI 04", poster: "/projects/shani/p4.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780269391/WhatsApp_Video_2026-05-25_at_6.35.30_PM_1_thrfof.mp4" },
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
        cardImage: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268154/WhatsApp_Image_2026-05-26_at_2.56.36_AM_5_vpdj8z.jpg",
        cardImageAlt: "SOLCHAKRA",
        category: "concept-fashion",
        mediaType: "both",
        displayMode: "carousel",
        bgAccent: "#8B5E3C",
        images: [
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268154/WhatsApp_Image_2026-05-26_at_2.56.36_AM_5_vpdj8z.jpg", alt: "SOLCHAKRA 01", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268155/WhatsApp_Image_2026-05-26_at_2.56.37_AM_a7xf5g.jpg", alt: "SOLCHAKRA 02", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268156/WhatsApp_Image_2026-05-26_at_2.56.37_AM_1_y9jqwy.jpg", alt: "SOLCHAKRA 03", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268158/WhatsApp_Image_2026-05-26_at_2.56.37_AM_2_f7otav.jpg", alt: "SOLCHAKRA 04", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268159/WhatsApp_Image_2026-05-26_at_2.56.36_AM_zs3os8.jpg", alt: "SOLCHAKRA 05", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268160/WhatsApp_Image_2026-05-26_at_2.56.36_AM_1_vazmeg.jpg", alt: "SOLCHAKRA 06", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268161/WhatsApp_Image_2026-05-26_at_2.56.36_AM_2_wpv2f8.jpg", alt: "SOLCHAKRA 07", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268162/WhatsApp_Image_2026-05-26_at_2.56.36_AM_3_igvb5p.jpg", alt: "SOLCHAKRA 08", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780268163/WhatsApp_Image_2026-05-26_at_2.56.36_AM_4_a05x3y.jpg", alt: "SOLCHAKRA 09", aspect: "portrait" as const },
        ],
        videos: [
          { label: "SOLCHAKRA 01", poster: "/projects/solchakra/p1.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780269147/WhatsApp_Video_2026-05-25_at_6.34.59_PM_1_neyahg.mp4" },
          { label: "SOLCHAKRA 02", poster: "/projects/solchakra/p2.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780269339/WhatsApp_Video_2026-05-25_at_6.35.30_PM_7_bwonty.mp4" },
          { label: "SOLCHAKRA 03", poster: "/projects/solchakra/p3.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780269346/WhatsApp_Video_2026-05-25_at_6.35.30_PM_6_mrgx8e.mp4" },
          { label: "SOLCHAKRA 04", poster: "/projects/solchakra/p4.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780269345/WhatsApp_Video_2026-05-25_at_6.35.30_PM_5_hptcov.mp4" },
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
    cardImage: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780269508/WhatsApp_Image_2026-05-25_at_3.34.03_AM_5_mcahol.jpg",
    cardImageAlt: "Call Me Krazy",
    cardImagePosition: "center 20%",
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
        cardImage: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780269505/WhatsApp_Image_2026-05-25_at_3.34.03_AM_3_z3euyc.jpg",
        cardImageAlt: "Kaleidogami — Call Me Krazy",
        category: "concept-fashion",
        mediaType: "both",
        displayMode: "carousel",
        bgAccent: "#8B2FC9",
        images: [
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780269505/WhatsApp_Image_2026-05-25_at_3.34.03_AM_3_z3euyc.jpg",  alt: "Kaleidogami 01",  aspect: "portrait" },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780269506/WhatsApp_Image_2026-05-25_at_3.34.03_AM_4_dss7m3.jpg",  alt: "Kaleidogami 02",  aspect: "portrait" },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780269508/WhatsApp_Image_2026-05-25_at_3.34.03_AM_5_mcahol.jpg",  alt: "Kaleidogami 03",  aspect: "portrait" },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780269509/WhatsApp_Image_2026-05-25_at_3.34.03_AM_6_tul2wd.jpg",  alt: "Kaleidogami 04",  aspect: "portrait" },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780269511/WhatsApp_Image_2026-05-25_at_3.34.03_AM_7_k0tg2q.jpg",  alt: "Kaleidogami 05",  aspect: "portrait" },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780269512/WhatsApp_Image_2026-05-25_at_3.34.03_AM_8_g8tyh9.jpg",  alt: "Kaleidogami 06",  aspect: "portrait" },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780269514/WhatsApp_Image_2026-05-25_at_3.34.03_AM_9_izclxl.jpg",  alt: "Kaleidogami 07",  aspect: "portrait" },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780269516/WhatsApp_Image_2026-05-25_at_3.34.03_AM_10_e690tp.jpg", alt: "Kaleidogami 08",  aspect: "portrait" },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780269517/WhatsApp_Image_2026-05-25_at_3.34.03_AM_11_z0yjvh.jpg", alt: "Kaleidogami 09",  aspect: "portrait" },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780269519/WhatsApp_Image_2026-05-25_at_3.34.03_AM_oiinhp.jpg",  alt: "Kaleidogami 10",  aspect: "portrait" },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780269520/WhatsApp_Image_2026-05-25_at_3.34.03_AM_1_lsoqcm.jpg",  alt: "Kaleidogami 11",  aspect: "portrait" },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780269522/WhatsApp_Image_2026-05-25_at_3.34.03_AM_2_xj6fhw.jpg",  alt: "Kaleidogami 12",  aspect: "portrait" },
        ],
        videos: [
          { label: "Kaleidogami 01", poster: "/projects/kaleidogami/p1.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780269874/Kaleidogami_3_1_hgbvdg.mp4" },
          { label: "Kaleidogami 02", poster: "/projects/kaleidogami/p2.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780269876/Kaleidogami_1_1_hnalo6.mp4" },
          { label: "Kaleidogami 03", poster: "/projects/kaleidogami/p3.jpg", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780269895/Kaleidogami_2_1_tt1jyq.mp4" },
        ],
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
    cardImage: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243740/Untitled_design_44_cjoc7h.png",
    cardImageAlt: "Malabar Gold & Diamonds",
    cardImagePosition: "center 25%",
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
        cardImage: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243758/Untitled_design_41_l9ejrx.png",
        cardImageAlt: "Malabar Gold & Diamonds — Necklace",
        category: "fashion-luxury",
        mediaType: "both",
        displayMode: "carousel",
        bgAccent: "#D4AF37",
        images: [
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243758/Untitled_design_41_l9ejrx.png", alt: "Malabar 01", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243732/Untitled_design_42_ozmhrd.png", alt: "Malabar 02", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243732/Untitled_design_43_nhojtm.png", alt: "Malabar 03", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243742/Untitled_design_45_z4s21l.png", alt: "Malabar 04", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243734/Untitled_design_46_kcefl5.png", alt: "Malabar 05", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243734/Untitled_design_47_f8uhnr.png", alt: "Malabar 06", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243314/Untitled_design_48_olq67c.png", alt: "Malabar 07", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243733/Untitled_design_48_yuoy0c.png", alt: "Malabar 08", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243734/Untitled_design_49_vduh3m.png", alt: "Malabar 09", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243734/Untitled_design_50_taqy2c.png", alt: "Malabar 10", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243735/Untitled_design_51_lsqknm.png", alt: "Malabar 11", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243736/Untitled_design_52_jujdrc.png", alt: "Malabar 12", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243739/Untitled_design_53_rmdqrq.png", alt: "Malabar 13", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243737/Untitled_design_54_gfl9du.png", alt: "Malabar 14", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243738/Untitled_design_55_fn0p9p.png", alt: "Malabar 15", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243742/Untitled_design_56_k3fqra.png", alt: "Malabar 16", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243740/Untitled_design_57_ouc9fk.png", alt: "Malabar 17", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243740/Untitled_design_58_stk47m.png", alt: "Malabar 18", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243743/Untitled_design_59_bpmska.png", alt: "Malabar 19", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243746/Untitled_design_60_hg2g0n.png", alt: "Malabar 20", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243743/Untitled_design_61_sbbsau.png", alt: "Malabar 21", aspect: "portrait" as const },
          { src: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243740/Untitled_design_44_cjoc7h.png", alt: "Malabar 22", aspect: "portrait" as const },
        ],
        videos: [
          { label: "Necklace Film", poster: "https://res.cloudinary.com/dz0nu25ls/image/upload/q_auto/f_auto/v1780243758/Untitled_design_41_l9ejrx.png", src: "https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v1780246634/malabar_vid_1_2_1_1_1_1_1_qe3sik.mp4" },
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
