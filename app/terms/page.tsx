import Link from "next/link";
import type { ReactNode } from "next";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Terms of Service",
  description: "Terms of Service for Rigel HQ.",
  path: "/terms",
});

export default function TermsPage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-[52rem] px-6 pt-36 pb-24 sm:px-10 sm:pt-52">
        <Link
          href="/"
          className="group mb-10 inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
            ←
          </span>
          Home
        </Link>

        <h1 className="text-[2rem] font-medium tracking-tight text-foreground sm:text-[2.5rem]">
          Terms of Service
        </h1>
        <p className="mt-3 text-[14px] text-foreground/40">
          Last updated: May 2026
        </p>

        <div className="mt-10 space-y-8 text-[16px] leading-[1.75] tracking-tight text-foreground/70">
          <section>
            <h2 className="mb-3 text-[17px] font-semibold text-foreground">
              1. Acceptance
            </h2>
            <p>
              By accessing or using the Rigel HQ website, you agree to be
              bound by these Terms of Service. If you do not agree, please do
              not use this site.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[17px] font-semibold text-foreground">
              2. Intellectual property
            </h2>
            <p>
              All content on this website — including text, images, videos, and
              design — is the property of Rigel HQ and may not be reproduced
              without express written permission.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[17px] font-semibold text-foreground">
              3. Portfolio disclaimer
            </h2>
            <p>
              Some projects displayed on this website are sample or speculative
              works created for portfolio purposes and do not necessarily
              represent active client relationships. Our confirmed clients
              include TOTEM and Call Me Krazy, among others.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[17px] font-semibold text-foreground">
              4. Limitation of liability
            </h2>
            <p>
              Rigel HQ shall not be liable for any indirect, incidental, or
              consequential damages arising from use of this website.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[17px] font-semibold text-foreground">
              5. Contact
            </h2>
            <p>
              Questions about these Terms?{" "}
              <a
                href="mailto:vedant@rigelstudios.co"
                className="text-foreground underline underline-offset-2"
              >
                vedant@rigelstudios.co
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
