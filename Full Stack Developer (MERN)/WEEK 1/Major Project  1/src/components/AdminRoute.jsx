import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="page-shell grid min-h-[60vh] place-items-center">Checking admin access…</div>;
  return user?.role === "admin" ? children : <Navigate to="/" replace />;
}
