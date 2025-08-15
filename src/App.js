import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes for routing
import Sidebar from './Sidebar';
import MainContent from './MainContent'; // Import MainContent
import Header from './Header';
import FAQ from './FAQ'; // Import FAQ page
import Billing from './Billing'; // Import Billing page
import Alert from './Alert'; // Import the Alert component

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [alert, setAlert] = useState(null); // State for managing the alert

  useEffect(() => {
    const loggedInUserEmail = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    if (loggedInUserEmail && token) {
      setUser({ email: loggedInUserEmail });
    }
  }, []);

  const showAlert = (message, type = 'info') => {
    setAlert({ message, type });
  };

  const hideAlert = () => {
    setAlert(null); // Hide alert
  };

  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content no-top-margin">
          <Header
            user={user}
            setUser={setUser}
            isLoginModalOpen={isLoginModalOpen}
            setIsLoginModalOpen={setIsLoginModalOpen}
            showAlert={showAlert}
          />
          
          {/* Display the alert */}
          {alert && (
            <Alert 
              message={alert.message} 
              type={alert.type} 
              onClose={hideAlert} 
            />
          )}

          <Routes>
            <Route path="/" element={<MainContent user={user} setIsLoginModalOpen={setIsLoginModalOpen} showAlert={showAlert} />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/billing" element={<Billing />} /> {/* Add the Billing route */}
          </Routes>
        </div>
      </div>
      <style>
        {`
          .app-container {
            display: flex;
            min-height: 100vh;
          }
          .main-content {
            flex: 1;
            margin-left: 135px;
            padding: 30px;
            background: #fcfcfa;
          }
          .no-top-margin {
            margin-top: 0;
          }
        `}
      </style>
    </Router>
  );
};

export default App;
