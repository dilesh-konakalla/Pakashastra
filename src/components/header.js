import React from 'react';
import { AppBar, Toolbar, Typography, styled } from '@mui/material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0)',
  boxShadow: 'none',
 
}));

const Container = styled('div')({
  backgroundColor: 'rgb(94, 87, 69)',
  padding: '16px',
  borderRadius: '8px',
  textAlign: 'center',
  margin: 'auto', // Center the container horizontally
  maxWidth: '600px', // Set a maximum width for the container
});

const useStyles = {
  title: {
    fontFamily: 'YourChosenFont, sans-serif',
    fontSize: '2rem',
    color: 'white',
  },
};

const Header = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Container>
          <Typography variant="h6" sx={useStyles.title}>
            Pakashastra (పాకశాస్త్రం)
          </Typography>
        </Container>
        {/* Add any additional header content or navigation links here */}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
