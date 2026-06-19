import { Link } from "react-router-dom";
import { X, ShieldCheck, ArrowLeft } from "lucide-react";

export default function Logout() {
  return (
    <div className="mx-auto my-16 max-w-3xl px-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-muted">Signed out</p>
          <h1 className="mt-3 text-4xl font-display text-ink">You are now logged out.</h1>
        </div>
        <Link
          to="/"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition hover:bg-sand hover:text-ink"
          aria-label="Close logout"
        >
          <X size={18} />
        </Link>
      </div>

      <div className="mt-10 rounded-3xl border border-line bg-cream p-8">
        <div className="flex items-center gap-4">
          <ShieldCheck size={24} className="text-ink" />
          <div>
            <p className="font-medium text-ink">Thank you for visiting NEXORA.</p>
            <p className="text-sm text-muted">Your session has been cleared. You can sign in again anytime.</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            to="/login"
            className="rounded-3xl border border-line bg-white px-6 py-4 text-center text-sm font-medium text-ink transition hover:border-ink"
          >
            Sign in again
          </Link>
          <Link
            to="/"
            className="rounded-3xl bg-ink px-6 py-4 text-center text-sm font-medium text-cream transition hover:opacity-90"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
