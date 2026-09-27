import ProductCard from "./ProductCard";
import { LoadingSkeleton } from "./LoadingSkeleton";

export default function ProductGrid({ products, loading, onFlyToCart }) {
  if (loading) return <LoadingSkeleton />;
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map(product => <ProductCard key={product._id} product={product} onFlyToCart={onFlyToCart} />)}
    </div>
  );
}
