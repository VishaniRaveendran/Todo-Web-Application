import React, { useState } from "react";
import { Task } from "../types/Task";
import { taskService } from "../services/api";
import { formatDate } from "../utils/dateUtils";
import { Card, ErrorAlert, IconContainer, Button, StatusBadge } from "./common";
import { FaClipboardList, FaClock } from "react-icons/fa";

interface TaskCardProps {
  task: Task;
  onTaskCompleted: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onTaskCompleted,
}) => {
  const [isCompleting, setIsCompleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleComplete = async () => {
    setIsCompleting(true);
    setError(null);

    try {
      await taskService.completeTask(task.id);
      onTaskCompleted();
    } catch (err) {
      console.error("Error completing task:", err);
      setError("Failed to complete task. Please try again.");
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <Card variant="default" className="w-full">
      {error && (
        <ErrorAlert
          error={error}
          className="rounded-t-xl sm:rounded-t-2xl mb-0"
        />
      )}

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 gap-4">
          <div className="flex-1 sm:pr-6">
            <div className="flex items-start sm:items-center mb-3">
              <IconContainer
                icon={<FaClipboardList className="w-4 h-4 sm:w-5 sm:h-5" />}
                variant="primary"
                size="md"
                className="mr-3 sm:mr-4"
              />
              <h3 className="text-lg sm:text-xl font-bold text-text-primary leading-tight group-hover:text-primary transition-colors duration-300">
                {task.title}
              </h3>
            </div>
            {task.description && (
              <p className="text-text-muted leading-relaxed text-sm sm:text-base ml-0 sm:ml-12 group-hover:text-text-primary transition-colors duration-300">
                {task.description}
              </p>
            )}
          </div>

          <Button
            onClick={handleComplete}
            disabled={isCompleting}
            loading={isCompleting}
            loadingText="Completing..."
            variant="success"
            size="md"
            className="w-full sm:w-auto flex-shrink-0"
          >
            <div className="flex items-center justify-center gap-2">
              {/* Checkbox-style indicator */}
              <div className="relative">
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/60 rounded-sm bg-white/20 backdrop-blur-sm group-hover/complete:border-white group-hover/complete:bg-white/30 transition-all duration-300 flex items-center justify-center">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-sm opacity-0 group-hover/complete:opacity-100 transition-opacity duration-300 transform scale-0 group-hover/complete:scale-100"></div>
                </div>
              </div>
              <span className="font-semibold">Mark Complete</span>
            </div>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm text-text-muted pt-3 sm:pt-4 border-t border-gray-100/50 group-hover:text-text-primary transition-colors duration-300 gap-2 sm:gap-0">
          <div className="flex items-center">
            <IconContainer
              icon={<FaClock className="w-3 h-3 sm:w-4 sm:h-4" />}
              variant="gray"
              size="sm"
              className="mr-2 sm:mr-3"
              hover={false}
            />
            <span className="font-medium">
              Created {formatDate(task.created_at)}
            </span>
          </div>
          <div className="sm:ml-auto">
            <StatusBadge status="active" size="sm" />
          </div>
        </div>
      </div>
    </Card>
  );
};
