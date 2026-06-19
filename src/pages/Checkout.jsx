import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Smartphone, ShieldCheck, X, Banknote } from "lucide-react";

export default function Checkout() {
  const subtotal = 134.95;
  const total = subtotal;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
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
        <div className="space-y-8">
          <section className="overflow-hidden rounded-[40px] border border-line bg-gradient-to-br from-cream via-sand to-white p-8 shadow-[0_30px_80px_rgba(28,27,25,0.08)] sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-muted">Order summary</p>
                <h1 className="mt-3 text-4xl font-display text-ink">Secure checkout</h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                  Choose your preferred payment method and complete your order with confidence.
                </p>
              </div>
              <div className="rounded-3xl bg-white px-6 py-5 text-center shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Total due</p>
                <p className="mt-3 text-4xl font-semibold text-ink">${total.toFixed(2)}</p>
                <p className="mt-2 text-sm text-muted">Includes discounts and taxes</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[28px] bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Items</p>
                <p className="mt-3 text-2xl font-semibold text-ink">5</p>
              </div>
              <div className="rounded-[28px] bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Payment</p>
                <p className="mt-3 text-2xl font-semibold text-ink">Instant</p>
              </div>
              <div className="rounded-[28px] bg-white p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-muted">Estimated delivery</p>
                <p className="mt-3 text-2xl font-semibold text-ink">Instant</p>
              </div>
            </div>
          </section>

          <section className="rounded-[32px] bg-white p-8 shadow-sm ring-1 ring-line">
            <div className="flex items-center gap-3 text-ink">
              <CreditCard size={24} />
              <div>
                <p className="font-display text-xl">Payment method</p>
                <p className="text-sm text-muted">Select one method and proceed to pay securely.</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4">
              <div className="rounded-[28px] border border-ink/10 bg-sand p-5 shadow-sm transition hover:border-ink/30">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Smartphone size={22} className="text-ink" />
                    <div>
                      <p className="font-medium text-ink">UPI</p>
                      <p className="text-sm text-muted">Pay instantly through your UPI app.</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-ink px-3 py-1 text-xs uppercase tracking-[0.2em] text-cream">
                    Recommended
                  </span>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
                  <div>
                    <label className="block text-sm font-medium text-ink">UPI ID</label>
                    <input
                      type="text"
                      placeholder="yourname@bank"
                      className="mt-2 w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none focus:border-ink"
                    />
                  </div>
                  <button
                    type="button"
                    className="rounded-2xl bg-ink px-6 py-3 text-sm font-medium text-cream transition hover:opacity-90"
                  >
                    Verify
                  </button>
                </div>
              </div>

              <div className="rounded-[28px] border border-ink/10 bg-white p-5 shadow-sm transition hover:border-ink/30">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Banknote size={22} className="text-ink" />
                    <div>
                      <p className="font-medium text-ink">Razorpay</p>
                      <p className="text-sm text-muted">Pay with cards, wallets, netbanking and more.</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-sand px-3 py-1 text-xs uppercase tracking-[0.2em] text-ink">
                    Trusted
                  </span>
                </div>
                <div className="mt-5 grid gap-3">
                  <button
                    type="button"
                    className="rounded-2xl border border-line bg-sand px-4 py-3 text-left text-sm text-ink transition hover:border-ink"
                  >
                    Checkout with Razorpay
                  </button>
                  <p className="text-xs text-muted">This is a payment UI preview only.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-6 xl:sticky xl:top-24">
          <div className="rounded-[32px] bg-ink px-8 py-8 text-cream shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck size={22} />
              <div>
                <p className="font-display text-lg">Secure checkout</p>
                <p className="text-sm text-sand/90">Payments are encrypted and protected.</p>
              </div>
            </div>

            <div className="mt-8 space-y-4 rounded-[28px] bg-white p-6 text-ink shadow-sm">
              <div className="flex items-center justify-between text-sm text-muted">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="h-px bg-sand/70" />
              <div className="flex items-center justify-between text-xl font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              className="mt-6 w-full rounded-[28px] bg-cream px-6 py-4 text-sm font-semibold text-ink transition hover:brightness-110"
            >
              Pay ${total.toFixed(2)}
            </button>

            <div className="mt-6 grid gap-3 rounded-[28px] bg-white p-5 text-sm text-ink shadow-sm">
              <p className="font-medium">Accepted methods</p>
              <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-muted">
                <span className="rounded-full bg-sand px-3 py-2">UPI</span>
                <span className="rounded-full bg-sand px-3 py-2">Visa</span>
                <span className="rounded-full bg-sand px-3 py-2">Mastercard</span>
                <span className="rounded-full bg-sand px-3 py-2">Netbanking</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
