import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <div className="overflow-hidden rounded-lg bg-sand">
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="pt-5">
        <p className="mb-2 text-xs tracking-[0.2em] text-muted">— {product.number} —</p>
        <h3 className="font-display text-lg leading-snug text-ink">{product.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{product.tagline}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-ink">
          View Details
          <ArrowRight size={15} className="transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}