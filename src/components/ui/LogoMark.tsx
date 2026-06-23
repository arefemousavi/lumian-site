import Image from "next/image";
import { cn } from "@/lib/utils";

/** The Lumian logo mark (transparent PNG). Used anywhere a logo is needed. */
export default function LogoMark({
  className,
  size = 30,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Image
      src="/images/logo.png"
      alt="Lumian"
      width={size}
      height={size}
      priority
      className={cn("object-contain", className)}
    />
  );
}
