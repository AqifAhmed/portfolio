"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// ── Types ──────────────────────────────────────────────────────
interface GitHubData {
  total: number;
  barHeights: number[];
}

interface LeetCodeData {
  totalSolved: number;
  easy: { solved: number; total: number };
  medium: { solved: number; total: number };
  hard: { solved: number; total: number };
  totalQuestions: number;
  ranking: number;
}

// ── Animated counter ──────────────────────────────────────────
function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || target === 0) return;
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

// ── Skeleton pulse for loading states ─────────────────────────
function SkeletonPulse({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`bg-surface-container-high ${className}`}
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  );
}

// ── Framer variants ───────────────────────────────────────────
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

// ── Main component ────────────────────────────────────────────
export default function StatsGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [github, setGithub] = useState<GitHubData | null>(null);
  const [leetcode, setLeetcode] = useState<LeetCodeData | null>(null);
  const [ghError, setGhError] = useState(false);
  const [lcError, setLcError] = useState(false);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error();
        setGithub(d);
      })
      .catch(() => setGhError(true));

    fetch("/api/leetcode")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error();
        setLeetcode(d);
      })
      .catch(() => setLcError(true));
  }, []);

  // Compute LeetCode percentages
  const lcSolvePercent =
    leetcode && leetcode.totalQuestions > 0
      ? Math.round((leetcode.totalSolved / leetcode.totalQuestions) * 100)
      : 0;

  const lcEasyPercent =
    leetcode && leetcode.easy.total > 0
      ? Math.round((leetcode.easy.solved / leetcode.easy.total) * 100)
      : 0;

  const lcMediumPercent =
    leetcode && leetcode.medium.total > 0
      ? Math.round((leetcode.medium.solved / leetcode.medium.total) * 100)
      : 0;

  const lcHardPercent =
    leetcode && leetcode.hard.total > 0
      ? Math.round((leetcode.hard.solved / leetcode.hard.total) * 100)
      : 0;

  return (
    <section className="py-32 px-8 max-w-screen-2xl mx-auto" ref={ref} id="stats">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* ─── GitHub Card ────────────────────────────────────── */}
        <motion.div
          variants={cardVariants}
          className="bg-surface p-10 flex flex-col justify-between group relative overflow-hidden"
        >
          <motion.div className="absolute inset-0 bg-primary-dim/0 group-hover:bg-primary-dim/3 transition-all duration-500" />
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

            {github ? (
              <div className="flex items-end gap-2 mb-4">
                <span className="text-6xl font-headline font-black tracking-tighter">
                  <AnimatedCounter target={github.total} />
                </span>
                <span className="text-on-surface-variant text-sm mb-2 font-mono">
                  CONTRIB/YR
                </span>
              </div>
            ) : ghError ? (
              <div className="flex items-end gap-2 mb-4">
                <span className="text-2xl font-headline font-bold text-on-surface-variant">
                  FETCH_ERROR
                </span>
              </div>
            ) : (
              <div className="flex items-end gap-2 mb-4">
                <SkeletonPulse className="w-40 h-14" />
                <SkeletonPulse className="w-20 h-4 mb-2" />
              </div>
            )}
          </div>

          <div className="space-y-4 relative z-10">
            <div className="h-24 flex items-end gap-1">
              {github
                ? github.barHeights.map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-primary-dim/20"
                      style={{ height: `${h}%` }}
                      initial={{ height: 0 }}
                      animate={
                        inView
                          ? { height: `${Math.max(h, 2)}%` }
                          : { height: 0 }
                      }
                      transition={{
                        delay: 0.3 + i * 0.06,
                        duration: 0.6,
                        ease: "easeOut",
                      }}
                      whileHover={{
                        backgroundColor: "rgba(235,0,0,0.8)",
                      }}
                    />
                  ))
                : Array.from({ length: 12 }).map((_, i) => (
                    <SkeletonPulse key={i} className="flex-1 h-full" />
                  ))}
            </div>
            <p className="text-[10px] font-mono text-on-surface-variant tracking-widest">
              COMMIT_FLOW:{" "}
              {github
                ? github.total > 500
                  ? "OVERDRIVE"
                  : github.total > 200
                  ? "STEADY_STATE"
                  : github.total > 50
                  ? "WARMING_UP"
                  : "INITIALIZING"
                : "LOADING..."}
            </p>
          </div>
        </motion.div>

        {/* ─── LeetCode Card ──────────────────────────────────── */}
        <motion.div
          variants={cardVariants}
          className="bg-surface p-10 flex flex-col justify-between border-x border-white/5 relative overflow-hidden group"
        >
          <motion.div className="absolute inset-0 bg-primary-dim/0 group-hover:bg-primary-dim/3 transition-all duration-500" />
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

            {leetcode ? (
              <div className="flex items-end gap-2 mb-4">
                <span className="text-6xl font-headline font-black tracking-tighter">
                  <AnimatedCounter target={leetcode.totalSolved} />
                </span>
                <span className="text-on-surface-variant text-sm mb-2 font-mono">
                  SOLVED
                </span>
              </div>
            ) : lcError ? (
              <div className="flex items-end gap-2 mb-4">
                <span className="text-2xl font-headline font-bold text-on-surface-variant">
                  FETCH_ERROR
                </span>
              </div>
            ) : (
              <div className="flex items-end gap-2 mb-4">
                <SkeletonPulse className="w-32 h-14" />
                <SkeletonPulse className="w-16 h-4 mb-2" />
              </div>
            )}
          </div>

          {leetcode ? (
            <div className="space-y-3 relative z-10">
              {/* Easy */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-green-400">EASY</span>
                  <span className="text-primary-dim">
                    {leetcode.easy.solved}/{leetcode.easy.total}
                  </span>
                </div>
                <div className="w-full h-1 bg-surface-container-highest overflow-hidden">
                  <motion.div
                    className="h-full bg-green-400"
                    initial={{ width: "0%" }}
                    animate={
                      inView
                        ? { width: `${lcEasyPercent}%` }
                        : { width: "0%" }
                    }
                    transition={{
                      delay: 0.5,
                      duration: 1.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>
              </div>
              {/* Medium */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-yellow-400">MEDIUM</span>
                  <span className="text-primary-dim">
                    {leetcode.medium.solved}/{leetcode.medium.total}
                  </span>
                </div>
                <div className="w-full h-1 bg-surface-container-highest overflow-hidden">
                  <motion.div
                    className="h-full bg-yellow-400"
                    initial={{ width: "0%" }}
                    animate={
                      inView
                        ? { width: `${lcMediumPercent}%` }
                        : { width: "0%" }
                    }
                    transition={{
                      delay: 0.7,
                      duration: 1.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>
              </div>
              {/* Hard */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-red-400">HARD</span>
                  <span className="text-primary-dim">
                    {leetcode.hard.solved}/{leetcode.hard.total}
                  </span>
                </div>
                <div className="w-full h-1 bg-surface-container-highest overflow-hidden">
                  <motion.div
                    className="h-full bg-red-400"
                    initial={{ width: "0%" }}
                    animate={
                      inView
                        ? { width: `${lcHardPercent}%` }
                        : { width: "0%" }
                    }
                    transition={{
                      delay: 0.9,
                      duration: 1.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-between text-xs font-mono pt-2">
                <span>GLOBAL_RANKING</span>
                <motion.span
                  className="text-white"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  #{leetcode.ranking.toLocaleString()}
                </motion.span>
              </div>
            </div>
          ) : (
            <div className="space-y-3 relative z-10">
              <SkeletonPulse className="w-full h-1" />
              <SkeletonPulse className="w-full h-1" />
              <SkeletonPulse className="w-full h-1" />
              <SkeletonPulse className="w-3/4 h-4 mt-2" />
            </div>
          )}
        </motion.div>

        {/* ─── Core Stack Card ────────────────────────────────── */}
        <motion.div
          variants={cardVariants}
          className="bg-surface p-10 flex flex-col justify-between relative overflow-hidden group"
        >
          <motion.div className="absolute inset-0 bg-primary-dim/0 group-hover:bg-primary-dim/3 transition-all duration-500" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <motion.span
                className="material-symbols-outlined text-primary-dim"
                animate={{ rotate: [0, 360] }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                memory
              </motion.span>
              <h3 className="font-headline font-bold tracking-widest uppercase text-xs text-on-surface-variant">
                CORE_STACK
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "PYTHON_3.12",
                "FASTAPI",
                "PYTORCH",
                "POSTGRESQL",
                "DOCKER",
                "LLM_OPS",
              ].map((tech, i) => (
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
              ))}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 relative z-10">
            <p className="text-xs text-on-surface-variant font-body leading-relaxed">
              Specialized in orchestrating asynchronous distributed systems with
              integrated transformer models for real-time inference.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
