import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';
import Modal from '../modal/Modal';
import ChatBox from '../sideNav/ChatBox';
import MobileFooter from '../footer/mobile_footer';
import FooterInfo from '../footer-info/FooterInfo';
import Header from '../header/Header';

const MainLayout = ({ children }) => {
  const { isOpen } = useSelector((state) => state.modal);

  return (

    <div className="relative main">
      <Header />

      {isOpen && <Modal />}
      {children}
      <FooterInfo />

      <Footer />
      <ChatBox />
      <MobileFooter />
    </div>
  );
};

export default MainLayout;
