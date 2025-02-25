import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../footer/Footer';
import Modal from '../modal/Modal';
import ChatBox from '../sideNav/ChatBox';
import NavInfo from '../nav/NavInfo';
 import MobileFooter from '../footer/mobile_footer';
import FooterInfo from '../footer-info/FooterInfo';

const MainInfoLayout = ({ children }) => {
  const { isOpen } = useSelector((state) => state.modal);

  return (

    <div className="">
      {isOpen && <Modal />}
      {children}
      <FooterInfo />

      <Footer />
      <ChatBox />
      <MobileFooter />

    </div>
  );
};

export default MainInfoLayout;
