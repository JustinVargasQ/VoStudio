/**
 * Panorama360 — interactive multi-scene 360° tour using REAL equirectangular
 * photos loaded from a CDN, with clickable hotspots and overlays.
 *
 * Demo photos come from Pannellum (pannellum.org/images) which serves real
 * equirectangular panoramas in the public domain. For a production client
 * deployment, drop the client's own hotel photos into public/panoramas/
 * and update SCENE_IMAGES below to local paths.
 *
 * Each "scene" has hotspots positioned in spherical lon/lat coordinates that
 * either navigate to another scene (pink) or show info on hover (lilac).
 */

import { useRef, useState, useEffect, Suspense, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Move3D, ArrowLeft, MapPin, Info, ChevronRight, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

// ════════════════════════════════════════════════════════════════════════════
// SCENE CONFIG — real equirectangular photos + hotspot positions
// (lon: 0 = front, 90 = right, 180 = back, -90 = left; lat: 0 = horizon)
// ════════════════════════════════════════════════════════════════════════════

// Real resort photos served locally from public/panoramas/
// (Demo set from Cape Florida — Key Biscayne, Miami, FL.
//  In production replace with the client hotel's own equirectangular photos.)
const SCENES = {
  lobby: {
    titleEs: 'Entrada principal',
    titleEn: 'Main entrance',
    descEs: 'Llegada al resort — plaza con áreas de bienvenida y vista al edificio.',
    descEn: 'Arrival at the resort — courtyard with welcome areas and building view.',
    image: '/panoramas/lobby.jpg',
    fallbackColor: { top: '#7BB7E0', bot: '#3A1F2A' },
    hotspots: [
      { id: 'recepcion', lon: 139.4, lat: -20.4, type: 'info',
        labelEs: 'Recepción del resort', labelEn: 'Resort reception',
        descEs: 'Recepción 24/7, conserjería y acceso WiFi de alta velocidad.', descEn: '24/7 reception, concierge and high-speed WiFi access.' },
      { id: 'mirador', lon: 0.9, lat: -13.3, type: 'nav', target: 'mirador',
        labelEs: 'Ir al mirador', labelEn: 'Go to lookout',
        descEs: 'Vista panorámica al océano desde el mirador del resort.', descEn: 'Panoramic ocean view from the resort lookout.' },
      { id: 'jardin', lon: 36.2, lat: -0.2, type: 'nav', target: 'jardin',
        labelEs: 'Jardines tropicales', labelEn: 'Tropical gardens',
        descEs: 'Caminar por los senderos entre palmeras y vegetación nativa.', descEn: 'Walk the paths through palm trees and native vegetation.' },
      { id: 'playa', lon: -33.2, lat: -16.1, type: 'nav', target: 'playa',
        labelEs: 'Playa privada', labelEn: 'Private beach',
        descEs: 'Acceso directo a la playa exclusiva para huéspedes.', descEn: 'Direct access to the guest-only private beach.' },
    ],
  },
  jardin: {
    titleEs: 'Jardines tropicales',
    titleEn: 'Tropical gardens',
    descEs: 'Sendero entre palmeras y vegetación nativa — ruta hacia las habitaciones.',
    descEn: 'Path through palm trees and native vegetation — route to the rooms.',
    image: '/panoramas/jardin.jpg',
    fallbackColor: { top: '#7BB7E0', bot: '#3A4F2A' },
    hotspots: [
      { id: 'palms', lon: -50.7, lat: 4.6, type: 'info',
        labelEs: 'Palmera real',   labelEn: 'Royal palm',
        descEs: 'Más de 80 palmeras nativas distribuidas en el resort.', descEn: 'Over 80 native palm trees across the resort.' },
      { id: 'path', lon: -60.4, lat: -8.1, type: 'info',
        labelEs: 'Senderos pavimentados', labelEn: 'Paved paths',
        descEs: 'Accesibles para sillas de ruedas y coches de niños.', descEn: 'Accessible for wheelchairs and strollers.' },
      { id: 'mirador', lon: 67.9, lat: -8.2, type: 'nav', target: 'mirador',
        labelEs: 'Continuar al mirador', labelEn: 'Continue to lookout',
        descEs: 'Seguir el sendero hasta la vista del mar.', descEn: 'Follow the path to the sea view.' },
      { id: 'lobby', lon: 6.3, lat: -8.7, type: 'nav', target: 'lobby',
        labelEs: 'Volver a la entrada', labelEn: 'Back to entrance',
        descEs: 'Regresar al área principal.', descEn: 'Return to the main area.' },
    ],
  },
  mirador: {
    titleEs: 'Mirador al océano',
    titleEn: 'Ocean lookout',
    descEs: 'Vista panorámica del mar y la costa — ideal para fotos al atardecer.',
    descEn: 'Panoramic view of the sea and coast — ideal for sunset photos.',
    image: '/panoramas/mirador.jpg',
    fallbackColor: { top: '#7BB7E0', bot: '#1A6F8A' },
    hotspots: [
      { id: 'faro', lon: -45.1, lat: 11.7, type: 'info',
        labelEs: 'Faro histórico', labelEn: 'Historic lighthouse',
        descEs: 'Faro de Cape Florida restaurado — visitas guiadas disponibles.', descEn: 'Restored Cape Florida lighthouse — guided tours available.' },
      { id: 'oceano', lon: -170.8, lat: -8.8, type: 'info',
        labelEs: 'Vista al océano', labelEn: 'Ocean view',
        descEs: 'Vista de 180° al océano abierto — aguas color turquesa.', descEn: '180° view of the open ocean — turquoise waters.' },
    ],
  },
  playa: {
    titleEs: 'Playa privada',
    titleEn: 'Private beach',
    descEs: 'Arena fina con vista al faro — acceso exclusivo para huéspedes.',
    descEn: 'Fine sand with lighthouse view — exclusive access for guests.',
    image: '/panoramas/playa.jpg',
    fallbackColor: { top: '#7BB7E0', bot: '#C9A878' },
    hotspots: [
      { id: 'palmeras', lon: -77.5, lat: 0.6, type: 'info',
        labelEs: 'Palmeras del resort', labelEn: 'Resort palm trees',
        descEs: 'Sombra natural entre palmeras con vistas al mar.', descEn: 'Natural shade under palm trees with sea views.' },
      { id: 'arena', lon: -0.3, lat: -9.6, type: 'info',
        labelEs: 'Arena y aguas turquesas', labelEn: 'Sand and turquoise waters',
        descEs: 'Tumbonas y sombrillas incluidas con la reserva.', descEn: 'Sun loungers and umbrellas included with booking.' },
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

// Build a solid-colour fallback texture (used when image fails)
function buildFallbackTexture(top, bot) {
  const w = 1024, h = 512;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, top); g.addColorStop(1, bot);
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Sphere with the panorama texture wrapped on the inside
function PanoramaSphere({ texture }) {
  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[12, 64, 64]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} toneMapped={false} />
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
          {/* Pulsing ring */}
          <div style={{
            position: 'absolute', width: 40, height: 40, borderRadius: '50%',
            border: `2px solid ${color}`, opacity: 0.7,
            animation: 'vo360-pulse 2s ease-out infinite',
            top: -8, left: -8,
            pointerEvents: 'none',
          }} />
          {/* Center dot */}
          <div style={{
            width: 24, height: 24, borderRadius: '50%',
            background: `radial-gradient(circle at 35% 30%, #fff 0%, ${color} 55%, ${color}aa 100%)`,
            boxShadow: `0 0 14px ${color}, 0 0 28px ${color}90, 0 4px 10px rgba(0,0,0,0.5)`,
            border: '2px solid rgba(255,255,255,0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff',
            transition: 'transform 0.2s',
            transform: isMe ? 'scale(1.18)' : 'scale(1)',
          }}>
            {isNav
              ? <ChevronRight size={12} strokeWidth={3} />
              : <Info size={11} strokeWidth={3} />}
          </div>
          {/* Mini label visible always */}
          <div style={{
            marginTop: 6,
            padding: '3px 8px',
            background: 'rgba(6,3,13,0.88)',
            border: `1px solid ${color}66`,
            borderRadius: 6,
            fontSize: 10, fontWeight: 700,
            color: '#fff',
            whiteSpace: 'nowrap',
            backdropFilter: 'blur(6px)',
            fontFamily: 'Inter, system-ui, sans-serif',
            letterSpacing: '0.02em',
            transition: 'transform 0.2s',
            transform: isMe ? 'translateY(-2px)' : 'translateY(0)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          }}>
            {label}
          </div>
        </div>
      </Html>

      {/* Expanded overlay on hover */}
      {isMe && (
        <Html center distanceFactor={9} zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute',
            bottom: 60, left: '50%', transform: 'translateX(-50%)',
            width: 230,
            padding: '11px 14px',
            background: 'linear-gradient(135deg, rgba(6,3,13,0.96), rgba(27,16,48,0.96))',
            border: `1px solid ${color}90`,
            borderRadius: 10,
            boxShadow: `0 12px 36px rgba(0,0,0,0.65), 0 0 0 1px ${color}45`,
            color: '#fff',
            fontFamily: 'Inter, system-ui, sans-serif',
            backdropFilter: 'blur(12px)',
            pointerEvents: 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
              {isNav
                ? <ChevronRight size={12} color={color} strokeWidth={2.5} />
                : <Info size={12} color={color} strokeWidth={2.5} />}
              <span style={{ fontSize: 10, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.10em' }}>
                {isNav ? (locale === 'en' ? 'Go to' : 'Ir a') : (locale === 'en' ? 'Info' : 'Info')}
              </span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{label}</div>
            <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.78)', lineHeight: 1.45 }}>{desc}</div>
            {isNav && (
              <div style={{ marginTop: 6, fontSize: 10, color, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
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

// Loads the equirectangular image with a fallback texture if loading fails
function useImageTexture(url, fallbackColor) {
  const [texture, setTexture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = 'anonymous';
    loader.load(
      url,
      (tex) => {
        if (!active) return;
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.needsUpdate = true;
        setTexture(tex);
        setLoading(false);
      },
      undefined,
      () => {
        if (!active) return;
        // Fallback: solid gradient
        setTexture(buildFallbackTexture(fallbackColor.top, fallbackColor.bot));
        setLoading(false);
      },
    );
    return () => { active = false; };
  }, [url, fallbackColor.top, fallbackColor.bot]);

  return { texture, loading };
}

function SceneRenderer({ sceneKey, locale, onNavigate, paused, onLoadingChange }) {
  const [hovered, setHovered] = useState(null);
  const scene = SCENES[sceneKey];
  const { texture, loading } = useImageTexture(scene.image, scene.fallbackColor);

  useEffect(() => { setHovered(null); }, [sceneKey]);
  useEffect(() => { onLoadingChange?.(loading); }, [loading, onLoadingChange]);

  if (!texture) return null;

  return (
    <>
      <PanoramaSphere texture={texture} />
      <CameraRig paused={paused || hovered !== null} />
      {!loading && scene.hotspots.map(h => (
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
// MAIN COMPONENT
// ════════════════════════════════════════════════════════════════════════════
export function Panorama360({ height = 460, paused = false, initialScene = 'lobby' }) {
  const { locale } = useApp();
  const [stack, setStack] = useState([initialScene]);
  const [loading, setLoading] = useState(true);
  const current = stack[stack.length - 1];
  const scene   = SCENES[current];

  const navigate = useCallback((target) => {
    if (!SCENES[target]) return;
    setStack(s => {
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
        @keyframes vo360-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <Canvas
        camera={{ fov: 75, position: [0, 0, 0.01] }}
        style={{ width: '100%', height: '100%' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <SceneRenderer
            sceneKey={current}
            locale={locale}
            onNavigate={navigate}
            paused={paused}
            onLoadingChange={setLoading}
          />
        </Suspense>
      </Canvas>


      {/* Loading overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{
              position: 'absolute', inset: 0, zIndex: 8,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 12,
              background: 'rgba(6,3,13,0.55)', backdropFilter: 'blur(6px)',
              color: '#fff', pointerEvents: 'none',
            }}>
            <Loader2 size={28} strokeWidth={2} style={{ animation: 'vo360-spin 1s linear infinite', color: '#FF5C9A' }} />
            <div style={{ fontSize: 12, fontFamily: 'JetBrains Mono, ui-monospace, monospace', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>
              {locale === 'en' ? 'Loading panorama…' : 'Cargando panorama…'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP LEFT — drag hint + scene title */}
      <div style={{
        position: 'absolute', top: 12, left: 12, zIndex: 5,
        display: 'flex', flexDirection: 'column', gap: 6,
        pointerEvents: 'none', maxWidth: 'calc(100% - 140px)',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '5px 10px', borderRadius: 999,
          background: 'rgba(6,3,13,0.78)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.14)',
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
              background: 'rgba(6,3,13,0.82)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,92,154,0.45)',
              color: '#fff', maxWidth: 300,
            }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{title}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>{desc}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* TOP RIGHT — 360 badge + scene picker */}
      <div style={{
        position: 'absolute', top: 12, right: 12, zIndex: 5,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '4px 10px', borderRadius: 999,
          background: 'rgba(255,92,154,0.22)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,92,154,0.55)',
          color: '#fff', fontSize: 9.5, fontWeight: 700,
          fontFamily: 'JetBrains Mono, ui-monospace, monospace', letterSpacing: '0.1em',
          textTransform: 'uppercase', pointerEvents: 'none',
        }}>
          <motion.span animate={{ opacity: [1, 0.35, 1] }} transition={{ duration: 1.6, repeat: Infinity }}
            style={{ width: 5, height: 5, borderRadius: '50%', background: '#FF5C9A', boxShadow: '0 0 6px #FF5C9A' }} />
          360°
        </div>

        <div style={{
          display: 'flex', gap: 4,
          padding: 4,
          background: 'rgba(6,3,13,0.82)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.12)', borderRadius: 999,
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

      {/* BOTTOM LEFT — back button + breadcrumb */}
      {stack.length > 1 && (
        <div style={{
          position: 'absolute', bottom: 12, left: 12, zIndex: 5,
          display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
        }}>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={goBack}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '6px 11px', borderRadius: 999,
              background: 'rgba(6,3,13,0.88)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,92,154,0.55)',
              color: '#fff', fontSize: 11, fontWeight: 700,
              cursor: 'pointer',
            }}>
            <ArrowLeft size={12} strokeWidth={2.5} />
            {locale === 'en' ? 'Back' : 'Volver'}
          </motion.button>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: 10, color: 'rgba(255,255,255,0.65)',
            fontFamily: 'JetBrains Mono, ui-monospace, monospace',
            padding: '4px 8px',
            background: 'rgba(6,3,13,0.55)', borderRadius: 999,
            backdropFilter: 'blur(6px)',
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

      {/* Demo disclaimer (bottom-right) */}
      <div style={{
        position: 'absolute', bottom: 12, right: 12, zIndex: 5,
        padding: '4px 10px', borderRadius: 999,
        background: 'rgba(6,3,13,0.65)', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.10)',
        color: 'rgba(255,255,255,0.55)', fontSize: 9,
        fontFamily: 'JetBrains Mono, ui-monospace, monospace',
        letterSpacing: '0.08em', textTransform: 'uppercase',
        pointerEvents: 'none',
      }}>
        {locale === 'en' ? 'Demo photos' : 'Fotos demo'}
      </div>

      {/* Subtle vignette */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, transparent 60%, rgba(6,3,13,0.45) 100%)',
      }} />
    </div>
  );
}
