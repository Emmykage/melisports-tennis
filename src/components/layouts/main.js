import React from 'react';
import { useSelector } from 'react-redux';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';
import Modal from '../modal/Modal';

const MainLayout = ({ children }) => {
  const { isOpen } = useSelector((state) => state.modal);
  return (

    <div className="container">
      {isOpen && <Modal />}
      <Nav />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
