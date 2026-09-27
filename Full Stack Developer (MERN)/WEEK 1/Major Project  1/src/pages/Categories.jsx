import CategoryCard from "../components/CategoryCard";
import { categories } from "../utils/constants";

export default function Categories() {
  return <main className="page-shell py-12"><span className="eyebrow">Explore</span><h1 className="page-title">Collections for every mood</h1><p className="mt-2 max-w-2xl text-slate-500">Move through SHOPLOOP's curated categories and discover premium everyday products.</p><div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{categories.slice(1).map(c => <CategoryCard key={c} name={c}/>)}</div></main>;
}
