import * as React from 'react';
import { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { SKILL_CATEGORIES } from '../constants';

// ────────────────── Types ──────────────────

type LogoConfig = { slug: string; abbr: string };

// ────────────────── Color Config ──────────────────

const FACE_KEYS = ['right', 'left', 'top', 'bottom', 'front', 'back'] as const;

const FACE_COLORS: Record<string, string> = {
  right: '#EA4335',
  left: '#FBBC05',
  top: '#A142F4',
  bottom: '#F48FB1',
  front: '#4285F4',
  back: '#34A853',
};

const FACE_TO_CATEGORY: Record<string, number> = {
  front: 0, right: 1, back: 2, left: 3, top: 4, bottom: 5,
};

const BASE_COLOR = '#222222';

// ────────────────── Skill → Logo Mapping ──────────────────

const SKILL_LOGO: Record<string, LogoConfig> = {
  // Programming
  'C#': { slug: 'csharp', abbr: 'C#' },
  'C++': { slug: 'cplusplus', abbr: 'C++' },
  'Python': { slug: 'python', abbr: 'Py' },
  'JavaScript': { slug: 'javascript', abbr: 'JS' },
  'TypeScript': { slug: 'typescript', abbr: 'TS' },
  'SQL': { slug: 'postgresql', abbr: 'SQL' },
  // Frontend
  'React': { slug: 'react', abbr: 'Re' },
  'Vue.js': { slug: 'vuedotjs', abbr: 'Vue' },
  'HTML5': { slug: 'html5', abbr: 'H5' },
  'CSS3': { slug: 'css3', abbr: 'CSS' },
  'TailwindCSS': { slug: 'tailwindcss', abbr: 'TW' },
  'Bootstrap': { slug: 'bootstrap', abbr: 'BS' },
  // Backend
  'Node.js': { slug: 'nodedotjs', abbr: 'Node' },
  'ASP.NET Core': { slug: 'dotnet', abbr: '.NET' },
  'Django': { slug: 'django', abbr: 'Dj' },
  'REST API': { slug: 'fastapi', abbr: 'API' },
  'Microservices': { slug: 'kubernetes', abbr: 'μS' },
  // Database
  'SQL Server': { slug: 'microsoftsqlserver', abbr: 'MS' },
  'MySQL': { slug: 'mysql', abbr: 'My' },
  'PostgreSQL': { slug: 'postgresql', abbr: 'PG' },
  'Supabase': { slug: 'supabase', abbr: 'SB' },
  'MongoDB': { slug: 'mongodb', abbr: 'MDB' },
  'Firestore': { slug: 'firebase', abbr: 'FB' },
  // DevOps
  'Docker': { slug: 'docker', abbr: 'Dk' },
  'AWS': { slug: 'amazonaws', abbr: 'AWS' },
  'Azure': { slug: 'microsoftazure', abbr: 'Az' },
  'CI/CD': { slug: 'githubactions', abbr: 'CI' },
  'Git': { slug: 'git', abbr: 'Git' },
  'Nginx': { slug: 'nginx', abbr: 'Nx' },
  // Architecture
  'System Architecture': { slug: 'archlinux', abbr: 'SA' },
  'Requirement Analysis': { slug: 'readthedocs', abbr: 'RA' },
  'Scalability': { slug: 'scaleway', abbr: 'SC' },
  'UI/UX': { slug: 'figma', abbr: 'UX' },
  'Agile': { slug: 'jirasoftware', abbr: 'AG' },
};

// Center icon for each face category
const CENTER_ICON: Record<string, LogoConfig> = {
  front: { slug: 'codingninjas', abbr: '< >' },
  right: { slug: 'react', abbr: '◈' },
  back: { slug: 'nodedotjs', abbr: '⚙' },
  left: { slug: 'postgresql', abbr: '⬡' },
  top: { slug: 'docker', abbr: '☁' },
  bottom: { slug: 'figma', abbr: '△' },
};

// ────────────────── Logo Image Preloader ──────────────────

const logoImageCache = new Map<string, HTMLImageElement | null>();
let _preloadPromise: Promise<void> | null = null;

function preloadAllLogos(): Promise<void> {
  if (_preloadPromise) return _preloadPromise;

  const allSlugs = new Set<string>();
  for (const cfg of Object.values(SKILL_LOGO)) {
    if (cfg.slug) allSlugs.add(cfg.slug);
  }
  for (const cfg of Object.values(CENTER_ICON)) {
    if (cfg.slug) allSlugs.add(cfg.slug);
  }

  const promises = Array.from(allSlugs).map(slug =>
    new Promise<void>(resolve => {
      if (logoImageCache.has(slug)) { resolve(); return; }
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => { logoImageCache.set(slug, img); resolve(); };
      img.onerror = () => { logoImageCache.set(slug, null); resolve(); };
      img.src = `https://cdn.simpleicons.org/${slug}/white`;
    })
  );

  _preloadPromise = Promise.all(promises).then(() => { });
  return _preloadPromise;
}

// Start loading immediately on module evaluation
preloadAllLogos();

// ────────────────── Canvas Texture Generator ──────────────────

function createStickerTexture(
  color: string,
  logoSlug?: string,
  abbr?: string,
  isCenter = false
): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  // Base (gap color)
  ctx.fillStyle = BASE_COLOR;
  ctx.fillRect(0, 0, size, size);

  // Rounded sticker
  const pad = 24;
  const radius = 36;
  ctx.beginPath();
  ctx.roundRect(pad, pad, size - pad * 2, size - pad * 2, radius);
  ctx.fillStyle = color;
  ctx.fill();

  // Glossy highlight
  const hlGrad = ctx.createLinearGradient(pad, pad, size * 0.6, size * 0.6);
  hlGrad.addColorStop(0, 'rgba(255,255,255,0.25)');
  hlGrad.addColorStop(0.4, 'rgba(255,255,255,0.05)');
  hlGrad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.beginPath();
  ctx.roundRect(pad, pad, size - pad * 2, size - pad * 2, radius);
  ctx.fillStyle = hlGrad;
  ctx.fill();

  // Try to draw logo image
  const logoImg = logoSlug ? logoImageCache.get(logoSlug) : null;
  if (logoImg) {
    const iconSize = isCenter ? size * 0.5 : size * 0.45;
    const iconX = (size - iconSize) / 2;
    const iconY = (size - iconSize) / 2;
    ctx.drawImage(logoImg, iconX, iconY, iconSize, iconSize);
  } else if (abbr) {
    // Fallback: bold abbreviation
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 8;
    const fontSize = isCenter ? 120 : Math.min(100, 400 / Math.max(abbr.length, 1));
    ctx.font = `bold ${fontSize}px "Segoe UI", "SF Pro", Arial, sans-serif`;
    ctx.fillText(abbr, size / 2, size / 2, size - pad * 4);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function createBaseMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color: BASE_COLOR, roughness: 0.9, metalness: 0.1 });
}

// ────────────────── Cubie ──────────────────

interface CubieProps {
  position: [number, number, number];
  logosReady: boolean;
}

const Cubie = React.forwardRef<THREE.Group, CubieProps>(
  ({ position, logosReady, ...props }, ref) => {
    const [x, y, z] = position;

    const materials = useMemo(() => {
      const exposed: Record<string, boolean> = {
        right: x === 1, left: x === -1,
        top: y === 1, bottom: y === -1,
        front: z === 1, back: z === -1,
      };

      return FACE_KEYS.map(fk => {
        if (!exposed[fk]) return createBaseMaterial();

        const catIdx = FACE_TO_CATEGORY[fk];
        const category = SKILL_CATEGORIES[catIdx];

        const isCenter =
          (fk === 'right' && y === 0 && z === 0) ||
          (fk === 'left' && y === 0 && z === 0) ||
          (fk === 'top' && x === 0 && z === 0) ||
          (fk === 'bottom' && x === 0 && z === 0) ||
          (fk === 'front' && x === 0 && y === 0) ||
          (fk === 'back' && x === 0 && y === 0);

        let logoSlug: string | undefined;
        let abbr: string | undefined;

        if (isCenter) {
          const ci = CENTER_ICON[fk];
          logoSlug = ci?.slug;
          abbr = ci?.abbr;
        } else if (category) {
          // Map cubie to skill item
          let idx: number;
          if (fk === 'right' || fk === 'left') idx = (y + 1) * 3 + (z + 1);
          else if (fk === 'top' || fk === 'bottom') idx = (x + 1) * 3 + (z + 1);
          else idx = (x + 1) * 3 + (y + 1);
          const itemIdx = idx > 4 ? idx - 1 : idx;
          if (itemIdx < category.items.length) {
            const skillName = category.items[itemIdx];
            const cfg = SKILL_LOGO[skillName];
            logoSlug = cfg?.slug;
            abbr = cfg?.abbr || skillName.substring(0, 3);
          }
        }

        const texture = createStickerTexture(FACE_COLORS[fk], logoSlug, abbr, isCenter);
        return new THREE.MeshStandardMaterial({ map: texture, roughness: 0.3, metalness: 0.05 });
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [x, y, z, logosReady]);

    return (
      <group position={position} ref={ref} {...props}>
        <mesh material={materials}>
          <boxGeometry args={[0.95, 0.95, 0.95]} />
        </mesh>
      </group>
    );
  }
);

// ────────────────── RubiksCube ──────────────────

const RubiksCube = ({ logosReady }: { logosReady: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const pivotRef = useRef<THREE.Group>(null);
  const [isRotating, setIsRotating] = useState(false);

  const initialPositions = useMemo(() => {
    const pos: [number, number, number][] = [];
    for (let xi = -1; xi <= 1; xi++)
      for (let yi = -1; yi <= 1; yi++)
        for (let zi = -1; zi <= 1; zi++)
          pos.push([xi, yi, zi]);
    return pos;
  }, []);

  const animState = useRef({
    axis: new THREE.Vector3(0, 1, 0),
    currentRotation: 0,
    speed: 3,
    activeCubies: [] as THREE.Object3D[],
  });

  // Scramble on mount
  useEffect(() => {
    // Small delay to ensure children are mounted/ready
    const timer = setTimeout(() => {
      if (!groupRef.current) return;

      const axes = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)];

      // Perform 20 random moves instantly
      for (let i = 0; i < 20; i++) {
        const axisIdx = Math.floor(Math.random() * 3);
        const axis = axes[axisIdx];
        const sliceIdx = Math.floor(Math.random() * 3) - 1; // -1, 0, 1

        groupRef.current.children.forEach(child => {
          if (child === pivotRef.current) return;

          const p = child.position;
          const eps = 0.1;
          let inSlice = false;

          if (axisIdx === 0 && Math.abs(p.x - sliceIdx) < eps) inSlice = true;
          else if (axisIdx === 1 && Math.abs(p.y - sliceIdx) < eps) inSlice = true;
          else if (axisIdx === 2 && Math.abs(p.z - sliceIdx) < eps) inSlice = true;

          if (inSlice) {
            // Apply rotation around world axis
            child.position.applyAxisAngle(axis, Math.PI / 2);
            child.rotateOnWorldAxis(axis, Math.PI / 2);

            // Round to keep alignment
            child.position.set(Math.round(child.position.x), Math.round(child.position.y), Math.round(child.position.z));

            const e = new THREE.Euler().setFromQuaternion(child.quaternion);
            child.rotation.set(
              Math.round(e.x / (Math.PI / 2)) * (Math.PI / 2),
              Math.round(e.y / (Math.PI / 2)) * (Math.PI / 2),
              Math.round(e.z / (Math.PI / 2)) * (Math.PI / 2),
            );
            child.updateMatrix();
          }
        });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useFrame((_s, delta) => {
    if (groupRef.current && !isRotating) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x += delta * 0.04;
    }

    if (isRotating && pivotRef.current) {
      const a = animState.current;
      a.currentRotation += a.speed * delta;
      if (a.currentRotation >= Math.PI / 2) {
        a.currentRotation = Math.PI / 2;
        pivotRef.current.setRotationFromAxisAngle(a.axis, a.currentRotation);
        if (groupRef.current) {
          pivotRef.current.updateMatrixWorld();
          a.activeCubies.forEach(c => {
            groupRef.current!.attach(c);
            const e = new THREE.Euler().setFromQuaternion(c.quaternion);
            c.rotation.set(
              Math.round(e.x / (Math.PI / 2)) * (Math.PI / 2),
              Math.round(e.y / (Math.PI / 2)) * (Math.PI / 2),
              Math.round(e.z / (Math.PI / 2)) * (Math.PI / 2),
            );
            c.position.set(Math.round(c.position.x), Math.round(c.position.y), Math.round(c.position.z));
            c.updateMatrix();
          });
        }
        pivotRef.current.rotation.set(0, 0, 0);
        setIsRotating(false);
      } else {
        pivotRef.current.setRotationFromAxisAngle(a.axis, a.currentRotation);
      }
    } else if (!isRotating && Math.random() < 0.008) {
      triggerSlice();
    }
  });

  const triggerSlice = () => {
    if (!groupRef.current || !pivotRef.current) return;
    const axisIdx = Math.floor(Math.random() * 3);
    const axes = [new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 1)];
    const sliceIdx = Math.floor(Math.random() * 3) - 1;
    const eps = 0.15;
    const active: THREE.Object3D[] = [];
    groupRef.current.children.forEach(child => {
      if (child === pivotRef.current) return;
      const p = child.position;
      if (
        (axisIdx === 0 && Math.abs(p.x - sliceIdx) < eps) ||
        (axisIdx === 1 && Math.abs(p.y - sliceIdx) < eps) ||
        (axisIdx === 2 && Math.abs(p.z - sliceIdx) < eps)
      ) active.push(child);
    });
    if (active.length === 0) return;
    animState.current = { axis: axes[axisIdx], currentRotation: 0, speed: 3.5, activeCubies: active };
    pivotRef.current.rotation.set(0, 0, 0);
    pivotRef.current.position.set(0, 0, 0);
    active.forEach(c => pivotRef.current!.attach(c));
    setIsRotating(true);
  };

  return (
    <group ref={groupRef} scale={0.95}>
      <group ref={pivotRef} />
      {initialPositions.map((pos, i) => (
        <Cubie key={i} position={pos} logosReady={logosReady} />
      ))}
    </group>
  );
};

// ────────────────── Main Export ──────────────────

const TechCube: React.FC = () => {
  const [logosReady, setLogosReady] = useState(false);

  useEffect(() => {
    preloadAllLogos().then(() => setLogosReady(true));
  }, []);

  return (
    <div className="flex items-center justify-end h-[450px] w-full md:w-[80%] ml-auto cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [4.5, 3.5, 4.5], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[6, 10, 6]} intensity={1.8} />
          <directionalLight position={[-4, -2, 5]} intensity={0.5} />
          <RubiksCube logosReady={logosReady} />
          <OrbitControls enableZoom={false} enablePan={false} dampingFactor={0.12} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default TechCube;
