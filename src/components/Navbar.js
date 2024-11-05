// Navbar.js
import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, AppBar, Toolbar, Typography } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { logout, user } = useContext(AuthContext); // Παίρνουμε τη συνάρτηση logout και τον user από το AuthContext
  const location = useLocation();
  const navigate = useNavigate();

  // Ελέγχει αν είναι στις σελίδες AuthorsPage ή BooksPage για να εμφανίζει το κουμπί "Back"
  const showBackButton = location.pathname === '/authors' || location.pathname === '/books';

  const handleLogout = () => {
    logout(); // Εκτέλεση της αποσύνδεσης
    navigate('/'); // Ανακατεύθυνση στην αρχική σελίδα
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">BookHive</Typography>
        
        <div>
          {showBackButton && (
            <Button
              color="inherit"
              onClick={() => navigate(-1)} // Πηγαίνει πίσω στην προηγούμενη σελίδα
              style={{ marginRight: '1rem' }}
            >
              Back
            </Button>
          )}
          {user && ( // Εμφάνιση του κουμπιού Logout μόνο αν υπάρχει χρήστης
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;