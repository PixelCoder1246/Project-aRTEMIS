import { useContext, useState } from "react";
import { AuthContext } from "../../hooks/authContext";
import { motion } from "framer-motion";
import "./LogoutButton.css"

const API_URL = import.meta.env.VITE_API_URL;


const LogoutButton = ({ givenClass }) => {
  const { checkAuthStatus } = useContext(AuthContext);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      const response = await fetch(`https://project-artemis-production.up.railway.app/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setTimeout(async () => {
          await checkAuthStatus();
          setIsLoggingOut(false);
        }, 1000);
      } else {
        console.error("Logout failed:", await response.json());
        setIsLoggingOut(false);
      }
    } catch (error) {
      console.error("Error during logout:", error);
      setIsLoggingOut(false);
    }
  };


  return (
    <motion.button
      onClick={handleLogout}
      initial={{ opacity: 1, scale: 1 }}
      animate={isLoggingOut ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={`logout-button ${givenClass}`}
    >
      {isLoggingOut ? "Logging out..." : "Logout"}
    </motion.button>

  );
};

export default LogoutButton;
