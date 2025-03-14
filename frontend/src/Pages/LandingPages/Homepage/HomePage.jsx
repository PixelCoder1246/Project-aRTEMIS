import React, { useRef } from "react";
import AICards from "../../../Components/LandingPageComponents/AICards/AICards";
import LandingCards from "../../../Components/LandingPageComponents/LandingCards/LandingCards";
import LandingComponent from "../../../Components/LandingPageComponents/LandingComponent/LandingComponent";
import { motion } from "framer-motion";
import { useAuth } from "../../../hooks/useAuth";

function HomePage() {
  const aiCardsRef = useRef(null);
  const { isAuthenticated } = useAuth();

  const handleScrollToAICards = () => {
    if (aiCardsRef.current) {
      aiCardsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <motion.div
      key={isAuthenticated ? "logged-in" : "logged-out"}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="container mx-auto p-6"
    >
      <LandingComponent onGetStartedClick={handleScrollToAICards} />
      <LandingCards />
      <AICards ref={aiCardsRef} />
    </motion.div>
  );
}

export default HomePage;
