"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function StatsGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 px-8 max-w-screen-2xl mx-auto" ref={ref}>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* GitHub */}
        <motion.div
          variants={cardVariants}
          className="bg-surface p-10 flex flex-col justify-between group relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-primary-dim/0 group-hover:bg-primary-dim/3 transition-all duration-500"
          />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <motion.span
                className="material-symbols-outlined text-primary-dim"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                code_blocks
              </motion.span>
              <h3 className="font-headline font-bold tracking-widest uppercase text-xs text-on-surface-variant">
                GITHUB_ENGINEERING
              </h3>
            </div>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-6xl font-headline font-black tracking-tighter">
                <AnimatedCounter target={1248} />
              </span>
              <span className="text-on-surface-variant text-sm mb-2 font-mono">CONTRIB/YR</span>
            </div>
          </div>

          <div className="space-y-4 relative z-10">
            <div className="h-24 flex items-end gap-1">
              {[25, 50, 16, 75, 33, 100, 20, 66].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-primary-dim/20"
                  style={{ height: `${h}%` }}
                  initial={{ height: 0 }}
                  animate={inView ? { height: `${h}%` } : { height: 0 }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.6, ease: "easeOut" }}
                  whileHover={{ backgroundColor: "rgba(235,0,0,0.8)" }}
                />
              ))}
            </div>
            <p className="text-[10px] font-mono text-on-surface-variant tracking-widest">
              COMMIT_FLOW: STEADY_STATE
            </p>
          </div>
        </motion.div>

        {/* LeetCode */}
        <motion.div
          variants={cardVariants}
          className="bg-surface p-10 flex flex-col justify-between border-x border-white/5 relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-primary-dim/0 group-hover:bg-primary-dim/3 transition-all duration-500"
          />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <motion.span
                className="material-symbols-outlined text-primary-dim"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                terminal
              </motion.span>
              <h3 className="font-headline font-bold tracking-widest uppercase text-xs text-on-surface-variant">
                ALGO_PROFICIENCY
              </h3>
            </div>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-6xl font-headline font-black tracking-tighter">
                <AnimatedCounter target={452} />
              </span>
              <span className="text-on-surface-variant text-sm mb-2 font-mono">SOLVED</span>
            </div>
          </div>

          <div className="space-y-2 relative z-10">
            <div className="flex justify-between text-xs font-mono mb-2">
              <span>HARD</span>
              <span className="text-primary-dim">84/100</span>
            </div>
            <div className="w-full h-1 bg-surface-container-highest overflow-hidden">
              <motion.div
                className="h-full bg-primary-dim"
                style={{ boxShadow: "0 0 10px #eb0000" }}
                initial={{ width: "0%" }}
                animate={inView ? { width: "84%" } : { width: "0%" }}
                transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <div className="flex justify-between text-xs font-mono pt-4">
              <span>GLOBAL_RANKING</span>
              <motion.span
                className="text-white"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                TOP 5.2%
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* Core Stack */}
        <motion.div
          variants={cardVariants}
          className="bg-surface p-10 flex flex-col justify-between relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-primary-dim/0 group-hover:bg-primary-dim/3 transition-all duration-500"
          />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <motion.span
                className="material-symbols-outlined text-primary-dim"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                memory
              </motion.span>
              <h3 className="font-headline font-bold tracking-widest uppercase text-xs text-on-surface-variant">
                CORE_STACK
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {["PYTHON_3.12", "FASTAPI", "PYTORCH", "POSTGRESQL", "DOCKER", "LLM_OPS"].map(
                (tech, i) => (
                  <motion.span
                    key={tech}
                    className="bg-surface-container-high px-3 py-1 text-[10px] font-mono tracking-widest cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
                    whileHover={{
                      backgroundColor: "rgba(235,0,0,0.15)",
                      color: "#ff8e7d",
                      scale: 1.05,
                    }}
                  >
                    {tech}
                  </motion.span>
                )
              )}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 relative z-10">
            <p className="text-xs text-on-surface-variant font-body leading-relaxed">
              Specialized in orchestrating asynchronous distributed systems with integrated
              transformer models for real-time inference.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
