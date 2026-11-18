"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { apiFetch } from "@/lib/api";
import type { User } from "@/lib/types";

type AuthContextValue = {
  status: "loading" | "ready";
  user: User | null;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function loadMe(): Promise<User | null> {
  try {
    return await apiFetch<User>("/auth/me");
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<"loading" | "ready">("loading");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let active = true;
    loadMe().then((me) => {
      if (!active) return;
      setUser(me);
      setStatus("ready");
    });
    return () => {
      active = false;
    };
  }, []);

  const refresh = useCallback(async () => {
    setUser(await loadMe());
    setStatus("ready");
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiFetch<unknown>("/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({ status, user, refresh, logout }),
    [status, user, refresh, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}
