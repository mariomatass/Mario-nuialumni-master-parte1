import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

function XrCone() {
  const coneRef = useRef();

  useFrame((state, delta) => {
    if (coneRef.current) {
      coneRef.current.rotation.y += delta;
    }
  });

  return (
    <>
      <OrbitControls />
      <ambientLight />
      <mesh ref={coneRef} position={[0, 0, -5]}>
        <coneGeometry args={[5, 20, 32]} />
        <meshStandardMaterial color="aqua" />
      </mesh>
    </>
  );
}

export default XrCone;
