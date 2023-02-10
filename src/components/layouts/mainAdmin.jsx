import React,{useState} from 'react'
import Footer from '../footer/Footer'
import SideNav from '../admin/SideNav'
import Right from '../admin/Right'
import { useSelector } from 'react-redux'
import ProdDelModal from '../modal/ProdDelModal'
import CatDelModal from '../modal/CatDelModal'
import { useNavigate } from 'react-router-dom'

const MainAdmin = ({children}) => {
  const auth = localStorage.getItem('meli_auth')
  const meli_auth = JSON.parse(auth)

  console.log(meli_auth)
  const navigate = useNavigate()
  const {isOpen, id} = useSelector((state) => state.delModal)
  const {catOpen, catId} = useSelector((state) => state.cat_del_modal)
  const [showMenu, setShowMenu] = useState(false)
  const handleMenu = () =>{
      setShowMenu(!showMenu)
  }
  if (!auth){
    navigate("/auth/admin_sign_up")
  }
  return (
    <div className='container'>
         <div className='admin-container'>
          
    {isOpen && <ProdDelModal id={id}/>}
    {catOpen && <CatDelModal id={catId}/>}
    <SideNav showMenu={showMenu} handleMenu={handleMenu}/>
    <div className="full-width flex-center"> {children}</div>
   
    <Right handleMenu={handleMenu}/>    
    </div>
     {  console.log('token')}
        <Footer />
    </div>
  )
}

export default MainAdmin