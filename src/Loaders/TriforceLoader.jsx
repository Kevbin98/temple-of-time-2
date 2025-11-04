import React, { useRef } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFrame } from "@react-three/fiber";

export function TriforceLoader(props) {
  const rotate = useRef();

  useFrame((state, delta) => {
    rotate.current.rotation.z += delta * 0.5;
  });

  const { nodes, materials } = useGLTF("/Models/triforce crest.glb");
  return (
    <>
      <group {...props} dispose={null} ref={rotate}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.triforce.geometry}
          material={materials.triforce}
        />
      </group>
      <Html center position={[0, -0.2, 0]}>
        <AnimatePresence>
          <motion.div
            key='loading-text'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              color: "#f4e3a1",
              position: "relative",
              transform: "translateX(-50%)", // ✅ true centering for all screen sizes
              textAlign: "center",
            }}
          >
            <motion.p
              style={{
                fontSize: "1.2rem",
                letterSpacing: 1,
                fontFamily: "Cinzel, serif",
                textShadow: "0 0 10px #c8b44b",
              }}
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Loading
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </Html>
    </>
  );
}

useGLTF.preload("/triforce crest.glb");
