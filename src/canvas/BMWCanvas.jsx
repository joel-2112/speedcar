import React, { Suspense, useEffect, useState, forwardRef, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CanvasLoader from '../components/ui/CanvasLoader';
import { FaCarOn, FaList } from 'react-icons/fa6';

const BMWModel = ({ isMobile }) => {
  const bmw = useGLTF('/bmwcruz/scene.gltf');
  const bmwRef = useRef();

  useFrame(() => {
    if (bmwRef.current) {
      bmwRef.current.rotation.y += 0.005;
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
        scale={isMobile ? 0.2 : 0.4}
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
  const audioRef = useRef(new Audio(`/sounds/lambergini.mp3`));

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);
    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('webglcontextlost', (e) => {
        console.warn('WebGL context lost. Reloading...');
        setError('WebGL context lost. Please refresh the page.');
      });
    }
  }, []);

  const initialCameraPosition = new THREE.Vector3(0, 2, 5);

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
            setTimeout(() => navigate('/car-detail'), 500);
          }
        };
        requestAnimationFrame(animate);
      }
    }, 2500);
  };

  const buttonVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { scale: 1.1, rotate: 5, transition: { duration: 0.2 } },
    tap: { scale: 0.9, transition: { duration: 0.1 } },
  };

  if (error) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-gray-100 text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen top-20">
      {isLoading && <CanvasLoader />}
      <Canvas
        style={{ display: isLoading ? 'none' : 'block' }}
        frameloop="demand"
        shadows
        dpr={[1, 1.5]}
        camera={{ position: initialCameraPosition.toArray(), fov: 25 }}
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
            minDistance={2}
            maxDistance={10}
          />
          <BMWModel isMobile={isMobile} />
          <Preload all />
        </Suspense>
      </Canvas>

      {/* Indigo Overlay with slide-in */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0, transition: { duration: 1, ease: 'easeOut' } }}
        className="absolute top-0 left-0 w-1/2 h-full bg-indigo-900 bg-opacity-30 pointer-events-none flex items-center justify-between p-10"
      >
        {/* Left intro text */}
        <div className="max-w-md pointer-events-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1, duration: 1 } }}
            className="text-white text-5xl font-extrabold mb-4 leading-tight"
          >
            Discover <span className="text-indigo-400">Luxury</span><br />
            with BMW
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 1.5, duration: 1 } }}
            className="text-indigo-100 text-lg mb-6"
          >
            Experience the ultimate driving machine in 3D. Rotate, explore, and enjoy every curve.
          </motion.p>
          <motion.button
            onClick={toggleFullScreenAndNavigate}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 2, duration: 1 } }}
          >
            Explore Luxury
          </motion.button>
        </div>

        {/* Right side empty to let car show clearly */}
        <div></div>
      </motion.div>

      {/* Overlay Buttons */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute bottom-[5%] right-[20%] flex flex-col items-end gap-4 pointer-events-auto">
          <motion.button
            className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-700 focus:outline-none relative"
            onClick={toggleFullScreenAndNavigate}
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onMouseEnter={() => setShowTooltip('Fullscreen')}
            onMouseLeave={() => setShowTooltip(null)}
          >
          <FaList/>
            <AnimatePresence>
              {showTooltip === 'Fullscreen' && (
                <motion.div
                  className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-md shadow-md"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 0.2 } }}
                  exit={{ opacity: 0, x: 10, transition: { duration: 0.2 } }}
                >
                  All Cars
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
            className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 focus:outline-none relative"
            onClick={resetCamera}
            variants={buttonVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            onMouseEnter={() => setShowTooltip('Reset')}
            onMouseLeave={() => setShowTooltip(null)}
          >
            <FaCarOn />
            <AnimatePresence>
              {showTooltip === 'Reset' && (
                <motion.div
                  className="absolute right-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-md shadow-md"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 0.2 } }}
                  exit={{ opacity: 0, x: 10, transition: { duration: 0.2 } }}
                >
                  Engine Start
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </div>
  );
});

export default BMWCanvas;
