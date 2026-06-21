"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Tulip from "./Tulip";
import { primeAndPlayTheme } from "../utils/themeMusic";

export default function EntryGate({ onEnter }: { onEnter: () => void }) {
  const [closing, setClosing] = useState(false);

  const handleClick = () => {
    primeAndPlayTheme();
    setClosing(true);
    setTimeout(onEnter, 900);
  };

  return (
    <AnimatePresence>
      {!closing && (
        <motion.div
          exit={{
            opacity: 0,
            scale: 1.04,
            transition: { duration: 1.1, ease: [0.65, 0, 0.35, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(160deg, #0a0512 0%, #170c22 45%, #261232 100%)" }}
        >
          {}
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border"
              style={{
                width: `${i * 22}vw`,
                height: `${i * 22}vw`,
                maxWidth: `${i * 180}px`,
                maxHeight: `${i * 180}px`,
                borderColor: i === 2 ? "rgba(255,233,173,0.16)" : "rgba(116,64,184,0.14)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.45, 0], scale: [0.8, 1.1, 1.4] }}
              transition={{ duration: 4 + i * 0.8, delay: i * 0.4, repeat: Infinity, ease: "easeOut" }}
            />
          ))}

          {}
          {[
            { l: 20, t: 25, s: 2, d: 0 },
            { l: 78, t: 30, s: 1.6, d: 0.8 },
            { l: 30, t: 70, s: 1.8, d: 1.4 },
            { l: 70, t: 68, s: 2.2, d: 0.4 },
            { l: 50, t: 18, s: 1.4, d: 1.9 },
            { l: 14, t: 52, s: 1.6, d: 1.1 },
            { l: 86, t: 52, s: 1.8, d: 0.6 },
          ].map((s, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${s.l}%`,
                top: `${s.t}%`,
                width: `${s.s}px`,
                height: `${s.s}px`,
                background: "var(--color-gold-bright)",
                boxShadow: "0 0 8px rgba(255,233,173,0.9)",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.3, 0] }}
              transition={{ duration: 3, delay: 1.6 + s.d, repeat: Infinity, repeatDelay: 2.6, ease: "easeInOut" }}
            />
          ))}

          {}
          {[
            "top-6 left-6",
            "top-6 right-6 rotate-90",
            "bottom-6 right-6 rotate-180",
            "bottom-6 left-6 -rotate-90",
          ].map((pos, i) => (
            <motion.div
              key={i}
              className={`absolute ${pos} pointer-events-none`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M2 2 L20 2 M2 2 L2 20" stroke="var(--color-gold)" strokeWidth="0.8" strokeOpacity="0.4" strokeLinecap="round" />
                <circle cx="2" cy="2" r="1.5" fill="var(--color-gold)" fillOpacity="0.5" />
              </svg>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center px-6 text-center relative z-10"
          >
            {}
            <motion.div
              className="relative h-32 w-20 mb-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
            >
              <div
                className="absolute inset-0 -z-10 rounded-full blur-2xl pulse-soft"
                style={{ background: "radial-gradient(circle, rgba(199,148,250,0.35), transparent 70%)" }}
              />
              <div className="bloom-glow h-full w-full">
                <Tulip delay={0.5} uid="gate" />
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.35em" }}
              transition={{ duration: 1.2, delay: 0.7 }}
              className="font-body text-[10px] uppercase text-[var(--color-gold-soft)]"
            >
              for judielle rovie villacrusis
            </motion.p>

            {}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="mt-5 h-px w-24 shimmer-line"
            />

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 1 }}
              className="font-display mt-6 text-4xl italic leading-tight text-[var(--color-offwhite)] text-shadow-glow sm:text-5xl"
            >
              a little something
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 1 }}
              className="text-foil font-display text-4xl italic leading-tight sm:text-5xl"
            >
              for our 17<span className="align-super text-[0.45em]">th</span>
            </motion.p>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="mt-5 h-px w-24 shimmer-line"
            />

            <motion.button
              onClick={handleClick}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              whileHover={{ scale: 1.06, y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="group relative mt-10 overflow-hidden rounded-full border px-10 py-3.5 font-body text-xs uppercase tracking-[0.3em] text-[var(--color-lilac)] transition-all duration-300"
              style={{
                background: "rgba(116,64,184,0.1)",
                borderColor: "rgba(224,185,126,0.45)",
                boxShadow: "0 0 24px rgba(199,148,250,0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {}
              <motion.span
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "radial-gradient(circle at 50%, rgba(255,233,173,0.18), transparent 70%)" }}
              />
              <span className="relative z-10">open it, bal</span>
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 2.2, duration: 1 }}
              className="mt-8 font-body text-[9px] uppercase tracking-[0.25em] text-[var(--color-lilac)]"
            >
              June 21st, 2026
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
