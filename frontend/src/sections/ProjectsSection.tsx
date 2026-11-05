
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Github,
  Layers,
  Sparkles,
  Workflow,
} from 'lucide-react';
import { Project } from '../types/portfolio';
import { Tilt3DCard } from '../components/Tilt3DCard';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram';
import { Section3DBackdrop } from '../components/Section3DBackdrop';

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedArchSlug, setExpandedArchSlug] = useState<string | null>(null);

  // Always display projects according to their configured display order.
  const sortedProjects = useMemo(() => {
    return [...projects].sort(
      (a, b) => a.display_order - b.display_order
    );
  }, [projects]);

  const categories = useMemo(() => {
    return [
      'All',
      ...Array.from(
        new Set(sortedProjects.map((project) => project.category))
      ).sort((a, b) => a.localeCompare(b)),
    ];
  }, [sortedProjects]);

  const filteredProjects =
    selectedCategory === 'All'
      ? sortedProjects
      : sortedProjects.filter(
          (project) => project.category === selectedCategory
        );

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <Section3DBackdrop variant="cyber" accent="cyan" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-mono text-cyan-300 mb-3">
              <span>04 // FLAGSHIP ENGINEERING SYSTEMS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              End-to-End{' '}
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                AI, ML, RAG & Agentic Case Studies
              </span>
            </h2>

            <p className="text-sm text-slate-400 mt-2">
              Every project includes problem formulation, system architecture
              diagrams, technical workflows, and GitHub source repositories.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]'
                    : 'bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-slate-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Showcase */}
        <div className="space-y-10">
          {filteredProjects.map((project, index) => {
            const isArchOpen = expandedArchSlug === project.slug;

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
              >
                <Tilt3DCard
                  intensity={5}
                  glowColor={`${project.accent_color}33`}
                  className="rounded-3xl"
                >
                  <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#0a0f20]/95 via-[#070a15]/95 to-[#05070e]/95 p-6 sm:p-8 lg:p-10 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.75)]">
                    {/* Top Meta Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-mono font-semibold border"
                          style={{
                            backgroundColor: `${project.accent_color}20`,
                            borderColor: `${project.accent_color}60`,
                            color: '#e2e8f0',
                          }}
                        >
                          PROJECT {String(project.display_order).padStart(2, '0')}{' '}
                          // {project.category}
                        </span>

                        <span className="text-xs font-mono text-cyan-300">
                          {project.subtitle}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5">
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 text-xs font-medium text-slate-200 transition"
                          >
                            <Github className="w-4 h-4 text-violet-400" />
                            <span>GitHub Repository</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}

                        <Link
                          to={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-xs font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] transition"
                        >
                          <span>Full Architecture & Case Study</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>

                    {/* Title & Overview */}
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
                      {project.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                      {project.overview}
                    </p>

                    {/* Disclaimer */}
                    {project.disclaimer && (
                      <div className="mb-6 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 flex items-start gap-3">
                        <AlertTriangle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-100/90 leading-relaxed">
                          {project.disclaimer}
                        </p>
                      </div>
                    )}

                    {/* Problem, Solution & Features */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-7">
                      <div className="lg:col-span-5 space-y-4">
                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                          <div className="text-xs font-mono uppercase tracking-wider text-violet-300 mb-1.5 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                            Problem Statement
                          </div>

                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {project.problem_statement}
                          </p>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                          <div className="text-xs font-mono uppercase tracking-wider text-cyan-300 mb-1.5 flex items-center gap-1.5">
                            <Workflow className="w-3.5 h-3.5 text-violet-400" />
                            Proposed Solution
                          </div>

                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {project.proposed_solution}
                          </p>
                        </div>
                      </div>

                      <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-white/[0.02] p-5 flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-mono uppercase tracking-wider text-emerald-300 mb-3 flex items-center gap-1.5">
                            <Cpu className="w-3.5 h-3.5" />
                            Key Engineering Features & Capabilities
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {project.key_features.map((feature, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-2 text-xs text-slate-200 leading-relaxed"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Technology Stack */}
                        <div className="mt-5 pt-4 border-t border-white/10">
                          <div className="text-[11px] font-mono text-slate-400 mb-2">
                            TECHNOLOGY STACK:
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {project.tech_stack.map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-1 rounded-lg bg-violet-500/15 border border-violet-500/30 text-xs font-mono text-cyan-200"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Architecture Diagram Toggle */}
                    <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                      <button
                        type="button"
                        aria-expanded={isArchOpen}
                        onClick={() =>
                          setExpandedArchSlug(
                            isArchOpen ? null : project.slug
                          )
                        }
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/15 text-xs font-mono text-cyan-300 transition"
                      >
                        <Layers className="w-4 h-4 text-violet-400" />

                        <span>
                          {isArchOpen
                            ? 'Hide Interactive Architecture Diagram'
                            : 'Inspect Interactive System Architecture Diagram'}
                        </span>
                      </button>

                      <Link
                        to={`/projects/${project.slug}`}
                        className="text-xs font-mono text-violet-300 hover:text-cyan-300 inline-flex items-center gap-1"
                      >
                        <span>
                          Open Dedicated Case Study Page (/projects/
                          {project.slug})
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {isArchOpen && (
                      <div className="mt-5">
                        <ArchitectureDiagram
                          nodes={project.architecture_nodes}
                          edges={project.architecture_edges}
                          accentColor={project.accent_color}
                        />
                      </div>
                    )}
                  </div>
                </Tilt3DCard>
              </motion.div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 rounded-2xl border border-white/10 bg-white/[0.02]">
            <Layers className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <p className="text-sm text-slate-300">
              No projects found in this category.
            </p>
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className="mt-3 text-xs text-cyan-300 hover:text-violet-300 transition"
            >
              Show all projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
