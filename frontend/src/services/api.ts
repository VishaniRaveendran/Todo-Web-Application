import { Task } from "../types/Task";

const API_BASE_URL =
  (import.meta as any).env?.VITE_API_URL || "http://localhost:3001/api";

/**
 * Service class for managing tasks through the REST API
 * Follows Single Responsibility Principle - handles only task-related API calls
 */
export class TaskService {
  private async fetchWithAuth(url: string, options: RequestInit = {}) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) {
        const error = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        throw new Error(error.error || `HTTP error ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error("API request failed:", error);
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("Network error: Unable to connect to server");
      }
      throw error;
    }
  }

  /**
   * Creates a new task
   */
  async createTask(title: string, description?: string): Promise<Task> {
    return this.fetchWithAuth(`${API_BASE_URL}/tasks`, {
      method: "POST",
      body: JSON.stringify({ title, description }),
    });
  }

  /**
   * Gets all incomplete tasks
   */
  async getTasks(): Promise<Task[]> {
    return this.fetchWithAuth(`${API_BASE_URL}/tasks`, {
      method: "GET",
    });
  }

  /**
   * Gets the most recent 10 completed tasks
   */
  async getCompletedTasks(): Promise<Task[]> {
    return this.fetchWithAuth(`${API_BASE_URL}/tasks/completed`, {
      method: "GET",
    });
  }

  /**
   * Marks a task as completed
   */
  async completeTask(taskId: number): Promise<Task> {
    return this.fetchWithAuth(`${API_BASE_URL}/tasks/${taskId}/complete`, {
      method: "PATCH",
    });
  }
}

// Singleton instance
export const taskService = new TaskService();
