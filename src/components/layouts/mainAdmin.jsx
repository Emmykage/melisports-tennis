import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import SideNav from '../admin/SideNav';
import ProdDelModal from '../modal/ProdDelModal';
import CatDelModal from '../modal/CatDelModal';
import { userLog } from '../../redux/user/user';
import Loader from '../../pages/Loader';
import { fetchToken } from '../../hooks/localStorage';
import ToastAlert from '../toast/ToastAlert';
import { getStatistics } from '../../redux/actions/statistics';
import Right from '../admin/Right';

const MainAdmin = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isOpen, id } = useSelector((state) => state.delModal);
  const { catOpen, catId } = useSelector((state) => state.cat_del_modal);
  const [showMenu, setShowMenu] = useState(false);
  const { message, user, loading } = useSelector((state) => state.user);
  const [token] = useState(fetchToken());
  const {stats} =  useSelector(state => state.statistics)
  console.log(stats)
  useEffect(() => {
    dispatch(userLog());
    dispatch(getStatistics())
  }, [dispatch]);

  const handleMenu = () => {
    setShowMenu(!showMenu);
  };
  if (loading) {
    return (<Loader />);
  }

  if (user) {
    if (user?.role === 'admin') {
      return (
        <div className="grid sm:grid-cols-md-admin md:grid-cols-sm-admin xl:grid-cols-grid-admin gap-4 h-screen bg-white overflow-y-auto p">
          <ToastAlert />
          {isOpen && <ProdDelModal id={id} />}
          {catOpen && <CatDelModal id={catId} />}
          <SideNav showMenu={showMenu} handleMenu={handleMenu} stats={stats}/>
          <div className="px-4 pt-0 bg-white shadow md:pt-10 overflow-y-auto h-screen no-scroll">
            {children}
          </div>
          <Right handleMenu={handleMenu} user={user} stats={stats} />
        </div>
      );
    }

    return (
      <div>
        <h1 className='my-5'>You are not an Admin</h1>
        <NavLink to="/store">Go to Store</NavLink>
      </div>
    );
  } if (token) {
    return (
      <div className="text-center">
        <h1 className="text-3xl my-10 ">{message}</h1>
        <NavLink to="/store" className="text-xl">Go to Store</NavLink>
      </div>

    );
  }
  navigate('/auth/admin_login');
  return null; // Ensure no further rendering happens after navigation
};

export default MainAdmin;
