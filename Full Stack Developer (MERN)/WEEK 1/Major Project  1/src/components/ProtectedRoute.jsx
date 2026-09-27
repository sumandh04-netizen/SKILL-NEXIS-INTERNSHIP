import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="page-shell grid min-h-[60vh] place-items-center">Checking account…</div>;
  return user ? children : <Navigate to="/login" state={{ from: location.pathname }} replace />;
}
