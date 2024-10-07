import React from 'react'
import { NavLink } from 'react-router-dom'

const DiscoverBtn = ({link, btnText="Discover"}) => {
  return (
    <NavLink to={link} className="font-semibold border-4 items-center block  w-max  py-2 px-5 border-theme bg-light hover:bg-theme-dark hover:text-light">
        {btnText}
    </NavLink>
  )
}

export default DiscoverBtn