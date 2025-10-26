import React from "react";
import { Task } from "../types/Task";
import { formatDate } from "../utils/dateUtils";
import { Card, IconContainer, StatusBadge } from "./common";
import { FaCheck, FaClock } from "react-icons/fa";

interface CompletedTaskCardProps {
  task: Task;
}

export const CompletedTaskCard: React.FC<CompletedTaskCardProps> = ({
  task,
}) => {
  return (
    <Card variant="success" className="w-full" hover={false}>
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 sm:mb-8 gap-4">
          <div className="flex-1 sm:pr-8">
            <div className="flex items-start sm:items-center mb-3 sm:mb-4">
              <IconContainer
                icon={<FaCheck className="w-5 h-5 sm:w-6 sm:h-6" />}
                variant="success"
                size="lg"
                className="mr-3 sm:mr-5"
                hover={false}
              />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-500 leading-tight line-through">
                {task.title}
              </h3>
            </div>
            {task.description && (
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base lg:text-lg line-through ml-0 sm:ml-16">
                {task.description}
              </p>
            )}
          </div>

          <StatusBadge status="completed" size="md" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center text-sm sm:text-base text-slate-500 pt-4 sm:pt-6 border-t border-gray-200/50 gap-2 sm:gap-0">
          <div className="flex items-center">
            <IconContainer
              icon={<FaClock className="w-4 h-4 sm:w-5 sm:h-5" />}
              variant="gray"
              size="md"
              className="mr-3 sm:mr-4"
              hover={false}
            />
            <span className="font-semibold text-xs sm:text-sm lg:text-base">
              Completed {formatDate(task.created_at)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
