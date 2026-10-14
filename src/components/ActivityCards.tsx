import { motion } from "motion/react";
import { Link } from "react-router-dom";
import Pill from "./Pill";
import { CUT_CORNER, PHOTO_BACKDROP } from "./Cutcorner";
import {
  type Activity,
  dayOf,
  isPast,
  longDate,
  monthOf,
} from "../data/activities";

/** Shows the real image, or a labelled placeholder until one is provided. */
export function MediaFrame({
  image,
  alt,
  label = "Add image",
  imgClassName = "",
}: {
  image?: string;
  alt: string;
  label?: string;
  imgClassName?: string;
}) {
  if (image) {
    return (
      <img
        src={image}
        alt={alt}
        className={`h-full w-full object-cover object-top ${imgClassName}`}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={`${label} placeholder`}
      className="flex h-full w-full items-center justify-center text-xs font-bold uppercase tracking-[0.14em] text-[#A8D5BA]/80"
    >
      {label}
    </div>
  );
}

const SPRING = { type: "spring", stiffness: 300, damping: 22 } as const;

/** Photo-led, borderless card (same language as the Team page). */
export function WorkshopCard({ a }: { a: Activity }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={SPRING}
      className="group flex flex-col"
    >
      <div className="relative aspect-[4/5]">
        <div
          className={`absolute inset-0 overflow-hidden rounded-2xl ${PHOTO_BACKDROP}`}
          style={{ clipPath: CUT_CORNER }}
        >
          <MediaFrame
            image={a.image}
            alt={a.title}
            label="Workshop image"
            imgClassName="transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
        <Pill className="absolute -bottom-4 -left-2 group-hover:bg-[#E8A33D]">
          {a.category}
        </Pill>
      </div>

      <div className="mt-9">
        <p className="text-xs font-bold uppercase tracking-widest text-[#c17f22]">
          {longDate(a.date)}
        </p>
        <h3 className="mt-1.5 text-2xl font-extrabold leading-tight text-[#155A56] md:text-[1.75rem]">
          {a.title}
        </h3>
        <p className="mt-2.5 text-[15px] leading-relaxed text-[#155A56]/80">
          {a.description}
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] font-medium text-[#155A56]/70">
          {[...(a.meta ?? []), a.location].map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
        <Link
          to={a.href ?? "/contact"}
          className="mt-4 inline-block border-b-2 border-[#E8A33D] pb-0.5 text-xs font-bold uppercase tracking-wider text-[#155A56] transition-colors hover:text-[#0D3E3B]"
        >
          View details →
        </Link>
      </div>
    </motion.article>
  );
}

/** Poster card: text sits on the photo. Dims itself when the date has passed. */
export function EventCard({ a }: { a: Activity }) {
  const past = isPast(a.date);

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={SPRING}
      className={`group relative h-[470px] ${past ? "opacity-75" : ""}`}
    >
      <div
        className={`absolute inset-0 overflow-hidden rounded-2xl ${PHOTO_BACKDROP}`}
        style={{ clipPath: CUT_CORNER }}
      >
        <MediaFrame
          image={a.image}
          alt={a.title}
          label="Event image"
          imgClassName="transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D3E3B] via-[#0D3E3B]/40 to-transparent" />
      </div>

      {/* Date block */}
      <div className="absolute left-5 top-5 rounded-xl bg-[#F2EFEA] px-4 py-2.5 text-center text-[#0D3E3B]">
        <span className="font-display block text-3xl font-extrabold leading-none">
          {dayOf(a.date)}
        </span>
        <span className="mt-1 block text-[11px] font-bold tracking-[0.14em]">
          {monthOf(a.date)}
        </span>
      </div>

      <div className="absolute inset-x-6 bottom-6 text-[#F2EFEA]">
        <span className="inline-block rounded-full bg-[#A8D5BA] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#0D3E3B]">
          {a.category}
        </span>
        <h3 className="mb-2 mt-3 text-2xl font-extrabold leading-tight md:text-[1.75rem]">
          {a.title}
        </h3>
        <p className="mb-4 text-sm text-[#F2EFEA]/80">
          {[a.time, a.location].filter(Boolean).join(" · ")}
        </p>
        {past ? (
          <Link
            to={a.href ?? "/contact"}
            className="border-b-2 border-[#A8D5BA] pb-0.5 text-xs font-bold uppercase tracking-wider text-[#A8D5BA]"
          >
            See recap →
          </Link>
        ) : (
          <Link
            to={a.href ?? "/contact"}
            className="inline-block rounded-full bg-[#E8A33D] px-5 py-3 text-xs font-bold uppercase tracking-wide text-[#0D3E3B] shadow-[0_4px_0_0_#c17f22] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_#c17f22]"
          >
            Join the event
          </Link>
        )}
      </div>
    </motion.article>
  );
}
