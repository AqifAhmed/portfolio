"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const traits = [
  { label: "GAMER", icon: "sports_esports" },
  { label: "COOK", icon: "skillet" },
  { label: "NIGHT_OWL", icon: "nightlight" },
  { label: "PERFECTIONIST", icon: "target" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-16 md:py-32 px-4 md:px-8 max-w-screen-2xl mx-auto" id="about" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

        {/* Left - Label + heading */}
        <motion.div
          className="lg:col-span-4"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-headline text-primary-dim font-bold tracking-[0.2em] text-xs mb-6 uppercase flex items-center gap-3">
            <span className="inline-block w-8 h-[2px] bg-primary-dim" />
            WHO I AM
          </p>
          <h2 className="font-headline text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
            ABOUT
            <br />
            <span className="text-primary-dim">ME</span>
          </h2>

          {/* Availability badge */}
          <motion.div
            className="mt-10 inline-flex items-center gap-3 border border-green-500/30 bg-green-500/5 px-4 py-3"
            animate={{ borderColor: ["rgba(34,197,94,0.3)", "rgba(34,197,94,0.6)", "rgba(34,197,94,0.3)"] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-green-400 inline-block"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="font-mono text-[10px] tracking-widest text-green-400 uppercase">
              Open to Internships & Freelance
            </span>
          </motion.div>

          {/* Traits */}
          <div className="mt-10 flex flex-wrap gap-3">
            {traits.map((trait, i) => (
              <motion.div
                key={trait.label}
                className="flex items-center gap-2 bg-surface-container-high px-3 py-2"
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.08 }}
                whileHover={{ backgroundColor: "rgba(235,0,0,0.1)", scale: 1.03 }}
              >
                <span className="material-symbols-outlined text-primary-dim text-sm">
                  {trait.icon}
                </span>
                <span className="font-mono text-[10px] tracking-widest text-white/60">
                  {trait.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right - Story */}
        <motion.div
          className="lg:col-span-8 space-y-8"
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <p className="font-quote italic text-white text-2xl md:text-3xl leading-relaxed font-semibold">
            &ldquo;I build backend systems and web applications — not because it looks good on a CV, but because I genuinely enjoy the process of making something work.&rdquo;
          </p>

          <p className="text-on-surface-variant text-base leading-relaxed">
            When I&apos;m not writing code, I&apos;m cooking desi food, gaming late into the night, or going down a rabbit hole on some problem I couldn&apos;t let go of. I&apos;m the kind of person who doesn&apos;t stop until something is actually finished — which makes me slow sometimes, but it means what I ship actually works.
          </p>

          <p className="text-on-surface-variant text-base leading-relaxed">
            I&apos;m currently focused on Python backend development — FastAPI, databases, APIs — and working on a GitHub repository search engine inspired by the Orion Store on Android. The idea was simple: if you can discover apps that easily, why not open-source projects?
          </p>

          {/* Currently section */}
          <div className="border-t border-white/5 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="font-mono text-[10px] tracking-widest text-primary-dim mb-3 uppercase">Currently Building</p>
              <p className="text-white/70 text-sm leading-relaxed">GitHub Repo Search Engine — a tool to discover open-source projects by topic, language, and keyword.</p>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-widest text-primary-dim mb-3 uppercase">Currently Learning</p>
              <p className="text-white/70 text-sm leading-relaxed">Python (FCC course), system design fundamentals, and deepening my FastAPI + PostgreSQL knowledge.</p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
