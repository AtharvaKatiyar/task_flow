import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { getApiErrorMessage } from "../utils/api.js";

const initialState = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, error, setError } = useAuth();
  const { toggleTheme } = useTheme();
  const [form, setForm] = useState(initialState);
  const [localError, setLocalError] = useState("");

  const destination = useMemo(
    () => location.state?.from?.pathname || "/dashboard",
    [location.state]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError("");

    try {
      await login(form);
      navigate(destination, { replace: true });
    } catch (requestError) {
      setLocalError(getApiErrorMessage(requestError));
      setError("");
    }
  };

  const message = localError || error;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        position: "relative",
      }}
    >
      <button
        type="button"
        onClick={toggleTheme}
        style={{
          position: "absolute",
          top: "24px",
          right: "24px",
          padding: "8px 12px",
          border: "2px solid var(--color-border)",
          backgroundColor: "transparent",
          fontSize: "11px",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          cursor: "pointer",
        }}
        title="Toggle dark/light mode"
      >
        ◐ Theme
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "32px",
          maxWidth: "1000px",
          width: "100%",
        }}
      >
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            border: "3px solid var(--color-border)",
            padding: "48px",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              fontWeight: 900,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            TASKFLOW
          </h1>
          <p style={{ fontSize: "13px", lineHeight: "1.8", marginBottom: "24px" }}>
            A full-stack task management system with JWT authentication, protected routing, and comprehensive CRUD operations.
          </p>
          <div style={{ display: "grid", gap: "12px" }}>
            <div style={{ border: "1px solid var(--color-border)", padding: "12px", fontSize: "11px" }}>
              JWT stored in localStorage
            </div>
            <div style={{ border: "1px solid var(--color-border)", padding: "12px", fontSize: "11px" }}>
              Protected routes & token validation
            </div>
            <div style={{ border: "1px solid var(--color-border)", padding: "12px", fontSize: "11px" }}>
              Full task CRUD with filtering
            </div>
          </div>
        </section>

        <section style={{ border: "3px solid var(--color-border)", padding: "48px" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: 900,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            LOGIN
          </h2>
          <p style={{ fontSize: "12px", marginBottom: "24px", opacity: 0.8 }}>
            Enter your credentials to access your dashboard.
          </p>

          <form style={{ display: "grid", gap: "16px" }} onSubmit={handleSubmit}>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "6px",
                }}
                htmlFor="login-email"
              >
                Email
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid var(--color-border)",
                  fontSize: "14px",
                  fontFamily: "inherit",
                }}
                placeholder="user@example.com"
                required
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "6px",
                }}
                htmlFor="login-password"
              >
                Password
              </label>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid var(--color-border)",
                  fontSize: "14px",
                  fontFamily: "inherit",
                }}
                placeholder="••••••••"
                required
              />
            </div>

            {message ? (
              <div
                style={{
                  border: "2px solid var(--color-accent)",
                  backgroundColor: "rgba(211, 47, 47, 0.1)",
                  padding: "12px",
                  fontSize: "12px",
                  color: "var(--color-accent)",
                }}
              >
                {message}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "12px 16px",
                border: "2px solid var(--color-accent)",
                backgroundColor: "var(--color-accent)",
                color: "var(--color-bg)",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </button>
          </form>

          <p style={{ fontSize: "12px", marginTop: "20px", opacity: 0.8 }}>
            No account?{" "}
            <Link
              to="/register"
              style={{
                fontWeight: 700,
                textDecoration: "underline",
              }}
            >
              REGISTER HERE
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
