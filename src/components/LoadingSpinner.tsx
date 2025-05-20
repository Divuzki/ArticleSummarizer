import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-indigo-200 rounded-full"></div>
        <div className="w-12 h-12 border-4 border-indigo-600 rounded-full animate-spin absolute left-0 top-0 border-t-transparent"></div>
      </div>
      <p className="mt-4 text-gray-600">{message}</p>
      <div className="w-64 h-2 bg-gray-200 rounded-full mt-4 overflow-hidden">
        <div className="h-full bg-indigo-500 rounded-full w-1/3 animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;