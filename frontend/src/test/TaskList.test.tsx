import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { TaskList } from "../components/TaskList";
import { taskService } from "../services/api";
import { Task } from "../types/Task";

// Mock the API
vi.mock("../services/api");
const mockTaskService = taskService as any;

describe("TaskList", () => {
  const mockTasks: Task[] = [
    {
      id: 1,
      title: "Task 1",
      description: "Description 1",
      completed: false,
      created_at: "2023-01-01T00:00:00Z",
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description 2",
      completed: false,
      created_at: "2023-01-01T01:00:00Z",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state initially", () => {
    mockTaskService.getTasks.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<TaskList />);

    expect(screen.getByText("Loading your tasks...")).toBeInTheDocument();
  });

  it("renders tasks correctly", async () => {
    mockTaskService.getTasks.mockResolvedValueOnce(mockTasks);

    render(<TaskList />);

    await waitFor(() => {
      expect(screen.getByText("Task 1")).toBeInTheDocument();
      expect(screen.getByText("Task 2")).toBeInTheDocument();
    });
  });

  it("renders empty state when no tasks", async () => {
    mockTaskService.getTasks.mockResolvedValueOnce([]);

    render(<TaskList />);

    await waitFor(() => {
      expect(screen.getByText("No tasks yet")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Ready to boost your productivity? Create your first task using the form on the left and start organizing your work!"
        )
      ).toBeInTheDocument();
    });
  });

  it("handles API error", async () => {
    mockTaskService.getTasks.mockRejectedValueOnce(new Error("API Error"));

    render(<TaskList />);

    await waitFor(() => {
      expect(
        screen.getByText("Failed to load tasks. Please try again.")
      ).toBeInTheDocument();
    });
  });

  it("shows retry button on error", async () => {
    mockTaskService.getTasks.mockRejectedValueOnce(new Error("API Error"));

    render(<TaskList />);

    await waitFor(() => {
      expect(screen.getByText("Retry")).toBeInTheDocument();
    });
  });
});
