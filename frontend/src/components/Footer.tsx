import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUp,
  Cpu,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sliders,
} from 'lucide-react';
import { ProfileConfig } from '../types/portfolio';

import { asset } from '../lib/asset';
interface FooterProps {
  profile: ProfileConfig;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#04050a]/95 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Column 1 */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={asset('/saurav-profile.jpg')}
                alt={profile.name}
                className="w-10 h-10 rounded-xl object-cover border border-violet-500/40"
              />
              <div>
                <h3 className="text-base font-bold text-white">{profile.name}</h3>
                <p className="text-xs text-cyan-400 font-mono">
                  {profile.professional_identity}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
              {profile.subheadline}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-violet-400" />
                {profile.location}
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-1.5 hover:text-cyan-300 transition"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                {profile.email}
              </a>
              <a
                href={`tel:${profile.phone}`}
                className="inline-flex items-center gap-1.5 hover:text-cyan-300 transition"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                {profile.phone}
              </a>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300">
              Flagship Systems
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <Link
                  to="/projects/clinical-risk-patient-outcome-intelligence-system"
                  className="hover:text-cyan-300 transition"
                >
                  Clinical Risk & Patient Outcome AI
                </Link>
              </li>
              <li>
                <Link
                  to="/projects/opspilot-ai-incident-intelligence-copilot"
                  className="hover:text-cyan-300 transition"
                >
                  OpsPilot AI — Incident Copilot
                </Link>
              </li>
              <li>
                <Link
                  to="/projects/autonomous-cyber-defense-system"
                  className="hover:text-cyan-300 transition"
                >
                  Autonomous Cyber Defense System
                </Link>
              </li>
              <li>
                <Link
                  to="/projects/ai-medical-chatbot"
                  className="hover:text-cyan-300 transition"
                >
                  AI Medical RAG Chatbot
                </Link>
              </li>
              <li>
                <Link
                  to="/projects/expense-tracker-mcp-server"
                  className="hover:text-cyan-300 transition"
                >
                  Expense Tracker MCP Server
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300">
              Links & Control
            </h4>
            <div className="flex flex-wrap gap-2">
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-200 transition"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-200 transition"
              >
                <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                <span>LinkedIn</span>
              </a>
              <a
                href={asset('/Saurav_Kumar_Resume.pdf')}
                download="Saurav_Kumar_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/30 text-xs text-violet-200 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Résumé PDF</span>
              </a>
              <Link
                to="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-xs text-cyan-200 transition"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Control Center</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-violet-400" />
            <span>
              © {new Date().getFullYear()} {profile.name}. Engineered with React, TypeScript, Tailwind, FastAPI & 3D Neural Canvas.
            </span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};

// "<footer> component for the portfolio website"
