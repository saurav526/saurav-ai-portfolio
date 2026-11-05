import React, { useRef, useState } from 'react';

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
}

export const Tilt3DCard: React.FC<Tilt3DCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(139, 92, 246, 0.25)',
  intensity = 10,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState(
    'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  );
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;

    setTransform(
      `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(
        2
      )}deg) scale3d(1.015, 1.015, 1.015)`
    );
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setTransform(
      'perspective(1100px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    );
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        transition:
          glare.opacity === 0
            ? 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)'
            : 'transform 0.08s ease-out',
      }}
      className={`relative group ${className}`}
    >
      {/* Dynamic 3D Specular Spotlight Glare */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-20 transition-opacity duration-300"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(420px circle at ${glare.x}% ${glare.y}%, ${glowColor}, transparent 65%)`,
        }}
      />
      <div
        style={{ transform: 'translateZ(18px)', transformStyle: 'preserve-3d' }}
        className="relative z-10 h-full"
      >
        {children}
      </div>
    </div>
  );
};
