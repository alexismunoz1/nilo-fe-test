import Image from 'next/image';
import { useState } from 'react';
import { StatBar } from './stat-bar';
import { TypeBadge } from './type-badge';
import { PokemonImagePlaceholder } from './pokemon-image-placeholder';
import { PokemonToggleButton } from './pokemon-toggle-button';
import { formatPokemonNumber } from '@/lib/utils';
import { WORDINGS } from '@/lib/wordings';
import type { PokemonCardBaseProps } from '@/types';

export const PokemonCard = ({ pokemon, isSeen, onToggleSeen }: PokemonCardBaseProps) => {
  const [imageError, setImageError] = useState(false);
  return (
    <div className={`bg-white rounded-[12px] shadow-md p-6 hover:shadow-lg transition-shadow relative border-t-8 border-t-white`} style={isSeen ? { borderTopColor: '#22C55D' } : {}}>
      <PokemonToggleButton isSeen={isSeen} onToggle={onToggleSeen} />

      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-4 relative flex items-center justify-center">
          {imageError ? (
            <PokemonImagePlaceholder />
          ) : (
            <Image
              src={pokemon.sprite}
              alt={pokemon.species}
              width={110}
              height={110}
              className="object-contain"
              style={{ height: 'auto' }}
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

