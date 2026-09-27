import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import { formatPrice } from "../utils/formatPrice";
import EmptyState from "../components/EmptyState";

export default function Orders(){const [orders,setOrders]=useState([]);useEffect(()=>{api.get("/orders").then(r=>setOrders(r.data)).catch(()=>setOrders([]));},[]);return <main className="page-shell py-10"><h1 className="page-title">Your orders</h1><div className="mt-8 space-y-3">{orders.length?orders.map(o=><Link to={`/orders/${o._id}`} key={o._id} className="glass-card flex flex-wrap items-center justify-between gap-4 p-5 hover:-translate-y-0.5"><div><div className="font-bold">Order #{o._id.slice(-8).toUpperCase()}</div><div className="mt-1 text-xs text-slate-500">{new Date(o.createdAt).toLocaleString()}</div></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold dark:bg-slate-800">{o.status}</span><span className="font-black text-[#067D62]">{formatPrice(o.total)}</span></Link>):<EmptyState title="No orders yet" text="Your completed orders will appear here."/>}</div></main>}
