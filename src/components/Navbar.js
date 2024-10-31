import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/books">Books</Link>
      <Link to="/authors">Authors</Link>
    </nav>
  );
}

export default Navbar;
