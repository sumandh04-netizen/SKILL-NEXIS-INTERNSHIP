import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyState({ title = "Nothing here yet", text = "Explore SHOPLOOP and discover something you love." }) {
  return (
    <div className="glass-card flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-5 rounded-full bg-slate-100 p-5 dark:bg-slate-800"><ShoppingBag /></div>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-slate-500">{text}</p>
      <Link to="/products" className="btn-primary mt-6">Explore products</Link>
    </div>
  );
}
