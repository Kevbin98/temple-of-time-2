import { motion } from "framer-motion";

export default function Triforce() {
  const triangle = {
    width: 100,
    height: 100,
    background:
      "radial-gradient(circle at 50% 50%, #fff8c2 0%, #f6d77a 60%, transparent 100%)",
    clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
    position: "absolute",
  };

  const container = {
    position: "relative",
    width: 200,
    height: 200,
  };

  return (
    <div style={container}>
      {["top", "left", "right"].map((_, i) => (
        <motion.div
          key={i}
          style={{
            ...triangle,
            left: i === 0 ? 50 : i === 1 ? 0 : 100,
            top: i === 0 ? 0 : 100,
          }}
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
