import { useEffect, useRef, Suspense, useState } from "react";
import "./App.css";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import Experience from "./components/Experience";
import {
  Environment,
  KeyboardControls,
  useProgress,
  Loader,
} from "@react-three/drei";
import * as THREE from "three";
import { TriforceLoader } from "./Loaders/TriforceLoader";
import Popup from "./Layout/Popup";

function App() {
  const [sceneLoaded, setSceneLoaded] = useState(false);

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
        {sceneLoaded && <Popup />}
        <Canvas
          // camera={{ position: [6, 4, 2], fov: 50 }}
          camera={{ position: [0, 0, 2], fov: 50 }}
          gl={{
            // toneMappingExposure: 0.5,
            antialias: true,
          }}
          onCreated={({ gl }) => {
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap;
          }}
          shadows
        >
          <Suspense
            fallback={
              <TriforceLoader
                scale={0.3}
                rotation={[Math.PI / 2, 0, 0]}
                position={[0, 0.3, 0]}
              />
            }
          >
            <LoadDetector onLoaded={() => setSceneLoaded(true)} />
            <Experience />
          </Suspense>
          {/* <TriforceLoader
            scale={0.3}
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, 0.3, 0]}
          /> */}
        </Canvas>
      </KeyboardControls>
    </>
  );
}
function LoadDetector({ onLoaded }) {
  useEffect(() => {
    onLoaded();
  }, []);
  return null;
}

export default App;
