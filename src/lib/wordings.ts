// Wordings para la aplicación PokeDex

export const WORDINGS = {
  // Home Page
  HOME: {
    TITLE: 'Discover Amazing Pokemon',
    DESCRIPTION: 'Explore the world of Pokémon, discover their unique abilities, and build your collection. Mark your favorites as seen to keep track of your progress!',
    SEARCH_PLACEHOLDER: 'Search for Pokémon by name...',
    LOADING_MESSAGE: 'Cargando Pokémon...',
    LOADING_MORE_MESSAGE: 'Loading more Pokémon...',
    NO_POKEMON_FOUND_TITLE: 'No Pokémon found',
    NO_POKEMON_FOUND_MESSAGE: 'Try searching with a different name',
    SHOWING_POKEMON: (count: number) => `Showing ${count} Pokémon`,
    FOUND_POKEMON: (count: number, searchTerm: string) => `Found ${count} Pokémon matching "${searchTerm}"`,
    POKEMON_ADDED_TO_SEEN: (species: string) => `${species} added to seen list!`,
    POKEMON_MARKED_UNSEEN: (species: string) => `${species} marked as unseen`,
  },

  // Seen Page
  SEEN: {
    TITLE: 'Your Seen Pokémon',
    DESCRIPTION: (count: number) => `You've discovered ${count} Pokémon so far! Keep exploring to catch 'em all.`,
    SUBTITLE: 'Sorted by most recently seen',
    BACK_TO_ALL_BUTTON: 'Back to All Pokémon',
    CLEAR_ALL_BUTTON: 'Clear All Seen Pokémon',
    EXPLORE_POKEMON_BUTTON: 'Explore Pokémon',
    NO_SEEN_POKEMON_TITLE: 'No Pokémon Seen Yet',
    NO_SEEN_POKEMON_MESSAGE: 'You haven\'t marked any Pokémon as seen yet. Start exploring and click the eye icon on Pokémon cards to track your discoveries!',
    CONFIRM_CLEAR_TITLE: 'Are you sure?',
    CONFIRM_CLEAR_MESSAGE: 'This action will remove all seen Pokémon from your list. This cannot be undone.',
    CANCEL_BUTTON: 'Cancel',
    YES_CLEAR_BUTTON: 'Yes, clear all',
  },

  // Header
  HEADER: {
    TITLE: 'PokeDex',
    SUBTITLE: 'Gotta catch \'em all!',
    SEEN_BUTTON: 'Seen',
  },

  // Pokemon Card
  POKEMON_CARD: {
    STATS_NOT_AVAILABLE: 'Stats not available in search results',
    MARK_AS_SEEN_ARIA: 'Mark as seen',
    MARK_AS_UNSEEN_ARIA: 'Mark as unseen',
  },

  // Stats
  STATS: {
    HP: 'HP',
    ATTACK: 'Attack',
    DEFENSE: 'Defense',
  },

  // Common
  COMMON: {
    ERROR_MESSAGE: 'Error',
    LOADING: 'Loading...',
  }
} as const;
