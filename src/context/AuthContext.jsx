import React, { useEffect, useState } from "react";
import { AuthContext } from "./auth-context.js";
import { apiRequest, authHeaders } from "../lib/api.js";

const SESSION_KEY = "auraverde_session_v1";

function safeParse(value, fallback) {
  try {
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function loadSession() {
  if (typeof window === "undefined") return null;
  return safeParse(window.localStorage.getItem(SESSION_KEY), null);
}

function saveSession(session) {
  if (typeof window === "undefined") return;
  if (!session) {
    window.localStorage.removeItem(SESSION_KEY);
    return;
  }
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadSession());
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  useEffect(() => {
    const run = async () => {
      if (!user?.token) return;
      try {
        const response = await apiRequest("/auth/me", {
          headers: authHeaders(user.token),
        });
        const session = { ...response.data, token: user.token };
        setUser(session);
        saveSession(session);
      } catch {
        setUser(null);
        saveSession(null);
      }
    };
    run();
  }, []);

  function openAuth(mode = "login") {
    setAuthMode(mode);
    setAuthOpen(true);
  }

  function closeAuth() {
    setAuthOpen(false);
  }

  async function register(payload) {
    try {
      const response = await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          password: payload.password,
        }),
      });

      const session = {
        ...response.data.user,
        token: response.data.token,
      };
      setUser(session);
      saveSession(session);
      setAuthOpen(false);
      return { ok: true };
    } catch (error) {
      return { ok: false, message: error.message || "No se pudo registrar" };
    }
  }

  async function login(payload) {
    try {
      const response = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
        }),
      });

      const session = {
        ...response.data.user,
        token: response.data.token,
      };
      setUser(session);
      saveSession(session);
      setAuthOpen(false);
      return { ok: true };
    } catch (error) {
      return { ok: false, message: error.message || "Credenciales inválidas" };
    }
  }

  function logout() {
    setUser(null);
    saveSession(null);
  }

  const value = {
    user,
    authOpen,
    authMode,
    setAuthMode,
    openAuth,
    closeAuth,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
