import React from 'react';
import { CiSearch } from 'react-icons/ci';

const Search = ({ handleSearch, search, setSearch }) =>
// handleSearch
  (
    <form className="max-w-md ml-auto" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
        <input value={search} onChange={handleSearch} name="search" placeholder="Seacrh Product..." type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900  rounded-lg bg-gray-50 focus:ring-blue-500 focus:outline-non focus:border-gray-300 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 " required />
        {/* <button type="submit" className="text-white absolute end-2.5 bottom-2.5  hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {' '}
          <CiSearch className="text-gray-900 hover:text-black" />
        </button> */}
      </div>
    </form>
  );

export default Search;
