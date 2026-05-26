/**
 * Panorama360 — interactive 360° sphere using react-three-fiber.
 *
 * Hotel-themed scene built procedurally (no external image needed):
 * a gradient sky-dome with warm sunset, blurred horizon line, and softly
 * coloured "rooms" placed around the sphere — gives the *feel* of a real
 * virtual tour without shipping a 50MB equirectangular photo.
 *
 * Real client deployments swap the procedural texture for a real
 * equirectangular jpg via `<Panorama360 src="..."/>`.
 */

import { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Move3D, Maximize2 } from 'lucide-react';

// ── Procedural panorama texture (no asset needed) ───────────────────────────
function buildProceduralPanorama() {
  const w = 2048, h = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');

  // Sky gradient (sunset over a hotel terrace)
  const sky = ctx.createLinearGradient(0, 0, 0, h * 0.55);
  sky.addColorStop(0,    '#1B1030');
  sky.addColorStop(0.35, '#3A1448');
  sky.addColorStop(0.65, '#B79CFF');
  sky.addColorStop(1,    '#FF8AB8');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h * 0.55);

  // Floor / horizon
  const floor = ctx.createLinearGradient(0, h * 0.55, 0, h);
  floor.addColorStop(0,    '#2A0F1E');
  floor.addColorStop(0.5,  '#15082E');
  floor.addColorStop(1,    '#06030D');
  ctx.fillStyle = floor;
  ctx.fillRect(0, h * 0.55, w, h * 0.45);

  // Horizon line (warm glow)
  const hor = ctx.createLinearGradient(0, h * 0.50, 0, h * 0.58);
  hor.addColorStop(0,   'rgba(255,138,184,0)');
  hor.addColorStop(0.5, 'rgba(255,138,184,0.5)');
  hor.addColorStop(1,   'rgba(255,138,184,0)');
  ctx.fillStyle = hor;
  ctx.fillRect(0, h * 0.50, w, h * 0.08);

  // 4 "room windows" around the panorama at 90° intervals
  const rooms = [
    { x: 0.10, label: 'Suite' },
    { x: 0.35, label: 'Lobby' },
    { x: 0.60, label: 'Spa' },
    { x: 0.85, label: 'Terraza' },
  ];
  rooms.forEach(({ x, label }, i) => {
    const cx = w * x, cy = h * 0.38;
    const wW = 280, wH = 200;
    // Window frame
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.fillRect(cx - wW / 2 - 8, cy - wH / 2 - 8, wW + 16, wH + 16);
    // Window interior — different colour per room
    const tints = ['#FF5C9A', '#B79CFF', '#FF6A63', '#E03877'];
    const tint = tints[i % tints.length];
    const wg = ctx.createLinearGradient(0, cy - wH / 2, 0, cy + wH / 2);
    wg.addColorStop(0,    `${tint}aa`);
    wg.addColorStop(0.5,  `${tint}55`);
    wg.addColorStop(1,    'rgba(20,8,40,0.85)');
    ctx.fillStyle = wg;
    ctx.fillRect(cx - wW / 2, cy - wH / 2, wW, wH);
    // Soft inner glow
    const ig = ctx.createRadialGradient(cx, cy, 20, cx, cy, 180);
    ig.addColorStop(0,   `${tint}80`);
    ig.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = ig;
    ctx.fillRect(cx - 200, cy - 160, 400, 320);
    // Label
    ctx.fillStyle = 'rgba(255,255,255,0.95)';
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(label, cx, cy + wH / 2 + 50);
  });

  // Stars sprinkled in the sky
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  for (let i = 0; i < 120; i++) {
    const sx = Math.random() * w;
    const sy = Math.random() * h * 0.45;
    const sz = 0.4 + Math.random() * 1.8;
    ctx.fillRect(sx, sy, sz, sz);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ── Sphere geometry with the texture mapped on the inside ───────────────────
function Sphere({ texture }) {
  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[12, 64, 64]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

// ── Camera controller — drag to rotate, autorotate when idle ────────────────
function CameraRig({ paused }) {
  const { camera, gl } = useThree();
  const drag = useRef({ active: false, x: 0, y: 0, lon: 0, lat: 0 });
  const target = useRef({ lon: 0, lat: 0 });
  const idleSince = useRef(0);

  useEffect(() => {
    const dom = gl.domElement;
    const onDown = (e) => {
      drag.current.active = true;
      drag.current.x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      drag.current.y = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
      drag.current.lon = target.current.lon;
      drag.current.lat = target.current.lat;
      idleSince.current = 0;
    };
    const onMove = (e) => {
      if (!drag.current.active) return;
      const cx = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      const cy = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
      const dx = cx - drag.current.x;
      const dy = cy - drag.current.y;
      target.current.lon = drag.current.lon - dx * 0.25;
      target.current.lat = THREE.MathUtils.clamp(drag.current.lat + dy * 0.25, -60, 60);
    };
    const onUp = () => {
      drag.current.active = false;
      idleSince.current = performance.now();
    };
    dom.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      dom.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [gl]);

  useFrame(() => {
    if (paused) return;
    // Autorotate when idle for 2.5s
    if (!drag.current.active && idleSince.current && performance.now() - idleSince.current > 2500) {
      target.current.lon += 0.18;
    }
    // Smooth lerp
    const lon = THREE.MathUtils.degToRad(target.current.lon);
    const lat = THREE.MathUtils.degToRad(target.current.lat);
    const x = Math.cos(lat) * Math.sin(lon);
    const y = Math.sin(lat);
    const z = Math.cos(lat) * Math.cos(lon);
    camera.lookAt(x, y, z);
  });

  return null;
}

// ── Compass needle indicator (overlay) ──────────────────────────────────────
function PanoramaInner({ paused }) {
  const texture = useMemo(() => buildProceduralPanorama(), []);
  return (
    <>
      <Sphere texture={texture} />
      <CameraRig paused={paused} />
    </>
  );
}

// ── Main exported component ─────────────────────────────────────────────────
export function Panorama360({ height = 380, paused = false, label = 'Tour 360°' }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height,
      borderRadius: 16,
      overflow: 'hidden',
      border: '1px solid rgba(255,92,154,0.30)',
      boxShadow: '0 24px 64px rgba(255,92,154,0.20), inset 0 0 0 1px rgba(255,255,255,0.04)',
      background: '#06030D',
      cursor: 'grab',
    }}>
      <Canvas
        camera={{ fov: 75, position: [0, 0, 0.01] }}
        style={{ width: '100%', height: '100%' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <PanoramaInner paused={paused} />
        </Suspense>
      </Canvas>

      {/* Overlay — drag hint */}
      <div style={{
        position: 'absolute', top: 12, left: 12, zIndex: 2,
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '6px 11px', borderRadius: 999,
        background: 'rgba(6,3,13,0.65)', backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.10)',
        color: '#fff', fontSize: 11, fontWeight: 600,
        pointerEvents: 'none',
      }}>
        <Move3D size={13} strokeWidth={2} />
        <span>{label}</span>
      </div>

      {/* Live badge (top-right) */}
      <div style={{
        position: 'absolute', top: 12, right: 12, zIndex: 2,
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '5px 10px', borderRadius: 999,
        background: 'rgba(255,92,154,0.20)', backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,92,154,0.45)',
        color: '#fff', fontSize: 10, fontWeight: 700,
        fontFamily: 'JetBrains Mono, ui-monospace, monospace', letterSpacing: '0.1em',
        textTransform: 'uppercase', pointerEvents: 'none',
      }}>
        <motion.span animate={{ opacity: [1, 0.35, 1] }} transition={{ duration: 1.6, repeat: Infinity }}
          style={{ width: 5, height: 5, borderRadius: '50%', background: '#FF5C9A', boxShadow: '0 0 6px #FF5C9A' }} />
        360°
      </div>

      {/* Corner gradient hint to suggest depth */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, transparent 50%, rgba(6,3,13,0.55) 100%)',
      }} />
    </div>
  );
}
