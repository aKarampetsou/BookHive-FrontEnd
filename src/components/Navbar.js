import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = React.useContext(AuthContext); // Η logout είναι μια συνάρτηση που έχουμε ορίσει μέσα στο AuthContext και την καλούμε για να αποσυνδεθεί ο χρήστης
  const navigate = useNavigate(); // χρ'ηση του useNavigate για redirect στο /login μετά το logout

  const handleLogout = () => {
    logout(); // Αποσύνδεση χρήστη
    navigate('/login'); // Ανακατεύθυνση στη σελίδα login
  };

  
  return (
    <AppBar position="static"> {/* Το AppBar είναι ένα component του Material UI για τη μπάρα πλοήγησης*/}
      <Toolbar>
        {user && <Button color="inherit" component={Link} to="/authors">Authors</Button>}
        {user && <Button color="inherit" component={Link} to="/books">Books</Button>}
        {user ? (
          <Button color="inherit" onClick={handleLogout}>Logout</Button> // Εμφανίζει το κουμπί Logout αν ο χρήστης είναι συνδεδεμένος
        ) : (
          <Button color="inherit" component={Link} to="/login">Login</Button> // Εμφανίζει το κουμπί Login αν ο χρήστης δεν είναι συνδεδεμένος
        )}
      </Toolbar>
    </AppBar>
  );
  
}
export default Navbar;