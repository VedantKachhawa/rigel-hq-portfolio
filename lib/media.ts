/**
 * Central registry for every ambient background video on the site.
 *
 * WHY THIS FILE EXISTS
 * The site previously hard-coded raw Higgsfield CloudFront URLs inside seven
 * different components. Those URLs are temporary generator-output links, they
 * are not a CDN you control, and they serve uncompressed masters (the hero
 * video alone is 14 MB). That is the single biggest cause of the mobile
 * crashes and the slow first paint.
 *
 * HOW TO FIX PROPERLY (do this once, then never touch the components again):
 *   1. Download each master below.
 *   2. Re-upload to Cloudinary (the account already used for project videos).
 *   3. Replace the URL here with the Cloudinary delivery URL, keeping the
 *      `q_auto/f_auto` transform segment, e.g.
 *      https://res.cloudinary.com/dz0nu25ls/video/upload/q_auto/f_auto/v.../hero.mp4
 *   4. For heroes, also add a `w_1280` cap so phones never pull a 4K master:
 *      .../video/upload/q_auto,f_auto,w_1280/v.../hero.mp4
 *
 * Once the URLs are Cloudinary, `posterFor()` below starts returning real
 * first-frame posters automatically and every video gets an instant preview.
 */

import { cloudinaryVideoPoster } from "@/lib/cloudinary";

const CF = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P";

export const VIDEOS = {
  /** Home hero — 14 MB master. Highest priority to re-host. */
  homeHero: `${CF}/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4`,
  /** Global footer — mounted on EVERY page, so its weight is paid everywhere. */
  footer: `${CF}/hf_20260429_114316_1c7889ad-2885-410e-b493-98119fee0ddb.mp4`,
  aboutHero: `${CF}/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4`,
  contactHero: `${CF}/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4`,
  projectsHero: `${CF}/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4`,
} as const;

export type VideoKey = keyof typeof VIDEOS;

/**
 * Returns a poster image URL when the source is a Cloudinary video, otherwise
 * undefined. Posters let the browser paint something immediately instead of
 * holding a black rectangle while 14 MB streams in.
 */
export function posterFor(src: string): string | undefined {
  const poster = cloudinaryVideoPoster(src);
  return poster === src ? undefined : poster;
}
