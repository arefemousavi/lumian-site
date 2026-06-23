"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ORB_RADIUS = 0.72;
const NODE_COUNT = 6;

/**
 * The glowing warm centre orb plus a ring of tiny light nodes that
 * intensify on hover. Hover state is owned by the parent scene.
 */
export default function MainOrb({
  hovered,
  setHovered,
  reduced,
}: {
  hovered: boolean;
  setHovered: (v: boolean) => void;
  reduced: boolean;
}) {
  const orbRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  // tiny nodes arranged on a ring around the orb
  const nodes = useMemo(
    () =>
      Array.from({ length: NODE_COUNT }, (_, i) => {
        const a = (i / NODE_COUNT) * Math.PI * 2;
        const r = 1.25;
        return [Math.cos(a) * r, Math.sin(a) * r * 0.45, Math.sin(a) * 0.4] as [
          number,
          number,
          number,
        ];
      }),
    [],
  );

  const matRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(() => {
    const orb = orbRef.current;
    if (orb) {
      const s = hovered ? 1.12 : 1;
      tmp.set(s, s, s);
      orb.scale.lerp(tmp, 0.12);
      if (!reduced) orb.rotation.y += 0.0025;
    }
    if (matRef.current) {
      // brighter on hover; high values (toneMapped off) drive the bloom
      const target = hovered ? 3.4 : 2.6;
      matRef.current.emissiveIntensity +=
        (target - matRef.current.emissiveIntensity) * 0.1;
    }
    if (lightRef.current) {
      const target = hovered ? 48 : 30;
      lightRef.current.intensity +=
        (target - lightRef.current.intensity) * 0.1;
    }
  });

  return (
    <group position={[0, 0.4, 0]}>
      <pointLight
        ref={lightRef}
        color="#ff9a3c"
        intensity={30}
        distance={16}
        decay={1.5}
      />

      {/* glowing sun — toneMapped off so bloom turns the centre white-hot */}
      <mesh
        ref={orbRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[ORB_RADIUS, 64, 64]} />
        <meshStandardMaterial
          ref={matRef}
          color="#ffcc7a"
          emissive="#ff8a1e"
          emissiveIntensity={2.6}
          toneMapped={false}
          roughness={0.35}
          metalness={0}
        />
      </mesh>

      {/* tiny light nodes (also bloom) */}
      {nodes.map((p, i) => (
        <mesh key={i} ref={i === 0 ? glowRef : undefined} position={p}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial
            color="#ffe8c4"
            toneMapped={false}
            transparent
            opacity={hovered ? 1.6 : 0.5}
          />
        </mesh>
      ))}
    </group>
  );
}
