type TaskStatus = "pending" | "success" | "error";
type TaskStatuses = Record<string, TaskStatus>;
export type GroupedTaskStatuses = Record<string, TaskStatuses>;
