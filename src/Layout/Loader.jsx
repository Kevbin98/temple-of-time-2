import { Html, useProgress } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();
  console.log(progress);
  return (
    <Html center>
      <div
        style={{
          color: "white",
          fontSize: "1.5rem",
          fontFamily: "sans-serif",
        }}
      >
        {Math.floor(progress)}%
      </div>
    </Html>
  );
}
