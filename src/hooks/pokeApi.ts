import { useQuery } from "@tanstack/react-query";
const API = "https://pokeapi.co/api/v2/pokemon?limit=150"

export interface PokemonListResult {
   name: string,
   url: string,
}
export interface PokemonListItem {
   results: PokemonListResult[];
}

const pokeApi = () => {
   const query = useQuery({
      queryKey: ['pokemonapi'],
      queryFn: getApi,
      staleTime: 1000 * 60 * 5
   })
   return query;
}

const getApi = async () => {
   const response = await fetch(API);
   if (!response) throw new Error("Failed to contact with api");
   return await response.json();
}

export default pokeApi;
