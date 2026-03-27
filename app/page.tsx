"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsGrid from "./components/StatsGrid";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("BOOTING");

  const phases = ["BOOTING", "LOADING_NEURAL_OS", "INIT_COMPLETE"];

  useEffect(() => {
    let p = 0;
    const timer = setInterval(() => {
      p += Math.random() * 15 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(timer);
        setTimeout(onComplete, 600);
      }
      setProgress(Math.min(p, 100));
      if (p > 33 && p < 66) setPhase(phases[1]);
      else if (p >= 66) setPhase(phases[2]);
    }, 120);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-background z-[9999] flex flex-col items-center justify-center"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="font-headline text-5xl font-black tracking-tighter mb-16"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span className="text-primary-dim">Aqif</span> Ahmed
      </motion.div>

      <div className="w-64 space-y-4">
        <div className="flex justify-between text-xs font-mono text-on-surface-variant mb-2">
          <span>{phase}</span>
          <span className="text-primary-dim">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-[1px] bg-white/10">
          <motion.div
            className="h-full bg-primary-dim"
            style={{ width: `${progress}%`, boxShadow: "0 0 10px #eb0000" }}
          />
        </div>
        <motion.div
          className="text-[10px] font-mono text-on-surface-variant tracking-widest text-center"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          INITIALIZING_SYSTEM...
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <CustomCursor />

      {/* Scanline overlay */}
      <div className="scanline" />

      {/* Grain overlay */}
      <div className="grain" />

      <AnimatePresence>{loading && <LoadingScreen onComplete={() => setLoading(false)} />}</AnimatePresence>

      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Navbar />
            <main>
              <Hero />
              <StatsGrid />
              <Projects />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
