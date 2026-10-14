import { motion } from "motion/react";
import Icon, { type IconName } from "./Icon";

type Props = {
  index: number;
  title: string;
  copy: string;
  icon: IconName;
  /** "light" for cream sections, "dark" for the teal About section. */
  variant?: "light" | "dark";
};

const STYLES = {
  light: {
    card: "border-[#155A56]/15 bg-[#FBF9F5] hover:border-[#155A56] hover:bg-[#155A56] hover:shadow-xl hover:shadow-[#155A56]/25",
    number: "text-[#155A56]/10 group-hover:text-[#F2EFEA]/10",
    tile: "bg-[#A8D5BA] text-[#0D3E3B] group-hover:bg-[#E8A33D]",
    title: "text-[#155A56] group-hover:text-[#F2EFEA]",
    copy: "text-[#155A56]/75 group-hover:text-[#F2EFEA]/80",
  },
  dark: {
    card: "border-[#F2EFEA]/20 bg-[#F2EFEA]/5 hover:border-[#A8D5BA] hover:bg-[#F2EFEA]/10",
    number: "text-[#F2EFEA]/10",
    tile: "bg-[#A8D5BA] text-[#0D3E3B] group-hover:bg-[#E8A33D]",
    title: "text-[#A8D5BA]",
    copy: "text-[#F2EFEA]/75",
  },
} as const;

export default function InfoCard({
  index,
  title,
  copy,
  icon,
  variant = "light",
}: Props) {
  const s = STYLES[variant];

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`group relative h-full overflow-hidden rounded-2xl border p-7 transition-[background-color,border-color,box-shadow] duration-300 ${s.card}`}
    >
      <span
        aria-hidden
        className={`absolute right-5 top-3 text-5xl font-bold transition-colors duration-300 ${s.number}`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div
        className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300 ${s.tile}`}
      >
        <Icon name={icon} />
      </div>

      <h3 className={`mb-2 text-xl font-bold transition-colors duration-300 ${s.title}`}>
        {title}
      </h3>
      <p className={`text-sm leading-relaxed transition-colors duration-300 ${s.copy}`}>
        {copy}
      </p>
    </motion.div>
  );
}
