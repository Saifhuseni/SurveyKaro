import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';

// Create a root.
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

// Render the application
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
