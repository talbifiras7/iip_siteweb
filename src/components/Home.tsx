import { motion } from "motion/react";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero.jpeg";
import { PageWrapper, Stagger, StaggerItem } from "./Motion";
import InfoCard from "./InfoCard";
import Pill from "./Pill";
import type { IconName } from "./Icon";
import { CUT_CORNER, PHOTO_BACKDROP } from "./Cutcorner";

const PILLARS: { title: string; copy: string; icon: IconName }[] = [
  {
    title: "Industry Applications",
    copy: "Bridging what we learn in lecture halls with how it's actually applied in industry.",
    icon: "factory",
  },
  {
    title: "Power & Energy",
    copy: "Workshops and projects around energy systems, grids, and sustainable power.",
    icon: "bolt",
  },
  {
    title: "Industrial Electronics",
    copy: "Hands-on work with embedded systems, automation, and control.",
    icon: "cpu",
  },
];

const HEADLINES = ["We Power Ideas", "We Build Systems", "We Connect Minds"];

export default function Home() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#F2EFEA] px-6 py-16 md:px-16 md:py-24">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-14 md:flex-row md:justify-between">
          {/* Text */}
          <div className="flex-1 space-y-6">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-block rounded-full border border-[#155A56]/30 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#155A56]"
            >
              IEEE IAS IES PES FST SB
            </motion.span>

            <h1 className="text-5xl font-bold uppercase leading-[0.92] text-[#155A56] md:text-7xl lg:text-8xl">
              {HEADLINES.map((line, i) => (
                <motion.span
                  key={line}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + i * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`block ${i === 1 ? "text-[#0D3E3B]" : ""}`}
                >
                  {i === 2 ? (
                    <span className="relative inline-block">
                      {line}
                      <motion.svg
                        className="absolute -bottom-2 left-0 w-full text-[#E8A33D]"
                        viewBox="0 0 300 12"
                        preserveAspectRatio="none"
                        aria-hidden
                      >
                        <motion.path
                          d="M2 8 C 80 2, 220 2, 298 8"
                          stroke="currentColor"
                          strokeWidth="5"
                          fill="none"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.8, delay: 0.9 }}
                        />
                      </motion.svg>
                    </span>
                  ) : (
                    line
                  )}
                </motion.span>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Link
                to="/activities"
                className="rounded-full border-2 border-[#155A56] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-[#155A56] transition-colors hover:bg-[#155A56] hover:text-[#F2EFEA]"
              >
                See our work
              </Link>
              <Link
                to="/contact"
                className="rounded-full bg-[#155A56] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-[#F2EFEA] shadow-[0_4px_0_0_#0D3E3B] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_#0D3E3B]"
              >
                Join us
              </Link>
            </motion.div>
          </div>

          {/* Photo: cut corner + floating pills */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-6 h-[400px] w-[290px] shrink-0 md:mx-10 md:h-[470px] md:w-[350px]"
          >
            <div
              className={`absolute inset-0 overflow-hidden rounded-2xl ${PHOTO_BACKDROP}`}
              style={{ clipPath: CUT_CORNER }}
            >
              <img
                src={heroImage}
                alt="Our chapter at work"
                className="h-full w-full object-cover object-top"
              />
            </div>

            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-8 top-[58%] md:-left-14"
            >
              <Pill>Hands-on Workshops</Pill>
            </motion.div>

            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.4,
              }}
              className="absolute -right-6 top-[78%] md:-right-10"
            >
              <Pill>Real Competitions</Pill>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Marquee seam */}
      <div className="overflow-hidden bg-[#155A56] py-4">
        <motion.div
          className="flex w-max gap-8 whitespace-nowrap text-lg font-bold uppercase tracking-widest text-[#A8D5BA] md:text-xl"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, ease: "linear", repeat: Infinity }}
        >
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              <span>Ideas</span>
              <span className="text-[#E8A33D]">•</span>
              <span>Systems</span>
              <span className="text-[#E8A33D]">•</span>
              <span>Minds</span>
              <span className="text-[#E8A33D]">•</span>
              <span>Growth</span>
              <span className="text-[#E8A33D]">•</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Pillars */}
      <section className="bg-[#F2EFEA] px-6 py-20 md:px-16">
        <Stagger className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <StaggerItem key={p.title}>
              <InfoCard index={i} title={p.title} copy={p.copy} icon={p.icon} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </PageWrapper>
  );
}
