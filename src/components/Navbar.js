import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, styled } from '@mui/material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.0)', // Transparent background with 50% opacity
  flexDirection: 'row-reverse', // Align items to the right
}));

const Navbar = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/Login">
          Login
        </Button>
        <Button color="inherit" component={Link} to="/user">
          User
        </Button>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
