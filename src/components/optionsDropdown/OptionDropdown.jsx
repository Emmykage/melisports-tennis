import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { HorizontalRuleOutlined, MoreHorizRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function OptionDropdown({
  id, link = 'orders', setOpen, handleDel,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHorizRounded />
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => navigate(`/admin/${link}/${id}`)}>Edit</MenuItem>
        <MenuItem onClick={() => navigate(`/admin/${link}/${id}`)}>View</MenuItem>
        <MenuItem onClick={() => handleDel(id)}>Delete</MenuItem>
      </Menu>
    </div>
  );
}
