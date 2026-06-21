/**
 * Singleton theme-music element.
 *
 * Playback must start inside the original "open it, bal" click handler —
 * not inside a later setTimeout/state update — or iOS Safari (and some
 * other browsers) will treat the .play() call as not user-initiated and
 * silently block it. This module gives every part of the app a single
 * shared <audio> instance so the click can start it immediately, and
 * MusicToggle can simply attach to and reflect that same instance later.
 */

let themeAudio: HTMLAudioElement | null = null;

function getThemeAudio(): HTMLAudioElement {
  if (!themeAudio) {
    themeAudio = new Audio("/audio/theme.mp3");
    themeAudio.loop = true;
    themeAudio.volume = 0.35;
    themeAudio.preload = "auto";
  }
  return themeAudio;
}

/**
 * Call this synchronously from within a user-gesture event handler
 * (e.g. onClick) to start the theme song. Safe to call multiple times —
 * it's a no-op if already playing.
 */
export function primeAndPlayTheme() {
  try {
    const audio = getThemeAudio();
    if (audio.paused) {
      void audio.play().catch(() => {
        // Autoplay was blocked (e.g. browser policy) — MusicToggle's
        // manual play button remains available as a fallback.
      });
    }
  } catch {
    // Audio API unavailable — fail silently, music is a nice-to-have.
  }
}

export { getThemeAudio };
