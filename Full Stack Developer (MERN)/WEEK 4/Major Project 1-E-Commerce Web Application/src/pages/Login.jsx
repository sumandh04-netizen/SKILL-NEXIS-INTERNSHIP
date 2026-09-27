import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Lock, Mail, ShoppingBag } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form,setForm]=useState({email:"",password:""});
  const [busy,setBusy]=useState(false);
  const {login}=useAuth(); const navigate=useNavigate(); const location=useLocation();
  async function submit(e){e.preventDefault();setBusy(true);try{await login(form.email,form.password);toast.success("Welcome back");navigate(location.state?.from || "/");}catch(err){toast.error(err.response?.data?.message||"Login failed");}finally{setBusy(false);}}
  return <AuthLayout title="Welcome back" subtitle="Sign in to continue your SHOPLOOP journey."><form onSubmit={submit} className="space-y-4"><Field icon={Mail} placeholder="Email" value={form.email} onChange={v=>setForm({...form,email:v})}/><Field icon={Lock} type="password" placeholder="Password" value={form.password} onChange={v=>setForm({...form,password:v})}/><button disabled={busy} className="btn-primary w-full justify-center">{busy?"Signing in…":"Sign in"}</button></form><p className="mt-5 text-center text-sm text-slate-500">New here? <Link className="font-bold text-pink-500" to="/register">Create account</Link></p><p className="mt-4 text-center text-xs text-slate-400">Admin demo: admin@shoploop.local / Admin@12345</p></AuthLayout>;
}
function Field({icon:Icon,type="text",placeholder,value,onChange}){return <div className="flex items-center rounded-xl border border-slate-200 bg-white px-3 dark:border-slate-700 dark:bg-slate-900"><Icon size={17} className="text-slate-400"/><input required type={type} placeholder={placeholder} value={value} onChange={e=>onChange(e.target.value)} className="w-full bg-transparent px-3 py-3.5 text-sm outline-none"/></div>}
function AuthLayout({title,subtitle,children}){return <main className="page-shell grid min-h-[75vh] place-items-center py-10"><div className="w-full max-w-md glass-card p-7 sm:p-9"><div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950"><ShoppingBag/></div><h1 className="mt-5 text-center text-3xl font-black">{title}</h1><p className="mt-2 text-center text-sm text-slate-500">{subtitle}</p><div className="mt-7">{children}</div></div></main>}
