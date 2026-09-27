import { useEffect, useState } from "react";
import { Heart, Minus, Plus, ShoppingBag, Star, Zap } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/api";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { formatPrice } from "../utils/formatPrice";
import ProductGrid from "../components/ProductGrid";
import { LoadingSkeleton } from "../components/LoadingSkeleton";

export default function ProductDetails({ onFlyToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [qty, setQty] = useState(1);
  const [review, setReview] = useState({ rating: 5, comment: "" });
  const [related, setRelated] = useState([]);
  const { addToCart } = useCart();
  const { toggle, has } = useWishlist();

  useEffect(() => {
    api.get(`/products/${id}`).then(r => {
      setProduct(r.data);
      return Promise.all([
        api.get(`/reviews/product/${id}`),
        api.get(`/products?category=${encodeURIComponent(r.data.category)}&limit=4`)
      ]);
    }).then(([r, relatedRes]) => {
      setReviews(r.data);
      setRelated(relatedRes.data.products.filter(p => p._id !== id));
    }).catch(() => setProduct(null));
  }, [id]);

  if (!product) return <main className="page-shell py-10"><LoadingSkeleton count={4}/></main>;

  function add() {
    addToCart(product, qty);
    onFlyToCart?.();
    toast.success("Added to cart");
  }

  async function submitReview(e) {
    e.preventDefault();
    try {
      await api.post(`/reviews/product/${id}`, review);
      toast.success("Review added");
      const r = await api.get(`/reviews/product/${id}`);
      setReviews(r.data);
      setReview({ rating: 5, comment: "" });
    } catch (err) { toast.error(err.response?.data?.message || "Please login to review"); }
  }

  return <main className="page-shell py-10">
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-3xl border border-slate-200 bg-white/75 p-4 dark:border-slate-800 dark:bg-slate-900/75"><img src={product.images?.[0]} alt={product.name} className="aspect-square w-full rounded-2xl object-cover"/></div>
      <div className="py-2">
        <div className="text-xs font-bold uppercase tracking-[.18em] text-pink-500">{product.brand} · {product.category}</div>
        <h1 className="mt-3 text-4xl font-black tracking-tight">{product.name}</h1>
        <div className="mt-3 flex items-center gap-2"><Star size={17} className="fill-amber-400 text-amber-400"/><b>{product.rating.toFixed(1)}</b><span className="text-sm text-slate-500">({product.numReviews} reviews)</span></div>
        <div className="mt-6 flex items-end gap-3"><span className="text-3xl font-black text-[#067D62]">{formatPrice(product.price)}</span><span className="text-sm text-slate-400 line-through">{formatPrice(product.originalPrice)}</span><span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-[#067D62]">{product.discount}% off</span></div>
        <p className="mt-6 leading-7 text-slate-600 dark:text-slate-300">{product.description}</p>
        <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm dark:bg-slate-900"><b>{product.stock > 0 ? "In stock" : "Out of stock"}</b><span className="ml-2 text-slate-500">{product.stock > 0 ? `${product.stock} units available` : "Currently unavailable"}</span></div>
        <div className="mt-6 flex flex-wrap gap-3"><div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700"><button className="p-3" onClick={() => setQty(q => Math.max(1, q - 1))}><Minus size={15}/></button><span className="w-8 text-center text-sm font-bold">{qty}</span><button className="p-3" onClick={() => setQty(q => Math.min(product.stock, q + 1))}><Plus size={15}/></button></div><button disabled={!product.stock} onClick={add} className="btn-primary"><ShoppingBag size={17}/> Add to cart</button><Link to={`/checkout?product=${product._id}`} className="btn-secondary"><Zap size={16}/> Buy now</Link><button onClick={() => toast.success(toggle(product) ? "Added to wishlist" : "Removed from wishlist")} className="icon-btn border"><Heart className={has(product._id) ? "fill-pink-500 text-pink-500" : ""}/></button></div>
      </div>
    </div>

    <section className="mt-16 grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
      <div className="glass-card p-6"><h2 className="text-xl font-black">Customer reviews</h2><div className="mt-6 space-y-4">{reviews.length ? reviews.map(r => <div key={r._id} className="border-b pb-4 last:border-0 dark:border-slate-800"><div className="flex items-center justify-between"><b>{r.user?.name || "Customer"}</b><span className="flex items-center gap-1 text-sm"><Star size={13} className="fill-amber-400 text-amber-400"/>{r.rating}</span></div><p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{r.comment}</p></div>) : <p className="text-sm text-slate-500">No reviews yet. Be the first.</p>}</div></div>
      <form onSubmit={submitReview} className="glass-card p-6"><h2 className="text-xl font-black">Write a review</h2><label className="label mt-5">Rating</label><select value={review.rating} onChange={e => setReview({...review, rating: e.target.value})} className="input">{[5,4,3,2,1].map(n => <option key={n}>{n}</option>)}</select><label className="label mt-4">Comment</label><textarea value={review.comment} onChange={e => setReview({...review, comment: e.target.value})} className="input min-h-32" placeholder="What did you think?"/><button className="btn-primary mt-4">Submit review</button></form>
    </section>

    {related.length > 0 && <section className="mt-16"><h2 className="section-title">You may also like</h2><div className="mt-6"><ProductGrid products={related} onFlyToCart={onFlyToCart}/></div></section>}
  </main>;
}
