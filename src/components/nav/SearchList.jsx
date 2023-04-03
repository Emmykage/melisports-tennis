import React from 'react'
import { NavLink } from 'react-router-dom'

const SearchList = ({items}) => {
  return (
    <>
    <ul className='search-list'>
      {items.map((item) =>(
            <li key={item.id}>
            <NavLink
            to={`/productdetails/${item.id}`}>
            {item.name}
            </NavLink>
          </li>
      
      ) )}
    </ul>
 
        
    </>
  )
}

export default SearchList