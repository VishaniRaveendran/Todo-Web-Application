import React, { useState } from "react";
import { taskService } from "../services/api";
import { CreateTaskRequest } from "../types/Task";
import { TaskFormSkeleton } from "./SkeletonLoader";
import { Button, IconContainer } from "./common";
import {
  FaFileAlt,
  FaAlignLeft,
  FaExclamationTriangle,
  FaCheck,
} from "react-icons/fa";
import { MdOutlineAdd } from "react-icons/md";

interface TaskFormProps {
  onTaskCreated: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear any previous errors
    setError(null);

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const taskData: CreateTaskRequest = {
        title: title.trim(),
        description: description.trim() || undefined,
      };

      await taskService.createTask(taskData.title, taskData.description);
      setTitle("");
      setDescription("");
      onTaskCreated();
    } catch (err) {
      setError("Failed to create task. Please try again.");
      console.error("Error creating task:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show skeleton while submitting
  if (isSubmitting) {
    return <TaskFormSkeleton />;
  }

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 overflow-hidden hover:shadow-3xl transition-all duration-500 transform">
      {/* Premium Header */}
      <div className="bg-blue-600 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 relative overflow-hidden">
        {/* Header background effects */}
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/15 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>

        <div className="relative z-10">
          <div className="flex items-center mb-3 sm:mb-4">
            <IconContainer
              icon={
                <MdOutlineAdd className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white drop-shadow-lg" />
              }
              variant="primary"
              size="lg"
              className="mr-3 sm:mr-5 bg-white/25 backdrop-blur-sm shadow-lg"
              hover={false}
            />
            <h2 className="text-lg sm:text-xl lg:text-2xl text-white font-bold">
              Create New Task
            </h2>
          </div>
          <p className="text-sm sm:text-base text-white/90 font-medium">
            Transform your ideas into actionable tasks with our intuitive form
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8">
        {error && (
          <div className="alert alert-error mb-4 sm:mb-6">
            <div className="flex items-center">
              <FaExclamationTriangle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
              <span className="text-sm sm:text-base font-semibold">
                {error}
              </span>
            </div>
          </div>
        )}

        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          <div>
            <label
              htmlFor="title"
              className="flex text-sm sm:text-base font-semibold text-slate-900 mb-3 sm:mb-4 items-center"
            >
              <IconContainer
                icon={<FaFileAlt className="w-4 h-4 sm:w-5 sm:h-5" />}
                variant="blue"
                size="md"
                className="mr-3 sm:mr-4"
                hover={false}
              />
              Task Title
              <span className="text-red-500 ml-2 font-bold">*</span>
            </label>
            <div className="relative group">
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-slate-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder-slate-400 bg-white/80 backdrop-blur-sm hover:bg-white hover:border-slate-300 text-base sm:text-lg font-medium shadow-sm hover:shadow-md"
                placeholder="What needs to be done?"
                maxLength={255}
                disabled={isSubmitting}
              />
              <div className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
                <div className="bg-blue-100 rounded-lg p-1 sm:p-1.5">
                  <FaFileAlt className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="mt-2 sm:mt-3 flex items-center justify-between">
              <div className="text-xs sm:text-sm text-slate-500 font-medium">
                {title.length}/255 characters
              </div>
              {title.length > 200 && (
                <div className="text-xs sm:text-sm text-amber-600 flex items-center font-medium">
                  <FaExclamationTriangle className="w-3 h-3 mr-1" />
                  Approaching limit
                </div>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="flex text-sm sm:text-base font-semibold text-slate-900 mb-3 sm:mb-4 items-center"
            >
              <IconContainer
                icon={<FaAlignLeft className="w-4 h-4 sm:w-5 sm:h-5" />}
                variant="indigo"
                size="md"
                className="mr-3 sm:mr-4"
                hover={false}
              />
              Description
            </label>
            <div className="relative group">
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 border-2 border-slate-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300 placeholder-slate-400 resize-none bg-white/80 backdrop-blur-sm hover:bg-white hover:border-slate-300 text-base sm:text-lg font-medium shadow-sm hover:shadow-md"
                placeholder="Describe what needs to be done..."
                rows={3}
                disabled={isSubmitting}
              />
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
                <div className="bg-indigo-100 rounded-lg p-1 sm:p-1.5">
                  <FaAlignLeft className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600" />
                </div>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
            loadingText="Creating Task..."
            variant="primary"
            size="lg"
            className="w-full"
            icon={<MdOutlineAdd className="w-5 h-5 sm:w-6 sm:h-6" />}
            hoverIcon={<FaCheck className="w-4 h-4 sm:w-5 sm:h-5" />}
          >
            Create Task
          </Button>
        </div>
      </form>
    </div>
  );
};
