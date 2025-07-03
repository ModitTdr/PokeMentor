
import { createBrowserRouter } from "react-router";
import App from "./App";
import PokemonDetail from "./components/PokemonDetail";
import Homepage from "./components/Homepage";

const router = createBrowserRouter([
   {
      path: '/',
      element: <App />,
      children: [
         {
            path: '',
            element: <Homepage />,
         },
         {
            path: '/:pokemonName',
            element: <PokemonDetail />,
         },
      ]
   },

])
export default router;