import { useEffect, useState } from "react";
import { Filter, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import api from "../api/api";
import ProductGrid from "../components/ProductGrid";
import { categories, sortOptions } from "../utils/constants";

export default function Products({ onFlyToCart }) {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilter, setMobileFilter] = useState(false);
  const category = params.get("category") || "";
  const search = params.get("search") || "";
  const sort = params.get("sort") || "relevance";
  const [brand, setBrand] = useState(params.get("brand") || "");
  const [minPrice, setMinPrice] = useState(params.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(params.get("maxPrice") || "");

  useEffect(() => {
    setLoading(true);
    api.get("/products", { params: { category, search, sort, brand, minPrice, maxPrice, limit: 20 } })
      .then(r => setProducts(r.data.products))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [category, search, sort, brand, minPrice, maxPrice]);

  function applyFilters() {
    const next = new URLSearchParams(params);
    brand ? next.set("brand", brand) : next.delete("brand");
    minPrice ? next.set("minPrice", minPrice) : next.delete("minPrice");
    maxPrice ? next.set("maxPrice", maxPrice) : next.delete("maxPrice");
    setParams(next);
    setMobileFilter(false);
  }

  const filters = <div className="space-y-5">
    <div><label className="label">Category</label><select value={category} onChange={e => { const n = new URLSearchParams(params); e.target.value ? n.set("category", e.target.value) : n.delete("category"); setParams(n); }} className="input">{categories.map(c => <option key={c} value={c === "All" ? "" : c}>{c}</option>)}</select></div>
    <div><label className="label">Brand</label><input value={brand} onChange={e => setBrand(e.target.value)} className="input" placeholder="e.g. SoundMax"/></div>
    <div className="grid grid-cols-2 gap-2"><div><label className="label">Min price</label><input value={minPrice} onChange={e => setMinPrice(e.target.value)} type="number" className="input" placeholder="0"/></div><div><label className="label">Max price</label><input value={maxPrice} onChange={e => setMaxPrice(e.target.value)} type="number" className="input" placeholder="50000"/></div></div>
    <button onClick={applyFilters} className="btn-dark w-full justify-center"><Filter size={15}/>Apply filters</button>
  </div>;

  return <main className="page-shell py-10">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div><span className="eyebrow">Collection</span><h1 className="page-title">{search ? `Results for “${search}”` : category || "All products"}</h1><p className="mt-2 text-sm text-slate-500">Curated picks with premium design and everyday value.</p></div>
      <div className="flex gap-2"><button className="btn-secondary md:hidden" onClick={() => setMobileFilter(true)}><SlidersHorizontal size={15}/> Filters</button><select value={sort} onChange={e => { const n = new URLSearchParams(params); n.set("sort", e.target.value); setParams(n); }} className="input w-auto min-w-44">{sortOptions.map(([v,l]) => <option key={v} value={v}>{l}</option>)}</select></div>
    </div>
    <div className="mt-8 grid gap-8 md:grid-cols-[230px_1fr]">
      <aside className="hidden rounded-2xl border border-slate-200 bg-white/75 p-5 md:block dark:border-slate-800 dark:bg-slate-900/75">{filters}</aside>
      <ProductGrid products={products} loading={loading} onFlyToCart={onFlyToCart}/>
    </div>
    {mobileFilter && <div className="fixed inset-0 z-[70] md:hidden"><div className="absolute inset-0 bg-black/30" onClick={() => setMobileFilter(false)}/><div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-6 dark:bg-slate-950">{filters}</div></div>}
  </main>;
}
