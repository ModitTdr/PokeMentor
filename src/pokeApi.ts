const API = "https://pokeapi.co/api/v2/pokemon/"

interface Pokemon {
   abilities: [];
   base_experience: number;
   cries: {};
   form: [];
   game_indices: [];
   height: number;
   held_items: [];
   id: number;
   is_default: boolean;
   location_area_encounters: string;
   moves: [];
   name: string;
   order: number;
   past_abilities: [];
   past_types: [];
   species: {};
   sprites: {};
   stats: [];
   types: [];
   weight: number;
}
interface PokemonListItem {
   results: [];
}

export const apiCall = async (): Promise<PokemonListItem> => {
   try {
      const response = await fetch(API);
      if (!response.ok) {
         throw new Error(`API call failed with status: ${response.status}`);
      }
      const data = await response.json();
      return data;

   } catch (error) {
      console.log("Failed to get pokemon ", error);
      throw error;
   }
}

export const getPokemon = async (): Promise<Pokemon[]> => {
   try {
      const { results } = await apiCall();
      const pokemonDataPromise = results.map(async ({ url }: { url: string }) => {
         const response = await fetch(url);
         const data = await response.json();
         return data;
      })
      const pokemonData = Promise.all(pokemonDataPromise);
      return (await pokemonData);

   } catch (error) {
      console.log("Failed to get pokemon ", error);
      return [];
   }
}