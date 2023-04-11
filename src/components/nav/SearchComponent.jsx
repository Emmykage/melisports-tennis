import React, { useState } from 'react'
import {BsSearch} from "react-icons/bs"
import { useDispatch, useSelector } from 'react-redux'
import { searched } from '../../redux/actions/search'
import { closeList, displayList } from '../../redux/products/searched'
import SearchList from './SearchList'

const SearchComponent = () => {
  const dispatch = useDispatch()
  const {searchedProducts, displayedList} = useSelector((state) => state.searched_products)
  const [search, setSearch] = useState({search: ""})
  const handleInput = (e) => {
    dispatch(displayList())
    setSearch({search: e.target.value})
    clearTimeout(0)
    if(search.search.trim().length == 0){

      return
    }
  
      dispatch(searched(search))



  
  }
     
      // dispatch(closeList())

  console.log(searchedProducts)

  return (
    <div className='search-component'>
    <form className='search-form'>
      <div className="search-div">
        <input type="text" placeholder='Search item' value={search.search} onChange={handleInput}/>
        <button type="submit"><BsSearch/> </button>

      </div>

    </form>
    {displayedList && <SearchList items={searchedProducts}/>}
  
  </div>
  )
}

export default SearchComponent