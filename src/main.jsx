import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // ✅ Import createRoot
import './index.css';
import App from './App.jsx';
import "@fontsource/outfit";
import "@fontsource/roboto";

const root = createRoot(document.getElementById('root')); // ✅ Use createRoot correctly

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
