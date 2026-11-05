import {
  FALLBACK_GITHUB_DATA,
  INITIAL_PORTFOLIO_DATA,
} from '../data/portfolioData';

import {
  ContactSubmissionItem,
  GitHubProfileData,
  PortfolioData,
  ProfileConfig,
  Project,
  Skill,
} from '../types/portfolio';

import { asset } from '../lib/asset';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';
const STORAGE_KEY = 'saurav_portfolio_state_v2';
const CONTACTS_STORAGE_KEY = 'saurav_portfolio_contacts_v2';

/* --------------------------------------------------
   PORTFOLIO DATA HELPERS
-------------------------------------------------- */

// Ensures that all default projects are available.
// Missing default projects are added without duplicating existing projects.

function ensureDefaultProjects(data: PortfolioData): PortfolioData {
  const existingProjects = data.projects || [];

  const existingSlugs = new Set(
    existingProjects.map((project) => project.slug)
  );

  const missingProjects = INITIAL_PORTFOLIO_DATA.projects.filter(
    (project) => !existingSlugs.has(project.slug)
  );

  const mergedProjects = [
    ...existingProjects,
    ...missingProjects,
  ].sort((a, b) => a.display_order - b.display_order);

  return {
    ...data,
    projects: mergedProjects,
    stats: {
      ...data.stats,
      flagship_projects: mergedProjects.length,
    },
  };
}

/* --------------------------------------------------
   LOCAL PORTFOLIO STORAGE
-------------------------------------------------- */

export function getLocalPortfolioState(): PortfolioData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw) {
      const data = JSON.parse(raw) as PortfolioData;
      return ensureDefaultProjects(data);
    }
  } catch {
    // Ignore storage errors
  }

  return ensureDefaultProjects(INITIAL_PORTFOLIO_DATA);
}

export function saveLocalPortfolioState(data: PortfolioData): void {
  try {
    const updatedData = ensureDefaultProjects(data);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedData)
    );

    window.dispatchEvent(
      new CustomEvent('portfolio-data-updated', {
        detail: updatedData,
      })
    );
  } catch {
    // Ignore storage errors
  }
}

/* --------------------------------------------------
   FETCH PORTFOLIO DATA
-------------------------------------------------- */

export async function fetchPortfolioData(): Promise<PortfolioData> {
  try {
    const resp = await fetch(`${API_BASE}/portfolio`);

    if (resp.ok) {
      const data = (await resp.json()) as PortfolioData;

      const updatedData = ensureDefaultProjects(data);

      saveLocalPortfolioState(updatedData);

      return updatedData;
    }
  } catch {
    // Backend offline; use local state
  }

  return getLocalPortfolioState();
}

/* --------------------------------------------------
   GITHUB PROFILE
-------------------------------------------------- */

export async function fetchGitHubProfile(): Promise<GitHubProfileData> {
  try {
    const resp = await fetch(`${API_BASE}/github/profile`);

    if (resp.ok) {
      return (await resp.json()) as GitHubProfileData;
    }
  } catch {
    // Try direct public GitHub API if backend is offline
    try {
      const [uResp, rResp] = await Promise.all([
        fetch('https://api.github.com/users/saurav526'),
        fetch(
          'https://api.github.com/users/saurav526/repos?sort=updated&per_page=12'
        ),
      ]);

      if (uResp.ok && rResp.ok) {
        const u = await uResp.json();
        const repos = await rResp.json();

        const langMap: Record<string, number> = {};

        const formatted = (Array.isArray(repos) ? repos : [])
          .filter((r: Record<string, unknown>) => !r.fork)
          .map((r: Record<string, unknown>) => {
            const lang = (r.language as string) || 'Python';

            langMap[lang] = (langMap[lang] || 0) + 1;

            return {
              name: String(r.name || ''),
              html_url: String(r.html_url || ''),
              description:
                String(r.description || '') ||
                'AI, Machine Learning, and Data Science engineering repository.',
              language: lang,
              topics: Array.isArray(r.topics)
                ? (r.topics as string[])
                : [],
              stargazers_count:
                typeof r.stargazers_count === 'number'
                  ? r.stargazers_count
                  : null,
              forks_count:
                typeof r.forks_count === 'number'
                  ? r.forks_count
                  : null,
              updated_at: String(r.updated_at || ''),
            };
          });

        return {
          source: 'github_live_api',
          cached: false,
          profile: {
            username: u.login || 'saurav526',
            name: u.name || 'Saurav Kumar',
            avatar_url: u.avatar_url || asset('/saurav-profile.jpg'),
            html_url:
              u.html_url || 'https://github.com/saurav526',
            bio:
              u.bio ||
              'AI Engineer | Data Scientist | Machine Learning Engineer | Generative AI Developer',
            location:
              u.location || 'Pune, Maharashtra, India',
            public_repos:
              typeof u.public_repos === 'number'
                ? u.public_repos
                : null,
            followers:
              typeof u.followers === 'number'
                ? u.followers
                : null,
            following:
              typeof u.following === 'number'
                ? u.following
                : null,
          },
          repositories:
            formatted.length > 0
              ? formatted
              : FALLBACK_GITHUB_DATA.repositories,
          languages:
            Object.keys(langMap).length > 0
              ? langMap
              : FALLBACK_GITHUB_DATA.languages,
        };
      }
    } catch {
      // Rate limited or offline
    }
  }

  return FALLBACK_GITHUB_DATA;
}

/* --------------------------------------------------
   ADMIN: UPDATE PROFILE
-------------------------------------------------- */

export async function updateProfileAdmin(
  updates: Partial<ProfileConfig>
): Promise<ProfileConfig> {
  const current = getLocalPortfolioState();

  const updatedProfile: ProfileConfig = {
    ...current.profile,
    ...updates,
  };

  const nextState: PortfolioData = {
    ...current,
    profile: updatedProfile,
  };

  saveLocalPortfolioState(nextState);

  try {
    const resp = await fetch(`${API_BASE}/admin/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (resp.ok) {
      const serverProfile = (await resp.json()) as ProfileConfig;

      saveLocalPortfolioState({
        ...nextState,
        profile: serverProfile,
      });

      return serverProfile;
    }
  } catch {
    // Persisted locally
  }

  return updatedProfile;
}

/* --------------------------------------------------
   ADMIN: ADD SKILL
-------------------------------------------------- */

export async function addSkillAdmin(
  skill: Omit<Skill, 'id'>
): Promise<Skill> {
  const current = getLocalPortfolioState();

  const newSkill: Skill = {
    ...skill,
    id: Date.now(),
  };

  const nextSkills = [...current.skills, newSkill];

  saveLocalPortfolioState({
    ...current,
    skills: nextSkills,
    stats: {
      ...current.stats,
      total_skills: nextSkills.length,
    },
  });

  try {
    const resp = await fetch(`${API_BASE}/admin/skills`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(skill),
    });

    if (resp.ok) {
      return (await resp.json()) as Skill;
    }
  } catch {
    // Persisted locally
  }

  return newSkill;
}

/* --------------------------------------------------
   ADMIN: DELETE SKILL
-------------------------------------------------- */

export async function deleteSkillAdmin(
  skillId: number
): Promise<void> {
  const current = getLocalPortfolioState();

  const nextSkills = current.skills.filter(
    (skill) => skill.id !== skillId
  );

  saveLocalPortfolioState({
    ...current,
    skills: nextSkills,
    stats: {
      ...current.stats,
      total_skills: nextSkills.length,
    },
  });

  try {
    await fetch(`${API_BASE}/admin/skills/${skillId}`, {
      method: 'DELETE',
    });
  } catch {
    // Persisted locally
  }
}

/* --------------------------------------------------
   ADMIN: SAVE PROJECT
-------------------------------------------------- */

export async function saveProjectAdmin(
  project: Project
): Promise<Project> {
  const current = getLocalPortfolioState();

  const exists = current.projects.some(
    (p) => p.id === project.id || p.slug === project.slug
  );

  const nextProjects = exists
    ? current.projects.map((p) =>
        p.id === project.id || p.slug === project.slug
          ? project
          : p
      )
    : [
        ...current.projects,
        {
          ...project,
          id: Date.now(),
        },
      ];

  saveLocalPortfolioState({
    ...current,
    projects: nextProjects,
    stats: {
      ...current.stats,
      flagship_projects: nextProjects.length,
    },
  });

  try {
    const method = exists ? 'PUT' : 'POST';

    const url = exists
      ? `${API_BASE}/admin/projects/${project.id}`
      : `${API_BASE}/admin/projects`;

    const resp = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    });

    if (resp.ok) {
      return (await resp.json()) as Project;
    }
  } catch {
    // Persisted locally
  }

  return project;
}

/* --------------------------------------------------
   ADMIN: DELETE PROJECT
-------------------------------------------------- */

export async function deleteProjectAdmin(
  projectId: number
): Promise<void> {
  const current = getLocalPortfolioState();

  const nextProjects = current.projects.filter(
    (project) => project.id !== projectId
  );

  saveLocalPortfolioState({
    ...current,
    projects: nextProjects,
    stats: {
      ...current.stats,
      flagship_projects: nextProjects.length,
    },
  });

  try {
    await fetch(`${API_BASE}/admin/projects/${projectId}`, {
      method: 'DELETE',
    });
  } catch {
    // Persisted locally
  }
}

/* --------------------------------------------------
   CONTACT FORM
-------------------------------------------------- */

export async function submitContactMessage(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}): Promise<{
  success: boolean;
  message: string;
  delivery_mode: string;
  mailto_fallback_url: string;
}> {
  const receiver = 'sauravtiwari2712005@gmail.com';

  const mailtoUrl = `mailto:${receiver}?subject=${encodeURIComponent(
    `[Portfolio] ${payload.subject}`
  )}&body=${encodeURIComponent(
    `From: ${payload.name} (${payload.email})\n\n${payload.message}`
  )}`;

  // Save locally for the Control Center
  try {
    const raw = localStorage.getItem(CONTACTS_STORAGE_KEY);

    const list: ContactSubmissionItem[] = raw
      ? JSON.parse(raw)
      : [];

    list.unshift({
      id: Date.now(),
      name: payload.name,
      email: payload.email,
      subject: payload.subject,
      message: payload.message,
      status: 'received',
      delivery_method: 'database_with_mailto_fallback',
      created_at: new Date().toISOString(),
    });

    localStorage.setItem(
      CONTACTS_STORAGE_KEY,
      JSON.stringify(list)
    );
  } catch {
    // Ignore local storage errors
  }

  try {
    const resp = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (resp.ok) {
      return await resp.json();
    }
  } catch {
    // Fallback when running statically
  }

  return {
    success: true,
    message:
      'Your message has been logged! Because no external SMTP email server is configured in this environment, you can also click below to open your email client directly with your pre-filled message.',
    delivery_mode: 'local_with_mailto_fallback',
    mailto_fallback_url: mailtoUrl,
  };
}

/* --------------------------------------------------
   ADMIN: FETCH CONTACT SUBMISSIONS
-------------------------------------------------- */

export async function fetchContactSubmissions(): Promise<
  ContactSubmissionItem[]
> {
  try {
    const resp = await fetch(`${API_BASE}/admin/contacts`);

    if (resp.ok) {
      return (await resp.json()) as ContactSubmissionItem[];
    }
  } catch {
    // Fall back to localStorage
  }

  try {
    const raw = localStorage.getItem(CONTACTS_STORAGE_KEY);

    return raw
      ? (JSON.parse(raw) as ContactSubmissionItem[])
      : [];
  } catch {
    return [];
  }
}

/* --------------------------------------------------
   LOCAL AI PORTFOLIO ASSISTANT
-------------------------------------------------- */

export function generateLocalAssistantAnswer(
  question: string,
  portfolio: PortfolioData
): {
  reply: string;
  mode: string;
  sources: string[];
  suggested_followups: string[];
} {
  const q = question.toLowerCase().trim();

  const {
    profile,
    projects,
    skills,
    experiences,
    certifications,
  } = portfolio;

  const projectCount = projects.length;

  // Match a specific project
  for (const p of projects) {
    const slugWords = p.slug
      .split('-')
      .filter((word) => word.length > 3);

    if (
      slugWords.some((word) => q.includes(word)) ||
      q.includes(p.title.toLowerCase())
    ) {
      const features = p.key_features
        .slice(0, 5)
        .map((feature) => `• ${feature}`)
        .join('\n');

      let reply = `**${p.title}** (*${p.subtitle}*)\n\n**Overview:** ${p.overview}\n\n**Key Features:**\n${features}\n\n**Tech Stack:** ${p.tech_stack.join(', ')}\n\n**GitHub Repository:** ${p.github_url}`;

      if (p.disclaimer) {
        reply += `\n\n*Note: ${p.disclaimer}*`;
      }

      return {
        reply,
        mode: 'verified_local_rag',
        sources: [
          `Project: ${p.title}`,
          'Verified Resume & GitHub',
        ],
        suggested_followups: [
          'What are all my flagship projects?',
          "Tell me about Saurav's Generative AI skills",
          'How can I contact Saurav?',
        ],
      };
    }
  }

  // List all projects
  if (
    [
      'project',
      'built',
      'work',
      'system',
      'portfolio',
      'mcp',
      'rag',
      'clinical',
      'opspilot',
      'cyber',
    ].some((keyword) => q.includes(keyword))
  ) {
    const list = projects
      .map(
        (project, index) =>
          `${index + 1}. **${project.title}** (${project.subtitle})\n   ${project.short_description}\n   **Stack:** ${project.tech_stack
            .slice(0, 6)
            .join(', ')}`
      )
      .join('\n\n');

    return {
      reply: `Saurav Kumar has engineered **${projectCount} flagship AI, ML, and Agentic systems**:\n\n${list}\n\nAsk me about any specific system for its architecture, workflow, and GitHub link!`,
      mode: 'verified_local_rag',
      sources: ['Projects Database', 'Verified Resume'],
      suggested_followups: [
        'Explain the Clinical Risk & Patient Outcome Intelligence System',
        'How does OpsPilot AI work?',
        'Tell me about the Autonomous Cyber Defense System',
      ],
    };
  }

  // Technical skills
  if (
    [
      'skill',
      'stack',
      'tech',
      'language',
      'framework',
      'python',
      'fastapi',
      'langchain',
      'langgraph',
      'pytorch',
    ].some((keyword) => q.includes(keyword))
  ) {
    const byCat: Record<string, string[]> = {};

    for (const skill of skills) {
      if (!byCat[skill.category]) {
        byCat[skill.category] = [];
      }

      byCat[skill.category].push(skill.name);
    }

    const lines = Object.entries(byCat)
      .map(
        ([category, names]) =>
          `• **${category}:** ${names.join(', ')}`
      )
      .join('\n');

    return {
      reply: `Here is **Saurav Kumar's** verified technical skill set across **${Object.keys(byCat).length} engineering domains**:\n\n${lines}`,
      mode: 'verified_local_rag',
      sources: ['Technical Skills Matrix', 'Verified Resume'],
      suggested_followups: [
        'Tell me about my AI projects',
        'What is my internship experience?',
        'What certifications have I earned?',
      ],
    };
  }

  // Internship and experience
  if (
    [
      'intern',
      'experience',
      'eduskills',
      'aicte',
      'siemens',
    ].some((keyword) => q.includes(keyword))
  ) {
    const exp = experiences[0];

    if (exp) {
      const bullets = exp.highlights
        .map((highlight) => `• ${highlight}`)
        .join('\n');

      return {
        reply: `**${exp.role} — ${exp.organization}**\n*${exp.collaboration}* | **${exp.duration}** (${exp.mode})\n\n${bullets}\n\n**Skills Applied:** ${exp.skills_applied.join(', ')}`,
        mode: 'verified_local_rag',
        sources: [
          'Professional Experience',
          'EduSkills / AICTE & Siemens',
        ],
        suggested_followups: [
          'What projects have I built?',
          'What is my educational background?',
          'How can I contact Saurav?',
        ],
      };
    }
  }

  // Education
  if (
    [
      'education',
      'university',
      'college',
      'degree',
      'b.tech',
      'mit adt',
    ].some((keyword) => q.includes(keyword))
  ) {
    return {
      reply: `**Education:**\n• **Degree:** ${profile.education_degree}\n• **Institution:** ${profile.education_institution}\n• **Duration:** ${profile.education_duration}\n• **Academic Focus:** ${profile.education_focus}`,
      mode: 'verified_local_rag',
      sources: [
        'Education Record',
        'MIT ADT University, Pune',
      ],
      suggested_followups: [
        'What certifications do I hold?',
        'Show me my AI projects',
        'Tell me about my internship',
      ],
    };
  }

  // Certifications
  if (
    ['certif', 'credential', 'course'].some((keyword) =>
      q.includes(keyword)
    )
  ) {
    const certs = certifications
      .map(
        (certification) =>
          `• **${certification.title}** (*${certification.domain}*)`
      )
      .join('\n');

    return {
      reply: `Saurav holds **${certifications.length} verified certifications**:\n\n${certs}\n\n**Verification Link:** ${profile.certifications_drive_url}`,
      mode: 'verified_local_rag',
      sources: ['Certifications Gallery', 'Verified Resume'],
      suggested_followups: [
        'Tell me about my projects',
        'What are my Generative AI skills?',
        'How can I contact Saurav?',
      ],
    };
  }

  // Contact information
  if (
    [
      'contact',
      'email',
      'phone',
      'hire',
      'available',
      'linkedin',
      'github',
      'location',
    ].some((keyword) => q.includes(keyword))
  ) {
    return {
      reply: `You can reach **Saurav Kumar** directly via:\n\n• **Availability:** ${profile.availability_status}\n• **Email:** ${profile.email}\n• **Phone:** ${profile.phone}\n• **Location:** ${profile.location}\n• **LinkedIn:** ${profile.linkedin_url}\n• **GitHub:** ${profile.github_url}`,
      mode: 'verified_local_rag',
      sources: [
        'Contact Information',
        'Live Availability Status',
      ],
      suggested_followups: [
        'What are my top AI projects?',
        'Summarize my technical skills',
        'Tell me about my internship',
      ],
    };
  }

  // Default response
  return {
    reply: `Hello! I am **Saurav AI**, the interactive portfolio assistant for **${profile.name}** (*${profile.professional_identity}*).\n\n• **Core Expertise:** Machine Learning, Deep Learning, Explainable AI (SHAP), RAG Pipelines, LangGraph Multi-Agent Systems, Model Context Protocol (MCP) Servers, and FastAPI MLOps deployment.\n• **Education:** ${profile.education_degree} (${profile.education_focus}) at ${profile.education_institution} (${profile.education_duration}).\n• **Internship:** Data Science Intern — EduSkills Foundation in collaboration with AICTE & Siemens (April 2026 – June 2026).\n• **Availability:** ${profile.availability_status}\n\nAsk me anything about Saurav's ${projectCount} flagship projects, technical stack, internship, or contact details!`,
    mode: 'verified_local_rag',
    sources: [
      'Verified Resume',
      'Portfolio Knowledge Base',
    ],
    suggested_followups: [
      "Tell me about Saurav's flagship AI projects",
      'Explain the Clinical Risk & Patient Outcome Intelligence System',
      "What are Saurav's Generative AI and Agentic AI skills?",
      'How can I contact Saurav?',
    ],
  };
}
