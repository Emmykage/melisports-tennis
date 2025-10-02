import React, { useEffect, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SearchList from './SearchList';
import { searchedProducts } from '../../redux/actions/product';
import { clearSearch } from '../../redux/products/product';

const SearchComponent = () => {
  const searchForm = useRef(null);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const searchlistRef = useRef(null);

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
    const { value } = e.target;
    const cleanedValue = value.trim().replace(/\s+/g, ' ');
    setSearch(value);

    if (value === '') return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    console.log('[JS Update]: ', e.target.value, '[Hook Update]: ', search);

    timeoutRef.current = setTimeout(() => {
      console.log('[Timed JS Update]: ', e.target.value, '[Timed Hook Update]: ', search);

      dispatch(searchedProducts({ search: cleanedValue }));
    }, 2000);
  };

  const triggerClose = () => {
    // setSearch('');
    dispatch(clearSearch());
  };

  useEffect(() => {
    if (searched_products.length > 0) {
      setShowSearchList(true);
    }
  }, [searched_products]);

  console.log(searched_products);

  useEffect(() => {
    const handleClickOutside = (e) => {
      console.log('[CLICKED NAV]');
      if (searchlistRef.current && !searchlistRef.current.contains(e.target)) {
        triggerClose(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchlistRef} className="search-component  bg-theme">
      <form className="search-form p-4" onSubmit={handleSearch} ref={searchForm}>
        <div className="search-div">
          <input type="text" placeholder="Search item" value={search} name="search" id="search" onChange={handleInput} />
          <button type="submit">
            <BsSearch />
            {' '}
          </button>

        </div>

      </form>
      {showSearchList && <SearchList items={searched_products} triggerClose={triggerClose} setSearch={setSearch} />}
    </div>
  );
};

export default SearchComponent;
