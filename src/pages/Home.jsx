import MovieCard from '../components/MovieCard';
import { useMovies } from '../context/MovieContext';
const Home = () => {
  const { state } = useMovies();
  const { movies, isLoading } = state || {};

  return (
    <div className="grid grid-cols-1 min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {isLoading ? (
        <p className="text-center mt-10 text-white col-span-full">Loading...</p>
      ) : movies?.length > 0 ? (
        movies?.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
      ) : (
        <p className="text-center col-span-full">No movies found</p>
      )}
    </div>
  );
};

export default Home;
