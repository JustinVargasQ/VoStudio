/**
 * Panorama360 — interactive multi-scene 360° tour with clickable hotspots.
 *
 * Each "scene" is a procedurally generated equirectangular texture that
 * resembles a real hotel space (lobby, suite, spa, terrace). Hotspots are
 * positioned in spherical coordinates (lon/lat in degrees) and:
 *   - Show an info overlay on hover (name + description)
 *   - Navigate to another scene on click
 *   - Show a small label indicator above each hotspot dot
 *
 * Real client deployments swap `buildSceneTexture(sceneKey)` for an
 * equirectangular photo loaded with THREE.TextureLoader. The hotspot system
 * and navigation work the same way.
 */

import { useRef, useState, useEffect, Suspense, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Move3D, ArrowLeft, MapPin, Info, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

// ════════════════════════════════════════════════════════════════════════════
// SCENE TEXTURES — each builds a 2048×1024 equirectangular canvas that wraps
// around the sphere to look like a real-ish hotel interior.
// ════════════════════════════════════════════════════════════════════════════

const W = 2048, H = 1024;
const HORIZON = H * 0.55;

// Helper — sky/wall gradient
function paintSky(ctx, stops) {
  const g = ctx.createLinearGradient(0, 0, 0, HORIZON);
  stops.forEach(([offset, color]) => g.addColorStop(offset, color));
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, HORIZON);
}
function paintFloor(ctx, stops) {
  const g = ctx.createLinearGradient(0, HORIZON, 0, H);
  stops.forEach(([offset, color]) => g.addColorStop(offset, color));
  ctx.fillStyle = g;
  ctx.fillRect(0, HORIZON, W, H - HORIZON);
}
function paintHorizonGlow(ctx, color) {
  const g = ctx.createLinearGradient(0, HORIZON - 30, 0, HORIZON + 40);
  g.addColorStop(0,   'rgba(0,0,0,0)');
  g.addColorStop(0.5, color);
  g.addColorStop(1,   'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, HORIZON - 30, W, 70);
}

// Helper — draw a "window" with view through it
function paintWindow(ctx, cx, cy, w, h, viewColor) {
  // Frame
  ctx.fillStyle = 'rgba(0,0,0,0.55)';
  ctx.fillRect(cx - w / 2 - 14, cy - h / 2 - 14, w + 28, h + 28);
  // View through window
  const vg = ctx.createLinearGradient(0, cy - h / 2, 0, cy + h / 2);
  vg.addColorStop(0,   viewColor.top);
  vg.addColorStop(0.5, viewColor.mid);
  vg.addColorStop(1,   viewColor.bot);
  ctx.fillStyle = vg;
  ctx.fillRect(cx - w / 2, cy - h / 2, w, h);
  // Cross frame
  ctx.strokeStyle = 'rgba(0,0,0,0.65)';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cx, cy - h / 2); ctx.lineTo(cx, cy + h / 2);
  ctx.moveTo(cx - w / 2, cy); ctx.lineTo(cx + w / 2, cy);
  ctx.stroke();
  // Inner glow
  const ig = ctx.createRadialGradient(cx, cy, 10, cx, cy, w * 0.6);
  ig.addColorStop(0,   'rgba(255,255,255,0.20)');
  ig.addColorStop(1,   'rgba(0,0,0,0)');
  ctx.fillStyle = ig;
  ctx.fillRect(cx - w * 0.6, cy - h * 0.6, w * 1.2, h * 1.2);
}

// Helper — soft furniture silhouette
function paintFurniture(ctx, cx, cy, w, h, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(cx - w / 2, cy - h / 2, w, h, 12);
  ctx.fill();
  // Highlight on top
  const hg = ctx.createLinearGradient(cx, cy - h / 2, cx, cy + h / 2);
  hg.addColorStop(0,   'rgba(255,255,255,0.18)');
  hg.addColorStop(1,   'rgba(0,0,0,0.25)');
  ctx.fillStyle = hg;
  ctx.beginPath();
  ctx.roundRect(cx - w / 2, cy - h / 2, w, h, 12);
  ctx.fill();
}

// Helper — wall lamp / sconce
function paintLamp(ctx, cx, cy, color) {
  // Halo
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 110);
  g.addColorStop(0,   `${color}cc`);
  g.addColorStop(0.4, `${color}55`);
  g.addColorStop(1,   'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(cx, cy, 110, 0, Math.PI * 2);
  ctx.fill();
  // Lamp body
  ctx.fillStyle = '#FFE5A0';
  ctx.beginPath();
  ctx.arc(cx, cy, 8, 0, Math.PI * 2);
  ctx.fill();
}

// Helper — vertical pillar
function paintPillar(ctx, cx, color) {
  const g = ctx.createLinearGradient(cx - 30, 0, cx + 30, 0);
  g.addColorStop(0,   `${color}66`);
  g.addColorStop(0.5, color);
  g.addColorStop(1,   `${color}33`);
  ctx.fillStyle = g;
  ctx.fillRect(cx - 28, 60, 56, H - 120);
}

// Helper — label below a feature
function paintLabel(ctx, cx, cy, text, color = 'rgba(255,255,255,0.95)') {
  ctx.fillStyle = color;
  ctx.font = 'bold 22px ui-sans-serif, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.shadowColor = 'rgba(0,0,0,0.65)';
  ctx.shadowBlur = 6;
  ctx.fillText(text, cx, cy);
  ctx.shadowBlur = 0;
}

// ─── Scene: LOBBY ──────────────────────────────────────────────────────────
function buildLobby() {
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  // Warm marble walls
  paintSky(ctx, [[0,'#2A1830'], [0.4,'#3A2050'], [0.8,'#5A3050'], [1,'#7A3F4F']]);
  paintFloor(ctx, [[0,'#3A1F2F'], [0.4,'#22101A'], [1,'#0A0510']]);
  paintHorizonGlow(ctx, 'rgba(255,138,184,0.55)');
  // Reception desk (long counter front)
  paintFurniture(ctx, W * 0.50, H * 0.66, 700, 130, '#4A1F35');
  paintLabel(ctx, W * 0.50, H * 0.66 + 6, 'RECEPCIÓN', '#FFD4E5');
  // Two pillars
  paintPillar(ctx, W * 0.20, '#3A1F35');
  paintPillar(ctx, W * 0.80, '#3A1F35');
  // Big art piece on back wall
  paintFurniture(ctx, W * 0.15, H * 0.32, 220, 280, '#7A3F58');
  paintFurniture(ctx, W * 0.85, H * 0.32, 220, 280, '#7A3F58');
  // Hanging lamps
  for (let i = 0; i < 5; i++) {
    paintLamp(ctx, W * (0.20 + i * 0.15), H * 0.22, '#FFC97A');
  }
  // Plants flanking reception
  paintFurniture(ctx, W * 0.34, H * 0.72, 60, 180, '#1A3A20');
  paintFurniture(ctx, W * 0.66, H * 0.72, 60, 180, '#1A3A20');
  // Floor reflection bands
  ctx.fillStyle = 'rgba(255,200,200,0.08)';
  for (let i = 0; i < 4; i++) ctx.fillRect(0, HORIZON + 40 + i * 80, W, 2);
  return finalize(c);
}

// ─── Scene: SUITE ──────────────────────────────────────────────────────────
function buildSuite() {
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  // Soft cream walls
  paintSky(ctx, [[0,'#2E1F3A'], [0.5,'#4F3550'], [1,'#7D5868']]);
  paintFloor(ctx, [[0,'#2A1525'], [0.5,'#15081A'], [1,'#06030D']]);
  paintHorizonGlow(ctx, 'rgba(255,200,160,0.45)');
  // King-size bed in center
  paintFurniture(ctx, W * 0.50, H * 0.72, 560, 220, '#E8D4E0');
  paintFurniture(ctx, W * 0.50, H * 0.62, 540, 60, '#FFFFFF');  // pillows row
  paintLabel(ctx, W * 0.50, H * 0.78, 'KING SIZE', '#3A1F35');
  // Big window with sunset view
  paintWindow(ctx, W * 0.18, H * 0.40, 280, 220, {
    top: '#FF8AB8', mid: '#FF5C9A', bot: '#7D2050',
  });
  paintLabel(ctx, W * 0.18, H * 0.40 + 150, '☀  Vista al jardín', '#FFD4E5');
  // Mirror with reflected lamp
  paintWindow(ctx, W * 0.82, H * 0.40, 220, 240, {
    top: '#5D3F70', mid: '#3A2050', bot: '#2A1830',
  });
  paintLamp(ctx, W * 0.82, H * 0.40, '#FFC97A');
  paintLabel(ctx, W * 0.82, H * 0.40 + 160, 'Espejo decorativo', '#FFD4E5');
  // Nightstands
  paintFurniture(ctx, W * 0.30, H * 0.74, 70, 90, '#5A3050');
  paintFurniture(ctx, W * 0.70, H * 0.74, 70, 90, '#5A3050');
  // Ceiling chandelier
  paintLamp(ctx, W * 0.50, H * 0.12, '#FFD080');
  return finalize(c);
}

// ─── Scene: SPA ────────────────────────────────────────────────────────────
function buildSpa() {
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  // Cool teal-lilac walls
  paintSky(ctx, [[0,'#1A1F3A'], [0.5,'#3A3060'], [1,'#5F4A80']]);
  paintFloor(ctx, [[0,'#15183A'], [0.4,'#0A0A20'], [1,'#06030D']]);
  paintHorizonGlow(ctx, 'rgba(140,180,255,0.55)');
  // Big pool reflection (front)
  ctx.fillStyle = 'rgba(120,180,220,0.55)';
  ctx.fillRect(W * 0.20, HORIZON + 50, W * 0.60, 200);
  // Pool light ripples
  ctx.fillStyle = 'rgba(255,255,255,0.20)';
  for (let i = 0; i < 7; i++) {
    ctx.beginPath();
    ctx.ellipse(W * (0.25 + Math.random() * 0.50), HORIZON + 80 + Math.random() * 150, 30 + Math.random() * 50, 6, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  paintLabel(ctx, W * 0.50, HORIZON + 170, '💧 PISCINA · SPA', '#A5DBFF');
  // Tropical plants flanking
  paintFurniture(ctx, W * 0.10, H * 0.55, 100, 280, '#1A3A22');
  paintFurniture(ctx, W * 0.90, H * 0.55, 100, 280, '#1A3A22');
  // Wall sconces
  paintLamp(ctx, W * 0.20, H * 0.35, '#A5DBFF');
  paintLamp(ctx, W * 0.40, H * 0.30, '#A5DBFF');
  paintLamp(ctx, W * 0.60, H * 0.30, '#A5DBFF');
  paintLamp(ctx, W * 0.80, H * 0.35, '#A5DBFF');
  // Massage table silhouette
  paintFurniture(ctx, W * 0.30, H * 0.50, 200, 60, '#B79CFF');
  paintLabel(ctx, W * 0.30, H * 0.50 + 6, 'Sala de masajes', '#15082E');
  // Sauna door
  paintFurniture(ctx, W * 0.70, H * 0.48, 130, 200, '#5A3050');
  paintLabel(ctx, W * 0.70, H * 0.48 + 130, 'Sauna', '#FFD4E5');
  return finalize(c);
}

// ─── Scene: TERRAZA ────────────────────────────────────────────────────────
function buildTerraza() {
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  // Sunset sky — most of the scene
  paintSky(ctx, [
    [0,    '#15082E'],
    [0.20, '#3A1448'],
    [0.50, '#B79CFF'],
    [0.78, '#FF8AB8'],
    [1,    '#FFD4A5'],
  ]);
  // Distant mountain silhouette
  ctx.fillStyle = 'rgba(20,8,30,0.85)';
  ctx.beginPath();
  ctx.moveTo(0, HORIZON);
  for (let x = 0; x <= W; x += 40) {
    const y = HORIZON - (40 + Math.sin(x * 0.012) * 60 + Math.cos(x * 0.025) * 30);
    ctx.lineTo(x, y);
  }
  ctx.lineTo(W, HORIZON);
  ctx.closePath();
  ctx.fill();
  // Sun glow
  const sg = ctx.createRadialGradient(W * 0.50, HORIZON - 50, 0, W * 0.50, HORIZON - 50, 350);
  sg.addColorStop(0,   'rgba(255,210,140,0.95)');
  sg.addColorStop(0.4, 'rgba(255,138,184,0.35)');
  sg.addColorStop(1,   'rgba(0,0,0,0)');
  ctx.fillStyle = sg;
  ctx.beginPath();
  ctx.arc(W * 0.50, HORIZON - 50, 350, 0, Math.PI * 2);
  ctx.fill();
  // Wooden deck floor
  paintFloor(ctx, [[0,'#3A1F1A'], [0.5,'#1F100A'], [1,'#06030D']]);
  for (let i = 0; i < 12; i++) {
    ctx.fillStyle = 'rgba(0,0,0,0.30)';
    ctx.fillRect(0, HORIZON + i * 38, W, 2);
  }
  // Bar counter
  paintFurniture(ctx, W * 0.50, H * 0.72, 600, 100, '#3A1F2A');
  paintLabel(ctx, W * 0.50, H * 0.72 + 6, '🍹 SKY BAR', '#FFD4A5');
  // Glasses on the bar
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = 'rgba(255,210,140,0.75)';
    ctx.fillRect(W * 0.30 + i * 80, H * 0.68, 12, 22);
  }
  // Lounge sofas flanking
  paintFurniture(ctx, W * 0.15, H * 0.78, 240, 100, '#5A3050');
  paintFurniture(ctx, W * 0.85, H * 0.78, 240, 100, '#5A3050');
  // String lights overhead
  ctx.strokeStyle = 'rgba(255,210,140,0.55)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, 200); ctx.quadraticCurveTo(W * 0.50, 130, W, 200); ctx.stroke();
  for (let i = 0; i <= 16; i++) {
    const x = (i / 16) * W;
    const y = 200 - Math.sin((i / 16) * Math.PI) * 70;
    paintLamp(ctx, x, y, '#FFD080');
  }
  return finalize(c);
}

function finalize(canvas) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

// ════════════════════════════════════════════════════════════════════════════
// SCENE CONFIG — each scene has hotspots placed at (lon, lat) in degrees.
//   lon: 0 = front, 90 = right, 180 = back, -90 = left
//   lat: 0 = horizon, +up, −down
// ════════════════════════════════════════════════════════════════════════════

const SCENES = {
  lobby: {
    titleEs: 'Lobby principal',
    titleEn: 'Main lobby',
    descEs: 'Recepción 24/7 con check-in digital y áreas comunes.',
    descEn: '24/7 reception with digital check-in and common areas.',
    builder: buildLobby,
    hotspots: [
      { id: 'suite',   lon: -55,  lat: -3,  type: 'nav',  target: 'suite',
        labelEs: 'Suite Premier',     labelEn: 'Premier Suite',
        descEs: 'Habitación king-size con vista al jardín.', descEn: 'King-size room with garden view.' },
      { id: 'spa',     lon: 70,   lat: -3,  type: 'nav',  target: 'spa',
        labelEs: 'Spa & Piscina',     labelEn: 'Spa & Pool',
        descEs: 'Área de relajación con piscina climatizada.', descEn: 'Relaxation area with heated pool.' },
      { id: 'terraza', lon: 165,  lat: -5,  type: 'nav',  target: 'terraza',
        labelEs: 'Terraza Sky Bar',   labelEn: 'Sky Bar Terrace',
        descEs: 'Cocteles al atardecer con vista panorámica.', descEn: 'Sunset cocktails with panoramic views.' },
      { id: 'reception', lon: 0,  lat: -12, type: 'info',
        labelEs: 'Recepción',         labelEn: 'Reception',
        descEs: 'Check-in en 90 segundos. WiFi gratis incluido.', descEn: 'Check-in in 90 seconds. Free WiFi included.' },
    ],
  },
  suite: {
    titleEs: 'Suite Premier',
    titleEn: 'Premier Suite',
    descEs: '38 m² · cama king · vista al jardín · minibar gratis.',
    descEn: '38 m² · king bed · garden view · free minibar.',
    builder: buildSuite,
    hotspots: [
      { id: 'bed',     lon: 0,    lat: -10, type: 'info',
        labelEs: 'Cama King Size',    labelEn: 'King Size Bed',
        descEs: 'Colchón premium, almohadas de pluma y sábanas de algodón egipcio.', descEn: 'Premium mattress, feather pillows and Egyptian cotton sheets.' },
      { id: 'window',  lon: -75,  lat: 0,   type: 'info',
        labelEs: 'Vista al jardín',   labelEn: 'Garden view',
        descEs: 'Ventanal al jardín tropical privado del hotel.', descEn: 'Window to the hotel\'s private tropical garden.' },
      { id: 'mirror',  lon: 75,   lat: 0,   type: 'info',
        labelEs: 'Tocador',           labelEn: 'Vanity desk',
        descEs: 'Espejo iluminado y secador profesional incluido.', descEn: 'Lit mirror and professional hairdryer included.' },
      { id: 'lobby',   lon: 180,  lat: -8,  type: 'nav',  target: 'lobby',
        labelEs: 'Volver al lobby',   labelEn: 'Back to lobby',
        descEs: 'Regresar a la recepción.', descEn: 'Return to reception.' },
    ],
  },
  spa: {
    titleEs: 'Spa & Piscina',
    titleEn: 'Spa & Pool',
    descEs: 'Piscina climatizada · sauna · sala de masajes.',
    descEn: 'Heated pool · sauna · massage room.',
    builder: buildSpa,
    hotspots: [
      { id: 'pool',    lon: 0,    lat: -20, type: 'info',
        labelEs: 'Piscina climatizada', labelEn: 'Heated pool',
        descEs: 'Abierta de 6am a 10pm. Toallas incluidas.', descEn: 'Open 6am to 10pm. Towels included.' },
      { id: 'massage', lon: -70,  lat: -3,  type: 'info',
        labelEs: 'Sala de masajes',   labelEn: 'Massage room',
        descEs: 'Tratamientos desde ₡25.000. Reserva en recepción.', descEn: 'Treatments from $50. Book at reception.' },
      { id: 'sauna',   lon: 70,   lat: -3,  type: 'info',
        labelEs: 'Sauna',             labelEn: 'Sauna',
        descEs: 'Sauna seca incluida con cualquier reserva.', descEn: 'Dry sauna included with any booking.' },
      { id: 'lobby',   lon: 180,  lat: -8,  type: 'nav',  target: 'lobby',
        labelEs: 'Volver al lobby',   labelEn: 'Back to lobby',
        descEs: 'Regresar a la recepción.', descEn: 'Return to reception.' },
    ],
  },
  terraza: {
    titleEs: 'Terraza Sky Bar',
    titleEn: 'Sky Bar Terrace',
    descEs: 'Vista 360° · cocteles de autor · música en vivo viernes.',
    descEn: '360° view · signature cocktails · live music Fridays.',
    builder: buildTerraza,
    hotspots: [
      { id: 'bar',     lon: 0,    lat: -8,  type: 'info',
        labelEs: 'Bar de cocteles',   labelEn: 'Cocktail bar',
        descEs: 'Mixología de autor. Happy hour 5–7pm.', descEn: 'Signature mixology. Happy hour 5–7pm.' },
      { id: 'sunset',  lon: 0,    lat: 8,   type: 'info',
        labelEs: 'Vista al atardecer', labelEn: 'Sunset view',
        descEs: 'Mejor punto del hotel para fotografía.', descEn: 'Best spot in the hotel for photos.' },
      { id: 'lounge',  lon: -80,  lat: -5,  type: 'info',
        labelEs: 'Zona de descanso',  labelEn: 'Lounge area',
        descEs: 'Sofás bajos con reserva por consumo mínimo.', descEn: 'Low sofas, available with minimum consumption.' },
      { id: 'lobby',   lon: 180,  lat: -8,  type: 'nav',  target: 'lobby',
        labelEs: 'Volver al lobby',   labelEn: 'Back to lobby',
        descEs: 'Regresar a la recepción.', descEn: 'Return to reception.' },
    ],
  },
};

// ════════════════════════════════════════════════════════════════════════════
// THREE.JS PIECES
// ════════════════════════════════════════════════════════════════════════════

// Convert lon/lat (degrees) → 3D point on a sphere of given radius
function lonLatToXYZ(lon, lat, r = 9.5) {
  const phi   = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon);
  return [
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.cos(theta),
  ];
}

function Sphere({ texture }) {
  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[12, 64, 64]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

// 3D hotspot — pulsing dot that opens an overlay on hover, navigates on click
function Hotspot({ data, locale, onActivate, hovered, setHovered }) {
  const pos = useMemo(() => lonLatToXYZ(data.lon, data.lat), [data.lon, data.lat]);
  const label = locale === 'en' ? data.labelEn : data.labelEs;
  const desc  = locale === 'en' ? data.descEn  : data.descEs;
  const isNav = data.type === 'nav';
  const color = isNav ? '#FF5C9A' : '#B79CFF';
  const isMe  = hovered === data.id;

  return (
    <group position={pos}>
      <Html center distanceFactor={9} zIndexRange={[10, 0]}>
        <div
          onPointerEnter={() => setHovered(data.id)}
          onPointerLeave={() => setHovered(null)}
          onClick={() => isNav && onActivate(data.target)}
          style={{
            position: 'relative',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            cursor: isNav ? 'pointer' : 'help',
            userSelect: 'none', pointerEvents: 'auto',
          }}
        >
          {/* Pulsing ring around dot */}
          <div style={{
            position: 'absolute', width: 38, height: 38, borderRadius: '50%',
            border: `2px solid ${color}`, opacity: 0.6,
            animation: 'vo360-pulse 2s ease-out infinite',
            top: -7, left: -7,
            pointerEvents: 'none',
          }} />
          {/* Center dot */}
          <div style={{
            width: 24, height: 24, borderRadius: '50%',
            background: `radial-gradient(circle at 35% 30%, #fff 0%, ${color} 55%, ${color}aa 100%)`,
            boxShadow: `0 0 14px ${color}, 0 0 28px ${color}80`,
            border: '2px solid rgba(255,255,255,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff',
            transition: 'transform 0.2s',
            transform: isMe ? 'scale(1.18)' : 'scale(1)',
          }}>
            {isNav
              ? <ChevronRight size={12} strokeWidth={3} />
              : <Info size={11} strokeWidth={3} />}
          </div>
          {/* Always-visible mini label */}
          <div style={{
            marginTop: 6,
            padding: '3px 8px',
            background: 'rgba(6,3,13,0.85)',
            border: `1px solid ${color}55`,
            borderRadius: 6,
            fontSize: 10, fontWeight: 700,
            color: '#fff',
            whiteSpace: 'nowrap',
            backdropFilter: 'blur(6px)',
            fontFamily: 'Inter, system-ui, sans-serif',
            letterSpacing: '0.02em',
            transition: 'transform 0.2s',
            transform: isMe ? 'translateY(-2px)' : 'translateY(0)',
          }}>
            {label}
          </div>
        </div>
      </Html>

      {/* Expanded overlay on hover (anchored higher, won't get clipped) */}
      {isMe && (
        <Html center distanceFactor={9} zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute',
            bottom: 60, left: '50%', transform: 'translateX(-50%)',
            width: 220,
            padding: '10px 13px',
            background: 'linear-gradient(135deg, rgba(6,3,13,0.96), rgba(27,16,48,0.96))',
            border: `1px solid ${color}80`,
            borderRadius: 10,
            boxShadow: `0 12px 32px rgba(0,0,0,0.55), 0 0 0 1px ${color}40`,
            color: '#fff',
            fontFamily: 'Inter, system-ui, sans-serif',
            backdropFilter: 'blur(10px)',
            pointerEvents: 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              {isNav
                ? <ChevronRight size={12} color={color} strokeWidth={2.5} />
                : <Info size={12} color={color} strokeWidth={2.5} />}
              <span style={{ fontSize: 11, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.10em' }}>
                {isNav ? (locale === 'en' ? 'Go to' : 'Ir a') : (locale === 'en' ? 'Info' : 'Info')}
              </span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{label}</div>
            <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>{desc}</div>
            {isNav && (
              <div style={{ marginTop: 6, fontSize: 10, color: color, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {locale === 'en' ? 'Click to enter →' : 'Click para entrar →'}
              </div>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}

// Camera + drag controller
function CameraRig({ paused }) {
  const { camera, gl } = useThree();
  const drag = useRef({ active: false, x: 0, y: 0, lon: 0, lat: 0, moved: false });
  const target = useRef({ lon: 0, lat: 0 });
  const idleSince = useRef(0);

  useEffect(() => {
    const dom = gl.domElement;
    const onDown = (e) => {
      drag.current.active = true;
      drag.current.moved = false;
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
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) drag.current.moved = true;
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
    if (!drag.current.active && idleSince.current && performance.now() - idleSince.current > 3500) {
      target.current.lon += 0.10;
    }
    const lon = THREE.MathUtils.degToRad(target.current.lon);
    const lat = THREE.MathUtils.degToRad(target.current.lat);
    const x = Math.cos(lat) * Math.sin(lon);
    const y = Math.sin(lat);
    const z = Math.cos(lat) * Math.cos(lon);
    camera.lookAt(x, y, z);
  });

  return null;
}

function SceneRenderer({ sceneKey, locale, onNavigate, paused }) {
  const [hovered, setHovered] = useState(null);
  const texture = useMemo(() => SCENES[sceneKey].builder(), [sceneKey]);
  const scene   = SCENES[sceneKey];

  // Reset hover when scene changes
  useEffect(() => { setHovered(null); }, [sceneKey]);

  return (
    <>
      <Sphere texture={texture} />
      <CameraRig paused={paused || hovered !== null} />
      {scene.hotspots.map(h => (
        <Hotspot
          key={`${sceneKey}-${h.id}`}
          data={h}
          locale={locale}
          onActivate={onNavigate}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT — exported
// ════════════════════════════════════════════════════════════════════════════
export function Panorama360({ height = 420, paused = false, initialScene = 'lobby' }) {
  const { locale, t } = useApp();
  const [stack, setStack] = useState([initialScene]);
  const current = stack[stack.length - 1];
  const scene   = SCENES[current];

  const navigate = useCallback((target) => {
    if (!SCENES[target]) return;
    setStack(s => {
      // If target is already in stack (going back), pop to it
      const idx = s.indexOf(target);
      if (idx !== -1) return s.slice(0, idx + 1);
      return [...s, target];
    });
  }, []);

  const goBack = () => setStack(s => s.length > 1 ? s.slice(0, -1) : s);

  const title = locale === 'en' ? scene.titleEn : scene.titleEs;
  const desc  = locale === 'en' ? scene.descEn  : scene.descEs;

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
      <style>{`
        @keyframes vo360-pulse {
          0%   { transform: scale(0.8); opacity: 0.85; }
          80%  { transform: scale(1.7); opacity: 0; }
          100% { transform: scale(0.8); opacity: 0; }
        }
      `}</style>

      <Canvas
        camera={{ fov: 75, position: [0, 0, 0.01] }}
        style={{ width: '100%', height: '100%' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <SceneRenderer sceneKey={current} locale={locale} onNavigate={navigate} paused={paused} />
        </Suspense>
      </Canvas>

      {/* ── TOP LEFT — drag hint + scene title ──────────────────────────── */}
      <div style={{
        position: 'absolute', top: 12, left: 12, zIndex: 5,
        display: 'flex', flexDirection: 'column', gap: 6,
        pointerEvents: 'none',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '5px 10px', borderRadius: 999,
          background: 'rgba(6,3,13,0.7)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: '#fff', fontSize: 10.5, fontWeight: 600,
          alignSelf: 'flex-start',
        }}>
          <Move3D size={12} strokeWidth={2} />
          <span>{locale === 'en' ? 'Drag to look around' : 'Arrastrá para mirar'}</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.35 }}
            style={{
              padding: '8px 12px', borderRadius: 8,
              background: 'rgba(6,3,13,0.78)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,92,154,0.40)',
              color: '#fff', maxWidth: 280,
            }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{title}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.70)', lineHeight: 1.4 }}>{desc}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── TOP RIGHT — live 360 badge + scene picker ───────────────────── */}
      <div style={{
        position: 'absolute', top: 12, right: 12, zIndex: 5,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '4px 10px', borderRadius: 999,
          background: 'rgba(255,92,154,0.20)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,92,154,0.50)',
          color: '#fff', fontSize: 9.5, fontWeight: 700,
          fontFamily: 'JetBrains Mono, ui-monospace, monospace', letterSpacing: '0.1em',
          textTransform: 'uppercase', pointerEvents: 'none',
        }}>
          <motion.span animate={{ opacity: [1, 0.35, 1] }} transition={{ duration: 1.6, repeat: Infinity }}
            style={{ width: 5, height: 5, borderRadius: '50%', background: '#FF5C9A', boxShadow: '0 0 6px #FF5C9A' }} />
          360°
        </div>

        {/* Scene mini picker */}
        <div style={{
          display: 'flex', gap: 4,
          padding: 4,
          background: 'rgba(6,3,13,0.78)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.10)', borderRadius: 999,
        }}>
          {Object.keys(SCENES).map(k => {
            const isCur = k === current;
            return (
              <button key={k}
                onClick={() => navigate(k)}
                title={locale === 'en' ? SCENES[k].titleEn : SCENES[k].titleEs}
                style={{
                  width: 22, height: 22, borderRadius: '50%',
                  background: isCur ? 'linear-gradient(135deg, #FF5C9A, #B79CFF)' : 'rgba(255,255,255,0.10)',
                  border: isCur ? '1px solid rgba(255,255,255,0.5)' : '1px solid rgba(255,255,255,0.10)',
                  color: '#fff', fontSize: 9, fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.25s, transform 0.2s',
                  fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                }}>
                {k[0].toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── BOTTOM LEFT — back button + breadcrumb ──────────────────────── */}
      {stack.length > 1 && (
        <div style={{
          position: 'absolute', bottom: 12, left: 12, zIndex: 5,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={goBack}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '6px 11px', borderRadius: 999,
              background: 'rgba(6,3,13,0.85)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,92,154,0.50)',
              color: '#fff', fontSize: 11, fontWeight: 700,
              cursor: 'pointer',
            }}>
            <ArrowLeft size={12} strokeWidth={2.5} />
            {locale === 'en' ? 'Back' : 'Volver'}
          </motion.button>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: 10, color: 'rgba(255,255,255,0.55)',
            fontFamily: 'JetBrains Mono, ui-monospace, monospace',
          }}>
            {stack.map((s, i) => (
              <span key={`${s}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <span style={{ color: i === stack.length - 1 ? '#FF8AB8' : 'rgba(255,255,255,0.55)' }}>
                  {(locale === 'en' ? SCENES[s].titleEn : SCENES[s].titleEs).split(' ')[0]}
                </span>
                {i < stack.length - 1 && <ChevronRight size={10} />}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Subtle vignette ─────────────────────────────────────────────── */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, transparent 55%, rgba(6,3,13,0.55) 100%)',
      }} />
    </div>
  );
}
