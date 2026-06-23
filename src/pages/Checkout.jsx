import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, X } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { items } = useCart();

  const cartProducts = items
    .map((item) => {
      const product = products.find((productItem) => productItem.id === item.id);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  const subtotal = cartProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  const shipping = 0; // free
  const total = subtotal + shipping;
  const itemCount = cartProducts.reduce((sum, product) => sum + product.quantity, 0);

  // EMPTY STATE — nothing to check out
  if (cartProducts.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-28 text-center">
        <h1 className="font-display text-3xl text-ink">Nothing to check out</h1>
        <p className="mt-2 text-muted">Your cart is empty — add a few products first.</p>
        <Link
          to="/"
          className="mt-7 inline-flex items-center gap-2 rounded-md bg-ink px-7 py-3 text-sm font-medium text-cream transition hover:opacity-90"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* top bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm text-muted">
          <Link to="/cart" className="inline-flex items-center gap-2 font-medium text-ink hover:text-ink">
            <ArrowLeft size={16} /> Back to cart
          </Link>
          <span className="hidden sm:inline">/ Checkout</span>
        </div>
        <Link
          to="/"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition hover:bg-sand hover:text-ink"
          aria-label="Close checkout"
        >
          <X size={18} />
        </Link>
      </div>

      <div className="mt-10 grid gap-10 xl:grid-cols-[1.5fr_0.95fr]">
        {/* LEFT — order review */}
        <div className="space-y-8">
          <section className="overflow-hidden rounded-[32px] border border-line bg-gradient-to-br from-cream via-sand to-white p-8 shadow-[0_30px_80px_rgba(28,27,25,0.08)] sm:p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-muted">Order review</p>
            <h1 className="mt-3 font-display text-4xl text-ink">Review your order</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
              Check the items below and place your order when you’re ready.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Items</p>
                <p className="mt-3 text-2xl font-semibold text-ink">{itemCount}</p>
              </div>
              <div className="rounded-[24px] bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Shipping</p>
                <p className="mt-3 text-2xl font-semibold text-ink">Free</p>
              </div>
            </div>
          </section>

          {/* item list */}
          <section className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-line sm:p-8">
            <p className="font-display text-xl text-ink">Items in your order</p>
            <div className="mt-6 divide-y divide-line">
              {cartProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-4 py-4">
                  <Link
                    to={`/product/${product.slug}`}
                    className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-sand"
                  >
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      to={`/product/${product.slug}`}
                      className="font-display text-base text-ink hover:underline"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-1 text-sm text-muted">
                      Qty {product.quantity} &times; ₹{product.price}
                    </p>
                  </div>
                  <p className="font-medium text-ink">
                    ₹{product.price * product.quantity}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT — summary */}
        <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
          <div className="rounded-[28px] bg-ink px-8 py-8 text-cream shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck size={22} />
              <div>
                <p className="font-display text-lg">Order summary</p>
                <p className="text-sm text-sand/90">Review your total before placing the order.</p>
              </div>
            </div>

            <div className="mt-8 space-y-4 rounded-[24px] bg-white p-6 text-ink shadow-sm">
              <div className="flex items-center justify-between text-sm text-muted">
                <span>Subtotal ({itemCount} item{itemCount === 1 ? "" : "s"})</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted">
                <span>Shipping</span>
                <span className="font-medium text-ink">Free</span>
              </div>
              <div className="h-px bg-line" />
              <div className="flex items-center justify-between text-xl font-semibold">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-[24px] bg-cream px-6 py-4 text-sm font-semibold text-ink transition hover:brightness-105"
            >
              Place Order
            </button>

            <Link
              to="/cart"
              className="mt-3 block text-center text-sm text-sand/90 underline transition hover:text-cream"
            >
              Back to cart
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
