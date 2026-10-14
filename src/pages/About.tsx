import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import {
  PageWrapper,
  Reveal,
} from "../components/Motion";

import type { IconName } from "../components/Icon";

const VALUES: { title: string; copy: string; icon: IconName }[] = [
  {
    title: "Learn by building",
    copy: "Theory matters, but nothing sticks like shipping something real.",
    icon: "wrench",
  },
  {
    title: "Open door",
    copy: "Any student, any level, any department. Curiosity is the only prerequisite.",
    icon: "users",
  },
  {
    title: "Give it forward",
    copy: "Everyone here was taught by someone. We pass that on.",
    icon: "book",
  },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);

  return (
    <PageWrapper>
      {/* Intro */}
      <section className="bg-[#155A56] px-6 py-16 md:px-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-block rounded-full border border-[#F2EFEA]/30 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#F2EFEA]"
          >
            About Us
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-5xl font-bold uppercase leading-[0.95] text-[#F2EFEA] md:text-7xl"
          >
            People First,
            <br />
            Systems Second
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-[#F2EFEA]/80 md:text-lg"
          >
            We are an IEEE IAS IES PES joint student chapter at FST, focused on
            powering ideas, building systems, and connecting minds through
            technology, innovation, and collaboration.
          </motion.p>
        </div>
      </section>

      {/* Teal block with zigzag transition */}
      <section ref={ref} className="relative bg-[#F2EFEA]">
        <motion.div
          style={{ y }}
          className="absolute -top-20 left-0 z-10 h-20 w-full overflow-hidden"
        >
          <svg
            className="h-full w-full"
            viewBox="0 0 1200 100"
            preserveAspectRatio="none"
          >
            <path
              d="
                M0 50
                C50 10, 100 10, 150 50
                C200 90, 250 90, 300 50
                C350 10, 400 10, 450 50
                C500 90, 550 90, 600 50
                C650 10, 700 10, 750 50
                C800 90, 850 90, 900 50
                C950 10, 1000 10, 1050 50
                C1100 90, 1150 90, 1200 50
                L1200 100 L0 100 Z
              "
              fill="#F2EFEA"
            />
          </svg>
        </motion.div>

        {/* Story */}
        <div id="story" className="scroll-mt-28 px-6 py-20 md:px-16">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-widest text-[#E8A33D]">
                Our Story
              </span>
              <h2 className="mt-2 text-3xl font-bold text-[#155A56] md:text-5xl">
                Started with a handful of students and one stubborn idea
              </h2>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-base leading-relaxed text-[#155A56]/80">
                A small group wanted to do more than pass exams — they wanted to
                build, break, and understand real systems. That turned into
                workshops, then competitions, then a chapter. Five years on, the
                same instinct still drives everything: find what's worth
                learning, then learn it together.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Values - Vertical Timeline */}
        <section className="bg-[#F2EFEA] px-6 pb-20 md:px-16">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-widest text-[#E8A33D]">
                Our Values
              </span>

              <h2 className="mt-2 text-3xl font-bold text-[#155A56] md:text-5xl">
                How We Grow Together
              </h2>
            </Reveal>

            <div className="relative mt-12">
              {/* Vertical timeline line */}
              <div className="absolute bottom-8 left-5 top-8 w-0.5 bg-[#E8A33D]" />

              <div className="space-y-10">
                {VALUES.map((v, i) => (
                  <Reveal key={v.title} delay={i * 0.15}>
                    <div className="relative flex gap-6">
                      {/* Timeline number */}
                      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-[#F2EFEA] bg-[#155A56] text-sm font-bold text-[#F2EFEA]">
                        {String(i + 1).padStart(2, "0")}
                      </div>

                      {/* Timeline content - no boxes */}
                      <div className="flex-1 pb-2">
                        <h3 className="text-xl font-bold text-[#155A56] md:text-2xl">
                          {v.title}
                        </h3>

                        <p className="mt-3 max-w-xl leading-relaxed text-[#155A56]/80">
                          {v.copy}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>
    </PageWrapper>
  );
}
