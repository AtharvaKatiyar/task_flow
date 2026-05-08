/* eslint-disable react/prop-types */
import { priorityLabel, statusLabel } from "../utils/task.js";

export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <article
      style={{
        border: "2px solid var(--color-border)",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
        <div>
          <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "4px" }}>
            {task.title}
          </h3>
          <p
            style={{
              fontSize: "12px",
              opacity: 0.8,
              marginBottom: "8px",
            }}
          >
            {task.description || "—"}
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", minWidth: "100px" }}>
          <div
            style={{
              border: "1px solid var(--color-border)",
              padding: "4px 8px",
              fontSize: "10px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {statusLabel(task.status)}
          </div>
          <div
            style={{
              border: "1px solid var(--color-border)",
              padding: "4px 8px",
              fontSize: "10px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {priorityLabel(task.priority)}
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "8px" }}>
        <p
          style={{
            fontSize: "10px",
            opacity: 0.6,
            marginBottom: "8px",
          }}
        >
          {new Date(task.updatedAt).toLocaleString()}
        </p>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            type="button"
            onClick={() => onEdit(task)}
            style={{
              padding: "8px 12px",
              border: "2px solid var(--color-border)",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              cursor: "pointer",
              backgroundColor: "transparent",
              flex: 1,
            }}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(task)}
            style={{
              padding: "8px 12px",
              border: "2px solid var(--color-accent)",
              backgroundColor: "var(--color-accent)",
              color: "var(--color-bg)",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              cursor: "pointer",
              flex: 1,
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
