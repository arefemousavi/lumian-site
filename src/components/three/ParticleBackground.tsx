"use client";

import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

/**
 * A fixed, full-viewport particle field that lives behind the whole page,
 * so the glowing dots continue beneath the hero and lower sections.
 * Lightweight: a single Sparkles cloud, DPR capped, no lights.
 */
export default function ParticleBackground({
  reduced = false,
}: {
  reduced?: boolean;
}) {
  return (
    <div className="particle-bg" aria-hidden>
      <Canvas
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 60 }}
        frameloop={reduced ? "demand" : "always"}
      >
        <Sparkles
          count={140}
          scale={[16, 10, 6]}
          size={2.4}
          speed={reduced ? 0 : 0.3}
          opacity={0.5}
          color="#ffffff"
        />
        <Sparkles
          count={40}
          scale={[14, 8, 4]}
          size={4}
          speed={reduced ? 0 : 0.18}
          opacity={0.35}
          color="#cfd6ff"
        />
      </Canvas>
    </div>
  );
}
