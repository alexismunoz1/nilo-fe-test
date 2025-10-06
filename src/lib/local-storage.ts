import type { SeenPokemon } from '@/types/pokemon';

const SEEN_POKEMON_KEY = 'seenPokemon';

export function getSeenPokemon(): SeenPokemon[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(SEEN_POKEMON_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading seen pokemon from localStorage:', error);
    return [];
  }
}

export function setSeenPokemon(seenPokemon: SeenPokemon[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(SEEN_POKEMON_KEY, JSON.stringify(seenPokemon));
  } catch (error) {
    console.error('Error saving seen pokemon to localStorage:', error);
  }
}

export function addSeenPokemon(pokemon: Omit<SeenPokemon, 'dateAdded'>): void {
  const seenPokemon = getSeenPokemon();
  
  const exists = seenPokemon.some(seen => seen.key === pokemon.key);
  if (exists) return;
  
  const newSeenPokemon: SeenPokemon = {
    ...pokemon,
    dateAdded: new Date().toISOString(),
  };
  
  seenPokemon.push(newSeenPokemon);
  setSeenPokemon(seenPokemon);
}

export function removeSeenPokemon(pokemonKey: string): void {
  const seenPokemon = getSeenPokemon();
  const filtered = seenPokemon.filter(seen => seen.key !== pokemonKey);
  setSeenPokemon(filtered);
}

export function isPokemonSeen(pokemonKey: string): boolean {
  const seenPokemon = getSeenPokemon();
  return seenPokemon.some(seen => seen.key === pokemonKey);
}

export function clearSeenPokemon(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SEEN_POKEMON_KEY);
}

export function getSeenPokemonCount(): number {
  return getSeenPokemon().length;
}