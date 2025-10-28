// components/LoadingScreen.jsx
import { Html, useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Triforce from "./Triforce";

export default function LoadingScreen() {
  const { progress } = useProgress();
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => setFade(true), 500);
    }
  }, [progress]);

  return (
    <Html center>
      <motion.div
        style={{
          background: "black",
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <AnimatePresence>
          {!fade && (
            <motion.div
              key='loader'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#f4e3a1",
                textAlign: "center",
                fontFamily: '"Cinzel", serif',
                textShadow: "0 0 20px #f6d77a",
                userSelect: "none",
              }}
            >
              <motion.div
              // animate={{
              //   rotate: [0, 120, 240, 360],
              //   scale: [1, 1.2, 1, 1.2, 1],
              // }}
              // transition={{
              //   duration: 6,
              //   repeat: Infinity,
              //   ease: "linear",
              // }}
              // style={{
              //   width: 100,
              //   height: 100,
              //   clipPath:
              //     "polygon(50% 0%, 0% 100%, 100% 100%, 50% 0%, 50% 35%, 20% 90%, 80% 90%, 50% 35%)",
              //   background:
              //     "radial-gradient(circle at 50% 50%, #fff8c2 0%, #f6d77a 60%, transparent 100%)",
              //   boxShadow: "0 0 30px 10px #f4e3a1",
              // }}
              >
                <Triforce />
              </motion.div>

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
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Html>
  );
}
