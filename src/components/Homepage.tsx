import { useEffect, useState } from 'react'
import pokeApi from '../pokeApi'
import Card from './Card';
import { Link } from 'react-router-dom';

interface PokemonSprites {
   front_default: string;
}
interface PokemonOverview {
   id: number;
   name: string;
   sprites: PokemonSprites;
}

const Homepage = () => {
   const [pokemons, setPokemons] = useState<PokemonOverview[]>([]);
   const [Loading, setLoading] = useState(true);
   const [input, setInput] = useState('');

   useEffect(() => {
      const getPokemonData = async () => {
         setPokemons(await pokeApi.getAll());
         setLoading(false);
      }
      getPokemonData();
   }, [])

   const searchPokemons = pokemons?.filter((pokemon) => {
      return pokemon.name.toLowerCase().includes(input.toLowerCase());
   })

   if (Loading) {
      return (
         <div className='flex justify-center items-center h-screen'>
            <h1 className='text-3xl'>Loading...</h1>
         </div>
      )
   }

   return (
      <div className='container p-4 flex justify-center container mx-auto'>
         <div className='space-y-6 bg-red-600 p-8 rounded-2xl drop-shadow-2xl border border-neutral-400'>
            <div className='text-center space-y-4'>
               <h1 className='text-7xl font-bold text-yellow-400 text-stroke-3 text-stroke-blue-500'>PokeDex</h1>
               <input
                  type="text"
                  placeholder="Search Pokemon... [E.g: Charizard]"
                  className="border-2 border-neutral-900 rounded-lg px-4 py-1 w-full"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
               />
            </div>

            <div className='p-4 bg-neutral-300 border border-neutral-400 shadow-xl rounded-lg grid grid-cols-6 gap-4'>
               {
                  searchPokemons?.map((pokemon) => (
                     <Link to={`/${pokemon.name}`} key={pokemon.id}>
                        <Card pokemon={pokemon} />
                     </Link>
                  ))
               }
            </div>
         </div>
      </div>
   )
}

export default Homepage