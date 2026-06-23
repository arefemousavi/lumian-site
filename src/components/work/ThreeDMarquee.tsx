"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * A perspective-tilted, auto-scrolling image grid (inspired by the Aceternity
 * "3D marquee" pattern, reimplemented for Lumian). Pass real project images via
 * `images`; until then it renders elegant dark placeholders.
 */
export default function ThreeDMarquee({
  images,
  className,
}: {
  images?: string[];
  className?: string;
}) {
  // 16 slots by default — swap in real screenshots later.
  const slots: (string | null)[] =
    images && images.length
      ? images
      : Array.from({ length: 16 }, () => null);

  const columns = [0, 1, 2, 3].map((c) =>
    slots.filter((_, i) => i % 4 === c),
  );
  const durations = [34, 42, 38, 46];

  return (
    <div
      className={cn(
        "relative mx-auto block h-[420px] w-full overflow-hidden sm:h-[600px]",
        className,
      )}
    >
      {/* edge fades into the page */}
      <div className="pointer-events-none absolute inset-0 z-20 [background:radial-gradient(ellipse_at_center,transparent_55%,#0a0908_92%)]" />

      <div className="flex size-full items-center justify-center [perspective:1100px]">
        <div
          className="grid w-[140%] shrink-0 grid-cols-4 gap-5 [transform:rotateX(46deg)_rotateZ(-11deg)_scale(1.06)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {columns.map((col, ci) => (
            <motion.div
              key={ci}
              animate={{ y: ci % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
              transition={{
                duration: durations[ci],
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex flex-col gap-5"
            >
              {/* duplicate for a seamless loop */}
              {[...col, ...col].map((src, i) => (
                <Tile key={i} src={src} index={(ci * 100 + i) % slots.length} />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Tile({ src, index }: { src: string | null; index: number }) {
  if (src) {
    return (
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#12100e]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`Project ${index + 1}`}
          className="aspect-[16/10] w-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }
  // Placeholder card — looks like a project thumbnail until real images land.
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#16130f] to-[#100d0a]">
      <div className="aspect-[16/10] w-full">
        <div className="flex items-center gap-1.5 p-3">
          <span className="h-2 w-2 rounded-full bg-[#FFA63D]/50" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/10" />
        </div>
        <div className="flex h-1/2 items-end gap-1 px-4 pb-3">
          {[50, 75, 60, 90, 70, 85].map((h, b) => (
            <span
              key={b}
              className="flex-1 rounded-sm bg-[#FFA63D]/15"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
      <div className="border-t border-white/5 px-4 py-2.5">
        <p className="text-xs font-medium text-foreground/80">
          Project {String(index + 1).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
