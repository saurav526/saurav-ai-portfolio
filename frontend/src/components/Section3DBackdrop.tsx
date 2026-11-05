import React from 'react';
import { motion } from 'framer-motion';

interface Section3DBackdropProps {
  variant?: 'neural' | 'cyber' | 'orbital' | 'matrix' | 'prism';
  accent?: 'violet' | 'cyan' | 'purple' | 'emerald';
}

export const Section3DBackdrop: React.FC<Section3DBackdropProps> = ({
  variant = 'orbital',
  accent = 'violet',
}) => {
  const borderAccent =
    accent === 'cyan'
      ? 'border-cyan-500/20'
      : accent === 'emerald'
      ? 'border-emerald-500/20'
      : accent === 'purple'
      ? 'border-purple-500/20'
      : 'border-violet-500/20';

  const glowAccent =
    accent === 'cyan'
      ? 'from-cyan-500/10 via-violet-500/5 to-transparent'
      : accent === 'emerald'
      ? 'from-emerald-500/10 via-cyan-500/5 to-transparent'
      : 'from-violet-500/10 via-cyan-500/5 to-transparent';

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none"
      style={{ perspective: '1200px' }}
      aria-hidden="true"
    >
      {/* Volumetric ambient beam */}
      <motion.div
        animate={{
          opacity: [0.35, 0.65, 0.35],
          scale: [0.96, 1.05, 0.96],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute -top-24 left-1/2 -translate-x-1/2 w-[48rem] h-[22rem] rounded-full bg-gradient-to-b ${glowAccent} blur-3xl`}
      />

      {/* Rotating 3D Perspective Orbital Gyroscope Ring (Left/Right depending on variant) */}
      <motion.div
        animate={{
          rotateX: [58, 66, 58],
          rotateY: [-18, 18, -18],
          rotateZ: [0, 360],
        }}
        transition={{
          rotateZ: { duration: 34, repeat: Infinity, ease: 'linear' },
          rotateX: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          rotateY: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className={`hidden md:block absolute ${
          variant === 'cyber' || variant === 'matrix'
            ? '-left-28 top-16'
            : '-right-28 top-12'
        } w-[26rem] h-[26rem] rounded-full border ${borderAccent} border-dashed opacity-50`}
      >
        <div
          className={`absolute inset-8 rounded-full border ${borderAccent} opacity-60`}
          style={{ transform: 'translateZ(35px)' }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_16px_#06b6d4]"
          style={{ transform: 'translateZ(50px)' }}
        />
      </motion.div>

      {/* Floating 3D Wireframe Prism / Isometric Cube */}
      <motion.div
        animate={{
          y: [-16, 16, -16],
          rotateX: [15, 35, 15],
          rotateY: [0, 180, 360],
        }}
        transition={{
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          rotateX: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
          rotateY: { duration: 24, repeat: Infinity, ease: 'linear' },
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className={`hidden lg:flex items-center justify-center absolute ${
          variant === 'cyber' || variant === 'matrix'
            ? 'right-12 bottom-16'
            : 'left-10 bottom-14'
        } w-28 h-28 rounded-2xl border ${borderAccent} bg-white/[0.01] backdrop-blur-[1px] opacity-45`}
      >
        <div
          className={`w-16 h-16 rounded-xl border ${borderAccent}`}
          style={{ transform: 'translateZ(28px) rotate(45deg)' }}
        />
        <div
          className="w-2.5 h-2.5 rounded-full bg-violet-400/80 shadow-[0_0_12px_#8b5cf6]"
          style={{ transform: 'translateZ(48px)' }}
        />
      </motion.div>

      {/* Subtle animated horizontal scanline pulse */}
      <motion.div
        animate={{ y: ['0%', '100%'] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent"
      />
    </div>
  );
};
