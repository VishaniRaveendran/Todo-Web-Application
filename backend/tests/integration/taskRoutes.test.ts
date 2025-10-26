import request from "supertest";
import express from "express";
import taskRoutes from "../../src/routes/taskRoutes";
import {
  errorHandler,
  notFoundHandler,
} from "../../src/middleware/errorHandler";
import pool from "../../src/config/database";

// Mock the database pool
jest.mock("../../src/config/database", () => ({
  query: jest.fn(),
}));

const mockPool = pool as any;

const app = express();
app.use(express.json());
app.use("/api", taskRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

describe("Task Routes Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/tasks", () => {
    it("should create a new task successfully", async () => {
      const taskData = {
        title: "Test Task",
        description: "Test Description",
      };

      const expectedTask = {
        id: 1,
        title: "Test Task",
        description: "Test Description",
        completed: false,
        created_at: "2023-01-01T00:00:00.000Z",
      };

      mockPool.query.mockResolvedValueOnce({
        rows: [expectedTask],
        rowCount: 1,
        command: "INSERT",
        oid: 0,
        fields: [],
      });

      const response = await request(app)
        .post("/api/tasks")
        .send(taskData)
        .expect(201);

      expect(response.body).toEqual(expectedTask);
    });

    it("should return 400 when title is missing", async () => {
      const taskData = {
        description: "Test Description",
      };

      const response = await request(app)
        .post("/api/tasks")
        .send(taskData)
        .expect(400);

      expect(response.body.error).toBe("Title is required");
    });

    it("should return 400 when title is empty", async () => {
      const taskData = {
        title: "",
        description: "Test Description",
      };

      const response = await request(app)
        .post("/api/tasks")
        .send(taskData)
        .expect(400);

      expect(response.body.error).toBe("Title is required");
    });

    it("should return 400 when title is too long", async () => {
      const taskData = {
        title: "a".repeat(256),
        description: "Test Description",
      };

      const response = await request(app)
        .post("/api/tasks")
        .send(taskData)
        .expect(400);

      expect(response.body.error).toBe("Title must be 255 characters or less");
    });

    it("should create task without description", async () => {
      const taskData = {
        title: "Test Task",
      };

      const expectedTask = {
        id: 1,
        title: "Test Task",
        description: null,
        completed: false,
        created_at: "2023-01-01T00:00:00.000Z",
      };

      mockPool.query.mockResolvedValueOnce({
        rows: [expectedTask],
        rowCount: 1,
        command: "INSERT",
        oid: 0,
        fields: [],
      });

      const response = await request(app)
        .post("/api/tasks")
        .send(taskData)
        .expect(201);

      expect(response.body).toEqual(expectedTask);
    });
  });

  describe("GET /api/tasks", () => {
    it("should return recent incomplete tasks", async () => {
      const expectedTasks = [
        {
          id: 1,
          title: "Task 1",
          description: "Description 1",
          completed: false,
          created_at: "2023-01-01T00:00:00.000Z",
        },
        {
          id: 2,
          title: "Task 2",
          description: "Description 2",
          completed: false,
          created_at: "2023-01-01T01:00:00.000Z",
        },
      ];

      mockPool.query.mockResolvedValueOnce({
        rows: expectedTasks,
        rowCount: 2,
        command: "SELECT",
        oid: 0,
        fields: [],
      });

      const response = await request(app).get("/api/tasks").expect(200);

      expect(response.body).toEqual(expectedTasks);
    });

    it("should return empty array when no tasks exist", async () => {
      mockPool.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0,
        command: "SELECT",
        oid: 0,
        fields: [],
      });

      const response = await request(app).get("/api/tasks").expect(200);

      expect(response.body).toEqual([]);
    });
  });

  describe("PATCH /api/tasks/:id/complete", () => {
    it("should mark a task as completed successfully", async () => {
      const taskId = 1;
      const expectedTask = {
        id: 1,
        title: "Test Task",
        description: "Test Description",
        completed: true,
        created_at: "2023-01-01T00:00:00.000Z",
      };

      mockPool.query.mockResolvedValueOnce({
        rows: [expectedTask],
        rowCount: 1,
        command: "UPDATE",
        oid: 0,
        fields: [],
      });

      const response = await request(app)
        .patch(`/api/tasks/${taskId}/complete`)
        .expect(200);

      expect(response.body).toEqual(expectedTask);
    });

    it("should return 400 for invalid task ID", async () => {
      const response = await request(app)
        .patch("/api/tasks/invalid/complete")
        .expect(400);

      expect(response.body.error).toBe("Invalid task ID");
    });

    it("should return 404 when task is not found or already completed", async () => {
      const taskId = 999;

      mockPool.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0,
        command: "UPDATE",
        oid: 0,
        fields: [],
      });

      const response = await request(app)
        .patch(`/api/tasks/${taskId}/complete`)
        .expect(404);

      expect(response.body.error).toBe("Task not found or already completed");
    });
  });

  describe("Error handling", () => {
    it("should return 404 for non-existent routes", async () => {
      const response = await request(app).get("/api/non-existent").expect(404);

      expect(response.body.error).toBe("Route not found");
    });
  });
});
