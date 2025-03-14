import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "./hooks/useAuth";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import "./App.css";
import Layout from "./Pages/LandingPages/LayoutArea/Layout";
import Login from "./Pages/AuthPages/LoginPage/Login";
import Register from "./Pages/AuthPages/RegisterPage/Register";
import HomePage from "./Pages/LandingPages/Homepage/HomePage";
import AboutPage from "./Pages/LandingPages/AboutPage/AboutPage";
import Services from "./Pages/LandingPages/Services/Services";
import ContactUs from "./Pages/LandingPages/ContactUs/ContactUs";
import LayoutDashboard from './Pages/Dashboard/LayoutDashboard/LayoutDashboard';
import Dashboard from './Pages/Dashboard/UserDashboard/UserDashboard';
import SoloDev_Guild from './Pages/Dashboard/Dev-Guild/SoloDev_Guild';
import GroupDev_Guild from './Pages/Dashboard/Dev-Guild/GroupDev_Guild';
import Settings_Area from './Pages/Settings/Settings_Area';
import Busi_Guild from "./Pages/Dashboard/Busi-Guild/Busi_Guild";
import Creative_Guild from "./Pages/Dashboard/Creative-Guild/Creative_Guild";
import Tutor_Guild from "./Pages/Dashboard/Tutor-Guild/Tutor_Guild";
import Report from "./Pages/Dashboard/Report/Report";
import TechNews from "./Pages/Dashboard/TechNews/TechNews";
import MarketCenter from "./Pages/Dashboard/MarketCenter/MarketCenter";
import Notifications from "./Pages/Dashboard/Notifications/Notifications";
import ForgotPass from "./Pages/AuthPages/ForgotPass/ForgotPass";
import Recovery from "./Pages/AuthPages/Recovery/Recovery";


function AnimatedRoutes() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<motion.div {...pageVariants}><HomePage /></motion.div>} />
          <Route path="about" element={<motion.div {...pageVariants}><AboutPage /></motion.div>} />
          <Route path="services" element={<motion.div {...pageVariants}><Services /></motion.div>} />
          <Route path="contact" element={<motion.div {...pageVariants}><ContactUs /></motion.div>} />
          <Route path="forgotpass" element={<motion.div {...pageVariants}><ForgotPass /></motion.div>} />
          <Route path="recovery" element={<motion.div {...pageVariants}><Recovery /></motion.div>} />
          {!isAuthenticated && (
            <>
              <Route path="register" element={<motion.div {...pageVariants}><Register /></motion.div>} />
              <Route path="login" element={<motion.div {...pageVariants}><GoogleReCaptchaProvider reCaptchaKey="6LfGD-8qAAAAAMbk4YwyOtfr5eFg-pRtDGeVsYXI"><Login /></GoogleReCaptchaProvider></motion.div>} />
            </>
          )}
        </Route>
        <Route path="dashboard" element={<motion.div {...pageVariants}><LayoutDashboard /></motion.div>} >
          <Route index element={<motion.div {...pageVariants}><Dashboard /></motion.div>} />
          <Route path="solo-dev-guild" element={<motion.div {...pageVariants}><SoloDev_Guild /></motion.div>} />
          <Route path="group-dev-guild" element={<motion.div {...pageVariants}><GroupDev_Guild /></motion.div>} />
          <Route path="settings" element={<motion.div {...pageVariants}><Settings_Area/></motion.div>} />
          <Route path="busi-guild" element={<motion.div {...pageVariants}><Busi_Guild /></motion.div>} />
          <Route path="creative-guild" element={<motion.div {...pageVariants}><Creative_Guild /></motion.div>} />
          <Route path="tutor-guild" element={<motion.div {...pageVariants}><Tutor_Guild /></motion.div>} />
          <Route path="report" element={<motion.div {...pageVariants}><Report /></motion.div>} />
          <Route path="technews" element={<motion.div {...pageVariants}><TechNews /></motion.div>} />
          <Route path="marketcenter" element={<motion.div {...pageVariants}><MarketCenter /></motion.div>} />
          <Route path="notification" element={<motion.div {...pageVariants}><Notifications /></motion.div>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (

    <Router>
      <AnimatedRoutes />
    </Router>

  );
}

export default App;

