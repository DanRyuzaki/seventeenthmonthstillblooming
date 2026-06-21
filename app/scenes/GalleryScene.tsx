"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const PHOTOS = [
  { src: "/photos/memory.1.jpg", caption: "the night the stars aligned once again :>" },
  { src: "/photos/memory.2.jpg", caption: "we we're able to do dinner dates na through our own money!" },
  { src: "/photos/memory.3.jpg", caption: "mwehehwhe mga selfie na ang di marunong ang kumuha HEHE XD" },
  { src: "/photos/memory.4.jpg", caption: "our 2nd motmot" },
  { src: "/photos/memory.5.jpg", caption: "proof we keep every memory" },
  { src: "/photos/memory.6.jpg", caption: "us, always" },
];

export default function GalleryScene() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const check = () => setIsCompact(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    setActive((p) => (p + dir + PHOTOS.length) % PHOTOS.length);
  };

  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-4 py-8 sm:py-12">
      {/* Section eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-2"
      >
        <span className="font-body text-[9px] uppercase tracking-[0.4em] text-[var(--color-gold-soft)]">
          a small garden of us
        </span>
        <div className="h-px w-14 shimmer-line" />
      </motion.div>

      {/* Ambient glow behind the carousel */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[40vh] w-[80vw] rounded-full opacity-25 blur-[80px]"
        style={{ background: "radial-gradient(circle, #d456b9, transparent 70%)" }}
      />

      {/* Carousel */}
      <div className="relative mt-6 flex w-full max-w-lg items-center justify-center sm:mt-8" style={{ height: isCompact ? "44vh" : "52vh" }}>
        <AnimatePresence initial={false} custom={direction}>
          {PHOTOS.map((photo, i) => {
            const offset = ((i - active + PHOTOS.length) % PHOTOS.length);
            const normOffset = offset > PHOTOS.length / 2 ? offset - PHOTOS.length : offset;

            if (Math.abs(normOffset) > 1) return null;

            const isActive = normOffset === 0;
            const xFactor = isCompact ? 90 : 155;

            return (
              <motion.div
                key={photo.src}
                className="absolute cursor-pointer"
                onClick={() => !isActive && go(normOffset as 1 | -1)}
                animate={{
                  x: normOffset * xFactor,
                  scale: isActive ? 1 : 0.67,
                  opacity: isActive ? 1 : 0.3,
                  zIndex: isActive ? 10 : 1,
                  rotate: normOffset * 7,
                  filter: isActive ? "saturate(1) brightness(1)" : "saturate(0.4) brightness(0.6)",
                }}
                initial={false}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Photo card with polaroid effect */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: isCompact ? "60vw" : "260px",
                    height: isCompact ? "38vh" : "400px",
                    maxWidth: "280px",
                    background: "#0d0612",
                    border: isActive ? "1px solid rgba(224,185,126,0.45)" : "1px solid rgba(224,185,126,0.18)",
                    borderRadius: "2px",
                    boxShadow: isActive
                      ? "0 0 0 5px rgba(255,255,255,0.04) inset, 0 24px 60px rgba(0,0,0,0.7), 0 0 40px rgba(199,148,250,0.18)"
                      : "0 0 0 5px rgba(255,255,255,0.04) inset, 0 24px 60px rgba(0,0,0,0.7)",
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    sizes="280px"
                    className="object-cover"
                    priority={i === 0}
                  />
                  {/* Cinematic overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isActive
                        ? "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, transparent 35%, transparent 55%, rgba(0,0,0,0.55) 100%)"
                        : "rgba(0,0,0,0.4)",
                    }}
                  />
                  {/* Active: gold frame accent + corner glints */}
                  {isActive && (
                    <>
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ boxShadow: "inset 0 0 0 1px rgba(224,185,126,0.35)" }}
                      />
                      {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos, ci) => (
                        <span
                          key={ci}
                          className={`absolute ${pos} h-1.5 w-1.5 rounded-full twinkle`}
                          style={{
                            background: "var(--color-gold-bright)",
                            boxShadow: "0 0 6px rgba(255,233,173,0.9)",
                            animationDelay: `${ci * 0.6}s`,
                          }}
                        />
                      ))}
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Caption */}
      <AnimatePresence mode="wait">
        <motion.p
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.5 }}
          className="font-display mt-5 text-xl italic text-[var(--color-lilac)] sm:text-2xl"
        >
          {PHOTOS[active].caption}
        </motion.p>
      </AnimatePresence>

      {/* Controls */}
      <div className="mt-5 flex items-center gap-5 sm:mt-6">
        <button
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="group flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-gold)]/25 text-[var(--color-gold-soft)] transition-all duration-300 hover:border-[var(--color-gold)]/60 hover:bg-[var(--color-gold)]/10 hover:scale-110"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M8 1L2 6L8 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex gap-2.5">
          {PHOTOS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > active ? 1 : -1);
                setActive(i);
              }}
              aria-label={`Go to photo ${i + 1}`}
              className="relative flex items-center justify-center"
            >
              <motion.span
                className="block rounded-full transition-all duration-500"
                animate={{
                  width: i === active ? "20px" : "5px",
                  height: "5px",
                  backgroundColor: i === active ? "var(--color-gold)" : "rgba(232,217,240,0.25)",
                  boxShadow: i === active ? "0 0 8px rgba(212,175,122,0.8)" : "none",
                }}
              />
            </button>
          ))}
        </div>

        <button
          onClick={() => go(1)}
          aria-label="Next photo"
          className="group flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-gold)]/25 text-[var(--color-gold-soft)] transition-all duration-300 hover:border-[var(--color-gold)]/60 hover:bg-[var(--color-gold)]/10 hover:scale-110"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4 1L10 6L4 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="mt-4 font-body text-[9px] uppercase tracking-[0.28em] text-[var(--color-lilac)]/35 sm:mt-5 text-center max-w-xs"
      >
        every photo, a memory. every memory, a step in our love story.
      </motion.p>
    </section>
  );
}
