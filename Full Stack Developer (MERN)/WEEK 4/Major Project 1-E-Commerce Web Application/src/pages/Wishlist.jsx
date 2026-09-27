import EmptyState from "../components/EmptyState";
import ProductGrid from "../components/ProductGrid";
import { useWishlist } from "../context/WishlistContext";

export default function Wishlist({ onFlyToCart }) {
  const { items } = useWishlist();
  return <main className="page-shell py-10"><h1 className="page-title">Wishlist</h1><p className="mt-2 text-sm text-slate-500">Your saved products.</p><div className="mt-8">{items.length ? <ProductGrid products={items} onFlyToCart={onFlyToCart}/> : <EmptyState title="Your wishlist is empty" text="Save products you love and find them here anytime."/>}</div></main>;
}
