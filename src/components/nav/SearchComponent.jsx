import React, { useEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import SearchList from './SearchList';
import { filterProducts, searchedProducts } from '../../redux/products/product';

const SearchComponent = () => {
  const searchForm = useRef(null)
  const dispatch = useDispatch();
  const { searched_products } = useSelector((state) => state.products);
  const [showSearchList, setShowSearchList] = useState(false); // State variable to control visibility
  const [search, setSearch] = useState({ search: '' });

  const handleSearch = (e)=>{
    e.preventDefault()

  }
  const handleInput = (e) => {    
    setSearch({ search: e.target.value });
    if (search.search.trim().length == 0) {
      return;
    }
    const data =  e.target.value
    dispatch(searchedProducts(data));
  };

  const triggerClose = (e) => {
  setSearch({ search: "" })
  dispatch(searchedProducts(""));
  }

  useEffect(()=>{
    if(searched_products) setShowSearchList(true)
  },[searched_products])


  return (
    <div className="search-component">
      <form className="search-form" onSubmit={handleSearch} ref={searchForm}>
        <div className="search-div">
          <input type="text" placeholder="Search item" value={search.search} name='search' id='search' onChange={handleInput} />
          <button type="submit">
            <BsSearch/>
            {' '}
          </button>

        </div>

      </form>
      {/* <div className='bg-red' onClick={triggerClose} > */}
      {showSearchList && <SearchList items={searched_products} triggerClose={triggerClose}  />} 
      {/* </div> */}
    </div>
  );
};

export default SearchComponent;
