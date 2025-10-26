import { test, expect } from "@playwright/test";

test.describe("API Integration Tests", () => {
  const API_BASE_URL = "http://localhost:3001/api";

  test("should create a task via API", async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/tasks`, {
      data: {
        title: "API Test Task",
        description: "Created via API test",
      },
    });

    expect(response.status()).toBe(201);
    const task = await response.json();
    expect(task.title).toBe("API Test Task");
    expect(task.description).toBe("Created via API test");
    expect(task.completed).toBe(false);
    expect(task.id).toBeDefined();
    expect(task.created_at).toBeDefined();
  });

  test("should get tasks via API", async ({ request }) => {
    // First create a task
    await request.post(`${API_BASE_URL}/tasks`, {
      data: {
        title: "Task for GET test",
        description: "Test description",
      },
    });

    // Then get tasks
    const response = await request.get(`${API_BASE_URL}/tasks`);
    expect(response.status()).toBe(200);

    const tasks = await response.json();
    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks.length).toBeGreaterThan(0);

    const task = tasks.find((t: any) => t.title === "Task for GET test");
    expect(task).toBeDefined();
    expect(task.completed).toBe(false);
  });

  test("should complete a task via API", async ({ request }) => {
    // First create a task
    const createResponse = await request.post(`${API_BASE_URL}/tasks`, {
      data: {
        title: "Task to complete",
        description: "Will be completed",
      },
    });

    const createdTask = await createResponse.json();

    // Then complete it
    const completeResponse = await request.patch(
      `${API_BASE_URL}/tasks/${createdTask.id}/complete`
    );
    expect(completeResponse.status()).toBe(200);

    const completedTask = await completeResponse.json();
    expect(completedTask.id).toBe(createdTask.id);
    expect(completedTask.completed).toBe(true);
  });

  test("should return 400 for invalid task creation", async ({ request }) => {
    const response = await request.post(`${API_BASE_URL}/tasks`, {
      data: {
        // Missing title
        description: "No title provided",
      },
    });

    expect(response.status()).toBe(400);
    const error = await response.json();
    expect(error.error).toBe("Title is required");
  });

  test("should return 404 for completing non-existent task", async ({
    request,
  }) => {
    const response = await request.patch(
      `${API_BASE_URL}/tasks/99999/complete`
    );
    expect(response.status()).toBe(404);

    const error = await response.json();
    expect(error.error).toBe("Task not found or already completed");
  });

  test("should return 400 for invalid task ID", async ({ request }) => {
    const response = await request.patch(
      `${API_BASE_URL}/tasks/invalid/complete`
    );
    expect(response.status()).toBe(400);

    const error = await response.json();
    expect(error.error).toBe("Invalid task ID");
  });
});
