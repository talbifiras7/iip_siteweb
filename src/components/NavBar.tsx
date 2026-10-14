import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

/**
 * Shared design tokens — keep every page in sync.
 * cream        #F2EFEA   background
 * cream-soft   #FBF9F5   cards / panels
 * teal         #155A56   primary
 * teal-deep    #0D3E3B   hover / pressed
 * mint         #A8D5BA   accent / highlight
 * amber        #E8A33D   the one action color (Join / Reserve / CTAs)
 */

type Position = { left: number; width: number; opacity: number };
type NavLinkItem = { label: string; href: string };

type TabProps = {
  children: React.ReactNode;
  href: string;
  active: boolean;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  dropdown?: NavLinkItem[];
};

const TABS: (NavLinkItem & { dropdown?: NavLinkItem[] })[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    dropdown: [
      { label: "Our Team", href: "/team" },
      { label: "Our Story", href: "/about#story" },
    ],
  },
  { label: "Activities", href: "/activities" },
  { label: "Contact", href: "/contact" },
];

const JOIN_BTN =
  "rounded-full bg-[#E8A33D] px-6 py-3 text-xs font-bold uppercase tracking-wide text-[#0D3E3B] shadow-[0_4px_0_0_#c17f22] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_#c17f22]";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 20);
    if (menuOpen) return;
    setHidden(latest > previous && latest > 100);
  });

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`sticky top-0 z-50 border-b px-6 py-3 backdrop-blur-md transition-colors duration-300 md:px-10 ${
        scrolled
          ? "border-[#155A56]/15 bg-[#F2EFEA]/90 shadow-sm"
          : "border-transparent bg-[#F2EFEA]/70"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 transition-transform hover:scale-[1.02]"
          aria-label="IEEE IAS IES PES FST SB, home"
        >
          <img src={logo} alt="" className="h-12 w-auto md:h-14" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:block">
          <SlideTabs pathname={pathname} />
        </div>

        {/* Desktop CTA */}
        <Link to="/contact" className={`${JOIN_BTN} hidden md:block`}>
          Join us
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full bg-[#155A56] md:hidden"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-5 rounded bg-[#F2EFEA]"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block h-0.5 w-5 rounded bg-[#F2EFEA]"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block h-0.5 w-5 rounded bg-[#F2EFEA]"
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden md:hidden"
          >
            <ul className="mt-4 space-y-1 rounded-2xl bg-[#155A56] p-3">
              {TABS.map((tab) => (
                <li key={tab.label}>
                  <Link
                    to={tab.href}
                    className="block rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wide text-[#F2EFEA] transition-colors hover:bg-[#A8D5BA] hover:text-[#0D3E3B]"
                  >
                    {tab.label}
                  </Link>
                  {tab.dropdown && (
                    <ul className="ml-3 border-l border-[#A8D5BA]/40 pl-3">
                      {tab.dropdown.map((sub) => (
                        <li key={sub.label}>
                          <Link
                            to={sub.href}
                            className="block rounded-lg px-3 py-2 text-xs font-semibold text-[#A8D5BA] transition-colors hover:text-[#F2EFEA]"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li className="pt-2">
                <Link to="/contact" className={`${JOIN_BTN} block text-center`}>
                  Join us
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

const SlideTabs = ({ pathname }: { pathname: string }) => {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => setPosition((prev) => ({ ...prev, opacity: 0 }))}
      className="relative flex w-fit rounded-full border-2 border-white bg-[#155A56] p-1 shadow-lg shadow-[#155A56]/15"
    >
      {TABS.map((tab) => (
        <Tab
          key={tab.label}
          href={tab.href}
          active={
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href)
          }
          setPosition={setPosition}
          dropdown={tab.dropdown}
        >
          {tab.label}
        </Tab>
      ))}
      <Cursor position={position} />
    </ul>
  );
};

const Tab = ({ children, href, active, setPosition, dropdown }: TabProps) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({ left: ref.current.offsetLeft, width, opacity: 1 });
      }}
      className="group relative z-10 block cursor-pointer"
    >
      <Link
        to={href}
        aria-current={active ? "page" : undefined}
        className={`block px-3 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors md:px-5 md:py-3 md:text-sm ${
          active ? "text-[#A8D5BA]" : "text-[#F2EFEA] hover:text-white"
        }`}
      >
        {children}
        {active && (
          <motion.span
            layoutId="active-dot"
            className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#E8A33D]"
          />
        )}
      </Link>

      {dropdown && (
        <div className="pointer-events-none absolute left-1/2 top-full w-44 -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-all duration-200 focus-within:pointer-events-auto focus-within:translate-y-0 focus-within:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
          <div className="rounded-xl border border-white/60 bg-[#FBF9F5] p-2 text-[#155A56] shadow-xl shadow-black/10">
            {dropdown.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="block rounded-lg px-3 py-2 text-xs font-semibold normal-case tracking-normal transition-colors hover:bg-[#A8D5BA]/60"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </li>
  );
};

const Cursor = ({ position }: { position: Position }) => (
  <motion.li
    animate={{ ...position }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="absolute z-0 h-7 rounded-full bg-[#A8D5BA] md:h-11"
  />
);
