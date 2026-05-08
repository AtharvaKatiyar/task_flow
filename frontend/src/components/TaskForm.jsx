/* eslint-disable react/prop-types */
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../utils/task.js";

const defaultValues = {
  title: "",
  description: "",
  status: "PENDING",
  priority: "MEDIUM",
};

export default function TaskForm({
  value,
  onChange,
  onSubmit,
  isSubmitting,
  submitLabel,
  onCancel,
  title,
  description,
}) {
  const formValue = value || defaultValues;

  const handleFieldChange = (event) => {
    const { name, value: nextValue } = event.target;
    onChange({ ...formValue, [name]: nextValue });
  };

  return (
    <section
      style={{
        border: "3px solid var(--color-border)",
        padding: "24px",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 900, marginBottom: "8px" }}>{title}</h2>
        {description ? (
          <p style={{ fontSize: "12px", opacity: 0.7 }}>{description}</p>
        ) : null}
      </div>

      <form
        style={{ display: "grid", gap: "16px" }}
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(formValue);
        }}
      >
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
            htmlFor="task-title"
          >
            Title
          </label>
          <input
            id="task-title"
            name="title"
            value={formValue.title}
            onChange={handleFieldChange}
            placeholder="Enter title"
            style={{
              width: "100%",
              padding: "12px",
              border: "2px solid var(--color-border)",
              fontSize: "14px",
              fontFamily: "inherit",
            }}
            required
            minLength={3}
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
            htmlFor="task-description"
          >
            Description
          </label>
          <textarea
            id="task-description"
            name="description"
            value={formValue.description}
            onChange={handleFieldChange}
            placeholder="Optional details"
            rows={4}
            style={{
              width: "100%",
              padding: "12px",
              border: "2px solid var(--color-border)",
              fontSize: "14px",
              fontFamily: "inherit",
              resize: "vertical",
            }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
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
              htmlFor="task-status"
            >
              Status
            </label>
            <select
              id="task-status"
              name="status"
              value={formValue.status}
              onChange={handleFieldChange}
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid var(--color-border)",
                fontSize: "14px",
                fontFamily: "inherit",
              }}
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
              htmlFor="task-priority"
            >
              Priority
            </label>
            <select
              id="task-priority"
              name="priority"
              value={formValue.priority}
              onChange={handleFieldChange}
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid var(--color-border)",
                fontSize: "14px",
                fontFamily: "inherit",
              }}
            >
              {PRIORITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              flex: 1,
              padding: "12px 16px",
              border: "2px solid var(--color-accent)",
              backgroundColor: "var(--color-accent)",
              color: "var(--color-bg)",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              opacity: isSubmitting ? 0.6 : 1,
            }}
          >
            {isSubmitting ? "Saving..." : submitLabel}
          </button>
          {onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              style={{
                flex: 1,
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
              Cancel
            </button>
          ) : null}
        </div>
      </form>
    </section>
  );
}
