import React from "react";

interface StatusBadgeProps {
  status: "active" | "completed" | "achievement";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "px-2 sm:px-3 py-1 text-xs",
    md: "px-3 sm:px-4 py-2 text-xs sm:text-sm",
    lg: "px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base",
  };

  const statusClasses = {
    active: "bg-success-100 text-success-800",
    completed: "bg-success-100 text-success-800",
    achievement: "bg-success-100 text-success-800",
  };

  const dotSizeClasses = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2 sm:w-3 sm:h-3",
    lg: "w-2 h-2 sm:w-3 sm:h-3",
  };

  const getStatusText = () => {
    switch (status) {
      case "active":
        return "Active";
      case "completed":
        return "Completed";
      case "achievement":
        return "Achievement";
      default:
        return "Unknown";
    }
  };

  return (
    <div
      className={`flex-shrink-0 ${statusClasses[status]} ${sizeClasses[size]} rounded-xl sm:rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 ${className}`}
    >
      <div className="flex items-center">
        <div
          className={`${dotSizeClasses[size]} bg-success rounded-full mr-2 sm:mr-3 animate-pulse`}
        ></div>
        <span className="text-xs sm:text-sm lg:text-base font-black">
          {getStatusText()}
        </span>
      </div>
    </div>
  );
};
