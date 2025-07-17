import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "100%",
  maxWidth: 800,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: "10px",
  boxShadow: 24,
  padding: 2,
};

 const  AppModal = ({
    open,
    children,
    onCancel,
    onClose
}) => {

    const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
      // className='max-w-5xl m-auto'
        open={open}
        onClose={onClose}
        onCancel={onCancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         
         {children}
        </Box>
      </Modal>
    </div>
  );
}

export default AppModal