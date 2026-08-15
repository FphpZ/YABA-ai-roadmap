'use client';

import { Canvas } from '@react-three/fiber';
import { Float, Line, OrbitControls, Stars } from '@react-three/drei';

const nodes: { position: [number, number, number]; color: string }[] = [
  { position: [-3.8, 1.7, -1], color: '#22c55e' },
  { position: [-1.2, 0.2, 0], color: '#38bdf8' },
  { position: [0.8, -1.4, 0.5], color: '#a78bfa' },
  { position: [2.8, 1.1, -0.6], color: '#f59e0b' },
  { position: [4.4, -0.6, -1.4], color: '#ec4899' },
];

const connections: [number, number, number][][] = [
  [
    [-3.8, 1.7, -1],
    [-1.2, 0.2, 0],
  ],
  [
    [-1.2, 0.2, 0],
    [0.8, -1.4, 0.5],
  ],
  [
    [0.8, -1.4, 0.5],
    [2.8, 1.1, -0.6],
  ],
  [
    [2.8, 1.1, -0.6],
    [4.4, -0.6, -1.4],
  ],
  [
    [-1.2, 0.2, 0],
    [2.8, 1.1, -0.6],
  ],
];

function Node({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.34, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2.2}
        roughness={0.2}
        metalness={0.4}
      />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 11], fov: 42 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.45} />
      <pointLight position={[12, 10, 8]} intensity={1.5} />

      <Stars
        radius={100}
        depth={50}
        count={4200}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      <Float speed={1.3} rotationIntensity={0.45} floatIntensity={1.1}>
        {nodes.map((node, index) => (
          <Node key={index} position={node.position} color={node.color} />
        ))}
      </Float>

      {connections.map((points, index) => (
        <Line
          key={index}
          points={points}
          color="#38bdf8"
          transparent
          opacity={0.35}
          lineWidth={1}
        />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.55}
      />
    </Canvas>
  );
}