import type { EmptyStateProps } from '@/types';

export const EmptyState = ({ title, message, icon = 'search', className = '' }: EmptyStateProps) => {
  const icons = {
    search: (
      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  };

  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="text-gray-400 mb-4">
        {icons[icon]}
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-gray-500">{message}</p>
    </div>
  );
}

