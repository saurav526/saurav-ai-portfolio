import React from 'react';
import { motion } from 'framer-motion';
import {Activity,
  Award,
  BrainCircuit,
  Code2,
  Cpu,
  GraduationCap,
  Layers,
  Server,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';
import { PortfolioStats, ProfileConfig } from '../types/portfolio';
import { Tilt3DCard } from '../components/Tilt3DCard';
import { Section3DBackdrop } from '../components/Section3DBackdrop';

import { asset } from '../lib/asset';
interface AboutSectionProps {
  profile: ProfileConfig;
  stats: PortfolioStats;
}

const CORE_PILLARS = [
  {
    title: 'Data Science & Artificial Intelligence',
    desc: 'Exploratory data analysis, statistical feature engineering, and end-to-end analytical problem solving.',
    icon: BrainCircuit,
  },
  {
    title: 'Machine Learning & Deep Learning',
    desc: 'Benchmarking Logistic Regression, Random Forest, Gradient Boosting, Isolation Forest, and Graph Autoencoders.',
    icon: Cpu,
  },
  {
    title: 'Generative AI & LLM Applications',
    desc: 'Grounded generation with Hugging Face and Groq LLMs using custom anti-hallucination prompt engineering.',
    icon: Sparkles,
  },
  {
    title: 'Agentic AI & Multi-Agent Orchestration',
    desc: 'Stateful multi-agent workflows with LangGraph, LangChain, and deterministic tool-calling pipelines.',
    icon: Workflow,
  },
  {
    title: 'RAG Systems & Model Context Protocol (MCP)',
    desc: 'FAISS & TF-IDF cosine-similarity retrieval alongside FastMCP servers exposing live SQLite tools.',
    icon: Server,
  },
  {
    title: 'Backend Development & Deployment',
    desc: 'API-key-secured FastAPI microservices, SQLAlchemy ORM persistence, and Docker Compose containerization.',
    icon: Code2,
  },
  {
    title: 'Model Evaluation & Explainability (SHAP)',
    desc: 'ROC-AUC model selection, MLflow tracking, and patient-level SHAP feature attribution.',
    icon: ShieldCheck,
  },
  {
    title: 'Production-Oriented AI Applications',
    desc: 'Audit logging in PostgreSQL/SQLite, Prometheus /metrics exposition, Pytest suites, and deterministic fallbacks.',
    icon: Activity,
  },
];

export const AboutSection: React.FC<AboutSectionProps> = ({
  profile,
  stats,
}) => {
  const verifiedStats = [
    {
      label: 'Flagship AI & ML Systems',
      value: `${stats.flagship_projects}`,
      sub: 'End-to-End Repositories',
      icon: Layers,
    },
    {
      label: 'Technical Domains',
      value: `${stats.technical_domains}`,
      sub: 'ML, GenAI, Backend & MLOps',
      icon: BrainCircuit,
    },
    {
      label: 'Programming Languages',
      value: `${stats.programming_languages}`,
      sub: 'Python, SQL, C++, HTML',
      icon: Code2,
    },
    {
      label: 'Industry Virtual Internship',
      value: `${stats.internship_weeks} Wks`,
      sub: 'EduSkills • AICTE & Siemens',
      icon: Award,
    },
  ];

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <Section3DBackdrop variant="orbital" accent="cyan" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-mono text-cyan-300 mb-3">
            <span>01 // ABOUT ME & ENGINEERING PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Full-Lifecycle AI Engineering —{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
              From Raw Data to Explainable Decisions
            </span>
          </h2>
        </div>

        {/* Biography + Framed Portrait Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-14">
          {/* Framed Portrait Card */}
          <div className="lg:col-span-4">
            <Tilt3DCard intensity={10} className="h-full rounded-2xl">
              <div className="h-full rounded-2xl border border-white/10 bg-[#080c19]/90 p-5 flex flex-col justify-between backdrop-blur-xl">
                <div className="relative rounded-xl overflow-hidden border border-violet-500/30 aspect-[4/4.2]">
                  <img
                    src={asset('/saurav-profile.jpg')}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05060b] via-transparent to-transparent opacity-70" />
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/75 border border-white/15 backdrop-blur-md">
                    <div className="text-sm font-bold text-white">
                      {profile.name}
                    </div>
                    <div className="text-[11px] font-mono text-cyan-300">
                      {profile.education_degree} • {profile.education_duration}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <span className="inline-flex items-center gap-1.5 font-mono text-violet-300">
                    <GraduationCap className="w-4 h-4 text-cyan-400" />
                    MIT ADT University, Pune
                  </span>
                  <span className="text-emerald-400 font-mono">AI & DS</span>
                </div>
              </div>
            </Tilt3DCard>
          </div>

          {/* Biography + Factual Stats */}
          <div className="lg:col-span-8 flex flex-col justify-between gap-6">
            <Tilt3DCard intensity={6} className="rounded-2xl">
              <div className="rounded-2xl border border-white/10 bg-[#080c19]/90 p-6 sm:p-8 backdrop-blur-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                    Professional Biography
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Pune, Maharashtra, India
                  </span>
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  {profile.bio}
                </p>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Every system I build is designed with real-world operational rigor: pairing statistical and deep learning models with{' '}
                  <strong className="text-slate-200 font-medium">
                    SHAP explainability, MLflow tracking, FastAPI REST microservices, SQLAlchemy audit logs, Pytest verification,
                  </strong>{' '}
                  and deterministic fallbacks so applications remain reliable even when external LLM APIs are unavailable.
                </p>
              </div>
            </Tilt3DCard>

            {/* Verified Factual Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {verifiedStats.map((st, idx) => {
                const Icon = st.icon;
                return (
                  <Tilt3DCard key={idx} intensity={11} className="rounded-2xl">
                    <div className="h-full rounded-2xl border border-white/10 bg-[#080c19]/90 p-4 backdrop-blur-xl">
                      <div className="w-8 h-8 rounded-lg bg-violet-500/15 border border-violet-500/30 flex items-center justify-center mb-2.5">
                        <Icon className="w-4 h-4 text-cyan-300" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        {st.value}
                      </div>
                      <div className="text-xs font-semibold text-slate-200 mt-0.5">
                        {st.label}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                        {st.sub}
                      </div>
                    </div>
                  </Tilt3DCard>
                );
              })}
            </div>
          </div>
        </div>

        {/* 8 Technical Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CORE_PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                <Tilt3DCard intensity={9} className="h-full rounded-2xl">
                  <div className="h-full rounded-2xl border border-white/10 hover:border-violet-500/40 bg-white/[0.025] p-5 backdrop-blur-xl transition">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600/25 to-cyan-500/20 border border-white/15 flex items-center justify-center mb-3.5">
                      <Icon className="w-4 h-4 text-cyan-300" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1.5">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </Tilt3DCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
