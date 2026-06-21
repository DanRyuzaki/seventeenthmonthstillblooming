"use client";

import { motion } from "framer-motion";
import Tulip from "../components/Tulip";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.16, delayChildren: 0.25 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 1.0, ease: EASE_OUT } },
};

export default function GreetingScene() {
  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center px-6 text-center overflow-hidden">
      {}
      <div className="pointer-events-none absolute bottom-0 left-0 h-[50vh] w-28 hidden sm:block sm:left-4 md:w-36 bloom-glow">
        <Tulip delay={0.7} uid="greet-left" />
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 h-[44vh] w-28 hidden sm:block sm:right-4 md:w-36 scale-x-[-1] bloom-glow">
        <Tulip delay={1.0} uid="greet-right" />
      </div>

      {}
      <div className="pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 h-20 w-14 sm:hidden">
        <div
          className="absolute inset-0 -z-10 rounded-full blur-xl pulse-soft"
          style={{ background: "radial-gradient(circle, rgba(199,148,250,0.4), transparent 70%)" }}
        />
        <div className="bloom-glow h-full w-full opacity-90">
          <Tulip delay={0.4} uid="greet-mobile" />
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center"
      >
        <motion.span
          variants={item}
          className="font-body text-[10px] uppercase tracking-[0.4em] text-[var(--color-gold-soft)]"
        >
          Danielle &nbsp;&middot;&nbsp; Judielle
        </motion.span>

        {}
        <motion.div
          variants={item}
          className="mt-5 h-px w-20 shimmer-line"
        />

        {}
        <motion.h1
          variants={item}
          className="font-display mt-8 text-[18vw] italic leading-[0.88] text-shadow-glow sm:text-[11vw] md:text-[8.5rem]"
          style={{ color: "var(--color-offwhite)" }}
        >
          Happy
        </motion.h1>
        <motion.h1
          variants={item}
          className="text-foil font-display -mt-1 text-[18vw] italic leading-[0.88] sm:text-[11vw] md:text-[8.5rem]"
        >
          17<span className="align-super text-[0.38em]">th</span>
        </motion.h1>

        {}
        {[
          { l: 8, t: 38, size: 5, delay: 0.3 },
          { l: 90, t: 30, size: 4, delay: 1.1 },
          { l: 14, t: 58, size: 3, delay: 1.8 },
          { l: 86, t: 62, size: 4, delay: 0.7 },
        ].map((s, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute rounded-full"
            style={{
              left: `${s.l}%`,
              top: `${s.t}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              background: "var(--color-gold-bright)",
              boxShadow: "0 0 10px rgba(255,233,173,0.95), 0 0 20px rgba(255,233,173,0.5)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.3, 0] }}
            transition={{ duration: 2.6, delay: 1.6 + s.delay, repeat: Infinity, repeatDelay: 3.2, ease: "easeInOut" }}
          />
        ))}

        {}
        <motion.p
          variants={item}
          className="font-display mt-2 text-[7vw] italic leading-tight text-[var(--color-violet-glow)] text-shadow-violet sm:text-[4vw] md:text-[3.2rem]"
        >
          Monthsary
        </motion.p>

        <motion.p
          variants={item}
          className="font-display mt-6 text-2xl italic text-[var(--color-rose)] sm:text-3xl"
        >
          bal. &#10084;
        </motion.p>

        {}
        <motion.div variants={item} className="mt-10 flex items-center gap-4">
          <span className="h-px w-12 bg-[var(--color-gold)]/35" />
          <span className="font-body text-[9px] uppercase tracking-[0.32em] text-[var(--color-lilac)]/50">
            seventeen months, still blooming
          </span>
          <span className="h-px w-12 bg-[var(--color-gold)]/35" />
        </motion.div>
      </motion.div>

      {}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-48 w-[70vw] blur-3xl opacity-35"
        style={{ background: "radial-gradient(ellipse at 50% 100%, #d456b9, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-32 w-[50vw] blur-2xl opacity-20"
        style={{ background: "radial-gradient(ellipse at 50% 100%, #ffe9ad, transparent 70%)" }}
      />
    </section>
  );
}
