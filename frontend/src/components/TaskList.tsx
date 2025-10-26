import React, { useState, useEffect } from "react";
import { Task } from "../types/Task";
import { taskService } from "../services/api";
import { TaskCard } from "./TaskCard";
import { LoadingSpinner } from "./SkeletonLoader";
import { Card, ErrorAlert, EmptyState } from "./common";
import { FaClipboardList } from "react-icons/fa";

interface TaskListProps {
  onTaskCompleted?: () => void;
}

export const TaskList: React.FC<TaskListProps> = ({ onTaskCompleted }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedTasks = await taskService.getTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError("Failed to load tasks. Please try again.");
      console.error("Error fetching tasks:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskCompleted = () => {
    fetchTasks();
    if (onTaskCompleted) {
      onTaskCompleted();
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <LoadingSpinner
          size="md"
          color="primary"
          text="Loading your tasks..."
          subtext="Fetching your latest productivity data"
        />
      </Card>
    );
  }

  return (
    <Card className="w-full">
      {error && <ErrorAlert error={error} onRetry={fetchTasks} />}

      {tasks.length === 0 ? (
        <EmptyState
          icon={
            <FaClipboardList className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
          }
          title="No tasks yet"
          description="Ready to boost your productivity? Create your first task using the form on the left and start organizing your work!"
          features={[
            { color: "bg-primary", text: "Stay organized" },
            { color: "bg-accent", text: "Track progress" },
            { color: "bg-success", text: "Achieve goals" },
          ]}
        />
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {tasks.map((task, index) => (
            <div
              key={task.id}
              className="animate-fade-in"
              style={{ animationDelay: `${Math.min(index * 100, 500)}ms` }}
            >
              <TaskCard task={task} onTaskCompleted={handleTaskCompleted} />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
