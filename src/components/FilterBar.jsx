import { useState } from 'react';
import { useMovies } from '../context/MovieContext';
/**
 * FilterBar Component
 *
 * A collapsible filter section that allows users to filter movies
 * by **year** and **type (movie or series)**.
 * It interacts with global movie state using the `useMovies()` context.
 */
const FilterBar = () => {
  // Local state to toggle filter visibility
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { dispatch, state } = useMovies();

  // Handle movie type filter change
  function handleType(value) {
    dispatch({ type: 'SET_TYPE', payload: value });
  }

  // Handle year filter change
  function handleYear(value) {
    dispatch({ type: 'SET_YEAR', payload: value });
  }

  return (
    <div className="p-2 mt-4 ">
      <h3
        className="text-xl font-semibold flex items-center gap-3 cursor-pointer"
        onClick={() => setIsFilterOpen((prev) => !prev)}
      >
        <span>Filters</span>
        <span className={`${isFilterOpen ? 'rotate-90' : 'rotate-0'}`}>›</span>
      </h3>
      <div
        className={`flex flex-wrap justify-start gap-4 mt-6 text-white ${
          !isFilterOpen && 'hidden'
        }`}
      >
        <input
          type="number"
          placeholder="Filter by Year"
          value={state.year}
          onChange={(e) => handleYear(e.target.value)}
          max={2026}
          min={1900}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-40 "
        />

        <select
          value={state.type}
          onChange={(e) => handleType(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-40 "
        >
          <option value="" className="text-black">
            All Types
          </option>
          <option value="movie" className="text-black">
            Movies
          </option>
          <option value="series" className="text-black">
            Series
          </option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
