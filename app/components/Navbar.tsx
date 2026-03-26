"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "ABOUT", href: "#" },
    { label: "PROJECTS", href: "#projects" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <motion.nav
      className="fixed top-0 w-full z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-[#0e0e0e]/90 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="flex justify-between items-center px-8 h-20 w-full max-w-screen-2xl mx-auto">
          {/* Logo */}
          <motion.div
            className="text-2xl font-black tracking-tighter text-white uppercase font-headline"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-primary-dim">AQIF</span>.AI
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-10 font-headline tracking-tighter uppercase text-sm font-bold">
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="relative text-white/60 hover:text-white transition-colors duration-300 group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3, duration: 0.5 }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary-dim group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* Terminal Button */}
          <motion.button
            className="p-2 text-primary-dim hover:bg-white/5 transition-all duration-200 active:scale-95"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="material-symbols-outlined">terminal</span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
