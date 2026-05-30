import Link from "next/link";
import type { ReactNode } from "react";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for Rigel HQ.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage(): ReactNode {
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
          Privacy Policy
        </h1>
        <p className="mt-3 text-[14px] text-foreground/40">
          Last updated: May 2026
        </p>

        <div className="mt-10 space-y-8 text-[16px] leading-[1.75] tracking-tight text-foreground/70">
          <section>
            <h2 className="mb-3 text-[17px] font-semibold text-foreground">
              1. Who we are
            </h2>
            <p>
              Rigel HQ (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)
              is a content production studio based in Dubai, UAE. Our website is{" "}
              <a
                href="https://rigelhq.com"
                className="text-foreground underline underline-offset-2"
              >
                rigelhq.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[17px] font-semibold text-foreground">
              2. Information we collect
            </h2>
            <p>
              When you fill in our contact form, we collect the information you
              voluntarily provide — including your name, email address, company
              name, and project details. We do not use tracking cookies or
              third-party analytics on this website.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[17px] font-semibold text-foreground">
              3. How we use your information
            </h2>
            <p>
              We use the information you provide solely to respond to your
              enquiry and to communicate about a potential project. We do not
              sell or share your data with third parties.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-[17px] font-semibold text-foreground">
              4. Contact
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at{" "}
              <a
                href="mailto:vedant@rigelstudios.co"
                className="text-foreground underline underline-offset-2"
              >
                vedant@rigelstudios.co
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
