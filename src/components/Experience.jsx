import React from "react";
import { OrbitControls, PointerLockControls } from "@react-three/drei";
import SacredGrove from "./SacredGrove";
import { Perf } from "r3f-perf";
import Char from "../Char/Char";
import { Physics, RigidBody } from "@react-three/rapier";

const Experience = () => {
  return (
    <>
      <Physics gravity={[0, -30, 0]}>
        <Perf position='top-left' />
        <SacredGrove />
        <PointerLockControls />
        <Char />
      </Physics>
    </>
  );
};

export default Experience;
