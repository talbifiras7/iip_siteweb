import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { PageWrapper, Reveal, Stagger, StaggerItem } from "../components/Motion";
import Pill from "../components/Pill";
import { CUT_CORNER, PHOTO_BACKDROP } from "../components/Cutcorner";
import {
  EventCard,
  MediaFrame,
  WorkshopCard,
} from "../components/ActivityCards";
import {
  ACTIVITIES,
  HERO_IMAGES,
  isPast,
  longDate,
  sortActivities,
} from "../data/activities";

type Filter = "all" | "workshop" | "event";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "workshop", label: "Workshops" },
  { id: "event", label: "Events" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Activities() {
  const [filter, setFilter] = useState<Filter>("all");

  const workshops = useMemo(
    () => sortActivities(ACTIVITIES.filter((a) => a.kind === "workshop")),
    [],
  );
  const events = useMemo(
    () => sortActivities(ACTIVITIES.filter((a) => a.kind === "event")),
    [],
  );
  const nextUp = useMemo(
    () => sortActivities(ACTIVITIES).find((a) => !isPast(a.date)),
    [],
  );

  const counts: Record<Filter, number> = {
    all: ACTIVITIES.length,
    workshop: workshops.length,
    event: events.length,
  };

  const showWorkshops = filter !== "event";
  const showEvents = filter !== "workshop";

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="overflow-hidden bg-[#155A56] px-6 py-16 text-[#F2EFEA] md:px-16 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-[1.15fr_1fr]">
          <div>
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-block rounded-full border border-[#A8D5BA]/50 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#A8D5BA]"
            >
              Activities
            </motion.span>

            <h1 className="mt-6 text-6xl font-extrabold uppercase leading-[0.9] md:text-7xl lg:text-8xl">
              {["Learn it.", "Build it.", "Show it."].map((line, i) => (
                <motion.span
                  key={line}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.15, ease: EASE }}
                  className={`block ${i === 2 ? "text-[#E8A33D]" : ""}`}
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 max-w-md text-lg leading-relaxed text-[#F2EFEA]/80"
            >
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <a
                href="#workshops"
                className="rounded-full bg-[#E8A33D] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-[#0D3E3B] shadow-[0_4px_0_0_#c17f22] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_#c17f22]"
              >
                Browse workshops
              </a>
              <a
                href="#events"
                className="rounded-full border-2 border-[#A8D5BA] px-7 py-3 text-sm font-bold uppercase tracking-wide text-[#A8D5BA] transition-colors hover:bg-[#A8D5BA] hover:text-[#0D3E3B]"
              >
                See events
              </a>
            </motion.div>

            <dl className="mt-12 flex gap-10 border-t border-[#F2EFEA]/20 pt-7">
              {[
                ["Workshops", workshops.length],
                ["Events", events.length],
              ].map(([label, n]) => (
                <div key={label}>
                  <dd className="font-display text-4xl font-extrabold">{n}</dd>
                  <dt className="text-xs font-bold uppercase tracking-widest text-[#A8D5BA]">
                    {label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          {/* Collage */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="relative mx-auto h-[420px] w-full max-w-md md:h-[500px]"
          >
            <div
              className={`absolute right-0 top-0 h-[75%] w-[78%] overflow-hidden rounded-2xl bg-[#0D3E3B] ${PHOTO_BACKDROP}`}
              style={{ clipPath: CUT_CORNER }}
            >
              <MediaFrame image={HERO_IMAGES.main} alt="Chapter activities" label="Hero image" />
            </div>
            <div
              className={`absolute bottom-0 left-0 h-[40%] w-[48%] overflow-hidden rounded-2xl border-[6px] border-[#155A56] ${PHOTO_BACKDROP}`}
              style={{ clipPath: CUT_CORNER }}
            >
              <MediaFrame image={HERO_IMAGES.secondary} alt="Workshop in progress" label="Image" />
            </div>
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-2 top-[58%] md:-left-8"
            >
              <Pill>Hands-on workshops</Pill>
            </motion.div>
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
              className="absolute -right-2 bottom-5 md:-right-6"
            >
              <Pill>Real competitions</Pill>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Next up 
      {nextUp && (
        <section className="bg-[#E8A33D] px-6 py-4 text-[#0D3E3B] md:px-16">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
            <p className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#0D3E3B] px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#E8A33D]">
                Next up
              </span>
              <strong className="font-display text-lg font-extrabold">
                {nextUp.title} — {longDate(nextUp.date)}
                {nextUp.time ? `, ${nextUp.time}` : ""} · {nextUp.location}
              </strong>
            </p>
            <Link
              to={nextUp.href ?? "/contact"}
              className="border-b-2 border-[#0D3E3B] text-xs font-bold uppercase tracking-wider"
            >
              Reserve a seat →
            </Link>
          </div>
        </section>
      )}
      */}
    
      {/* Filters */}
      <section className="bg-[#F2EFEA] px-6 pb-2 pt-10 md:px-16">
        <div
          role="group"
          aria-label="Filter activities"
          className="mx-auto flex max-w-7xl gap-2.5 overflow-x-auto pb-2"
        >
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                aria-pressed={active}
                className={`relative shrink-0 rounded-full border-[1.5px] px-5 py-2.5 text-xs font-bold uppercase tracking-wide transition-colors ${
                  active
                    ? "border-[#155A56] text-[#F2EFEA]"
                    : "border-[#155A56]/30 text-[#155A56] hover:border-[#155A56]"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="filter-bg"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-[#155A56]"
                  />
                )}
                <span className="relative">
                  {f.label} · {counts[f.id]}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Workshops */}
      {showWorkshops && (
        <section id="workshops" className="scroll-mt-28 bg-[#F2EFEA] px-6 pb-20 pt-12 md:px-16">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c17f22]">
                  Workshops
                </span>
                <h2 className="mt-2 text-4xl font-extrabold uppercase leading-[0.95] text-[#155A56] md:text-6xl">
                  Learn by building
                </h2>
              </div>
              <p className="max-w-sm leading-relaxed text-[#155A56]/80">
                [One line explaining workshops: small groups, a mentor, a
                working result at the end.]
              </p>
            </Reveal>

            {workshops.length ? (
              <Stagger
                key={`w-${filter}`}
                className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
              >
                {workshops.map((a) => (
                  <StaggerItem key={a.id}>
                    <WorkshopCard a={a} />
                  </StaggerItem>
                ))}
              </Stagger>
            ) : (
              <EmptyState text="No workshops scheduled yet." />
            )}
          </div>
        </section>
      )}

      {/* Events */}
      {showEvents && (
        <section id="events" className="scroll-mt-28 bg-[#155A56] px-6 py-20 md:px-16">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mb-12">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8A33D]">
                Events
              </span>
              <h2 className="mt-2 text-4xl font-extrabold uppercase leading-[0.95] text-[#F2EFEA] md:text-6xl">
                Show up. Compete.
              </h2>
            </Reveal>

            {events.length ? (
              <Stagger
                key={`e-${filter}`}
                className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
              >
                {events.map((a) => (
                  <StaggerItem key={a.id}>
                    <EventCard a={a} />
                  </StaggerItem>
                ))}
              </Stagger>
            ) : (
              <EmptyState text="No events scheduled yet." dark />
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#0D3E3B] px-6 py-20 text-center text-[#F2EFEA] md:px-16">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-4xl font-extrabold uppercase leading-[0.95] md:text-6xl">
            Have an idea for a <span className="text-[#E8A33D]">workshop?</span>
          </h2>
          <Link
            to="/contact"
            className="inline-block rounded-full bg-[#E8A33D] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-[#0D3E3B] shadow-[0_4px_0_0_#c17f22] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_#c17f22]"
          >
            Propose a session
          </Link>
        </Reveal>
      </section>
    </PageWrapper>
  );
}

function EmptyState({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <div
      className={`rounded-2xl border-2 border-dashed px-6 py-14 text-center ${
        dark ? "border-[#F2EFEA]/30 text-[#F2EFEA]" : "border-[#155A56]/30 text-[#155A56]"
      }`}
    >
      <p className="font-display text-2xl font-extrabold">{text}</p>
      <Link
        to="/contact"
        className="mt-3 inline-block border-b-2 border-[#E8A33D] pb-0.5 text-xs font-bold uppercase tracking-wider"
      >
        Get notified →
      </Link>
    </div>
  );
}
