import { ArrowRight, Gem, Leaf, RefreshCw, ShieldCheck, Package, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const features = [
  { icon: Gem, title: "Premium Quality", text: "Thoughtfully designed with high-quality materials." },
  { icon: Leaf, title: "Simple & Practical", text: "Every product solves a real problem in everyday life." },
  { icon: RefreshCw, title: "Reusable & Eco-Friendly", text: "Sustainable choices that are better for you and the planet." },
  { icon: ShieldCheck, title: "Built to Last", text: "Durable, reliable, and made to accompany you daily." },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return products;

    return products.filter((product) => {
      const content = [product.name, product.tagline, product.summary]
        .join(" ")
        .toLowerCase();
      return content.includes(normalizedQuery);
    });
  }, [searchQuery]);

  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src="/images/hero.png"
            alt="The NEXORA collection"
            className="h-[320px] w-full object-cover md:h-[460px]"
          />
          <div className="absolute inset-0 flex items-center">
            <div className="px-8 md:px-14 max-w-md">
              <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink md:text-5xl">
                Everyday Essentials,
                <br />
                Smarter Living.
              </h1>
              <p className="mt-5 max-w-sm leading-relaxed text-muted">
                Five thoughtfully designed products that bring convenience,
                style, and efficiency to your daily life.
              </p>

              <a
                href="#collection"
                className="mt-7 inline-flex items-center gap-2 rounded-md bg-ink px-7 py-3 text-sm font-medium text-cream transition hover:opacity-90"
              >
                Explore Collection <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section id="collection" className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <div>
            <h2 className="font-display text-3xl text-ink">Our Collection</h2>
            <div className="mx-auto mt-3 h-px w-12 bg-line" />
          </div>

          <div className="w-full max-w-2xl">
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <div className="relative">
              <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                id="product-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search products, keywords, or features"
                className="w-full rounded-full border border-line bg-white px-12 py-4 text-sm text-ink outline-none transition focus:border-ink"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => <ProductCard key={p.id} product={p} />)
          ) : (
            <div className="col-span-full rounded-[28px] border border-line bg-sand p-10 text-center text-ink">
              <p className="text-lg font-medium">No products matched your search.</p>
              <p className="mt-2 text-sm text-muted">Try a different keyword like “alarm”, “belt”, or “bookmark”.</p>
            </div>
          )}
        </div>
      </section>

      {/* FEATURES */}
      <section className="mt-12 bg-sand/60">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="text-center">
              <f.icon className="mx-auto mb-3 text-ink" size={26} strokeWidth={1.5} />
              <h3 className="font-medium text-ink">{f.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <Package className="mx-auto mb-4 text-ink" size={30} strokeWidth={1.5} />
        <h2 className="font-display text-3xl text-ink">Small Products, Big Impact</h2>
        <p className="mt-2 text-muted">Discover practical essentials that make a difference.</p>

        <a
          href="#collection"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-ink px-7 py-3 text-sm font-medium text-cream transition hover:opacity-90"
        >
          Explore Collection <ArrowRight size={16} />
        </a>
      </section>
    </>
  );
}