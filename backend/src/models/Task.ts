export interface Task {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  created_at: Date;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
}

export interface TaskRepository {
  create(task: CreateTaskRequest): Promise<Task>;
  findRecentIncomplete(limit: number): Promise<Task[]>;
  findRecentCompleted(limit: number): Promise<Task[]>;
  markAsCompleted(id: number): Promise<Task | null>;
}
