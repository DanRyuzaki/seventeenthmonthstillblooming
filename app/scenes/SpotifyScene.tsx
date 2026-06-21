"use client";

import { motion } from "framer-motion";
import Tulip from "../components/Tulip";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

export default function SpotifyScene() {
  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center gap-6 px-6 text-center overflow-hidden">
      {}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-[80vw] blur-3xl opacity-30"
        style={{ background: "radial-gradient(ellipse at 50% 100%, #d456b9, transparent 70%)" }}
      />

      {}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[36vh] w-28 -translate-x-1/2 bloom-glow">
        <Tulip delay={0.4} uid="spotify" />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center gap-4 w-full max-w-md"
      >
        {}
        <motion.div variants={fadeUp} className="flex flex-col items-center gap-2">
          <span className="font-body text-[9px] uppercase tracking-[0.42em] text-[var(--color-gold-soft)]">
            a song that reminds me of us
          </span>
          <div className="h-px w-14 shimmer-line" />
        </motion.div>

        {}
        <motion.div variants={fadeUp} className="flex flex-col items-center">
          <h2 className="text-foil font-display text-4xl italic sm:text-5xl">
            Ikaw at Ako
          </h2>
          <p className="font-body mt-1 text-sm tracking-wide text-[var(--color-lilac-dim)]/70">
            Johnoy Danao
          </p>
        </motion.div>

        {}
        <motion.div
          variants={fadeUp}
          className="w-full overflow-hidden"
          style={{
            borderRadius: "16px",
            border: "1px solid rgba(224,185,126,0.3)",
            boxShadow: "0 30px 80px rgba(0,0,0,0.55), 0 0 50px rgba(199,148,250,0.18)",
          }}
        >
          <iframe
            style={{ borderRadius: "14px", display: "block" }}
            src="https://open.spotify.com/embed/track/1vzxlhQ3dujloZsqeO3Wei?utm_source=generator&theme=0"
            width="100%"
            height="152"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Ikaw at Ako - Johnoy Danao on Spotify"
          />
        </motion.div>

        {}
        <motion.p
          variants={fadeUp}
          className="font-display max-w-xs text-lg italic text-[var(--color-lilac-dim)] leading-relaxed"
        >
          Kahit anong kanta pa ang tugtugin, ikaw at ako lang ang naririnig ko.
        </motion.p>

        {}
        <motion.div variants={fadeUp} className="h-px w-14 shimmer-line" />

        {}
        <motion.p
          variants={fadeUp}
          className="font-body text-[9px] uppercase tracking-[0.32em] text-[var(--color-gold-soft)]/55"
        >
          happy 17th monthsary, Judielle. &nbsp;愛してる.
        </motion.p>
      </motion.div>
    </section>
  );
}
