import React from "react";

interface IconContainerProps {
  icon: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "success" | "error" | "blue" | "indigo" | "gray";
  className?: string;
  hover?: boolean;
}

export const IconContainer: React.FC<IconContainerProps> = ({
  icon,
  size = "md",
  variant = "primary",
  className = "",
  hover = true,
}) => {
  const sizeClasses = {
    sm: "p-1 sm:p-1.5",
    md: "p-1.5 sm:p-2",
    lg: "p-2 sm:p-3",
  };

  const variantClasses = {
    primary: "bg-primary-100 text-primary",
    success: "bg-success-100 text-success",
    error: "bg-error-100 text-error",
    blue: "bg-blue-100 text-blue-600",
    indigo: "bg-indigo-100 text-indigo-600",
    gray: "bg-gray-100 text-text-muted",
  };

  const roundedClasses = {
    sm: "rounded-lg sm:rounded-xl",
    md: "rounded-lg sm:rounded-xl",
    lg: "rounded-xl sm:rounded-2xl",
  };

  return (
    <div
      className={`${sizeClasses[size]} ${variantClasses[variant]} ${
        roundedClasses[size]
      } shadow-sm flex-shrink-0 ${
        hover ? "group-hover:scale-110 transition-transform duration-300" : ""
      } ${className}`}
    >
      {icon}
    </div>
  );
};
