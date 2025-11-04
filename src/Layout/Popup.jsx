import React, { useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";

const Popup = ({ onEnter }) => {
  const [visible, setVisible] = useState(true);

  const handleEnter = async () => {
    // Play audio when user clicks
    const audio = new Audio("/audio/temple of time.wav");
    audio.loop = true;
    audio.volume = 0.4;
    try {
      await audio.play();
    } catch (err) {
      console.warn("Audio playback blocked:", err);
    }

    // Fade out popup
    setVisible(false);

    // Notify parent (e.g. TempleOfTime) that we've entered
    if (onEnter) onEnter();
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            key='popup'
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0, 0, 0)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              color: "#f4e3a1",
              fontFamily: "Cinzel, serif",
              textAlign: "center",
            }}
          >
            {/* <motion.h1
              style={{
                marginBottom: "1rem",
                fontSize: "1.5rem",
                letterSpacing: "1px",
                textShadow: "0 0 10px #c8b44b",
              }}
              animate={{ opacity: [1, 0.8, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Enter the Temple of Time
            </motion.h1> */}

            <Button
              onClick={handleEnter}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              text={"enter"}
              style={{
                background: "none",
                color: "#f4e3a1",
                border: "2px solid #f4e3a1",
                borderRadius: "12px",
                padding: "12px 28px",
                fontSize: "1.1rem",
                letterSpacing: 1,
                cursor: "pointer",
              }}
            />

            {/* </Button> */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Popup;
