import React from "react";
import { FaExclamationTriangle, FaRedo } from "react-icons/fa";

interface ErrorAlertProps {
  error: string;
  onRetry?: () => void;
  retryText?: string;
  className?: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  error,
  onRetry,
  retryText = "Retry",
  className = "",
}) => {
  return (
    <div
      className={`bg-error-50 border-l-4 border-error text-error-700 px-4 sm:px-6 py-3 sm:py-4 rounded-xl mb-6 sm:mb-8 shadow-sm ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div className="flex items-center">
          <div className="bg-error-100 rounded-full p-1 mr-2 sm:mr-3">
            <FaExclamationTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-error" />
          </div>
          <span className="text-xs sm:text-sm font-semibold">{error}</span>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-error-100 hover:bg-error-200 text-error-800 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 hover:scale-105 shadow-sm flex items-center justify-center sm:justify-start"
          >
            <FaRedo className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            {retryText}
          </button>
        )}
      </div>
    </div>
  );
};
