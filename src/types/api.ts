import { Pokemon, FuzzyPokemon } from './pokemon';

export interface GetAllPokemonVariables {
  offset?: number;
  take?: number;
}

export interface GetAllPokemonResponse {
  getAllPokemon: Pokemon[];
}

export interface GetPokemonVariables {
  pokemon: string;
}

export interface GetPokemonResponse {
  getPokemon: Pokemon;
}

export interface GetFuzzyPokemonVariables {
  pokemon: string;
  take?: number;
}

export interface GetFuzzyPokemonResponse {
  getFuzzyPokemon: FuzzyPokemon[];
}

export interface QueryState<T> {
  data?: T;
  loading: boolean;
  error?: string;
}

export interface PaginationParams {
  offset: number;
  limit: number;
}