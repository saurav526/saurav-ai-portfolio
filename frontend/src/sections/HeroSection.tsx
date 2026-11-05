import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {ArrowRight,
  Bot,
  BrainCircuit,
  Cpu,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Network,
  Sparkles,
} from 'lucide-react';
import { ProfileConfig } from '../types/portfolio';
import { Tilt3DCard } from '../components/Tilt3DCard';
import { Section3DBackdrop } from '../components/Section3DBackdrop';
import { asset } from '../lib/asset';

interface HeroSectionProps {
  profile: ProfileConfig;
  onOpenAssistant: () => void;
}

const ROLES = [
  'Data Scientist',
  'AI Engineer',
  'Machine Learning Engineer',
  'Generative AI Developer',
  'Agentic AI Systems Builder',
];

const ORBIT_NODES = [
  { label: 'LangGraph', sub: 'Multi-Agent', angle: 0, color: 'text-violet-300 border-violet-500/40' },
  { label: 'RAG + FAISS', sub: 'Vector Search', angle: 60, color: 'text-cyan-300 border-cyan-500/40' },
  { label: 'SHAP XAI', sub: 'Explainable ML', angle: 120, color: 'text-purple-300 border-purple-500/40' },
  { label: 'FastMCP', sub: 'MCP Tool Server', angle: 180, color: 'text-emerald-300 border-emerald-500/40' },
  { label: 'FastAPI', sub: 'MLOps Serving', angle: 240, color: 'text-blue-300 border-blue-500/40' },
  { label: 'Graph ML', sub: 'Autoencoders + RL', angle: 300, color: 'text-pink-300 border-pink-500/40' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onOpenAssistant,
}) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const nodeTimer = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % ORBIT_NODES.length);
    }, 2200);
    return () => clearInterval(nodeTimer);
  }, []);

  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4rem)] pt-24 pb-16 flex items-center overflow-hidden"
    >
      <Section3DBackdrop variant="neural" accent="violet" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Core Identity & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Availability Badge + Location */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex flex-wrap items-center gap-2.5"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/15 backdrop-blur-md text-xs">
                <span
                  className={`w-2 h-2 rounded-full ${
                    profile.availability_active
                      ? 'bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse'
                      : 'bg-amber-400'
                  }`}
                />
                <span className="font-medium text-slate-200">
                  {profile.availability_status}
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-xs text-violet-200 font-mono">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{profile.location}</span>
              </div>
            </motion.div>

            {/* Name & Animated Technical Role Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono uppercase tracking-[0.22em] text-cyan-400">
                  {profile.name}
                </span>
                <span className="h-px w-12 bg-gradient-to-r from-cyan-400 to-transparent" />
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-violet-500/20 text-violet-200 border border-violet-500/35"
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </div>

              <h1 className="text-3xl sm:text-5xl xl:text-[3.35rem] font-extrabold tracking-tight text-white leading-[1.12]">
                Engineering Intelligence.{' '}
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                  Building Systems That Think.
                </span>
              </h1>
            </motion.div>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="text-sm sm:text-base text-slate-300/95 max-w-2xl leading-relaxed"
            >
              {profile.subheadline}
            </motion.p>

            {/* Professional Identity Tag Bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="flex flex-wrap gap-2 text-xs font-mono text-slate-300"
            >
              {[
                'AI Engineer',
                'Data Scientist',
                'Machine Learning Engineer',
                'Generative AI Developer',
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Primary CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <button
                type="button"
                onClick={() => scrollToSection('#projects')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white shadow-[0_0_30px_rgba(139,92,246,0.45)] transition transform hover:-translate-y-0.5"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={asset('/Saurav_Kumar_Resume.pdf')}
                download="Saurav_Kumar_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white backdrop-blur-md transition transform hover:-translate-y-0.5"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download Resume</span>
              </a>

              <button
                type="button"
                onClick={() => scrollToSection('#contact')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/35 text-cyan-200 transition transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Let's Connect</span>
              </button>
            </motion.div>

            {/* Social & Assistant Quick Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.36 }}
              className="pt-2 flex flex-wrap items-center gap-3"
            >
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs text-slate-300 hover:text-white transition"
              >
                <Github className="w-4 h-4 text-violet-400" />
                <span>github.com/saurav526</span>
              </a>

              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs text-slate-300 hover:text-white transition"
              >
                <Linkedin className="w-4 h-4 text-cyan-400" />
                <span>LinkedIn</span>
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs text-slate-300 hover:text-white transition"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>Email</span>
              </a>

              <button
                type="button"
                onClick={onOpenAssistant}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-violet-500/15 hover:bg-violet-500/25 border border-violet-500/35 text-xs text-violet-200 transition"
              >
                <Bot className="w-4 h-4 text-cyan-300" />
                <span>Ask Saurav AI</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Interactive 3D Neural Core + Framed Portrait Stage */}
          <div className="lg:col-span-5">
            <Tilt3DCard
              intensity={12}
              glowColor="rgba(6, 182, 212, 0.28)"
              className="rounded-3xl"
            >
              <div className="relative rounded-3xl border border-white/15 bg-gradient-to-b from-[#0b1022]/90 via-[#070a15]/95 to-[#05060b]/95 p-6 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden">
                {/* 3D Rotating Holographic Rings Behind Portrait */}
                <div
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                  style={{ perspective: '900px' }}
                >
                  <motion.div
                    animate={{ rotateZ: 360, rotateX: [55, 65, 55] }}
                    transition={{
                      rotateZ: { duration: 22, repeat: Infinity, ease: 'linear' },
                      rotateX: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    className="w-72 h-72 rounded-full border border-cyan-400/25 border-dashed"
                  />
                  <motion.div
                    animate={{ rotateZ: -360, rotateY: [45, 60, 45] }}
                    transition={{
                      rotateZ: { duration: 28, repeat: Infinity, ease: 'linear' },
                      rotateY: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    className="absolute w-80 h-80 rounded-full border border-violet-500/25"
                  />
                </div>

                {/* Top Telemetry Header */}
                <div className="relative z-10 flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                    <span className="ml-1 text-[11px] font-mono text-slate-400">
                      NEURAL_CORE://SAURAV_KUMAR.AI
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    B.Tech AI & DS â€¢ 2028
                  </span>
                </div>

                {/* Central Framed Portrait + 3D Orbiting Architecture Nodes */}
                <div className="relative z-10 flex flex-col items-center py-2">
                  <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-2xl p-1 bg-gradient-to-tr from-violet-500 via-cyan-400 to-purple-500 shadow-[0_0_40px_rgba(139,92,246,0.45)]">
                    <img
                      src={asset('/saurav-profile.jpg')}
                      alt="Saurav Kumar â€” AI Engineer & Data Scientist"
                      className="w-full h-full object-cover object-center rounded-[14px]"
                    />
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-[#070a14] border border-cyan-400/50 text-[11px] font-mono text-cyan-300 shadow-lg flex items-center gap-1.5">
                      <BrainCircuit className="w-3.5 h-3.5 text-violet-400" />
                      <span>Saurav Kumar â€¢ AI Architect</span>
                    </div>
                  </div>

                  {/* Interactive 3D Neural Architecture Nodes Grid */}
                  <div className="w-full mt-7 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {ORBIT_NODES.map((node, idx) => {
                      const isCurrent = idx === activeNode;
                      return (
                        <button
                          key={node.label}
                          type="button"
                          onMouseEnter={() => setActiveNode(idx)}
                          onClick={() => scrollToSection('#projects')}
                          className={`text-left p-2.5 rounded-xl border transition-all ${
                            isCurrent
                              ? 'bg-violet-600/25 border-cyan-400/60 shadow-[0_0_18px_rgba(6,182,212,0.25)] scale-[1.03]'
                              : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">
                              {node.label}
                            </span>
                            <Network
                              className={`w-3 h-3 ${
                                isCurrent ? 'text-cyan-300' : 'text-slate-500'
                              }`}
                            />
                          </div>
                          <div className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
                            {node.sub}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Bottom Live Pipeline Telemetry Bar */}
                  <div className="w-full mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 text-emerald-300">
                      <Cpu className="w-3.5 h-3.5" />
                      <span>5 End-to-End AI Systems Ready</span>
                    </span>
                    <span className="text-cyan-300">SHAP â€¢ RAG â€¢ MCP</span>
                  </div>
                </div>
              </div>
            </Tilt3DCard>
          </div>
        </div>
      </div>
    </section>
  );
};
