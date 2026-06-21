"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LETTER_BODY = [
  "Happy 17th monthsary! Sa loob ng labing-pitong buwan, I am indeed grateful to be with you through all the ups and downs, and even for the last 3 years of lovey-dovey story.",
  "May mga pagkukulang, may mga malalang away, may mga hindi pagkakaintindihan, pero sa kabila ng lahat ng iyon, you have been my constant source of love, support, and happiness. I am truly blessed to have you in my life.",
  "Sa tagal natin na magkasama, hindi sumasagi sa isip ko ang gumawa ng ganito bilang regalo. Kung gagawa man siguro ako, magiging katulad iyon ng tulips-garden, something na alam ko ay may purpose.",
  "Pero sa pagkakataong ito, I want to give you something na hindi mo inaasahan, a letter that comes from the heart. And the way I will deliver it is ay sa paraan na alam ko.",
  "Mahal, salamat sa lahat ng pagkakataon o panahon na ikaw ang nariyan para sa akin sa oras na walang-wala na ako. Minsan, napapaisip ko na kung hindi ka ginamit ng Lord, mahihirapan ako umusad sa holistically haha.",
  "I just know you are not doing the bare minimum, for your love doesn't have maximums either, you are the manifestation of God's infinite love.",
  "Walang ibang dalangin kundi ay patuloy mo ako makita sa gitna ng hardin ng tulipan.",
  "Mahal na mahal kita, Bal.",
];

export default function LetterScene() {
  const [opened, setOpened] = useState(false);

  const scrollRef = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const atTop = el.scrollTop <= 0;
      const atBottom =
        Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop) < 2;

      const scrollingUp = e.deltaY < 0;
      const scrollingDown = e.deltaY > 0;

      if (!(scrollingUp && atTop) && !(scrollingDown && atBottom)) {
        e.stopPropagation();
      }
    };

    el.addEventListener("wheel", onWheel, { passive: true });
  }, []);

  return (
    <section className="relative flex h-full w-full items-center justify-center px-6 overflow-hidden">
      {}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(116,64,184,0.45), transparent 70%)" }}
      />

      {}
      {!opened &&
        [
          { l: 12, t: 18, d: 0 },
          { l: 88, t: 22, d: 0.7 },
          { l: 8, t: 75, d: 1.3 },
          { l: 92, t: 70, d: 0.4 },
          { l: 50, t: 10, d: 1.8 },
        ].map((s, i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute rounded-full"
            style={{
              left: `${s.l}%`,
              top: `${s.t}%`,
              width: "3px",
              height: "3px",
              background: "var(--color-gold-bright)",
              boxShadow: "0 0 8px rgba(255,233,173,0.9)",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1.4, 0] }}
            transition={{ duration: 2.8, delay: s.d, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }}
          />
        ))}

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.button
            key="sealed"
            onClick={() => setOpened(true)}
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: -20, transition: { duration: 0.45 } }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col items-center"
            aria-label="Open the letter"
          >
            {}
            <div
              className="relative w-[82vw] max-w-[340px] rounded-sm border shadow-[0_40px_100px_rgba(0,0,0,0.65)]"
              style={{
                background: "linear-gradient(145deg, #341d4a 0%, #221130 50%, #170a22 100%)",
                borderColor: "rgba(224,185,126,0.32)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.65), 0 0 50px rgba(199,148,250,0.08)",
                height: "64vh",
                maxHeight: "480px",
              }}
            >
              {}
              <div
                className="absolute inset-3 border pointer-events-none"
                style={{ borderColor: "rgba(224,185,126,0.14)" }}
              />
              {}
              {["top-4 left-4", "top-4 right-4 rotate-90", "bottom-4 right-4 rotate-180", "bottom-4 left-4 -rotate-90"].map((pos, i) => (
                <svg key={i} className={`absolute ${pos} pointer-events-none`} width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1 H7 M1 1 V7" stroke="var(--color-gold)" strokeWidth="0.8" strokeOpacity="0.6" strokeLinecap="round" />
                </svg>
              ))}

              <div className="flex h-full w-full flex-col items-center justify-center gap-5 px-8 text-center">
                <span className="font-body text-[9px] uppercase tracking-[0.4em] text-[var(--color-lilac)]/40">
                  a letter for
                </span>
                <span
                  className="text-foil font-display text-4xl italic"
                >
                  Judielle
                </span>

                {}
                <motion.div
                  whileHover={{ scale: 1.12, rotate: 5 }}
                  animate={{ boxShadow: ["0 6px 20px rgba(0,0,0,0.4)", "0 6px 32px rgba(212,86,185,0.55)", "0 6px 20px rgba(0,0,0,0.4)"] }}
                  transition={{ type: "spring", stiffness: 180, damping: 12, boxShadow: { duration: 2.5, repeat: Infinity } }}
                  className="relative mt-2 flex h-[76px] w-[76px] items-center justify-center rounded-full cursor-pointer"
                  style={{
                    background: "radial-gradient(circle at 38% 28%, #ec85d4, #93208a 55%, #5a1050 100%)",
                    boxShadow: "inset 0 2px 10px rgba(255,255,255,0.35), 0 8px 26px rgba(0,0,0,0.5)",
                  }}
                >
                  {}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{ boxShadow: "inset 0 0 0 1.5px rgba(224,185,126,0.4)" }}
                  />
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="12" stroke="rgba(255,233,173,0.55)" strokeWidth="0.8" />
                    {}
                    <path
                      d="M20 10 C15 12, 13 18, 16 24 C18 27, 22 27, 24 24 C27 18, 25 12, 20 10 Z"
                      stroke="rgba(255,243,224,0.85)"
                      strokeWidth="1.1"
                      fill="none"
                    />
                    <path d="M20 24 C20 27, 19.5 30, 20 32" stroke="rgba(255,243,224,0.7)" strokeWidth="0.9" strokeLinecap="round" />
                  </svg>
                </motion.div>

                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="font-body text-[9px] uppercase tracking-[0.3em] text-[var(--color-gold-soft)]/70"
                >
                  tap to open
                </motion.span>
              </div>
            </div>
          </motion.button>
        ) : (
          <motion.div
            key="open"
            ref={scrollRef}
            initial={{ opacity: 0, y: 40, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[92vw] max-w-lg overflow-y-auto rounded-sm shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
            style={{
              maxHeight: "84vh",
              scrollbarWidth: "none",
              background: "#fdf8f0",
              borderTop: "2px solid rgba(224,185,126,0.4)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(199,148,250,0.1)",
            }}
          >
            {}
            <div className="paper-texture absolute inset-0 pointer-events-none opacity-100" />

            {}
            <div
              className="pointer-events-none absolute top-0 bottom-0 left-[60px] w-px"
              style={{ background: "rgba(192,76,170,0.12)" }}
            />

            <div className="relative z-10 px-8 py-10 sm:px-12 sm:py-12">
              <p className="text-center font-body text-[9px] uppercase tracking-[0.4em] text-[#7b3fa0]">
                Para sa aking Bestfriend & Lover
              </p>

              <div
                className="mx-auto mt-6 h-px w-16"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(107,63,160,0.4), transparent)",
                }}
              />

              <p className="mt-8 font-display text-2xl italic text-[#3a2740] sm:text-3xl">
                Mahal,
              </p>

              <div className="mt-5 space-y-5">
                {LETTER_BODY.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.28, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display text-[1.05rem] leading-[1.75] text-[#4a3350] sm:text-xl"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7, duration: 0.9 }}
                className="mt-10 text-right font-display text-2xl italic text-[#7b3fa0]"
              >
                — Danielle ♡
              </motion.p>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 2.0, duration: 0.6 }}
                className="mt-8 mx-auto h-px w-12"
                style={{ background: "rgba(192,76,170,0.3)" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
