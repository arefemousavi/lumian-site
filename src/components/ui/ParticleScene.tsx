"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background scene (pure canvas, no deps):
 *  - a warped "gravity well" wireframe floor
 *  - a drifting field of glowing particles
 *  - a few soft white orbs
 *  - a central warm "sun" with bloom
 *
 * Inspired by the unabyss.com hero. Respects prefers-reduced-motion.
 */

// ---- tweakable constants ----
const SPACING = 62; // grid cell size in CSS px
const DEPTH_ROWS = 26; // how far the floor recedes
const FOCAL = 540;
const CAM_HEIGHT = 210; // camera height above the floor
const WELL_DEPTH = 280; // how deep the gravity well sags
const WELL_SIGMA = 3.4; // well width (in grid cells)
const DOTS = 150;
const ORBS = 7;

type Dot = { x: number; y: number; z: number; r: number; vz: number; tw: number };
type Orb = { x: number; y: number; z: number; r: number; ph: number; sp: number };

export default function ParticleScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    // Non-null aliases so the type is preserved inside the nested closures.
    const cv: HTMLCanvasElement = canvas;
    const ctx: CanvasRenderingContext2D = context;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let W = 0;
    let H = 0;
    let dpr = 1;
    let cx = 0;
    let horizonY = 0;
    let zc = 0; // well centre depth
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    // pseudo-random but stable per index
    const rnd = (s: number) => {
      const v = Math.sin(s * 127.1 + 311.7) * 43758.5453;
      return v - Math.floor(v);
    };

    const dots: Dot[] = Array.from({ length: DOTS }, (_, i) => ({
      x: (rnd(i) - 0.5) * 1700,
      y: rnd(i + 99) * 520 + 20,
      z: rnd(i + 7) * DEPTH_ROWS * SPACING,
      r: rnd(i + 3) * 1.6 + 0.6,
      vz: rnd(i + 5) * 0.5 + 0.25,
      tw: rnd(i + 11) * Math.PI * 2,
    }));

    const orbs: Orb[] = Array.from({ length: ORBS }, (_, i) => ({
      x: (rnd(i + 50) - 0.5) * 1500,
      y: rnd(i + 20) * 380 + 60,
      z: rnd(i + 30) * DEPTH_ROWS * SPACING * 0.85 + 120,
      r: rnd(i + 40) * 26 + 12,
      ph: rnd(i + 60) * Math.PI * 2,
      sp: rnd(i + 70) * 0.4 + 0.2,
    }));

    function resize() {
      const rect = cv.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = W / 2;
      horizonY = H * 0.44;
      zc = DEPTH_ROWS * SPACING * 0.46;
      // reduced-motion users get a single static frame — redraw it on resize.
      if (reduce) frame(0);
    }

    // height (up positive) of the floor at grid coord (gx world x, z depth)
    function wellHeight(x: number, z: number) {
      const dx = x / SPACING;
      const dz = (z - zc) / SPACING;
      const d2 = (dx * dx + dz * dz) / (2 * WELL_SIGMA * WELL_SIGMA);
      return -WELL_DEPTH * Math.exp(-d2);
    }

    // project a world point to screen
    function project(x: number, height: number, z: number) {
      const p = FOCAL / (FOCAL + z);
      const px = mouse.x * 26;
      const py = mouse.y * 16;
      const sx = cx + px + x * p;
      const sy = horizonY + py + (CAM_HEIGHT - height) * p;
      return { sx, sy, p };
    }

    function drawGrid() {
      const halfCols = Math.ceil(W / SPACING / 2) + 5;
      const s2 = 2 * WELL_SIGMA * WELL_SIGMA;
      ctx.lineWidth = 1;

      // lines along depth (constant x) — brighter the closer they run to the well
      for (let i = -halfCols; i <= halfCols; i++) {
        const x = i * SPACING;
        const glow = Math.exp(-(i * i) / s2);
        ctx.beginPath();
        for (let j = 0; j <= DEPTH_ROWS; j++) {
          const z = j * SPACING;
          const h = wellHeight(x, z);
          const { sx, sy } = project(x, h, z);
          if (j === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = `rgba(255,255,255,${0.04 + glow * 0.32})`;
        ctx.stroke();
      }
      // lines across (constant z) — brighter near the well centre depth
      for (let j = 0; j <= DEPTH_ROWS; j++) {
        const z = j * SPACING;
        const dz = (z - zc) / SPACING;
        const glow = Math.exp(-(dz * dz) / s2);
        const fade = (0.08 * (1 - j / DEPTH_ROWS) + 0.02) + glow * 0.32;
        ctx.beginPath();
        for (let i = -halfCols; i <= halfCols; i++) {
          const x = i * SPACING;
          const h = wellHeight(x, z);
          const { sx, sy } = project(x, h, z);
          if (i === -halfCols) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.strokeStyle = `rgba(255,255,255,${fade})`;
        ctx.stroke();
      }
    }

    function drawSun(t: number) {
      const pulse = reduce ? 1 : 1 + Math.sin(t * 0.0012) * 0.05;
      const { sx, sy, p } = project(0, 40, zc);
      const R = 120 * p * pulse;

      ctx.globalCompositeOperation = "lighter";
      // outer bloom
      let g = ctx.createRadialGradient(sx, sy, 0, sx, sy, R * 3.4);
      g.addColorStop(0, "rgba(245,165,11,0.45)");
      g.addColorStop(0.25, "rgba(240,120,30,0.18)");
      g.addColorStop(1, "rgba(245,165,11,0)");
      ctx.fillStyle = g;
      ctx.fillRect(sx - R * 3.4, sy - R * 3.4, R * 6.8, R * 6.8);

      // core
      g = ctx.createRadialGradient(sx, sy, 0, sx, sy, R);
      g.addColorStop(0, "rgba(255,240,210,1)");
      g.addColorStop(0.45, "rgba(248,178,60,0.95)");
      g.addColorStop(1, "rgba(235,110,20,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(sx, sy, R, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
    }

    function drawDots(t: number) {
      ctx.globalCompositeOperation = "lighter";
      for (const d of dots) {
        if (!reduce) {
          d.z -= d.vz;
          if (d.z < 2) d.z = DEPTH_ROWS * SPACING;
        }
        const { sx, sy, p } = project(d.x, d.y, d.z);
        if (sx < -40 || sx > W + 40 || sy < -40 || sy > H + 40) continue;
        const tw = reduce ? 0.8 : 0.55 + Math.sin(t * 0.004 + d.tw) * 0.45;
        const r = d.r * p * 1.8;
        const a = Math.min(1, p * 1.3) * tw;
        const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, r * 3);
        g.addColorStop(0, `rgba(255,255,255,${a})`);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(sx, sy, r * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    }

    function drawOrbs(t: number) {
      ctx.globalCompositeOperation = "lighter";
      for (const o of orbs) {
        const fy = reduce ? 0 : Math.sin(t * 0.001 * o.sp + o.ph) * 22;
        const { sx, sy, p } = project(o.x, o.y + fy, o.z);
        const r = o.r * p;
        const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, r * 2.6);
        g.addColorStop(0, "rgba(255,255,255,0.9)");
        g.addColorStop(0.35, "rgba(235,235,235,0.35)");
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(sx, sy, r * 2.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    }

    let raf = 0;
    function frame(t: number) {
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      ctx.clearRect(0, 0, W, H);
      drawGrid();
      drawSun(t);
      drawDots(t);
      drawOrbs(t);
      if (!reduce) raf = requestAnimationFrame(frame);
    }

    function onMove(e: PointerEvent) {
      mouse.tx = e.clientX / window.innerWidth - 0.5;
      mouse.ty = e.clientY / window.innerHeight - 0.5;
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    if (reduce) frame(0);
    else raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
}
