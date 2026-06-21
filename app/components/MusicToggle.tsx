"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getThemeAudio, primeAndPlayTheme } from "../utils/themeMusic";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = getThemeAudio();
    audioRef.current = audio;

    const syncPlaying = () => setPlaying(!audio.paused);
    const markReady = () => setReady(true);
    const markUnready = () => setReady(false);

    audio.addEventListener("play", syncPlaying);
    audio.addEventListener("pause", syncPlaying);
    audio.addEventListener("canplaythrough", markReady);
    audio.addEventListener("error", markUnready);

    syncPlaying();
    if (audio.readyState >= 3) markReady();

    return () => {
      audio.removeEventListener("play", syncPlaying);
      audio.removeEventListener("pause", syncPlaying);
      audio.removeEventListener("canplaythrough", markReady);
      audio.removeEventListener("error", markUnready);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
    } else {
      primeAndPlayTheme();
    }
  };

  if (!ready) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      className="fixed bottom-6 left-6 z-50 flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110"
      style={{
        background: "rgba(28, 10, 26, 0.75)",
        border: "1px solid rgba(212,175,122,0.25)",
        boxShadow: playing
          ? "0 0 20px rgba(192,76,170,0.35), inset 0 1px 0 rgba(255,255,255,0.08)"
          : "inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {}
      <div className="flex items-end gap-[3px]" style={{ height: "14px" }}>
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="rounded-full"
            style={{ width: "2px", backgroundColor: "var(--color-gold-soft)" }}
            animate={
              playing
                ? {
                    height: [
                      `${30 + i * 10}%`,
                      `${80 + ((i * 23) % 20)}%`,
                      `${40 + ((i * 17) % 30)}%`,
                      `${90 - i * 8}%`,
                      `${30 + i * 10}%`,
                    ],
                  }
                : { height: "30%" }
            }
            transition={
              playing
                ? {
                    duration: 1.4,
                    repeat: Infinity,
                    delay: i * 0.12,
                    ease: "easeInOut",
                  }
                : { duration: 0.3 }
            }
          />
        ))}
      </div>
    </motion.button>
  );
}

