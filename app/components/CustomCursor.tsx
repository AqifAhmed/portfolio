"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25 });

  // Trailing dot
  const trailX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const trailY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const style = window.getComputedStyle(el).cursor;
        setIsPointer(style === "pointer" || el.tagName === "A" || el.tagName === "BUTTON");
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Main dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: isPointer ? 40 : 8,
            height: isPointer ? 40 : 8,
            opacity: isPointer ? 0.6 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: trailX, y: trailY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full border border-primary-dim"
          animate={{
            width: isPointer ? 60 : 32,
            height: isPointer ? 60 : 32,
            opacity: isPointer ? 0.8 : 0.3,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </>
  );
}
