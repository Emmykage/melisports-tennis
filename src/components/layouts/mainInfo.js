import React from 'react';
import { useSelector } from 'react-redux';
import Footer from '../footer/Footer';
import Modal from '../modal/Modal';
import ChatBox from '../sideNav/ChatBox';
import NavInfo from '../nav/NavInfo';

const MainInfoLayout = ({ children }) => {
  const { isOpen } = useSelector((state) => state.modal);
  return (

    <div className="container">
      {isOpen && <Modal />}
      <NavInfo />
      {children}
      <Footer />
      <ChatBox />
    </div>
  );
};

export default MainInfoLayout;
