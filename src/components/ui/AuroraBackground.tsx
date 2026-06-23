import { cn } from "@/lib/utils";

/**
 * Decorative depth background: animated color blobs, a soft top grid, and a
 * perspective "floor" grid that gives the hero a 3D sense of depth.
 * Purely visual, sits behind content (pointer-events: none).
 */
export default function AuroraBackground({
  className,
  floor = true,
}: {
  className?: string;
  floor?: boolean;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      {/* soft masked grid */}
      <div className="absolute inset-0 bg-grid" />

      {/* animated color blobs */}
      <div className="animate-aurora absolute left-1/2 top-0 h-[60vh] w-[80vw] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
      <div className="animate-float absolute right-[6%] top-[14%] h-[46vh] w-[42vw] rounded-full bg-secondary/25 blur-[130px]" />
      <div className="absolute -left-[5%] top-[40%] h-[34vh] w-[34vw] rounded-full bg-primary/10 blur-[120px]" />

      {/* 3D perspective floor */}
      {floor && (
        <div
          className="absolute inset-x-0 bottom-0 h-[55vh] [perspective:600px]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to top, #000 5%, transparent 85%)",
            maskImage: "linear-gradient(to top, #000 5%, transparent 85%)",
          }}
        >
          <div
            className="absolute inset-0 origin-bottom [transform:rotateX(72deg)]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,229,255,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(124,61,255,0.18) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
        </div>
      )}

      {/* vignette to settle everything into the page */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
    </div>
  );
}
