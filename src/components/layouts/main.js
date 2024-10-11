import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';
import Modal from '../modal/Modal';
import ChatBox from '../sideNav/ChatBox';
import { closeNav } from '../../redux/modal/nav';
import MobileFooter from '../footer/mobile_footer';
import FooterInfo from '../footer-info/FooterInfo';

const MainLayout = ({ children }) => {
  const { isOpen } = useSelector((state) => state.modal);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeNav());
  }, []);
  return (

    <div className="relative h-screen overflow-y-auto">
      {(user && !user.confirmed_at) && <div className="py-05 text-red px-4">Confirm your Account from the message sent to you Email</div>}
      {isOpen && <Modal />}
      <Nav />
      {children}
      <FooterInfo />

      <Footer />
      <ChatBox />
      <MobileFooter />
    </div>
  );
};

export default MainLayout;
