import Image from 'next/image';
import { useState } from 'react';
import { StatBar } from './stat-bar';
import { TypeBadge } from './type-badge';
import { formatPokemonNumber } from '@/lib/utils';
import { WORDINGS } from '@/lib/wordings';
import type { PokemonCardBaseProps } from '@/types';

export const PokemonCard = ({ pokemon, isSeen, onToggleSeen }: PokemonCardBaseProps) => {
  const [imageError, setImageError] = useState(false);
  return (
    <div className={`bg-white rounded-[12px] shadow-md p-6 hover:shadow-lg transition-shadow relative border-t-8 border-t-white`} style={isSeen ? { borderTopColor: '#22C55D' } : {}}>
      <button
        onClick={onToggleSeen}
        className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isSeen
          ? 'shadow-[0_4px_8px_rgba(34,197,94,0.4)]'
          : 'bg-white border-2 border-blue-500 hover:bg-blue-50 shadow-[0_4px_8px_rgba(59,130,246,0.3)]'
          }`}
        style={isSeen ? { backgroundColor: '#22C55D' } : {}}
        aria-label={isSeen ? WORDINGS.POKEMON_CARD.MARK_AS_UNSEEN_ARIA : WORDINGS.POKEMON_CARD.MARK_AS_SEEN_ARIA}
      >
        <svg
          className={`w-6 h-6 ${isSeen ? 'text-white' : 'text-blue-500'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isSeen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
            />
          )}
        </svg>
      </button>

      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-4 relative flex items-center justify-center">
          {imageError ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-red-100 to-blue-100 rounded-lg">
              <svg className="w-16 h-16 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="#e53e3e" stroke="#000" strokeWidth="2" />
                <circle cx="12" cy="12" r="6" fill="#ffffff" stroke="#000" strokeWidth="1" />
                <circle cx="12" cy="12" r="2" fill="#000000" />
                <path d="M2 12h20" stroke="#000" strokeWidth="2" fill="none" />
              </svg>
              <span className="text-xs text-gray-600 mt-1 font-medium">No image available</span>
            </div>
          ) : (
            <Image
              src={pokemon.sprite}
              alt={pokemon.species}
              width={110}
              height={110}
              className="object-contain"
              priority={false}
              onError={() => setImageError(true)}
            />
          )}
        </div>
        <div className="bg-gray-100 rounded-lg px-3 py-1 inline-block mb-2">
          <span className="text-sm text-gray-600 font-medium">
            {formatPokemonNumber(pokemon.num)}
          </span>
        </div>
        <h3 className="text-xl font-semibold capitalize mb-3">
          {pokemon.species}
        </h3>
        <div className="flex justify-center gap-2 mb-4">
          {pokemon.types.map((type: { name: string }, index: number) => (
            <TypeBadge key={index} typeName={type.name} />
          ))}
        </div>
        {'baseStats' in pokemon && pokemon.baseStats ? (
          <div className="space-y-2">
            <StatBar
              label={WORDINGS.STATS.HP}
              value={pokemon.baseStats.hp}
            />
            <StatBar
              label={WORDINGS.STATS.ATTACK}
              value={pokemon.baseStats.attack}
            />
            <StatBar
              label={WORDINGS.STATS.DEFENSE}
              value={pokemon.baseStats.defense}
            />
          </div>
        ) : (
          <div className="text-center text-gray-500 text-sm">
            {WORDINGS.POKEMON_CARD.STATS_NOT_AVAILABLE}
          </div>
        )}
      </div>
    </div>
  );
}

