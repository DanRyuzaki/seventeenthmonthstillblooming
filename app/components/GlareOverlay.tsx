"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";

type Sparkle = {
  left: number;
  top: number;
  size: number;
  glowSize: number;
  scaleEnd: number;
  riseDistance: number;
  duration: number;
  delay: number;
};

function generateSparkles(count: number, seed: number): Sparkle[] {
  const seedOffset = (seed % 5) * 0.02;
  return Array.from({ length: count }, () => ({
    left: 10 + Math.random() * 80,
    top: 10 + Math.random() * 80,
    size: 2 + Math.random() * 3,
    glowSize: 4 + Math.random() * 8,
    scaleEnd: 1 + Math.random(),
    riseDistance: 20 + Math.random() * 40,
    duration: 0.8 + Math.random() * 0.5,
    delay: Math.random() * 0.3 + seedOffset,
  }));
}

export default function GlareOverlay({ trigger }: { trigger: number }) {
  const sparkles = useMemo(() => generateSparkles(18, trigger), [trigger]);

  return (
    <AnimatePresence>
      {trigger > 0 && (
        <motion.div
          key={trigger}
          className="pointer-events-none fixed inset-0 z-[75]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.6, 0] }}
          transition={{ duration: 1.1, ease: [0.2, 0, 0.8, 1], times: [0, 0.15, 0.5, 1] }}
        >
          {}
          <motion.div
            className="absolute inset-0"
            initial={{ x: "-120%", skewX: -15 }}
            animate={{ x: "220%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background:
                "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.03) 35%, rgba(232,217,240,0.18) 48%, rgba(212,175,122,0.22) 52%, rgba(184,126,240,0.12) 60%, transparent 75%)",
              width: "60%",
            }}
          />

          {}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: [0, 0.7, 0], scale: [0.6, 1.4, 1.8] }}
            transition={{ duration: 1.0, ease: "easeOut" }}
          >
            <div
              className="h-[60vh] w-[60vw] rounded-full"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(212,175,122,0.18) 0%, rgba(184,126,240,0.12) 35%, rgba(192,76,170,0.08) 60%, transparent 80%)",
                filter: "blur(40px)",
              }}
            />
          </motion.div>

          {}
          {sparkles.map((s, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
                backgroundColor:
                  i % 3 === 0
                    ? "rgba(212,175,122,0.9)"
                    : i % 3 === 1
                    ? "rgba(240,160,204,0.8)"
                    : "rgba(184,126,240,0.7)",
                boxShadow: `0 0 ${s.glowSize}px currentColor`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, s.scaleEnd, 0],
                y: [0, -s.riseDistance],
              }}
              transition={{
                duration: s.duration,
                delay: s.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
