import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isCoarse || reduced) return;

    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 hidden lg:block overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="w-72 h-72 rounded-full bg-gradient-to-tr from-violet-500/10 to-cyan-400/10 blur-3xl transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${pos.x - 144}px, ${pos.y - 144}px, 0)`,
        }}
      />
    </div>
  );
};
