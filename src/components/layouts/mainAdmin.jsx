import React,{useEffect, useState} from 'react'
import Footer from '../footer/Footer'
import SideNav from '../admin/SideNav'
import Right from '../admin/Right'
import { useDispatch, useSelector } from 'react-redux'
import ProdDelModal from '../modal/ProdDelModal'
import CatDelModal from '../modal/CatDelModal'
import { NavLink, useNavigate } from 'react-router-dom'
import { toLogin } from '../../redux/user/user'

const MainAdmin = ({children}) => {
  const dispatch = useDispatch()
  const auth = localStorage.getItem('meli_auth')
  const meli_auth = JSON.parse(auth)
  const navigate = useNavigate()  
  const {isOpen, id} = useSelector((state) => state.delModal)
  const {catOpen, catId} = useSelector((state) => state.cat_del_modal)
  const [showMenu, setShowMenu] = useState(false)
  console.log(auth)
  useEffect(()=>{
    dispatch(toLogin())
  },[])

  const handleMenu = () =>{
      setShowMenu(!showMenu)
  }
      if(auth){


   
    if(meli_auth.user.role === 'admin'){

   
    return (
      <>
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
      </>
    )
    }else{
      return (
        <div>
          <h1>You are not an Admin</h1>
          <NavLink to={"/"}>Go to Store</NavLink>
        </div>
      )
      // navigate("/auth/admin_sign_up")

    }

  // }
  // redir()
}
else{
  navigate("/auth/admin_sign_up")
}
}



export default MainAdmin