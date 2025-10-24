import { useRef, useEffect } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { Physics, RigidBody } from "@react-three/rapier";
import { PositionalAudio } from "@react-three/drei";

const SacredGrove = () => {
  const model = useLoader(
    GLTFLoader,
    "/Models/sacredgrovedraco3.glb",
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/draco/"); // Path to decoder files
      loader.setDRACOLoader(dracoLoader);
    }
  );

  console.log(model);

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
    </>
  );
};

export default SacredGrove;
