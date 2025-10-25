import { useRef, useEffect } from "react";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";

const Char = () => {
  const [subscribedKeys, getKeys] = useKeyboardControls();
  const body = useRef();

  useFrame((state, delta) => {
    const { forward, backwards, left, right } = getKeys();
    // console.log(forward, backwards, left, right);

    const impulse = { x: 0, y: 0, z: 0 };

    const impulseStrength = 35 * delta;

    if (forward) impulse.z -= impulseStrength;
    if (backwards) impulse.z += impulseStrength;
    if (left) impulse.x -= impulseStrength;
    if (right) impulse.x += impulseStrength;

    body.current.applyImpulse(impulse);

    const bodyPosition = body.current.translation();

    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(bodyPosition);
    // cameraPosition.z += 2.25;
    // cameraPosition.y += 0.65;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(bodyPosition);
    // cameraTarget.y += 0.25;

    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(cameraTarget);
  });

  return (
    <>
      <RigidBody
        type='dynamic'
        friction={0.25}
        restitution={0}
        linearDamping={3} // slows movement over time
        angularDamping={10} // keeps rotation steady
        lockRotations
        canSleep={false}
        ref={body}
        position={[-5.5, 3.5, 0]}
      >
        <CapsuleCollider args={[0.6, 0.4]} />
        <mesh castShadow>
          <capsuleGeometry args={[0.4, 1]} />
          <meshBasicMaterial />
        </mesh>
      </RigidBody>
    </>
  );
};

export default Char;
