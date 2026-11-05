import React, { useRef, useState } from 'react';
import { Terminal as TerminalIcon, Play, RotateCcw } from 'lucide-react';
import { PortfolioData } from '../types/portfolio';
import { Tilt3DCard } from '../components/Tilt3DCard';
import { Section3DBackdrop } from '../components/Section3DBackdrop';

interface TerminalSectionProps {
  portfolio: PortfolioData;
}

interface TerminalEntry {
  id: string;
  command: string;
  output: string;
  isError?: boolean;
}

const SUPPORTED_COMMANDS = [
  'help',
  'about',
  'skills',
  'projects',
  'experience',
  'education',
  'certifications',
  'github',
  'linkedin',
  'contact',
  'clear',
];

export const TerminalSection: React.FC<TerminalSectionProps> = ({
  portfolio,
}) => {
  const [entries, setEntries] = useState<TerminalEntry[]>([
    {
      id: 'init',
      command: 'help',
      output:
        'SAURAV-OS INTERACTIVE AI DEVELOPER TERMINAL v2.0\n' +
        'Type any command below or click a quick-command chip:\n' +
        '  help            Show all available commands\n' +
        '  about           Display professional identity & summary\n' +
        '  skills          Output categorized programming, AI, GenAI, backend & cloud skills\n' +
        '  projects        List the 5 flagship AI & Data Science projects with GitHub URLs\n' +
        '  experience      Display Data Science Internship at EduSkills (AICTE & Siemens)\n' +
        '  education       Display B.Tech degree at MIT ADT University, Pune\n' +
        '  certifications  List all 6 verified certifications & verification link\n' +
        '  github          Show GitHub profile and repositories\n' +
        '  linkedin        Show LinkedIn profile URL\n' +
        '  contact         Display email, phone, location & availability status\n' +
        '  clear           Clear terminal history',
    },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>(['help']);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const outputContainerRef = useRef<HTMLDivElement | null>(null);

  const runLocalCommand = (rawCmd: string): { output: string; isError?: boolean } => {
    const cmd = rawCmd.trim().toLowerCase().split(/\s+/)[0] || 'help';
    const { profile, skills, projects, experiences, certifications } = portfolio;

    switch (cmd) {
      case 'help':
        return {
          output:
            'AVAILABLE COMMANDS:\n' +
            '  help            Display available terminal commands\n' +
            '  about           Display Saurav Kumar biography & technical focus\n' +
            '  skills          Output categorized programming, AI, backend & cloud skills\n' +
            '  projects        Display all 5 flagship AI & ML projects\n' +
            '  experience      Show Data Science Internship (EduSkills / AICTE & Siemens)\n' +
            '  education       Show B.Tech at MIT ADT University, Pune (2024–2028)\n' +
            '  certifications  Display 6 verified AI, ML & Power BI certifications\n' +
            '  github          Display GitHub profile & repository links\n' +
            '  linkedin        Display LinkedIn profile URL\n' +
            '  contact         Display email, phone, location & availability\n' +
            '  clear           Clear terminal output',
        };

      case 'about':
        return {
          output:
            `NAME       : ${profile.name}\n` +
            `IDENTITY   : ${profile.professional_identity}\n` +
            `LOCATION   : ${profile.location}\n` +
            `STATUS     : ${profile.availability_status}\n\n` +
            `${profile.bio}`,
        };

      case 'skills': {
        const grouped: Record<string, string[]> = {};
        for (const s of skills) {
          if (!grouped[s.category]) grouped[s.category] = [];
          grouped[s.category].push(s.name);
        }
        const out = Object.entries(grouped)
          .map(([cat, names]) => `[${cat.toUpperCase()}]\n  ${names.join(', ')}`)
          .join('\n\n');
        return { output: out };
      }

      case 'projects': {
        const out = projects
          .map(
            (p, idx) =>
              `0${idx + 1}. ${p.title} (${p.subtitle})\n` +
              `    Summary : ${p.short_description}\n` +
              `    Stack   : ${p.tech_stack.join(', ')}\n` +
              `    GitHub  : ${p.github_url}`
          )
          .join('\n\n');
        return { output: out };
      }

      case 'experience': {
        const exp = experiences[0];
        return {
          output:
            `ROLE          : ${exp.role}\n` +
            `ORGANIZATION  : ${exp.organization} (${exp.collaboration})\n` +
            `DURATION      : ${exp.duration} (${exp.mode})\n` +
            `HIGHLIGHTS:\n` +
            exp.highlights.map((h) => `  * ${h}`).join('\n') +
            `\nSKILLS        : ${exp.skills_applied.join(', ')}`,
        };
      }

      case 'education':
        return {
          output:
            `DEGREE      : ${profile.education_degree}\n` +
            `INSTITUTION : ${profile.education_institution}\n` +
            `DURATION    : ${profile.education_duration}\n` +
            `FOCUS       : ${profile.education_focus}`,
        };

      case 'certifications':
        return {
          output:
            certifications
              .map((c, idx) => `  [0${idx + 1}] ${c.title} — ${c.domain}`)
              .join('\n') +
            `\n\nVerification Link: ${profile.certifications_drive_url}`,
        };

      case 'github':
        return {
          output:
            `GitHub Profile: ${profile.github_url}\nFlagship Repositories:\n` +
            projects.map((p) => `  -> ${p.github_url}`).join('\n'),
        };

      case 'linkedin':
        return {
          output: `LinkedIn Profile: ${profile.linkedin_url}`,
        };

      case 'contact':
        return {
          output:
            `EMAIL        : ${profile.email}\n` +
            `PHONE        : ${profile.phone}\n` +
            `LOCATION     : ${profile.location}\n` +
            `LINKEDIN     : ${profile.linkedin_url}\n` +
            `GITHUB       : ${profile.github_url}\n` +
            `AVAILABILITY : ${profile.availability_status}`,
        };

      default:
        return {
          output: `Command not found: '${rawCmd}'. Type 'help' for a list of supported commands.`,
          isError: true,
        };
    }
  };

  const executeCommand = async (rawCmd?: string) => {
    const cmdText = (rawCmd ?? input).trim();
    if (!cmdText) return;

    setCmdHistory((prev) => [...prev, cmdText]);
    setHistoryIdx(-1);
    setInput('');

    if (cmdText.toLowerCase() === 'clear') {
      setEntries([]);
      return;
    }

    const res = runLocalCommand(cmdText);
    setEntries((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}-${Math.random()}`,
        command: cmdText,
        output: res.output,
        isError: res.isError,
      },
    ]);

    setTimeout(() => {
      if (outputContainerRef.current) {
        outputContainerRef.current.scrollTop =
          outputContainerRef.current.scrollHeight;
      }
    }, 40);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx =
        historyIdx === -1
          ? cmdHistory.length - 1
          : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInput(cmdHistory[nextIdx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx === -1) return;
      if (historyIdx + 1 >= cmdHistory.length) {
        setHistoryIdx(-1);
        setInput('');
      } else {
        const nextIdx = historyIdx + 1;
        setHistoryIdx(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
    }
  };

  return (
    <section id="terminal" className="relative py-24 overflow-hidden">
      <Section3DBackdrop variant="matrix" accent="emerald" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300 mb-3">
            <span>05 // INTERACTIVE AI DEVELOPER TERMINAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Query My Portfolio via{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
              CLI Command Shell
            </span>
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Execute real commands (<code className="text-cyan-300 font-mono">skills</code>,{' '}
            <code className="text-cyan-300 font-mono">projects</code>,{' '}
            <code className="text-cyan-300 font-mono">experience</code>,{' '}
            <code className="text-cyan-300 font-mono">certifications</code>,{' '}
            <code className="text-cyan-300 font-mono">contact</code>) or click any shortcut below.
          </p>
        </div>

        {/* Quick Command Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-5">
          {SUPPORTED_COMMANDS.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => executeCommand(cmd)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-emerald-500/15 border border-white/10 hover:border-emerald-400/40 text-xs font-mono text-cyan-300 transition"
            >
              <Play className="w-3 h-3 text-emerald-400" />
              <span>{cmd}</span>
            </button>
          ))}
        </div>

        {/* 3D Terminal Window */}
        <Tilt3DCard
          intensity={5}
          glowColor="rgba(16, 185, 129, 0.2)"
          className="rounded-2xl"
        >
          <div className="rounded-2xl border border-white/15 bg-[#050811]/95 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.85)] overflow-hidden font-mono">
            {/* Terminal Title Bar */}
            <div className="px-4 py-3 border-b border-white/10 bg-[#090d1b] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-xs text-slate-300 flex items-center gap-1.5">
                  <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
                  visitor@saurav-portfolio: ~ (zsh)
                </span>
              </div>

              <button
                type="button"
                onClick={() => executeCommand('clear')}
                className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>

            {/* Terminal Output History */}
            <div
              ref={outputContainerRef}
              className="p-5 space-y-4 max-h-[420px] overflow-y-auto text-xs sm:text-sm"
            >
              {entries.map((entry) => (
                <div key={entry.id} className="space-y-1.5">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <span>visitor@saurav-portfolio:~$</span>
                    <span className="text-white font-semibold">
                      {entry.command}
                    </span>
                  </div>
                  <pre
                    className={`whitespace-pre-wrap leading-relaxed pl-3 border-l-2 ${
                      entry.isError
                        ? 'text-rose-400 border-rose-500/40'
                        : 'text-slate-300 border-cyan-500/40'
                    }`}
                  >
                    {entry.output}
                  </pre>
                </div>
              ))}

              {/* Active Prompt Line */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  executeCommand();
                }}
                className="flex items-center gap-2 pt-2"
              >
                <span className="text-emerald-400 shrink-0">
                  visitor@saurav-portfolio:~$
                </span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command (e.g., skills, projects, about)..."
                  aria-label="Terminal command input"
                  className="flex-1 bg-transparent text-white focus:outline-none placeholder:text-slate-600"
                />
                <span className="w-2 h-4 bg-emerald-400 animate-pulse" />
              </form>
            </div>
          </div>
        </Tilt3DCard>
      </div>
    </section>
  );
};
