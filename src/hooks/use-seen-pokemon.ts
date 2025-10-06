'use client';

import { useState, useEffect, useCallback } from 'react';
import type { SeenPokemon, Pokemon, FuzzyPokemon } from '@/types';
import {
  getSeenPokemon,
  addSeenPokemon,
  removeSeenPokemon,
  isPokemonSeen,
  clearSeenPokemon,
} from '@/lib/local-storage';

export const useSeenPokemon = () => {
  const [seenPokemon, setSeenPokemonState] = useState<SeenPokemon[]>([]);
  const [count, setCount] = useState(0);

  const updateState = useCallback(() => {
    const stored = getSeenPokemon();
    setSeenPokemonState(stored);
    setCount(stored.length);
  }, []);

  useEffect(() => {
    updateState();

    const handleStorageChange = () => {
      updateState();
    };

    window.addEventListener('seenPokemonChanged', handleStorageChange);

    return () => {
      window.removeEventListener('seenPokemonChanged', handleStorageChange);
    };
  }, [updateState]);

  const markAsSeen = useCallback((pokemon: Pokemon | FuzzyPokemon) => {
    const seenPokemonData = {
      key: pokemon.key,
      species: pokemon.species,
      num: pokemon.num,
      sprite: pokemon.sprite,
      types: pokemon.types,
      baseStats: 'baseStats' in pokemon ? pokemon.baseStats : {
        hp: 0,
        attack: 0,
        defense: 0,
        specialattack: 0,
        specialdefense: 0,
        speed: 0,
      },
    };
    
    addSeenPokemon(seenPokemonData);
    window.dispatchEvent(new Event('seenPokemonChanged'));
  }, []);

  const markAsUnseen = useCallback((pokemonKey: string) => {
    removeSeenPokemon(pokemonKey);
    window.dispatchEvent(new Event('seenPokemonChanged'));
  }, []);

  const toggleSeen = useCallback((pokemon: Pokemon | FuzzyPokemon) => {
    if (isPokemonSeen(pokemon.key)) {
      markAsUnseen(pokemon.key);
    } else {
      markAsSeen(pokemon);
    }
  }, [markAsSeen, markAsUnseen]);

  const isSeen = useCallback((pokemonKey: string) => {
    return isPokemonSeen(pokemonKey);
  }, []);

  const clearAll = useCallback(() => {
    clearSeenPokemon();
    window.dispatchEvent(new Event('seenPokemonChanged'));
  }, []);

  return {
    seenPokemon,
    seenCount: count,
    markAsSeen,
    markAsUnseen,
    toggleSeenPokemon: toggleSeen,
    isSeenPokemon: isSeen,
    clearAllSeen: clearAll,
  };
}