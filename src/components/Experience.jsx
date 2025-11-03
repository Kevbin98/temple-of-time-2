import { Suspense } from "react";
import { OrbitControls, PointerLockControls } from "@react-three/drei";
import SacredGrove from "./SacredGrove";
import TemplOfTime from "./TemplOfTime";
import { Perf } from "r3f-perf";
import Char from "../Char/Char";
import { Physics, RigidBody } from "@react-three/rapier";
import LoadingScreen from "../Layout/LoadingScreen";

const Experience = () => {
  return (
    <>
      <Physics gravity={[0, -30, 0]}>
        <Perf position='top-left' />
        {/* <SacredGrove /> */}

        <TemplOfTime />

        <PointerLockControls />
        <Char />

        {/* orbit controls for world editing */}
        {/* <OrbitControls /> */}
      </Physics>
    </>
  );
};

export default Experience;
