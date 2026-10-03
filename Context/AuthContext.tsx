"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  ReactNode,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  phone: string;
  userId: string;
  isInitialized: boolean;
  login: (phone: string, userId: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const getIsLoggedIn = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return localStorage.getItem("isLoggedIn") === "true";
};

const getPhone = () => {
  if (typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem("phone") || "";
};

const getUserId = () => {
  if (typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem("userId") || "";
};

const subscribe = (callback: () => void) => {
  window.addEventListener("auth-change", callback);

  return () => {
    window.removeEventListener("auth-change", callback);
  };
};

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const isLoggedIn = useSyncExternalStore(
    subscribe,
    getIsLoggedIn,
    () => false
  );

  const phone = useSyncExternalStore(
    subscribe,
    getPhone,
    () => ""
  );

  const userId = useSyncExternalStore(
    subscribe,
    getUserId,
    () => ""
  );

  const login = (phoneNumber: string, userId: number) => {
    localStorage.setItem("phone", phoneNumber);
    localStorage.setItem("userId", String(userId));
    localStorage.setItem("isLoggedIn", "true");

    window.dispatchEvent(new Event("auth-change"));
  };

  const logout = () => {
    localStorage.removeItem("phone");
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");

    window.dispatchEvent(new Event("auth-change"));
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        phone,
        userId,
        isInitialized: true,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth باید داخل AuthProvider استفاده شود"
    );
  }

  return context;
}