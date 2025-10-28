import { useRef, useEffect } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { Physics, RigidBody } from "@react-three/rapier";
import { PositionalAudio, Environment, useHelper } from "@react-three/drei";
import { DirectionalLightHelper, SpotLightHelper, CameraHelper } from "three";

const TemplOfTime = () => {
  const directionalLightRef = useRef();
  const spotLightRef = useRef();
  const target = useRef();

  const model = useLoader(
    GLTFLoader,
    "/Models/temple_of_time_4.glb",
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/draco/"); // Path to decoder files
      loader.setDRACOLoader(dracoLoader);
    }
  );

  console.log(model);

  // directional light helper
  useHelper(
    directionalLightRef,
    DirectionalLightHelper,

    3,
    "yellow"
  );

  useHelper(
    spotLightRef,
    SpotLightHelper,

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

      <spotLight
        ref={spotLightRef}
        position={[0, 55, 0]} // above the ground
        angle={Math.PI / 15} // cone width
        intensity={1000}
        distance={53.6}
        penumbra={0.4} // soft edge
        color={"#ffffff"}
        castShadow
      />

      <object3D ref={target} position={[0, 0, 0]} />

      <directionalLight
        // ref={directionalLightRef}
        position={[60, 45, -30]} // ← optimal position
        intensity={3}
        color='#ffb86c' // warm sunset orange
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={400}
        shadow-camera-left={-120}
        shadow-camera-right={120}
        shadow-camera-top={120}
        shadow-camera-bottom={-120}
        shadow-radius={2}
        shadow-bias={-0.0001}
      />
    </>
  );
};

export default TemplOfTime;
