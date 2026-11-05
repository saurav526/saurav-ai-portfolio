import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Cpu,
  Github,
  Lightbulb,
  Play,
  ShieldAlert,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { PortfolioData } from '../types/portfolio';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram';
import { Tilt3DCard } from '../components/Tilt3DCard';
import { Section3DBackdrop } from '../components/Section3DBackdrop';

interface ProjectDetailPageProps {
  portfolio: PortfolioData;
}

const SIMULATION_OUTPUTS: Record<string, string[]> = {
  'clinical-risk-patient-outcome-intelligence-system': [
    '[1/5] Validating 5,000-record synthetic clinical dataset (30 features: vitals, labs, comorbidities)... OK',
    '[2/5] Benchmarking estimators (Logistic Regression, Random Forest, Gradient Boosting) via ROC-AUC in MLflow...',
    '[3/5] Computing local SHAP attributions for Patient ID #P100123 -> Top drivers: prior_admissions (+0.19), length_of_stay (+0.14), hba1c (+0.09)',
    '[4/5] Invoking Groq Agent Tool `explain_patient(patient_id="P100123")` via API-key-secured FastAPI route...',
    '[5/5] Logged prediction & agent event to PostgreSQL/SQLAlchemy audit table and updated Prometheus /metrics counter.',
  ],
  'opspilot-ai-incident-intelligence-copilot': [
    '[1/5] Scaling multi-service telemetry stream with StandardScaler (checkout, auth, payments)...',
    '[2/5] Scoring intervals with Isolation Forest -> Detected high anomaly score on service="checkout" (p95_latency=840ms, error_rate=6.4%)',
    '[3/5] Executing TF-IDF + Cosine Similarity query against operational runbooks -> Matched `checkout_latency_runbook.md` (score: 0.87)',
    '[4/5] Synthesizing read-only investigation steps via Incident Agent (with deterministic no-LLM fallback)...',
    '[5/5] Recorded immutable investigation audit entry in SQLite (`/audit/recent`).',
  ],
  'autonomous-cyber-defense-system': [
    '[1/5] Generating synthetic network telemetry flow graph (Nodes: Hosts/Subnets, Edges: Packet Flows)...',
    '[2/5] Computing normalized neighborhood feature aggregation across adjacency matrix...',
    '[3/5] Evaluating Self-Supervised Graph Autoencoder reconstruction error -> Node 10.0.4.18 residual: 3.92x threshold!',
    '[4/5] Querying Reinforcement Learning Response Policy for threat severity state [HIGH]...',
    '[5/5] Selected Graduated Defensive Action: ISOLATE_HOST (10.0.4.18) & exported telemetry report to Streamlit.',
  ],
  'ai-medical-chatbot': [
    '[1/5] Ingesting reference medical knowledge documents & executing context-preserving semantic chunking...',
    '[2/5] Encoding query and document chunks into dense vector embeddings via Hugging Face model...',
    '[3/5] Querying FAISS vector index using cosine-similarity top-k retrieval...',
    '[4/5] Injecting retrieved medical passages + LangChain conversational memory into grounded prompt template...',
    '[5/5] Generated context-grounded educational answer with zero unsupported claims.',
  ],
  'expense-tracker-mcp-server': [
    '[1/4] Initializing SQLite database (`expenses.db`) with automatic schema creation...',
    '[2/4] Reading live MCP resource `expense://categories` (`categories.json`)...',
    '[3/4] Executing `@mcp.tool() add_expense(date="2026-10-01", amount=1250.0, category="Cloud & Compute", note="GPU Experiment")` via parameterized SQL...',
    '[4/4] Executing `@mcp.tool() summarize(start_date="2026-10-01", end_date="2026-10-31")` -> Returned structured JSON to MCP client.',
  ],
};

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  portfolio,
}) => {
  const { slug } = useParams<{ slug: string }>();
  const [simRunning, setSimRunning] = useState(false);
  const [simStep, setSimStep] = useState(5);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const projectIndex = portfolio.projects.findIndex((p) => p.slug === slug);
  const project = portfolio.projects[projectIndex];

  if (!project) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          Project Not Found
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          Could not locate a project with slug "{slug}".
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Portfolio</span>
        </Link>
      </div>
    );
  }

  const prevProject =
    projectIndex > 0 ? portfolio.projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < portfolio.projects.length - 1
      ? portfolio.projects[projectIndex + 1]
      : null;

  const simLines =
    SIMULATION_OUTPUTS[project.slug] ||
    SIMULATION_OUTPUTS['clinical-risk-patient-outcome-intelligence-system'];

  const triggerSimulation = () => {
    setSimRunning(true);
    setSimStep(1);
    let step = 1;
    const interval = setInterval(() => {
      step += 1;
      setSimStep(step);
      if (step >= simLines.length) {
        clearInterval(interval);
        setSimRunning(false);
      }
    }, 380);
  };

  return (
    <main className="relative min-h-screen pt-24 pb-24 overflow-hidden z-10">
      <Section3DBackdrop variant="cyber" accent="violet" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>Back to All Projects</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-200">
              Case Study 0{project.display_order} / 0{portfolio.projects.length}
            </span>
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-xs font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] transition"
              >
                <Github className="w-4 h-4" />
                <span>View Source on GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Hero Case-Study Banner */}
        <Tilt3DCard intensity={5} className="rounded-3xl">
          <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#0b1022]/95 to-[#060913]/95 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl space-y-5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                {project.category}
              </span>
              <span className="text-xs font-mono text-violet-300">
                {project.subtitle}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {project.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl">
              {project.overview}
            </p>

            {project.disclaimer && (
              <div className="rounded-xl border border-amber-400/35 bg-amber-500/10 p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
                  {project.disclaimer}
                </p>
              </div>
            )}

            <div className="pt-3 border-t border-white/10 flex flex-wrap gap-2">
              {project.tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-xs font-mono text-cyan-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Tilt3DCard>

        {/* Problem Statement & Proposed Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Tilt3DCard intensity={8} className="rounded-2xl">
            <div className="h-full rounded-2xl border border-white/10 bg-[#080c19]/90 p-6 backdrop-blur-xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-rose-300 mb-3">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>Problem Statement</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.problem_statement}
              </p>
            </div>
          </Tilt3DCard>

          <Tilt3DCard intensity={8} className="rounded-2xl">
            <div className="h-full rounded-2xl border border-white/10 bg-[#080c19]/90 p-6 backdrop-blur-xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-300 mb-3">
                <Lightbulb className="w-4 h-4 text-emerald-400" />
                <span>Proposed Engineering Solution</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.proposed_solution}
              </p>
            </div>
          </Tilt3DCard>
        </div>

        {/* Interactive System Architecture Diagram */}
        <ArchitectureDiagram
          nodes={project.architecture_nodes}
          edges={project.architecture_edges}
          accentColor={project.accent_color}
        />

        {/* Interactive Pipeline Execution Simulator */}
        <div className="rounded-2xl border border-cyan-500/30 bg-[#050812]/95 p-6 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-violet-400" />
                <span>Interactive System Workflow Trace</span>
              </div>
              <h3 className="text-base font-bold text-white mt-0.5">
                Simulate End-to-End Execution Pipeline
              </h3>
            </div>
            <button
              type="button"
              onClick={triggerSimulation}
              disabled={simRunning}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-xs font-semibold text-white transition"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{simRunning ? 'Simulating Pipeline...' : 'Re-Run Pipeline Trace'}</span>
            </button>
          </div>

          <div className="rounded-xl bg-black/70 border border-white/10 p-4 font-mono text-xs space-y-2">
            {simLines.slice(0, simStep).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-emerald-300 leading-relaxed"
              >
                {line}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technical Workflow & Key Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 rounded-2xl border border-white/10 bg-[#080c19]/90 p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Step-by-Step Technical Workflow</span>
            </h3>
            <div className="space-y-3">
              {project.technical_workflow.map((step, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-white/[0.025] border border-white/10 text-xs sm:text-sm text-slate-300 leading-relaxed"
                >
                  <span className="font-mono text-cyan-400 font-bold mr-2">
                    0{i + 1}.
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-[#080c19]/90 p-6 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span>Key Features</span>
              </h3>
              <div className="space-y-2.5">
                {project.key_features.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#080c19]/90 p-6 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Wrench className="w-4 h-4 text-cyan-400" />
                <span>Implementation Details</span>
              </h3>
              <div className="space-y-2.5">
                {project.implementation_details.map((det, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                    <span>{det}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Challenges & Future Improvements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-[#080c19]/90 p-6 space-y-3">
            <h3 className="text-base font-bold text-white">
              Engineering Challenges & Solutions
            </h3>
            {project.challenges.map((ch, i) => (
              <p key={i} className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                • {ch}
              </p>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#080c19]/90 p-6 space-y-3">
            <h3 className="text-base font-bold text-white">
              Future Production Roadmap
            </h3>
            {project.future_improvements.map((imp, i) => (
              <p key={i} className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                • {imp}
              </p>
            ))}
          </div>
        </div>

        {/* Prev / Next Case Study Navigation */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.slug}`}
              className="w-full sm:w-auto inline-flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-slate-200 transition"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400" />
              <span>Previous: {prevProject.title}</span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject && (
            <Link
              to={`/projects/${nextProject.slug}`}
              className="w-full sm:w-auto inline-flex items-center justify-end gap-2.5 px-4 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-slate-200 transition"
            >
              <span>Next: {nextProject.title}</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </Link>
          )}
        </div>
      </div>
    </main>
  );
};
