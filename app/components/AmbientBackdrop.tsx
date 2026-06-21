"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Petal = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rotateDir: number;
  opacity: number;
  shape: "petal" | "rose" | "star";
};

type Twinkle = {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  hue: "gold" | "opal";
};

function generatePetals(): Petal[] {
  const shapes: Petal["shape"][] = ["petal", "petal", "petal", "rose", "star"];
  return Array.from({ length: 26 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 8 + Math.random() * 22,
    duration: 19 + Math.random() * 18,
    delay: Math.random() * -28,
    drift: (Math.random() - 0.5) * 110,
    rotateDir: Math.random() > 0.5 ? 1 : -1,
    opacity: 0.1 + Math.random() * 0.24,
    shape: shapes[Math.floor(Math.random() * shapes.length)],
  }));
}

function generateTwinkles(): Twinkle[] {
  return Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 1 + Math.random() * 2.2,
    delay: Math.random() * 5,
    duration: 2.4 + Math.random() * 3,
    hue: Math.random() > 0.6 ? "opal" : "gold",
  }));
}

function PetalSVG({ shape, size, fill }: { shape: Petal["shape"]; size: number; fill: string }) {
  if (shape === "rose") {
    return (
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <path
          d="M10 2C12 4 14 7 12 10C14 10 16 12 14 14C12 16 10 16 10 18C10 16 8 16 6 14C4 12 6 10 8 10C6 7 8 4 10 2Z"
          fill={fill}
          fillOpacity="0.7"
        />
      </svg>
    );
  }
  if (shape === "star") {
    return (
      <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <path
          d="M10 1L11.5 7H18L12.5 11L14.5 17L10 13L5.5 17L7.5 11L2 7H8.5L10 1Z"
          fill={fill}
          fillOpacity="0.55"
        />
      </svg>
    );
  }
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 20 26" fill="none">
      <path
        d="M10 0 C17 2 19 10 15 16 C13 19 10 22 10 26 C10 22 7 19 5 16 C1 10 3 2 10 0 Z"
        fill={fill}
        fillOpacity="0.6"
      />
    </svg>
  );
}

export default function AmbientBackdrop() {
  const [petals] = useState<Petal[]>(generatePetals);
  const [twinkles] = useState<Twinkle[]>(generateTwinkles);
  const [mounted, setMounted] = useState(false);

  // Gate randomized particle positions until after hydration so server/client
  // markup matches on first paint, avoiding a hydration mismatch.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#150a1f]">
      {/* Multi-layer gradient wash */}
      <div className="absolute inset-0 bg-radial-violet" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0d0617 0%, #170c22 22%, #261232 50%, #170c22 78%, #0a0512 100%)",
        }}
      />

      {/* Aurora sheen — slow drifting royal-violet/magenta wash for a living, magical sky */}
      <motion.div
        className="absolute -top-1/4 left-1/2 h-[140vh] w-[140vw] -translate-x-1/2 aurora-drift"
        style={{
          background:
            "conic-gradient(from 200deg at 50% 30%, rgba(116,64,184,0.18), rgba(212,86,185,0.1) 25%, transparent 45%, rgba(199,148,250,0.14) 65%, transparent 85%)",
          filter: "blur(60px)",
        }}
      />

      {/* Ambient orbs — layered for depth */}
      <div
        className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full opacity-30 blur-[100px]"
        style={{ background: "radial-gradient(circle, #8748c4, transparent 70%)" }}
      />
      <div
        className="absolute top-1/3 -right-32 h-[30rem] w-[30rem] rounded-full opacity-25 blur-[90px]"
        style={{ background: "radial-gradient(circle, #d456b9, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-20 left-1/4 h-[20rem] w-[42rem] rounded-full opacity-20 blur-[80px]"
        style={{ background: "radial-gradient(circle, #7440b8, #d456b9, transparent 70%)" }}
      />
      {/* Centre gold halo — breathing */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[52vh] w-[52vw] rounded-full opacity-10 blur-[120px] pulse-soft"
        style={{ background: "radial-gradient(circle, rgba(255,233,173,0.18), transparent 70%)" }}
      />

      {/* Twinkling starfield — fine glimmering dust across the whole scene */}
      {mounted &&
        twinkles.map((t) => (
          <span
            key={t.id}
            className="absolute rounded-full twinkle"
            style={{
              left: `${t.left}%`,
              top: `${t.top}%`,
              width: `${t.size}px`,
              height: `${t.size}px`,
              background:
                t.hue === "gold"
                  ? "var(--color-gold-bright)"
                  : "var(--color-opal)",
              boxShadow:
                t.hue === "gold"
                  ? "0 0 6px rgba(255,233,173,0.9)"
                  : "0 0 6px rgba(230,230,255,0.85)",
              animationDelay: `${t.delay}s`,
              animationDuration: `${t.duration}s`,
            }}
          />
        ))}

      {/* Drifting particles */}
      {mounted &&
        petals.map((p) => {
          const fillColor =
            p.shape === "star"
              ? "var(--color-gold-bright)"
              : p.id % 3 === 0
              ? "var(--color-gold)"
              : p.id % 3 === 1
              ? "var(--color-magenta)"
              : "var(--color-violet-glow)";

          return (
            <motion.div
              key={p.id}
              className="absolute"
              style={{
                left: `${p.left}%`,
                top: "-5%",
                filter: `drop-shadow(0 0 ${p.size * 0.25}px ${fillColor})`,
              }}
              initial={{ y: "-10vh", opacity: 0 }}
              animate={{
                y: "110vh",
                x: [0, p.drift * 0.4, p.drift, p.drift * 0.6, 0],
                opacity: [0, p.opacity, p.opacity, p.opacity * 0.5, 0],
                rotate: [0, 120 * p.rotateDir, 250 * p.rotateDir, 360 * p.rotateDir],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <PetalSVG shape={p.shape} size={p.size} fill={fillColor} />
            </motion.div>
          );
        })}

      <div className="grain" />
    </div>
  );
}
