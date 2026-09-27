import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200/80 bg-white/70 dark:border-slate-800 dark:bg-slate-950/70">
      <div className="page-shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="text-xl font-black">SHOP<span className="text-pink-500">LOOP</span></div>
          <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">A premium, modern shopping experience built around clean design, fast discovery and delightful micro-interactions.</p>
          <div className="mt-5 flex gap-2">
            <button className="icon-btn"><Instagram size={17}/></button><button className="icon-btn"><Facebook size={17}/></button><button className="icon-btn"><Twitter size={17}/></button>
          </div>
        </div>
        <FooterCol title="Shop" links={[["Products","/products"],["Categories","/categories"],["Wishlist","/wishlist"],["Cart","/cart"]]} />
        <FooterCol title="Account" links={[["Profile","/profile"],["Orders","/orders"],["Login","/login"]]} />
        <div>
          <h3 className="font-bold">Stay in the loop</h3>
          <p className="mt-2 text-sm text-slate-500">New arrivals, drops and exclusive offers.</p>
          <div className="mt-4 flex rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-900">
            <Mail className="m-2 text-slate-400" size={17}/>
            <input className="min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="Email address"/>
            <button className="rounded-lg bg-slate-950 px-3 text-xs font-bold text-white dark:bg-white dark:text-slate-950">Join</button>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 py-5 text-center text-xs text-slate-500 dark:border-slate-800">© {new Date().getFullYear()} SHOPLOOP. Built by Suman D H.</div>
    </footer>
  );
}
function FooterCol({ title, links }) {
  return <div><h3 className="font-bold">{title}</h3><div className="mt-4 grid gap-3 text-sm text-slate-500">{links.map(([label,path]) => <Link key={path} to={path} className="hover:text-pink-500">{label}</Link>)}</div></div>;
}
