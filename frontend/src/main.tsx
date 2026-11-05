import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// "main.tsx" file that serves as the entry point for the React application. It imports necessary modules, including React, ReactDOM, the main App component, and global CSS styles. The code uses ReactDOM to render the App component into the root DOM element, wrapped in React.StrictMode for highlighting potential issues in development.