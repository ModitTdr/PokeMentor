import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <Suspense fallback={<h1>Loading..</h1>}>
      <Outlet />
    </Suspense>
  )
}
export default App;