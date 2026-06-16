import { createContext, useContext, useState } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]); // array of product ids

  const toggleWishlist = (id) =>
    setItems((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const removeFromWishlist = (id) =>
    setItems((prev) => prev.filter((x) => x !== id));

  const isInWishlist = (id) => items.includes(id);

  return (
    <WishlistContext.Provider
      value={{ items, toggleWishlist, removeFromWishlist, isInWishlist, count: items.length }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
