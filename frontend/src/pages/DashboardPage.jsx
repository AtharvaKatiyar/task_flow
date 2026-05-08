import { useEffect, useMemo, useState } from "react";

import client from "../api/client.js";
import TaskCard from "../components/TaskCard.jsx";
import TaskForm from "../components/TaskForm.jsx";
import { getApiErrorMessage } from "../utils/api.js";
import { STATUS_OPTIONS } from "../utils/task.js";

const emptyTask = {
  title: "",
  description: "",
  status: "PENDING",
  priority: "MEDIUM",
};

const PAGE_SIZE = 6;

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [savingTask, setSavingTask] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState("");
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [taskForm, setTaskForm] = useState(emptyTask);

  const hasNextPage = tasks.length === PAGE_SIZE;
  const isEditing = Boolean(editingTask);

  const queryParams = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(PAGE_SIZE));

    if (statusFilter) {
      params.set("status", statusFilter);
    }

    return params.toString();
  }, [page, statusFilter]);

  const loadTasks = async () => {
    setLoadingTasks(true);
    setError("");

    try {
      const response = await client.get(`/tasks?${queryParams}`);
      setTasks(response.data.data);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [queryParams]);

  const startEdit = (task) => {
    setEditingTask(task);
    setTaskForm({
      title: task.title || "",
      description: task.description || "",
      status: task.status || "PENDING",
      priority: task.priority || "MEDIUM",
    });
    setMessage("");
    setError("");
  };

  const resetForm = () => {
    setEditingTask(null);
    setTaskForm(emptyTask);
  };

  const saveTask = async (formValue) => {
    setSavingTask(true);
    setError("");
    setMessage("");

    try {
      if (editingTask) {
        await client.put(`/tasks/${editingTask.id}`, formValue);
        setMessage("Task updated successfully.");
      } else {
        await client.post("/tasks", formValue);
        setMessage("Task created successfully.");
      }

      resetForm();
      await loadTasks();
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setSavingTask(false);
    }
  };

  const handleDelete = async (task) => {
    const confirmed = globalThis.confirm(`Delete "${task.title}"?`);

    if (!confirmed) {
      return;
    }

    setDeletingTaskId(task.id);
    setError("");
    setMessage("");

    try {
      await client.delete(`/tasks/${task.id}`);
      setMessage("Task deleted successfully.");
      await loadTasks();
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setDeletingTaskId("");
    }
  };

  const currentRangeStart = (page - 1) * PAGE_SIZE + 1;
  const currentRangeEnd = currentRangeStart + tasks.length - 1;

  let taskListContent;

  if (loadingTasks) {
    taskListContent = (
      <div style={{
        border: "2px dashed var(--color-border)",
        padding: "40px",
        textAlign: "center",
        color: "var(--color-fg)",
        opacity: 0.5,
        fontSize: "14px",
      }}>
        Fetching your tasks...
      </div>
    );
  } else if (tasks.length > 0) {
    taskListContent = (
      <div style={{
        display: "grid",
        gap: "16px",
      }}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={startEdit}
            onDelete={(selectedTask) => {
              if (deletingTaskId === selectedTask.id) {
                return;
              }
              handleDelete(selectedTask);
            }}
          />
        ))}
      </div>
    );
  } else {
    taskListContent = (
      <div style={{
        border: "2px dashed var(--color-border)",
        padding: "40px",
        textAlign: "center",
        color: "var(--color-fg)",
        opacity: 0.5,
        fontSize: "14px",
      }}>
        No tasks found for the current filter.
      </div>
    );
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1.1fr",
      gap: "24px",
      paddingBottom: "40px",
    }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}>
        <section style={{
          border: "3px solid var(--color-border)",
          padding: "32px",
          backgroundColor: "var(--color-surface)",
        }}>
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            justifyContent: "space-between",
          }}>
            <div>
              <p style={{
                fontSize: "10px",
                fontWeight: 900,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
                opacity: 0.9,
              }}>
                Overview
              </p>
              <h2 style={{
                marginTop: "16px",
                fontSize: "24px",
                fontWeight: 900,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "var(--color-fg)",
              }}>
                Task management workspace
              </h2>
              <p style={{
                marginTop: "12px",
                fontSize: "14px",
                color: "var(--color-fg)",
                opacity: 0.7,
              }}>
                Create, edit, delete, filter, and paginate tasks from the backend API.
              </p>
            </div>

            <div style={{
              display: "grid",
              gap: "8px",
              minWidth: "240px",
            }}>
              <label style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--color-fg)",
                opacity: 0.8,
              }} htmlFor="status-filter">
                Filter by status
              </label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value);
                  setPage(1);
                }}
                style={{
                  width: "100%",
                  border: "2px solid var(--color-border)",
                  backgroundColor: "var(--color-surface)",
                  color: "var(--color-fg)",
                  padding: "8px 12px",
                  fontSize: "14px",
                  fontFamily: "ui-monospace, 'Courier New', monospace",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="">All tasks</option>
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{
            marginTop: "24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "12px",
          }}>
            <div style={{
              border: "2px solid var(--color-border)",
              backgroundColor: "var(--color-bg)",
              padding: "16px",
            }}>
              <p style={{
                fontSize: "10px",
                fontWeight: 900,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-fg)",
                opacity: 0.5,
              }}>Current page</p>
              <p style={{
                marginTop: "12px",
                fontSize: "20px",
                fontWeight: 900,
                color: "var(--color-fg)",
              }}>{page}</p>
            </div>
            <div style={{
              border: "2px solid var(--color-border)",
              backgroundColor: "var(--color-bg)",
              padding: "16px",
            }}>
              <p style={{
                fontSize: "10px",
                fontWeight: 900,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-fg)",
                opacity: 0.5,
              }}>Loaded tasks</p>
              <p style={{
                marginTop: "12px",
                fontSize: "20px",
                fontWeight: 900,
                color: "var(--color-fg)",
              }}>{tasks.length}</p>
            </div>
            <div style={{
              border: "2px solid var(--color-border)",
              backgroundColor: "var(--color-bg)",
              padding: "16px",
            }}>
              <p style={{
                fontSize: "10px",
                fontWeight: 900,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-fg)",
                opacity: 0.5,
              }}>Range</p>
              <p style={{
                marginTop: "12px",
                fontSize: "20px",
                fontWeight: 900,
                color: "var(--color-fg)",
              }}>
                {tasks.length ? `${currentRangeStart}-${currentRangeEnd}` : "—"}
              </p>
            </div>
          </div>
        </section>

        <TaskForm
          title={isEditing ? "Edit task" : "Create task"}
          description={
            isEditing
              ? "Update the selected task and save the changes."
              : "Add a new task to your dashboard."
          }
          value={taskForm}
          onChange={setTaskForm}
          onSubmit={saveTask}
          isSubmitting={savingTask}
          submitLabel={isEditing ? "Update task" : "Create task"}
          onCancel={isEditing ? resetForm : undefined}
        />

        {message ? (
          <div style={{
            border: "2px solid var(--color-accent)",
            backgroundColor: "var(--color-bg)",
            padding: "12px 16px",
            fontSize: "13px",
            color: "var(--color-accent)",
            opacity: 0.9,
          }}>
            {message}
          </div>
        ) : null}
        {error ? (
          <div style={{
            border: "2px solid var(--color-accent)",
            backgroundColor: "var(--color-bg)",
            padding: "12px 16px",
            fontSize: "13px",
            color: "var(--color-accent)",
            opacity: 0.9,
          }}>
            {error}
          </div>
        ) : null}
      </div>

      <section style={{
        border: "3px solid var(--color-border)",
        padding: "32px",
        backgroundColor: "var(--color-surface)",
      }}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}>
          <div>
            <h2 style={{
              fontSize: "24px",
              fontWeight: 900,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "var(--color-fg)",
            }}>Task list</h2>
            <p style={{
              marginTop: "4px",
              fontSize: "13px",
              color: "var(--color-fg)",
              opacity: 0.7,
            }}>
              {loadingTasks ? "Loading tasks..." : `${tasks.length} task(s) on this page`}
            </p>
          </div>
          <div style={{
            display: "flex",
            gap: "8px",
          }}>
            <button
              type="button"
              disabled={page === 1 || loadingTasks}
              onClick={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
              style={{
                border: "2px solid var(--color-border)",
                backgroundColor: "var(--color-bg)",
                color: "var(--color-fg)",
                padding: "8px 16px",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                cursor: page === 1 || loadingTasks ? "not-allowed" : "pointer",
                opacity: page === 1 || loadingTasks ? 0.3 : 1,
                transition: "opacity 0.2s",
              }}
            >
              Previous
            </button>
            <button
              type="button"
              disabled={!hasNextPage || loadingTasks}
              onClick={() => setPage((currentPage) => currentPage + 1)}
              style={{
                border: "2px solid var(--color-border)",
                backgroundColor: "var(--color-bg)",
                color: "var(--color-fg)",
                padding: "8px 16px",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                cursor: !hasNextPage || loadingTasks ? "not-allowed" : "pointer",
                opacity: !hasNextPage || loadingTasks ? 0.3 : 1,
                transition: "opacity 0.2s",
              }}
            >
              Next
            </button>
          </div>
        </div>

        <div style={{
          marginTop: "24px",
        }}>{taskListContent}</div>
      </section>
    </div>
  );
}
