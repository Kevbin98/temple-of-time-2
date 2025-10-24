import { PositionalAudio } from "@react-three/drei";
import { useRef } from "react";

function AmbientAudio() {
  const ref = useRef();
  return (
    <PositionalAudio
      ref={ref}
      url='/audio/forest.mp3'
      autoplay
      loop
      distance={10}
      volume={0.4}
    />
  );
}
