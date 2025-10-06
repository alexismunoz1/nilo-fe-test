'use client';

import { useState, useEffect, useCallback } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { 
  GET_ALL_POKEMON, 
  GET_POKEMON_BY_NAME, 
  GET_FUZZY_POKEMON 
} from '@/lib/queries/pokemon';
import type { 
  FuzzyPokemon,
  GetAllPokemonVariables,
  GetAllPokemonResponse,
  GetPokemonVariables,
  GetPokemonResponse,
  GetFuzzyPokemonVariables,
  GetFuzzyPokemonResponse 
} from '@/types';

export function usePokemonList(offset: number = 93, take: number = 10) {
  const { data, loading, error, fetchMore, refetch } = useQuery<
    GetAllPokemonResponse,
    GetAllPokemonVariables
  >(GET_ALL_POKEMON, {
    variables: { offset, take },
    notifyOnNetworkStatusChange: true,
  });

  const loadMore = () => {
    const currentPokemon = data?.getAllPokemon || [];
    return fetchMore({
      variables: {
        offset: offset + currentPokemon.length,
        take,
      },
    });
  };

  return {
    pokemon: data?.getAllPokemon || [],
    loading,
    error: error?.message,
    loadMore,
    refetch,
  };
}

export function usePokemonDetail() {
  const [getPokemon, { data, loading, error }] = useLazyQuery<
    GetPokemonResponse,
    GetPokemonVariables
  >(GET_POKEMON_BY_NAME);

  const fetchPokemon = (pokemonName: string) => {
    getPokemon({ 
      variables: { pokemon: pokemonName.toLowerCase() } 
    });
  };

  return {
    pokemon: data?.getPokemon,
    loading,
    error: error?.message,
    fetchPokemon,
  };
}

export function usePokemonSearch() {
  const [searchResults, setSearchResults] = useState<FuzzyPokemon[]>([]);
  const [getFuzzyPokemon, { data, loading, error }] = useLazyQuery<
    GetFuzzyPokemonResponse,
    GetFuzzyPokemonVariables
  >(GET_FUZZY_POKEMON);

  // Usar useEffect para manejar cambios en los datos en lugar de onCompleted
  useEffect(() => {
    if (data?.getFuzzyPokemon) {
      console.log('Search results received:', data.getFuzzyPokemon.length);
      setSearchResults(data.getFuzzyPokemon);
    }
  }, [data?.getFuzzyPokemon]); // Solo depender de los datos específicos, no del objeto completo

  const searchPokemon = useCallback((searchTerm: string, take: number = 10) => {
    if (searchTerm.trim().length === 0) {
      setSearchResults([]);
      return;
    }

    getFuzzyPokemon({
      variables: {
        pokemon: searchTerm.trim(),
        take,
      },
    });
  }, [getFuzzyPokemon]);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
  }, []);

  return {
    searchResults,
    loading,
    error: error?.message,
    searchPokemon,
    clearSearch,
  };
}