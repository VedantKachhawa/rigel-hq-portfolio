import type { Metadata } from "next";

export const siteConfig = {
  name: "Rigel HQ",
  description:
    "Rigel HQ — a forward-thinking studio building products, brands, and digital experiences that matter.",
  url: "https://rigelhq.com",
  ogImage: "/og-image.png",
  creator: "@rigelhq",
  authors: [
    {
      name: "Rigel HQ",
      url: "https://rigelhq.com",
    },
  ],
  keywords: [
    "Rigel HQ",
    "software studio",
    "product design",
    "web development",
    "brand design",
    "AI solutions",
    "digital products",
  ],
} as const;

const RIGEL_FAVICON =
  "https://res.cloudinary.com/dz0nu25ls/image/upload/w_32,h_32,c_fill/q_auto/f_auto/v1780271101/R_logo_cmryrt.jpg";
const RIGEL_APPLE_ICON =
  "https://res.cloudinary.com/dz0nu25ls/image/upload/w_180,h_180,c_fill/q_auto/f_auto/v1780271101/R_logo_cmryrt.jpg";

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [...siteConfig.authors],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.creator,
  },
  icons: {
    icon: [{ url: RIGEL_FAVICON, type: "image/jpeg", sizes: "32x32" }],
    shortcut: RIGEL_FAVICON,
    apple: [{ url: RIGEL_APPLE_ICON, type: "image/jpeg", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export function createMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? siteConfig.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: title ?? siteConfig.name,
      description: description ?? siteConfig.description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title ?? siteConfig.name,
        },
      ],
    },
    twitter: {
      title: title ?? siteConfig.name,
      description: description ?? siteConfig.description,
      images: [ogImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
