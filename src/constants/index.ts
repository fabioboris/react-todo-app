export const LOCAL_STORAGE_KEY = "@todo-app:tasks-v1";

export const FILTERS = {
  ALL: "all",
  PENDING: "pending",
  COMPLETED: "completed",
} as const;

export const FILTER_LABELS = {
  [FILTERS.ALL]: "Todas",
  [FILTERS.PENDING]: "Pendentes",
  [FILTERS.COMPLETED]: "Concluídas",
};
