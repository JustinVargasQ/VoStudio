import { useEffect, useRef } from 'react';

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

    // Chaos=left (adapts to theme), Order=right (always orange)
    const CHAOS_COLOR = theme === 'dark' ? '#ffffff' : '#0A0A0A';
    const ORDER_COLOR = '#EA580C';

    class Particle {
      constructor(x, y, order) {
        this.x          = x;
        this.y          = y;
        this.originalX  = x;
        this.originalY  = y;
        this.size       = 2;
        this.order      = order;
        this.velocity   = { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2 };
        this.influence  = 0;
        this.neighbors  = [];
      }

      update() {
        if (this.order) {
          const dx = this.originalX - this.x;
          const dy = this.originalY - this.y;
          const chaosInfluence = { x: 0, y: 0 };
          this.neighbors.forEach(n => {
            if (!n.order) {
              const dist = Math.hypot(this.x - n.x, this.y - n.y);
              const str  = Math.max(0, 1 - dist / 100);
              chaosInfluence.x += n.velocity.x * str;
              chaosInfluence.y += n.velocity.y * str;
              this.influence = Math.max(this.influence, str);
            }
          });
          this.x += dx * 0.05 * (1 - this.influence) + chaosInfluence.x * this.influence;
          this.y += dy * 0.05 * (1 - this.influence) + chaosInfluence.y * this.influence;
          this.influence *= 0.99;
        } else {
          this.velocity.x += (Math.random() - 0.5) * 0.5;
          this.velocity.y += (Math.random() - 0.5) * 0.5;
          this.velocity.x *= 0.95;
          this.velocity.y *= 0.95;
          this.x += this.velocity.x;
          this.y += this.velocity.y;
          if (this.x < 0 || this.x > size / 2) this.velocity.x *= -1;
          if (this.y < 0 || this.y > size)      this.velocity.y *= -1;
          this.x = Math.max(0, Math.min(size / 2, this.x));
          this.y = Math.max(0, Math.min(size, this.y));
        }
      }

      draw(ctx) {
        const color = this.order ? ORDER_COLOR : CHAOS_COLOR;
        const alpha = this.order ? 0.85 - this.influence * 0.4 : 0.65;
        const hex   = Math.round(alpha * 255).toString(16).padStart(2, '0');
        ctx.fillStyle = `${color}${hex}`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles = [];
    const gridSize  = 25;
    const spacing   = size / gridSize;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x     = spacing * i + spacing / 2;
        const y     = spacing * j + spacing / 2;
        const order = x >= size / 2; // right half = ordered (orange)
        particles.push(new Particle(x, y, order));
      }
    }

    function updateNeighbors() {
      particles.forEach(p => {
        p.neighbors = particles.filter(o => o !== p && Math.hypot(p.x - o.x, p.y - o.y) < 100);
      });
    }

    let time = 0;
    let animId;

    function animate() {
      animId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, size, size);
      // Transparent — section bg shows through

      if (time % 30 === 0) updateNeighbors();

      particles.forEach(p => {
        p.update();
        p.draw(ctx);
        p.neighbors.forEach(n => {
          const dist = Math.hypot(p.x - n.x, p.y - n.y);
          if (dist < 50) {
            const alpha = 0.15 * (1 - dist / 50);
            const color = p.order ? ORDER_COLOR : CHAOS_COLOR;
            const hex   = Math.round(alpha * 255).toString(16).padStart(2, '0');
            ctx.strokeStyle = `${color}${hex}`;
            ctx.lineWidth   = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        });
      });

      // Divider line
      ctx.strokeStyle = 'rgba(255,255,255,0.12)';
      ctx.lineWidth   = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(size / 2, 0);
      ctx.lineTo(size / 2, size);
      ctx.stroke();
      ctx.setLineDash([]);

      // Labels
      ctx.font      = '9px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillStyle = 'rgba(255,255,255,0.30)';
      ctx.fillText('CAOS', size / 4, size - 10);
      ctx.fillStyle = 'rgba(234,88,12,0.55)';
      ctx.fillText('ORDEN', size * 3 / 4, size - 10);

      time++;
    }

    animate();
    return () => cancelAnimationFrame(animId);
  }, [size, theme]);

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
    </div>
  );
}
