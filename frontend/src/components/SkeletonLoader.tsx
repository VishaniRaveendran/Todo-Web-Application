import React from "react";

interface SkeletonProps {
  className?: string;
  height?: string;
  width?: string;
  rounded?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  height = "h-4",
  width = "w-full",
  rounded = "rounded",
}) => {
  return (
    <div
      className={`skeleton ${height} ${width} ${rounded} ${className}`}
    ></div>
  );
};

export const TaskCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 overflow-hidden w-full">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 gap-4">
          <div className="flex-1 sm:pr-6">
            <div className="flex items-start sm:items-center mb-3">
              <Skeleton
                className="mr-3 sm:mr-4 flex-shrink-0"
                height="h-8 sm:h-10"
                width="w-8 sm:w-10"
                rounded="rounded-lg sm:rounded-xl"
              />
              <Skeleton
                className="flex-1"
                height="h-6 sm:h-7"
                width="w-3/4"
                rounded="rounded-lg"
              />
            </div>
            <Skeleton
              className="ml-0 sm:ml-12"
              height="h-4 sm:h-5"
              width="w-full"
              rounded="rounded-lg"
            />
            <Skeleton
              className="ml-0 sm:ml-12 mt-2"
              height="h-4 sm:h-5"
              width="w-2/3"
              rounded="rounded-lg"
            />
          </div>
          <Skeleton
            className="w-full sm:w-auto"
            height="h-10 sm:h-12"
            width="w-full sm:w-32"
            rounded="rounded-lg sm:rounded-xl"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center pt-3 sm:pt-4 border-t border-gray-100/50 gap-2 sm:gap-0">
          <div className="flex items-center">
            <Skeleton
              className="mr-2 sm:mr-3"
              height="h-6 sm:h-8"
              width="w-6 sm:w-8"
              rounded="rounded-md sm:rounded-lg"
            />
            <Skeleton
              height="h-4 sm:h-5"
              width="w-32 sm:w-40"
              rounded="rounded-lg"
            />
          </div>
          <div className="flex items-center space-x-2 sm:ml-auto">
            <Skeleton height="h-2" width="w-2" rounded="rounded-full" />
            <Skeleton height="h-4" width="w-12" rounded="rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const TaskFormSkeleton: React.FC = () => {
  return (
    <div
      data-testid="task-form-skeleton"
      className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
    >
      {/* Header Skeleton */}
      <div className="bg-blue-600 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center mb-3 sm:mb-4">
            <Skeleton
              className="mr-3 sm:mr-5"
              height="h-8 sm:h-10 lg:h-12"
              width="w-8 sm:w-10 lg:w-12"
              rounded="rounded-xl sm:rounded-2xl"
            />
            <Skeleton
              height="h-6 sm:h-7 lg:h-8"
              width="w-48 sm:w-56 lg:w-64"
              rounded="rounded-lg"
            />
          </div>
          <Skeleton height="h-4 sm:h-5" width="w-full" rounded="rounded-lg" />
        </div>
      </div>

      {/* Form Skeleton */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          {/* Title Field */}
          <div>
            <div className="flex items-center mb-3 sm:mb-4">
              <Skeleton
                className="mr-3 sm:mr-4"
                height="h-8 sm:h-10"
                width="w-8 sm:w-10"
                rounded="rounded-lg sm:rounded-xl"
              />
              <Skeleton
                height="h-5 sm:h-6"
                width="w-24 sm:w-28"
                rounded="rounded-lg"
              />
              <Skeleton
                className="ml-2"
                height="h-4"
                width="w-4"
                rounded="rounded-full"
              />
            </div>
            <Skeleton
              height="h-12 sm:h-14"
              width="w-full"
              rounded="rounded-xl sm:rounded-2xl"
            />
            <div className="mt-2 sm:mt-3 flex items-center justify-between">
              <Skeleton
                height="h-3 sm:h-4"
                width="w-24 sm:w-32"
                rounded="rounded-lg"
              />
            </div>
          </div>

          {/* Description Field */}
          <div>
            <div className="flex items-center mb-3 sm:mb-4">
              <Skeleton
                className="mr-3 sm:mr-4"
                height="h-8 sm:h-10"
                width="w-8 sm:w-10"
                rounded="rounded-lg sm:rounded-xl"
              />
              <Skeleton
                height="h-5 sm:h-6"
                width="w-28 sm:w-32"
                rounded="rounded-lg"
              />
              <Skeleton
                className="ml-2"
                height="h-4"
                width="w-4"
                rounded="rounded-full"
              />
            </div>
            <Skeleton
              height="h-20 sm:h-24"
              width="w-full"
              rounded="rounded-xl sm:rounded-2xl"
            />
          </div>

          {/* Submit Button */}
          <Skeleton
            height="h-12 sm:h-14"
            width="w-full"
            rounded="rounded-xl sm:rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export const ListSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <TaskCardSkeleton />
        </div>
      ))}
    </div>
  );
};

export const LoadingSpinner: React.FC<{
  size?: "sm" | "md" | "lg";
  color?: "primary" | "success" | "blue";
  text?: string;
  subtext?: string;
}> = ({ size = "md", color = "primary", text = "Loading...", subtext }) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  };

  const colorClasses = {
    primary: "border-primary",
    success: "border-success",
    blue: "border-blue-600",
  };

  const dotColors = {
    primary: ["bg-primary", "bg-accent", "bg-success"],
    success: ["bg-success", "bg-success-600", "bg-success-700"],
    blue: ["bg-blue-600", "bg-blue-500", "bg-blue-400"],
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-16">
      <div className="relative mb-4 sm:mb-6">
        <div
          className={`animate-spin rounded-full ${sizeClasses[size]} border-4 border-gray-200`}
        ></div>
        <div
          className={`animate-spin rounded-full ${sizeClasses[size]} border-4 ${colorClasses[color]} border-t-transparent absolute top-0 left-0`}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`${sizeClasses[size]
              .replace("h-", "h-")
              .replace("w-", "w-")
              .replace("16", "6")
              .replace("24", "8")} ${colorClasses[color].replace(
              "border-",
              "bg-"
            )} rounded-full animate-pulse`}
          ></div>
        </div>
      </div>
      <div className="text-center">
        <p className="text-text-primary font-bold text-base sm:text-lg mb-2">
          {text}
        </p>
        {subtext && (
          <p className="text-text-muted text-sm sm:text-base">{subtext}</p>
        )}
        <div className="mt-4 flex items-center justify-center space-x-1">
          {dotColors[color].map((dotColor, index) => (
            <div
              key={index}
              className={`w-2 h-2 ${dotColor} rounded-full animate-bounce`}
              style={{ animationDelay: `${index * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
