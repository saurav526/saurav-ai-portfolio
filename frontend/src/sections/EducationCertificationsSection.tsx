import React from 'react';
import {Award,
  BookOpen,
  Calendar,
  ExternalLink,
  GraduationCap,
  MapPin,
} from 'lucide-react';
import { Certification, ProfileConfig } from '../types/portfolio';
import { Tilt3DCard } from '../components/Tilt3DCard';
import { Section3DBackdrop } from '../components/Section3DBackdrop';

interface EducationCertificationsSectionProps {
  profile: ProfileConfig;
  certifications: Certification[];
}

export const EducationCertificationsSection: React.FC<
  EducationCertificationsSectionProps
> = ({ profile, certifications }) => {
  return (
    <section id="education" className="relative py-24 overflow-hidden">
      <Section3DBackdrop variant="prism" accent="violet" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-mono text-cyan-300 mb-3">
            <span>07 // ACADEMIC FOUNDATION & CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education &{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
              Verified Certifications Gallery
            </span>
          </h2>
        </div>

        {/* Education Featured Card */}
        <div className="mb-14">
          <Tilt3DCard intensity={6} className="rounded-3xl">
            <div className="rounded-3xl border border-white/15 bg-gradient-to-r from-[#090d1d]/95 via-[#070a15]/95 to-[#090d1d]/95 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-violet-600/20 border border-violet-500/40 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-7 h-7 text-cyan-300" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
                      Undergraduate Engineering Degree
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      {profile.education_degree}
                    </h3>
                    <div className="text-sm sm:text-base font-medium text-violet-300 mt-0.5">
                      {profile.education_institution}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-300">
                      <span className="inline-flex items-center gap-1.5 font-mono">
                        <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                        Academic Focus: {profile.education_focus}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-mono">
                        <MapPin className="w-3.5 h-3.5 text-violet-400" />
                        Pune, Maharashtra, India
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-500/15 border border-violet-500/35 text-xs font-mono font-semibold text-cyan-200">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    {profile.education_duration}
                  </span>
                </div>
              </div>
            </div>
          </Tilt3DCard>
        </div>

        {/* Certifications Gallery Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            <span>Professional Certifications ({certifications.length})</span>
          </h3>

          {profile.certifications_drive_url && (
            <a
              href={profile.certifications_drive_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/35 text-xs font-medium text-emerald-200 transition"
            >
              <span>Open Official Certificate Verification Drive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* 6 Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert) => (
            <Tilt3DCard
              key={cert.id}
              intensity={10}
              className="h-full rounded-2xl"
            >
              <div className="h-full rounded-2xl border border-white/10 hover:border-violet-400/40 bg-[#080c19]/85 p-5 backdrop-blur-xl flex flex-col justify-between transition">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-violet-500/15 text-cyan-300 border border-violet-500/30">
                      {cert.domain}
                    </span>
                    <Award className="w-4 h-4 text-violet-400" />
                  </div>

                  <h4 className="text-base font-bold text-white mb-2">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {cert.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cert.skills_covered.map((sk) => (
                      <span
                        key={sk}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>

                  {cert.verification_url && (
                    <a
                      href={cert.verification_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-cyan-300 hover:text-cyan-200 transition"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </Tilt3DCard>
          ))}
        </div>
      </div>
    </section>
  );
};
