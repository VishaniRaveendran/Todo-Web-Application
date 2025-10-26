import React, { useState, useEffect } from "react";
import { Task } from "../types/Task";
import { taskService } from "../services/api";
import { CompletedTaskCard } from "./CompletedTaskCard";
import { LoadingSpinner } from "./SkeletonLoader";
import { Card, ErrorAlert, EmptyState } from "./common";
import { FaCheckCircle } from "react-icons/fa";

export const CompletedTaskList: React.FC = () => {
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompletedTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const tasks = await taskService.getCompletedTasks();
      setCompletedTasks(tasks);
    } catch (err) {
      console.error("Error fetching completed tasks:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to load completed tasks. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  if (loading) {
    return (
      <Card className="w-full">
        <LoadingSpinner
          size="md"
          color="success"
          text="Loading achievements..."
          subtext="Fetching your completed tasks"
        />
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <ErrorAlert error={error} onRetry={fetchCompletedTasks} />
      </Card>
    );
  }

  return (
    <Card className="w-full">
      {completedTasks.length === 0 ? (
        <EmptyState
          icon={
            <FaCheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-success" />
          }
          title="No achievements yet"
          description="Complete some tasks to see your achievements here! Every completed task is a step towards your goals."
          features={[
            { color: "bg-success", text: "Track progress" },
            { color: "bg-success-600", text: "Celebrate wins" },
            { color: "bg-success-700", text: "Stay motivated" },
          ]}
        />
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {completedTasks.map((task, index) => (
            <div
              key={task.id}
              className="animate-fade-in"
              style={{ animationDelay: `${Math.min(index * 100, 500)}ms` }}
            >
              <CompletedTaskCard task={task} />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
