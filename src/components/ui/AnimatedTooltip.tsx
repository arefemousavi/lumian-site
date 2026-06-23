"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export type TooltipItem = { name: string; role: string; initials: string };

/**
 * Animated tooltip avatar row (reimplemented from the Aceternity
 * "animated-tooltip"). Hovering an avatar springs a name/role tooltip in,
 * tilting toward the cursor. Avatars use initials (swap for photos later).
 */
export default function AnimatedTooltip({ items }: { items: TooltipItem[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  const springConfig = { stiffness: 100, damping: 12 };
  const x = useMotionValue(0);
  const rotate = useSpring(useTransform(x, [-60, 60], [-18, 18]), springConfig);
  const translateX = useSpring(
    useTransform(x, [-60, 60], [-22, 22]),
    springConfig,
  );

  return (
    <div className="flex items-center justify-center">
      {items.map((item, i) => (
        <div
          key={item.name}
          className="group relative -mr-3"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          onMouseMove={(e) => {
            const half = e.currentTarget.offsetWidth / 2;
            x.set(e.nativeEvent.offsetX - half);
          }}
        >
          <AnimatePresence mode="popLayout">
            {hovered === i && (
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 260, damping: 14 },
                }}
                exit={{ opacity: 0, y: 16, scale: 0.6 }}
                style={{ translateX, rotate, whiteSpace: "nowrap" }}
                className="absolute -top-16 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center rounded-xl border border-white/10 bg-[#161310]/90 px-4 py-2 text-center shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-md"
              >
                <div className="absolute inset-x-1/4 -bottom-px h-px bg-gradient-to-r from-transparent via-[#FFA63D] to-transparent" />
                <div className="text-sm font-semibold text-foreground">
                  {item.name}
                </div>
                <div className="text-xs text-muted">{item.role}</div>
              </motion.div>
            )}
          </AnimatePresence>

          <span
            className="grid h-14 w-14 place-items-center rounded-full border-2 border-[#0a0908] bg-gradient-to-br from-white/25 to-white/[0.06] font-[var(--font-display)] text-sm font-bold text-foreground transition-transform duration-300 group-hover:z-30 group-hover:scale-105"
          >
            {item.initials}
          </span>
        </div>
      ))}
    </div>
  );
}
