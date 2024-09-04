import React, { useEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SearchList from './SearchList';
import { filterProducts, searchedProducts } from '../../redux/products/product';

const SearchComponent = () => {
  const searchForm = useRef(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { searched_products } = useSelector((state) => state.products);
  const [showSearchList, setShowSearchList] = useState(false); // State variable to control visibility
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search_page?query=${search}`);
    triggerClose();
  };
  const handleInput = (e) => {
    setSearch(e.target.value.trim());
    if (search.length == 0) {
      return;
    }

    dispatch(searchedProducts(search));
  };

  const triggerClose = () => {
    setSearch('');
    dispatch(searchedProducts(''));
  };

  useEffect(() => {
    if (searched_products) setShowSearchList(true);
  }, [searched_products]);
  return (
    <div className="search-component">
      <form className="search-form" onSubmit={handleSearch} ref={searchForm}>
        <div className="search-div">
          <input type="text" placeholder="Search item" value={search} name="search" id="search" onChange={handleInput} />
          <button type="submit">
            <BsSearch />
            {' '}
          </button>

        </div>

      </form>
      {/* <div className='bg-red' onClick={triggerClose} > */}
      {showSearchList && <SearchList items={searched_products} triggerClose={triggerClose} setSearch={setSearch} />}
      {/* </div> */}
    </div>
  );
};

export default SearchComponent;
