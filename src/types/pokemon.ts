// Tipos para los stats de Pokémon - La API devuelve números directamente
export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialattack: number;
  specialdefense: number;
  speed: number;
}

export interface PokemonType {
  name: string;
}


export interface PokemonSprites {
  front_default?: string;
  back_default?: string;
  front_shiny?: string;
  back_shiny?: string;
}

export interface Pokemon {
  key: string;
  num: number;
  species: string;
  types: PokemonType[];
  baseStats: PokemonStats;
  sprite: string;
  shinySprite: string;
  backSprite?: string;
  shinyBackSprite?: string;
  color: string;
  height: number;
  weight: number;
}

export interface PokemonConnection {
  edges: PokemonEdge[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
  };
}

export interface PokemonEdge {
  node: Pokemon;
  cursor: string;
}

export interface FuzzyPokemon {
  key: string;
  species: string;
  num: number;
  sprite: string;
  types: PokemonType[];
}

export enum PokemonEnum {
  BULBASAUR = "bulbasaur",
  IVYSAUR = "ivysaur",
  VENUSAUR = "venusaur",
}

export interface SeenPokemon {
  key: string;
  species: string;
  num: number;
  sprite: string;
  types: PokemonType[];
  baseStats: PokemonStats;
  dateAdded: string;
}