import React from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { Experience } from '../types/portfolio';
import { Tilt3DCard } from '../components/Tilt3DCard';
import { Section3DBackdrop } from '../components/Section3DBackdrop';
interface ExperienceSectionProps {
  experiences: Experience[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
}) => {
  return (
    <section id="experience" className="relative py-24 overflow-hidden">
      <Section3DBackdrop variant="orbital" accent="violet" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-mono text-cyan-300 mb-3">
            <span>03 // PROFESSIONAL EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Applied Data Science &{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
              Industry Collaboration Timeline
            </span>
          </h2>
        </div>

        <div className="relative pl-6 sm:pl-10 border-l-2 border-violet-500/30 space-y-10">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="relative"
            >
              {/* Glowing Timeline Node */}
              <div className="absolute -left-[33px] sm:-left-[49px] top-6 w-4 h-4 rounded-full bg-cyan-400 border-4 border-[#05060b] shadow-[0_0_16px_#06b6d4]" />

              <Tilt3DCard intensity={7} className="rounded-3xl">
                <div className="rounded-3xl border border-white/15 bg-[#080c19]/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 mb-6 border-b border-white/10">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5 mb-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-600/20 border border-violet-500/40 text-xs font-mono text-violet-200">
                          <Briefcase className="w-3.5 h-3.5 text-cyan-300" />
                          {exp.mode}
                        </span>
                        {exp.collaboration && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-xs font-mono text-cyan-200">
                            <Sparkles className="w-3.5 h-3.5" />
                            {exp.collaboration}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        {exp.role}{' '}
                        <span className="text-violet-400">
                          — {exp.organization}
                        </span>
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-200">
                        <Calendar className="w-4 h-4 text-cyan-400" />
                        {exp.duration}
                      </span>
                      {exp.certificate_url && (
                        <a
                          href={exp.certificate_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/35 text-xs font-medium text-emerald-200 transition"
                        >
                          <span>Verify Certificate</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-5">
                    {exp.summary}
                  </p>

                  {/* Key Responsibilities & Achievements */}
                  <div className="space-y-3 mb-6">
                    {exp.highlights.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 text-xs sm:text-sm text-slate-200"
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Applied Technical Skills */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                      Core Internship Technical Domains & Tools Applied:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills_applied.map((sk) => (
                        <span
                          key={sk}
                          className="px-3 py-1 rounded-lg bg-violet-500/10 border border-violet-500/25 text-xs font-mono text-cyan-200"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Tilt3DCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
