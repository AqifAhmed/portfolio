"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

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
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 30);
      mouseY.set((clientY / innerHeight - 0.5) * 30);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Letter animation for "AQIF AHMED"
  const firstName = "AQIF";
  const lastName = "AHMED";

  return (
    <motion.section
      ref={ref}
      className="min-h-screen flex flex-col justify-center px-8 pt-20 max-w-screen-2xl mx-auto relative overflow-hidden"
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
            SYSTEM_ARCHITECT // BACKEND &amp; AI
          </motion.p>

          {/* Hero Name - Animated Letters */}
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
              Building resilient{" "}
              <span className="text-white font-medium">high-performance backends</span> and{" "}
              <span className="text-white font-medium">AI-driven neural systems</span> with
              Python and FastAPI. Engineered for precision, prioritized for security.
            </p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-6">
              <motion.button
                className="bg-primary-dim text-on-primary-fixed font-headline font-bold uppercase tracking-widest px-10 py-5 kinetic-glow transition-all duration-300 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10">INITIALIZE_PROJECT</span>
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>

              <motion.button
                className="border border-white/15 text-white font-headline font-bold uppercase tracking-widest px-10 py-5 hover:bg-white/5 transition-all relative overflow-hidden group"
                whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.4)" }}
                whileTap={{ scale: 0.97 }}
              >
                VIEW_DOCS
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right - Portrait */}
        <motion.div
          className="lg:col-span-5 relative"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
          style={{ x: smoothX, y: smoothY }}
        >
          <div className="aspect-[4/5] bg-surface-container-low relative group">
            <img
              alt="Aqif Portrait"
              className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOxMXV2zJsq4vPvBscpIFAlhklsZlESwWy2SRxZSdWferar9phApv-4Dj01QzzWCDZMskkA8zPCarnoNsF6S4PO4AS9pYC7cagyDlNWIbQbAyCjFWDRIBCKwXbDit2sY609dMZdpJXLp_oGDeTVxgjKtwBhlsSHkdubaLD2GdDKraQlK79tPlgdSu2SSaPI3IswWwbU_-5CJH-oCmegQj4xJhjuE9VgbbYbAlVizqWHqa8I_C3IuWnioTsWQRJML6gtPZ-_oGZtJU"
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

            {/* Scan Line on hover */}
            <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <motion.div
                className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-primary-dim/30 to-transparent"
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Decorative number */}
            <div className="absolute -bottom-6 -right-6 font-headline text-primary-dim/20 text-9xl font-black select-none pointer-events-none">
              01
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Glows */}
      <motion.div
        className="absolute top-1/4 right-0 w-96 h-96 bg-primary-dim/5 rounded-full blur-[120px] -z-10"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary-dim/5 rounded-full blur-[150px] -z-10"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

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
