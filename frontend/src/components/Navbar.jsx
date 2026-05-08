/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

// eslint-disable-next-line no-unused-vars
export default function Navbar({ user }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header
      style={{
        borderBottom: "3px solid var(--color-border)",
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "24px",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "16px",
            fontWeight: 900,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "4px",
          }}
        >
          TASKFLOW
        </h1>
        {user ? (
          <p
            style={{
              fontSize: "11px",
              fontWeight: 400,
              color: "var(--color-fg)",
              opacity: 0.7,
              margin: 0,
            }}
          >
            {user.email}
          </p>
        ) : null}
      </div>

      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <button
          type="button"
          onClick={toggleTheme}
          style={{
            padding: "12px 16px",
            border: "2px solid var(--color-border)",
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            cursor: "pointer",
            backgroundColor: "transparent",
          }}
          title="Toggle dark/light mode"
        >
          ◐ Theme
        </button>
        <Link
          to="/dashboard"
          style={{
            padding: "12px 16px",
            border: "2px solid var(--color-border)",
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            cursor: "pointer",
            backgroundColor: "transparent",
          }}
        >
          Dashboard
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          style={{
            padding: "12px 16px",
            border: "2px solid var(--color-accent)",
            backgroundColor: "var(--color-accent)",
            color: "var(--color-bg)",
            fontSize: "11px",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
