import React from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';


const Modal = ({ open, setOpen, children }) => {
  const dispatch = useDispatch();
  return (
    <div className={`${open ? 'fixed' : 'hidden'}  inset-0 bg-black/50 flex items-center justify-center z-50 p-4"`}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl w-full  shadow-2xl p-6  max-w-2xl text-center space-y-6"
      >
        {' '}
        {children}
      </motion.div>

    </div>
  );
};

export default Modal;
