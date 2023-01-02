import React from 'react'
import SideNav from '../../components/admin/SideNav'
import '../../components/admin/adminstyle.css'
import Main from '../../components/admin/Main'
import RecentOrders from '../../components/admin/RecentOrders'
import Right from '../../components/admin/Right'

const AdminHome = () => {
  return (
    <div className='admin-container'>
    <SideNav/>
    <Main/>
<Right/>    
    </div>


 
        
   
  )
}

export default AdminHome