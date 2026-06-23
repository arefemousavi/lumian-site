"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { useLang } from "@/i18n/LanguageProvider";

export type Product = {
  title: string;
  link?: string;
  thumbnail?: string; // optional — placeholder shown until provided
};

/**
 * Scroll-driven parallax showcase (inspired by the Aceternity "hero parallax"
 * pattern, reimplemented for Lumian). Three rows of project cards drift in
 * opposite directions as the page scrolls, behind a studio header.
 */
export default function HeroParallax({ products }: { products?: Product[] }) {
  const list = products?.length ? products : defaultProducts;
  const row1 = list.slice(0, 5);
  const row2 = list.slice(5, 10);
  const row3 = list.slice(10, 15);

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const spring = { stiffness: 300, damping: 30, bounce: 100 };
  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    spring,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    spring,
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    spring,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    spring,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    spring,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 200]),
    spring,
  );

  return (
    <div
      ref={ref}
      className="relative flex h-[300vh] flex-col self-auto overflow-hidden py-40 antialiased [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
      >
        <motion.div className="mb-20 flex flex-row-reverse space-x-20 space-x-reverse">
          {row1.map((p, i) => (
            <Card key={i} product={p} translate={translateX} index={i} />
          ))}
        </motion.div>
        <motion.div className="mb-20 flex flex-row space-x-20">
          {row2.map((p, i) => (
            <Card key={i} product={p} translate={translateXReverse} index={i + 5} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-20 space-x-reverse">
          {row3.map((p, i) => (
            <Card key={i} product={p} translate={translateX} index={i + 10} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

function Header() {
  const { t } = useLang();
  return (
    <div className="relative left-0 top-0 mx-auto w-full max-w-7xl px-6 py-20 md:py-32">
      <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#FFA63D]">
        {t.worksPage.eyebrow}
      </p>
      <h1 className="mt-4 font-[var(--font-display)] text-4xl font-bold tracking-tight text-foreground md:text-7xl">
        {t.worksPage.title1} <br /> {t.worksPage.title2}
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
        {t.worksPage.lead}
      </p>
    </div>
  );
}

function Card({
  product,
  translate,
  index,
}: {
  product: Product;
  translate: MotionValue<number>;
  index: number;
}) {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -16 }}
      className="group/product relative h-72 w-[24rem] shrink-0"
    >
      <div
        className={cn(
          "block h-full w-full overflow-hidden rounded-xl border border-white/10",
          "bg-gradient-to-br from-[#16130f] to-[#100d0a]",
        )}
      >
        {product.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-cover object-left-top"
          />
        ) : (
          <Placeholder index={index} />
        )}
      </div>
      
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-black/60 opacity-0 transition-opacity duration-300 group-hover/product:opacity-100" />
      <h2 className="absolute bottom-4 left-4 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover/product:opacity-100">
        {product.title}
      </h2>
    </motion.div>
  );
}

function Placeholder({ index }: { index: number }) {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center gap-1.5 p-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FFA63D]/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
      </div>
      <div className="flex flex-1 items-end gap-1.5 px-6 pb-6">
        {[40, 65, 50, 80, 60, 90, 55, 70].map((h, b) => (
          <span
            key={b}
            className="flex-1 rounded-sm bg-[#FFA63D]/15"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="border-t border-white/5 px-5 py-3">
        <p className="text-xs font-medium text-foreground/70">
          Project {String(index + 1).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}

// Placeholder products — replace `thumbnail` with real screenshots later.
const defaultProducts: Product[] = [
  { title: "Nexus Platform" },
  { title: "Pulse Analytics" },
  { title: "Vertex Commerce" },
  { title: "Atlas Dashboard" },
  { title: "Orbit CRM" },
  { title: "Lumen AI" },
  { title: "Forge API" },
  { title: "Halo Design System" },
  { title: "Quanta Realtime" },
  { title: "Strato Infra" },
  { title: "Mosaic Web" },
  { title: "Beacon Analytics" },
  { title: "Cardinal Cloud" },
  { title: "Relay Engine" },
  { title: "Summit Data" },
];
