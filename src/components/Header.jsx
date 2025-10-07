import { useState } from 'react';
import SearchBar from './SearchBar';

function Header() {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between ">
        <h1 className="sm:text-3xl text-xl font-bold text-center">
          <span className="p-1.5">🎬</span>
          Movie Explorer
        </h1>
        <button
          className="inline-block text-xl border p-1.5 rounded-full cursor-pointer"
          onClick={() => setIsSearchBarOpen((prev) => !prev)}
        >
          <span className={`${isSearchBarOpen ? 'hidden' : ''}`}>🔎</span>
          <span className={`${isSearchBarOpen ? '' : 'hidden '}`}>❌</span>
        </button>
      </div>

      <div className={`${!isSearchBarOpen ? 'hidden' : ''}`}>
        <SearchBar onClose={() => setIsSearchBarOpen(false)} />
      </div>
    </div>
  );
}

export default Header;
