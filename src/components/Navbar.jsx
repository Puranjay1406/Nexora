import { Link } from "react-router-dom";
import { Menu, User, Heart, ShoppingCart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { count: wishlistCount } = useWishlist();
  const { count: cartCount } = useCart();

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
          <Link to="/cart" aria-label="Cart" className="relative">
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[10px] font-medium text-cream">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/wishlist" aria-label="Wishlist" className="relative">
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[10px] font-medium text-cream">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link to="/login" aria-label="Account"><User size={20} /></Link>
        </div>
      </div>
    </header>
  );
}