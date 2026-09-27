import { createContext, useContext, useState } from "react";
import { getStored, setStored } from "../utils/storage";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => getStored("shoploop_wishlist", []));

  function toggle(product) {
    const exists = items.some(item => item._id === product._id);
    const next = exists ? items.filter(item => item._id !== product._id) : [...items, product];
    setItems(next);
    setStored("shoploop_wishlist", next);
    return !exists;
  }

  function has(id) { return items.some(item => item._id === id); }

  return <WishlistContext.Provider value={{ items, toggle, has }}>{children}</WishlistContext.Provider>;
}

export const useWishlist = () => useContext(WishlistContext);
