import { Link } from "react-router-dom";
import { Heart, X, ArrowRight } from "lucide-react";
import { products } from "../data/products";
import { useWishlist } from "../context/WishlistContext";

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const saved = items.map((id) => products.find((p) => p.id === id)).filter(Boolean);

  // EMPTY STATE
  if (saved.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-28 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sand">
          <Heart size={26} strokeWidth={1.5} className="text-muted" />
        </div>
        <h1 className="mt-6 font-display text-3xl text-ink">Your wishlist is empty</h1>
        <p className="mt-2 text-muted">Save the products you love and find them all here.</p>
        <Link
          to="/"
          className="mt-7 inline-flex items-center gap-2 rounded-md bg-ink px-7 py-3 text-sm font-medium text-cream transition hover:opacity-90"
        >
          Explore Collection <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  // FILLED STATE
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-display text-4xl text-ink">Your Wishlist</h1>
      <p className="mt-1 text-muted">
        {saved.length} {saved.length === 1 ? "item" : "items"} saved.
      </p>

      <div className="mt-8 divide-y divide-line border-y border-line">
        {saved.map((p) => (
          <div key={p.id} className="flex items-center gap-5 py-5">
            <Link to={`/product/${p.slug}`} className="shrink-0">
              <img src={p.image} alt={p.name} className="h-24 w-24 rounded-lg bg-sand object-cover" />
            </Link>

            <div className="min-w-0 flex-1">
              <Link to={`/product/${p.slug}`} className="font-display text-lg text-ink hover:underline">
                {p.name}
              </Link>
              <p className="mt-1 line-clamp-2 text-sm text-muted">{p.tagline}</p>
            </div>

            <p className="hidden font-display text-lg text-ink sm:block">₹{p.price}</p>

            <button
              onClick={() => removeFromWishlist(p.id)}
              aria-label={`Remove ${p.name}`}
              className="text-muted transition hover:text-ink"
            >
              <X size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:underline">
          <ArrowRight size={15} /> Continue exploring
        </Link>
      </div>
    </div>
  );
}