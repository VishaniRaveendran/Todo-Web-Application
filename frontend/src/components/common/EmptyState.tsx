import React from "react";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features?: Array<{
    color: string;
    text: string;
  }>;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  features = [],
  className = "",
}) => {
  return (
    <div className={`text-center py-12 sm:py-16 ${className}`}>
      <div className="relative mb-6 sm:mb-8">
        <div className="bg-primary-100 rounded-full w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center mx-auto shadow-lg">
          {icon}
        </div>
        <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-primary rounded-full animate-pulse"></div>
      </div>
      <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-3 sm:mb-4">
        {title}
      </h3>
      <p className="text-text-muted text-base sm:text-lg max-w-md mx-auto leading-relaxed mb-4 sm:mb-6 px-4">
        {description}
      </p>
      {features.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-text-muted">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-2 h-2 ${feature.color} rounded-full mr-2`}
              ></div>
              <span>{feature.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
