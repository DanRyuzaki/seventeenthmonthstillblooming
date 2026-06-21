"use client";

import { motion } from "framer-motion";
import Tulip from "../components/Tulip";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

export default function InvitationScene() {
  return (
    <section className="relative flex h-full w-full items-center justify-center px-6 overflow-hidden">
      {}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 45%, rgba(116,64,184,0.4), transparent 65%)",
        }}
      />

      {}
      <div className="pointer-events-none absolute left-1/2 top-0 h-32 w-20 -translate-x-1/2 bloom-glow">
        <Tulip delay={0.5} uid="invitation" />
      </div>

      {}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-[92vw] max-w-lg text-center"
        style={{
          background: "linear-gradient(160deg, #321c4a 0%, #221138 40%, #170a22 100%)",
          border: "1px solid rgba(224,185,126,0.3)",
          borderRadius: "2px",
          padding: "clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 3.5rem)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(199,148,250,0.1), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {}
        <div
          className="absolute inset-3 pointer-events-none sm:inset-5"
          style={{ border: "1px solid rgba(224,185,126,0.14)" }}
        />
        {}
        {["top-4 left-4", "top-4 right-4 rotate-90", "bottom-4 right-4 rotate-180", "bottom-4 left-4 -rotate-90"].map((pos, i) => (
          <svg key={i} className={`absolute ${pos} pointer-events-none`} width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2 H8 M2 2 V8" stroke="var(--color-gold)" strokeWidth="0.7" strokeOpacity="0.55" strokeLinecap="round" />
            <circle cx="2" cy="2" r="1" fill="var(--color-gold)" fillOpacity="0.5" />
          </svg>
        ))}

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center"
        >
          <motion.span
            variants={fadeUp}
            className="font-body text-[9px] uppercase tracking-[0.42em] text-[var(--color-gold-soft)]"
          >
            an invitation
          </motion.span>

          <motion.div variants={fadeUp} className="mt-5 h-px w-16 shimmer-line" />

          <motion.h2
            variants={fadeUp}
            className="text-foil font-display mt-6 text-4xl italic leading-tight sm:text-5xl"
          >
            to the next chapter
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="font-display mt-7 text-[1.05rem] leading-[1.8] text-[var(--color-lilac-dim)] sm:text-xl"
          >
            Seventeen months down, ngunit isang buong buhay pang gustong tahakin
            kasama ka ang imbitasyon ko sa iyo. Sa susunod nating mga buwan, sa mga
            susunod nating yugto, dalangin lamang na ako pa rin ang uri ng tulipan
            ang tangi mong pipiliin sa malawak na hardin.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="font-display mt-6 text-xl italic text-[var(--color-gold-soft)]"
          >
            Ikaw at Ako, Bal.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 h-px w-16 shimmer-line" />

          <motion.div
            variants={fadeUp}
            className="mt-6 flex items-center justify-center gap-3"
          >
            <span className="font-display text-sm italic text-[var(--color-lilac)]/60">
              Danielle &amp; Judielle
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
