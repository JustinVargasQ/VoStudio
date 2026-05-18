import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Icosahedron, Sphere, Torus } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import { VO, VO_LIGHT, PURPLE, CYAN, PINK, GREEN } from '../data/content';

function Blob({ mouse }) {
  const mesh = useRef(null);
  const wire = useRef(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.18;
    mesh.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    if (wire.current) {
      wire.current.rotation.y = -t * 0.12;
      wire.current.rotation.z = t * 0.06;
    }
    const tx = (mouse.current.x ?? 0) * 0.4;
    const ty = (mouse.current.y ?? 0) * 0.4;
    mesh.current.position.x += (tx - mesh.current.position.x) * 0.05;
    mesh.current.position.y += (-ty - mesh.current.position.y) * 0.05;
  });

  return (
    <group>
      <Sphere ref={mesh} args={[1.4, 96, 96]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color={VO}
          attach="material"
          distort={0.45}
          speed={2.2}
          roughness={0.15}
          metalness={0.55}
          emissive={VO}
          emissiveIntensity={0.18}
        />
      </Sphere>
      <Icosahedron ref={wire} args={[1.9, 2]} position={[0, 0, 0]}>
        <meshBasicMaterial color={VO_LIGHT} wireframe transparent opacity={0.18} />
      </Icosahedron>
    </group>
  );
}

function FloatingShapes() {
  return (
    <>
      {/* Naranja - torus arriba derecha */}
      <Float speed={1.4} rotationIntensity={1.2} floatIntensity={1.6}>
        <Torus args={[0.32, 0.09, 16, 64]} position={[2.6, 1.4, -1]}>
          <meshStandardMaterial color={VO} metalness={0.85} roughness={0.2} emissive={VO} emissiveIntensity={0.45} />
        </Torus>
      </Float>
      {/* Cyan - icosahedron abajo izquierda */}
      <Float speed={1.0} rotationIntensity={1.8} floatIntensity={1.2}>
        <Icosahedron args={[0.32, 0]} position={[-2.7, -1.2, -0.5]}>
          <meshStandardMaterial color={CYAN} metalness={0.9} roughness={0.15} emissive={CYAN} emissiveIntensity={0.35} />
        </Icosahedron>
      </Float>
      {/* Verde - octahedron abajo derecha */}
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={2}>
        <mesh position={[2, -1.5, 0.5]}>
          <octahedronGeometry args={[0.24, 0]} />
          <meshStandardMaterial color={GREEN} metalness={0.8} roughness={0.2} emissive={GREEN} emissiveIntensity={0.4} />
        </mesh>
      </Float>
      {/* Púrpura - tetrahedron arriba izquierda */}
      <Float speed={1.2} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[-2.3, 1.4, 0.5]}>
          <tetrahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color={PURPLE} metalness={0.85} roughness={0.2} emissive={PURPLE} emissiveIntensity={0.5} />
        </mesh>
      </Float>
      {/* Rosa - sphere pequeña centro derecha */}
      <Float speed={1.6} rotationIntensity={1.5} floatIntensity={1.8}>
        <mesh position={[3.2, 0.3, -1.2]}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshStandardMaterial color={PINK} metalness={0.9} roughness={0.1} emissive={PINK} emissiveIntensity={0.55} />
        </mesh>
      </Float>
      {/* Naranja wireframe - cono centro izquierda */}
      <Float speed={1.3} rotationIntensity={1} floatIntensity={1.4}>
        <mesh position={[-3, 0.2, -0.8]}>
          <coneGeometry args={[0.22, 0.5, 16]} />
          <meshBasicMaterial color={VO} wireframe />
        </mesh>
      </Float>
    </>
  );
}

function SceneInner({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.45} />
      <pointLight position={[6, 6, 6]} intensity={2.4} color={VO_LIGHT} />
      <pointLight position={[-6, -4, -3]} intensity={1.6} color={PURPLE} />
      <pointLight position={[3, -3, 4]} intensity={1.2} color={CYAN} />
      <directionalLight position={[0, 5, 5]} intensity={0.6} />
      <Blob mouse={mouse} />
      <FloatingShapes />
    </>
  );
}

export function HeroScene({ mouse }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <SceneInner mouse={mouse} />
      </Suspense>
    </Canvas>
  );
}
