import { Footer } from "@/components/layout/footer";
import { Nav } from "@/components/layout/nav";
import { PageBackdrop } from "@/components/layout/page-backdrop";
import { Providers } from "@/components/layout/providers";
import { SkipToContent } from "@/components/layout/skip-to-content";
import { ClickSpark } from "@/components/ui/click-spark";
import { baseMetadata } from "@/lib/metadata";
import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces, Geist_Mono, Instrument_Serif, Space_Grotesk } from "next/font/google";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import type { ReactNode } from "react";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = baseMetadata;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://player.vimeo.com" />
        <script src="https://player.vimeo.com/api/player.js" async />
      </head>
      <body
        className={`${geistMono.variable} ${fraunces.variable} ${instrumentSerif.variable} ${spaceGrotesk.variable} ${dmSans.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <Providers>
          <ClickSpark
            sparkColor="#888888"
            sparkSize={8}
            sparkRadius={18}
            sparkCount={8}
            duration={380}
          >
            <SkipToContent />
            <PageBackdrop />
            <Nav />
            {children}
            <Footer />
            <NoiseOverlay />
            <SmoothCursor />
          </ClickSpark>
        </Providers>
      </body>
    </html>
  );
}
