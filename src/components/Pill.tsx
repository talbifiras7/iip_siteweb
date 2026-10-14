import type { ReactNode } from "react";

/** White label with a teal ring + amber dot, floats over photo edges. */
export default function Pill({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[#FBF9F5] py-1.5 pl-2 pr-4 text-xs font-bold text-[#0D3E3B] shadow-lg shadow-[#0D3E3B]/25 transition-colors duration-300 ${className}`}
    >
      <span
        aria-hidden
        className="h-4 w-4 shrink-0 rounded-full"
        style={{
          background: "radial-gradient(circle,#E8A33D 0 32%,#155A56 36% 100%)",
        }}
      />
      {children}
    </span>
  );
}
