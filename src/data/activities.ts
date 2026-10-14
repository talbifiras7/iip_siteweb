/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE to change everything on the Activities page.
 *  - Add / remove items in ACTIVITIES.
 *  - `kind` decides which section the item appears in.
 *  - `image`: import a picture and pass it in (see the example
 *    in the comment below). Leave it out to show a placeholder.
 *  - Dates are ISO strings (YYYY-MM-DD). Past/upcoming is
 *    computed automatically from today's date.
 * ─────────────────────────────────────────────────────────────
 *
 *  Example of adding a real picture:
 *    import workshop1 from "../assets/activities/workshop-1.jpg";
 *    { ..., image: workshop1 }
 */

export type ActivityKind = "workshop" | "event";

export type Activity = {
  id: string;
  kind: ActivityKind;
  title: string;
  /** Short label shown on the pill / tag (e.g. "Embedded"). */
  category: string;
  /** YYYY-MM-DD */
  date: string;
  /** e.g. "10:00 – 17:00" (events) */
  time?: string;
  location: string;
  description: string;
  /** Small facts shown under a workshop, e.g. ["3 sessions", "20 seats"]. */
  meta?: string[];
  image?: string;
  /** Internal route ("/contact") the call-to-action links to. */
  href?: string;
};

/** Hero collage images. Leave undefined for placeholders. */
export const HERO_IMAGES: { main?: string; secondary?: string } = {};

export const ACTIVITIES: Activity[] = [
  {
    id: "w1",
    kind: "workshop",
    title: "Introduction to machine learning ",
    category: "AI 101",
    date: "2025-10-14",
    location: "online",
    description:
      "[Two-line description of what participants will learn and build.]",
    meta: ["1 sessions"],
  },
    {
    id: "w2",
    kind: "workshop",
    title: "Introduction to electronics ",
    category: "AI 101",
    date: "2025-10-24",
    location: "FST",
    description:
      "[Two-line description of what participants will learn and build.]",
    meta: ["1 sessions"],
  },
  {
    id: "w3",
    kind: "workshop",
    title: "AI LEARNING PROGRAM IN INDUSTRY ",
    category: "INDUSTRY/AI",
    date: "2026-2-13",
    location: "FST",
    description:
      "[Two-line description of what participants will learn and build.]",
    meta: ["6 sessions"],
  },
  {
    id: "e1",
    kind: "event",
    title: "FST TALK: VOLT4FORWARD",
    category: "electronicss",
    date: "2026-04-04",
    location: "",
    description:
      "[Two-line description of what participants will learn and build.]",
    meta: ["2 days"],
  },
  {
    id: "e2",
    kind: "event",
    title: "ALF NEJMA W NEJMA",
    category: "Talk",
    date: "2026-03-13",
    location: "FST",
    description: "[One-line description of the event.]",
  },
  {
    id: "e3",
    kind: "event",
    title: "PES DAY",
    category: "Past event",
    date: "2026-09-12",
    location: "ENIT",
    description: "[Recap line.]",
  },
];

/* ───────────── helpers (no need to edit) ───────────── */

const at = (d: string) => new Date(`${d}T00:00:00`);

export const isPast = (d: string) => new Date(`${d}T23:59:59`) < new Date();

export const dayOf = (d: string) =>
  at(d).toLocaleDateString("en-GB", { day: "2-digit" });

export const monthOf = (d: string) =>
  at(d).toLocaleDateString("en-GB", { month: "short" }).toUpperCase();

export const longDate = (d: string) =>
  at(d).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

/** Upcoming first (soonest → latest), then past (most recent first). */
export function sortActivities(list: Activity[]) {
  const up = list
    .filter((a) => !isPast(a.date))
    .sort((a, b) => a.date.localeCompare(b.date));
  const past = list
    .filter((a) => isPast(a.date))
    .sort((a, b) => b.date.localeCompare(a.date));
  return [...up, ...past];
}
