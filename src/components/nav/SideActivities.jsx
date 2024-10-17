import React from 'react'
import { BsCartDash } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'

const SideActivities = ({handleLogOut}) => {
  return (
    <div className="flex justify-between items-center py-2.5">

    <a href="#survey" className="bg-gray-60 py-1 rounded px-3 text-base font-medium"> Survey</a>
    <div className="flex items-center gap-3 mobile-display font-medium">
      {!user ? <NavLink to="/auth/login">Login</NavLink> : <a onClick={handleLogOut}>Log Out</a> }

      <span><FiUser className="user-icon menu-icon text-dark text-xl" /></span>

    </div>

    <div className="menu-div cart">
      <NavLink to="/carts">

        <BsCartDash className="menu-icon cart-icon" />
        <span className="total-amount text-white bold">{counter}</span>

      </NavLink>
    </div>
  </div>
  )
}

export default SideActivities