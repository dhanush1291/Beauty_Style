import { Link } from "@tanstack/react-router";

export function Logo({ className = "", height = "h-12 md:h-16" }: { className?: string; height?: string }) {
  return (
    <Link to="/" className={`group block ${className} overflow-hidden`} aria-label="INFINA Beauty home">
      <img
        src="/logo.jpeg"
        alt="INFINA Beauty"
        className={`${height} w-auto max-w-[280px] object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105`}
      />
    </Link>
  );
}
