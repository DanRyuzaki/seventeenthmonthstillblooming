"use client";

import { useEffect, useRef } from "react";

type BurstPetal = {
  id: number;
  x: number;       // start x (vw)
  y: number;       // start y (vh)
  vx: number;      // x velocity
  vy: number;      // y velocity
  size: number;
  rotation: number;
  rotSpeed: number;
  color: string;
  opacity: number;
  life: number;    // 0..1
  shape: "petal" | "rose" | "spark";
};

const COLORS = [
  "#f0a0cc", // rose
  "#b87ef0", // violet glow
  "#d4af7a", // gold
  "#e8d9f0", // lilac
  "#c04caa", // magenta
  "#f5d98c", // gold bright
];

function drawPetal(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rot: number,
  color: string,
  alpha: number,
  shape: BurstPetal["shape"]
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.globalAlpha = alpha;

  if (shape === "spark") {
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = size * 1.5;
    ctx.fill();
  } else if (shape === "rose") {
    ctx.beginPath();
    // 5-petal rose via polar: r = cos(5θ/2)... simplified to path
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2;
      const px = Math.cos(angle) * size;
      const py = Math.sin(angle) * size;
      ctx.ellipse(px * 0.5, py * 0.5, size * 0.4, size * 0.25, angle, 0, Math.PI * 2);
    }
    ctx.fillStyle = color;
    ctx.fill();
  } else {
    // teardrop petal
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.bezierCurveTo(size * 0.6, -size * 0.5, size * 0.6, size * 0.5, 0, size * 0.8);
    ctx.bezierCurveTo(-size * 0.6, size * 0.5, -size * 0.6, -size * 0.5, 0, -size);
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = size * 0.8;
    ctx.fill();
  }

  ctx.restore();
}

function createBurst(count: number): BurstPetal[] {
  const shapes: BurstPetal["shape"][] = ["petal", "petal", "petal", "rose", "spark"];
  return Array.from({ length: count }, (_, i) => {
    // Most originate from random areas across the screen (wind-like dispersal)
    const spreadMode = Math.random();
    let x: number, y: number, vx: number, vy: number;

    if (spreadMode < 0.3) {
      // From top, falling down with wind
      x = Math.random() * 100;
      y = -5 + Math.random() * 20;
      vx = (Math.random() - 0.3) * 2.5;
      vy = 1.5 + Math.random() * 2.5;
    } else if (spreadMode < 0.6) {
      // From center burst
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 3;
      x = 40 + Math.random() * 20;
      y = 30 + Math.random() * 40;
      vx = Math.cos(angle) * speed;
      vy = Math.sin(angle) * speed;
    } else {
      // Drifting in from sides
      x = Math.random() > 0.5 ? -5 : 105;
      y = Math.random() * 100;
      vx = x < 0 ? 1.5 + Math.random() * 2 : -(1.5 + Math.random() * 2);
      vy = -0.5 + Math.random() * 2;
    }

    return {
      id: i,
      x,
      y,
      vx,
      vy,
      size: 4 + Math.random() * 14,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.18,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: 0.6 + Math.random() * 0.4,
      life: 0,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    };
  });
}

export default function PetalBurst({ trigger }: { trigger: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<BurstPetal[]>([]);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    if (trigger === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    petalsRef.current = createBurst(55);
    startRef.current = performance.now();

    const DURATION = 2200; // ms

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const t = Math.min(elapsed / DURATION, 1);

      ctx.clearRect(0, 0, W, H);

      for (const p of petalsRef.current) {
        // Physics: accelerate, drift
        p.x += p.vx * 0.7;
        p.y += p.vy * 0.7 + 0.08; // slight gravity
        p.vx *= 0.993; // air resistance
        p.vy *= 0.993;
        p.rotation += p.rotSpeed;
        p.life = t;

        // fade in first 10%, hold, fade out last 40%
        let alpha = p.opacity;
        if (t < 0.1) alpha = p.opacity * (t / 0.1);
        else if (t > 0.6) alpha = p.opacity * (1 - (t - 0.6) / 0.4);

        const px = (p.x / 100) * W;
        const py = (p.y / 100) * H;

        drawPetal(ctx, px, py, p.size, p.rotation, p.color, Math.max(0, alpha), p.shape);
      }

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, W, H);
      }
    };

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[80]"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
