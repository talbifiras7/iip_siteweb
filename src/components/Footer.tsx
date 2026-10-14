import { Link } from "react-router-dom";
import { motion } from "motion/react";
import logo from "../assets/logo.png";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/team" },
  { label: "Activities", href: "/activities" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ieee.ias.ies.pes.fst.sbjc/",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61582513621178",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0D3E3B] px-4 py-5 text-[#F2EFEA] md:px-6">
      <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
        {/* Brand */}
        <div>
          <img
            src={logo}
            alt="IEEE IAS IES PES FST SB"
            className="mb-2 h-10 w-auto brightness-0 invert"
          />
          <p className="max-w-xs text-sm leading-relaxed text-[#F2EFEA]/70">
            IEEE IAS IES PES Joint Student Branch Chapter at the Faculty of
            Sciences of Tunis. Powering ideas, building systems, connecting
            minds.
          </p>
        </div>

        {/* Nav */}
        <div>
          <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#A8D5BA]">
            Explore
          </h3>
          <ul className="space-y-2">
            {LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.href}
                  className="text-sm text-[#F2EFEA]/75 transition-colors hover:text-[#E8A33D]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-[#A8D5BA]">
            Follow us
          </h3>
          <ul className="space-y-2">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <motion.a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ x: 5 }}
                  className="inline-block text-sm text-[#F2EFEA]/75 transition-colors hover:text-[#E8A33D]"
                >
                  {s.label} ↗
                </motion.a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-4 max-w-5xl border-t border-[#F2EFEA]/15 pt-3 text-xs text-[#F2EFEA]/50">
        © {new Date().getFullYear()} IEEE IAS IES PES FST SB. All rights
        reserved.
      </div>
    </footer>
  );
}
