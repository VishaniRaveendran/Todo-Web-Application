import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "success" | "error" | "secondary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  hoverIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  loadingText = "Loading...",
  className = "",
  icon,
  iconPosition = "left",
  hoverIcon,
}) => {
  const baseClasses =
    "group relative font-semibold transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";

  const sizeClasses = {
    sm: "px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg",
    md: "px-4 sm:px-6 py-3 text-xs sm:text-sm rounded-lg sm:rounded-xl",
    lg: "px-6 sm:px-8 py-4 sm:py-5 text-base sm:text-lg rounded-xl sm:rounded-2xl",
  };

  const variantClasses = {
    primary:
      "bg-primary text-white hover:bg-primary-600 focus:ring-primary/30 shadow-lg hover:shadow-2xl",
    success:
      "bg-success text-white hover:bg-success-600 focus:ring-success/30 shadow-lg hover:shadow-2xl",
    error:
      "bg-error text-white hover:bg-error-600 focus:ring-error/30 shadow-lg hover:shadow-2xl",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500/30 shadow-lg hover:shadow-2xl",
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white/30 border-t-white"></div>
          <span className="ml-2 sm:ml-3 text-xs sm:text-sm font-bold">
            {loadingText}
          </span>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          {icon && iconPosition === "left" && (
            <div className="mr-2 sm:mr-3">{icon}</div>
          )}
          <span className="text-xs sm:text-sm font-bold">{children}</span>
          {icon && iconPosition === "right" && (
            <div className="ml-2 sm:ml-3">{icon}</div>
          )}
          {hoverIcon && (
            <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {hoverIcon}
            </div>
          )}
        </div>
      )}
    </button>
  );
};
