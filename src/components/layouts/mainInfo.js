import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../footer/Footer';
import Modal from '../modal/Modal';
import ChatBox from '../sideNav/ChatBox';
import NavInfo from '../nav/NavInfo';
import { closeNav } from '../../redux/modal/nav';

const MainInfoLayout = ({ children }) => {
  const dispatch = useDispatch()
  const { isOpen } = useSelector((state) => state.modal);
  useEffect(()=>{
    dispatch(closeNav())
  },[])
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
