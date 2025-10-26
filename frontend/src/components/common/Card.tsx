import React from "react";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "primary";
  hover?: boolean;
  className?: string;
  padding?: "sm" | "md" | "lg";
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = "md",
}) => {
  const baseClasses =
    "bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 relative overflow-hidden";

  const paddingClasses = {
    sm: "p-4 sm:p-6",
    md: "p-4 sm:p-6 lg:p-8",
    lg: "p-6 sm:p-8 lg:p-10",
  };

  return (
    <div className={`${baseClasses} ${className}`}>
      <div className={`${paddingClasses[padding]} relative z-10`}>
        {children}
      </div>
    </div>
  );
};
