import axios from 'axios';

const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon/';
const POKEMON_SPECIES_API_URL = 'https://pokeapi.co/api/v2/pokemon-species/';

export const getRandomPokemon = async () => {
  const totalPokemon = 898;  
  const randomId = Math.floor(Math.random() * totalPokemon) + 1;
  try {
    const response = await axios.get(`${POKEMON_API_URL}${randomId}`);
    const speciesResponse = await axios.get(`${POKEMON_SPECIES_API_URL}${randomId}`);
    return {
      id: response.data.id,
      name: response.data.name,
      sprite: response.data.sprites.front_default,
      types: response.data.types.map(typeInfo => typeInfo.type.name),
      weight: response.data.weight,
      height: response.data.height,
      moves: response.data.moves.map(moveInfo => moveInfo.move.name).slice(0, 3), 
      generation: speciesResponse.data.generation.name 
    };
  } catch (error) {
    console.error('Failed to fetch random Pokémon:', error);
    throw new Error('Failed to fetch Pokémon data.');
  }
};

export const getPokemonHints = async (pokemon) => {
  return [
    `Generation: ${pokemon.generation}`, 
    `Type(s): ${pokemon.types.join(', ')}`,
    `First three moves: ${pokemon.moves.join(', ')}`,
    `Weight: ${pokemon.weight / 10} kg`, 
    `Height: ${pokemon.height / 10} meters` 
  ];
};
