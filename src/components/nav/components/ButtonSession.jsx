import React from 'react';

// import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ButtonSession = ({
  handleLogOut,
  user,
}) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleNavigate = (link) => {
    navigate(link);
  };

  const handleSessionLogOut = (event) => {
    handleClose(event);
    handleLogOut();
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <Button
        ref={anchorRef}
        variant="text"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: '10px',
          marginLeft: '0px',
          padding: '0px',
        }}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        endIcon={<FaUser className="text-theme-alt" />}
      />

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {!user && <MenuItem onClick={(e) => handleNavigate('/auth/login')}>Login</MenuItem>}
                  {!user && <MenuItem onClick={(e) => handleNavigate('/auth/sign_up')}>Sign Up</MenuItem>}
                  {user && (
                    <MenuItem onClick={(e) => {
                      handleSessionLogOut(e);
                    }}
                    >
                      Log Out
                    </MenuItem>
                  )}

                  {user && <MenuItem onClick={() => navigate('/profile')}>My account</MenuItem>}
                  {/*  <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default ButtonSession;
