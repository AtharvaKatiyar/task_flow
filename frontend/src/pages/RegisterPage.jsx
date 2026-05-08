import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { getApiErrorMessage } from "../utils/api.js";

const initialState = {
  email: "",
  password: "",
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, loading, error, setError } = useAuth();
  const { toggleTheme } = useTheme();
  const [form, setForm] = useState(initialState);
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalError("");

    try {
      await register(form);
      navigate("/dashboard", { replace: true });
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
        <section style={{ border: "3px solid var(--color-border)", padding: "48px", order: 2 }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: 900,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            REGISTER
          </h2>
          <p style={{ fontSize: "12px", marginBottom: "24px", opacity: 0.8 }}>
            Create your account in seconds and start managing tasks.
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
                htmlFor="register-email"
              >
                Email
              </label>
              <input
                id="register-email"
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
                placeholder="you@example.com"
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
                htmlFor="register-password"
              >
                Password
              </label>
              <input
                id="register-password"
                type="password"
                autoComplete="new-password"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "2px solid var(--color-border)",
                  fontSize: "14px",
                  fontFamily: "inherit",
                }}
                placeholder="At least 6 characters"
                minLength={6}
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
              {loading ? "CREATING..." : "CREATE ACCOUNT"}
            </button>
          </form>

          <p style={{ fontSize: "12px", marginTop: "20px", opacity: 0.8 }}>
            Already registered?{" "}
            <Link
              to="/login"
              style={{
                fontWeight: 700,
                textDecoration: "underline",
              }}
            >
              SIGN IN HERE
            </Link>
          </p>
        </section>

        <section
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            border: "3px solid var(--color-border)",
            padding: "48px",
            order: 1,
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
            BUILD WITH PURPOSE
          </h1>
          <p style={{ fontSize: "13px", lineHeight: "1.8" }}>
            Clean architecture. Minimalist design. Maximum functionality. A brutalist approach to task management that speaks through clarity, not decoration.
          </p>
        </section>
      </div>
    </div>
  );
}
