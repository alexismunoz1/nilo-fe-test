'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSeenPokemon } from '@/hooks/use-seen-pokemon';
import Header from '@/components/header';
import PokemonCard from '@/components/pokemon-card';
import { WORDINGS } from '@/lib/wordings';

export default function SeenPage() {
  const router = useRouter();
  const { seenPokemon, clearAllSeen, markAsUnseen } = useSeenPokemon();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClearAll = () => {
    setShowConfirmation(true);
  };

  const confirmClear = () => {
    clearAllSeen();
    setShowConfirmation(false);
  };

  const cancelClear = () => {
    setShowConfirmation(false);
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#E2E8F0] to-[#FFFFFF]">
      <Header fixed={true} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {seenPokemon.length > 0 && (
            <button
              onClick={handleBackToHome}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-semibold mb-6 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {WORDINGS.SEEN.BACK_TO_ALL_BUTTON}
            </button>
          )}

          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {WORDINGS.SEEN.TITLE}
            </h1>
            
            {seenPokemon.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-lg mx-auto">
                <div className="mb-6">
                  <svg className="w-20 h-20 mx-auto text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {WORDINGS.SEEN.NO_SEEN_POKEMON_TITLE}
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {WORDINGS.SEEN.NO_SEEN_POKEMON_MESSAGE}
                </p>
                <button
                  onClick={handleBackToHome}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-full transition-colors"
                >
                  {WORDINGS.SEEN.EXPLORE_POKEMON_BUTTON}
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-600 text-lg mb-2">
                  {WORDINGS.SEEN.DESCRIPTION(seenPokemon.length)}
                </p>
                <p className="text-gray-500 text-sm mb-6">
                  {WORDINGS.SEEN.SUBTITLE}
                </p>
                <button
                  onClick={handleClearAll}
                  className="border-2 border-red-500 text-red-500 hover:bg-red-50 font-semibold px-8 py-3 rounded-full transition-colors"
                >
                  {WORDINGS.SEEN.CLEAR_ALL_BUTTON}
                </button>
              </>
            )}
          </div>

          {seenPokemon.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seenPokemon.slice().reverse().map((pokemon) => (
                <PokemonCard
                  key={pokemon.key}
                  pokemon={pokemon}
                  isSeen={true}
                  onToggleSeen={() => markAsUnseen(pokemon.key)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {WORDINGS.SEEN.CONFIRM_CLEAR_TITLE}
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {WORDINGS.SEEN.CONFIRM_CLEAR_MESSAGE}
            </p>
            <div className="flex gap-4">
              <button
                onClick={cancelClear}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-full transition-colors"
              >
                {WORDINGS.SEEN.CANCEL_BUTTON}
              </button>
              <button
                onClick={confirmClear}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-full transition-colors"
              >
                {WORDINGS.SEEN.YES_CLEAR_BUTTON}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

