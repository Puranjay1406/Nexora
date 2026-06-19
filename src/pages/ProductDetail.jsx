import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Check, ShoppingCart, Minus, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "../data/products";
import Stars from "../components/Stars";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

// Placeholder reviews — replaced by Firestore data in the Base phase.
const sampleReviews = [
  { id: 1, name: "Aarav M.", rating: 5, text: "Does exactly what it promises. Simple and well made." },
  { id: 2, name: "Priya S.", rating: 4, text: "Genuinely useful in daily life. Would recommend." },
  { id: 3, name: "Daniel K.", rating: 5, text: "Small thing, big difference. Love the design." },
];

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);

  // which gallery image is showing in the large frame
  const [activeIndex, setActiveIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  // reset to the first image whenever you open a different product
  useEffect(() => {
    setActiveIndex(0);
    setQuantity(1);
  }, [slug]);

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl text-ink">Product not found</h1>
        <p className="mt-2 text-muted">We couldn’t find what you were looking for.</p>
        <Link to="/" className="mt-6 inline-block text-sm font-medium text-ink underline">
          Back to collection
        </Link>
      </div>
    );
  }

  const gallery = product.gallery ?? [product.image];
  const mainImage = gallery[activeIndex] ?? gallery[0];
  const avg = sampleReviews.reduce((s, r) => s + r.rating, 0) / sampleReviews.length;
  const saved = isInWishlist(product.id);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
        <ArrowLeft size={15} /> Back to collection
      </Link>

      {/* MAIN */}
      <div className="mt-8 grid gap-12 md:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="relative overflow-hidden rounded-xl bg-sand">
            <img src={mainImage} alt={product.name} className="h-[460px] w-full object-cover" />

            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setActiveIndex((current) => (current > 0 ? current - 1 : gallery.length - 1))}
                  className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 text-ink shadow-md transition hover:bg-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  type="button"
                  onClick={() => setActiveIndex((current) => (current < gallery.length - 1 ? current + 1 : 0))}
                  className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-3 text-ink shadow-md transition hover:bg-white"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
          {gallery.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`overflow-hidden rounded-lg bg-sand transition ${
                    i === activeIndex
                      ? "ring-2 ring-ink"
                      : "ring-1 ring-transparent hover:ring-line"
                  }`}
                >
                  <img
                    src={src}
                    alt={`${product.name} view ${i + 1}`}
                    className="h-20 w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-xs tracking-[0.2em] text-muted">— {product.number} —</p>
          <h1 className="mt-2 font-display text-4xl leading-tight text-ink">{product.name}</h1>
          <p className="mt-3 leading-relaxed text-muted">{product.tagline}</p>

          <div className="mt-4 flex items-center gap-3">
            <Stars value={avg} />
            <span className="text-sm text-muted">
              {avg.toFixed(1)} ({sampleReviews.length} reviews)
            </span>
          </div>

          <p className="mt-6 font-display text-3xl text-ink">${product.price.toFixed(2)}</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="inline-flex items-center rounded-full border border-line bg-white">
              <button
                type="button"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                className="inline-flex h-10 w-10 items-center justify-center text-muted transition hover:text-ink"
              >
                <Minus size={16} />
              </button>
              <span className="min-w-[2.5rem] text-center text-sm font-medium text-ink">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((current) => current + 1)}
                className="inline-flex h-10 w-10 items-center justify-center text-muted transition hover:text-ink"
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => addToCart(product.id, quantity)}
              className="inline-flex items-center gap-2 rounded-md bg-ink px-7 py-3 text-sm font-medium text-cream transition hover:opacity-90"
            >
              <ShoppingCart size={16} /> Add {quantity} to Cart
            </button>
          </div>

          <button
            onClick={() => toggleWishlist(product.id)}
            className={`mt-4 inline-flex items-center gap-2 rounded-md px-7 py-3 text-sm font-medium transition ${
              saved
                ? "border border-ink text-ink hover:bg-sand/50"
                : "bg-ink text-cream hover:opacity-90"
            }`}
          >
            <Heart size={16} className={saved ? "fill-ink" : ""} />
            {saved ? "Saved to Wishlist" : "Add to Wishlist"}
          </button>

          <div className="my-8 h-px w-full bg-line" />

          <h2 className="font-display text-xl text-ink">The Problem</h2>
          <p className="mt-2 leading-relaxed text-muted">{product.problem}</p>

          <h2 className="mt-6 font-display text-xl text-ink">How It Works</h2>
          <ul className="mt-3 space-y-2">
            {product.points.map((point, i) => (
              <li key={i} className="flex gap-3 text-muted">
                <Check size={18} className="mt-0.5 shrink-0 text-accent" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 font-display text-lg text-ink">{product.summary}</p>
        </div>
      </div>

      {/* REVIEWS */}
      <section className="mt-20 border-t border-line pt-12">
        <h2 className="font-display text-2xl text-ink">Customer Reviews</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {sampleReviews.map((r) => (
            <div key={r.id} className="rounded-lg border border-line bg-sand/40 p-5">
              <Stars value={r.rating} size={14} />
              <p className="mt-3 text-sm leading-relaxed text-ink">“{r.text}”</p>
              <p className="mt-3 text-xs tracking-wide text-muted">— {r.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}