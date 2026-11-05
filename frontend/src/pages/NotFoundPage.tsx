import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { Section3DBackdrop } from '../components/Section3DBackdrop';

export const NotFoundPage: React.FC = () => {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden z-10">
      <Section3DBackdrop variant="neural" accent="violet" />
      <div className="relative z-10 text-center max-w-md rounded-3xl border border-white/15 bg-[#080c19]/90 p-8 backdrop-blur-2xl shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-violet-500/20 border border-violet-500/40 flex items-center justify-center mx-auto mb-4">
          <Compass className="w-7 h-7 text-cyan-300" />
        </div>
        <div className="text-4xl font-extrabold text-white mb-2">404</div>
        <h1 className="text-lg font-bold text-cyan-300 mb-2">
          Neural Coordinates Not Found
        </h1>
        <p className="text-xs text-slate-400 leading-relaxed mb-6">
          The requested route does not exist in Saurav Kumar's portfolio architecture.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-xs font-semibold text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Main Portfolio</span>
        </Link>
      </div>
    </main>
  );
};

// "NotFoundPage" component that displays a 404 error message with a futuristic theme, indicating that the requested route does not exist in the portfolio architecture. It includes a link to return to the main portfolio page.
