import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setProgress(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));
      }
    };
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-[60] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-400 shadow-[0_0_12px_#06b6d4]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
