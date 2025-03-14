import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../hooks/authContext";
import { motion } from "framer-motion";
import "./LogoutButton.css"


const LogoutButton = ({ givenClass }) => {
  const navigate = useNavigate();
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
        setTimeout(()=> {
          navigate('/');
        }, 1000)
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
      className={`${givenClass}`}
    >
      {isLoggingOut ? "Logging out..." : "Logout"}
    </motion.button>

  );
};

export default LogoutButton;
