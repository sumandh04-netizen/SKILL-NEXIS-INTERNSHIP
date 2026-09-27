import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const ACCESS_TOKEN_KEY = "socialhub_access_token";
const REFRESH_TOKEN_KEY = "socialhub_refresh_token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (!token) {
      setLoading(false);
      return undefined;
    }

    api
      .get("/users/me")
      .then((response) => {
        if (mounted) {
          setUser(response.data?.data ?? null);
        }
      })
      .catch(() => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        if (mounted) {
          setUser(null);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const login = async (emailOrUsername, password) => {
    const response = await api.post("/auth/login", {
      emailOrUsername: emailOrUsername.trim(),
      password,
    });

    const data = response.data.data;
    localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
    setUser(data.user);
  };

  const register = async (formData) => {
    const response = await api.post("/auth/register", formData);
    const data = response.data.data;

    localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
    setUser(data.user);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // The local session is still cleared when the server is unavailable.
    } finally {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
