// import { useEffect, useState, type ChangeEvent } from 'react';
// import Pokemon from './Pokemon';

// const App = () => {
//   const [input, setInput] = useState('');

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setInput(e.target.value);
//   }
//   return (
//     <div>
//       <div>
//         <input
//           type="text"
//           placeholder="Search Pokemon... [E.g: Charizard]"
//           className="border border-neutral-400 rounded px-4 py-1"
//           value={input}
//           onChange={handleChange}
//         />
//       </div>
//       <Pokemon input={input} />
//     </div>
//   )
// }

// export default App

import { useEffect, useState } from 'react'
import { getPokemon } from './pokeApi'
import Card from './Card';

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

const App = () => {
  const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);
  const [Loading, setLoading] = useState(true);
  const [input, setInput] = useState('');

  useEffect(() => {
    const getPokemonData = async () => {
      setPokemons(await getPokemon());
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
    <div className='container p-4 flex justify-center'>
      <div className='space-y-6 bg-red-600 p-8 rounded-2xl drop-shadow-2xl border border-neutral-400'>
        <div className='text-center space-y-4'>
          <h1 className='text-7xl font-bold text-yellow-400 text-stroke text-stroke text-stroke-3 text-stroke-blue-500'>PokeDex</h1>
          <input
            type="text"
            placeholder="Search Pokemon... [E.g: Charizard]"
            className="border-2 border-neutral-900 rounded-lg px-4 py-1 w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className='p-4 bg-neutral-300 border border-neutral-400 shadow-xl rounded-lg grid grid-cols-3 gap-4'>
          {
            searchPokemons?.map((pokemon) => (
              <Card pokemon={pokemon} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App