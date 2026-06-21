/**
 * Generates a procedural wind whoosh using Web Audio API.
 * No audio file required — pure synthesis.
 */

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx || audioCtx.state === "closed") {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

export function playWindWhoosh(intensity: number = 1) {
  try {
    const ctx = getCtx();

    const duration = 1.6;
    const now = ctx.currentTime;

    // ── noise source ──────────────────────────────────────────────
    const bufferSize = ctx.sampleRate * duration;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    // ── bandpass filter — tuned to give "whoosh" character ────────
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.setValueAtTime(600, now);
    bandpass.frequency.linearRampToValueAtTime(220, now + duration);
    bandpass.Q.value = 1.8;

    // ── a second filter for silky high-end ───────────────────────
    const hiShelf = ctx.createBiquadFilter();
    hiShelf.type = "highshelf";
    hiShelf.frequency.value = 3000;
    hiShelf.gain.value = -8;

    // ── gain envelope: soft attack → peak → fade ─────────────────
    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.28 * intensity, now + 0.12);
    gainNode.gain.linearRampToValueAtTime(0.22 * intensity, now + 0.55);
    gainNode.gain.linearRampToValueAtTime(0, now + duration);

    // ── stereo panner — slight left-to-right sweep ───────────────
    const panner = ctx.createStereoPanner();
    panner.pan.setValueAtTime(-0.4, now);
    panner.pan.linearRampToValueAtTime(0.4, now + duration);

    // ── connect graph ─────────────────────────────────────────────
    noise.connect(bandpass);
    bandpass.connect(hiShelf);
    hiShelf.connect(gainNode);
    gainNode.connect(panner);
    panner.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + duration);
  } catch {
    // silently ignore — audio is a nice-to-have
  }
}
