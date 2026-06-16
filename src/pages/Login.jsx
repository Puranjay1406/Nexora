import { useState } from "react";
import { ShieldCheck, UserRound, Zap } from "lucide-react";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" width="18" height="18" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export default function Login() {
  const [mode, setMode] = useState("signin"); // "signin" | "signup"
  const isSignup = mode === "signup";

  return (
    <div className="mx-auto my-10 max-w-5xl px-4">
      <div className="grid overflow-hidden rounded-2xl border border-line bg-cream shadow-sm md:grid-cols-2">
        {/* LEFT — editorial panel (hidden on mobile) */}
        <div className="relative hidden min-h-[640px] md:block">
          <img
            src="/images/login.png"
            alt="The NEXORA collection"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cream/70 via-cream/20 to-cream/60" />
          <div className="relative flex h-full flex-col justify-between p-10">
            <div>
              <h2 className="font-display text-4xl leading-tight text-ink">
                {isSignup ? "Join NEXORA." : "Welcome Back."}
              </h2>
              <p className="mt-3 max-w-xs leading-relaxed text-muted">
                {isSignup
                  ? "Create an account to begin your journey toward smarter everyday living."
                  : "Sign in to continue your journey toward smarter everyday living."}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { icon: ShieldCheck, title: "Secure", text: "Your data is safe with us" },
                { icon: UserRound, title: "Personalized", text: "Experience tailored for you" },
                { icon: Zap, title: "Quick Access", text: "Seamless login, every time" },
              ].map((f) => (
                <div key={f.title}>
                  <f.icon className="mx-auto mb-2 text-ink" size={22} strokeWidth={1.5} />
                  <p className="text-sm font-medium text-ink">{f.title}</p>
                  <p className="mt-1 text-xs leading-snug text-muted">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — form */}
        <div className="p-8 md:p-12">
          {/* tabs */}
          <div className="flex gap-8 border-b border-line">
            <button
              onClick={() => setMode("signup")}
              className={`pb-3 text-sm transition ${
                isSignup ? "border-b-2 border-ink font-medium text-ink" : "text-muted hover:text-ink"
              }`}
            >
              Create Account
            </button>
            <button
              onClick={() => setMode("signin")}
              className={`pb-3 text-sm transition ${
                !isSignup ? "border-b-2 border-ink font-medium text-ink" : "text-muted hover:text-ink"
              }`}
            >
              Sign In
            </button>
          </div>

          <h1 className="mt-8 font-display text-3xl text-ink">
            {isSignup ? "Create Account" : "Sign In"}
          </h1>
          <p className="mt-1 text-sm text-muted">
            {isSignup
              ? "Join us and start living smarter today."
              : "Welcome back! Please sign in to your account."}
          </p>

          <div className="mt-8 space-y-5">
            {isSignup && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-md border border-line bg-white px-4 py-3 text-sm text-ink outline-none placeholder:text-muted focus:border-ink"
                />
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-md border border-line bg-white px-4 py-3 text-sm text-ink outline-none placeholder:text-muted focus:border-ink"
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-sm font-medium text-ink">Password</label>
                {!isSignup && (
                  <a href="#" className="text-xs text-muted hover:text-ink">Forgot password?</a>
                )}
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-md border border-line bg-white px-4 py-3 text-sm text-ink outline-none placeholder:text-muted focus:border-ink"
              />
            </div>

            <button
              type="button"
              className="w-full rounded-md bg-ink py-3 text-sm font-medium text-cream transition hover:opacity-90"
            >
              {isSignup ? "Create Account" : "Sign In"}
            </button>
          </div>

          {/* divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-line" />
            <span className="text-xs text-muted">or</span>
            <div className="h-px flex-1 bg-line" />
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-md border border-line bg-white py-3 text-sm font-medium text-ink transition hover:bg-sand/50"
          >
            <GoogleIcon /> Continue with Google
          </button>

          <p className="mt-6 text-center text-sm text-muted">
            {isSignup ? "Already have an account? " : "Don’t have an account? "}
            <button
              onClick={() => setMode(isSignup ? "signin" : "signup")}
              className="font-medium text-ink underline"
            >
              {isSignup ? "Sign in" : "Sign up"}
            </button>
          </p>

          <p className="mt-8 text-center text-xs leading-relaxed text-muted">
            By continuing, you agree to our{" "}
            <a href="#" className="underline hover:text-ink">Terms of Service</a> and{" "}
            <a href="#" className="underline hover:text-ink">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}