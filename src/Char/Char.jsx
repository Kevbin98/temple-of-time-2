import { useRef } from "react";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import { useFrame, useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";

const Char = () => {
  const [_, getKeys] = useKeyboardControls();
  const body = useRef();
  const { camera } = useThree();

  // --- Bobbing ---
  const walkTime = useRef(0);

  // --- Footstep sounds ---
  const foot1 = useRef(new Audio("/audio/foot1.ogg"));
  const foot2 = useRef(new Audio("/audio/foot2.ogg"));
  foot1.current.volume = 0.25; // 0 = silent, 1 = full volume
  foot2.current.volume = 0.25;
  const useFirstFoot = useRef(true);
  const stepTimer = useRef(0); // separate timer
  const stepInterval = 0.4; // seconds between steps

  //walking speed
  const velocity = 30;

  useFrame((state, delta) => {
    const { forward, backwards, left, right } = getKeys();
    const isMoving = forward || backwards || left || right;

    if (!body.current) return;

    const impulse = new THREE.Vector3();
    const impulseStrength = velocity * delta;

    // --- Movement direction based on camera ---
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

    // --- Camera position / bobbing ---
    const pos = body.current.translation();

    if (isMoving) walkTime.current += delta * 10;
    else walkTime.current = 0;

    const bobOffset = Math.sin(walkTime.current) * 0.05;
    camera.position.set(pos.x, pos.y + 0.8 + bobOffset, pos.z);

    // --- Footstep audio logic ---
    if (isMoving) {
      stepTimer.current -= delta;
      if (stepTimer.current <= 0) {
        const sound = useFirstFoot.current ? foot1.current : foot2.current;

        sound.playbackRate = 0.9 + Math.random() * 0.2;
        sound.currentTime = 0;
        sound.play();

        useFirstFoot.current = !useFirstFoot.current;
        stepTimer.current = stepInterval; // reset timer
      }
    } else {
      stepTimer.current = 0; // reset when not moving
    }
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
      position={[0, 3.5, 45]}
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
