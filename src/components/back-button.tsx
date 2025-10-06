import type { BackButtonProps } from '@/types';

export const BackButton = ({ label, onClick, className = '' }: BackButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 text-blue-500 hover:text-blue-600 font-semibold transition-colors ${className}`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      {label}
    </button>
  );
}

