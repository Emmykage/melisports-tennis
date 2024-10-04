import React from 'react'
import { NavLink } from 'react-router-dom'

const DiscoverBtn = ({link, btnText="Discover"}) => {
  return (
    <NavLink to={link} className="font-semibold border-4 items-center  py-2 px-5 border-theme bg-theme-light hover:bg-theme-dark hover:text-theme-light">
        {btnText}
    </NavLink>
  )
}

export default DiscoverBtn