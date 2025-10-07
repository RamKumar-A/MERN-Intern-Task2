import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { useParams } from 'react-router-dom';

// OMDb API Key
const REACT_APP_OMDB_API_KEY = 'f84fc31d';

// Random movies list for popular movies

const popularMovies = ['avengers', 'batman', 'spiderman', 'starwars'];
const randomPopularMovies = popularMovies.at(
  Math.floor(Math.random * popularMovies.length)
);

// Create Movie Context
// This context allows us to share movie-related state and actions across components
const MovieContext = createContext();

// Initial state for the reducer
const initialState = {
  movies: [], // List of movies fetched from the API
  search: '', // Current search query entered by user
  year: '', // Filter: release year
  type: '', // Filter: type (movie, series,)
  selectedMovie: null, // Detailed data of a single selected movie
  isLoading: false, // Loading state (true while fetching data)
};

function movieReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_MOVIES':
      return { ...state, movies: action.payload };
    case 'SET_SEARCH':
      return { ...state, search: action.payload };
    case 'SET_YEAR':
      return { ...state, year: action.payload };
    case 'SET_TYPE':
      return { ...state, type: action.payload };
    case 'SET_SELECTED_MOVIE':
      return { ...state, selectedMovie: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);
  // Fetch "popular" movies on mount or when filters change
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });

        const res = await fetch(
          `https://www.omdbapi.com/?s=${randomPopularMovies}&type=${
            state.type ? state.type : ''
          }&y=${state.year ? state.year : ''}&apikey=${REACT_APP_OMDB_API_KEY}`
        );
        const data = await res.json();
        dispatch({ type: 'SET_MOVIES', payload: data.Search || [] });
      } catch (err) {
        console.error(err.message);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    fetchPopular();
  }, [state.type, state.year, dispatch]);

  // Handle Search Function (triggered when user searches)

  const handleSearch = useCallback(async (query) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_SEARCH', payload: query });

      if (query.trim().length < 3) return;
      const res = await fetch(
        `https://www.omdbapi.com/?s=${query}&apikey=${REACT_APP_OMDB_API_KEY}`
      );

      const data = await res.json();
      dispatch({ type: 'SET_MOVIES', payload: data.Search || [] });
    } catch (err) {
      console.error(err.message);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  return (
    <MovieContext.Provider value={{ state, dispatch, handleSearch }}>
      {children}
    </MovieContext.Provider>
  );
};

const useMovies = () => useContext(MovieContext);

// Custom Hook: Fetch single movie details using useParams
// Automatically runs when the URL contains an 'id' param (e.g., /movies/tt1234567)
const useMovieDetails = () => {
  const { id } = useParams();
  const { state, dispatch } = useMovies();
  useEffect(() => {
    if (!id) return; // Skip if no movie ID in URL

    const fetchDetails = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        const res = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=${REACT_APP_OMDB_API_KEY}`
        );
        const data = await res.json();
        dispatch({ type: 'SET_SELECTED_MOVIE', payload: data });
      } catch (err) {
        console.error(err.message);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };
    fetchDetails();
  }, [id, dispatch]);
  return { ...state };
};

export { useMovieDetails, useMovies };

export default MovieProvider;
