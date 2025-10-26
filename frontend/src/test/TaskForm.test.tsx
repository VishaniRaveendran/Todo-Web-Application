import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { TaskForm } from "../components/TaskForm";
import { taskService } from "../services/api";

// Mock the API
vi.mock("../services/api");
const mockTaskService = taskService as any;

describe("TaskForm", () => {
  const mockOnTaskCreated = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders form fields correctly", () => {
    render(<TaskForm onTaskCreated={mockOnTaskCreated} />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create task/i })
    ).toBeInTheDocument();
  });

  it("shows error when title is empty", async () => {
    const user = userEvent.setup();
    render(<TaskForm onTaskCreated={mockOnTaskCreated} />);

    const submitButton = screen.getByRole("button", { name: /create task/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Title is required")).toBeInTheDocument();
    });
  });

  it("creates task successfully", async () => {
    const user = userEvent.setup();
    const mockTask = {
      id: "1",
      title: "Test Task",
      description: "Test Description",
      completed: false,
      created_at: 1672531200000, // 2023-01-01T00:00:00Z
    };

    mockTaskService.createTask.mockResolvedValueOnce(mockTask);

    render(<TaskForm onTaskCreated={mockOnTaskCreated} />);

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const submitButton = screen.getByRole("button", { name: /create task/i });

    await user.type(titleInput, "Test Task");
    await user.type(descriptionInput, "Test Description");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockTaskService.createTask).toHaveBeenCalledWith(
        "Test Task",
        "Test Description"
      );
    });

    expect(mockOnTaskCreated).toHaveBeenCalled();

    // Wait for the form to reset after successful submission
    await waitFor(() => {
      const newTitleInput = screen.getByLabelText(/title/i);
      const newDescriptionInput = screen.getByLabelText(/description/i);
      expect(newTitleInput).toHaveValue("");
      expect(newDescriptionInput).toHaveValue("");
    });
  });

  it("creates task without description", async () => {
    const user = userEvent.setup();
    const mockTask = {
      id: "1",
      title: "Test Task",
      description: null,
      completed: false,
      created_at: 1672531200000,
    };

    mockTaskService.createTask.mockResolvedValueOnce(mockTask);

    render(<TaskForm onTaskCreated={mockOnTaskCreated} />);

    const titleInput = screen.getByLabelText(/title/i);
    const submitButton = screen.getByRole("button", { name: /create task/i });

    await user.type(titleInput, "Test Task");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockTaskService.createTask).toHaveBeenCalledWith(
        "Test Task",
        undefined
      );
    });

    expect(mockOnTaskCreated).toHaveBeenCalled();
  });

  it("handles API error", async () => {
    const user = userEvent.setup();
    mockTaskService.createTask.mockRejectedValueOnce(new Error("API Error"));

    render(<TaskForm onTaskCreated={mockOnTaskCreated} />);

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const submitButton = screen.getByRole("button", { name: /create task/i });

    await user.type(titleInput, "Test Task");
    await user.type(descriptionInput, "Test Description");
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Failed to create task. Please try again.")
      ).toBeInTheDocument();
    });
  });

  it("shows skeleton when submitting", async () => {
    const user = userEvent.setup();
    mockTaskService.createTask.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<TaskForm onTaskCreated={mockOnTaskCreated} />);

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const submitButton = screen.getByRole("button", { name: /create task/i });

    await user.type(titleInput, "Test Task");
    await user.type(descriptionInput, "Test Description");
    await user.click(submitButton);

    // Check that the form shows skeleton during submission
    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: /create task/i })
      ).not.toBeInTheDocument();
    });

    // Verify skeleton is showing
    expect(screen.getByTestId("task-form-skeleton")).toBeInTheDocument();
  });
});
