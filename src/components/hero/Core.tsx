"use client";

import { useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CORE_RADIUS = 0.72;
const BASE_COLOR = new THREE.Color("#ffae5c");

/* Fresnel halo — a back-lit shell that fakes a soft volumetric glow.
   Brightest at the silhouette, fading to nothing toward the centre. */
const glowVert = /* glsl */ `
  varying vec3 vN;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-mv.xyz);
    vN = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mv;
  }
`;
const glowFrag = /* glsl */ `
  uniform vec3  uColor;
  uniform float uIntensity;
  varying vec3  vN;
  varying vec3  vView;
  void main() {
    float fres = pow(1.0 - max(dot(vN, vView), 0.0), 2.6);
    gl_FragColor = vec4(uColor, fres * uIntensity);
  }
`;

export default function Core({
  progress,
  reduced = false,
}: {
  progress: RefObject<number>;
  reduced?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const coreMat = useRef<THREE.MeshBasicMaterial>(null);
  const glowMat = useRef<THREE.ShaderMaterial>(null);
  const hovered = useRef(false);

  const glowUniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color("#ff8a2e") },
      uIntensity: { value: 1.1 },
    }),
    [],
  );

  useFrame((state) => {
    const p = progress.current ?? 0;
    const t = state.clock.elapsedTime;
    const pulse = reduced ? 0 : Math.sin(t * 1.6) * 0.16;

    // brighter on hover and as the user scrolls deeper
    const target = (hovered.current ? 2.9 : 1.9) + pulse + p * 1.4;

    if (coreMat.current) {
      const cur = coreMat.current.color;
      // ease the emissive scalar; values >1 (toneMapped off) feed the bloom
      const next = cur.r / BASE_COLOR.r; // current scalar
      const eased = next + (target - next) * 0.1;
      cur.copy(BASE_COLOR).multiplyScalar(eased);
    }
    if (glowMat.current) {
      const gt = (hovered.current ? 1.7 : 1.05) + p * 0.5;
      const u = glowMat.current.uniforms.uIntensity;
      u.value += (gt - u.value) * 0.1;
    }
    if (groupRef.current) {
      const s = hovered.current ? 1.12 : 1;
      groupRef.current.scale.lerp(
        { x: s, y: s, z: s } as THREE.Vector3,
        0.1,
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.35, 0]}>
      {/* glowing mass — toneMapped off so bloom blows out a white-hot centre */}
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          hovered.current = true;
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          hovered.current = false;
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[CORE_RADIUS, 64, 64]} />
        <meshBasicMaterial ref={coreMat} color={BASE_COLOR} toneMapped={false} />
      </mesh>

      {/* soft fresnel halo */}
      <mesh scale={1.85}>
        <sphereGeometry args={[CORE_RADIUS, 48, 48]} />
        <shaderMaterial
          ref={glowMat}
          vertexShader={glowVert}
          fragmentShader={glowFrag}
          uniforms={glowUniforms}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
