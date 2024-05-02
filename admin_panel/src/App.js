import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ResetPassword from "./Pages/ResetPassword";

import Cookies from 'js-cookie';

import { AuthProvider } from "react-auth-kit"; 
import Podcastler from "./Pages/Podcastler";



const App = () => {
 /*  const isAdmin = "true";*/
  const isAdmin = Cookies.get('isAdmin') === 'true';
  console.log(Cookies.get('isAdmin')) 
  if (!isAdmin) {
    return (
      <Router>
        <AuthProvider> {/* Add the AuthProvider component */}
          <Routes>
            <Route path="/" element={<Login  />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset" element={<ResetPassword />} />
          </Routes>
        </AuthProvider>
      </Router>
    );
  } else if (isAdmin) {
    return (
      <Router>
        <AuthProvider> {/* Add the AuthProvider component */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/podcast" element={<Podcastler />} />
          </Routes>
        </AuthProvider>
      </Router>
    );
  }
};

export default App;
