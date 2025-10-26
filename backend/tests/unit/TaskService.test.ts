import { TaskRepositoryImpl } from "../../src/services/TaskService";
import { CreateTaskRequest } from "../../src/models/Task";
import pool from "../../src/config/database";

// Mock the database pool
jest.mock("../../src/config/database", () => ({
  query: jest.fn(),
}));

const mockPool = pool as any;

describe("TaskRepositoryImpl", () => {
  let taskRepository: TaskRepositoryImpl;

  beforeEach(() => {
    taskRepository = new TaskRepositoryImpl();
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a new task successfully", async () => {
      const taskData: CreateTaskRequest = {
        title: "Test Task",
        description: "Test Description",
      };

      const expectedTask = {
        id: 1,
        title: "Test Task",
        description: "Test Description",
        completed: false,
        created_at: new Date("2023-01-01T00:00:00Z"),
      };

      mockPool.query.mockResolvedValueOnce({
        rows: [expectedTask],
        rowCount: 1,
        command: "INSERT",
        oid: 0,
        fields: [],
      });

      const result = await taskRepository.create(taskData);

      expect(mockPool.query).toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO task (title, description)"),
        ["Test Task", "Test Description"]
      );
      expect(result).toEqual(expectedTask);
    });

    it("should create a task with null description when not provided", async () => {
      const taskData: CreateTaskRequest = {
        title: "Test Task",
      };

      const expectedTask = {
        id: 1,
        title: "Test Task",
        description: null,
        completed: false,
        created_at: new Date("2023-01-01T00:00:00Z"),
      };

      mockPool.query.mockResolvedValueOnce({
        rows: [expectedTask],
        rowCount: 1,
        command: "INSERT",
        oid: 0,
        fields: [],
      });

      const result = await taskRepository.create(taskData);

      expect(mockPool.query).toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO task (title, description)"),
        ["Test Task", null]
      );
      expect(result).toEqual(expectedTask);
    });
  });

  describe("findRecentIncomplete", () => {
    it("should return recent incomplete tasks with default limit", async () => {
      const expectedTasks = [
        {
          id: 1,
          title: "Task 1",
          description: "Description 1",
          completed: false,
          created_at: new Date("2023-01-01T00:00:00Z"),
        },
        {
          id: 2,
          title: "Task 2",
          description: "Description 2",
          completed: false,
          created_at: new Date("2023-01-01T01:00:00Z"),
        },
      ];

      mockPool.query.mockResolvedValueOnce({
        rows: expectedTasks,
        rowCount: 2,
        command: "SELECT",
        oid: 0,
        fields: [],
      });

      const result = await taskRepository.findRecentIncomplete();

      expect(mockPool.query).toHaveBeenCalledWith(
        expect.stringMatching(
          /SELECT[\s\S]*FROM task[\s\S]*WHERE completed = false[\s\S]*ORDER BY created_at DESC[\s\S]*LIMIT/
        ),
        [5]
      );
      expect(result).toEqual(expectedTasks);
    });

    it("should return recent incomplete tasks with custom limit", async () => {
      const expectedTasks = [
        {
          id: 1,
          title: "Task 1",
          description: "Description 1",
          completed: false,
          created_at: new Date("2023-01-01T00:00:00Z"),
        },
      ];

      mockPool.query.mockResolvedValueOnce({
        rows: expectedTasks,
        rowCount: 1,
        command: "SELECT",
        oid: 0,
        fields: [],
      });

      const result = await taskRepository.findRecentIncomplete(3);

      expect(mockPool.query).toHaveBeenCalledWith(
        expect.stringMatching(
          /SELECT[\s\S]*FROM task[\s\S]*WHERE completed = false[\s\S]*ORDER BY created_at DESC[\s\S]*LIMIT/
        ),
        [3]
      );
      expect(result).toEqual(expectedTasks);
    });
  });

  describe("markAsCompleted", () => {
    it("should mark a task as completed successfully", async () => {
      const taskId = 1;
      const expectedTask = {
        id: 1,
        title: "Test Task",
        description: "Test Description",
        completed: true,
        created_at: new Date("2023-01-01T00:00:00Z"),
      };

      mockPool.query.mockResolvedValueOnce({
        rows: [expectedTask],
        rowCount: 1,
        command: "UPDATE",
        oid: 0,
        fields: [],
      });

      const result = await taskRepository.markAsCompleted(taskId);

      expect(mockPool.query).toHaveBeenCalledWith(
        expect.stringMatching(
          /UPDATE task[\s\S]*SET completed = true[\s\S]*WHERE id = \$1 AND completed = false[\s\S]*RETURNING/
        ),
        [1]
      );
      expect(result).toEqual(expectedTask);
    });

    it("should return null when task is not found or already completed", async () => {
      const taskId = 999;

      mockPool.query.mockResolvedValueOnce({
        rows: [],
        rowCount: 0,
        command: "UPDATE",
        oid: 0,
        fields: [],
      });

      const result = await taskRepository.markAsCompleted(taskId);

      expect(mockPool.query).toHaveBeenCalledWith(
        expect.stringMatching(
          /UPDATE task[\s\S]*SET completed = true[\s\S]*WHERE id = \$1 AND completed = false[\s\S]*RETURNING/
        ),
        [999]
      );
      expect(result).toBeNull();
    });
  });
});
