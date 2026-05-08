export const STATUS_OPTIONS = [
  { value: "PENDING", label: "Pending" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
];

export const PRIORITY_OPTIONS = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
];

export const statusLabel = (status) =>
  STATUS_OPTIONS.find((option) => option.value === status)?.label || status;

export const priorityLabel = (priority) =>
  PRIORITY_OPTIONS.find((option) => option.value === priority)?.label || priority;

export const statusBadgeClasses = {
  PENDING: "bg-amber-500/15 text-amber-300 ring-1 ring-inset ring-amber-400/30",
  IN_PROGRESS: "bg-sky-500/15 text-sky-300 ring-1 ring-inset ring-sky-400/30",
  COMPLETED: "bg-emerald-500/15 text-emerald-300 ring-1 ring-inset ring-emerald-400/30",
};

export const priorityBadgeClasses = {
  LOW: "bg-slate-500/15 text-slate-300 ring-1 ring-inset ring-slate-400/30",
  MEDIUM: "bg-violet-500/15 text-violet-300 ring-1 ring-inset ring-violet-400/30",
  HIGH: "bg-rose-500/15 text-rose-300 ring-1 ring-inset ring-rose-400/30",
};
