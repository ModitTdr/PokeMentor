import { useParams } from 'react-router-dom'
import formatName from '../utils/formatName';
import { useEffect, useState } from 'react';
const API = "https://pokeapi.co/api/v2/pokemon/bulbasaur";
const PokemonDetail = () => {
   const [Loading, setLoading] = useState(true);
   const params = useParams();
   const pokemon = formatName(params.pokemonName);

   useEffect(() => {
      const getPokemonDetails = async () => {
         const response = await fetch(API);
         const data = await response.json();
         console.log(data)
      }
      getPokemonDetails();
      setLoading(false)
   }, [pokemon])

   if (Loading) {
      return (
         <div className='flex justify-center items-center h-screen'>
            <h1 className='text-3xl'>Loading...</h1>
         </div>
      )
   }
   return (
      <div>
         {pokemon} details
      </div>
   )
}

export default PokemonDetail