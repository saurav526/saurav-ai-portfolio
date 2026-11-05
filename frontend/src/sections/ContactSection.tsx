import React, { useState } from 'react';
import {
  CheckCircle2,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { ProfileConfig } from '../types/portfolio';
import { submitContactMessage } from '../services/api';
import { Tilt3DCard } from '../components/Tilt3DCard';
import { Section3DBackdrop } from '../components/Section3DBackdrop';

interface ContactSectionProps {
  profile: ProfileConfig;
}
export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<{
    message: string;
    mailtoUrl: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setResult(null);

    if (name.trim().length < 2) {
      setErrorMsg('Please enter your name (at least 2 characters).');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (subject.trim().length < 3) {
      setErrorMsg('Please enter a subject (at least 3 characters).');
      return;
    }
    if (message.trim().length < 10) {
      setErrorMsg('Please enter a message of at least 10 characters.');
      return;
    }

    setSubmitting(true);
    try {
      const resp = await submitContactMessage({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        honeypot,
      });
      setResult({
        message: resp.message,
        mailtoUrl: resp.mailto_fallback_url,
      });
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch {
      setErrorMsg('Could not submit message. Please use the direct email link.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <Section3DBackdrop variant="neural" accent="cyan" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-mono text-cyan-300 mb-3">
            <span>08 // INITIATE CONNECTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Let's Build{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">
              Intelligent AI Systems Together
            </span>
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Reach out for AI engineering, Data Science internships, Machine Learning collaborations, or technical discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Channels */}
          <div className="lg:col-span-5 space-y-4">
            <Tilt3DCard intensity={8} className="rounded-2xl">
              <div className="rounded-2xl border border-white/10 bg-[#080c19]/90 p-6 backdrop-blur-xl space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>{profile.availability_status}</span>
                </div>

                <div className="space-y-4 pt-1">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 transition"
                  >
                    <div className="w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-cyan-300" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-mono text-slate-400">
                        EMAIL ADDRESS
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-white truncate">
                        {profile.email}
                      </div>
                    </div>
                  </a>

                  <a
                    href={`tel:${profile.phone}`}
                    className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 transition"
                  >
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-cyan-300" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-slate-400">
                        PHONE / WHATSAPP
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-white">
                        {profile.phone}
                      </div>
                    </div>
                  </a>

                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 transition"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shrink-0">
                      <Linkedin className="w-5 h-5 text-cyan-300" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-mono text-slate-400">
                        LINKEDIN PROFILE
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-white truncate">
                        linkedin.com/in/saurav-kumar-a90827323
                      </div>
                    </div>
                  </a>

                  <a
                    href={profile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 transition"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0">
                      <Github className="w-5 h-5 text-violet-300" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-slate-400">
                        GITHUB REPOSITORIES
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-white">
                        github.com/saurav526
                      </div>
                    </div>
                  </a>

                  <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-emerald-300" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-slate-400">
                        LOCATION
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-white">
                        {profile.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tilt3DCard>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <Tilt3DCard intensity={6} className="h-full rounded-2xl">
              <form
                onSubmit={handleSubmit}
                className="h-full rounded-2xl border border-white/10 bg-[#080c19]/90 p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between space-y-5"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-bold text-white">
                      Send a Direct Message
                    </h3>
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-cyan-300">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Validated & Spam-Protected
                    </span>
                  </div>

                  {/* Honeypot field hidden from human visitors */}
                  <input
                    type="text"
                    name="website_url_honeypot"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Priya Sharma"
                        className="w-full rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400/60 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="priya@company.com"
                        className="w-full rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400/60 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="AI Engineer / Data Science Opportunity"
                      className="w-full rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400/60 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me about your role, project, or collaboration idea..."
                      className="w-full rounded-xl bg-white/[0.04] border border-white/10 focus:border-cyan-400/60 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none resize-none"
                    />
                  </div>

                  {errorMsg && (
                    <div className="mt-4 rounded-xl bg-rose-500/15 border border-rose-500/35 px-4 py-2.5 text-xs text-rose-200">
                      {errorMsg}
                    </div>
                  )}

                  {result && (
                    <div className="mt-4 rounded-xl bg-emerald-500/15 border border-emerald-500/35 p-4 space-y-2.5">
                      <div className="flex items-start gap-2 text-xs text-emerald-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{result.message}</span>
                      </div>
                      <a
                        href={result.mailtoUrl}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/25 hover:bg-emerald-500/35 text-xs font-mono text-emerald-100 transition"
                      >
                        <span>Open Pre-Filled Email in Mail Client (mailto Fallback)</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 disabled:opacity-50 text-xs sm:text-sm font-semibold text-white shadow-[0_0_25px_rgba(139,92,246,0.4)] transition"
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {submitting ? 'Transmitting Message...' : 'Send Message'}
                    </span>
                  </button>

                  <a
                    href={`mailto:${profile.email}`}
                    className="text-xs font-mono text-slate-400 hover:text-cyan-300 transition"
                  >
                    Or email directly: {profile.email}
                  </a>
                </div>
              </form>
            </Tilt3DCard>
          </div>
        </div>
      </div>
    </section>
  );
};
