"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Grid extent / resolution. Kept modest for performance.
const SIZE = 26;
const DIV = 30;
const AMP = 0.62; // wave amplitude

/** Height of the wavy floor at a given world (x, z) and time. */
function waveY(x: number, z: number, t: number) {
  const d = Math.sqrt(x * x + z * z);
  // calmer near the centre (under the orb), livelier toward the edges
  const falloff = THREE.MathUtils.clamp(d / (SIZE * 0.5), 0.15, 1);
  return (
    AMP *
    falloff *
    0.5 *
    (Math.sin(x * 0.33 + t * 0.6) + Math.cos(z * 0.33 + t * 0.45))
  );
}

/**
 * A dark, elegant perspective grid floor built from line segments and
 * displaced by a subtle sine wave each frame.
 */
export default function WavyGrid({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.LineSegments>(null);
  const drawn = useRef(false);

  // Build the square grid (square cells, no diagonals) once.
  const geometry = useMemo(() => {
    const step = SIZE / DIV;
    const half = SIZE / 2;
    const verts: number[] = [];
    for (let i = 0; i <= DIV; i++) {
      for (let j = 0; j <= DIV; j++) {
        const x = -half + i * step;
        const z = -half + j * step;
        if (i < DIV) verts.push(x, 0, z, x + step, 0, z);
        if (j < DIV) verts.push(x, 0, z, x, 0, z + step);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(verts), 3),
    );
    return g;
  }, []);

  useFrame((state) => {
    // In reduced-motion we still render a static wave, but only once.
    if (reduced && drawn.current) return;
    drawn.current = true;

    const t = reduced ? 0 : state.clock.elapsedTime;
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let k = 0; k < arr.length; k += 3) {
      arr[k + 1] = waveY(arr[k], arr[k + 2], t);
    }
    pos.needsUpdate = true;
  });

  return (
    <lineSegments
      ref={ref}
      geometry={geometry}
      position={[0, -1.0, 0]}
      frustumCulled={false}
    >
      <lineBasicMaterial color="#9a9aac" transparent opacity={0.32} />
    </lineSegments>
  );
}
