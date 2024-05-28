import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-tooltip/dist/react-tooltip.css'
// import { stopReportingRuntimeErrors } from 'react-error-overlay'
// if (process.env.NODE_ENV!== 'production') {
//   stopReportingRuntimeErrors(); // Disable error overlays in development
// }


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
         <App />
  </React.StrictMode>
);

