// file: frontend/src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Bot,
  Box,
  Download,
  Menu,
  Moon,
  Sliders,
  Sun,
  Terminal,
  X,
} from 'lucide-react';
import { ProfileConfig } from '../types/portfolio';

import { asset } from '../lib/asset';
interface NavbarProps {
  profile: ProfileConfig;
  sceneMode: 'auto' | 'sphere' | 'lattice' | 'helix' | 'torus';
  onChangeSceneMode: (mode: 'auto' | 'sphere' | 'lattice' | 'helix' | 'torus') => void;
  onOpenAssistant: () => void;
  lightMode: boolean;
  onToggleLightMode: () => void;
}

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Terminal', href: '#terminal' },
  { label: 'GitHub', href: '#github' },
  { label: 'Credentials', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  sceneMode,
  onChangeSceneMode,
  onOpenAssistant,
  lightMode,
  onToggleLightMode,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cycleSceneMode = () => {
    const order: ('auto' | 'sphere' | 'lattice' | 'helix' | 'torus')[] = [
      'auto',
      'sphere',
      'lattice',
      'helix',
      'torus',
    ];
    const next = order[(order.indexOf(sceneMode) + 1) % order.length];
    onChangeSceneMode(next);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-[#05060b]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand Identity */}
        <Link
          to="/"
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-violet-500/50 shadow-[0_0_20px_rgba(139,92,246,0.35)] group-hover:scale-105 transition-transform">
            <img
              src={asset('/saurav-profile.jpg')}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
            <span
              className={`absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full border border-black ${
                profile.availability_active ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
            />
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
              <span>{profile.name}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-violet-500/20 text-cyan-300 border border-violet-500/30">
                AI.ENG
              </span>
            </div>
            <div className="text-[11px] text-slate-400 hidden sm:block">
              Data Science • ML • GenAI & Agentic Systems
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => handleNavClick(item.href)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-2">
          {/* 3D Background Geometry Switcher */}
          <button
            type="button"
            onClick={cycleSceneMode}
            title="Switch 3D Background Geometry"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-cyan-300 transition"
          >
            <Box className="w-3.5 h-3.5 text-violet-400" />
            <span className="uppercase">3D: {sceneMode}</span>
          </button>

          {/* Theme Contrast Toggle */}
          <button
            type="button"
            onClick={onToggleLightMode}
            title="Toggle Ambient Contrast Mode"
            aria-label="Toggle Ambient Contrast Mode"
            className="p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white transition"
          >
            {lightMode ? (
              <Moon className="w-3.5 h-3.5 text-violet-300" />
            ) : (
              <Sun className="w-3.5 h-3.5 text-cyan-300" />
            )}
          </button>

          {/* Saurav AI Assistant Trigger */}
          <button
            type="button"
            onClick={onOpenAssistant}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/40 text-violet-200 transition"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-300" />
            <span>Saurav AI</span>
          </button>

          {/* Open Control Dashboard (No Login Required!) */}
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 text-slate-200 transition"
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Dashboard</span>
          </Link>

          {/* Resume Download */}
          <a
            href={asset('/Saurav_Kumar_Resume.pdf')}
            download="Saurav_Kumar_Resume.pdf"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Résumé</span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-2 xl:hidden">
          <button
            type="button"
            onClick={onOpenAssistant}
            className="md:hidden inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-violet-600/25 border border-violet-500/40 text-violet-200"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-300" />
            <span>AI</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
            className="p-2 rounded-lg border border-white/10 bg-white/5 text-slate-200"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="xl:hidden border-b border-white/10 bg-[#070a14]/95 backdrop-blur-2xl px-4 pt-3 pb-5 space-y-2">
          <div className="grid grid-cols-2 gap-1.5">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNavClick(item.href)}
                className="text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:bg-white/10"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={cycleSceneMode}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-cyan-300"
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D Mode: {sceneMode}</span>
            </button>
            <Link
              to="/admin"
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-slate-200"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Control Dashboard</span>
            </Link>
            <a
              href={asset('/Saurav_Kumar_Resume.pdf')}
              download="Saurav_Kumar_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-violet-600 to-cyan-600 text-white"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Résumé</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
