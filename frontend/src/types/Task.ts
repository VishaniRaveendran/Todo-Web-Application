export interface Task {
  id: number;
  title: string;
  description: string;
  created_at: string;
  completed: boolean;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
}
