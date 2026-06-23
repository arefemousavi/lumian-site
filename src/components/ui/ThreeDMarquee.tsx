import { cn } from "@/lib/utils";

export type MarqueeTile = {
  title: string;
  tag: string;
  /** Tailwind gradient stops, e.g. "from-primary/30 to-secondary/30" */
  accent: string;
};

/**
 * A perspective-tilted, auto-scrolling grid of project tiles — a lightweight
 * take on the Aceternity "3D Marquee". Pure CSS animation (no JS), columns
 * drift in alternating directions behind a 3D-rotated plane.
 */
export default function ThreeDMarquee({
  tiles,
  className,
}: {
  tiles: MarqueeTile[];
  className?: string;
}) {
  // Split tiles into 4 columns.
  const columns = [0, 1, 2, 3].map((c) =>
    tiles.filter((_, i) => i % 4 === c),
  );
  const durations = ["30s", "38s", "34s", "42s"];

  return (
    <div
      className={cn(
        "relative h-[520px] w-full overflow-hidden [perspective:1100px]",
        className,
      )}
    >
      {/* fade edges into the page */}
      <div className="pointer-events-none absolute inset-0 z-20 [background:radial-gradient(ellipse_at_center,transparent_55%,var(--background)_92%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-background to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-background to-transparent" />

      <div
        className="absolute left-1/2 top-1/2 grid w-[150%] grid-cols-4 gap-5 [transform:translate(-50%,-50%)_rotateX(48deg)_rotateZ(-12deg)_scale(1.05)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {columns.map((col, ci) => (
          <div
            key={ci}
            className={cn(
              "flex flex-col gap-5",
              ci % 2 === 0 ? "animate-marquee-up" : "animate-marquee-down",
            )}
            style={{ animationDuration: durations[ci] }}
          >
            {/* duplicate the column for a seamless loop */}
            {[...col, ...col].map((tile, i) => (
              <article
                key={`${tile.title}-${i}`}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-surface-2"
              >
                <div
                  className={cn(
                    "aspect-[16/10] w-full bg-gradient-to-br",
                    tile.accent,
                  )}
                >
                  {/* faux window chrome */}
                  <div className="flex items-center gap-1.5 p-3">
                    <span className="h-2 w-2 rounded-full bg-white/40" />
                    <span className="h-2 w-2 rounded-full bg-white/25" />
                    <span className="h-2 w-2 rounded-full bg-white/15" />
                  </div>
                  {/* faux data viz */}
                  <div className="flex h-1/2 items-end gap-1 px-4 pb-4">
                    {[40, 70, 55, 90, 65, 80, 50].map((h, b) => (
                      <span
                        key={b}
                        className="flex-1 rounded-sm bg-white/25"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="border-t border-white/5 bg-surface px-4 py-3">
                  <p className="text-sm font-semibold text-foreground">
                    {tile.title}
                  </p>
                  <p className="text-xs text-muted">{tile.tag}</p>
                </div>
              </article>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
