"use client";

import { Float } from "@react-three/drei";

type SphereDef = {
  position: [number, number, number];
  radius: number;
  tint: string;
  /** glowing white balls that catch the bloom (like the unabyss orbs) */
  glow?: boolean;
  /** decorative spheres are hidden on small screens to lighten the scene */
  decorative?: boolean;
};

// Spread wide and low so they frame the orb/headline instead of covering it.
// A mix of softly-lit gray balls and a few bright glowing ones.
const SPHERES: SphereDef[] = [
  { position: [-5.6, 1.8, -4.5], radius: 0.52, tint: "#e8e8ef", glow: true },
  { position: [5.8, 2.1, -5.0], radius: 0.46, tint: "#f4f4f8", glow: true },
  { position: [-6.6, -1.4, -5.5], radius: 0.62, tint: "#dcdce4", decorative: true },
  { position: [6.6, -1.6, -6.0], radius: 0.7, tint: "#ffffff", glow: true, decorative: true },
  { position: [-4.4, -2.2, -3.5], radius: 0.34, tint: "#c6c6d0", decorative: true },
  { position: [4.6, 0.2, -3.2], radius: 0.28, tint: "#d2d2dc" },
  { position: [-3.2, 2.6, -6.5], radius: 0.3, tint: "#bfbfca", decorative: true },
  { position: [7.4, 1.0, -8.0], radius: 0.4, tint: "#ffffff", glow: true, decorative: true },
];

/** Soft gray/white spheres at varying depths, gently floating. */
export default function FloatingSpheres({
  reduced,
  isMobile,
}: {
  reduced: boolean;
  isMobile: boolean;
}) {
  const list = isMobile ? SPHERES.filter((s) => !s.decorative) : SPHERES;

  return (
    <group>
      {list.map((s, i) => (
        <Float
          key={i}
          enabled={!reduced}
          speed={1.1 + (i % 3) * 0.35}
          rotationIntensity={0.15}
          floatIntensity={0.7}
          floatingRange={[-0.18, 0.18]}
        >
          <mesh position={s.position}>
            <sphereGeometry args={[s.radius, 48, 48]} />
            <meshStandardMaterial
              color={s.tint}
              emissive={s.tint}
              // bright ones (glow) blow past 1.0 to feed the bloom pass;
              // the rest stay as softly-lit matte balls
              emissiveIntensity={s.glow ? 1.1 : 0.06}
              toneMapped={!s.glow}
              roughness={0.5}
              metalness={0.05}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}
