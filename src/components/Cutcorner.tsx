/**
 * Diagonal-cut top-right corner used on every photo (hero + team).
 * Apply with: style={{ clipPath: CUT_CORNER }}
 * Tune the first two numbers to change how deep the cut is.
 */
export const CUT_CORNER =
  "polygon(0 0, 72% 0, 100% 16%, 100% 100%, 0 100%)";

/** Teal glow panel that sits behind photos. */
export const PHOTO_BACKDROP =
  "bg-[radial-gradient(120%_70%_at_85%_10%,#2f8b83_0%,#155A56_45%,#0D3E3B_100%)]";
