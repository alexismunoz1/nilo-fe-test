'use client';

import { useState, useEffect } from 'react';
import { usePokemonList, usePokemonSearch } from '@/hooks/use-pokemon-list';
import { useSeenPokemon } from '@/hooks/use-seen-pokemon';
import { useDebounce } from '@/hooks/use-debounce';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import Header from '@/components/header';
import Banner from '@/components/banner';
import PokemonCard from '@/components/pokemon-card';
import { WORDINGS } from '@/lib/wordings';
import type { Pokemon, FuzzyPokemon } from '@/types/pokemon';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { pokemon, loading, error, loadMore } = usePokemonList(93, 10);
  const { searchResults, loading: searchLoading, searchPokemon, clearSearch } = usePokemonSearch();
  const { isSeenPokemon, toggleSeenPokemon } = useSeenPokemon();

  const { observerTarget } = useInfiniteScroll({
    onLoadMore: loadMore,
    loading,
    hasMore: !debouncedSearchTerm.trim(),
    threshold: 200,
  });

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      searchPokemon(debouncedSearchTerm, 20);
    } else {
      clearSearch();
    }
  }, [debouncedSearchTerm, searchPokemon, clearSearch]);

  const displayPokemon = debouncedSearchTerm.trim() ? searchResults : pokemon;
  const isLoading = debouncedSearchTerm.trim() ? searchLoading : loading;

  useEffect(() => {
    console.log('Display Pokemon:', displayPokemon.length, 'Search Term:', debouncedSearchTerm);
  }, [displayPokemon, debouncedSearchTerm]);

  const handleToggleSeen = (poke: Pokemon | FuzzyPokemon) => {
    const wasSeen = isSeenPokemon(poke.key);
    toggleSeenPokemon(poke);

    if (!wasSeen) {
      setBannerMessage(WORDINGS.HOME.POKEMON_ADDED_TO_SEEN(poke.species));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#E2E8F0] to-[#FFFFFF]">
      <Header fixed={true} />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
              {WORDINGS.HOME.TITLE}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {WORDINGS.HOME.DESCRIPTION}
            </p>
          </div>

          <div className="mb-8">
            <div className="relative max-w-6xl mx-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={WORDINGS.HOME.SEARCH_PLACEHOLDER}
                className="w-full px-12 py-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-gray-700 font-medium">
              {debouncedSearchTerm.trim()
                ? WORDINGS.HOME.FOUND_POKEMON(searchResults.length, debouncedSearchTerm)
                : WORDINGS.HOME.SHOWING_POKEMON(pokemon.length)
              }
            </p>
          </div>


          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
              {WORDINGS.COMMON.ERROR_MESSAGE}: {error}
            </div>
          )}

          {!isLoading && displayPokemon.length === 0 && debouncedSearchTerm.trim() && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">{WORDINGS.HOME.NO_POKEMON_FOUND_TITLE}</h3>
              <p className="text-gray-500">{WORDINGS.HOME.NO_POKEMON_FOUND_MESSAGE}</p>
            </div>
          )}

          {displayPokemon.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayPokemon.map((poke: Pokemon | FuzzyPokemon) => (
                <PokemonCard
                  key={poke.key}
                  pokemon={poke}
                  isSeen={isSeenPokemon(poke.key)}
                  onToggleSeen={() => handleToggleSeen(poke)}
                />
              ))}
            </div>
          )}

          {isLoading && (
            <div className="text-center text-blue-600 py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4">{WORDINGS.HOME.LOADING_MESSAGE}</p>
            </div>
          )}


          {!debouncedSearchTerm.trim() && !loading && pokemon.length > 0 && (
            <div ref={observerTarget} className="py-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600 text-sm">{WORDINGS.HOME.LOADING_MORE_MESSAGE}</p>
            </div>
          )}
        </div>
      </main>

      {bannerMessage && (
        <Banner
          message={bannerMessage}
          onClose={() => setBannerMessage(null)}
          duration={3000}
        />
      )}
    </div>
  );
}
