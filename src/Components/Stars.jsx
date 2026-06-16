import { Star } from "lucide-react";

export default function Stars({ value = 0, size = 16 }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          strokeWidth={1.5}
          className={n <= Math.round(value) ? "fill-accent text-accent" : "text-line"}
        />
      ))}
    </span>
  );
}