import { useRef, useEffect, useState } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useHelper, useGLTF, Html } from "@react-three/drei";
import { DirectionalLightHelper, PointLightHelper } from "three";
import { motion, AnimatePresence } from "framer-motion";
import DustParticles from "./DustParticles";
import Godray from "./Godray";
import * as THREE from "three";
import Popup from "../Layout/Popup";

const TemplOfTime = () => {
  const directionalLightRef = useRef();
  const pointLightRef = useRef();
  const target = useRef();
  const model = useGLTF("/Models/templelol.glb");
  const [entered, setEntered] = useState(false);
  const [audio, setAudio] = useState(null);

  useHelper(
    pointLightRef,
    PointLightHelper,

    3,
    "yellow"
  );

  useEffect(() => {
    const templeAudio = new Audio("/audio/temple of time.wav");
    templeAudio.loop = true;
    templeAudio.volume = 0.4;
    setAudio(templeAudio);
  }, []);

  const handleEnter = async () => {
    if (audio) {
      try {
        await audio.play();
      } catch (err) {
        console.warn("Audio playback blocked:", err);
      }
    }
    setEntered(true);
  };

  useEffect(() => {
    model.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material.shadowSide = 2;
        child.name.toLowerCase();

        model.nodes.main_hall.traverse((obj) => {
          if (obj.isMesh) {
            obj.castShadow = false;
            obj.receiveShadow = true;
          }
        });

        model.nodes.gothic_window_69.traverse((obj) => {
          if (obj.isMesh) {
            obj.castShadow = true;
            obj.receiveShadow = true;
          }
        });
      }

      const n = child.name.toLowerCase();
      if (n.includes("ramp") || n.includes("collider")) {
        child.castShadow = false;
        child.receiveShadow = false;
        child.material.transparent = true;
        child.material.opacity = 0;
      }
    });
  }, [model]);

  useEffect(() => {
    if (directionalLightRef.current) {
      directionalLightRef.current.shadow.autoUpdate = false;
      directionalLightRef.current.shadow.needsUpdate = true;
    }
  }, []);

  return (
    <>
      <RigidBody type='fixed' colliders='trimesh'>
        <primitive object={model.scene} />
      </RigidBody>

      <object3D ref={target} position={[0, 0, 0]} />

      <directionalLight
        // ref={directionalLightRef}
        position={[60, 45, -50]} // ← optimal position
        intensity={1.5}
        color='#cdd8ff'
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-near={1}
        shadow-camera-far={400}
        shadow-camera-left={-120}
        shadow-camera-right={120}
        shadow-camera-top={120}
        shadow-camera-bottom={-120}
        shadow-radius={2}
        shadow-bias={-0.0005}
        shadow-normalBias={0.02}
      />
      <DustParticles />
      <Godray
        scale={[5, 25, 9]}
        rotation={[Math.PI / -5, 0, 0]} // angle the beam if needed
        height={5}
        top={0.5}
        bottom={1.3}
        color='white'
        position={[0, 38, -155]}
        opacity={0.5}
      />
      <ambientLight intensity={1} color='#433322' />
    </>
  );
};
useGLTF.preload("/Models/templelol.glb");

export default TemplOfTime;
