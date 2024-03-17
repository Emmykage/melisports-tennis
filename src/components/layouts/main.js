import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';
import Modal from '../modal/Modal';
import ChatBox from '../sideNav/ChatBox';
import { closeNav } from '../../redux/modal/nav';

const MainLayout = ({ children }) => {
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeNav());
  }, []);
  return (

    <div className="container">
      {isOpen && <Modal />}
      <Nav />
      {children}
      <Footer />
      <ChatBox />
    </div>
  );
};

export default MainLayout;
