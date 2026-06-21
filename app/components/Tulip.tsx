"use client";

import { motion } from "framer-motion";

type TulipProps = {
  className?: string;
  stroke?: string;
  fill?: string;
  delay?: number;
  animate?: boolean;
  /** Unique id suffix so multiple tulips on one page don't share gradient/filter ids */
  uid?: string;
};

export default function Tulip({
  className,
  stroke = "var(--color-gold-soft)",
  delay = 0,
  animate = true,
  uid = "0",
}: TulipProps) {
  const gradId = `tulip-petal-${uid}`;
  const innerGradId = `tulip-inner-${uid}`;
  const glowId = `tulip-glow-${uid}`;

  return (
    <motion.svg
      viewBox="0 0 120 200"
      className={className}
      fill="none"
      initial={false}
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-violet-glow)" />
          <stop offset="45%" stopColor="var(--color-magenta)" />
          <stop offset="100%" stopColor="var(--color-violet-royal)" />
        </linearGradient>
        <linearGradient id={innerGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-gold-bright)" />
          <stop offset="55%" stopColor="var(--color-rose)" />
          <stop offset="100%" stopColor="var(--color-magenta)" />
        </linearGradient>
        <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Stem */}
      <motion.path
        d="M60 120 C 60 148, 58 172, 60 198"
        stroke={stroke}
        strokeOpacity={0.7}
        strokeWidth="1.8"
        strokeLinecap="round"
        initial={animate ? { pathLength: 0, opacity: 0 } : false}
        animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration: 1.2, delay: delay + 0.4, ease: "easeOut" }}
      />
      {/* Leaf */}
      <motion.path
        d="M60 162 C 38 156, 22 140, 19 117 C 43 120, 57 135, 60 162 Z"
        stroke={stroke}
        strokeOpacity={0.6}
        strokeWidth="1.2"
        fill="var(--color-violet-soft)"
        fillOpacity={0.18}
        initial={animate ? { pathLength: 0, opacity: 0 } : false}
        animate={animate ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration: 1.0, delay: delay + 0.7, ease: "easeOut" }}
      />

      <g filter={`url(#${glowId})`}>
        {/* Left outer petal */}
        <motion.path
          d="M60 68 C 36 70, 21 90, 26 116 C 30 133, 47 140, 60 122 C 50 106, 47 84, 60 68 Z"
          stroke="var(--color-gold-soft)"
          strokeOpacity={0.55}
          strokeWidth="1.3"
          fill={`url(#${gradId})`}
          fillOpacity={0.82}
          initial={animate ? { rotate: -22, opacity: 0, scale: 0.8 } : false}
          animate={animate ? { rotate: 0, opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "60px 122px" }}
        />
        {/* Right outer petal */}
        <motion.path
          d="M60 68 C 84 70, 99 90, 94 116 C 90 133, 73 140, 60 122 C 70 106, 73 84, 60 68 Z"
          stroke="var(--color-gold-soft)"
          strokeOpacity={0.55}
          strokeWidth="1.3"
          fill={`url(#${gradId})`}
          fillOpacity={0.82}
          initial={animate ? { rotate: 22, opacity: 0, scale: 0.8 } : false}
          animate={animate ? { rotate: 0, opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "60px 122px" }}
        />
        {/* Inner left petal */}
        <motion.path
          d="M60 72 C 46 82, 44 104, 56 120 C 62 110, 62 88, 60 72 Z"
          stroke="var(--color-gold-bright)"
          strokeOpacity={0.4}
          strokeWidth="1"
          fill={`url(#${innerGradId})`}
          fillOpacity={0.85}
          initial={animate ? { rotate: -10, opacity: 0, scale: 0.85 } : false}
          animate={animate ? { rotate: 0, opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.9, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "60px 122px" }}
        />
        {/* Inner right petal */}
        <motion.path
          d="M60 72 C 74 82, 76 104, 64 120 C 58 110, 58 88, 60 72 Z"
          stroke="var(--color-gold-bright)"
          strokeOpacity={0.4}
          strokeWidth="1"
          fill={`url(#${innerGradId})`}
          fillOpacity={0.85}
          initial={animate ? { rotate: 10, opacity: 0, scale: 0.85 } : false}
          animate={animate ? { rotate: 0, opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.9, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "60px 122px" }}
        />
        {/* Center petal */}
        <motion.path
          d="M60 60 C 47 76, 45 106, 60 124 C 75 106, 73 76, 60 60 Z"
          stroke="var(--color-gold-bright)"
          strokeOpacity={0.6}
          strokeWidth="1.3"
          fill={`url(#${innerGradId})`}
          fillOpacity={0.95}
          initial={animate ? { scaleY: 0.25, opacity: 0 } : false}
          animate={animate ? { scaleY: 1, opacity: 1 } : undefined}
          transition={{ duration: 1.0, delay: delay + 0.18, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "60px 124px" }}
        />
        {/* Stamen highlight */}
        <motion.circle
          cx="60"
          cy="88"
          r="2.5"
          fill="var(--color-gold-bright)"
          fillOpacity={0.8}
          initial={animate ? { opacity: 0, scale: 0 } : false}
          animate={animate ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.5, delay: delay + 0.6 }}
        />
      </g>

      {/* Tiny sparkle accents that twinkle once bloomed */}
      {[
        { x: 32, y: 78, r: 1.4, d: 0 },
        { x: 90, y: 95, r: 1.1, d: 0.6 },
        { x: 60, y: 55, r: 1.6, d: 1.1 },
      ].map((s, i) => (
        <motion.circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill="var(--color-gold-bright)"
          initial={{ opacity: 0, scale: 0 }}
          animate={
            animate
              ? {
                  opacity: [0, 1, 0],
                  scale: [0, 1.4, 0],
                }
              : undefined
          }
          transition={{
            duration: 2.2,
            delay: delay + 1.4 + s.d,
            repeat: Infinity,
            repeatDelay: 2.4 + s.d,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.svg>
  );
}
