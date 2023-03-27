import React from 'react'
import {BsSearch} from "react-icons/bs"

const SearchComponent = () => {
  return (
    <div className='search-component'>
    <form>
      <div className="search-div">
        <input type="text" />
        <button type="submit"><BsSearch/> </button>

      </div>

    </form>
  </div>
  )
}

export default SearchComponent