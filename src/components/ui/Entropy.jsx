import { useEffect, useRef } from 'react';

const PALETTE_DARK  = ['#8A46FF', '#E14DFF', '#FF5C9A', '#6AB7FF', '#C0A0FF', '#a98fff', '#ff8ac5'];
const PALETTE_LIGHT = ['#8A46FF', '#5D2BFF', '#E14DFF', '#FF5C9A', '#6A5CFF', '#C14DFF', '#9D7CFF'];

export function Entropy({ size = 480, theme = 'dark' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width  = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const PALETTE = theme === 'dark' ? PALETTE_DARK : PALETTE_LIGHT;
    const CONNECT_DIST = size * 0.22;
    const COUNT = 80;
    const cx = size / 2;
    const cy = size / 2;

    // Static nebula cloud positions
    const NEBULAE = [
      { x: cx * 0.70, y: cy * 0.72, r: size * 0.30, color: '#8A46FF', a: 0.11 },
      { x: cx * 1.38, y: cy * 1.28, r: size * 0.24, color: '#E14DFF', a: 0.09 },
      { x: cx * 0.62, y: cy * 1.32, r: size * 0.22, color: '#6AB7FF', a: 0.08 },
      { x: cx * 1.42, y: cy * 0.62, r: size * 0.20, color: '#FF5C9A', a: 0.08 },
      { x: cx * 1.05, y: cy * 0.55, r: size * 0.16, color: '#C0A0FF', a: 0.07 },
    ];

    class Particle {
      constructor() {
        // Galaxy-like distribution: denser toward center
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.pow(Math.random(), 0.55) * (size * 0.47);
        this.x = cx + Math.cos(angle) * dist;
        this.y = cy + Math.sin(angle) * dist;
        this.vx = (Math.random() - 0.5) * 0.72;
        this.vy = (Math.random() - 0.5) * 0.72;
        // ~10% are bright "beacon" stars
        this.isBeacon = Math.random() < 0.10;
        this.r = this.isBeacon ? (2.8 + Math.random() * 1.6) : (0.7 + Math.random() * 2.0);
        this.color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        this.alpha = this.isBeacon ? (0.85 + Math.random() * 0.15) : (0.32 + Math.random() * 0.52);
        this.phase = Math.random() * Math.PI * 2;
        this.freq  = this.isBeacon
          ? (0.026 + Math.random() * 0.022)
          : (0.012 + Math.random() * 0.018);
      }

      update() {
        this.phase += this.freq;
        this.vx += (Math.random() - 0.5) * 0.055;
        this.vy += (Math.random() - 0.5) * 0.055;
        const spd = Math.hypot(this.vx, this.vy);
        const maxSpd = this.isBeacon ? 0.85 : 1.05;
        if (spd > maxSpd) { this.vx *= maxSpd / spd; this.vy *= maxSpd / spd; }
        this.vx *= 0.989;
        this.vy *= 0.989;
        this.x += this.vx;
        this.y += this.vy;
        const m = 28;
        if (this.x < -m) this.x = size + m;
        else if (this.x > size + m) this.x = -m;
        if (this.y < -m) this.y = size + m;
        else if (this.y > size + m) this.y = -m;
      }

      draw() {
        const pulse = 0.70 + Math.sin(this.phase) * 0.30;
        const a = this.alpha * pulse;
        const r = this.r * (0.82 + Math.sin(this.phase * 0.65) * 0.18);
        const haloR = this.isBeacon ? r * 8 : r * 5.5;

        // Outer glow halo
        const halo = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, haloR);
        const haloAlpha = this.isBeacon ? Math.round(a * 110) : Math.round(a * 72);
        halo.addColorStop(0, this.color + haloAlpha.toString(16).padStart(2, '0'));
        halo.addColorStop(0.45, this.color + Math.round(haloAlpha * 0.28).toString(16).padStart(2, '0'));
        halo.addColorStop(1, this.color + '00');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(this.x, this.y, haloR, 0, Math.PI * 2);
        ctx.fill();

        // Cross/flare for beacons
        if (this.isBeacon) {
          ctx.globalAlpha = a * 0.45;
          ctx.strokeStyle = this.color;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(this.x - r * 4, this.y); ctx.lineTo(this.x + r * 4, this.y);
          ctx.moveTo(this.x, this.y - r * 4); ctx.lineTo(this.x, this.y + r * 4);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        // Core dot
        ctx.globalAlpha = a;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
        ctx.fill();

        // Bright inner core for beacons
        if (this.isBeacon) {
          ctx.globalAlpha = a * 0.90;
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(this.x, this.y, r * 0.38, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.globalAlpha = 1;
      }
    }

    const particles = Array.from({ length: COUNT }, () => new Particle());
    let startTime = Date.now();

    function drawNebulae() {
      NEBULAE.forEach(nb => {
        const g = ctx.createRadialGradient(nb.x, nb.y, 0, nb.x, nb.y, nb.r);
        const hex = Math.round(nb.a * 255).toString(16).padStart(2, '0');
        g.addColorStop(0, nb.color + hex);
        g.addColorStop(0.55, nb.color + Math.round(nb.a * 80).toString(16).padStart(2, '0'));
        g.addColorStop(1, nb.color + '00');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(nb.x, nb.y, nb.r, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function drawCentralCore() {
      const elapsed = (Date.now() - startTime) * 0.001;
      const pulse = 0.78 + Math.sin(elapsed * 0.85) * 0.22;
      const coreR = size * 0.13 * pulse;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      g.addColorStop(0, `rgba(138,70,255,${0.20 * pulse})`);
      g.addColorStop(0.42, `rgba(225,77,255,${0.09 * pulse})`);
      g.addColorStop(1, 'rgba(138,70,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fill();
    }

    let animId;
    function animate() {
      animId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, size, size);

      drawNebulae();
      drawCentralCore();

      // Gradient connection lines
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < CONNECT_DIST) {
            const alpha = 0.32 * (1 - d / CONNECT_DIST);
            const hexA = Math.round(alpha * 255).toString(16).padStart(2, '0');
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grad.addColorStop(0, a.color + hexA);
            grad.addColorStop(1, b.color + hexA);
            ctx.strokeStyle = grad;
            ctx.lineWidth = (a.isBeacon || b.isBeacon) ? 1.0 : 0.55;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => { p.update(); p.draw(); });
    }

    animate();
    return () => cancelAnimationFrame(animId);
  }, [size, theme]);

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
      />
    </div>
  );
}
