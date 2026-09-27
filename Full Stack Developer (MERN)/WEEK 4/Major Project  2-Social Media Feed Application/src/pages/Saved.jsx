import { useEffect, useState } from "react";
import api from "../services/api";
import PostCard from "../components/PostCard";
export default function Saved() { const [items, setItems] = useState([]); useEffect(() => { api.get("/posts/saved").then((r) => setItems(r.data.data)); }, []); return <section className="page-section narrow"><div className="page-heading"><div><h1>Saved</h1><p>Your bookmarked posts.</p></div></div>{items.map((i) => i.post && <PostCard key={i._id} post={i.post}/>)}{!items.length && <div className="card empty-state">No saved posts yet.</div>}</section>; }
