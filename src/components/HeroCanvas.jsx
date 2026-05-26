import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export function HeroCanvas({ theme = 'dark' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const isDark = theme === 'dark';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── Setup ──────────────────────────────────────────────────────────────────
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // ── Particles ──────────────────────────────────────────────────────────────
    // Reduce count on mobile for performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 8000 : 20000;

    const positions         = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors            = new Float32Array(particleCount * 3);
    const velocities        = new Float32Array(particleCount * 3);

    const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);
    const color     = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      const vi = i % torusKnot.attributes.position.count;
      const x  = torusKnot.attributes.position.getX(vi) + (Math.random() - 0.5) * 0.08;
      const y  = torusKnot.attributes.position.getY(vi) + (Math.random() - 0.5) * 0.08;
      const z  = torusKnot.attributes.position.getZ(vi) + (Math.random() - 0.5) * 0.08;

      positions[i*3]   = originalPositions[i*3]   = x;
      positions[i*3+1] = originalPositions[i*3+1] = y;
      positions[i*3+2] = originalPositions[i*3+2] = z;

      // v7 palette — Pink Lilac Noir: rosa (330°), magenta (320°), lila (270°)
      // H rango: 0.75 (lila 270°) → 0.95 (rosa 342°)
      const hue   = 0.75 + Math.random() * 0.20;
      const sat   = 0.65 + Math.random() * 0.30;
      const light = isDark
        ? 0.55 + Math.random() * 0.30   // brighter on dark bg
        : 0.45 + Math.random() * 0.25;  // richer on light bg

      color.setHSL(hue, sat, light);
      colors[i*3]   = color.r;
      colors[i*3+1] = color.g;
      colors[i*3+2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size:         isDark ? 0.026 : 0.020,
      vertexColors: true,
      blending:     isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      transparent:  true,
      opacity:      isDark ? 0.92 : 0.75,
      depthWrite:   false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ── Mouse ──────────────────────────────────────────────────────────────────
    const mouse = new THREE.Vector2(0, 0);
    const handleMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth)  *  2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * -2 + 1;
    };
    if (!prefersReducedMotion) window.addEventListener('mousemove', handleMouseMove);

    // ── Animation loop ─────────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        const mx = mouse.x * 3;
        const my = mouse.y * 3;

        for (let i = 0; i < particleCount; i++) {
          const ix = i*3, iy = i*3+1, iz = i*3+2;

          const dx = positions[ix]   - mx;
          const dy = positions[iy]   - my;
          const dz = positions[iz];
          const distSq = dx*dx + dy*dy + dz*dz;

          if (distSq < 2.25) { // 1.5² — repulsion radius
            const dist  = Math.sqrt(distSq) || 0.001;
            const force = (1.5 - dist) * 0.012 / dist;
            velocities[ix] += dx * force;
            velocities[iy] += dy * force;
            velocities[iz] += dz * force;
          }

          // Spring return to original position
          velocities[ix] += (originalPositions[ix] - positions[ix]) * 0.0012;
          velocities[iy] += (originalPositions[iy] - positions[iy]) * 0.0012;
          velocities[iz] += (originalPositions[iz] - positions[iz]) * 0.0012;

          // Damping
          velocities[ix] *= 0.94;
          velocities[iy] *= 0.94;
          velocities[iz] *= 0.94;

          positions[ix] += velocities[ix];
          positions[iy] += velocities[iy];
          positions[iz] += velocities[iz];
        }
        geometry.attributes.position.needsUpdate = true;
      }

      points.rotation.y = elapsed * 0.055;
      points.rotation.x = Math.sin(elapsed * 0.02) * 0.15;
      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ─────────────────────────────────────────────────────────────────
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // ── Cleanup ────────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      torusKnot.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />;
}
