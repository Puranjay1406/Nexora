import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Minus, Trash2 } from "lucide-react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { getProfile, isProfileComplete } from "../lib/profile";

export default function Cart() {
  const { items, updateQuantity, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const savedProducts = items
    .map((item) => {
      const product = products.find((productItem) => productItem.id === item.id);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  const total = savedProducts.reduce((sum, product) => sum + product.price * product.quantity, 0);

  const handleCheckout = async () => {
    // 1) must be logged in
    if (!user) {
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }
    // 2) must have a complete profile
    const profile = await getProfile(user.uid);
    if (!isProfileComplete(profile)) {
      navigate("/profile", { state: { needsCompletion: true, from: "/checkout" } });
      return;
    }
    // 3) all clear
    navigate("/checkout");
  };

  if (savedProducts.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-28 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sand">
          <Trash2 size={26} className="text-muted" />
        </div>
        <h1 className="mt-6 font-display text-3xl text-ink">Your cart is empty</h1>
        <p className="mt-2 text-muted">Add products to your cart and they will appear here.</p>
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-4xl text-ink">Shopping Cart</h1>
          <p className="mt-1 text-muted">{savedProducts.length} item{savedProducts.length === 1 ? "" : "s"} in your cart.</p>
        </div>
        <div className="rounded-2xl border border-line bg-sand px-5 py-4 text-sm text-ink">
          <p className="font-medium">Order total</p>
          <p className="mt-1 text-lg">₹{total}</p>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {savedProducts.map((product) => (
          <div key={product.id} className="grid gap-4 rounded-3xl border border-line bg-cream p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center">
            <Link to={`/product/${product.slug}`} className="flex h-28 w-28 shrink-0 overflow-hidden rounded-3xl bg-sand">
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            </Link>

            <div className="min-w-0">
              <Link to={`/product/${product.slug}`} className="font-display text-lg text-ink hover:underline">
                {product.name}
              </Link>
              <p className="mt-2 text-sm leading-relaxed text-muted">{product.tagline}</p>
              <p className="mt-3 text-sm text-ink">₹{product.price} each</p>
            </div>

            <div className="flex flex-col items-start gap-3 sm:items-end">
              <div className="inline-flex items-center rounded-full border border-line bg-white">
                <button
                  type="button"
                  onClick={() => updateQuantity(product.id, product.quantity - 1)}
                  className="inline-flex h-10 w-10 items-center justify-center text-muted transition hover:text-ink"
                >
                  <Minus size={16} />
                </button>
                <span className="min-w-[2.25rem] text-center text-sm font-medium text-ink">{product.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(product.id, product.quantity + 1)}
                  className="inline-flex h-10 w-10 items-center justify-center text-muted transition hover:text-ink"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => removeFromCart(product.id)}
                className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-ink"
              >
                <Trash2 size={16} /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:underline">
          <ArrowLeft size={15} /> Continue shopping
        </Link>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handleCheckout}
            className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-medium text-cream transition hover:opacity-90"
          >
            Proceed to Checkout
          </button>
          <div className="rounded-3xl bg-ink px-6 py-4 text-center text-cream">
            <p className="text-sm uppercase tracking-[0.2em]">Ready to checkout</p>
            <p className="mt-2 text-2xl font-semibold">₹{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}