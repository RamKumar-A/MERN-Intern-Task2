import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import AppLayout from './layouts/AppLayout';

function App() {
  return (
    // Sets up the routing context for the app.
    <BrowserRouter>
      {/* Contains all the route definitions. */}
      <Routes>
        {/* Defines a shared layout (header, filter bar, etc.) that wraps child routes. */}
        <Route element={<AppLayout />}>
          <Route index path="/" element={<Home />} />
          {/* A dynamic route that loads MovieDetails for a specific movie. */}
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
