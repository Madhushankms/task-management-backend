import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API",
      version: "1.0.0",
      description: "REST API for Task Management System",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
      {
        url: "https://task-management-backend-zka9.onrender.com",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            email: { type: "string" },
            role: { type: "string", enum: ["admin", "user"] },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Task: {
          type: "object",
          properties: {
            id: { type: "integer" },
            title: { type: "string" },
            description: { type: "string" },
            priority: { type: "string", enum: ["Low", "Medium", "High"] },
            status: {
              type: "string",
              enum: ["Open", "In_Progress", "Testing", "Done"],
            },
            dueDate: { type: "string", format: "date-time" },
            createdById: { type: "integer" },
            assignedToId: { type: "integer" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string" },
            data: { type: "null" },
          },
        },
        Success: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string" },
            data: { type: "object" },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
    paths: {
      "/api/auth/register": {
        post: {
          tags: ["Auth"],
          summary: "Register new user",
          security: [],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "email", "password"],
                  properties: {
                    name: { type: "string", example: "kasun Admin" },
                    email: { type: "string", example: "kasun@gmail.com" },
                    password: { type: "string", example: "kasun123" },
                    role: {
                      type: "string",
                      enum: ["admin", "user"],
                      example: "user",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "User registered successfully" },
            400: { description: "Validation error or email exists" },
          },
        },
      },
      "/api/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Login user",
          security: [],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    email: { type: "string", example: "kasun@gmail.com" },
                    password: { type: "string", example: "kasun123" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Login successful" },
            401: { description: "Invalid credentials" },
          },
        },
      },
      "/api/tasks": {
        get: {
          tags: ["Tasks"],
          summary: "Get all tasks",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "search",
              in: "query",
              schema: { type: "string" },
              description: "Search by title",
            },
            {
              name: "priority",
              in: "query",
              schema: { type: "string", enum: ["Low", "Medium", "High"] },
            },
            {
              name: "status",
              in: "query",
              schema: {
                type: "string",
                enum: ["Open", "In_Progress", "Testing", "Done"],
              },
            },
          ],
          responses: {
            200: { description: "Tasks retrieved successfully" },
            401: { description: "Unauthorized" },
          },
        },
        post: {
          tags: ["Tasks"],
          summary: "Create new task",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["title"],
                  properties: {
                    title: {
                      type: "string",
                      example: "Design Database Schema",
                    },
                    description: {
                      type: "string",
                      example: "Create MySQL schema",
                    },
                    priority: {
                      type: "string",
                      enum: ["Low", "Medium", "High"],
                      example: "High",
                    },
                    status: {
                      type: "string",
                      enum: ["Open", "In_Progress", "Testing", "Done"],
                      example: "Open",
                    },
                    dueDate: {
                      type: "string",
                      format: "date",
                      example: "2024-12-31",
                    },
                    assignedToId: { type: "integer", example: 2 },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "Task created successfully" },
            400: { description: "Validation error" },
            401: { description: "Unauthorized" },
          },
        },
      },
      "/api/tasks/{id}": {
        get: {
          tags: ["Tasks"],
          summary: "Get task by ID",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
            },
          ],
          responses: {
            200: { description: "Task retrieved successfully" },
            404: { description: "Task not found" },
            401: { description: "Unauthorized" },
          },
        },
        put: {
          tags: ["Tasks"],
          summary: "Update task",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
            },
          ],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    description: { type: "string" },
                    priority: {
                      type: "string",
                      enum: ["Low", "Medium", "High"],
                    },
                    status: {
                      type: "string",
                      enum: ["Open", "In_Progress", "Testing", "Done"],
                    },
                    dueDate: { type: "string", format: "date" },
                    assignedToId: { type: "integer" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Task updated successfully" },
            404: { description: "Task not found" },
            403: { description: "Forbidden" },
          },
        },
        delete: {
          tags: ["Tasks"],
          summary: "Delete task",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
            },
          ],
          responses: {
            200: { description: "Task deleted successfully" },
            404: { description: "Task not found" },
            403: { description: "Forbidden" },
          },
        },
      },
      "/api/users/profile": {
        get: {
          tags: ["Users"],
          summary: "Get own profile",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "Profile retrieved successfully" },
            401: { description: "Unauthorized" },
          },
        },
      },
      "/api/users": {
        get: {
          tags: ["Users"],
          summary: "Get all users (Admin only)",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "Users retrieved successfully" },
            403: { description: "Forbidden" },
          },
        },
      },
      "/api/users/{id}": {
        get: {
          tags: ["Users"],
          summary: "Get user by ID (Admin only)",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
            },
          ],
          responses: {
            200: { description: "User retrieved successfully" },
            404: { description: "User not found" },
            403: { description: "Forbidden" },
          },
        },
        delete: {
          tags: ["Users"],
          summary: "Delete user (Admin only)",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
            },
          ],
          responses: {
            200: { description: "User deleted successfully" },
            404: { description: "User not found" },
            403: { description: "Forbidden" },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
