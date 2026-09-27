import { useEffect, useState } from "react";
import { ArrowRight, Clock3, ShieldCheck, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../api/api";
import HeroSection from "../components/HeroSection";
import CategoryCard from "../components/CategoryCard";
import ProductGrid from "../components/ProductGrid";
import { categories } from "../utils/constants";
import { motion } from "framer-motion";

export default function Home({ onFlyToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/products?limit=8").then(r => setProducts(r.data.products)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return <main>
    <HeroSection />
    <section className="page-shell py-8">
      <div className="section-head"><div><span className="eyebrow">Browse</span><h2 className="section-title">Shop by category</h2></div><Link to="/categories" className="link-arrow">View all <ArrowRight size={15}/></Link></div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">{categories.slice(1).map(c => <CategoryCard key={c} name={c}/>)}</div>
    </section>

    <section className="page-shell py-10">
      <div className="section-head"><div><span className="eyebrow">Trending</span><h2 className="section-title">Made to be discovered</h2></div><Link to="/products" className="link-arrow">View all <ArrowRight size={15}/></Link></div>
      <ProductGrid products={products} loading={loading} onFlyToCart={onFlyToCart}/>
    </section>

    <section className="page-shell py-8">
      <div className="promo-grid">
        <motion.div whileHover={{ scale: 1.01 }} className="promo-card bg-gradient-to-br from-pink-500 to-orange-400 text-white">
          <div><span className="text-xs font-bold uppercase tracking-[.2em] opacity-80">Flash sale</span><h3 className="mt-3 text-3xl font-black">Up to 50% off</h3><p className="mt-2 max-w-sm text-sm opacity-85">Limited-time offers across selected collections.</p><Link to="/products" className="mt-6 inline-flex rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-950">Shop sale</Link></div><Clock3 className="h-20 w-20 opacity-25"/>
        </motion.div>
        <motion.div whileHover={{ scale: 1.01 }} className="promo-card bg-gradient-to-br from-blue-500 to-violet-500 text-white">
          <div><span className="text-xs font-bold uppercase tracking-[.2em] opacity-80">New arrivals</span><h3 className="mt-3 text-3xl font-black">Fresh every week</h3><p className="mt-2 max-w-sm text-sm opacity-85">Modern essentials curated for your lifestyle.</p><Link to="/products?sort=newest" className="mt-6 inline-flex rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-950">Explore new</Link></div><Truck className="h-20 w-20 opacity-25"/>
        </motion.div>
      </div>
    </section>

    <section className="page-shell py-12">
      <div className="grid gap-4 sm:grid-cols-3">
        {[["Free delivery","On orders over ₹999",Truck],["Secure checkout","Protected account access",ShieldCheck],["Curated quality","Premium everyday picks",ArrowRight]].map(([a,b,I]) => <div key={a} className="glass-card p-6"><I className="text-pink-500"/><h3 className="mt-4 font-bold">{a}</h3><p className="mt-1 text-sm text-slate-500">{b}</p></div>)}
      </div>
    </section>
  </main>;
}
