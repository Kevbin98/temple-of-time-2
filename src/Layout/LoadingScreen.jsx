// components/LoadingScreen.jsx
import { Html, useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import Triforce from "./Triforce";
import Border from "/textures/vintageborder.png";

export default function LoadingScreen() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  const [showButton, setShowButton] = useState(false);
  const [fade, setFade] = useState(false);

  console.log(progress, active, item, loaded, total, errors);

  // Show the button once loading reaches 100%
  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => setShowButton(true), 500);
    }
  }, [progress]);

  // useEffect(() => {
  //   console.log("progress:", progress);
  // }, [progress]);

  // Handle button click (fade out screen)
  const handleEnter = () => {
    setFade(true);
  };

  return (
    <>
      <AnimatePresence>
        {!fade && (
          <motion.div
            key='loader'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              inset: "0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#f4e3a1",
              textAlign: "center",
              fontFamily: '"Cinzel", serif',
              textShadow: "0 0 20px #f6d77a",
              position: "fixed",
              userSelect: "none",
              height: "100vh",
              width: "100vw",
              overflow: "hidden",

              background: `
      radial-gradient(circle at center, #3C2F1C 0%, #0d0904 50%, #000 100%),
      repeating-radial-gradient(circle at 0 0, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 3px)
    `,
              backgroundBlendMode: "overlay",
              boxSizing: "border-box",
              zIndex: 9999,
            }}
          >
            <motion.img
              src={Border}
              alt='border'
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                userSelect: "none",
                opacity: 0.9,
                filter: "drop-shadow(0 0 10px #d4af37)",
              }}
              animate={{
                filter: [
                  "drop-shadow(0 0 10px #d4af37)",
                  "drop-shadow(0 0 25px #f6d77a)",
                  "drop-shadow(0 0 10px #d4af37)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div>
              <Triforce />
            </motion.div>

            {/* Progress text */}
            {!showButton ? (
              <motion.p
                style={{
                  marginTop: 20,
                  fontSize: "1.2rem",
                  letterSpacing: 1,
                }}
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {Math.floor(progress)}% Loading...
              </motion.p>
            ) : (
              <Button text='start' onClick={handleEnter} />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
