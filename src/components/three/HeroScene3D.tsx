"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";

import WavyGrid from "./WavyGrid";
import FloatingSpheres from "./FloatingSpheres";
import MainOrb from "./MainOrb";
import OrbLabels from "./OrbLabels";

/**
 * Drives the camera from scroll progress + pointer parallax.
 *  - top of page  -> frontal-ish view
 *  - scrolled down -> steeper angle, slightly closer
 * Everything is smoothly interpolated (lerp), never jumps.
 */
function CameraRig({
  progress,
  reduced,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const { camera, pointer } = useThree();

  useFrame(() => {
    // Guard against NaN / out-of-range scroll values before they reach the
    // camera (an un-measured scroll target can briefly report NaN).
    const raw = progress.get();
    const p = reduced || !Number.isFinite(raw) ? 0 : THREE.MathUtils.clamp(raw, 0, 1);
    const ptrX = reduced || !Number.isFinite(pointer.x) ? 0 : pointer.x;
    const ptrY = reduced || !Number.isFinite(pointer.y) ? 0 : pointer.y;

    const targetY = THREE.MathUtils.lerp(1.6, 3.5, p);
    const targetZ = THREE.MathUtils.lerp(7.2, 5.8, p);
    const targetX = ptrX * 0.7;

    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.position.z += (targetZ - camera.position.z) * 0.05;

    const lookY = THREE.MathUtils.lerp(0.35, -0.3, p) + ptrY * 0.18;
    camera.lookAt(0, lookY, 0);
  });

  return null;
}

function Scene({
  progress,
  reduced,
  isMobile,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
  isMobile: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <PerspectiveCamera makeDefault fov={45} position={[0, 1.6, 7.2]} />
      <CameraRig progress={progress} reduced={reduced} />

      {/* fog blends the grid + distant spheres into the dark background */}
      <fogExp2 attach="fog" args={["#0a0a0d", 0.05]} />

      <ambientLight intensity={0.55} />
      {/* key + fill so the gray spheres read as shaded 3D balls */}
      <directionalLight position={[4, 5, 6]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[-5, 2, 2]} intensity={0.5} color="#9bb0ff" />

      <WavyGrid reduced={reduced} />
      <FloatingSpheres reduced={reduced} isMobile={isMobile} />

      {/* orb + labels sit a little lower so the headline stays clear */}
      <group position={[0, -0.55, 0]}>
        <MainOrb hovered={hovered} setHovered={setHovered} reduced={reduced} />
        <OrbLabels visible={hovered} />
      </group>

      {/* premium soft glow — only bright emissives bloom */}
      <EffectComposer>
        <Bloom
          intensity={1.15}
          luminanceThreshold={0.55}
          luminanceSmoothing={0.2}
          mipmapBlur
          radius={0.7}
        />
      </EffectComposer>
    </>
  );
}

export default function HeroScene3D({
  progress,
  reduced = false,
}: {
  progress: MotionValue<number>;
  reduced?: boolean;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <Canvas
      className="hero-canvas"
      // transparent so the fixed particle background shows through
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, isMobile ? 1.5 : 2]}
      // we manage the camera via <PerspectiveCamera makeDefault>
    >
      <Scene progress={progress} reduced={reduced} isMobile={isMobile} />
    </Canvas>
  );
}
