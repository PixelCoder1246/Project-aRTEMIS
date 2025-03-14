import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './Layout.css';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';

function Layout() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const location = useLocation(); 

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);  

  return (
    <div className="layout-container">
      <Navbar toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} /> 
      <div className="main-content">
        <Outlet />  
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
