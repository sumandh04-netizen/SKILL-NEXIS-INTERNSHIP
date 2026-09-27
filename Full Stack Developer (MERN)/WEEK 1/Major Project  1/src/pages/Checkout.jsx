import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";

export default function Checkout() {
  const { user } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step,setStep]=useState(1);
  const [payment,setPayment]=useState("COD");
  const [address,setAddress]=useState({fullName:user?.name||"",phone:"",line1:"",city:"",state:"",postalCode:"",country:"India"});
  const [busy,setBusy]=useState(false);
  if (!user) return <Navigate to="/login" replace />;
  if (!items.length) return <Navigate to="/cart" replace />;
  const tax=Math.round(subtotal*.05), shipping=subtotal>=999?0:79, total=subtotal+tax+shipping;
  async function place(){setBusy(true);try{const {data}=await api.post("/orders",{orderItems:items,shippingAddress:address,paymentMethod:payment});clearCart();toast.success("Order placed");navigate(`/orders/${data._id}`);}catch(err){toast.error(err.response?.data?.message||"Could not place order");}finally{setBusy(false);}}
  return <main className="page-shell py-10"><h1 className="page-title">Checkout</h1><div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]"><div className="glass-card p-6"><div className="mb-8 flex gap-2">{["Address","Review","Payment"].map((x,i)=><div key={x} className={`step ${step===i+1?"step-active":""}`}>{i+1}. {x}</div>)}</div>{step===1&&<div className="grid gap-4 sm:grid-cols-2">{Object.entries(address).filter(([k])=>k!=="country").map(([k,v])=><input key={k} value={v} placeholder={k.replace(/([A-Z])/g," $1")} onChange={e=>setAddress({...address,[k]:e.target.value})} className="input"/>) }<button onClick={()=>setStep(2)} className="btn-primary sm:col-span-2">Continue</button></div>}{step===2&&<div><h2 className="font-black">Review your delivery details</h2><pre className="mt-4 overflow-auto rounded-2xl bg-slate-50 p-4 text-xs dark:bg-slate-900">{JSON.stringify(address,null,2)}</pre><div className="mt-5 flex gap-2"><button className="btn-secondary" onClick={()=>setStep(1)}>Back</button><button className="btn-primary" onClick={()=>setStep(3)}>Continue</button></div></div>}{step===3&&<div><h2 className="font-black">Payment method</h2><div className="mt-4 grid gap-3">{[["COD","Cash on Delivery"],["DEMO_CARD","Demo Card Payment"]].map(([v,l])=><label key={v} className={`cursor-pointer rounded-2xl border p-4 ${payment===v?"border-pink-500 bg-pink-50 dark:bg-pink-950/20":"border-slate-200 dark:border-slate-800"}`}><input type="radio" checked={payment===v} onChange={()=>setPayment(v)}/> <span className="ml-2 font-semibold">{l}</span></label>)}</div><div className="mt-5 flex gap-2"><button className="btn-secondary" onClick={()=>setStep(2)}>Back</button><button disabled={busy} className="btn-primary" onClick={place}>{busy?"Placing…":"Place order"}</button></div></div>}</div><div className="glass-card h-fit p-6"><h2 className="font-black">Summary</h2><div className="mt-5 space-y-3 text-sm"><div className="flex justify-between"><span>Items</span><span>{items.reduce((s,i)=>s+i.quantity,0)}</span></div><div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div><div className="flex justify-between"><span>Tax</span><span>{formatPrice(tax)}</span></div><div className="flex justify-between"><span>Shipping</span><span>{shipping?"₹79":"Free"}</span></div><div className="border-t pt-4 text-lg font-black dark:border-slate-800"><div className="flex justify-between"><span>Total</span><span>{formatPrice(total)}</span></div></div></div></div></div></main>;
}
