import type { SeenEmptyStateProps } from '@/types';

export const SeenEmptyState = ({ title, message, buttonLabel, onButtonClick }: SeenEmptyStateProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-12 max-w-lg mx-auto">
      <div className="mb-6">
        <svg className="w-20 h-20 mx-auto text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      <p className="text-gray-600 mb-8 leading-relaxed">
        {message}
      </p>
      <button
        onClick={onButtonClick}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-full transition-colors"
      >
        {buttonLabel}
      </button>
    </div>
  );
}

