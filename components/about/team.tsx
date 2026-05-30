"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState, type ReactNode } from "react";
type Role = {
  period: string;
  role: string;
  company: string;
};

type Member = {
  name: string;
  title: string;
  initials: string;
  photo: string;
  color: string;
  linkedin: string;
  email: string;
  roles: Role[];
};

const TEAM: Member[] = [
  {
    name: "Vedant Kachhawa",
    title: "Founder & CEO",
    initials: "VK",
    photo: "/vedant.png",
    color: "#0a0a0a",
    linkedin: "https://www.linkedin.com/in/vedant-kachhawa-030972236/",
    email: "Vedant@rigelstudios.co",
    roles: [
      { period: "2026 – Present", role: "Founder & CEO",               company: "Rigel HQ"                 },
      { period: "2025 – Present", role: "Founder & CEO",             company: "IWISHUAE"                 },
      { period: "2025 – Present", role: "Founder & CEO",             company: "AutomationDojo"           },
      { period: "2025",           role: "Portfolio Company (IWISHUAE)", company: "Founders Institute GCC"   },
      { period: "2023",           role: "Co-Founder",                 company: "AIMMEDIA"                 },
      { period: "2020 – 2024",    role: "Growth Consultant",          company: "Freelance (100+ clients)" },
      { period: "2020 – 2024",    role: "Video Editor",               company: "Freelance (80+ clients)"  },
      { period: "2020 – 2022",    role: "Management",                   company: "Various Esports Organizations" },
    ],
  },
  {
    name: "Siddhant Nair",
    title: "Director (Client Relations)",
    initials: "SN",
    photo: "/siddhant.png",
    color: "#1c2c2c",
    linkedin: "https://www.linkedin.com/in/siddhant-nair456/",
    email: "Siddhant.Nair@rigelstudios.co",
    roles: [
      { period: "2026 – Present", role: "Director (Client Relations)", company: "Rigel HQ" },
      { period: "2025", role: "Sales Intern", company: "Gargash Enterprises" },
      { period: "2025", role: "Summer Intern", company: "Huco" },
      { period: "2024", role: "Project Intern", company: "World Cuisine Network Private Limited" },
    ],
  },
];

export function Team(): ReactNode {
  return (
    <section className="mx-auto w-full max-w-275 px-6 pb-20 sm:px-10 sm:pb-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10"
      >
        <h2 className="text-[22px] font-semibold tracking-tight text-foreground">
          The team
        </h2>
        <p className="mt-1.5 text-[14px] text-foreground/50 tracking-tight">
          The people behind every frame.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {TEAM.map((member, mi) => (
          <MemberCard key={member.name} member={member} cardDelay={mi * 0.12} />
        ))}
      </div>
    </section>
  );
}

function PhotoWithFallback({ member }: { member: Member }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span
        className="flex h-full w-full items-center justify-center text-[17px] font-semibold text-white/80 select-none"
        aria-hidden="true"
      >
        {member.initials}
      </span>
    );
  }
  return (
    <Image
      src={member.photo}
      alt={member.name}
      fill
      sizes="56px"
      className="object-cover object-top"
      onError={() => setFailed(true)}
    />
  );
}

function MemberCard({
  member,
  cardDelay,
}: {
  member: Member;
  cardDelay: number;
}): ReactNode {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: cardDelay, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-3xl border border-foreground/8 bg-background"
    >
      {/* Profile header */}
      <div className="flex items-center gap-5 border-b border-foreground/6 px-6 py-5 sm:px-8 sm:py-6">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: cardDelay + 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl"
          style={{ backgroundColor: member.color }}
        >
          <PhotoWithFallback member={member} />
        </motion.div>
        <div className="flex-1 min-w-0">
          <motion.h3
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: cardDelay + 0.15 }}
            className="text-[18px] font-semibold tracking-tight text-foreground sm:text-[19px]"
          >
            {member.name}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: cardDelay + 0.22 }}
            className="text-[13px] tracking-tight text-foreground/50"
          >
            {member.title}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: cardDelay + 0.3 }}
            className="mt-2 flex items-center gap-3"
          >
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-tight text-foreground/40 hover:text-foreground/70 transition-colors flex items-center gap-1"
              aria-label={`${member.name} on LinkedIn`}
            >
              <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <span className="text-foreground/15">·</span>
            <a
              href={`mailto:${member.email}`}
              className="text-[11px] tracking-tight text-foreground/40 hover:text-foreground/70 transition-colors"
              aria-label={`Email ${member.name}`}
            >
              {member.email}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative px-6 pb-5 pt-5 sm:px-8 sm:pb-6">
        <motion.span
          className="absolute left-[3.25rem] sm:left-[3.75rem] top-6 bottom-6 w-px origin-top bg-foreground/10"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.9, delay: cardDelay + 0.3, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        />

        <ul className="flex flex-col">
          {member.roles.map((role, ri) => (
            <motion.li
              key={ri}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: cardDelay + 0.35 + ri * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-start gap-5 py-3 first:pt-1 last:pb-1"
            >
              <motion.span
                className="relative z-10 mt-[0.35rem] flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-background ring-2 ring-foreground/20"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: cardDelay + 0.4 + ri * 0.07 }}
                aria-hidden="true"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
              </motion.span>

              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="text-[11px] font-medium uppercase tracking-widest text-foreground/35">
                  {role.period}
                </span>
                <span className="text-[15px] font-semibold leading-snug tracking-tight text-foreground">
                  {role.role}
                </span>
                <span className="text-[13px] tracking-tight text-foreground/55">
                  {role.company}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
