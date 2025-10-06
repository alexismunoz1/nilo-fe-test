import type { LoadingSpinnerProps } from '@/types';

export const LoadingSpinner = ({ message, size = 'medium', className = '' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12',
    large: 'h-16 w-16',
  };

  return (
    <div className={`text-center text-blue-600 py-12 ${className}`}>
      <div className={`animate-spin rounded-full ${sizeClasses[size]} border-b-2 border-blue-600 mx-auto`}></div>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}

