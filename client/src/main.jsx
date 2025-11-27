// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter as Router } from "react-router-dom"; // sahi


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRoute>
//      <App />
//      </BrowserRoute>
   
//   </StrictMode>,
// )
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter} from "react-router-dom"; // ✅

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  // document.getElementById('root')
);
