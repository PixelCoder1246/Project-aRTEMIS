import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css";
import { useAuth } from "./hooks/useAuth";

import Dashboard from "./Pages/Dashboard/Dashboard";
import Layout from "./Pages/LandingPages/LayoutArea/Layout";
import Login from "./Pages/AuthPages/LoginPage/Login";
import Register from "./Pages/AuthPages/RegisterPage/Register";
import HomePage from "./Pages/LandingPages/Homepage/HomePage";
import AboutPage from "./Pages/LandingPages/AboutPage/AboutPage";
import Services from "./Pages/LandingPages/Services/Services";
import ContactUs from "./Pages/LandingPages/ContactUs/ContactUs";

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
          <Route
            index
            element={
              <motion.div {...pageVariants}>
                <HomePage />
              </motion.div>
            }
          />
          <Route
            path="about"
            element={
              <motion.div {...pageVariants}>
                <AboutPage />
              </motion.div>
            }
          />
          <Route
            path="services"
            element={
              <motion.div {...pageVariants}>
                <Services />
              </motion.div>
            }
          />
          <Route
            path="contact"
            element={
              <motion.div {...pageVariants}>
                <ContactUs />
              </motion.div>
            }
          />
          {!isAuthenticated && (
            <>
              <Route
                path="register"
                element={
                  <motion.div {...pageVariants}>
                    <Register />
                  </motion.div>
                }
              />
              <Route
                path="login"
                element={
                  <motion.div {...pageVariants}>
                    <Login />
                  </motion.div>
                }
              />
            </>
          )}
        </Route>
        <Route
          path="/dashboard"
          element={
            <motion.div {...pageVariants}>
              <Dashboard />
            </motion.div>
          }
        />
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
