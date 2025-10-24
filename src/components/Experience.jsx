import React from "react";
import { OrbitControls } from "@react-three/drei";
import SacredGrove from "./SacredGrove";
import { Perf } from "r3f-perf";
import Char from "../Char/Char";
import { Physics, RigidBody } from "@react-three/rapier";

const Experience = () => {
  return (
    <>
      <Physics>
        <Perf position='top-left' />
        <SacredGrove />
        <OrbitControls />
        <Char />
      </Physics>
    </>
  );
};

export default Experience;
