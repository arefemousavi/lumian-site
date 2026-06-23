"use client";

import { useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const RANGE_Z = 46; // depth of the star volume

/**
 * Instanced light-streaks. They idle as faint dots, then stretch and rush past
 * the camera as scroll progress rises, selling the "flight into depth".
 * One InstancedMesh, matrices updated per-frame from the progress ref.
 */
export default function Stars({
  progress,
  count = 220,
  reduced = false,
}: {
  progress: RefObject<number>;
  count?: number;
  reduced?: boolean;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // stable per-instance seeds
  const data = useMemo(() => {
    const rng = (n: number) => {
      const v = Math.sin(n * 12.9898) * 43758.5453;
      return v - Math.floor(v);
    };
    return Array.from({ length: count }, (_, i) => ({
      x: (rng(i + 1) - 0.5) * 26,
      y: (rng(i + 2) - 0.5) * 16 + 1,
      z: -rng(i + 3) * RANGE_Z + 4,
      speed: 0.5 + rng(i + 4) * 0.9,
    }));
  }, [count]);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const p = progress.current ?? 0;
    const flow = reduced ? 0 : (0.3 + p * 9) * delta * 12;
    const streak = 1 + p * p * 34; // stretch grows sharply with progress

    for (let i = 0; i < data.length; i++) {
      const s = data[i];
      s.z += flow * s.speed;
      if (s.z > 6) s.z -= RANGE_Z; // wrap back into the distance

      dummy.position.set(s.x, s.y, s.z);
      dummy.scale.set(1, 1, streak);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;

    const mat = mesh.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.15 + p * 0.85; // mostly hidden until you scroll
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      {/* thin box, stretched along Z into a streak */}
      <boxGeometry args={[0.025, 0.025, 0.5]} />
      <meshBasicMaterial color="#eef2ff" toneMapped={false} transparent opacity={0.15} />
    </instancedMesh>
  );
}
