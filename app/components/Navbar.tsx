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
    { label: "ABOUT", href: "#stats" },
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
            ? "bg-[#0e0e0e]/90 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 sm:px-8 h-20 w-full max-w-screen-2xl mx-auto">
          {/* Logo */}
          <motion.div
            className="text-2xl font-black tracking-tighter text-white uppercase font-headline"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-primary-dim">Aqif</span> Ahmed
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-10 font-headline tracking-tighter uppercase text-sm font-bold absolute left-1/2 -translate-x-1/2">
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

          {/* Mobile Menu Toggle (Terminal Icon) */}
          <motion.button
            className="md:hidden p-2 text-primary-dim hover:bg-white/5 rounded transition-all duration-200 active:scale-95 relative z-50"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className="material-symbols-outlined text-[28px]">
              {menuOpen ? "close" : "menu"}
            </span>
          </motion.button>

          {/* Desktop terminal icon (decorative) */}
          <motion.div
            className="hidden md:flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="material-symbols-outlined text-primary-dim/50 text-xl">terminal</span>
          </motion.div>
        </div>

        {/* Mobile Nav Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden fixed inset-x-0 top-20 bg-[#0e0e0e]/98 backdrop-blur-3xl border-t border-white/5 overflow-hidden z-40"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-col px-6 sm:px-8 py-8 gap-0 font-headline tracking-tighter uppercase text-sm font-bold">
                {links.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="text-white/60 hover:text-white hover:pl-2 transition-all duration-300 py-5 border-b border-white/5 last:border-b-0 flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: 0.05 * i + 0.1 }}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="w-1.5 h-1.5 bg-primary-dim/40 inline-block" />
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
