import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";

const DustParticles = ({ count = 20000 }) => {
  const points = useRef();

  const texture = useLoader(THREE.TextureLoader, "/textures/dust.png");
  texture.encoding = THREE.sRGBEncoding;
  texture.transparent = true;
  texture.premultiplyAlpha = false;
  texture.needsUpdate = true;

  // Generate random positions once
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 150; // X spread
      arr[i * 3 + 1] = Math.random() * 150; // Y height
      arr[i * 3 + 2] = (Math.random() - 0.5) * 250; // Z spread
    }
    return arr;
  }, [count]);

  // Gentle floating animation
  useFrame((state, delta) => {
    const positions = points.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] -= delta * 0.2; // Slowly fall
      if (positions[i * 3 + 1] < 0) positions[i * 3 + 1] = 15; // Reset height
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points} position={[0, 0, -60]}>
      <bufferGeometry>
        <bufferAttribute
          attach='attributes-position'
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        color='#ffdca8'
        size={0.3}
        alphaTest={0.01}
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default DustParticles;
