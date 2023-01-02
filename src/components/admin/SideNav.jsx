import React from 'react'
import "./adminstyle.css"
import {AiOutlineClose} from "react-icons/ai"
import {BsFillGrid1X2Fill} from "react-icons/bs"
import {AiOutlineUser} from "react-icons/ai"
import {GiReceiveMoney} from "react-icons/gi"
import {IoAnalyticsSharp} from "react-icons/io5"
import {RiMessageLine} from "react-icons/ri"
import {MdOutlineInventory} from "react-icons/md"
import {MdOutlineReport} from "react-icons/md"
import {FiSettings} from "react-icons/fi"
import {IoAddSharp} from "react-icons/io5"
import {BiLogOut} from "react-icons/bi"
const SideNav = () => {
  return (
  
    <aside>
        <div className='top'>
          <div className='logo'>
            <h2>MeliSports</h2>
          </div>
          <div className='close'>X
          <AiOutlineClose />

          </div>

        </div>
        <div className='side-bar'>
          <a href=''>
            <span> <BsFillGrid1X2Fill/></span>
            <h3>Dashboard</h3>
          </a>
        {/* </div> */}
        {/* <div className='side-bar'> */}
          <a href=''>
            <span> <AiOutlineUser/>dfd</span>
            <h3>Customers</h3>
          </a>
        {/* </div> */}
        {/* <div className='side-bar'> */}
          <a href=''>
            <span> <GiReceiveMoney/></span>
            <h3>Orders</h3>
          </a>
        {/* </div> */}
        {/* <div className='side-bar'> */}
          <a href=''>
            <span> <IoAnalyticsSharp/></span>
            <h3>Analytics</h3>
          </a>
        {/* </div> */}
        {/* <div className='side-bar'> */}
          <a href=''>
            <span> <RiMessageLine/></span>
            <h3>Messages</h3>
            <span className="message-count">25</span>
          </a>
        {/* </div> */}
        {/* <div className='side-bar'> */}
          <a href=''>
            <span> <MdOutlineInventory/></span>
            <h3>Products</h3>
          </a>
        {/* </div> */}
        {/* <div className='side-bar'> */}
          <a href=''>
            <span> <FiSettings/></span>
            <h3>Settings</h3>
          </a>
        {/* </div> */}
        {/* <div className='side-bar'> */}
          <a href=''>
            <span> <IoAddSharp/></span>
            <h3>Add product</h3>
          </a>
        {/* </div> */}
        {/* <div className='side-bar'> */}
          <a href=''>
            <span> <MdOutlineReport/></span>
            <h3>Report</h3>
          </a>
        {/* </div> */}
        {/* <div className='side-bar'> */}
          <a href=''>
            <span> <BiLogOut/></span>
            <h3>Log out</h3>
          </a>
        </div>


    </aside>


    
   
  )
}

export default SideNav