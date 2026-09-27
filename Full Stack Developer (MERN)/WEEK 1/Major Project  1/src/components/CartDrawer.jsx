import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";

export default function CartDrawer({ open, onClose }) {
  const { items, subtotal, updateQuantity, removeFromCart } = useCart();
  if (!open) return null;
  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 79;
  const total = subtotal + shipping + Math.round(subtotal * .05);

  return <div className="fixed inset-0 z-[80]">
    <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-sm" onClick={onClose}/>
    <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white p-5 shadow-2xl dark:bg-slate-950">
      <div className="flex items-center justify-between border-b pb-4 dark:border-slate-800"><div className="flex items-center gap-2 font-black"><ShoppingBag size={19}/> Your cart</div><button className="icon-btn" onClick={onClose}><X/></button></div>
      <div className="flex-1 space-y-3 overflow-y-auto py-4">
        {items.length === 0 ? <div className="grid h-full place-items-center text-center text-slate-500">Your cart is empty.</div> : items.map(item => (
          <div key={item.product} className="flex gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-900">
            <img src={item.image} className="h-20 w-20 rounded-xl object-cover" alt="" />
            <div className="min-w-0 flex-1"><div className="truncate font-bold">{item.name}</div><div className="mt-1 text-sm text-[#067D62]">{formatPrice(item.price)}</div>
              <div className="mt-2 flex items-center gap-2"><button onClick={() => updateQuantity(item.product, item.quantity - 1)} className="grid h-7 w-7 place-items-center rounded-lg bg-white dark:bg-slate-800"><Minus size={13}/></button><span className="text-sm">{item.quantity}</span><button onClick={() => updateQuantity(item.product, item.quantity + 1)} className="grid h-7 w-7 place-items-center rounded-lg bg-white dark:bg-slate-800"><Plus size={13}/></button></div></div>
            <button onClick={() => removeFromCart(item.product)} className="self-start text-slate-400 hover:text-red-500"><Trash2 size={16}/></button>
          </div>
        ))}
      </div>
      <div className="border-t pt-4 dark:border-slate-800"><div className="flex justify-between text-sm"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div><div className="mt-2 flex justify-between text-sm"><span>Shipping</span><span>{shipping ? formatPrice(shipping) : "Free"}</span></div><div className="mt-3 flex justify-between text-lg font-black"><span>Total</span><span>{formatPrice(total)}</span></div><Link onClick={onClose} to="/cart" className="btn-primary mt-4 w-full justify-center">View cart & checkout</Link></div>
    </aside>
  </div>;
}
