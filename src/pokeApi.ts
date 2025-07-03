const API = "https://pokeapi.co/api/v2/pokemon"
interface PokemonListResult {
   name: string;
   url: string;
}

interface PokemonSprites {
   front_default: string;
   back_default?: string;
   front_shiny?: string;
   back_shiny?: string;
}
interface PokemonAbility {
   ability: {
      name: string;
      url: string;
   };
   is_hidden: boolean;
   slot: number;
}
interface PokemonType {
   slot: number;
   type: {
      name: string;
      url: string;
   };
}
interface PokemonStat {
   base_stat: number;
   effort: number;
   stat: {
      name: string;
      url: string;
   };
}
interface Pokemon {
   abilities: PokemonAbility[];
   base_experience: number;
   cries: Record<string, any>;
   forms: any[];
   game_indices: any[];
   height: number;
   held_items: any[];
   id: number;
   is_default: boolean;
   location_area_encounters: string;
   moves: any[];
   name: string;
   order: number;
   past_abilities: any[];
   past_types: any[];
   species: {
      name: string;
      url: string;
   };
   sprites: PokemonSprites;
   stats: PokemonStat[];
   types: PokemonType[];
   weight: number;
}
interface PokemonListItem {
   results: PokemonListResult[];
}

interface PokemonOverview {
   id: number;
   name: string;
   sprites: PokemonSprites;
}

export const apiCall = async (): Promise<PokemonListItem> => {

   try {
      const response = await fetch(`${API}?limit=1000`);
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

export const getAll = async (): Promise<Pokemon[]> => {
   try {
      const { results } = await apiCall();
      const pokemonData = await Promise.all(
         results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return res.json();
         })
      );
      return (pokemonData);

   } catch (error) {
      console.log("Failed to get pokemon ", error);
      return [];
   }
}

export const getAllBasicInfo = async (): Promise<PokemonOverview[]> => {
   try {
      const { results } = await apiCall();

      const pokemonData = await Promise.all(
         results.map(async ({ url }) => {
            const response = await fetch(url);
            const data = await response.json();
            return { id: data.id, name: data.name, sprites: data.sprites }
         })
      )
      return pokemonData;

   } catch (error) {
      console.log("Failed to get pokemon ", error);
      return [];
   }
}

export const getByName = async (name: string): Promise<Pokemon> => {
   try {
      const response = await fetch(`${API}/${name}`);
      if (!response.ok) throw new Error(`Failed to fetch ${name}`);
      return await response.json();

   } catch (error) {
      console.log(`Error getting ${name}`, error);
      throw error;
   }
}

const pokeApi = {
   getAll,
   getAllBasicInfo,
   getByName
}
export default pokeApi;