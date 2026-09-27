import { useMemo, useState } from "react";
import { Heart, MessageCircle, Repeat2, Bookmark, MoreHorizontal, Send, Trash2 } from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function PostCard({ post, onDelete }) {
  const { user } = useAuth();
  const [reaction, setReaction] = useState(post.reactions?.find((r) => r.user === user?.id || r.user?._id === user?.id)?.type || null);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const counts = useMemo(() => post.reactions?.reduce((a, r) => ({ ...a, [r.type]: (a[r.type] || 0) + 1 }), {}) || {}, [post.reactions]);
  const react = async () => { const next = reaction ? "none" : "like"; await api.post(`/posts/${post._id}/reactions`, { type: next }); setReaction(next === "none" ? null : next); };
  const loadComments = async () => { const r = await api.get(`/posts/${post._id}/comments`); setComments(r.data.data); setShowComments(true); };
  const addComment = async () => { if (!commentText.trim()) return; const r = await api.post(`/posts/${post._id}/comments`, { content: commentText }); setComments([...comments, r.data.data]); setCommentText(""); };
  const deletePost = async () => { if (confirm("Delete this post?")) { await api.delete(`/posts/${post._id}`); onDelete?.(post._id); } };
  return <article className="card post-card"><div className="post-head"><div className="user-row"><img className="avatar" src={post.author?.avatar || "https://i.pravatar.cc/80?img=12"} alt=""/><div><b>{post.author?.fullName}</b><span>@{post.author?.username} · {new Date(post.createdAt).toLocaleString()}</span></div></div><button className="icon-btn" onClick={post.author?._id === user?.id ? deletePost : undefined}><MoreHorizontal/></button></div><p className="post-content">{post.content}</p>{post.media?.length > 0 && <div className={`post-media ${post.media.length > 1 ? "multi" : ""}`}>{post.media.map((m) => <img key={m.url} src={`${import.meta.env.VITE_API_ORIGIN || "http://localhost:5000"}${m.url}`} alt={m.altText || "Post media"}/>)}</div>}<div className="post-stats"><span>{Object.values(counts).reduce((a, b) => a + b, 0)} reactions</span><button onClick={loadComments}>{comments.length || ""} comments</button><span>{post.shares || 0} shares</span></div><div className="post-actions"><button className={reaction ? "active" : ""} onClick={react}><Heart/> {reaction || "Like"}</button><button onClick={loadComments}><MessageCircle/> Comment</button><button><Repeat2/> Repost</button><button onClick={() => api.post(`/posts/${post._id}/bookmark`)}><Bookmark/> Save</button><button><Send/> Share</button></div>{showComments && <div className="comments"><div className="comment-list">{comments.map((c) => <div className="comment" key={c._id}><img className="avatar small" src={c.author?.avatar || "https://i.pravatar.cc/60"} alt=""/><div><b>{c.author?.fullName}</b><p>{c.content}</p></div></div>)}</div><div className="comment-input"><input value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write a comment…"/><button onClick={addComment}><Send size={17}/></button></div></div>}</article>;
}
