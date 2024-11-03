import React, { createContext, useState } from 'react';
import axios from 'axios';

// Δημιουργία του Context για το Authentication
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Ο χρήστης αρχικοποιείται ως null

  // Συνάρτηση login
  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        setUser({ username }); // Αποθηκεύουμε μόνο το username του χρήστη
        return true; // Επιτυχής σύνδεση
      } else {
        console.error('Login failed:', response.statusText);
        return false; // Αποτυχία σύνδεσης
      }
    } catch (error) {
      console.error('Login error:', error);
      return false; // Αποτυχία σύνδεσης
    }
  };
  

  // Συνάρτηση logout
  const logout = () => {
    setUser(null); // Καθαρίζουμε τον χρήστη
    localStorage.removeItem('token'); // Διαγράφουμε το token από το localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
