import React, { useEffect, useState } from 'react';
import {ArrowUpRight,
  Code2,
  GitFork,
  Github,
  RefreshCw,
  Star,
} from 'lucide-react';
import { GitHubProfileData } from '../types/portfolio';
import { fetchGitHubProfile } from '../services/api';
import { FALLBACK_GITHUB_DATA } from '../data/portfolioData';
import { Tilt3DCard } from '../components/Tilt3DCard';
import { Section3DBackdrop } from '../components/Section3DBackdrop';

import { asset } from '../lib/asset';
export const GitHubSection: React.FC = () => {
  const [ghData, setGhData] = useState<GitHubProfileData>(FALLBACK_GITHUB_DATA);
  const [loading, setLoading] = useState<boolean>(true);

  const loadGitHub = async () => {
    setLoading(true);
    const data = await fetchGitHubProfile();
    setGhData(data);
    setLoading(false);
  };

  useEffect(() => {
    loadGitHub();
  }, []);

  const totalLangCount = Object.values(ghData.languages).reduce(
    (acc, v) => acc + v,
    0
  );

  return (
    <section id="github" className="relative py-24 overflow-hidden">
      <Section3DBackdrop variant="orbital" accent="cyan" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-mono text-cyan-300 mb-3">
              <span>06 // OPEN-SOURCE & GITHUB ECOSYSTEM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Public Repository{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent">
                Engineering Showcase
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={loadGitHub}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-slate-300 transition"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 text-cyan-400 ${
                  loading ? 'animate-spin' : ''
                }`}
              />
              <span>Sync API</span>
            </button>

            <a
              href="https://github.com/saurav526"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-xs font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] transition"
            >
              <Github className="w-4 h-4" />
              <span>@saurav526</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Profile Overview Card + Language Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          <div className="lg:col-span-7">
            <Tilt3DCard intensity={7} className="h-full rounded-2xl">
              <div className="h-full rounded-2xl border border-white/10 bg-[#080c19]/90 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <img
                    src={ghData.profile.avatar_url || asset('/saurav-profile.jpg')}
                    alt={ghData.profile.username}
                    className="w-16 h-16 rounded-2xl object-cover border border-violet-500/40"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-white">
                        {ghData.profile.name}
                      </h3>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-violet-500/20 text-cyan-300 border border-violet-500/30">
                        @{ghData.profile.username}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 max-w-md">
                      {ghData.profile.bio}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] font-mono text-slate-400">
                      <span>{ghData.profile.location}</span>
                      {typeof ghData.profile.public_repos === 'number' && (
                        <span>• {ghData.profile.public_repos} Public Repos</span>
                      )}
                      {typeof ghData.profile.followers === 'number' && (
                        <span>• {ghData.profile.followers} Followers</span>
                      )}
                    </div>
                  </div>
                </div>

                <a
                  href={ghData.profile.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-xs font-medium text-white transition"
                >
                  <span>View GitHub Profile</span>
                  <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                </a>
              </div>
            </Tilt3DCard>
          </div>

          <div className="lg:col-span-5">
            <Tilt3DCard intensity={7} className="h-full rounded-2xl">
              <div className="h-full rounded-2xl border border-white/10 bg-[#080c19]/90 p-6 backdrop-blur-xl flex flex-col justify-between">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-violet-400" />
                    Repository Language Distribution
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {ghData.source === 'github_live_api'
                      ? 'Live GitHub API'
                      : 'Verified Snapshot'}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {Object.entries(ghData.languages).map(([lang, count]) => {
                    const pct =
                      totalLangCount > 0
                        ? Math.round((count / totalLangCount) * 100)
                        : 25;
                    return (
                      <div key={lang} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium text-slate-200">
                            {lang}
                          </span>
                          <span className="font-mono text-slate-400">
                            {pct}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Tilt3DCard>
          </div>
        </div>

        {/* Clickable Repository Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ghData.repositories.map((repo) => (
            <Tilt3DCard
              key={repo.name}
              intensity={10}
              className="h-full rounded-2xl"
            >
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="h-full rounded-2xl border border-white/10 hover:border-cyan-400/50 bg-[#080c19]/85 p-5 backdrop-blur-xl flex flex-col justify-between transition group block"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4 text-violet-400 shrink-0" />
                      <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition break-all">
                        {repo.name}
                      </h3>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-300 shrink-0 transition" />
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {repo.description}
                  </p>

                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {repo.topics.slice(0, 5).map((topic) => (
                        <span
                          key={topic}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/25 text-violet-200"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="inline-flex items-center gap-1.5 text-cyan-300">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    {repo.language || 'Python'}
                  </span>

                  <div className="flex items-center gap-3">
                    {typeof repo.stargazers_count === 'number' && (
                      <span className="inline-flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400" />
                        {repo.stargazers_count}
                      </span>
                    )}
                    {typeof repo.forks_count === 'number' && (
                      <span className="inline-flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5 text-slate-400" />
                        {repo.forks_count}
                      </span>
                    )}
                    <span className="text-[10px] text-violet-300">
                      Open Repo
                    </span>
                  </div>
                </div>
              </a>
            </Tilt3DCard>
          ))}
        </div>
      </div>
    </section>
  );
};
