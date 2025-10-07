import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.imdbID}`}>
      <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.jpg'}
          alt={movie.Title}
          className="w-full h-80 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold text-white line-clamp-1">
            {movie.Title}
          </h2>
          <p className="text-gray-400">{movie.Year}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
