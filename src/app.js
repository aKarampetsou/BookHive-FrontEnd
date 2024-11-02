import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AuthorsPage from './pages/AuthorsPage';
import BooksPage from './pages/BooksPage';
import BooksDetailsPage from './pages/BooksDetailsPage';
import AuthorsDetailsPage from './pages/AuthorsDetailsPage';
import { AuthProvider, AuthContext } from './context/AuthContext';

// Το PrivateRoute είναι συνάρτηση που ελέγχει αν ο χρήστης είναι συνδεδεμένος ώστε να παρέχει προστασία για διαδρομές (routes) που απαιτούν σύνδεση
function PrivateRoute({ children }) {
  const { user } = React.useContext(AuthContext); // Ελέγχουμε αν υπάρχει συνδεδεμένος χρήστης
  return user ? children : <Navigate to="/login" />; // Ανακατεύθυνση στο login αν ο χρήστης δεν είναι συνδεδεμένος
}

function App() {
  return (
    /*AuthProvider: Εξασφαλίζει ότι τα δεδομένα του authentication (π.χ., αν ο χρήστης είναι συνδεδεμένος και το token)
     είναι διαθέσιμα σε κάθε μέρος της εφαρμογής που το χρειάζεται (component)*/
    <AuthProvider> 
      <Router>  {/* Router: Χρησιμοποιείται για να καθοδηγούμε την εφαρμογή στα σωστά components με βάση το URL */}
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Προστατευμένες διαδρομές για συγγραφείς */}
          <Route 
            path="/authors" 
            element={
              <PrivateRoute> {/* */}
                <AuthorsPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/authors/:id" 
            element={
              <PrivateRoute>
                <AuthorsDetailsPage />
              </PrivateRoute>
            } 
          />
          
          {/* Προστατευμένες διαδρομές για βιβλία */}
          <Route 
            path="/books" 
            element={
              <PrivateRoute>
                <BooksPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/books/:id" 
            element={
              <PrivateRoute>
                <BooksDetailsPage />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;