import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';

import SearchIcon from '@mui/icons-material/Search';
export function SearchBox({ logo, stickyNav }) {
  const timeoutRef = useRef(null);

  const searchRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('search');

  const isSearchPage = pathname === '/search_page';

  const { searched_products } = useSelector((state) => state.products);

  const [search, setSearch] = useState('');
  const handleSearch = (e) => {
    e.preventDefault();
    if (isSearchPage) return;

    navigate(`/search_page?search=${search}`);
    dispatch(clearSearch());

    // setShowSearchList(false);
  };

  const handlesearchInput = (e) => {
    const { value } = e.target;
    const cleanedValue = value.replace(/\s+/g, ' ');
    setSearch(cleanedValue);

    isSearchPage && setSearchParams({ search: value });

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      dispatch(searchedProducts({ search: cleanedValue }));
    }, 1000);
  };

  const [showSearchList, setShowSearchList] = useState(false); // State variable to control visibility

  useEffect(() => {
    setShowSearchList(searched_products.length > 0);
  },
  [searched_products]);

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      !isSearchPage && dispatch(clearSearch());
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <Paper
        ref={searchRef}
        className="border-b"
        component="form"
        onSubmit={handleSearch}
        sx={{
          boxShadow: 'none',
          position: 'relative',
          p: '2px 40px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          m: 'auto',
        }}
      >
        <div className="max-w-7xl flex items-center m-auto w-full">
          <NavLink to="/store" className="block md:block items-center">

            <img src={logo} alt="Logo" className={`h-7 my-4 mr-4 ${stickyNav ? 'md:h-4' : 'md:h-12'}`} />
          </NavLink>

          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              pl: 2,
              border: 'none',
              boxShadow: 'none',
              borderLeft: '1px solid rgba(184, 184, 184, 0.6)',
              p: '4px 4px',
              '& .MuiInputBase-input': { paddingLeft: '16px' },
              '& .MuiInputBase-input:focus': {
                outline: 'none',
                border: 'none',
              },
              '& .MuiInputBase-input:hover': { outline: 'none', border: 'none' },
              '& .MuiInputBase-input:focus': { outline: 'none' },
            }}
            onChange={handlesearchInput}
            value={isSearchPage ? query : search}

            placeholder="Search Products"
            inputProps={{ 'aria-label': 'search product' }}
          />
          <IconButton type="button" onClick={handleSearch} sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton onClick={()=> navigate("/profile-setting")} className="hidden md:block" color="primary" sx={{ p: '10px' }} aria-label="directions">
            <PersonIcon />
          </IconButton>

        </div>

        <Paper
          className=""
          sx={{
            display: showSearchList && !isSearchPage ? 'block' : 'none', position: 'absolute', width: '100%', top: '100%', left: 0, zIndex: 50,
          }}
        >

          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4  gap-y-6 p-4 max-w-7xl m-auto mt-4 max-h-[600px] overflow-auto no-scroll">

            {searched_products && searched_products?.map((item) => (
              <div
                className="border shadow rounded-lg pb-4"
                onClick={() => {
                  navigate(`/productdetails/${item?.id}`);
                  dispatch(clearSearch());
                }}
              >
                <img src={item.photo_urls?.[0]} alt="" className="h-52 w-full rounded-lg object-contain" />
                <p className="px-4 mt-4 capitalize font-semibold">{item?.name}</p>
                <p className="px-4">{nairaFormat(item?.price)}</p>
              </div>
            ))}

          </div>

        </Paper>
      </Paper>
    </div>
  );
}