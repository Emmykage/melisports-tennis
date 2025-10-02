import React, { forwardRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const SearchList = forwardRef(({ items, triggerClose }, ref) => {
  const navigate = useNavigate();
  return (
    <>
      <ul ref={ref} className="search-list">
        {items?.map((item) => (
          <li key={item.id} tr>
            <a
              className="px-2 w-full"

              onClick={() => {
                navigate(`/productdetails/${item.id}`);
                triggerClose();
              }}
            >
              {item.name}
            </a>
          </li>

        ))}
      </ul>

    </>
  );
});

export default SearchList;
