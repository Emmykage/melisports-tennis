import React from 'react';
import { NavLink } from 'react-router-dom';

const SearchList = ({ items, triggerClose }) => (
  <>
    <ul className="search-list">
      {items.map((item) => (
        <li key={item.id} tr>
          <NavLink className={'px-2 w-full'}
            to={`/productdetails/${item.id}`} onClick={triggerClose}
          >
            {item.name}
          </NavLink>
        </li>

      ))}
    </ul>

  </>
);

export default SearchList;
