/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import client from "../api/client.js";
import { authStorage } from "../utils/storage.js";
import { getApiErrorMessage } from "../utils/api.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(authStorage.getToken());
  const [user, setUser] = useState(authStorage.getUser());
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setInitialized(true);
        return;
      }

      try {
        const response = await client.get("/auth/me");
        setUser(response.data.data);
        authStorage.setUser(response.data.data);
      } catch (requestError) {
        authStorage.clear();
        setToken(null);
        setUser(null);
        setError(getApiErrorMessage(requestError));
      } finally {
        setInitialized(true);
      }
    };

    bootstrap();
  }, []);

  const persistAuth = (nextToken, nextUser) => {
    authStorage.setToken(nextToken);
    authStorage.setUser(nextUser);
    setToken(nextToken);
    setUser(nextUser);
  };

  const login = async (credentials) => {
    setLoading(true);
    setError("");

    try {
      const response = await client.post("/auth/login", credentials);
      const { token: nextToken, user: nextUser } = response.data.data;
      persistAuth(nextToken, nextUser);
      return response.data.data;
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
      throw requestError;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    setError("");

    try {
      const response = await client.post("/auth/register", payload);
      const { token: nextToken, user: nextUser } = response.data.data;
      persistAuth(nextToken, nextUser);
      return response.data.data;
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
      throw requestError;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authStorage.clear();
    setToken(null);
    setUser(null);
    setError("");
  };

  const value = useMemo(
    () => ({
      token,
      user,
      initialized,
      loading,
      error,
      login,
      register,
      logout,
      setError,
    }),
    [token, user, initialized, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
