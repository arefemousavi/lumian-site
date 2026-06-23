"use client";

import { Html, Line } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import * as THREE from "three";

const ORB_CENTER = new THREE.Vector3(0, 0.4, 0);

// Pills arranged around the orb. z varies to give real depth.
const LABELS: { text: string; pos: [number, number, number] }[] = [
  { text: "Segmented", pos: [-2.6, 1.5, 0.4] },
  { text: "Encrypted", pos: [2.7, 1.3, 0.2] },
  { text: "Permission layer", pos: [-3.0, -0.2, -0.6] },
  { text: "User owned", pos: [2.9, -0.4, -0.4] },
  { text: "Optimized", pos: [-1.6, 2.3, -0.2] },
  { text: "Ready via MCP", pos: [1.7, 2.4, -0.3] },
];

/**
 * Connector lines (3D) + HTML pill labels that fade/slide in when the
 * orb is hovered. Connectors live in WebGL; pills are DOM via drei <Html>.
 */
export default function OrbLabels({ visible }: { visible: boolean }) {
  return (
    <group>
      {LABELS.map((l, i) => {
        const end = new THREE.Vector3(...l.pos);
        return (
          <group key={l.text}>
            {/* connector line, orb -> label anchor */}
            <Line
              points={[ORB_CENTER, end]}
              color="#ffb060"
              lineWidth={1}
              transparent
              opacity={visible ? 0.5 : 0}
              dashed={false}
            />

            {/* the pill */}
            <Html position={l.pos} center distanceFactor={9} zIndexRange={[20, 0]}>
              <AnimatePresence>
                {visible && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    transition={{
                      duration: 0.32,
                      delay: i * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="orb-pill"
                  >
                    {l.text}
                  </motion.div>
                )}
              </AnimatePresence>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
