"use client";

import { useEffect, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const YELLOW = "#dba70c";
const YELLOW_DARK = "#b98208";
const RUBBER = "#171713";
const METAL = "#727168";

type ExcavatorProps = {
  progressRef: RefObject<number>;
};

function Track({ z }: { z: number }) {
  const wheelPositions = [-1.25, -0.63, 0, 0.63, 1.25];

  return (
    <group position={[0, 0, z]}>
      <RoundedBox args={[3.65, 0.64, 0.46]} radius={0.18} smoothness={4} castShadow>
        <meshStandardMaterial color={RUBBER} roughness={0.78} metalness={0.16} />
      </RoundedBox>
      {wheelPositions.map((x) => (
        <group key={x} position={[x, 0, z > 0 ? 0.245 : -0.245]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.24, 0.24, 0.06, 20]} />
            <meshStandardMaterial color="#393831" roughness={0.62} metalness={0.48} />
          </mesh>
          <mesh
            position={[0, 0, z > 0 ? 0.035 : -0.035]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.09, 0.09, 0.065, 16]} />
            <meshStandardMaterial color={YELLOW_DARK} roughness={0.55} metalness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Bucket() {
  return (
    <group>
      <mesh position={[0.28, -0.12, 0]} rotation={[0, 0, -0.36]} castShadow>
        <boxGeometry args={[0.72, 0.42, 0.92]} />
        <meshStandardMaterial color={YELLOW_DARK} roughness={0.52} metalness={0.36} />
      </mesh>
      <mesh position={[0.56, -0.4, 0]} rotation={[0, 0, -0.08]} castShadow>
        <boxGeometry args={[0.75, 0.11, 0.96]} />
        <meshStandardMaterial color={METAL} roughness={0.4} metalness={0.72} />
      </mesh>
      {[-0.34, -0.11, 0.11, 0.34].map((z) => (
        <mesh
          key={z}
          position={[0.94, -0.43, z]}
          rotation={[0, 0, -Math.PI / 2]}
          castShadow
        >
          <coneGeometry args={[0.065, 0.28, 4]} />
          <meshStandardMaterial color="#929188" roughness={0.38} metalness={0.78} />
        </mesh>
      ))}
    </group>
  );
}

function ExcavatorModel({ progressRef }: ExcavatorProps) {
  const machine = useRef<THREE.Group>(null);
  const upperBody = useRef<THREE.Group>(null);
  const boom = useRef<THREE.Group>(null);
  const stick = useRef<THREE.Group>(null);
  const bucket = useRef<THREE.Group>(null);
  const reduceMotion = useRef(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reduceMotion.current = media.matches;
    };

    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useFrame((_, delta) => {
    const rawProgress = reduceMotion.current ? 0.48 : progressRef.current;
    const progress = THREE.MathUtils.smootherstep(rawProgress, 0, 1);
    const firstHalf = THREE.MathUtils.smootherstep(Math.min(progress * 2, 1), 0, 1);
    const secondHalf = THREE.MathUtils.smootherstep(Math.max((progress - 0.5) * 2, 0), 0, 1);
    const damping = 1 - Math.pow(0.0008, delta);

    if (machine.current) {
      const targetRotation = THREE.MathUtils.lerp(-0.72, 0.92, progress);
      machine.current.rotation.y = THREE.MathUtils.lerp(
        machine.current.rotation.y,
        targetRotation,
        damping,
      );
      machine.current.position.x = THREE.MathUtils.lerp(-0.45, 0.15, progress);
    }
    if (upperBody.current) {
      upperBody.current.rotation.y = THREE.MathUtils.lerp(
        upperBody.current.rotation.y,
        THREE.MathUtils.lerp(-0.08, 0.44, secondHalf),
        damping,
      );
    }
    if (boom.current) {
      const lowered = THREE.MathUtils.lerp(0.64, 0.23, firstHalf);
      const lifted = THREE.MathUtils.lerp(lowered, 0.5, secondHalf);
      boom.current.rotation.z = THREE.MathUtils.lerp(boom.current.rotation.z, lifted, damping);
    }
    if (stick.current) {
      const extended = THREE.MathUtils.lerp(-0.7, -1.18, firstHalf);
      const retracted = THREE.MathUtils.lerp(extended, -0.78, secondHalf);
      stick.current.rotation.z = THREE.MathUtils.lerp(stick.current.rotation.z, retracted, damping);
    }
    if (bucket.current) {
      const scooped = THREE.MathUtils.lerp(-0.08, -0.78, firstHalf);
      const emptied = THREE.MathUtils.lerp(scooped, 0.18, secondHalf);
      bucket.current.rotation.z = THREE.MathUtils.lerp(bucket.current.rotation.z, emptied, damping);
    }
  });

  return (
    <group ref={machine} position={[-0.45, -0.62, 0]}>
      <group position={[0, 0.36, 0]}>
        <Track z={0.76} />
        <Track z={-0.76} />
      </group>

      <RoundedBox
        args={[3.05, 0.28, 1.65]}
        radius={0.08}
        smoothness={3}
        position={[0, 0.83, 0]}
        castShadow
      >
        <meshStandardMaterial color="#2b2a25" roughness={0.58} metalness={0.56} />
      </RoundedBox>

      <group ref={upperBody} position={[-0.3, 0.92, 0]}>
        <mesh position={[-0.6, 0.5, 0.18]} castShadow>
          <boxGeometry args={[1.65, 0.92, 1.42]} />
          <meshStandardMaterial color={YELLOW_DARK} roughness={0.52} metalness={0.26} />
        </mesh>

        <RoundedBox
          args={[1.1, 1.42, 1.2]}
          radius={0.08}
          smoothness={3}
          position={[0.72, 0.77, -0.04]}
          castShadow
        >
          <meshStandardMaterial color={YELLOW} roughness={0.48} metalness={0.22} />
        </RoundedBox>
        <mesh position={[0.76, 0.92, 0.575]}>
          <planeGeometry args={[0.76, 0.8]} />
          <meshStandardMaterial color="#66797a" roughness={0.2} metalness={0.62} />
        </mesh>
        <mesh position={[1.275, 0.92, -0.03]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.93, 0.8]} />
          <meshStandardMaterial color="#5e7274" roughness={0.2} metalness={0.58} />
        </mesh>
        <mesh position={[0.72, 1.51, -0.04]} castShadow>
          <boxGeometry args={[1.2, 0.12, 1.3]} />
          <meshStandardMaterial color="#25241f" roughness={0.54} metalness={0.58} />
        </mesh>

        <mesh position={[-1.02, 1.25, -0.35]} castShadow>
          <cylinderGeometry args={[0.075, 0.075, 0.78, 12]} />
          <meshStandardMaterial color="#3c3b35" roughness={0.44} metalness={0.68} />
        </mesh>

        <group ref={boom} position={[0.42, 1.2, 0.42]} rotation={[0, 0, 0.64]}>
          <RoundedBox
            args={[2.95, 0.36, 0.38]}
            radius={0.12}
            smoothness={4}
            position={[1.42, 0, 0]}
            castShadow
          >
            <meshStandardMaterial color={YELLOW} roughness={0.48} metalness={0.26} />
          </RoundedBox>
          <mesh position={[0.9, -0.22, -0.02]} rotation={[0, 0, -Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.07, 0.07, 1.7, 12]} />
            <meshStandardMaterial color="#b2b1a8" roughness={0.3} metalness={0.8} />
          </mesh>

          <group ref={stick} position={[2.75, 0, 0]} rotation={[0, 0, -0.7]}>
            <RoundedBox
              args={[2.35, 0.3, 0.32]}
              radius={0.1}
              smoothness={4}
              position={[1.12, 0, 0]}
              castShadow
            >
              <meshStandardMaterial color={YELLOW} roughness={0.48} metalness={0.26} />
            </RoundedBox>
            <mesh position={[0.92, 0.22, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[0.06, 0.06, 1.36, 12]} />
              <meshStandardMaterial color="#b2b1a8" roughness={0.3} metalness={0.8} />
            </mesh>

            <group ref={bucket} position={[2.18, 0, 0]} rotation={[0, 0, -0.08]}>
              <Bucket />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

function ResponsiveMachine({ progressRef }: ExcavatorProps) {
  const { size, viewport } = useThree();
  const isNarrowPhone = size.width < 360;
  const isPhone = size.width < 640;
  const minimumScale = isNarrowPhone ? 0.43 : isPhone ? 0.54 : 0.62;
  const scale = THREE.MathUtils.clamp(viewport.width / 9.8, minimumScale, 0.96);
  const horizontalOffset = isNarrowPhone ? -0.52 : isPhone ? -0.24 : 0;

  return (
    <group scale={scale} position={[horizontalOffset, -0.05, 0]}>
      <ExcavatorModel progressRef={progressRef} />
    </group>
  );
}

function Scene({ progressRef }: ExcavatorProps) {
  const rocks: [number, number, number, number][] = [
    [-3.2, -0.62, 1.6, 0.14],
    [-2.7, -0.62, -1.9, 0.09],
    [3.4, -0.62, 1.8, 0.12],
    [2.8, -0.62, -2.1, 0.08],
    [0.9, -0.62, 2.7, 0.1],
  ];

  return (
    <>
      <ambientLight intensity={0.72} />
      <hemisphereLight args={["#efe8d7", "#211f19", 1.1]} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={2.65}
        color="#fff0c5"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 3, -4]} intensity={0.85} color="#d8ddd5" />

      <ResponsiveMachine progressRef={progressRef} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.66, 0]} receiveShadow>
        <circleGeometry args={[8, 64]} />
        <meshStandardMaterial color="#24231e" roughness={0.98} />
      </mesh>
      <gridHelper args={[15, 18, "#696451", "#35332b"]} position={[0, -0.64, 0]} />

      {rocks.map(([x, y, z, scale]) => (
        <mesh key={`${x}-${z}`} position={[x, y, z]} scale={scale} castShadow>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#766e5b" roughness={1} />
        </mesh>
      ))}

      <fog attach="fog" args={["#191914", 9, 18]} />
    </>
  );
}

export default function Excavator3D({ progressRef }: ExcavatorProps) {
  return (
    <div className="h-full w-full" aria-label="Kaydırmayla hareket eden 3D ekskavatör" role="img">
      <Canvas
        camera={{ position: [6.2, 3.2, 6.8], fov: 39 }}
        dpr={[1, 1.45]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        shadows
      >
        <Scene progressRef={progressRef} />
      </Canvas>
    </div>
  );
}
