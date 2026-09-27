import { useRef, useState } from "react";
import { Heart, ShoppingBag, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { formatPrice } from "../utils/formatPrice";

export default function ProductCard({ product, onFlyToCart }) {
  const imgRef = useRef(null);
  const [busy, setBusy] = useState(false);

  const { addToCart } = useCart();
  const { toggle, has } = useWishlist();

  const image =
    product.images?.[0] ||
    "https://placehold.co/900x700/f1f5f9/334155?text=Product+Image";

  function add() {
    setBusy(true);

    addToCart(product);
    onFlyToCart?.(imgRef.current);

    toast.success("Added to cart");

    setTimeout(() => {
      setBusy(false);
    }, 500);
  }

  function wish() {
    const added = toggle(product);

    toast.success(
      added ? "Added to wishlist" : "Removed from wishlist"
    );
  }

  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className="
        group relative overflow-hidden rounded-2xl
        border border-slate-200/70
        bg-white p-3 shadow-sm
        transition-shadow hover:shadow-premium
        dark:border-slate-800 dark:bg-slate-900
      "
    >
      {/* ================= IMAGE ================= */}

      <div
        className="
          relative overflow-hidden rounded-xl
          bg-slate-100 dark:bg-slate-800
        "
      >
        {/* SALE BADGE */}

        {Number(product.discount) > 0 && (
          <span
            className="
              absolute left-3 top-3 z-20
              rounded-full bg-[#CC0C39]
              px-3 py-1
              text-[10px] font-bold text-white
              shadow-md
            "
          >
            SALE
          </span>
        )}

        {/* WISHLIST */}

        <button
          type="button"
          onClick={wish}
          className="
            absolute right-3 top-3 z-20
            grid h-9 w-9 place-items-center
            rounded-full bg-white/90
            shadow backdrop-blur
            transition hover:scale-110
            dark:bg-slate-950/80
          "
          aria-label="Add to wishlist"
        >
          <Heart
            size={17}
            className={
              has(product._id)
                ? "fill-pink-500 text-pink-500"
                : "text-slate-700 dark:text-white"
            }
          />
        </button>

        {/* REAL PRODUCT IMAGE */}

        <Link
          to={`/products/${product._id}`}
          className="relative block"
        >
          <img
            ref={imgRef}
            src={image}
            alt={product.name}
            loading="lazy"
            className="
              h-52 w-full
              rounded-xl
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
            onError={(event) => {
              event.currentTarget.src =
                "https://placehold.co/900x700/f1f5f9/334155?text=Product+Image";
            }}
          />

          {/* PRODUCT NAME ON ACTUAL PHOTO */}

          <div
            className="
              absolute bottom-0 left-0 right-0
              z-10
              bg-gradient-to-t
              from-black/85
              via-black/45
              to-transparent
              px-4 pb-4 pt-12
            "
          >
            <h3
              className="
                line-clamp-2
                text-base
                font-extrabold
                leading-tight
                text-white
                drop-shadow-lg
              "
            >
              {product.name}
            </h3>
          </div>
        </Link>
      </div>

      {/* ================= PRODUCT DETAILS ================= */}

      <div className="px-1 pt-4">

        <div
          className="
            text-[11px]
            font-semibold
            uppercase
            tracking-wide
            text-slate-400
          "
        >
          {product.brand || "SHOPLOOP"} ·{" "}
          {product.category || "Product"}
        </div>

        <Link
          to={`/products/${product._id}`}
          className="
            mt-1 block truncate
            font-bold
            transition
            hover:text-pink-500
          "
        >
          {product.name}
        </Link>

        {/* RATING */}

        <div className="mt-2 flex items-center gap-1 text-xs">
          <Star
            size={14}
            className="fill-amber-400 text-amber-400"
          />

          <span className="font-semibold">
            {Number(product.rating || 0).toFixed(1)}
          </span>

          <span className="text-slate-400">
            ({product.numReviews || 0})
          </span>
        </div>

        {/* PRICE */}

        <div className="mt-3 flex items-end gap-2">
          <span className="text-lg font-black text-[#067D62]">
            {formatPrice(product.price)}
          </span>

          {product.originalPrice && (
            <span className="text-xs text-slate-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}

          {Number(product.discount) > 0 && (
            <span className="ml-auto text-[10px] font-bold text-[#067D62]">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* BUTTONS */}

        <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
          <button
            type="button"
            disabled={busy || product.stock < 1}
            onClick={add}
            className="
              btn-dark
              relative overflow-hidden
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <ShoppingBag size={15} />

            {product.stock < 1
              ? "Out of stock"
              : busy
                ? "Adding..."
                : "Add to cart"}

            <span className="shine" />
          </button>

          <Link
            to={`/checkout?product=${product._id}`}
            className="btn-dark px-3"
            title="Buy now"
            aria-label="Buy now"
          >
            <Zap size={15} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}