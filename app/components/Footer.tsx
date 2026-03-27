"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const links = [
    { name: "GITHUB", url: "https://github.com/aqifahmed" },
    { name: "LINKEDIN", url: "https://linkedin.com/in/aqifahmed" },
    { name: "X", url: "https://x.com/aqif__ahmed" }
  ];

  return (
    <footer className="bg-[#000000] w-full py-12 border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 gap-6 max-w-screen-2xl mx-auto">
        <motion.div
          className="text-white font-bold font-headline text-lg tracking-tighter"
          whileHover={{ color: "#ff8e7d" }}
          transition={{ duration: 0.2 }}
        >
          AQIF AHMED
        </motion.div>

        <p className="font-mono text-[10px] tracking-widest uppercase text-white/40">
          © 2024 AQIF AHMED. ENGINEERED FOR PRECISION.
        </p>

        <div className="flex gap-8">
          {links.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-widest uppercase font-bold text-white/40"
              whileHover={{ color: "#ff8e7d", x: 2 }}
              transition={{ duration: 0.2 }}
            >
              {link.name}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
