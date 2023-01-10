import React,{useState} from 'react'
import Footer from '../footer/Footer'
import SideNav from '../admin/SideNav'
import Right from '../admin/Right'
import { useSelector } from 'react-redux'
import ProdDelModal from '../modal/ProdDelModal'

const MainAdmin = ({children}) => {
  const {isOpen, id} = useSelector((state) => state.delModal)
  const [showMenu, setShowMenu] = useState(false)
  const handleMenu = () =>{
      setShowMenu(!showMenu)
  }
  return (
    <div className='container'>
         <div className='admin-container'>
          
    {isOpen && <ProdDelModal id={id}/>}
    <SideNav showMenu={showMenu} handleMenu={handleMenu}/>
    <div className="full-width flex-center"> {children}</div>
   
    <Right handleMenu={handleMenu}/>    
    </div>
     
        <Footer />
    </div>
  )
}

export default MainAdmin