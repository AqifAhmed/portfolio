"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  const firstName = "AQIF";
  const lastName = "AHMED";

  return (
    <motion.section
      ref={ref}
      className="min-h-screen flex flex-col justify-center px-4 md:px-8 pt-20 max-w-screen-2xl mx-auto relative overflow-hidden"
      style={{ opacity }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        {/* Left Content */}
        <motion.div
          className="lg:col-span-7 z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y }}
        >
          {/* Label */}
          <motion.p
            variants={itemVariants}
            className="font-headline text-primary-dim font-bold tracking-[0.2em] text-xs mb-6 uppercase flex items-center gap-3"
          >
            <motion.span
              className="inline-block w-8 h-[2px] bg-primary-dim"
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
            SOFTWARE ENGINEER // BACKEND & WEB
          </motion.p>

          {/* Hero Name */}
          <h1 className="font-headline text-7xl md:text-[9rem] font-black leading-[0.85] tracking-tighter uppercase mb-8">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                className="flex"
              >
                {firstName.split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    className="inline-block hover:text-primary-dim transition-colors duration-200 cursor-default"
                    whileHover={{ y: -8, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>
            </div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
                className="flex"
              >
                {lastName.split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    className="inline-block hover:text-primary-dim transition-colors duration-200 cursor-default"
                    whileHover={{ y: -8, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </h1>

          {/* Description */}
          <motion.div variants={itemVariants} className="max-w-xl">
            <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed font-light mb-12">
              Building backend systems and web applications with{" "}
              <span className="text-white font-medium">Python and FastAPI.</span>{" "}
              Currently developing a{" "}
              <span className="text-white font-medium">GitHub repository search engine</span>{" "}
              — open to internships and freelance work.
            </p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-6">
              <motion.a
                href="#projects"
                className="border border-primary-dim/40 text-primary-dim font-headline font-bold uppercase tracking-widest px-10 py-5 hover:bg-primary-dim/10 transition-all text-center inline-block"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                VIEW_PROJECTS
              </motion.a>
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/15 text-white font-headline font-bold uppercase tracking-widest px-10 py-5 hover:bg-white/5 transition-all relative overflow-hidden group text-center inline-block"
                whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.4)" }}
                whileTap={{ scale: 0.97 }}
              >
                VIEW_RESUME
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right - Portrait */}
        <motion.div
          className="lg:col-span-5 relative"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
        >
          <div className="aspect-[4/5] bg-surface-container-low relative group">
            <img
              alt="Aqif Portrait"
              className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-700"
              src="/perfil.png"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

            {/* Corner accents */}
            <motion.div
              className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-primary-dim opacity-40"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-primary-dim opacity-40"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            />

            {/* Decorative number */}
            <div className="absolute -bottom-6 -right-6 font-headline text-primary-dim/20 text-9xl font-black select-none pointer-events-none">
              01
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary-dim/5 rounded-full blur-[120px] -z-10" />

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-[1px] h-16 bg-gradient-to-b from-transparent to-primary-dim"
          animate={{ scaleY: [0, 1, 0], y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </motion.section>
  );
}
