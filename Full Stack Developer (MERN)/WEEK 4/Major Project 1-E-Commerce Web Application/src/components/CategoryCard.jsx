import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const icons = { Electronics:"⌁", Fashion:"◒", Beauty:"✦", Home:"⌂", Fitness:"◈", Travel:"◇", Books:"▤", Wearables:"◉" };

export default function CategoryCard({ name }) {
  return <Link to={`/products?category=${encodeURIComponent(name)}`} className="group rounded-2xl border border-white/80 bg-white/75 p-4 shadow-sm backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-premium dark:border-slate-800 dark:bg-slate-900/75">
    <div className="flex items-center justify-between"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-100 text-xl dark:bg-slate-800">{icons[name] || "✦"}</div><ArrowUpRight size={16} className="opacity-0 transition group-hover:opacity-100"/></div>
    <div className="mt-4 font-bold">{name}</div>
    <div className="mt-1 text-xs text-slate-500">Shop collection</div>
  </Link>;
}
