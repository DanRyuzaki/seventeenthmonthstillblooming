"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

type SlideShowProps = {
  scenes: ReactNode[];
  initialIndex?: number;
};

const TRANSITION_LOCK_MS = 1200;

const SCENE_LABELS = ["I", "II", "III", "IV", "V"];

export default function SlideShow({ scenes, initialIndex = 0 }: SlideShowProps) {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState<1 | -1>(1);
  const locked = useRef(false);
  const touchStartY = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number) => {
      if (locked.current) return;
      if (next < 0 || next > scenes.length - 1) return;
      setDirection(next > index ? 1 : -1);
      setIndex(next);
      locked.current = true;
      window.setTimeout(() => {
        locked.current = false;
      }, TRANSITION_LOCK_MS);
    },
    [index, scenes.length]
  );

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 12) return;
      if (e.deltaY > 0) goTo(index + 1);
      else goTo(index - 1);
    };

    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        goTo(index + 1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        goTo(index - 1);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 50) {
        if (delta > 0) goTo(index + 1);
        else goTo(index - 1);
      }
      touchStartY.current = null;
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [index, goTo]);

  return (
    <div className="relative h-[100dvh] w-full">
      <AnimatePresence custom={direction} initial={false} mode="wait">
        <motion.div
          key={index}
          custom={direction}
          variants={{
            enter: (dir: 1 | -1) => ({
              y: dir === 1 ? "6%" : "-6%",
              opacity: 0,
              filter: "blur(4px)",
            }),
            center: { y: "0%", opacity: 1, filter: "blur(0px)" },
            exit: (dir: 1 | -1) => ({
              y: dir === 1 ? "-6%" : "6%",
              opacity: 0,
              filter: "blur(4px)",
              transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] },
            }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {scenes[index]}
        </motion.div>
      </AnimatePresence>

      {}
      <div className="pointer-events-none fixed right-5 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-3 sm:right-8">
        {scenes.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to section ${i + 1}`}
            onClick={() => goTo(i)}
            className="pointer-events-auto flex flex-col items-center gap-1 group"
          >
            <motion.span
              className="font-display text-[8px] italic transition-all duration-500"
              animate={{
                opacity: i === index ? 0.9 : 0.25,
                color: i === index ? "var(--color-gold)" : "var(--color-lilac)",
              }}
            >
              {SCENE_LABELS[i]}
            </motion.span>
            <motion.span
              className="block rounded-full transition-all duration-500"
              animate={{
                width: i === index ? "2px" : "2px",
                height: i === index ? "24px" : "6px",
                backgroundColor:
                  i === index ? "var(--color-gold)" : "rgba(232,217,240,0.25)",
                boxShadow:
                  i === index
                    ? "0 0 10px rgba(212,175,122,0.8), 0 0 20px rgba(212,175,122,0.4)"
                    : "none",
              }}
            />
          </button>
        ))}
      </div>

      {}
      <AnimatePresence>
        {index === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="pointer-events-none fixed bottom-8 left-1/2 z-50 -translate-x-1/2 flex flex-col items-center gap-1"
          >
            <span className="font-body text-[9px] uppercase tracking-[0.3em] text-[var(--color-lilac)]/40">
              scroll
            </span>
            <div className="flex flex-col items-center gap-0.5">
              {[0, 1].map((i) => (
                <motion.svg
                  key={i}
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  animate={{ opacity: [0.2, 0.8, 0.2], y: [0, 3, 0] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="var(--color-gold)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
