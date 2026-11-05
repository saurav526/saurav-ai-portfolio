import React, { useEffect, useRef } from 'react';
// "ThreeBackground" component that renders a dynamic 3D neural network background with animated nodes and connections, adapting to different sections of the portfolio website.
interface ThreeBackgroundProps {
  activeSection?: string;
  sceneMode?: 'auto' | 'sphere' | 'lattice' | 'helix' | 'torus';
}

interface Node3D {
  baseX: number;
  baseY: number;
  baseZ: number;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  colorIndex: number;
  phase: number;
}

interface PulsePacket {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
}

const SECTION_PALETTES: Record<string, [string, string, string]> = {
  hero: ['#8b5cf6', '#06b6d4', '#a855f7'],
  about: ['#06b6d4', '#8b5cf6', '#3b82f6'],
  skills: ['#a855f7', '#06b6d4', '#10b981'],
  experience: ['#3b82f6', '#8b5cf6', '#06b6d4'],
  projects: ['#8b5cf6', '#ec4899', '#06b6d4'],
  terminal: ['#10b981', '#06b6d4', '#8b5cf6'],
  github: ['#06b6d4', '#3b82f6', '#8b5cf6'],
  education: ['#a855f7', '#8b5cf6', '#06b6d4'],
  contact: ['#8b5cf6', '#06b6d4', '#3b82f6'],
};

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({
  activeSection = 'hero',
  sceneMode = 'auto',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeSectionRef = useRef(activeSection);
  const sceneModeRef = useRef(sceneMode);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    sceneModeRef.current = sceneMode;
  }, [sceneMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / width - 0.5) * 2;
      mouse.targetY = (e.clientY / height - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const NODE_COUNT = width < 768 ? 55 : 95;
    const nodes: Node3D[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      // Fibonacci sphere distribution for initial 3D coordinates
      const phi = Math.acos(1 - (2 * (i + 0.5)) / NODE_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const radius = 260 + (i % 5) * 45;

      const bx = radius * Math.sin(phi) * Math.cos(theta);
      const by = radius * Math.sin(phi) * Math.sin(theta);
      const bz = radius * Math.cos(phi);

      nodes.push({
        baseX: bx,
        baseY: by,
        baseZ: bz,
        x: bx,
        y: by,
        z: bz,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        vz: (Math.random() - 0.5) * 0.35,
        size: 1.8 + (i % 4) * 0.7,
        colorIndex: i % 3,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const pulses: PulsePacket[] = Array.from({ length: 18 }, (_, idx) => ({
      fromIdx: idx % NODE_COUNT,
      toIdx: (idx * 7 + 3) % NODE_COUNT,
      progress: Math.random(),
      speed: 0.008 + (idx % 4) * 0.004,
    }));

    let time = 0;
    let animId = 0;

    const resolveGeometryFormation = (
      i: number,
      t: number,
      section: string,
      mode: string
    ): [number, number, number] => {
      const effectiveMode =
        mode !== 'auto'
          ? mode
          : section === 'skills' || section === 'projects'
          ? 'lattice'
          : section === 'terminal' || section === 'github'
          ? 'helix'
          : section === 'experience' || section === 'education'
          ? 'torus'
          : 'sphere';

      const ratio = i / NODE_COUNT;

      if (effectiveMode === 'lattice') {
        const cols = 6;
        const rows = 4;
        const layers = 4;
        const gx = (i % cols) - (cols - 1) / 2;
        const gy = (Math.floor(i / cols) % rows) - (rows - 1) / 2;
        const gz = (Math.floor(i / (cols * rows)) % layers) - (layers - 1) / 2;
        const spacing = 125;
        return [
          gx * spacing + Math.sin(t * 1.5 + i) * 18,
          gy * spacing + Math.cos(t * 1.2 + i) * 18,
          gz * spacing,
        ];
      }

      if (effectiveMode === 'helix') {
        const strand = i % 2 === 0 ? 1 : -1;
        const angle = ratio * Math.PI * 6 + t * 0.8 + (strand === 1 ? 0 : Math.PI);
        const radius = 220 + Math.sin(t + i * 0.3) * 30;
        const y = (ratio - 0.5) * 680;
        return [Math.cos(angle) * radius, y, Math.sin(angle) * radius];
      }

      if (effectiveMode === 'torus') {
        const u = ratio * Math.PI * 2 * 3 + t * 0.5;
        const v = (i % 12) * ((Math.PI * 2) / 12) + t * 0.9;
        const R = 250;
        const r = 95;
        const x = (R + r * Math.cos(v)) * Math.cos(u);
        const y = (R + r * Math.cos(v)) * Math.sin(u);
        const z = r * Math.sin(v);
        return [x, y, z];
      }

      // Default 3D Neural Fibonacci Sphere
      const node = nodes[i];
      const breathe = 1 + Math.sin(t * 1.3 + node.phase) * 0.08;
      return [
        node.baseX * breathe,
        node.baseY * breathe,
        node.baseZ * breathe,
      ];
    };

    const render = () => {
      if (!prefersReducedMotion) {
        time += 0.008;
      }

      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      const palette =
        SECTION_PALETTES[activeSectionRef.current] || SECTION_PALETTES.hero;

      // Subtle 3D perspective horizon grid at bottom of screen
      ctx.save();
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.07)';
      ctx.lineWidth = 1;
      const horizonY = height * 0.78;
      const gridLines = 14;
      for (let g = -gridLines; g <= gridLines; g++) {
        const topX = width / 2 + g * 45 - mouse.x * 40;
        const botX = width / 2 + g * 190 - mouse.x * 120;
        ctx.beginPath();
        ctx.moveTo(topX, horizonY);
        ctx.lineTo(botX, height);
        ctx.stroke();
      }
      for (let h = 0; h < 6; h++) {
        const progress = ((h / 6 + (time * 0.4) % (1 / 6)) % 1);
        const yPos = horizonY + Math.pow(progress, 1.8) * (height - horizonY);
        ctx.beginPath();
        ctx.moveTo(0, yPos);
        ctx.lineTo(width, yPos);
        ctx.stroke();
      }
      ctx.restore();

      const rotY = time * 0.45 + mouse.x * 0.55;
      const rotX = Math.sin(time * 0.3) * 0.25 - mouse.y * 0.45;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const fov = 620;
      const projected: {
        sx: number;
        sy: number;
        scale: number;
        z: number;
        color: string;
        size: number;
      }[] = [];

      for (let i = 0; i < NODE_COUNT; i++) {
        const node = nodes[i];
        const [tx, ty, tz] = resolveGeometryFormation(
          i,
          time,
          activeSectionRef.current,
          sceneModeRef.current
        );

        // Smooth morphing interpolation between 3D formations
        node.x += (tx - node.x) * 0.05;
        node.y += (ty - node.y) * 0.05;
        node.z += (tz - node.z) * 0.05;

        // 3D rotation matrix around Y then X
        const x1 = node.x * cosY - node.z * sinY;
        const z1 = node.z * cosY + node.x * sinY;
        const y1 = node.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + node.y * sinX;

        const depth = fov + z2 + 240;
        const scale = depth > 50 ? fov / depth : 0.1;

        projected.push({
          sx: width / 2 + x1 * scale,
          sy: height / 2 + y1 * scale,
          scale,
          z: z2,
          color: palette[node.colorIndex],
          size: node.size,
        });
      }

      // Draw 3D synaptic connections between nearby nodes
      const maxDistSq = width < 768 ? 130 * 130 : 165 * 165;
      ctx.lineWidth = 0.85;
      for (let i = 0; i < NODE_COUNT; i++) {
        const p1 = projected[i];
        if (p1.scale <= 0.15) continue;
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const p2 = projected[j];
          if (p2.scale <= 0.15) continue;
          const dx = p1.sx - p2.sx;
          const dy = p1.sy - p2.sy;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistSq) {
            const alpha = (1 - distSq / maxDistSq) * 0.22 * Math.min(p1.scale, p2.scale);
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
            ctx.stroke();
          }
        }
      }

      // Draw traveling synaptic data packets along connections
      for (const pulse of pulses) {
        if (!prefersReducedMotion) {
          pulse.progress += pulse.speed;
          if (pulse.progress >= 1) {
            pulse.progress = 0;
            pulse.fromIdx = pulse.toIdx;
            pulse.toIdx = Math.floor(Math.random() * NODE_COUNT);
          }
        }
        const a = projected[pulse.fromIdx];
        const b = projected[pulse.toIdx];
        if (a && b) {
          const px = a.sx + (b.sx - a.sx) * pulse.progress;
          const py = a.sy + (b.sy - a.sy) * pulse.progress;
          ctx.beginPath();
          ctx.fillStyle = '#06b6d4';
          ctx.arc(px, py, 2.2 * ((a.scale + b.scale) * 0.5), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw 3D nodes sorted back-to-front
      for (let i = 0; i < NODE_COUNT; i++) {
        const p = projected[i];
        if (p.scale <= 0.15) continue;
        const r = Math.max(1, p.size * p.scale * 1.35);

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(0.85, p.scale * 0.75);
        ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2);
        ctx.fill();

        if (i % 5 === 0) {
          ctx.beginPath();
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = Math.min(0.3, p.scale * 0.25);
          ctx.arc(p.sx, p.sy, r * 2.6, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Ambient radial depth glows */}
      <div className="absolute -top-48 -left-48 w-[38rem] h-[38rem] rounded-full bg-violet-600/12 blur-[140px]" />
      <div className="absolute top-1/3 -right-48 w-[34rem] h-[34rem] rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="absolute -bottom-48 left-1/3 w-[36rem] h-[36rem] rounded-full bg-purple-600/10 blur-[150px]" />
      <canvas ref={canvasRef} className="w-full h-full block opacity-85" />
    </div>
  );
};
