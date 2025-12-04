"use client";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Html, Sphere } from "@react-three/drei";
import * as THREE from "three";

const sections = [
  { name: "About", id: "about", position: [4.5, 0.8, 1.2] },
  { name: "Skills", id: "skills", position: [-4, 1.8, 1.5] },
  { name: "Projects", id: "projects", position: [3, -3, 2] },
  { name: "Education", id: "education", position: [-3.5, -1.5, 1.2] },
  { name: "Contact", id: "contact", position: [2, 3.2, -0.8] },
];

function StarBackground() {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });
  
  return (
    <group ref={ref} rotation={[0, 0, Math.PI / 4]}>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </group>
  );
}

function ShootingStar({ onComplete }: { onComplete: () => void }) {
  const mesh = useRef<THREE.Mesh>(null);
  const [data] = useState(() => {
    const startX = (Math.random() - 0.5) * 100;
    const startY = (Math.random() - 0.5) * 100;
    const startZ = (Math.random() - 0.5) * 50;
    const start = new THREE.Vector3(startX, startY, startZ);
    
    const direction = new THREE.Vector3(
      (Math.random() - 0.5),
      (Math.random() - 0.5),
      (Math.random() - 0.5)
    ).normalize();
    
    return { start, direction };
  });
  
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.position.add(data.direction.clone().multiplyScalar(delta * 40));
      
      if (mesh.current.position.distanceTo(data.start) > 100) {
        onComplete();
      }
    }
  });
  
  useEffect(() => {
    if (mesh.current) {
      const target = mesh.current.position.clone().add(data.direction);
      mesh.current.lookAt(target);
    }
  }, [data.direction]);
  
  return (
    <mesh ref={mesh} position={data.start}>
      <boxGeometry args={[0.1, 0.1, 5]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
    </mesh>
  );
}

function ShootingStarController() {
  const [active, setActive] = useState(false);
  
  useEffect(() => {
    if (!active) {
      const delay = Math.random() * 3000 + 2000;
      const timeout = setTimeout(() => {
        setActive(true);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [active]);
  
  return active ? <ShootingStar onComplete={() => setActive(false)} /> : null;
}

function EarthScene() {
  const earthRef = useRef<THREE.Mesh>(null);
  const earthRotationGroupRef = useRef<THREE.Group>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const rotationSpeedRef = useRef(0.1);

  useEffect(() => {
    // No mouse interaction needed anymore
    return () => {};
  }, []);

  useFrame((state, delta) => {
    // ALWAYS spin the Earth rotation group
    if (earthRotationGroupRef.current) {
      earthRotationGroupRef.current.rotation.y += delta * rotationSpeedRef.current;
    }
    
    if (groupRef.current) {
      const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
      const scroll = typeof window !== 'undefined' ? window.scrollY : 0;
      
      // Define section boundaries (each section is 1 viewport height)
      const sections = {
        hero: { start: 0, end: windowHeight },
        about: { start: windowHeight, end: windowHeight * 2 },
        education: { start: windowHeight * 2, end: windowHeight * 3 },
        projects: { start: windowHeight * 3, end: windowHeight * 4 },
        skills: { start: windowHeight * 4, end: windowHeight * 5 },
        certificates: { start: windowHeight * 5, end: windowHeight * 6 },
        contact: { start: windowHeight * 6, end: windowHeight * 7 },
      };
      
      let targetY: number = 0;
      let targetX: number = 8;
      let targetZ: number = 0;
      let targetScale: number = 1;
      
      // Hero section - right side, half visible
      if (scroll < sections.about.start) {
        targetX = 8;
        targetY = 0;
        targetZ = 0;
        targetScale = 1;
      }
      // About section - bottom right
      else if (scroll < sections.education.start) {
        const progress = (scroll - sections.about.start) / windowHeight;
        targetX = 8 - 2 * progress; // Stay on right, move slightly left
        targetY = 0 - 6 * progress; // Move down
        targetZ = 0;
        targetScale = 1 + 0.3 * progress; // Grow slightly
      }
      // Education section - left side
      else if (scroll < sections.projects.start) {
        const progress = (scroll - sections.education.start) / windowHeight;
        targetX = 6 - 13 * progress; // Move from right to left
        targetY = -6 + 4 * progress; // Move up a bit
        targetZ = 0;
        targetScale = 1.3;
      }
      // Projects section - top right
      else if (scroll < sections.skills.start) {
        const progress = (scroll - sections.projects.start) / windowHeight;
        targetX = -7 + 13 * progress; // Move from left to right
        targetY = -2 + 7 * progress; // Move to top
        targetZ = 0;
        targetScale = 1.3 - 0.1 * progress;
      }
      // Skills section - right side middle
      else if (scroll < sections.certificates.start) {
        const progress = (scroll - sections.skills.start) / windowHeight;
        targetX = 6;
        targetY = 5 - 5 * progress; // Move to middle
        targetZ = 0;
        targetScale = 1.2;
      }
      // Certificates section - bottom left
      else if (scroll < sections.contact.start) {
        const progress = (scroll - sections.certificates.start) / windowHeight;
        targetX = 6 - 12 * progress; // Move to left
        targetY = 0 - 5 * progress; // Move down
        targetZ = 0;
        targetScale = 1.2 + 0.1 * progress;
      }
      // Contact section - center bottom
      else {
        const progress = Math.min((scroll - sections.contact.start) / windowHeight, 1);
        targetX = -6 + 6 * progress; // Move to center
        targetY = -5;
        targetZ = 0;
        targetScale = 1.3;
      }

      // Smooth transitions
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetY,
        0.05
      );
      
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        targetX,
        0.05
      );
      
      groupRef.current.position.z = THREE.MathUtils.lerp(
        groupRef.current.position.z,
        targetZ,
        0.05
      );
      
      groupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(
          groupRef.current.scale.x,
          targetScale,
          0.05
        )
      );
    }
  });

  const handleSectionClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <group ref={groupRef} position={[8, 0, 0]}>
      {/* Separate rotation group for auto-spin */}
      <group ref={earthRotationGroupRef}>
        {/* Main Earth with realistic appearance - BIGGER SIZE */}
        <Sphere ref={earthRef} args={[4, 128, 128]}>
          <meshStandardMaterial
            color="#1e3a8a"
            roughness={0.8}
            metalness={0.2}
          >
            <primitive 
              attach="map" 
              object={(() => {
                const canvas = document.createElement('canvas');
                canvas.width = 2048;
                canvas.height = 1024;
                const ctx = canvas.getContext('2d')!;
                
                // Ocean base
                ctx.fillStyle = '#0c4a6e';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Draw continents (simplified approximations)
                ctx.fillStyle = '#166534';
                
                // North America
                ctx.beginPath();
                ctx.ellipse(300, 350, 200, 180, 0.3, 0, Math.PI * 2);
                ctx.fill();
                
                // South America
                ctx.beginPath();
                ctx.ellipse(400, 650, 120, 200, 0, 0, Math.PI * 2);
                ctx.fill();
                
                // Europe
                ctx.beginPath();
                ctx.ellipse(1000, 300, 150, 100, 0, 0, Math.PI * 2);
                ctx.fill();
                
                // Africa
                ctx.beginPath();
                ctx.ellipse(1100, 550, 180, 250, 0.2, 0, Math.PI * 2);
                ctx.fill();
                
                // Asia
                ctx.beginPath();
                ctx.ellipse(1500, 350, 300, 200, 0, 0, Math.PI * 2);
                ctx.fill();
                
                // Australia
                ctx.beginPath();
                ctx.ellipse(1650, 750, 120, 100, 0, 0, Math.PI * 2);
                ctx.fill();
                
                // Antarctica
                ctx.fillRect(0, 900, canvas.width, 124);
                
                // Add some detail - mountains/forests (darker green)
                ctx.fillStyle = '#14532d';
                for (let i = 0; i < 100; i++) {
                  const x = Math.random() * canvas.width;
                  const y = Math.random() * canvas.height;
                  ctx.beginPath();
                  ctx.arc(x, y, Math.random() * 20 + 5, 0, Math.PI * 2);
                  ctx.fill();
                }
                
                // Ice caps
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, 80); // North pole
                
                // Clouds layer (semi-transparent)
                ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                for (let i = 0; i < 50; i++) {
                  const x = Math.random() * canvas.width;
                  const y = Math.random() * canvas.height;
                  ctx.beginPath();
                  ctx.ellipse(x, y, Math.random() * 60 + 30, Math.random() * 30 + 15, Math.random() * Math.PI, 0, Math.PI * 2);
                  ctx.fill();
                }
                
                const texture = new THREE.CanvasTexture(canvas);
                texture.needsUpdate = true;
                return texture;
              })()}
            />
          </meshStandardMaterial>
        </Sphere>
        
        {/* Atmosphere glow */}
        <Sphere args={[4.15, 64, 64]}>
          <meshBasicMaterial 
            color="#4299e1" 
            transparent 
            opacity={0.15}
            side={THREE.BackSide}
          />
        </Sphere>

        {/* Clouds layer (rotating separately) */}
        <Sphere args={[4.05, 64, 64]}>
          <meshStandardMaterial
            transparent
            opacity={0.4}
            color="#ffffff"
          >
            <primitive 
              attach="map" 
              object={(() => {
                const canvas = document.createElement('canvas');
                canvas.width = 1024;
                canvas.height = 512;
                const ctx = canvas.getContext('2d')!;
                
                ctx.fillStyle = 'rgba(0, 0, 0, 0)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                for (let i = 0; i < 40; i++) {
                  const x = Math.random() * canvas.width;
                  const y = Math.random() * canvas.height;
                  ctx.beginPath();
                  ctx.ellipse(x, y, Math.random() * 80 + 40, Math.random() * 40 + 20, Math.random() * Math.PI, 0, Math.PI * 2);
                  ctx.fill();
                }
                
                const texture = new THREE.CanvasTexture(canvas);
                texture.needsUpdate = true;
                return texture;
              })()}
            />
          </meshStandardMaterial>
        </Sphere>
      </group>

      {sections.map((section) => (
        <Html
          key={section.name}
          position={section.position as [number, number, number]}
          center
          distanceFactor={8}
        >
          <div
            className={`cursor-pointer px-4 py-2 rounded-full transition-all duration-300 backdrop-blur-md border whitespace-nowrap ${
              hovered === section.name
                ? "bg-purple-500/30 border-purple-300 text-white scale-110 shadow-[0_0_20px_rgba(102,126,234,0.6)]"
                : "bg-black/50 border-white/30 text-gray-300 hover:border-purple-400/50 hover:bg-purple-900/20"
            }`}
            onMouseEnter={() => setHovered(section.name)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleSectionClick(section.id)}
          >
            <span className="text-sm font-bold tracking-wider uppercase">
              {section.name}
            </span>
          </div>
        </Html>
      ))}

      {sections.map((section, i) => {
        const points = [
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(...section.position)
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        
        return (
          <primitive key={`line-${i}`} object={new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({ 
              color: 0x667eea, 
              transparent: true, 
              opacity: 0.2 
            })
          )} />
        );
      })}

      <pointLight position={[0, 0, 0]} intensity={1} color="#667eea" />
    </group>
  );
}

export default function StarField() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 50 }}
        className="pointer-events-auto"
      >
        <StarBackground />
        <ShootingStarController />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <EarthScene />
      </Canvas>
    </div>
  );
}