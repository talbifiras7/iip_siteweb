import { motion } from "motion/react";
import { PageWrapper, Eyebrow } from "../components/Motion";
import Pill from "../components/Pill";
import { CUT_CORNER, PHOTO_BACKDROP } from "../components/Cutcorner";
import { chaima, yassmine, adem, faiza, youssef } from "../assets/images";

type Member = {
  name: string;
  role: string;
  /** Leave empty and the card falls back to initials. */
  image?: string;
};

const TEAM: Member[] = [
  { name: "Gasri Mohamed Adem", role: "Chair", image: adem },
  { name: "Ben Abdallah Youssef", role: "Vice Chair", image: youssef },
  { name: "Chaieb Chaima", role: "Treasurer", image: chaima },
  { name: "Karmous Faiza", role: "General Secretary", image: faiza },
  { name: "Mejri Yasmine", role: "Media Manager", image: yassmine },
];

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const WORDS = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
];

export default function Team() {
  const count = WORDS[TEAM.length] ?? String(TEAM.length);

  return (
    <PageWrapper>
      {/* Header */}
      <section className="bg-[#F2EFEA] px-6 py-16 md:px-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <Eyebrow>Our Team</Eyebrow>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-5xl font-bold uppercase leading-[0.95] text-[#155A56] md:text-7xl"
          >
            The People
            <br />
            Behind The Work
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-[#155A56]/80 md:text-lg"
          >
            {count} people, one purpose.
          </motion.p>
        </div>
      </section>

      {/* Grid: flex-wrap so the last row centers */}
      <section className="bg-[#F2EFEA] px-6 pb-24 pt-4 md:px-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-8 gap-y-16"
        >
          {TEAM.map((person) => (
            <motion.article
              key={person.name}
              variants={{
                hidden: { opacity: 0, y: 50 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              whileHover={{ y: -6 }}
              className="group w-full max-w-xs sm:w-[calc(50%-1rem)] sm:max-w-none lg:w-[calc(33.333%-1.34rem)]"
            >
              {/* Photo with cut corner */}
              <div className="relative aspect-[3/4]">
                <div
                  className={`absolute inset-0 overflow-hidden rounded-2xl ${PHOTO_BACKDROP}`}
                  style={{ clipPath: CUT_CORNER }}
                >
                  {person.image ? (
                    <img
                      src={person.image}
                      alt={`${person.name}, ${person.role}`}
                      className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-6xl font-bold text-white/30">
                      {initials(person.name)}
                    </div>
                  )}
                </div>

                {/* Role pill floats over the bottom-left edge */}
                <Pill className="absolute -bottom-4 -left-2 group-hover:bg-[#E8A33D]">
                  {person.role}
                </Pill>
              </div>

              <h3 className="mt-9 text-lg font-bold text-[#155A56]">
                {person.name}
              </h3>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </PageWrapper>
  );
}
