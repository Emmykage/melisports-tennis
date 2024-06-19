import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import SideNav from '../admin/SideNav';
import Right from '../admin/Right';
import ProdDelModal from '../modal/ProdDelModal';
import CatDelModal from '../modal/CatDelModal';
import { userLog } from '../../redux/user/user';

const MainAdmin = ({ children }) => {
  const dispatch = useDispatch();
  const meli_auth = localStorage.getItem('meli_auth');
  // const auth = JSON.parse(meli_auth)
  const navigate = useNavigate();
  const { isOpen, id } = useSelector((state) => state.delModal);
  const { catOpen, catId } = useSelector((state) => state.cat_del_modal);
  const [showMenu, setShowMenu] = useState(false);
  useEffect(() => {
    dispatch(userLog());
    !meli_auth && navigate('/auth/admin_sign_up');
  }, []);

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };
  if (meli_auth) {
    const auth = JSON.parse(meli_auth);

    if (auth.user.role === 'admin') {
      return (
        <>
          <div className="">
            <div className="grid grid-cols-grid-admin sm:grid-cols-md-admin md:grid-cols-sm-admin lg:grid-cols-grid-admin gap-4 bg-gray-200 h-screen overflow-y-auto">

              {isOpen && <ProdDelModal id={id} />}
              {catOpen && <CatDelModal id={catId} />}
              <SideNav showMenu={showMenu} handleMenu={handleMenu} />
              <div className="px-4 pt-4">
                {' '}
                {children}
              </div>

              <Right handleMenu={handleMenu} auth={auth} />
            </div>

            <Footer />
          </div>
        </>
      );
    }
    return (
      <div>
        <h1>You are not an Admin</h1>
        <NavLink to="/">Go to Store</NavLink>
      </div>
    );
    // navigate("/auth/admin_sign_up")

  // }
  // redir()
  }

  navigate('/auth/admin_login');
};

export default MainAdmin;
