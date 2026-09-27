import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Home, Compass, Bell, MessageCircle, UserCircle, Bookmark, Settings, Bot, Plus, LogOut, Search, Moon, Sun } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Layout() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const nav = [
    ["Home", "/home", Home], ["Explore", "/explore", Compass], ["AI Assistant", "/ai", Bot], ["Messages", "/messages", MessageCircle], ["Notifications", "/notifications", Bell], ["Profile", `/profile/${user?.username}`, UserCircle], ["Saved", "/saved", Bookmark], ["Settings", "/settings", Settings]
  ];
  return <div className="app-shell">
    <header className="mobile-header"><button className="brand" onClick={() => navigate("/home")}><span className="brand-mark">●</span> SocialHub</button><button className="icon-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? <Sun /> : <Moon />}</button></header>
    <aside className="sidebar">
      <button className="brand" onClick={() => navigate("/home")}><span className="brand-mark">●</span><span>SocialHub</span></button>
      <p className="tagline">Connect · Share · Grow</p>
      <nav>{nav.map(([label, to, Icon]) => <NavLink key={label} to={to} className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}><Icon size={19}/><span>{label}</span></NavLink>)}</nav>
      <button className="primary-btn create-btn" onClick={() => navigate("/create")}><Plus size={18}/> Create Post</button>
      <div className="sidebar-bottom"><button className="icon-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">{theme === "dark" ? <Sun /> : <Moon />}</button><button className="nav-item" onClick={logout}><LogOut size={18}/> Logout</button></div>
    </aside>
    <main className="main-content"><div className="topbar"><div className="search-box"><Search size={18}/><input placeholder="Search people, posts, hashtags…" onKeyDown={(e) => e.key === "Enter" && navigate(`/explore?q=${encodeURIComponent(e.currentTarget.value)}`)}/></div><button className="icon-btn" onClick={() => navigate("/notifications")}><Bell /></button><img className="avatar small" src={user?.avatar || "https://i.pravatar.cc/80?img=12"} alt={user?.fullName || "Profile"}/></div><Outlet /></main>
    <nav className="mobile-nav">{nav.slice(0, 5).map(([label, to, Icon]) => <NavLink key={label} to={to}><Icon size={20}/><span>{label.split(" ")[0]}</span></NavLink>)}</nav>
  </div>;
}
