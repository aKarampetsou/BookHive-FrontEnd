import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function MainPage() {
  const { user } = useContext(AuthContext); 

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      

      {/* Εμφανίζουμε τα κουμπιά μόνο αν ο χρήστης είναι συνδεδεμένος */}
      {user && (
        <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/authors"
            style={{ fontSize: '1.5rem', padding: '1rem 2rem' }}
          >
            Authors
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/books"
            style={{ fontSize: '1.5rem', padding: '1rem 2rem' }}
          >
            Books
          </Button>
        </div>
      )}
    </div>
  );
}

export default MainPage;
