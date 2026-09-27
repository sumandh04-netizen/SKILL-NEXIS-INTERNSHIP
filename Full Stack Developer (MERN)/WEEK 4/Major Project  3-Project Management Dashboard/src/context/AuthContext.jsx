import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import api from "../services/api";

const AuthContext = createContext(null);

const TOKEN_KEY = "taskflow_token";
const USER_KEY = "taskflow_user";

function getStoredUser() {
  try {
    const storedUser =
      localStorage.getItem(USER_KEY);

    if (!storedUser) {
      return null;
    }

    return JSON.parse(storedUser);
  } catch (error) {
    console.error(
      "Failed to read stored TASKFLOW user:",
      error
    );

    localStorage.removeItem(USER_KEY);

    return null;
  }
}

function getStoredToken() {
  try {
    return localStorage.getItem(
      TOKEN_KEY
    );
  } catch (error) {
    console.error(
      "Failed to read TASKFLOW token:",
      error
    );

    return null;
  }
}

function saveAuthentication(
  token,
  user
) {
  localStorage.setItem(
    TOKEN_KEY,
    token
  );

  localStorage.setItem(
    USER_KEY,
    JSON.stringify(user)
  );
}

function clearAuthentication() {
  localStorage.removeItem(
    TOKEN_KEY
  );

  localStorage.removeItem(
    USER_KEY
  );
}

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(getStoredUser);

  const [token, setToken] =
    useState(getStoredToken);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  /* =======================================================
     LOGIN
  ======================================================== */

  async function login(data) {
    try {
      setError(null);

      const response =
        await api.post(
          "/auth/login",
          data
        );

      const {
        token: authToken,
        user: authenticatedUser,
      } = response.data;

      if (
        !authToken ||
        !authenticatedUser
      ) {
        throw new Error(
          "Invalid login response from server"
        );
      }

      saveAuthentication(
        authToken,
        authenticatedUser
      );

      setToken(authToken);

      setUser(
        authenticatedUser
      );

      return response.data;
    } catch (requestError) {
      const message =
        requestError.response?.data
          ?.message ||
        requestError.message ||
        "Login failed";

      setError(message);

      throw requestError;
    }
  }

  /* =======================================================
     REGISTER
  ======================================================== */

  async function register(data) {
    try {
      setError(null);

      const response =
        await api.post(
          "/auth/register",
          data
        );

      const {
        token: authToken,
        user: registeredUser,
      } = response.data;

      if (
        !authToken ||
        !registeredUser
      ) {
        throw new Error(
          "Invalid registration response from server"
        );
      }

      saveAuthentication(
        authToken,
        registeredUser
      );

      setToken(authToken);

      setUser(
        registeredUser
      );

      return response.data;
    } catch (requestError) {
      const message =
        requestError.response?.data
          ?.message ||
        requestError.message ||
        "Registration failed";

      setError(message);

      throw requestError;
    }
  }

  /* =======================================================
     LOGOUT
  ======================================================== */

  function logout() {
    clearAuthentication();

    setToken(null);

    setUser(null);

    setError(null);
  }

  /* =======================================================
     CLEAR AUTH ERROR
  ======================================================== */

  function clearError() {
    setError(null);
  }

  /* =======================================================
     CHECK INITIAL AUTH STATE
  ======================================================== */

  useEffect(() => {
    const storedToken =
      getStoredToken();

    const storedUser =
      getStoredUser();

    if (
      !storedToken ||
      !storedUser
    ) {
      clearAuthentication();

      setToken(null);

      setUser(null);
    }

    setLoading(false);
  }, []);

  /* =======================================================
     AUTOMATIC LOGOUT WHEN API RETURNS 401
  ======================================================== */

  useEffect(() => {
    const interceptor =
      api.interceptors.response.use(
        (response) =>
          response,

        (requestError) => {
          if (
            requestError.response?.status ===
            401
          ) {
            clearAuthentication();

            setToken(null);

            setUser(null);
          }

          return Promise.reject(
            requestError
          );
        }
      );

    return () => {
      api.interceptors.response.eject(
        interceptor
      );
    };
  }, []);

  /* =======================================================
     CONTEXT VALUE
  ======================================================== */

  const contextValue =
    useMemo(
      () => ({
        user,
        token,
        loading,
        error,
        isAuthenticated:
          Boolean(
            token && user
          ),
        login,
        register,
        logout,
        clearError,
      }),
      [
        user,
        token,
        loading,
        error,
      ]
    );

  return (
    <AuthContext.Provider
      value={contextValue}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* =========================================================
   useAuth HOOK
========================================================= */

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
}