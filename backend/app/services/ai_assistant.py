import httpx
from sqlalchemy.orm import Session
from app.core.config import settings
from app.models.models import Certification, Experience, ProfileConfig, Project, Skill


def build_portfolio_context(db: Session) -> str:
    profile = db.query(ProfileConfig).first()
    skills = db.query(Skill).order_by(Skill.display_order).all()
    experiences = db.query(Experience).all()
    projects = db.query(Project).order_by(Project.display_order).all()
    certifications = db.query(Certification).order_by(Certification.display_order).all()

    skill_by_cat: dict[str, list[str]] = {}
    for s in skills:
        skill_by_cat.setdefault(s.category, []).append(s.name)

    skills_text = "\n".join(
        f"- {cat}: {', '.join(names)}" for cat, names in skill_by_cat.items()
    )

    exp_text = "\n".join(
        f"- {e.role} at {e.organization} ({e.collaboration}) | {e.duration}: {e.summary}"
        for e in experiences
    )

    proj_text = "\n".join(
        f"- {p.title} ({p.subtitle}): {p.overview} | Tech Stack: {', '.join(p.tech_stack)} | GitHub: {p.github_url}"
        for p in projects
    )

    cert_text = "\n".join(f"- {c.title} ({c.domain})" for c in certifications)

    if not profile:
        return "Portfolio data initializing."

    return f"""VERIFIED PORTFOLIO KNOWLEDGE BASE FOR SAURAV KUMAR:
Name: {profile.name}
Professional Identity: {profile.professional_identity}
Location: {profile.location}
Email: {profile.email}
Phone: {profile.phone}
LinkedIn: {profile.linkedin_url}
GitHub: {profile.github_url}
Availability: {profile.availability_status} (Active: {profile.availability_active})
Education: {profile.education_degree}, {profile.education_institution} ({profile.education_duration}) — Focus: {profile.education_focus}
Bio: {profile.bio}

EXPERIENCE:
{exp_text}

PROJECTS (5 Flagship Systems):
{proj_text}

TECHNICAL SKILLS:
{skills_text}

CERTIFICATIONS:
{cert_text}
"""


def local_rag_response(user_message: str, db: Session) -> tuple[str, list[str], list[str]]:
    """Deterministic, factual RAG fallback answering strictly from Saurav's verified portfolio database."""
    q = user_message.lower().strip()
    profile = db.query(ProfileConfig).first()
    projects = db.query(Project).order_by(Project.display_order).all()
    skills = db.query(Skill).order_by(Skill.display_order).all()
    experiences = db.query(Experience).all()
    certifications = db.query(Certification).order_by(Certification.display_order).all()

    # Check if asking about a specific project
    for p in projects:
        keywords = [w for w in p.slug.split("-") if len(w) > 3]
        if any(k in q for k in keywords) or p.title.lower() in q:
            features_bullets = "\n".join(f"• {f}" for f in p.key_features[:5])
            reply = (
                f"**{p.title}** ({p.subtitle})\n\n"
                f"**Overview:** {p.overview}\n\n"
                f"**Key Features:**\n{features_bullets}\n\n"
                f"**Tech Stack:** {', '.join(p.tech_stack)}\n\n"
                f"**GitHub Repository:** {p.github_url}"
            )
            if p.disclaimer:
                reply += f"\n\n*Note: {p.disclaimer}*"
            return (
                reply,
                [f"Project: {p.title}", "Verified Resume & GitHub Repository"],
                [
                    "What are all 5 flagship projects?",
                    "Tell me about Saurav's technical skills",
                    "How can I contact Saurav?",
                ],
            )

    if any(k in q for k in ["project", "built", "work", "portfolio", "system", "mcp", "rag", "clinical", "opspilot", "cyber"]):
        proj_lines = []
        for idx, p in enumerate(projects, 1):
            proj_lines.append(
                f"{idx}. **{p.title}** — *{p.subtitle}*\n"
                f"   {p.short_description}\n"
                f"   **Stack:** {', '.join(p.tech_stack[:7])} | [GitHub]({p.github_url})"
            )
        reply = (
            "Saurav has engineered **5 flagship AI, ML, and Agentic systems**:\n\n"
            + "\n\n".join(proj_lines)
            + "\n\nAsk me about any specific project (e.g., *Clinical Risk System*, *OpsPilot AI*, *Autonomous Cyber Defense*, *AI Medical Chatbot*, or *Expense Tracker MCP Server*) for its architecture and implementation details!"
        )
        return (
            reply,
            ["Projects Database", "Resume Projects Section"],
            [
                "Explain the Clinical Risk & Patient Outcome Intelligence System",
                "How does OpsPilot AI work?",
                "Tell me about the Expense Tracker MCP Server",
            ],
        )

    if any(k in q for k in ["skill", "stack", "tech", "language", "framework", "tool", "python", "fastapi", "langchain", "langgraph", "pytorch"]):
        by_cat: dict[str, list[str]] = {}
        for s in skills:
            by_cat.setdefault(s.category, []).append(s.name)
        lines = [f"• **{cat}:** {', '.join(names)}" for cat, names in by_cat.items()]
        reply = (
            "Here is Saurav Kumar's verified technical stack across **8 core domains**:\n\n"
            + "\n".join(lines)
        )
        return (
            reply,
            ["Skills Matrix", "Verified Resume"],
            [
                "What projects use FastAPI and LangChain?",
                "Tell me about Saurav's internship experience",
                "What certifications has Saurav completed?",
            ],
        )

    if any(k in q for k in ["intern", "experience", "eduskills", "aicte", "siemens", "work history", "job"]):
        exp = experiences[0] if experiences else None
        if exp:
            bullets = "\n".join(f"• {h}" for h in exp.highlights)
            reply = (
                f"**{exp.role} — {exp.organization}**\n"
                f"*{exp.collaboration}* | **{exp.duration}** ({exp.mode})\n\n"
                f"{bullets}\n\n"
                f"**Applied Skills:** {', '.join(exp.skills_applied)}"
            )
        else:
            reply = "Saurav completed a 10-week Data Science Virtual Internship with EduSkills Foundation in collaboration with AICTE and Siemens (April 2026 – June 2026)."
        return (
            reply,
            ["Professional Experience", "EduSkills / AICTE & Siemens"],
            [
                "What projects has Saurav built?",
                "What is Saurav's educational background?",
                "Show Saurav's contact details",
            ],
        )

    if any(k in q for k in ["education", "college", "university", "degree", "b.tech", "btech", "mit adt", "study", "student"]):
        reply = (
            f"**Education:**\n"
            f"• **Degree:** {profile.education_degree}\n"
            f"• **Institution:** {profile.education_institution}\n"
            f"• **Duration:** {profile.education_duration}\n"
            f"• **Academic Focus:** {profile.education_focus}\n\n"
            f"Saurav combines strong academic foundations in Data Science and Artificial Intelligence with practical, end-to-end engineering of ML, RAG, and Agentic AI systems."
        )
        return (
            reply,
            ["Education Record", "MIT ADT University, Pune"],
            [
                "What certifications does Saurav hold?",
                "Show me Saurav's 5 AI projects",
                "What is Saurav's internship experience?",
            ],
        )

    if any(k in q for k in ["certif", "course", "credential"]):
        cert_lines = [f"• **{c.title}** (*{c.domain}*)" for c in certifications]
        reply = (
            "Saurav holds **6 verified certifications** across AI, Machine Learning, Deep Learning, and Data Analytics:\n\n"
            + "\n".join(cert_lines)
            + f"\n\n**Verification Folder:** [Google Drive Certificate Repository]({profile.certifications_drive_url})"
        )
        return (
            reply,
            ["Certifications Gallery", "Verified Resume Link"],
            [
                "Tell me about Saurav's projects",
                "What are Saurav's GenAI & Agentic AI skills?",
                "How can I contact Saurav?",
            ],
        )

    if any(k in q for k in ["contact", "email", "phone", "reach", "hire", "available", "availability", "linkedin", "github", "location", "pune"]):
        reply = (
            f"You can connect with **Saurav Kumar** directly through any of the following verified channels:\n\n"
            f"• **Availability:** {profile.availability_status}\n"
            f"• **Email:** [{profile.email}](mailto:{profile.email})\n"
            f"• **Phone:** {profile.phone}\n"
            f"• **Location:** {profile.location}\n"
            f"• **LinkedIn:** [{profile.linkedin_url}]({profile.linkedin_url})\n"
            f"• **GitHub:** [{profile.github_url}]({profile.github_url})\n\n"
            f"You can also use the **Contact Section** on this portfolio or download his PDF résumé directly from the hero navigation."
        )
        return (
            reply,
            ["Contact Information", "Availability Status"],
            [
                "What are Saurav's top AI projects?",
                "Summarize Saurav's resume",
                "What is Saurav's technical skill set?",
            ],
        )

    # Default comprehensive summary
    reply = (
        f"Hello! I'm **Saurav AI**, the portfolio intelligence assistant for **{profile.name}** "
        f"(*{profile.professional_identity}*).\n\n"
        f"**Quick Executive Summary:**\n"
        f"• **Focus:** End-to-end Machine Learning, Explainable AI (SHAP), RAG pipelines, LangGraph Multi-Agent workflows, MCP servers, and FastAPI backend deployment.\n"
        f"• **Education:** {profile.education_degree} in {profile.education_focus} at {profile.education_institution} ({profile.education_duration}).\n"
        f"• **Experience:** Data Science Intern at EduSkills Foundation (in collaboration with AICTE & Siemens, April 2026 – June 2026).\n"
        f"• **Flagship Projects:** Clinical Risk & Patient Outcome Intelligence System, OpsPilot AI, Autonomous Cyber Defense System, AI Medical Chatbot, and Expense Tracker MCP Server.\n"
        f"• **Availability:** {profile.availability_status}\n\n"
        f"What would you like to explore in detail?"
    )
    return (
        reply,
        ["Verified Resume", "Structured Portfolio Knowledge Base"],
        [
            "Tell me about Saurav's 5 flagship AI projects",
            "What are Saurav's Generative AI and Agentic AI skills?",
            "Tell me about the Clinical Risk & Patient Outcome Intelligence System",
            "How can I contact Saurav?",
        ],
    )


async def generate_assistant_reply(
    user_message: str,
    history: list[dict[str, str]],
    db: Session,
) -> tuple[str, str, list[str], list[str]]:
    """
    Attempts LLM generation with Groq or OpenAI if configured via environment variables;
    otherwise uses the verified local RAG knowledge engine.
    """
    context = build_portfolio_context(db)
    fallback_reply, sources, followups = local_rag_response(user_message, db)

    system_prompt = (
        "You are 'Saurav AI', the official portfolio AI assistant for Saurav Kumar "
        "(AI Engineer | Data Scientist | Machine Learning Engineer | Generative AI Developer). "
        "You must answer strictly using the verified portfolio knowledge provided below. "
        "NEVER invent achievements, employment history, metrics, or unverified claims. "
        "Note that the AI Medical Chatbot and Clinical Risk System are educational/engineering projects using synthetic/reference data, not clinically validated diagnostic tools. "
        "Keep responses concise, structured in clean Markdown, and technically articulate.\n\n"
        f"{context}"
    )

    if settings.GROQ_API_KEY:
        try:
            messages = [{"role": "system", "content": system_prompt}]
            for h in history[-6:]:
                messages.append({"role": h.get("role", "user"), "content": h.get("content", "")})
            messages.append({"role": "user", "content": user_message})

            async with httpx.AsyncClient(timeout=15.0) as client:
                resp = await client.post(
                    "https://api.groq.com/openai/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {settings.GROQ_API_KEY}",
                        "Content-Type": "application/json",
                    },
                    json={
                        "model": settings.GROQ_MODEL,
                        "messages": messages,
                        "temperature": 0.2,
                        "max_tokens": 700,
                    },
                )
                if resp.status_code == 200:
                    data = resp.json()
                    llm_text = data["choices"][0]["message"]["content"]
                    return llm_text, "groq_llm_rag", sources, followups
        except Exception:
            pass

    if settings.OPENAI_API_KEY:
        try:
            messages = [{"role": "system", "content": system_prompt}]
            for h in history[-6:]:
                messages.append({"role": h.get("role", "user"), "content": h.get("content", "")})
            messages.append({"role": "user", "content": user_message})

            async with httpx.AsyncClient(timeout=15.0) as client:
                resp = await client.post(
                    "https://api.openai.com/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {settings.OPENAI_API_KEY}",
                        "Content-Type": "application/json",
                    },
                    json={
                        "model": settings.OPENAI_MODEL,
                        "messages": messages,
                        "temperature": 0.2,
                        "max_tokens": 700,
                    },
                )
                if resp.status_code == 200:
                    data = resp.json()
                    llm_text = data["choices"][0]["message"]["content"]
                    return llm_text, "openai_llm_rag", sources, followups
        except Exception:
            pass

    return fallback_reply, "verified_local_rag", sources, followups
