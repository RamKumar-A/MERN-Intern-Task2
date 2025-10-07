import { useState } from 'react';
import { useMovies } from '../context/MovieContext';

const SearchBar = ({ onClose }) => {
  const { state, handleSearch } = useMovies();
  const [inputVal, setInputVal] = useState('');
  return (
    <form
      className="flex justify-center mt-6"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(inputVal);
        onClose();
      }}
    >
      <input
        type="text"
        value={inputVal || state.search}
        onChange={(e) => setInputVal(e.target.value)}
        placeholder="Search for movies or series..."
        className="w-96 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
      />
    </form>
  );
};

export default SearchBar;
