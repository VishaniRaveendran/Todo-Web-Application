import pool from "../config/database";
import { Task, CreateTaskRequest, TaskRepository } from "../models/Task";

export class TaskRepositoryImpl implements TaskRepository {
  async create(task: CreateTaskRequest): Promise<Task> {
    const query = `
      INSERT INTO task (title, description)
      VALUES ($1, $2)
      RETURNING id, title, description, completed, created_at
    `;
    const values = [task.title, task.description || null];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findRecentIncomplete(limit: number = 5): Promise<Task[]> {
    const query = `
      SELECT id, title, description, completed, created_at
      FROM task
      WHERE completed = false
      ORDER BY created_at DESC
      LIMIT $1
    `;

    const result = await pool.query(query, [limit]);
    return result.rows;
  }

  async findRecentCompleted(limit: number = 10): Promise<Task[]> {
    const query = `
      SELECT id, title, description, completed, created_at
      FROM task
      WHERE completed = true
      ORDER BY created_at DESC
      LIMIT $1
    `;

    const result = await pool.query(query, [limit]);
    return result.rows;
  }

  async markAsCompleted(id: number): Promise<Task | null> {
    const query = `
      UPDATE task
      SET completed = true
      WHERE id = $1 AND completed = false
      RETURNING id, title, description, completed, created_at
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }
}

export const taskRepository = new TaskRepositoryImpl();
