import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber"; // render empty canvas
import { OrbitControls, Preload, useGLTF } from "@react-three/drei"; // controls of model
import CanvasLoader from "../Loader";

const Computers = ({isMobile}) => {
  const computer = useGLTF("./desktop_pc/scene.gltf"); // used to import 3D model/objects
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />{" "}
      {/* adds light  */}
      <pointLight intensity={1} /> {/* Add point light */}
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
        />
      <primitive 
      object={computer.scene} 
      scale={isMobile ? 0.7 : 0.75}
      position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
      rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(()=>{
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  },[]);

  return (
    <Canvas
      frameloop="demand"
      shadows /* enables shadow */
      camera={{ position: [20, 3, 5], fov: 25 }} /* camera positions */
      gl={{preserveDrawingBuffer: true}}
    >
      <Suspense fallback={<CanvasLoader/>}>
        <OrbitControls 
        enableZoom={false}  /* enables scene/models want  to be zoom*/
        maxPolarAngle={Math.PI / 2} /* enables rotate only horizonataly */
        minPolarAngle={Math.PI / 2} /* enables rotate only horizonataly */
        />
        <Computers isMobile={isMobile}/>
        <Preload all/>
      </Suspense>
    </Canvas>
  );
};

export default ComputersCanvas;
