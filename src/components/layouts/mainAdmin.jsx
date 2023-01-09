import React,{useState} from 'react'
import Footer from '../footer/Footer'
import SideNav from '../admin/SideNav'
import Right from '../admin/Right'

const MainAdmin = ({children}) => {
  const [showMenu, setShowMenu] = useState(false)
  const handleMenu = () =>{
      setShowMenu(!showMenu)
  }
  return (
    <div className='container'>
         <div className='admin-container'>
    <SideNav showMenu={showMenu} handleMenu={handleMenu}/>
    <div className="full-width flex-center"> {children}</div>
   
    <Right handleMenu={handleMenu}/>    
    </div>
        {/* {children} */}
        <Footer />
    </div>
  )
}

export default MainAdmin