
import React from 'react';
import {
  Code2,
  BrainCircuit,
  Sparkles,
  Layers,
  Server,
  Database,
  Cloud,
  BarChart3,
  ArrowUpRight,
} from 'lucide-react';
import { Skill } from '../types/portfolio';
import { Section3DBackdrop } from '../components/Section3DBackdrop';

interface SkillsSectionProps {
  skills: Skill[];
}

const categories = [
  {
    number: '01',
    name: 'Programming',
    description: 'Core programming languages, problem solving, and software development.',
    icon: Code2,
    color: 'from-violet-500 to-purple-500',
  },
  {
    number: '02',
    name: 'AI and Machine Learning',
    description: 'Machine learning, deep learning, NLP, computer vision, and model development.',
    icon: BrainCircuit,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    number: '03',
    name: 'Generative AI and Agentic AI',
    description: 'LLMs, RAG, AI agents, multi-agent systems, LLM evaluation, and AI security.',
    icon: Sparkles,
    color: 'from-fuchsia-500 to-violet-500',
  },
  {
    number: '04',
    name: 'Frameworks and Libraries',
    description: 'Libraries and frameworks for AI engineering, data science, and application development.',
    icon: Layers,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    number: '05',
    name: 'Backend Development',
    description: 'API development, backend architecture, authentication, and system integration.',
    icon: Server,
    color: 'from-emerald-500 to-teal-500',
  },
  {
    number: '06',
    name: 'Databases',
    description: 'Relational databases, NoSQL databases, data modelling, and database management.',
    icon: Database,
    color: 'from-orange-500 to-amber-500',
  },
  {
    number: '07',
    name: 'Cloud and MLOps',
    description: 'Cloud infrastructure, model deployment, CI/CD, monitoring, and LLMOps.',
    icon: Cloud,
    color: 'from-sky-500 to-indigo-500',
  },
  {
    number: '08',
    name: 'Analytics and Development Tools',
    description: 'Data visualization, business intelligence, version control, and development tools.',
    icon: BarChart3,
    color: 'from-pink-500 to-rose-500',
  },
];

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills }) => {
  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      <Section3DBackdrop variant="matrix" accent="purple" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-mono text-cyan-300 mb-4">
            <span>02 // TECHNICAL ARSENAL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>

          <p className="text-sm text-slate-400 mt-3 max-w-2xl">
            My technical capabilities span programming, intelligent systems,
            AI engineering, backend development, cloud infrastructure,
            and data analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((category, index) => {
            const Icon = category.icon;

            const count = skills.filter(
              (skill) => skill.category === category.name
            ).length;

            return (
              <div
                key={category.number}
                className="group relative rounded-2xl border border-white/10 bg-[#080c19]/85 p-6 backdrop-blur-xl hover:border-cyan-400/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono text-slate-500">
                    DOMAIN // {category.number}
                  </span>

                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-300 transition" />
                </div>

                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} p-[1px] mb-5`}
                >
                  <div className="w-full h-full rounded-xl bg-[#080c19] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-cyan-300" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-3 leading-snug">
                  {category.name}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed min-h-[60px]">
                  {category.description}
                </p>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">
                    TECHNICAL DOMAIN
                  </span>

                  <span className="text-[10px] font-mono text-cyan-300">
                    {count} technologies
                  </span>
                </div>

                <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-violet-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-xs font-mono text-slate-500 text-center">
          08 TECHNICAL DOMAINS // {skills.length} TECHNOLOGIES
        </div>

      </div>
    </section>
  );
};

// "SkillsSection" component that displays a categorized overview of technical skills, including programming, AI, frameworks, backend development, databases, cloud, and analytics. Each category shows the number of technologies associated with it and provides a brief description. The section features a 3D backdrop and interactive hover effects for an engaging user experience.