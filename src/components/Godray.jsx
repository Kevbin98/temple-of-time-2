import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Godray({
  uColor = "white",
  top = 0.2,
  bottom = 1.0,
  height = 5,
  opacity = 0.1,
  noise = 5,
  glow = "black",
  ...props
}) {
  const ref = useRef();

  useFrame((_, delta) => {
    // optional subtle shimmer
    ref.current.material.uniforms.uTime.value += delta;
  });

  return (
    <mesh ref={ref} {...props}>
      <cylinderGeometry args={[top, bottom, height, 64, 1, true]} />
      <shaderMaterial
        // transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
        wireframe={false}
        uniforms={{
          uColor: { value: new THREE.Color(uColor) },
          uTime: { value: 0 },
          uOpacity: { value: opacity },
          uNoise: { value: noise },
          uGlow: { value: new THREE.Color(glow) },
        }}
        vertexShader={
          /* glsl */ `
          varying vec2 vUv;
          uniform float uTime;
          void main() {

            vUv = uv;


              vec3 pos = position;
                // pos.x += sin(uTime + position.y * 5.0) * 0.02;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `
        }
        fragmentShader={
          /* glsl */ `
          uniform vec3 uColor;
          uniform float uOpacity;
          uniform float uNoise;
          uniform float uTime;
          uniform vec3 uGlow;
          varying vec2 vUv;

          float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
          }

          void main() {
            float noise = random(vUv * uNoise);
          
            float gradient = smoothstep(0.0, 0.4, vUv.y) * (1.0 - smoothstep(0.0, 1.0, vUv.y));
            gradient = pow(gradient, 1.2); // adjust softness curve if needed

          // Radial edge fade (for round beam falloff)
            float edge = smoothstep(0.0, 0.25, vUv.x) * (1.0 - smoothstep(0.75, 1.0, vUv.x));

            vec3 color = (uColor + uGlow) * gradient * edge;
            gl_FragColor = vec4(color, gradient * edge * uOpacity);
          }
        `
        }
      />
    </mesh>
  );
}
