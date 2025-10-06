import { calculateStatPercentage } from '@/lib/utils';
import { COLORS } from '@/lib/constants';
import type { StatBarProps } from '@/types';

export default function StatBar({ label, value, maxValue = 200 }: StatBarProps) {
  const percentage = calculateStatPercentage(value, maxValue);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="text-sm font-semibold text-gray-900 w-8 text-right">
          {value}
        </span>
      </div>
      <div className="flex-1 bg-gray-200 rounded-full h-1">
        <div
          className="h-1 rounded-full"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: COLORS.STAT_BAR
          }}
        />
      </div>
    </div>
  );
}

