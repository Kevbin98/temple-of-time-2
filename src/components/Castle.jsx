import React from "react";
import { useGLTF } from "@react-three/drei";

const Castle = () => {
  const model = useGLTF(
    "https://modelviewer.dev/shared-assets/models/Astronaut.glb"
  );

  return (
    <>
      <primitive object={model.scene} />
    </>
  );
};

export default Castle;
