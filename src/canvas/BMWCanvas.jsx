import React, { Suspense, useEffect, useState, forwardRef, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CanvasLoader from '../components/ui/CanvasLoader';
import { FaCarOn, FaStarHalfStroke } from 'react-icons/fa6';
import { MdStart } from 'react-icons/md';
const BMWModel = ({ isMobile }) => {
  const bmw = useGLTF('/bmwcruz/scene.gltf');
  const bmwRef = useRef();

  // Rotate the car slowly
  useFrame(() => {
    if (bmwRef.current) {
      bmwRef.current.rotation.y += 0.005; // Smooth rotation
    }
  });

  return (
    <mesh>
      <ambientLight intensity={0.7} />
      <hemisphereLight intensity={0.4} groundColor="black" />
      <spotLight
        position={[-15, 40, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1.8}
        castShadow
        shadow-mapSize={512}
      />
      <pointLight position={[-15, 10, 10]} intensity={3} />
      <directionalLight
        position={[0, 20, 0]}
        intensity={1.5}
        castShadow
        shadow-mapSize={51}
      />
      <primitive
        ref={bmwRef}
        object={bmw.scene}
        scale={isMobile ? 0.3 : 1} // Increased scale for larger view
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      />
    </mesh>
  );
};

const BMWCanvas = forwardRef((_, ref) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showTooltip, setShowTooltip] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const controlsRef = useRef();
  const navigate = useNavigate();
  const audioRef = useRef(new Audio(`/sounds/engine.mp3`));

  // Detect mobile device
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);
    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Handle loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 100); // Adjust based on actual loading
    return () => clearTimeout(timer);
  }, []);

  // Handle WebGL context loss
  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('webglcontextlost', (e) => {
        console.warn('WebGL context lost. Reloading...');
        setError('WebGL context lost. Please refresh the page.');
      });
    }
  }, []);

  // Initial camera position
  const initialCameraPosition = new THREE.Vector3(0, 2, 5);

  // Smooth camera reset animation
  const resetCamera = () => {
    if (controlsRef.current) {
      const duration = 2;
      const startPosition = controlsRef.current.object.position.clone();
      const targetPosition = initialCameraPosition.clone();
      const startTarget = controlsRef.current.target.clone();
      const targetTarget = new THREE.Vector3(0, 0, 0);
      let startTime = null;

      const animate = (time) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / (duration * 1000), 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);

        controlsRef.current.object.position.lerpVectors(
          startPosition,
          targetPosition,
          easeProgress
        );
        controlsRef.current.target.lerpVectors(
          startTarget,
          targetTarget,
          easeProgress
        );
        controlsRef.current.update();

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          audioRef.current.play().catch((err) => console.error('Audio error:', err));
        }
      };

      audioRef.current.currentTime = 0;
      audioRef.current.pause();
      requestAnimationFrame(animate);
    }
  };

  // Fullscreen animation and navigation
  const toggleFullScreenAndNavigate = () => {
    resetCamera();
    setTimeout(() => {
      if (controlsRef.current) {
        controlsRef.current.enabled = false;
        const duration = 1.5;
        const initialPosition = controlsRef.current.object.position.clone();
        const targetPosition = new THREE.Vector3(3, 1, 3);
        const initialTarget = controlsRef.current.target.clone();
        const targetTarget = new THREE.Vector3(0, 0, 0);
        let startTime = null;

        const animate = (time) => {
          if (!startTime) startTime = time;
          const progress = Math.min((time - startTime) / (duration * 1000), 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3);

          controlsRef.current.object.position.lerpVectors(
            initialPosition,
            targetPosition,
            easeProgress
          );
          controlsRef.current.target.lerpVectors(
            initialTarget,
            targetTarget,
            easeProgress
          );
          controlsRef.current.update();

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setTimeout(() => navigate('/home'), 500);
          }
        };
        requestAnimationFrame(animate);
      }
    }, 2500);
  };

  // Button animation variants
  const buttonVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 5, transition: { duration: 0.2 } },
    tap: { scale: 0.9, transition: { duration: 0.1 } },
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-gray-100 text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px]">
      {isLoading && <CanvasLoader />}
      <Canvas
        style={{ display: isLoading ? 'none' : 'block' }}
        frameloop="demand"
        shadows
        dpr={[1, 1.5]}
        camera={{ position: initialCameraPosition.toArray(), fov: 25 }} // Reduced fov for zoomed-in view
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={null}>
          <OrbitControls
            ref={(node) => {
              controlsRef.current = node;
              if (ref) ref.current = node;
            }}
            enableZoom={true}
            enableRotate={true}
            enablePan={true}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            minDistance={3}
            maxDistance={10}
          />
          <BMWModel isMobile={isMobile} />
          <Preload all />
        </Suspense>
      </Canvas>

      {/* Buttons */}
      <div className="absolute bottom-5 right-5 flex flex-col items-end gap-3">
        <motion.button
          className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 focus:outline-none"
          onClick={toggleFullScreenAndNavigate}
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          onMouseEnter={() => setShowTooltip('Fullscreen')}
          onMouseLeave={() => setShowTooltip(null)}
        >
          ⛶
          <AnimatePresence>
            {showTooltip === 'Fullscreen' && (
              <motion.div
                className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-md shadow-md"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.2 } }}
                exit={{ opacity: 0, x: 10, transition: { duration: 0.2 } }}
              >
                Enter Fullscreen
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <motion.button
          className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 focus:outline-none"
          onClick={resetCamera}
          variants={buttonVariants}
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          onMouseEnter={() => setShowTooltip('Reset')}
          onMouseLeave={() => setShowTooltip(null)}
        >
        <FaCarOn/>
          <AnimatePresence>
            {showTooltip === 'Reset' && (
              <motion.div
                className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-md shadow-md"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.2 } }}
                exit={{ opacity: 0, x: 10, transition: { duration: 0.2 } }}
              >
                Start Engine
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
});

export default BMWCanvas;