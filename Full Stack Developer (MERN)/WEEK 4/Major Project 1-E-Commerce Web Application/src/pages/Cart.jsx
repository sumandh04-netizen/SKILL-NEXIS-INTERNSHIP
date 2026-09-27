import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import EmptyState from "../components/EmptyState";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";

export default function Cart() {
  const { items, subtotal, updateQuantity, removeFromCart } = useCart();
  if (!items.length) return <main className="page-shell py-16"><EmptyState title="Your cart is waiting" text="Add a few premium picks and they'll appear here."/></main>;
  const shipping = subtotal >= 999 ? 0 : 79;
  const tax = Math.round(subtotal * .05);
  const total = subtotal + shipping + tax;
  return <main className="page-shell py-10"><h1 className="page-title">Your cart</h1><div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]"><div className="space-y-3">{items.map(item => <div key={item.product} className="glass-card flex gap-4 p-4"><img src={item.image} alt="" className="h-28 w-28 rounded-2xl object-cover"/><div className="min-w-0 flex-1"><div className="font-bold">{item.name}</div><div className="mt-2 text-[#067D62]">{formatPrice(item.price)}</div><div className="mt-4 flex items-center gap-2"><button className="qty" onClick={() => updateQuantity(item.product,item.quantity-1)}><Minus size={14}/></button><span>{item.quantity}</span><button className="qty" onClick={() => updateQuantity(item.product,item.quantity+1)}><Plus size={14}/></button></div></div><button onClick={() => removeFromCart(item.product)} className="text-slate-400 hover:text-red-500"><Trash2 size={18}/></button></div>)}</div><div className="glass-card h-fit p-6"><h2 className="font-black">Order summary</h2><div className="mt-5 space-y-3 text-sm"><div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div><div className="flex justify-between"><span>Tax</span><span>{formatPrice(tax)}</span></div><div className="flex justify-between"><span>Shipping</span><span>{shipping ? formatPrice(shipping) : "Free"}</span></div><div className="border-t pt-4 text-lg font-black dark:border-slate-800"><div className="flex justify-between"><span>Total</span><span>{formatPrice(total)}</span></div></div></div><Link to="/checkout" className="btn-primary mt-5 w-full justify-center">Continue to checkout</Link></div></div></main>;
}
