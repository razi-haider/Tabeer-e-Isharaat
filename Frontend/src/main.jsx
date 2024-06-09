import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthContextProvider } from './Context/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  /*
    Strict Mode Disabled Currently because API being called multiple times in frontend
  */

  // <React.StrictMode>
  // AuthContextProvider used for tracking user login authentication throughout app
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
  // </React.StrictMode>,
)
