import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Truck } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-10 sm:py-16">
      <div className="blob blob-pink" />
      <div className="blob blob-blue" />
      <div className="page-shell relative grid items-center gap-8 lg:grid-cols-[1.05fr_.95fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
          <span className="pill"><Sparkles size={14}/> Summer premium drop</span>
          <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[.95] tracking-tight sm:text-6xl lg:text-7xl">
            Upgrade your <span className="gradient-text">everyday.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
            Discover curated electronics, fashion, beauty, home and lifestyle essentials with a smooth shopping experience.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/products" className="btn-primary">Shop now <ArrowRight size={17}/></Link>
            <Link to="/categories" className="btn-secondary">Explore collections</Link>
          </div>
          <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
            {[["Fast delivery", Truck], ["Secure checkout", ShieldCheck], ["Curated quality", Sparkles]].map(([t,Icon]) => <div key={t} className="glass-mini"><Icon size={17} className="text-pink-500"/><span>{t}</span></div>)}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7, delay: .1 }} className="relative">
          <div className="hero-card">
            <div className="absolute left-6 top-6 z-10 rounded-2xl bg-white/80 px-4 py-3 shadow-lg backdrop-blur-xl dark:bg-slate-950/70">
              <div className="text-xs text-slate-500">Featured collection</div>
              <div className="mt-1 font-black">Up to 50% off</div>
            </div>
            <div className="hero-orb" />
            <img src="https://placehold.co/900x650/eef2ff/111827.png?text=Premium+Collection" alt="Premium collection" className="relative z-[1] h-full w-full rounded-[28px] object-cover mix-blend-multiply dark:mix-blend-normal" />
            <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between rounded-2xl border border-white/70 bg-white/75 p-3 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-950/70">
              <div><div className="text-xs text-slate-500">Trending now</div><div className="font-bold">Premium picks for you</div></div>
              <Link to="/products" className="rounded-xl bg-slate-950 px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-slate-950">Discover</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
