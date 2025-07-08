import { useQueries, type UseQueryResult } from "@tanstack/react-query";
import pokeApi from "../hooks/pokeApi";
import Card from "./Card";
import { Link } from "react-router-dom";

interface PokemonListResult {
   name: string;
   url: string;
}
interface PokemonOverview {
   id: number;
   name: string;
   sprites: {
      front_default: string;
   };
}

const fetchPokemon = async (url: string): Promise<PokemonOverview> => {
   const response = await fetch(url);
   if (!response.ok) throw new Error("Failed to fetch pokemon");
   return response.json();
}

const Homepage = () => {
   const { data, isLoading, isError } = pokeApi();
   const query = useQueries({
      queries: (data?.results || []).map((item: PokemonListResult) => ({
         queryKey: ['pokemonDetail', item.url],
         queryFn: () => fetchPokemon(item.url),
         staleTime: 1000 * 60 * 5,
         enabled: !!data?.results,
      })) || [],
   }) as UseQueryResult<PokemonOverview>[];

   if (isLoading) {
      return <h1>Loading...</h1>
   }
   if (isError) {
      return <h1>Error...</h1>
   }
   const pokemonData = query
      .filter((q) => q.isSuccess)
      .map((q) => q.data)
   return (
      <div className="grid grid-cols-4 gap-4">
         {
            pokemonData.map((pokemon) => (
               <Link to={`/${pokemon.name}`} key={pokemon.id}>
                  <Card pokemon={pokemon} />
               </Link>
            ))
         }
      </div>
   );
};

export default Homepage;
