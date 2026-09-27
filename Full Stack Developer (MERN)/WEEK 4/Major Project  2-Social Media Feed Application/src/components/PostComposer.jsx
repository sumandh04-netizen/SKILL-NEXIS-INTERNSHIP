import { useRef, useState } from "react";
import { Image, Video, Smile, Hash, MapPin, Sparkles } from "lucide-react";
import api from "../services/api";

export default function PostComposer({ onCreated }) {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(false);
  const input = useRef();
  const submit = async () => {
    if (!content.trim() && !files.length) return;
    const form = new FormData();
    form.append("content", content);
    files.forEach((file) => form.append("media", file));
    setBusy(true);
    try { const r = await api.post("/posts", form, { headers: { "Content-Type": "multipart/form-data" } }); setContent(""); setFiles([]); onCreated?.(r.data.data); } finally { setBusy(false); }
  };
  return <section className="card composer"><div className="composer-head"><img className="avatar" src="https://i.pravatar.cc/80?img=12" alt=""/><textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="What's on your mind?"/></div>{files.length > 0 && <div className="upload-preview">{files.map((f) => <img key={f.name} src={URL.createObjectURL(f)} alt={f.name}/>)}</div>}<div className="composer-tools"><button onClick={() => input.current?.click()}><Image/> Photo</button><button onClick={() => input.current?.click()}><Video/> Video</button><button><Smile/> Feeling</button><button><Hash/> Hashtag</button><button className="ai-chip" onClick={() => alert("Open AI Assistant to generate a caption.")}><Sparkles/> AI Assist</button><input ref={input} hidden type="file" accept="image/*,video/*" multiple onChange={(e) => setFiles([...e.target.files])}/><button className="primary-btn post-btn" disabled={busy} onClick={submit}>{busy ? "Posting…" : "Post"}</button></div></section>;
}
