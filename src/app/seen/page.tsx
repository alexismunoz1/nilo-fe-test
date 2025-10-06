'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSeenPokemon } from '@/hooks';
import { Header, PokemonCard, BackButton, SeenEmptyState, SeenHeader, ConfirmationModal } from '@/components';
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
            <BackButton
              label={WORDINGS.SEEN.BACK_TO_ALL_BUTTON}
              onClick={handleBackToHome}
              className="mb-6"
            />
          )}

          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {WORDINGS.SEEN.TITLE}
            </h1>
            
            {seenPokemon.length === 0 ? (
              <SeenEmptyState
                title={WORDINGS.SEEN.NO_SEEN_POKEMON_TITLE}
                message={WORDINGS.SEEN.NO_SEEN_POKEMON_MESSAGE}
                buttonLabel={WORDINGS.SEEN.EXPLORE_POKEMON_BUTTON}
                onButtonClick={handleBackToHome}
              />
            ) : (
              <SeenHeader
                description={WORDINGS.SEEN.DESCRIPTION(seenPokemon.length)}
                subtitle={WORDINGS.SEEN.SUBTITLE}
                buttonLabel={WORDINGS.SEEN.CLEAR_ALL_BUTTON}
                onButtonClick={handleClearAll}
              />
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

      <ConfirmationModal
        isOpen={showConfirmation}
        title={WORDINGS.SEEN.CONFIRM_CLEAR_TITLE}
        message={WORDINGS.SEEN.CONFIRM_CLEAR_MESSAGE}
        cancelButtonLabel={WORDINGS.SEEN.CANCEL_BUTTON}
        confirmButtonLabel={WORDINGS.SEEN.YES_CLEAR_BUTTON}
        onCancel={cancelClear}
        onConfirm={confirmClear}
      />
    </div>
  );
}

