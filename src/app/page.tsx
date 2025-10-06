'use client';

import { useState, useEffect } from 'react';
import { usePokemonList, usePokemonSearch, useSeenPokemon, useDebounce } from '@/hooks';
import { Header, Banner, PokemonCard, LoadingSpinner, ErrorMessage, EmptyState, SearchInput, VirtualizedPokemonGrid } from '@/components';
import { WORDINGS } from '@/lib/wordings';
import type { Pokemon, FuzzyPokemon } from '@/types/pokemon';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { pokemon, loading, error, loadMore } = usePokemonList(93, 10);
  const { searchResults, loading: searchLoading, searchPokemon, clearSearch } = usePokemonSearch();
  const { isSeenPokemon, toggleSeenPokemon } = useSeenPokemon();


  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      searchPokemon(debouncedSearchTerm, 10);
    } else {
      clearSearch();
    }
  }, [debouncedSearchTerm, searchPokemon, clearSearch]);

  const displayPokemon = debouncedSearchTerm.trim() ? searchResults : pokemon;
  const isLoading = debouncedSearchTerm.trim() ? searchLoading : loading;

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
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder={WORDINGS.HOME.SEARCH_PLACEHOLDER}
            />
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
            <ErrorMessage message={`${WORDINGS.COMMON.ERROR_MESSAGE}: ${error}`} />
          )}

          {!isLoading && displayPokemon.length === 0 && debouncedSearchTerm.trim() && (
            <EmptyState
              title={WORDINGS.HOME.NO_POKEMON_FOUND_TITLE}
              message={WORDINGS.HOME.NO_POKEMON_FOUND_MESSAGE}
            />
          )}

          {displayPokemon.length > 0 && !debouncedSearchTerm.trim() && (
            <VirtualizedPokemonGrid
              pokemon={displayPokemon}
              isSeenPokemon={isSeenPokemon}
              onToggleSeen={handleToggleSeen}
              hasMore={!loading}
              onLoadMore={loadMore}
              loading={loading}
            />
          )}

          {displayPokemon.length > 0 && debouncedSearchTerm.trim() && (
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
            <LoadingSpinner message={WORDINGS.HOME.LOADING_MESSAGE} />
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
