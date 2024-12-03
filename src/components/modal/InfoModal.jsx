import { Style } from '@mui/icons-material'
import { Box, Modal, Typography } from '@mui/material'
import React from 'react'

const InfoModal = ({children,handleClose, open}) => {
  return (
    <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
        className='flex'
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box className="bg-white m-auto max-w-lg w-full ">
            {children}
        </Box>
        </Modal>
    </div>
  )
}

export default InfoModal