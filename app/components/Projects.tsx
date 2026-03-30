"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const projects = [
  {
    id: "01",
    title: "REPO_FINDER",
    description:
      "A search engine for discovering GitHub repositories by topic, language, or keyword. Inspired by the Orion Store on Android — if you can discover apps that easily, why not open-source projects?",
    tags: ["PYTHON / GITHUB_API / FASTAPI", "IN_ACTIVE_DEVELOPMENT"],
    badge: { label: "ACTIVE_PHASE", accent: true },
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80",
    imageLeft: true,
    link: "https://github.com/AqifAhmed",
  },
  {
    id: "02",
    title: "PORTFOLIO_SITE",
    description:
      "This portfolio — built with Next.js 14, Tailwind CSS, and Framer Motion. Deployed to Vercel. The project where I learned Git workflows, environment config, and production deployment.",
    tags: ["NEXT.JS 14 / TAILWIND / FRAMER_MOTION", "DEPLOYED_ON_VERCEL"],
    badge: { label: "LIVE", accent: false },
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    imageLeft: false,
    link: "https://github.com/AqifAhmed/portfolio",
  },
];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image */}
      <div className={`lg:col-span-7 ${!project.imageLeft ? "order-1 lg:order-2" : ""}`}>
        <div className="relative bg-surface-container-low overflow-hidden group">
          <motion.div style={{ y: imgY }}>
            <img
              alt={project.title}
              className="w-full aspect-video object-cover brightness-50 group-hover:brightness-80 transition-all duration-700 scale-110"
              src={project.image}
            />
          </motion.div>

          <motion.div className="absolute inset-0 bg-primary-dim/0 group-hover:bg-primary-dim/5 transition-all duration-500" />

          {/* Badge */}
          <div className={`absolute ${project.imageLeft ? "bottom-0 left-0" : "bottom-0 right-0"} p-8`}>
            <motion.span
              className={`px-4 py-2 text-xs font-headline font-bold uppercase tracking-widest ${
                project.badge.accent
                  ? "bg-primary-dim text-on-primary-fixed"
                  : "bg-surface-container-highest text-white"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {project.badge.label}
            </motion.span>
          </div>

          <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-primary-dim/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-primary-dim/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>

      {/* Content */}
      <motion.div
        className={`lg:col-span-5 pt-8 ${!project.imageLeft ? "order-2 lg:order-1" : ""}`}
        initial={{ opacity: 0, x: project.imageLeft ? 30 : -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="font-mono text-primary-dim/30 text-xs tracking-widest mb-4"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          PROJECT_{project.id}
        </motion.p>

        <h3 className="font-headline text-4xl font-bold tracking-tighter uppercase mb-6">
          {project.title}
        </h3>
        <p className="text-on-surface-variant leading-relaxed mb-8">{project.description}</p>

        <ul className="space-y-4 mb-10">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-white/60"
            >
              <motion.span
                className="w-1 h-1 bg-primary-dim inline-block"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {tag}
            </li>
          ))}
        </ul>

        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-4 group/link"
          whileHover={{ x: 4 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <span className="font-headline font-bold uppercase tracking-widest text-sm border-b border-primary-dim pb-1 group-hover/link:text-primary-dim transition-colors duration-200">
            VIEW_ON_GITHUB
          </span>
          <motion.span
            className="material-symbols-outlined text-primary-dim"
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            arrow_forward
          </motion.span>
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-32 px-4 md:px-8 max-w-screen-2xl mx-auto" id="projects">
      {/* Header */}
      <div className="flex justify-between items-end mb-12 md:mb-24">
        <motion.h2
          ref={ref}
          className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          SELECTED
          <br />
          WORKS
        </motion.h2>
        <motion.div
          className="hidden md:block h-px flex-1 mx-12 bg-white/10 mb-4"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          style={{ transformOrigin: "left" }}
          transition={{ delay: 0.4, duration: 0.8 }}
        />
        <motion.div
          className="text-right"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <span className="font-mono text-primary-dim text-xs tracking-widest">2 PROJECTS</span>
        </motion.div>
      </div>

      {/* Projects */}
      <div className="space-y-20 md:space-y-40">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
