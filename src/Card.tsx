import React from 'react'

interface Pokemon {
   id: number;
   name: string;
   sprites: {
      front_default: string;
   };
}
const Card = ({ pokemon }: { pokemon: Pokemon }) => {
   return (
      <div key={pokemon.id} className='flex flex-col items-center drop-shadow-2xl'>
         <img src={pokemon.sprites.front_default} alt="" />
         <h1 className='text-xl'>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
         </h1>
         <p className='text-sm text-neutral-600'>#{pokemon.id}</p>
      </div>
   )
}

export default Card