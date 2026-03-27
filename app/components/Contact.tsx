"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [focused, setFocused] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending || sent) return;
    setSending(true);

    const formData = new FormData(e.currentTarget);
    // Web3Forms API Key
    formData.append("access_key", "e5a40bd9-b414-4bdd-84fe-a571a0a1ee4d");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSent(true);
      } else {
        console.error("Transmission failed");
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setSending(false);
    }
  };

  const fields = [
    { id: "name", label: "IDENTIFIER", type: "text", colSpan: 1 },
    { id: "email", label: "COMM_CHANNEL", type: "email", colSpan: 1 },
  ];

  return (
    <section className="py-40 px-8 bg-surface-container-low relative overflow-hidden" id="contact">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(235,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(235,0,0,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient glows */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-dim/5 rounded-full blur-[100px]"
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10" ref={ref}>
        {/* Label */}
        <motion.p
          className="font-headline text-primary-dim font-bold tracking-[0.4em] text-xs mb-8 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          PROTOCOL: START_TRANSMISSION
        </motion.p>

        {/* Heading */}
        <div className="overflow-hidden mb-20">
          <motion.h2
            className="font-headline text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none"
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            INITIATE
            <br />
            CONNECTION
          </motion.h2>
        </div>

        {/* Form */}
        <motion.form
          className="space-y-12 text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {fields.map((field) => (
              <div key={field.id} className="relative">
                <motion.input
                  className="peer w-full bg-transparent border-0 border-b border-outline py-4 focus:ring-0 focus:outline-none focus:border-primary-dim transition-all text-xl font-headline uppercase tracking-widest text-white placeholder-transparent"
                  id={field.id}
                  name={field.id}
                  placeholder=" "
                  type={field.type}
                  required
                  onFocus={() => setFocused(field.id)}
                  onBlur={() => setFocused(null)}
                />
                <label
                  className="absolute top-4 left-0 text-on-surface-variant pointer-events-none text-sm transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary-dim peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs font-mono tracking-widest"
                  htmlFor={field.id}
                >
                  {field.label}
                </label>
                <motion.div
                  className="absolute bottom-0 left-0 h-[1px] bg-primary-dim"
                  initial={{ width: "0%" }}
                  animate={{ width: focused === field.id ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            ))}
          </div>

          {/* Textarea */}
          <div className="relative">
            <textarea
              className="peer w-full bg-transparent border-0 border-b border-outline py-4 focus:ring-0 focus:outline-none focus:border-primary-dim transition-all text-xl font-headline uppercase tracking-widest resize-none text-white placeholder-transparent"
              id="message"
              name="message"
              placeholder=" "
              rows={4}
              required
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
            />
            <label
              className="absolute top-4 left-0 text-on-surface-variant pointer-events-none text-sm transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary-dim peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs font-mono tracking-widest"
              htmlFor="message"
            >
              MANIFESTO / REQUEST
            </label>
            <motion.div
              className="absolute bottom-0 left-0 h-[1px] bg-primary-dim"
              initial={{ width: "0%" }}
              animate={{ width: focused === "message" ? "100%" : "0%" }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Submit */}
          <div className="flex justify-center pt-8">
            <motion.button
              className="group relative px-12 py-6 bg-primary-dim text-on-primary-fixed font-headline font-black uppercase tracking-[0.2em] kinetic-glow overflow-hidden"
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              disabled={sending || sent}
            >
              <span className="relative z-10 flex items-center gap-3">
                {sent ? (
                  <>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                    >
                      TRANSMITTED
                    </motion.span>
                    <span className="material-symbols-outlined">check</span>
                  </>
                ) : sending ? (
                  <>
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      ENCRYPTING...
                    </motion.span>
                    <motion.span
                      className="material-symbols-outlined"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      sync
                    </motion.span>
                  </>
                ) : (
                  <>
                    SEND_DATA
                    <span className="material-symbols-outlined">send</span>
                  </>
                )}
              </span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
