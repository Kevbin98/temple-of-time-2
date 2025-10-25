import { useRef, useEffect } from "react";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import { useFrame, useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";

const Char = () => {
  const [_, getKeys] = useKeyboardControls();
  const body = useRef();
  const { camera } = useThree();
  const walkTime = useRef(0);
  //foot step audio
  const foot1 = useRef(new Audio("/audio/foot1.ogg"));
  const foot2 = useRef(new Audio("/audio/foot2.ogg"));
  const useFirstFoot = useRef(true);
  console.log(foot1, foot2);

  const velocity = 35;

  useFrame((state, delta) => {
    const { forward, backwards, left, right } = getKeys();

    //bobbing
    const isMoving = forward || backwards || left || right;

    if (!body.current) return;

    const impulse = new THREE.Vector3();
    const impulseStrength = velocity * delta;

    // The camera's facing direction determines movement
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    direction.y = 0;
    direction.normalize();

    const rightDir = new THREE.Vector3();
    rightDir.crossVectors(direction, new THREE.Vector3(0, 1, 0)).normalize();

    if (forward) impulse.addScaledVector(direction, impulseStrength);
    if (backwards) impulse.addScaledVector(direction, -impulseStrength);
    if (left) impulse.addScaledVector(rightDir, -impulseStrength);
    if (right) impulse.addScaledVector(rightDir, impulseStrength);

    body.current.applyImpulse(impulse);

    // Keep camera "attached" to player
    const pos = body.current.translation();
    camera.position.set(pos.x, pos.y + 1.5, pos.z);

    //camera walk bobbing
    if (isMoving) walkTime.current += delta * 10; // speed of bob
    else walkTime.current = 0;

    const bobOffset = Math.sin(walkTime.current) * 0.05;
    state.camera.position.set(pos.x, pos.y + 1.5 + bobOffset, pos.z);
  });

  return (
    <RigidBody
      ref={body}
      type='dynamic'
      friction={0.25}
      restitution={0}
      linearDamping={3}
      angularDamping={10}
      lockRotations
      canSleep={false}
      position={[0, 3.5, 0]}
    >
      <CapsuleCollider args={[0.6, 0.4]} />
      <mesh visible={false}>
        <capsuleGeometry args={[0.4, 1]} />
        <meshStandardMaterial />
      </mesh>
    </RigidBody>
  );
};

export default Char;
