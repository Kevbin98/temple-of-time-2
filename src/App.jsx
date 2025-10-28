import { useEffect, useRef } from "react";
import "./App.css";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Experience from "./components/Experience";
import { Environment, KeyboardControls } from "@react-three/drei";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
import * as THREE from "three";

function App() {
  return (
    <>
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "KeyW"] },
          { name: "backwards", keys: ["ArrowDown", "KeyS"] },
          { name: "left", keys: ["ArrowLeft", "KeyA"] },
          { name: "right", keys: ["ArrowRight", "KeyD"] },
        ]}
      >
        <Canvas
          camera={{ position: [6, 4, 2], fov: 50 }}
          gl={{
            toneMappingExposure: 0.2,
            antialias: true,
          }}
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
          }}
          shadows
        >
          <Experience />
          <Environment files='/hdri/nightsky.exr' background={true} />
        </Canvas>
      </KeyboardControls>
    </>
  );
}

export default App;
