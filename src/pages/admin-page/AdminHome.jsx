import React, {useState} from 'react'
import SideNav from '../../components/admin/SideNav'
import '../../components/admin/adminstyle.css'
import Main from '../../components/admin/dashBoard/Main'
import RecentOrders from '../../components/admin/RecentOrders'
import Right from '../../components/admin/Right'

const AdminHome = ({children}) => {
  const [showMenu, setShowMenu] = useState(false)
    const handleMenu = () =>{
        setShowMenu(!showMenu)
    }
  return (
    <div className='admin-container'>
    <SideNav showMenu={showMenu} handleMenu={handleMenu}/>
    <div className="full-width flex-center">
    {children}
    </div>
    
    <Right handleMenu={handleMenu}/>    
    </div>


 
        
   
  )
}

export default AdminHome