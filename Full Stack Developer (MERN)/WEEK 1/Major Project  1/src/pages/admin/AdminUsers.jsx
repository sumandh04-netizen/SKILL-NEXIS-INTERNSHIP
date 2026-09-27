import { useEffect, useState } from "react";
import api from "../../api/api";

export default function AdminUsers(){const[users,setUsers]=useState([]);useEffect(()=>{api.get("/admin/users").then(r=>setUsers(r.data));},[]);return <main className="page-shell py-10"><span className="eyebrow">Admin</span><h1 className="page-title">Users</h1><div className="mt-8 grid gap-3">{users.map(u=><div key={u._id} className="glass-card flex items-center justify-between p-5"><div><b>{u.name}</b><div className="text-sm text-slate-500">{u.email}</div></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold capitalize dark:bg-slate-800">{u.role}</span></div>)}</div></main>}
