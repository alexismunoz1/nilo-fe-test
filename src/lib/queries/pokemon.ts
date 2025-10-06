import { gql } from '@apollo/client';

export const POKEMON_BASIC_FIELDS = gql`
  fragment PokemonBasicFields on Pokemon {
    key
    num
    species
    sprite
    shinySprite
    color
    height
    weight
    types {
      name
    }
    baseStats {
      hp
      attack
      defense
      specialattack
      specialdefense
      speed
    }
  }
`;

export const GET_ALL_POKEMON = gql`
  ${POKEMON_BASIC_FIELDS}
  query GetAllPokemon($offset: Int, $take: Int) {
    getAllPokemon(offset: $offset, take: $take) {
      ...PokemonBasicFields
    }
  }
`;

export const GET_POKEMON = gql`
  ${POKEMON_BASIC_FIELDS}
  query GetPokemon($pokemon: PokemonEnum!) {
    getPokemon(pokemon: $pokemon) {
      ...PokemonBasicFields
      backSprite
      shinyBackSprite
    }
  }
`;

export const GET_FUZZY_POKEMON = gql`
  query GetFuzzyPokemon($pokemon: String!, $take: Int) {
    getFuzzyPokemon(pokemon: $pokemon, take: $take) {
      key
      species
      num
      sprite
      types {
        name
      }
    }
  }
`;

export const GET_POKEMON_BY_NAME = gql`
  ${POKEMON_BASIC_FIELDS}
  query GetPokemonByName($pokemon: String!) {
    getPokemon(pokemon: $pokemon) {
      ...PokemonBasicFields
      backSprite
      shinyBackSprite
    }
  }
`;