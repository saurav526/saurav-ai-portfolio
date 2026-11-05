import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {ArrowLeft,CheckCircle2,
  Cpu,
  FolderKanban,
  Mail,
  Plus,
  RotateCcw,
  Save,
  Sliders,
  Trash2,
  Wrench,
} from 'lucide-react';
import {
  ContactSubmissionItem,
  PortfolioData,
  ProfileConfig,
} from '../types/portfolio';
import {
  addSkillAdmin,
  deleteProjectAdmin,
  deleteSkillAdmin,
  fetchContactSubmissions,
  saveLocalPortfolioState,
  saveProjectAdmin,
  updateProfileAdmin,
} from '../services/api';
import { INITIAL_PORTFOLIO_DATA } from '../data/portfolioData';
import { Section3DBackdrop } from '../components/Section3DBackdrop';

interface AdminDashboardPageProps {
  portfolio: PortfolioData;
  onRefreshPortfolio: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  portfolio,
  onRefreshPortfolio,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'profile' | 'skills' | 'projects' | 'contacts'
  >('overview');
  const [profileForm, setProfileForm] = useState<ProfileConfig>(
    portfolio.profile
  );
  const [statusBanner, setStatusBanner] = useState<string | null>(null);
  const [contacts, setContacts] = useState<ContactSubmissionItem[]>([]);

  // New skill form
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState(
    'Generative AI and Agentic AI'
  );
  const [newSkillDesc, setNewSkillDesc] = useState('');

  // New project form
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjSubtitle, setNewProjSubtitle] = useState('');
  const [newProjCategory, setNewProjCategory] = useState('MLOps & Agentic AI');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjTech, setNewProjTech] = useState('Python, FastAPI, LangChain');
  const [newProjGithub, setNewProjGithub] = useState(
    'https://github.com/saurav526'
  );

  useEffect(() => {
    setProfileForm(portfolio.profile);
  }, [portfolio.profile]);

  useEffect(() => {
    fetchContactSubmissions().then(setContacts);
  }, []);

  const notify = (msg: string) => {
    setStatusBanner(msg);
    setTimeout(() => setStatusBanner(null), 4000);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfileAdmin(profileForm);
    onRefreshPortfolio();
    notify('Profile, biography, and availability status updated live!');
  };

  const handleToggleAvailability = async () => {
    const nextActive = !profileForm.availability_active;
    const nextStatus = nextActive
      ? 'Available for AI / Data Science Internships & Collaborative Projects'
      : 'Currently Focused on Active Engineering Projects';
    const updated = {
      ...profileForm,
      availability_active: nextActive,
      availability_status: nextStatus,
    };
    setProfileForm(updated);
    await updateProfileAdmin(updated);
    onRefreshPortfolio();
    notify(`Availability switched to: ${nextStatus}`);
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    await addSkillAdmin({
      name: newSkillName.trim(),
      category: newSkillCategory,
      icon_name: 'Cpu',
      description:
        newSkillDesc.trim() ||
        'Applied across AI, Machine Learning, and Data Science workflows',
      featured: true,
      display_order: portfolio.skills.length + 1,
    });
    setNewSkillName('');
    setNewSkillDesc('');
    onRefreshPortfolio();
    notify(`Added skill "${newSkillName.trim()}"!`);
  };

  const handleDeleteSkill = async (id: number) => {
    await deleteSkillAdmin(id);
    onRefreshPortfolio();
    notify('Skill removed.');
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjTitle.trim()) return;
    const slug = newProjTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    await saveProjectAdmin({
      id: Date.now(),
      slug,
      title: newProjTitle.trim(),
      subtitle: newProjSubtitle.trim() || 'AI & Machine Learning System',
      category: newProjCategory,
      short_description: newProjDesc.trim(),
      overview: newProjDesc.trim(),
      problem_statement: 'Addressing complex operational and analytical challenges with AI.',
      proposed_solution: newProjDesc.trim(),
      architecture_nodes: [
        { id: 'in', label: 'Data & Query Input', sublabel: 'Validated Schema', layer: 'Ingestion' },
        { id: 'core', label: 'AI / ML Core Engine', sublabel: newProjSubtitle || 'Inference', layer: 'Intelligence' },
        { id: 'out', label: 'FastAPI & Dashboard Output', sublabel: 'Structured Response', layer: 'Serving' },
      ],
      architecture_edges: [
        { source: 'in', target: 'core', label: 'Features' },
        { source: 'core', target: 'out', label: 'Predictions' },
      ],
      technical_workflow: [
        'Data Ingestion & Validation',
        'Model Training / Agent Orchestration',
        'FastAPI Serving & Dashboard Visualization',
      ],
      tech_stack: newProjTech
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      key_features: [newProjDesc.trim()],
      implementation_details: ['Modular Python architecture with automated testing.'],
      challenges: ['Ensuring low-latency, grounded predictions.'],
      future_improvements: ['Expand evaluation benchmarks and observability.'],
      github_url: newProjGithub.trim(),
      disclaimer: null,
      accent_color: '#8b5cf6',
      featured: true,
      display_order: portfolio.projects.length + 1,
    });
    setNewProjTitle('');
    setNewProjSubtitle('');
    setNewProjDesc('');
    onRefreshPortfolio();
    notify(`Added project "${newProjTitle.trim()}"!`);
  };

  const handleResetDefault = () => {
    saveLocalPortfolioState(INITIAL_PORTFOLIO_DATA);
    setProfileForm(INITIAL_PORTFOLIO_DATA.profile);
    onRefreshPortfolio();
    notify('Restored verified default résumé portfolio state!');
  };

  return (
    <main className="relative min-h-screen pt-24 pb-24 overflow-hidden z-10">
      <Section3DBackdrop variant="orbital" accent="cyan" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-2">
              <Sliders className="w-3.5 h-3.5" />
              <span>PORTFOLIO CONTROL CENTER (OPEN ACCESS — NO LOGIN REQUIRED)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              Live Portfolio Management Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleResetDefault}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-slate-300 transition"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset Defaults</span>
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-xs font-semibold text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Live Portfolio</span>
            </Link>
          </div>
        </div>

        {statusBanner && (
          <div className="rounded-xl bg-emerald-500/15 border border-emerald-500/40 px-4 py-3 flex items-center gap-2.5 text-xs text-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{statusBanner}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
          {[
            { id: 'overview', label: 'Overview & Availability', icon: Cpu },
            { id: 'profile', label: 'Edit Bio & Social Links', icon: Sliders },
            { id: 'skills', label: `Manage Skills (${portfolio.skills.length})`, icon: Wrench },
            { id: 'projects', label: `Manage Projects (${portfolio.projects.length})`, icon: FolderKanban },
            { id: 'contacts', label: `Contact Submissions (${contacts.length})`, icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
                  active
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white'
                    : 'bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-2xl border border-white/10 bg-[#080c19]/90 p-5">
                <div className="text-xs font-mono text-slate-400">
                  Flagship Projects
                </div>
                <div className="text-3xl font-extrabold text-white mt-1">
                  {portfolio.projects.length}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#080c19]/90 p-5">
                <div className="text-xs font-mono text-slate-400">
                  Categorized Skills
                </div>
                <div className="text-3xl font-extrabold text-cyan-300 mt-1">
                  {portfolio.skills.length}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#080c19]/90 p-5">
                <div className="text-xs font-mono text-slate-400">
                  Certifications
                </div>
                <div className="text-3xl font-extrabold text-violet-300 mt-1">
                  {portfolio.certifications.length}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#080c19]/90 p-5">
                <div className="text-xs font-mono text-slate-400">
                  Contact Messages
                </div>
                <div className="text-3xl font-extrabold text-emerald-300 mt-1">
                  {contacts.length}
                </div>
              </div>
            </div>

            {/* Live Availability Controller */}
            <div className="rounded-2xl border border-white/15 bg-[#080c19]/90 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
                  Hero Availability Status Controller
                </div>
                <div className="text-base font-bold text-white flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      profileForm.availability_active
                        ? 'bg-emerald-400'
                        : 'bg-amber-400'
                    }`}
                  />
                  <span>{profileForm.availability_status}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleToggleAvailability}
                className="px-4 py-2.5 rounded-xl bg-violet-600/25 hover:bg-violet-600/40 border border-violet-500/40 text-xs font-semibold text-white transition"
              >
                Toggle Availability Status
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: EDIT BIO & SOCIAL LINKS */}
        {activeTab === 'profile' && (
          <form
            onSubmit={handleSaveProfile}
            className="rounded-2xl border border-white/15 bg-[#080c19]/90 p-6 space-y-4"
          >
            <h2 className="text-lg font-bold text-white mb-2">
              Update Biography, Headline & Contact Links
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, name: e.target.value })
                  }
                  className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-3.5 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Availability Banner Text
                </label>
                <input
                  type="text"
                  value={profileForm.availability_status}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      availability_status: e.target.value,
                    })
                  }
                  className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-3.5 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, email: e.target.value })
                  }
                  className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-3.5 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  value={profileForm.phone}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, phone: e.target.value })
                  }
                  className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-3.5 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  GitHub URL
                </label>
                <input
                  type="text"
                  value={profileForm.github_url}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      github_url: e.target.value,
                    })
                  }
                  className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-3.5 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  LinkedIn URL
                </label>
                <input
                  type="text"
                  value={profileForm.linkedin_url}
                  onChange={(e) =>
                    setProfileForm({
                      ...profileForm,
                      linkedin_url: e.target.value,
                    })
                  }
                  className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-3.5 py-2 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Professional Biography
              </label>
              <textarea
                rows={4}
                value={profileForm.bio}
                onChange={(e) =>
                  setProfileForm({ ...profileForm, bio: e.target.value })
                }
                className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-3.5 py-2 text-xs text-white"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-xs font-semibold text-white"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </form>
        )}

        {/* TAB 3: SKILLS */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            <form
              onSubmit={handleAddSkill}
              className="rounded-2xl border border-white/15 bg-[#080c19]/90 p-6 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end"
            >
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Skill Name
                </label>
                <input
                  type="text"
                  required
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  placeholder="e.g., CrewAI"
                  className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Category
                </label>
                <select
                  value={newSkillCategory}
                  onChange={(e) => setNewSkillCategory(e.target.value)}
                  className="w-full rounded-xl bg-[#0b1022] border border-white/10 px-3 py-2 text-xs text-white"
                >
                  <option>Programming</option>
                  <option>AI and Machine Learning</option>
                  <option>Generative AI and Agentic AI</option>
                  <option>Frameworks and Libraries</option>
                  <option>Backend Development</option>
                  <option>Databases</option>
                  <option>Cloud and MLOps</option>
                  <option>Analytics and Development Tools</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={newSkillDesc}
                  onChange={(e) => setNewSkillDesc(e.target.value)}
                  placeholder="Brief technical context"
                  className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2 text-xs text-white"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-xs font-semibold text-white"
              >
                <Plus className="w-4 h-4" />
                <span>Add Skill</span>
              </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {portfolio.skills.map((sk) => (
                <div
                  key={sk.id}
                  className="rounded-xl border border-white/10 bg-[#080c19]/80 p-3.5 flex items-center justify-between gap-2"
                >
                  <div>
                    <div className="text-xs font-bold text-white">
                      {sk.name}
                    </div>
                    <div className="text-[10px] font-mono text-cyan-300">
                      {sk.category}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteSkill(sk.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <form
              onSubmit={handleAddProject}
              className="rounded-2xl border border-white/15 bg-[#080c19]/90 p-6 space-y-4"
            >
              <h3 className="text-base font-bold text-white">
                Add New Showcase Project
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  required
                  value={newProjTitle}
                  onChange={(e) => setNewProjTitle(e.target.value)}
                  placeholder="Project Title *"
                  className="rounded-xl bg-white/[0.04] border border-white/10 px-3.5 py-2 text-xs text-white"
                />
                <input
                  type="text"
                  value={newProjSubtitle}
                  onChange={(e) => setNewProjSubtitle(e.target.value)}
                  placeholder="Subtitle (e.g., Multi-Agent RAG)"
                  className="rounded-xl bg-white/[0.04] border border-white/10 px-3.5 py-2 text-xs text-white"
                />
                <input
                  type="text"
                  value={newProjCategory}
                  onChange={(e) => setNewProjCategory(e.target.value)}
                  placeholder="Category"
                  className="rounded-xl bg-white/[0.04] border border-white/10 px-3.5 py-2 text-xs text-white"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={newProjTech}
                  onChange={(e) => setNewProjTech(e.target.value)}
                  placeholder="Comma-separated Tech Stack"
                  className="rounded-xl bg-white/[0.04] border border-white/10 px-3.5 py-2 text-xs text-white"
                />
                <input
                  type="text"
                  value={newProjGithub}
                  onChange={(e) => setNewProjGithub(e.target.value)}
                  placeholder="GitHub Repository URL"
                  className="rounded-xl bg-white/[0.04] border border-white/10 px-3.5 py-2 text-xs text-white"
                />
              </div>
              <textarea
                rows={3}
                required
                value={newProjDesc}
                onChange={(e) => setNewProjDesc(e.target.value)}
                placeholder="Project overview & key architecture summary *"
                className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-3.5 py-2 text-xs text-white"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-xs font-semibold text-white"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project to Portfolio</span>
              </button>
            </form>

            <div className="space-y-3">
              {portfolio.projects.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl border border-white/10 bg-[#080c19]/85 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="text-sm font-bold text-white">
                      {p.title}{' '}
                      <span className="text-xs font-mono text-cyan-300">
                        ({p.subtitle})
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {p.short_description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      to={`/projects/${p.slug}`}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-cyan-300"
                    >
                      View Page
                    </Link>
                    <button
                      type="button"
                      onClick={async () => {
                        await deleteProjectAdmin(p.id);
                        onRefreshPortfolio();
                        notify(`Removed project "${p.title}"`);
                      }}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CONTACTS */}
        {activeTab === 'contacts' && (
          <div className="space-y-4">
            {contacts.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-[#080c19]/90 p-8 text-center text-xs text-slate-400">
                No contact form submissions recorded yet. Test the Contact section on the homepage!
              </div>
            ) : (
              contacts.map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl border border-white/10 bg-[#080c19]/90 p-5 space-y-2"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-sm font-bold text-white">
                      {c.subject}{' '}
                      <span className="text-xs font-mono text-cyan-300">
                        — from {c.name} ({c.email})
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {new Date(c.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {c.message}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
};
