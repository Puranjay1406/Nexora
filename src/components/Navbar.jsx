import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, User, Heart, ShoppingBag, LogOut, UserCircle } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { count } = useWishlist();
  const { count: cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate("/");
  };

  const displayName =
    user?.displayName?.split(" ")[0] || user?.email?.split("@")[0] || "Account";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button className="text-ink" aria-label="Menu">
          <Menu size={22} />
        </button>

        <Link to="/" className="text-center leading-tight">
          <div className="font-display text-2xl tracking-[0.3em] text-ink">NEXORA</div>
          <div className="text-[10px] tracking-[0.25em] text-muted">SMART. SIMPLE. ESSENTIAL.</div>
        </Link>

        <div className="flex items-center gap-4 text-ink">
          <Link to="/wishlist" aria-label="Wishlist" className="relative">
            <Heart size={20} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[10px] font-medium text-cream">
                {count}
              </span>
            )}
          </Link>

          <Link to="/cart" aria-label="Cart" className="relative">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[10px] font-medium text-cream">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-2 text-ink"
                aria-label="Account menu"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt="" className="h-7 w-7 rounded-full object-cover" />
                ) : (
                  <UserCircle size={22} />
                )}
                <span className="hidden text-sm sm:inline">{displayName}</span>
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-44 overflow-hidden rounded-lg border border-line bg-cream shadow-lg">
                  <Link
                    to="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-ink hover:bg-sand/60"
                  >
                    <User size={16} /> Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 border-t border-line px-4 py-3 text-left text-sm text-ink hover:bg-sand/60"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 text-ink" aria-label="Sign in">
              <User size={20} />
              <span className="hidden text-sm sm:inline">Sign In</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}