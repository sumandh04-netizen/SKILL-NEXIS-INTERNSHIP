import { useRef, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Home from "./pages/Home";
import Products from "./pages/Products";
import SearchResults from "./pages/SearchResults";
import Categories from "./pages/Categories";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductForm from "./pages/admin/AdminProductForm";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";

function App() {
  const [cartOpen,setCartOpen]=useState(false);
  const cartRef=useRef(null);
  const [fly,setFly]=useState(null);

  function flyToCart(source) {
    const cart = document.querySelector('[aria-label="Cart"]');
    if (!source || !cart) return;
    const a=source.getBoundingClientRect(), b=cart.getBoundingClientRect();
    setFly({src:source.src, left:a.left, top:a.top, x:b.left-a.left, y:b.top-a.top});
    setTimeout(()=>{setFly(null);cart.classList.add("cart-shake");setTimeout(()=>cart.classList.remove("cart-shake"),450)},650);
  }

  return <BrowserRouter>
    <Header onCart={()=>setCartOpen(true)} />
    {fly && <motion.img initial={{scale:1,opacity:1}} animate={{x:fly.x,y:fly.y,scale:.15,opacity:.2,rotate:12}} transition={{duration:.65,ease:"easeInOut"}} src={fly.src} className="fixed z-[100] h-24 w-24 rounded-xl object-cover pointer-events-none" style={{left:fly.left,top:fly.top}}/>}
    <Routes>
      <Route path="/" element={<Home onFlyToCart={flyToCart}/>}/>
      <Route path="/products" element={<Products onFlyToCart={flyToCart}/>}/>
      <Route path="/search" element={<SearchResults onFlyToCart={flyToCart}/>}/>
      <Route path="/categories" element={<Categories/>}/>
      <Route path="/products/:id" element={<ProductDetails onFlyToCart={flyToCart}/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/wishlist" element={<Wishlist onFlyToCart={flyToCart}/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/checkout" element={<ProtectedRoute><Checkout/></ProtectedRoute>}/>
      <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
      <Route path="/orders" element={<ProtectedRoute><Orders/></ProtectedRoute>}/>
      <Route path="/orders/:id" element={<ProtectedRoute><OrderDetails/></ProtectedRoute>}/>
      <Route path="/admin" element={<AdminRoute><AdminDashboard/></AdminRoute>}/>
      <Route path="/admin/products" element={<AdminRoute><AdminProducts/></AdminRoute>}/>
      <Route path="/admin/products/new" element={<AdminRoute><AdminProductForm/></AdminRoute>}/>
      <Route path="/admin/products/:id/edit" element={<AdminRoute><AdminProductForm/></AdminRoute>}/>
      <Route path="/admin/orders" element={<AdminRoute><AdminOrders/></AdminRoute>}/>
      <Route path="/admin/users" element={<AdminRoute><AdminUsers/></AdminRoute>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    <Footer/>
    <CartDrawer open={cartOpen} onClose={()=>setCartOpen(false)}/>
    <Toaster position="bottom-right" toastOptions={{duration:2400}}/>
  </BrowserRouter>
}

export default App;
