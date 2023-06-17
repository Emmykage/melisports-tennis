import React from 'react';
import { useSelector } from 'react-redux';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';
import Modal from '../modal/Modal';
import ChatBox from '../sideNav/ChatBox';

const MainLayout = ({ children }) => {
  const { isOpen } = useSelector((state) => state.modal);
  return (

    <div className="container">
      {isOpen && <Modal />}
      <Nav />
      {children}
      <Footer />
      <ChatBox/>
    </div>
  );
};

export default MainLayout;
