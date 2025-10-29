import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Button = ({ text, onClick }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/audio/UI/UIsound.wav");
    audioRef.current.volume = 0.4;
  }, []);

  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
    if (onClick) onClick(); // ✅ Call parent callback (e.g. handleEnter)
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        marginTop: 30,
        padding: "12px 28px",
        background: "none",
        border: "2px solid #f4e3a1",
        borderRadius: 8,
        color: "#f4e3a1",
        fontFamily: '"Cinzel", serif',
        fontSize: "1.1rem",
        letterSpacing: "1px",
        cursor: "pointer",
        textShadow: "0 0 10px #f6d77a",
        transition: "all 0.1s ease",
      }}
      whileHover={{
        backgroundColor: "#f4e3a1",
        color: "#000",
        boxShadow: "0 0 20px #f4e3a1",
      }}
    >
      {text}
    </motion.button>
  );
};

export default Button;
