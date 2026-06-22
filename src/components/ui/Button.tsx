import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  variant?: "primary" | "secondary";
  href?: string;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
};

export default function Button({
  variant = "primary",
  href,
  children,
  className,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors";

  const variantStyles = {
    primary: "bg-primary text-background hover:bg-primary/90",
    secondary:
      "border border-secondary/50 text-foreground hover:border-secondary hover:bg-secondary/10",
  };

  const styles = cn(baseStyles, variantStyles[variant], className);

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={styles}>
      {children}
    </button>
  );
}
