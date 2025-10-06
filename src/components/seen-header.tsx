import type { SeenHeaderProps } from '@/types';

export const SeenHeader = ({ description, subtitle, buttonLabel, onButtonClick }: SeenHeaderProps) => {
  return (
    <>
      <p className="text-gray-600 text-lg mb-2">
        {description}
      </p>
      <p className="text-gray-500 text-sm mb-6">
        {subtitle}
      </p>
      <button
        onClick={onButtonClick}
        className="border-2 border-red-500 text-red-500 hover:bg-red-50 font-semibold px-8 py-3 rounded-full transition-colors"
      >
        {buttonLabel}
      </button>
    </>
  );
}

