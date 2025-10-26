import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { TaskCard } from "../components/TaskCard";
import { taskService } from "../services/api";
import { Task } from "../types/Task";

// Mock the API
vi.mock("../services/api");
const mockTaskService = taskService as any;

describe("TaskCard", () => {
  const mockTask: Task = {
    id: 1,
    title: "Test Task",
    description: "Test Description",
    completed: false,
    created_at: "2023-01-01T00:00:00Z",
  };

  const mockOnTaskCompleted = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders task information correctly", () => {
    render(<TaskCard task={mockTask} onTaskCompleted={mockOnTaskCompleted} />);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /complete/i })
    ).toBeInTheDocument();
  });

  it("renders task without description", () => {
    const taskWithoutDescription = { ...mockTask, description: "" };
    render(
      <TaskCard
        task={taskWithoutDescription}
        onTaskCompleted={mockOnTaskCompleted}
      />
    );

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.queryByText("Test Description")).not.toBeInTheDocument();
  });

  it("completes task successfully", async () => {
    const user = userEvent.setup();
    const completedTask = { ...mockTask, completed: true };
    mockTaskService.completeTask.mockResolvedValueOnce(completedTask);

    render(<TaskCard task={mockTask} onTaskCompleted={mockOnTaskCompleted} />);

    const doneButton = screen.getByRole("button", { name: /complete/i });
    await user.click(doneButton);

    await waitFor(() => {
      expect(mockTaskService.completeTask).toHaveBeenCalledWith(1);
    });

    expect(mockOnTaskCompleted).toHaveBeenCalled();
  });

  it("handles API error when completing task", async () => {
    const user = userEvent.setup();
    mockTaskService.completeTask.mockRejectedValueOnce(new Error("API Error"));

    render(<TaskCard task={mockTask} onTaskCompleted={mockOnTaskCompleted} />);

    const doneButton = screen.getByRole("button", { name: /complete/i });
    await user.click(doneButton);

    await waitFor(() => {
      expect(
        screen.getByText("Failed to complete task. Please try again.")
      ).toBeInTheDocument();
    });
  });

  it("shows loading state when completing task", async () => {
    const user = userEvent.setup();
    mockTaskService.completeTask.mockImplementation(
      () => new Promise(() => {})
    ); // Never resolves

    render(<TaskCard task={mockTask} onTaskCompleted={mockOnTaskCompleted} />);

    const doneButton = screen.getByRole("button", { name: /complete/i });
    await user.click(doneButton);

    expect(screen.getByText("Completing...")).toBeInTheDocument();
    expect(doneButton).toBeDisabled();
  });

  it("formats date correctly", () => {
    render(<TaskCard task={mockTask} onTaskCompleted={mockOnTaskCompleted} />);

    expect(screen.getByText(/Created/)).toBeInTheDocument();
  });
});
