import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import SideNav from '../admin/SideNav';
import Right from '../admin/Right';
import ProdDelModal from '../modal/ProdDelModal';
import CatDelModal from '../modal/CatDelModal';
import { userLog } from '../../redux/user/user';
import Loader from '../../pages/Loader';

const MainAdmin = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { isOpen, id } = useSelector((state) => state.delModal);
  const { catOpen, catId } = useSelector((state) => state.cat_del_modal);
  const [showMenu, setShowMenu] = useState(false);
  const { user, loading } = useSelector(state => state.user);
  
  useEffect(() => {
    dispatch(userLog());
  }, [dispatch]);

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };
  if(loading){
    return(<Loader/>)
  }

  if (user) {
    if (user.role === 'admin') {
      return (
        <div className="grid sm:grid-cols-md-admin md:grid-cols-sm-admin xl:grid-cols-grid-admin gap-4 bg-gray-200 h-screen overflow-y-auto">
          {isOpen && <ProdDelModal id={id} />}
          {catOpen && <CatDelModal id={catId} />}
          <SideNav showMenu={showMenu} handleMenu={handleMenu} />
          <div className="px-4 pt-24 md:pt-6 overflow-y-auto h-screen no-scroll">
            {children}
          </div>
          <Right handleMenu={handleMenu} user={user} />
        </div>
      );
    }

    else{
      return (
        <div>
          <h1>You are not an Admin</h1>
          <NavLink to="/store">Go to Store</NavLink>
        </div>
      );
    }
    
   
  }
    navigate('/auth/admin_login');
  return null;  // Ensure no further rendering happens after navigation
};

export default MainAdmin;
