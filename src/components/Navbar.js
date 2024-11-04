import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, AppBar, Toolbar, Typography } from '@mui/material';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Ελέγχει αν είναι στις σελίδες AuthorsPage ή BooksPage
  const showBackButton = location.pathname === '/authors' || location.pathname === '/books';

  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">BookHive</Typography>
        
        {showBackButton && (
          <Button
            color="inherit"
            onClick={() => navigate(-1)} // Πηγαίνει πίσω στην προηγούμενη σελίδα
            style={{ marginRight: '1rem' }}
          >
            Back
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;