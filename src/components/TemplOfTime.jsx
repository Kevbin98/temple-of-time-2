import { useRef, useEffect } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { Physics, RigidBody } from "@react-three/rapier";
import { PositionalAudio, Environment, useHelper } from "@react-three/drei";
import { DirectionalLightHelper, SpotLightHelper, CameraHelper } from "three";
import DustParticles from "./DustParticles";
import Godray from "./Godray";

const TemplOfTime = () => {
  const directionalLightRef = useRef();
  const spotLightRef = useRef();
  const target = useRef();

  const model = useLoader(GLTFLoader, "/Models/templelol.glb", (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/"); // Path to decoder files
    loader.setDRACOLoader(dracoLoader);
  });

  console.log(model);

  // directional light helper
  useHelper(
    directionalLightRef,
    DirectionalLightHelper,

    3,
    "yellow"
  );

  useEffect(() => {
    model.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material.shadowSide = 2;
        // console.log(
        //   child.name,
        //   "cast:",
        //   child.castShadow,
        //   "recv:",
        //   child.receiveShadow
        // );
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
      directionalLightRef.current.shadow.needsUpdate = true; // only once
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
        position={[60, 45, -30]} // ← optimal position
        intensity={1.5}
        // color='#ffb86c' // warm sunset orange
        // color='#bcd2ff'
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
        // shadow-bias={-0.0001}
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

      {/* <spotLight
        color={"#fff8e6"}
        intensity={3.5}
        distance={200}
        angle={Math.PI / 7} // controls cone width
        penumbra={0.8} // smooth edge falloff
        decay={2} // light fades with distance
        position={[0, 38, -155]} // start at godray origin
        target-position={[0, 0, 0]} // where the light lands (e.g. the pedestal)
        castShadow
      /> */}
    </>
  );
};

export default TemplOfTime;
