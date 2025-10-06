import type { ErrorMessageProps } from '@/types';

export const ErrorMessage = ({ message, className = '' }: ErrorMessageProps) => {
  return (
    <div className={`bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center ${className}`}>
      {message}
    </div>
  );
}

