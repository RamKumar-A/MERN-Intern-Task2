import { Link } from 'react-router-dom';
import { useMovieDetails } from '../context/MovieContext';

const MovieDetails = () => {
  const { selectedMovie: movie, isLoading } = useMovieDetails();

  if (!movie || isLoading)
    return <p className="text-center mt-10 text-white">Loading...</p>;
  return (
    <div className="  text-white p-6 ">
      <Link to="/" className="text-blue-400 hover:underline mb-4 inline-block">
        <button className="cursor-pointer px-2 py-1 bg-blue-500 text-blue-50 rounded-lg">
          ← Back
        </button>
      </Link>
      <div className="flex flex-col md:flex-row gap-8 mt-4">
        <img
          src={movie?.Poster !== 'N/A' ? movie?.Poster : '/placeholder.jpg'}
          alt={movie?.Title}
          className="w-full md:w-1/3 lg:w-2/3 rounded-lg shadow-lg h-full object-contain max-h-[30rem]"
        />
        <div>
          <h1 className="text-4xl font-bold mb-4">{movie?.Title}</h1>
          <p className="text-gray-300 mb-2">
            <strong>Released:</strong> {movie?.Released}
          </p>
          <p className="text-gray-300 mb-2">
            <strong>Genre:</strong> {movie?.Genre}
          </p>
          <p className="text-gray-300 mb-2">
            <strong>IMDB Rating:</strong> ⭐ {movie?.imdbRating}
          </p>
          <p className="text-gray-400 mt-4">{movie?.Plot}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
