"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Plane footprint. Kept large so the grid recedes well past the fog horizon.
export const PLANE_SIZE = 60;
export const WELL_STRENGTH = 2.6;
export const WELL_RADIUS = 7.0;

// Phase-1 fixed "mass" centre, in plane-LOCAL XY. After the mesh's -PI/2 X
// rotation, local +Y maps to world -Z, so local (0, 3) is the floor patch ~3
// units into the screen — exactly where the Phase-2 core (world z = -3) lands.
const FIXED_CENTER = new THREE.Vector2(0, 3.0);

/* -------------------------------------------------------------------------
   VERTEX SHADER — the gravity-well dip
   Displaces each vertex along the plane normal (local +Z -> world up) using a
   smooth, bounded gaussian falloff toward uCenter, plus distance-attenuated
   ripples so the well breathes while the horizon stays calm. Emits the
   plane-local XY (matches uCenter's space), a normalised dip, and the true
   view-space distance (for geometrically-correct fog in the fragment stage).
   ------------------------------------------------------------------------- */
const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2  uCenter;       // well centre, plane-local XY
  uniform float uStrength;     // dip depth (world units)
  uniform float uRadius;       // well radius (falloff)
  uniform float uRippleFreq;
  uniform float uRippleSpeed;
  uniform float uRippleAmp;

  varying vec2  vLocalXY;      // plane-local XY (same space as uCenter)
  varying float vWell;         // 0..1 normalised dip, for fragment warmth
  varying float vViewDist;     // view-space distance, for exponential fog

  void main() {
    vec3 pos = position;
    vLocalXY = pos.xy;

    vec2  d    = pos.xy - uCenter;
    float dist = length(d);

    // Gaussian well — bounded, never spikes. Denominator is uRadius^2 (per spec).
    float well = -uStrength * exp(-(dist * dist) / (uRadius * uRadius));

    // Concentric ripples, attenuated with distance so the far plane stays flat.
    float falloff = exp(-dist * 0.08);
    float ripple  = sin(dist * uRippleFreq - uTime * uRippleSpeed) * uRippleAmp * falloff;

    pos.z += well + ripple; // local +Z -> world up; negative sinks toward the mass

    vWell = clamp(-well / uStrength, 0.0, 1.0);

    vec4 mv   = modelViewMatrix * vec4(pos, 1.0);
    vViewDist = length(mv.xyz);         // camera sits at the view-space origin
    gl_Position = projectionMatrix * mv;
  }
`;

/* -------------------------------------------------------------------------
   FRAGMENT SHADER — glowing anti-aliased grid that fades at the edges
   Thin lines via fract() with fwidth() anti-aliasing (resolution-independent,
   no moire). Lines warm from dim warm-white to amber near the mass. Two-stage
   dissolve so there is NEVER a rectangular border:
     • exponential fog mixes COLOUR toward the background with view distance
     • a radial edge-fade drives ALPHA to zero before the quad's edge
   ------------------------------------------------------------------------- */
const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uGridScale;   // cells across the footprint
  uniform float uLineWidth;   // base half-thickness (fract units)
  uniform vec3  uLineColor;   // dim warm white  (#F4F1EB)
  uniform vec3  uAmberColor;  // amber accent    (#FFA63D)
  uniform vec3  uFogColor;    // background      (#0A0908)
  uniform vec3  uNearColor;   // warm floor wash (#1A130C)
  uniform float uFogDensity;

  varying vec2  vLocalXY;
  varying float vWell;
  varying float vViewDist;

  void main() {
    // ---- anti-aliased grid lines (1 cell per world unit) ----
    vec2  uvg = vLocalXY * (uGridScale / 60.0);
    vec2  g   = abs(fract(uvg) - 0.5);
    float m   = min(g.x, g.y);
    float line = 1.0 - smoothstep(0.0, uLineWidth + fwidth(m), m);

    // ---- warm near the mass, cool/dim far away ----
    float warm    = vWell;
    vec3  lineCol = mix(uLineColor, uAmberColor, smoothstep(0.0, 0.85, warm));
    float bright  = 0.9 + warm * 2.2;                     // amber burns brighter

    // ---- distance dissolve (additive contribution -> 0 at horizon/edges) ----
    // exponential fog from true view-space distance, plus a radial edge fade
    // so the plane melts into the background with NO rectangular border.
    float fog      = clamp(1.0 - exp(-uFogDensity * uFogDensity * vViewDist * vViewDist), 0.0, 1.0);
    float r        = length(vLocalXY) / 30.0;             // 30 = PLANE_SIZE / 2
    float edgeFade = 1.0 - smoothstep(0.58, 0.95, r);
    float fade     = (1.0 - fog) * edgeFade;

    // additive (premultiplied) emissive output over the dark background
    vec3 col = lineCol * bright * line * fade;            // glowing lines
    col += uNearColor * warm * fade * 0.9;                // warm pool in the well
    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function GravityGrid({
  segments = 200,
  reduced = false,
}: {
  segments?: number;
  reduced?: boolean;
}) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCenter: { value: FIXED_CENTER.clone() },
      uStrength: { value: WELL_STRENGTH },
      uRadius: { value: WELL_RADIUS },
      uRippleFreq: { value: 0.5 },
      uRippleSpeed: { value: 0.9 },
      uRippleAmp: { value: reduced ? 0 : 0.18 },
      uGridScale: { value: 44 },
      uLineWidth: { value: 0.035 },
      uLineColor: { value: new THREE.Color("#F4F1EB") },
      uAmberColor: { value: new THREE.Color("#FFA63D") },
      uFogColor: { value: new THREE.Color("#0A0908") },
      uNearColor: { value: new THREE.Color("#1A130C") },
      uFogDensity: { value: 0.03 },
    }),
    [reduced],
  );

  useFrame((_, delta) => {
    const mat = matRef.current;
    if (!mat || reduced) return; // static wave for reduced-motion
    mat.uniforms.uTime.value += delta;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]} frustumCulled={false}>
      <planeGeometry args={[PLANE_SIZE, PLANE_SIZE, segments, segments]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
