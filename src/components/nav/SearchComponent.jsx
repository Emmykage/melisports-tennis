import React, { useState } from 'react'
import {BsSearch} from "react-icons/bs"

const SearchComponent = () => {
  const [search, setSearch] = useState("")
  const handleInput = (e) => {
    setSearch(e.target.value)
    console.log(search)
  }
  return (
    <div className='search-component'>
    <form className='search-form'>
      <div className="search-div">
        <input type="text"  value={search} onChange={handleInput}/>
        <button type="submit"><BsSearch/> </button>

      </div>

    </form>
  </div>
  )
}

export default SearchComponent