import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Check } from "lucide-react";
import { products } from "../data/products";
import Stars from "../components/Stars";
import { useWishlist } from "../context/WishlistContext";

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
  const { toggleWishlist, isInWishlist } = useWishlist();

  // reset to the first image whenever you open a different product
  useEffect(() => {
    setActiveIndex(0);
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
          <div className="overflow-hidden rounded-xl bg-sand">
            <img src={mainImage} alt={product.name} className="h-[460px] w-full object-cover" />
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

          <button
            onClick={() => toggleWishlist(product.id)}
            className={`mt-6 inline-flex items-center gap-2 rounded-md px-7 py-3 text-sm font-medium transition ${
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