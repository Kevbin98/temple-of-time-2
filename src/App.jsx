import { useState } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import { Environment } from "@react-three/drei";

function App() {
  return (
    <>
      <Canvas>
        <Experience />
        <Environment files='/hdri/nightsky.exr' background={true} />
      </Canvas>
    </>
  );
}

export default App;
