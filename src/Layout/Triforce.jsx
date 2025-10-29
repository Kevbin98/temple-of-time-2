import { motion } from "framer-motion";
import Logo from "/textures/triforce.svg";

export default function Triforce() {
  const container = {
    position: "relative",
    width: 250,
    height: 250,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <motion.div
      style={container}
      animate={{ opacity: [1, 0.7, 1] }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.img
        src={Logo}
        alt='Triforce'
        style={{
          width: "100%",
          height: "100%",
          filter: "drop-shadow(0 0 25px rgba(255, 215, 0, 0.4))",
          userSelect: "none",
        }}
        animate={{
          scale: [1, 1.01, 1],
          filter: [
            "drop-shadow(0 0 10px rgba(255,215,0,0.4))",
            "drop-shadow(0 0 20px rgba(255,215,0,0.4))",
            "drop-shadow(0 0 10px rgba(255,215,0,0.4))",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
