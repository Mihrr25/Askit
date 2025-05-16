import React, { useState } from 'react';
import { Search } from '../../assets/Icons';

const SearchBar = ({handleSearch}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchText, setSearchText] = useState('');

  

  return (
    <div className="w-full max-w-xl px-4">
      <div className="relative flex items-center w-full h-11 rounded-lg bg-[#222225] overflow-hidden">
        <div className="grid place-items-center h-full w-12 text-gray-400">
          <Search size={20} />
        </div>
        <input
          className="peer h-full w-full outline-none text-white pr-2 placeholder-white"
          type="text"
          id="search"
          placeholder="Search tasks" 
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(searchText);
            }
          }}
        />
        {isFocused && searchText.length === 0 && (
          <div className="absolute left-[108px] top-1/2 transform -translate-y-1/2 w-0.5 h-5  animate-pulse" />
        )}
        <button 
          onClick={(e)=>handleSearch(searchText)}
          className="h-full px-4 text-black font-medium bg-white cursor-pointer"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;