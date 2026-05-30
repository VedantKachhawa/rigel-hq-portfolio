"use client";

import { type ReactNode } from "react";
import { Mail, MessageCircle, ArrowRight } from "lucide-react";
import { ContactVideoHero } from "@/components/contact/contact-video-hero";
import { WorkMarquee } from "@/components/projects/work-marquee";
import { FadeIn } from "@/components/ui/motion-primitives";
import { MultistepContactForm } from "@/components/contact/multistep-form";
import dynamic from "next/dynamic";

const Grainient = dynamic(() => import("@/components/ui/grainient"), { ssr: false });

export default function ContactPage(): ReactNode {
  const whatsappText = encodeURIComponent(
    "Hi Rigel HQ, I'm interested in working with you."
  );

  return (
    <main id="main-content" className="relative flex flex-1 flex-col">
      {/* Grainient fills the main content area */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Grainient
          color1="#1a1a2e"
          color2="#0d0d0d"
          color3="#111111"
          timeSpeed={0.12}
          warpStrength={0.6}
          warpFrequency={3.0}
          warpSpeed={0.8}
          warpAmplitude={80.0}
          rotationAmount={300.0}
          grainAmount={0.06}
          grainScale={1.5}
          contrast={1.2}
          saturation={0.4}
          zoom={0.85}
        />
      </div>

      {/* All page content sits above the background */}
      <div className="relative z-10 flex flex-1 flex-col">
        {/* Video hero */}
        <ContactVideoHero />

        <WorkMarquee />

        {/* Form section */}
        <div className="mx-auto w-full max-w-275 px-6 pt-16 pb-24 sm:px-10 sm:pt-20 sm:pb-32">
          <FadeIn className="mb-14 sm:mb-20">
            <h2 className="text-[2rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[2.5rem]">
              Start a project.
            </h2>
            <p className="mt-4 max-w-[45ch] text-[17px] leading-[1.6] tracking-tight text-foreground/60">
              Tell us what you&rsquo;re working on. We&rsquo;ll get back to you
              within 24 hours.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Multi-step form */}
            <FadeIn delay={0.1} className="lg:col-span-7">
              <MultistepContactForm />
            </FadeIn>

            {/* Direct contact */}
            <FadeIn delay={0.2} className="lg:col-span-5">
              <div className="flex flex-col gap-4">
                <p className="text-[13px] font-medium uppercase tracking-widest text-foreground/40">
                  Or reach us directly
                </p>

                <a
                  href={`https://wa.me/971504142689?text=${whatsappText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-foreground/8 bg-background p-5 transition-colors hover:bg-foreground/4"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-medium tracking-tight text-foreground">
                      WhatsApp
                    </span>
                    <span className="text-[13px] text-foreground/50">
                      +971 50 414 2689
                    </span>
                  </div>
                  <ArrowRight className="ml-auto h-4 w-4 text-foreground/30 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>

                <a
                  href="mailto:vedant@rigelstudios.co"
                  className="group flex items-center gap-4 rounded-2xl border border-foreground/8 bg-background p-5 transition-colors hover:bg-foreground/4"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-foreground text-background">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[15px] font-medium tracking-tight text-foreground">
                      Email
                    </span>
                    <span className="text-[13px] text-foreground/50">
                      vedant@rigelstudios.co
                    </span>
                  </div>
                  <ArrowRight className="ml-auto h-4 w-4 text-foreground/30 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>

                <div className="mt-4 rounded-2xl border border-foreground/8 bg-foreground/2 p-5">
                  <p className="text-[13px] leading-relaxed text-foreground/50">
                    Based in{" "}
                    <strong className="text-foreground/70">Dubai, UAE</strong>.
                    We work with clients globally — remote projects always
                    welcome.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </main>
  );
}
