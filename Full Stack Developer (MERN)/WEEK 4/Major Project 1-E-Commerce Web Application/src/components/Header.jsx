import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Heart, Menu, Search, ShoppingBag, User, X, Moon, Sun, LogOut, LayoutDashboard } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Header({ onCart }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { totalItems } = useCart();
  const { items: wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const navigate = useNavigate();

  function search(e) {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/80 backdrop-blur-2xl dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="page-shell flex h-16 items-center gap-3">
        <button className="md:hidden" onClick={() => setOpen(v => !v)} aria-label="Open menu">
          {open ? <X /> : <Menu />}
        </button>

        <Link to="/" className="flex shrink-0 items-center gap-2 text-xl font-black tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-slate-950 text-white dark:bg-white dark:text-slate-950"><ShoppingBag size={19} /></span>
          SHOP<span className="text-pink-500">LOOP</span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-semibold md:flex">
          {["/", "/products", "/categories"].map((path, i) => (
            <NavLink key={path} to={path} className={({isActive}) => isActive ? "text-pink-500" : "text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"}>
              {["Home", "Products", "Categories"][i]}
            </NavLink>
          ))}
        </nav>

        <form onSubmit={search} className="mx-auto hidden max-w-xl flex-1 items-center rounded-2xl border border-slate-200 bg-white/80 px-3 shadow-sm md:flex dark:border-slate-700 dark:bg-slate-900">
          <Search size={17} className="text-slate-400" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products, brands and more..." className="w-full bg-transparent px-3 py-2.5 text-sm outline-none" />
        </form>

        <div className="ml-auto flex items-center gap-1">
          <button onClick={toggle} className="icon-btn" aria-label="Toggle dark mode">{dark ? <Sun size={19} /> : <Moon size={19} />}</button>
          <Link to="/wishlist" className="icon-btn relative" aria-label="Wishlist"><Heart size={19} />{wishlist.length > 0 && <Badge value={wishlist.length} />}</Link>
          <button onClick={onCart} className="icon-btn relative" aria-label="Cart"><ShoppingBag size={19} />{totalItems > 0 && <Badge value={totalItems} />}</button>
          <div className="relative hidden sm:block">
            <Link to={user ? "/profile" : "/login"} className="icon-btn" aria-label="Account">{user ? <User size={19} /> : <User size={19} />}</Link>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-5 py-4 shadow-lg md:hidden dark:border-slate-800 dark:bg-slate-950">
          <form onSubmit={search} className="mb-4 flex items-center rounded-xl border border-slate-200 px-3 dark:border-slate-700">
            <Search size={17} className="text-slate-400" />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search..." className="w-full bg-transparent px-3 py-3 outline-none" />
          </form>
          <div className="grid gap-2 text-sm font-semibold">
            <Link onClick={() => setOpen(false)} to="/">Home</Link>
            <Link onClick={() => setOpen(false)} to="/products">Products</Link>
            <Link onClick={() => setOpen(false)} to="/categories">Categories</Link>
            {user && <Link onClick={() => setOpen(false)} to="/orders">Orders</Link>}
            {user?.role === "admin" && <Link onClick={() => setOpen(false)} to="/admin">Admin Dashboard</Link>}
            {user && <button onClick={() => { logout(); setOpen(false); }} className="flex items-center gap-2 pt-2 text-left"><LogOut size={16}/>Logout</button>}
          </div>
        </div>
      )}
    </header>
  );
}

function Badge({ value }) {
  return <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-pink-500 px-1 text-[9px] font-bold text-white">{value}</span>;
}
