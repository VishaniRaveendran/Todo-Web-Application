import { Request, Response } from "express";
import { taskRepository } from "../services/TaskService";
import { CreateTaskRequest } from "../models/Task";

export class TaskController {
  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const { title, description }: CreateTaskRequest = req.body;

      if (!title || title.trim().length === 0) {
        res.status(400).json({ error: "Title is required" });
        return;
      }

      if (title.length > 255) {
        res.status(400).json({ error: "Title must be 255 characters or less" });
        return;
      }

      const task = await taskRepository.create({
        title: title.trim(),
        description,
      });
      res.status(201).json(task);
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await taskRepository.findRecentIncomplete(5);
      res.json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getCompletedTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await taskRepository.findRecentCompleted(10);
      res.json(tasks);
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async completeTask(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid task ID" });
        return;
      }

      const task = await taskRepository.markAsCompleted(id);

      if (!task) {
        res.status(404).json({ error: "Task not found or already completed" });
        return;
      }

      res.json(task);
    } catch (error) {
      console.error("Error completing task:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
