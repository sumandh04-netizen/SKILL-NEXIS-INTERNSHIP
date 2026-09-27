import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("shoploop_user")); } catch { return null; }
  });
  const [loading, setLoading] = useState(Boolean(localStorage.getItem("shoploop_token")));

  useEffect(() => {
    const token = localStorage.getItem("shoploop_token");
    if (!token) return;
    api.get("/auth/me")
      .then(({ data }) => {
        setUser(data.user);
        localStorage.setItem("shoploop_user", JSON.stringify(data.user));
      })
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("shoploop_token", data.token);
    localStorage.setItem("shoploop_user", JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  }

  async function register(name, email, password) {
    const { data } = await api.post("/auth/register", { name, email, password });
    localStorage.setItem("shoploop_token", data.token);
    localStorage.setItem("shoploop_user", JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  }

  function logout() {
    localStorage.removeItem("shoploop_token");
    localStorage.removeItem("shoploop_user");
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
