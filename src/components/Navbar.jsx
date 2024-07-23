import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Select, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../context/AuthReducer/action';

const Navbar = ({ toggleDrawer, language, setLanguage, darkMode, toggleDarkMode }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  console.log('isAuthenticated', isAuthenticated)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    console.log('logOut', e);
    dispatch(logOut());
  }

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Box>
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            sx={{ color: 'white', marginRight: 2 }}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="es">Spanish</MenuItem>
          </Select>
          <IconButton color="inherit" onClick={toggleDarkMode}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          {isAuthenticated && <>
            <IconButton edge="end" color="inherit" onClick={handleMenu}>
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
            </Menu>
          </>}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
