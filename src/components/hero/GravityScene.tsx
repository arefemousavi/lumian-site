"use client";

import { useLayoutEffect, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";

import GravityGrid from "./GravityGrid";

// Fixed downward tilt → well lower-center, horizon ~upper third, top clear.
// Applied every frame so it can't be clobbered by R3F's prop application order.
function StaticCamera() {
  const { camera, invalidate } = useThree();
  // Apply the fixed tilt once after mount (works even on-demand)…
  useLayoutEffect(() => {
    camera.lookAt(0, -1.4, -6);
    invalidate();
  }, [camera, invalidate]);
  // …and keep it locked each frame while the loop runs.
  useFrame(() => camera.lookAt(0, -1.4, -6));
  return null;
}

/**
 * Phase 1 — the gravity grid only.
 * Static camera framed so the well sits lower-center and the horizon lands in
 * the upper third, leaving the top ~30% clear for the headline. No core, no
 * stars, no bloom, no scroll, no mouse yet.
 */
export default function GravityScene({
  reduced = false,
  isMobile = false,
}: {
  // `progress`/`active` are unused in Phase 1 but kept on the prop type so Hero
  // can stay wired the same way when scroll + offscreen-pause return later.
  progress?: RefObject<number>;
  active?: boolean;
  reduced?: boolean;
  isMobile?: boolean;
}) {
  return (
    <Canvas
      className="gravity-canvas"
      gl={{
        antialias: true,
        alpha: false,
        preserveDrawingBuffer: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, isMobile ? 1.5 : 2]}
      // animated ripples need a live loop; offscreen-pause returns in a later phase
      frameloop="always"
    >
      <PerspectiveCamera makeDefault fov={42} position={[0, 2.3, 8.2]} near={0.1} far={140} />
      <StaticCamera />

      {/* solid near-black background (fog itself lives in the grid shader) */}
      <color attach="background" args={["#0A0908"]} />

      <GravityGrid segments={isMobile ? 90 : 200} reduced={reduced} />
    </Canvas>
  );
}
