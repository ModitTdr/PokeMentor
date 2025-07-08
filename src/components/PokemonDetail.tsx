import { useParams } from 'react-router-dom'
import formatName from '../utils/formatName';
import { useQuery } from '@tanstack/react-query';
const API = "https://pokeapi.co/api/v2/pokemon";

const getPokemon = async (name: string) => {
   const response = await fetch(`${API}/${name}`);
   return await response.json();
}
const PokemonDetail = () => {
   const params = useParams();
   const pokemonName = formatName(params.pokemonName);
   const { data: pokemonDetails, isLoading, isError } = useQuery({
      queryKey: ['pokemonData', pokemonName],
      queryFn: () => getPokemon(pokemonName),
      staleTime: 1000 * 60 * 24,
      enabled: !!pokemonName,
   })

   if (isLoading) {
      return (
         <div className='flex justify-center items-center h-screen'>
            <h1 className='text-3xl'>Loading...</h1>
         </div>
      )
   } if (isError) {
      return (
         <div className='flex justify-center items-center h-screen'>
            <h1 className='text-3xl'>Something went wrong...</h1>
         </div>
      )
   }

   return (
      <div className={`w-full min-h-dvh bg-${pokemonDetails.types[0].type.name.toLowerCase()}-gradient px-6 py-0 grid grid-cols-1 lg:grid-cols-2 `}>
         <div className='w-full flex flex-col-reverse lg:flex-col items-start justify-center lg:items-start'>
            <img
               src={pokemonDetails.sprites.other.dream_world.front_default}
               alt="bulbasaur"
               className='w-60 md:w-90 max-w-full h-auto mx-auto lg:mx-0'
            />
            <div className='lg:-mt-20 lg:ml-64 flex flex-col items-start gap-y-2'>
               <h1 className='text-6xl md:text-7xl font-bold text-end'>
                  {formatName(pokemonDetails.name)}
                  <span className='text-base font-normal'>#{pokemonDetails.id.toString().padStart(3, '0')}</span>
               </h1>
               <p className='flex items-center gap-6'>
                  {
                     pokemonDetails.types.map(({ type }: { type: { name: string } }) => (
                        <span key={type.name} className={`bg-${type.name} p-1 px-3 rounded-full`}>{type.name}</span>
                     ))
                  }
               </p>
            </div>

         </div>
         <div className='grow'>
            data
         </div>
      </div>
   )
}

export default PokemonDetail