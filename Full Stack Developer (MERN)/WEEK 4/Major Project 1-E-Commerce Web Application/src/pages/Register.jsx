import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form,setForm]=useState({name:"",email:"",password:"",confirm:""});
  const [busy,setBusy]=useState(false); const {register}=useAuth(); const navigate=useNavigate();
  async function submit(e){e.preventDefault();if(form.password!==form.confirm)return toast.error("Passwords do not match");setBusy(true);try{await register(form.name,form.email,form.password);toast.success("Account created");navigate("/");}catch(err){toast.error(err.response?.data?.message||"Registration failed");}finally{setBusy(false);}}
  return <main className="page-shell grid min-h-[75vh] place-items-center py-10"><div className="w-full max-w-md glass-card p-7 sm:p-9"><h1 className="text-3xl font-black">Create account</h1><p className="mt-2 text-sm text-slate-500">Join the premium SHOPLOOP experience.</p><form onSubmit={submit} className="mt-7 space-y-4">{[[UserRound,"name","Full name","text"],[Mail,"email","Email","email"],[Lock,"password","Password","password"],[Lock,"confirm","Confirm password","password"]].map(([I,k,p,t])=><div key={k} className="flex items-center rounded-xl border border-slate-200 bg-white px-3 dark:border-slate-700 dark:bg-slate-900"><I size={17} className="text-slate-400"/><input required type={t} placeholder={p} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} className="w-full bg-transparent px-3 py-3.5 text-sm outline-none"/></div>)}<button disabled={busy} className="btn-primary w-full justify-center">{busy?"Creating…":"Create account"}</button></form><p className="mt-5 text-center text-sm text-slate-500">Already have an account? <Link className="font-bold text-pink-500" to="/login">Sign in</Link></p></div></main>;
}
