import { Suspense } from "react";
import {
  OrbitControls,
  PointerLockControls,
  Environment,
} from "@react-three/drei";
import SacredGrove from "./SacredGrove";
import TemplOfTime from "./TemplOfTime";
import { Perf } from "r3f-perf";
import Char from "../Char/Char";
import { Physics, RigidBody } from "@react-three/rapier";
import Popup from "../Layout/Popup";

const Experience = () => {
  return (
    <>
      <Perf position='top-left' />
      {/* orbit controls for world editing */}
      {/* <OrbitControls /> */}
      <PointerLockControls />
      {/* <Popup /> */}
      <Physics gravity={[0, -30, 0]}>
        {/* <SacredGrove /> */}
        <TemplOfTime />

        <Char />
      </Physics>
      <Environment files='/hdri/dusk2k.exr' background={true} />
    </>
  );
};

export default Experience;
