import type { TypeBadgeProps } from '@/types';

export default function TypeBadge({ typeName }: TypeBadgeProps) {
  const getTypeColor = (type: string): string => {
    const colors: { [key: string]: string } = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500',
      ice: 'bg-cyan-300',
      fighting: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-600',
      flying: 'bg-indigo-400',
      psychic: 'bg-pink-500',
      bug: 'bg-lime-500',
      rock: 'bg-yellow-700',
      ghost: 'bg-purple-700',
      dragon: 'bg-indigo-600',
      dark: 'bg-gray-700',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300',
    };
    return colors[type.toLowerCase()] || 'bg-orange-500';
  };

  return (
    <span
      className={`${getTypeColor(typeName)} text-white text-xs px-3 py-1 rounded-full uppercase font-semibold`}
    >
      {typeName}
    </span>
  );
}

