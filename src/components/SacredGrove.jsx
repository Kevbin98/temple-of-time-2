import { useRef, useEffect } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { Physics, RigidBody } from "@react-three/rapier";
import { PositionalAudio, Environment, useHelper } from "@react-three/drei";
import { DirectionalLightHelper, SpotLightHelper, CameraHelper } from "three";

const SacredGrove = () => {
  const directionalLightRef = useRef();
  const spotLightRef = useRef();

  const model = useLoader(
    GLTFLoader,
    "/Models/sacredgrovedraco3.glb",
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/draco/"); // Path to decoder files
      loader.setDRACOLoader(dracoLoader);
    }
  );

  // console.log(model);

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
      }
    });
  }, [model]);

  useEffect(() => {
    if (directionalLightRef.current) {
      directionalLightRef.current.shadow.autoUpdate = false;
      directionalLightRef.current.shadow.needsUpdate = true; // only once
    }
  }, []);

  model.nodes.ground.traverse((obj) => {
    if (obj.isMesh) obj.receiveShadow = true;
  });

  model.nodes.wall004.traverse((obj) => {
    if (obj.isMesh) {
      obj.receiveShadow = true;
      obj.castShadow = true;
    }
  });

  model.nodes.rock008.traverse((obj) => {
    if (obj.isMesh) {
      obj.receiveShadow = true;
      obj.castShadow = true;
    }
  });

  model.nodes.small_rock.traverse((obj) => {
    if (obj.isMesh) obj.receiveShadow = true;
  });

  model.nodes.small_rock003.traverse((obj) => {
    if (obj.isMesh) obj.receiveShadow = true;
  });

  model.scene.traverse((child) => {
    if (child.isMesh) {
      console.log(child.name, child.material.type);
    }
  });

  return (
    <>
      <RigidBody type='fixed' colliders={false}>
        <primitive object={model.scene} />
      </RigidBody>
      <RigidBody type='fixed' colliders='trimesh' friction={0.4}>
        <primitive object={model.nodes.ground} />
      </RigidBody>
      <RigidBody type='fixed' colliders='trimesh'>
        <primitive object={model.nodes.wall005} />
      </RigidBody>
      <RigidBody type='fixed' colliders='trimesh'>
        <primitive object={model.nodes.wall004} />
      </RigidBody>
      <RigidBody type='fixed' colliders='trimesh'>
        <primitive object={model.nodes.door} />
      </RigidBody>
      <RigidBody type='fixed' colliders='trimesh'>
        <primitive object={model.nodes.pillar002} />
      </RigidBody>
      <RigidBody type='fixed' colliders='cuboid'>
        <primitive object={model.nodes.passagway} />
      </RigidBody>
      <RigidBody type='fixed' colliders='hull'>
        <primitive object={model.nodes.pedestal} />
      </RigidBody>
      <RigidBody type='fixed' colliders='trimesh'>
        <primitive object={model.nodes.rock008} />
      </RigidBody>
      <RigidBody type='fixed' colliders='trimesh'>
        <primitive object={model.nodes.small_rock} />
        <primitive object={model.nodes.small_rock003} />
      </RigidBody>

      {/* <directionalLight
        ref={directionalLightRef}
        position={[140, 140, -10]}
        intensity={2}
        color={"#ffb86c"}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={400}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
      /> */}
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

export default SacredGrove;
