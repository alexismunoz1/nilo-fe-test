'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { PokemonCard } from './pokemon-card';
import type { Pokemon, FuzzyPokemon } from '@/types/pokemon';

interface VirtualizedPokemonGridProps {
  pokemon: (Pokemon | FuzzyPokemon)[];
  isSeenPokemon: (key: string) => boolean;
  onToggleSeen: (poke: Pokemon | FuzzyPokemon) => void;
  hasMore: boolean;
  onLoadMore: () => void;
  loading: boolean;
}

export const VirtualizedPokemonGrid = ({
  pokemon,
  isSeenPokemon,
  onToggleSeen,
  hasMore,
  onLoadMore,
  loading,
}: VirtualizedPokemonGridProps) => {
  const [columnsPerRow, setColumnsPerRow] = useState(3);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setColumnsPerRow(1);
      } else if (width < 1024) {
        setColumnsPerRow(2);
      } else {
        setColumnsPerRow(3);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < pokemon.length; i += columnsPerRow) {
      result.push(pokemon.slice(i, i + columnsPerRow));
    }
    return result;
  }, [pokemon, columnsPerRow]);

  const parentRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 400,
    overscan: 2,
  });

  const virtualItems = virtualizer.getVirtualItems();
  
  useEffect(() => {
    const [lastItem] = [...virtualItems].reverse();
    if (!lastItem) return;

    if (lastItem.index >= rows.length - 2 && hasMore && !loading) {
      onLoadMore();
    }
  }, [virtualItems, hasMore, loading, onLoadMore, rows.length]);

  return (
    <div
      ref={parentRef}
      className="w-full h-[800px] overflow-auto"
      style={{ contain: 'strict' }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const row = rows[virtualRow.index];
          return (
            <div
              key={virtualRow.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div className="grid gap-8" style={{
                gridTemplateColumns: `repeat(${columnsPerRow}, 1fr)`,
                height: '100%',
              }}>
                {row.map((poke) => (
                  <PokemonCard
                    key={poke.key}
                    pokemon={poke}
                    isSeen={isSeenPokemon(poke.key)}
                    onToggleSeen={() => onToggleSeen(poke)}
                  />
                ))}
                {row.length < columnsPerRow && (
                  Array.from({ length: columnsPerRow - row.length }).map((_, index) => (
                    <div key={`empty-${index}`} />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
