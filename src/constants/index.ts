export const ROLES = {
  ADMIN: "admin",
  USER: "user",
} as const;

export const TASK_STATUS = {
  OPEN: "Open",
  IN_PROGRESS: "In_Progress",
  TESTING: "Testing",
  DONE: "Done",
} as const;

export const TASK_PRIORITY = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
} as const;

export const MESSAGES = {
  // Auth
  REGISTER_SUCCESS: "User registered successfully",
  LOGIN_SUCCESS: "Login successful",
  INVALID_CREDENTIALS: "Invalid email or password",
  EMAIL_EXISTS: "Email already exists",
  // Tasks
  TASK_CREATED: "Task created successfully",
  TASK_UPDATED: "Task updated successfully",
  TASK_DELETED: "Task deleted successfully",
  TASK_NOT_FOUND: "Task not found",
  // Auth errors
  UNAUTHORIZED: "Unauthorized access",
  FORBIDDEN: "You do not have permission",
  // Server
  SERVER_ERROR: "Internal server error",
} as const;
