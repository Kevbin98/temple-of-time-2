import { useLoader } from "@react-three/fiber";
// import { useGltf } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const SacredGrove = () => {
  const model = useLoader(
    GLTFLoader,
    "/Models/sacredgrovedraco.glb",
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("/draco/"); // Path to decoder files
      loader.setDRACOLoader(dracoLoader);
    }
  );
  console.log(model);

  return (
    <>
      <primitive object={model.scene} />
    </>
  );
};

export default SacredGrove;
