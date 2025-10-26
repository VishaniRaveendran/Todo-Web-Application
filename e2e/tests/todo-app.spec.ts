import { test, expect } from "@playwright/test";

test.describe("Todo Application", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for the page to load completely
    await page.waitForLoadState("networkidle");
  });

  test("should display the main page with form and task list", async ({
    page,
  }) => {
    // Check if the main elements are present
    await expect(page.getByRole("heading", { name: "Todo App" })).toBeVisible();
    await expect(page.getByText("Manage your tasks efficiently")).toBeVisible();

    // Check form elements
    await expect(
      page.getByRole("heading", { name: "Create New Task" })
    ).toBeVisible();
    await expect(page.getByLabel("Title *")).toBeVisible();
    await expect(page.getByLabel("Description")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Create Task" })
    ).toBeVisible();

    // Check task list
    await expect(
      page.getByRole("heading", { name: "Recent Tasks" })
    ).toBeVisible();
  });

  test("should create a new task successfully", async ({ page }) => {
    // Fill out the form
    await page.getByLabel("Title *").fill("Test Task");
    await page
      .getByLabel("Description")
      .fill("This is a test task description");

    // Submit the form
    await page.getByRole("button", { name: "Create Task" }).click();

    // Wait for the task to appear in the list
    await expect(page.getByText("Test Task")).toBeVisible();
    await expect(
      page.getByText("This is a test task description")
    ).toBeVisible();

    // Verify the form is cleared
    await expect(page.getByLabel("Title *")).toHaveValue("");
    await expect(page.getByLabel("Description")).toHaveValue("");
  });

  test("should create a task without description", async ({ page }) => {
    // Fill out only the title
    await page.getByLabel("Title *").fill("Task without description");

    // Submit the form
    await page.getByRole("button", { name: "Create Task" }).click();

    // Wait for the task to appear in the list
    await expect(page.getByText("Task without description")).toBeVisible();
  });

  test("should show validation error for empty title", async ({ page }) => {
    // Try to submit without title
    await page.getByRole("button", { name: "Create Task" }).click();

    // Check for validation error
    await expect(page.getByText("Title is required")).toBeVisible();
  });

  test("should mark a task as completed", async ({ page }) => {
    // Create a task first
    await page.getByLabel("Title *").fill("Task to complete");
    await page.getByRole("button", { name: "Create Task" }).click();

    // Wait for the task to appear
    await expect(page.getByText("Task to complete")).toBeVisible();

    // Click the Done button
    await page.getByRole("button", { name: "Done" }).click();

    // Wait for the task to disappear from the list
    await expect(page.getByText("Task to complete")).not.toBeVisible();
  });

  test("should display empty state when no tasks exist", async ({ page }) => {
    // Check if empty state is shown initially
    await expect(page.getByText("No tasks yet")).toBeVisible();
    await expect(
      page.getByText("Create your first task to get started!")
    ).toBeVisible();
  });

  test("should handle multiple tasks and show only recent 5", async ({
    page,
  }) => {
    // Create 6 tasks
    for (let i = 1; i <= 6; i++) {
      await page.getByLabel("Title *").fill(`Task ${i}`);
      await page.getByLabel("Description").fill(`Description for task ${i}`);
      await page.getByRole("button", { name: "Create Task" }).click();

      // Wait for the task to appear
      await expect(page.getByText(`Task ${i}`)).toBeVisible();
    }

    // Only the most recent 5 tasks should be visible
    await expect(page.getByText("Task 6")).toBeVisible();
    await expect(page.getByText("Task 5")).toBeVisible();
    await expect(page.getByText("Task 4")).toBeVisible();
    await expect(page.getByText("Task 3")).toBeVisible();
    await expect(page.getByText("Task 2")).toBeVisible();

    // Task 1 should not be visible (oldest)
    await expect(page.getByText("Task 1")).not.toBeVisible();
  });

  test("should be responsive on mobile devices", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check if elements are still visible and properly laid out
    await expect(page.getByRole("heading", { name: "Todo App" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Create New Task" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Recent Tasks" })
    ).toBeVisible();

    // Check if form is still functional
    await page.getByLabel("Title *").fill("Mobile test task");
    await page.getByRole("button", { name: "Create Task" }).click();
    await expect(page.getByText("Mobile test task")).toBeVisible();
  });

  test("should handle API errors gracefully", async ({ page }) => {
    // Mock API failure
    await page.route("**/api/tasks", (route) => {
      route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Internal server error" }),
      });
    });

    // Try to create a task
    await page.getByLabel("Title *").fill("Task with API error");
    await page.getByRole("button", { name: "Create Task" }).click();

    // Check for error message
    await expect(
      page.getByText("Failed to create task. Please try again.")
    ).toBeVisible();
  });
});
