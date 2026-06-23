export const BRAND_NAME = "Lumian";

export const BRAND_COLORS = {
  deepBlack: "#050505",
  surface: "#0C0E13",
  text: "#F5F7FA",
  muted: "#9CA3AF",
  primary: "#00E5FF",
  secondary: "#7C3DFF",
} as const;

/**
 * Ordered frames for the scroll-driven 3D hero sequence.
 * The order matters: the device opens as the user scrolls.
 */
export const HERO_FRAMES = [
  "/images/close.png",
  "/images/slightly-close.png",
  "/images/mid.png",
  "/images/slightly-open.png",
  "/images/open.png",
] as const;
