import { createContext, useContext, useMemo, useState } from "react";
import { getStored, setStored } from "../utils/storage";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => getStored("shoploop_cart", []));

  const persist = next => {
    setItems(next);
    setStored("shoploop_cart", next);
  };

  function addToCart(product, quantity = 1) {
    const existing = items.find(item => item.product === product._id);
    const next = existing
      ? items.map(item => item.product === product._id ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) } : item)
      : [...items, {
          product: product._id,
          name: product.name,
          price: product.price,
          image: product.images?.[0],
          quantity: Math.min(quantity, product.stock)
        }];
    persist(next);
  }

  function removeFromCart(id) { persist(items.filter(item => item.product !== id)); }

  function updateQuantity(id, quantity) {
    if (quantity <= 0) return removeFromCart(id);
    persist(items.map(item => item.product === id ? { ...item, quantity } : item));
  }

  function clearCart() { persist([]); }

  const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  return <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal }}>
    {children}
  </CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
