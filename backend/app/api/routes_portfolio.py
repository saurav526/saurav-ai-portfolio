from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.models import (
    Certification,
    Experience,
    ProfileConfig,
    Project,
    Skill,
)
from app.schemas.schemas import (
    CertificationOut,
    ExperienceOut,
    ProfileConfigOut,
    ProjectOut,
    SkillOut,
    TerminalCommandRequest,
    TerminalCommandResponse,
)

router = APIRouter(prefix="/api", tags=["Portfolio"])


@router.get("/portfolio")
def get_full_portfolio(db: Session = Depends(get_db)):
    profile = db.query(ProfileConfig).first()
    skills = db.query(Skill).order_by(Skill.display_order, Skill.id).all()
    experiences = db.query(Experience).order_by(Experience.id).all()
    projects = db.query(Project).order_by(Project.display_order, Project.id).all()
    certifications = db.query(Certification).order_by(Certification.display_order, Certification.id).all()

    categories = sorted({s.category for s in skills})

    return {
        "profile": ProfileConfigOut.model_validate(profile) if profile else None,
        "stats": {
            "flagship_projects": len(projects),
            "technical_domains": len(categories),
            "programming_languages": len([s for s in skills if s.category == "Programming"]),
            "total_skills": len(skills),
            "certifications_count": len(certifications),
            "internship_weeks": 10,
        },
        "skills": [SkillOut.model_validate(s) for s in skills],
        "experiences": [ExperienceOut.model_validate(e) for e in experiences],
        "projects": [ProjectOut.model_validate(p) for p in projects],
        "certifications": [CertificationOut.model_validate(c) for c in certifications],
    }


@router.get("/projects", response_model=list[ProjectOut])
def list_projects(category: Optional[str] = None, db: Session = Depends(get_db)):
    q = db.query(Project)
    if category and category.lower() != "all":
        q = q.filter(Project.category == category)
    return q.order_by(Project.display_order, Project.id).all()


@router.get("/projects/{slug}", response_model=ProjectOut)
def get_project_by_slug(slug: str, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.slug == slug).first()
    if not project:
        raise HTTPException(status_code=404, detail=f"Project '{slug}' not found")
    return project


@router.get("/skills", response_model=list[SkillOut])
def list_skills(
    category: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
):
    q = db.query(Skill)
    if category and category.lower() != "all":
        q = q.filter(Skill.category == category)
    if search:
        q = q.filter(Skill.name.ilike(f"%{search}%"))
    return q.order_by(Skill.display_order, Skill.id).all()


@router.post("/terminal", response_model=TerminalCommandResponse)
def execute_terminal_command(
    payload: TerminalCommandRequest,
    db: Session = Depends(get_db),
):
    raw = payload.command.strip()
    parts = raw.split()
    cmd = parts[0].lower() if parts else "help"

    profile = db.query(ProfileConfig).first()
    projects = db.query(Project).order_by(Project.display_order).all()
    skills = db.query(Skill).order_by(Skill.display_order).all()
    experiences = db.query(Experience).all()
    certs = db.query(Certification).order_by(Certification.display_order).all()

    if cmd == "help":
        out = (
            "AVAILABLE SAURAV-OS TERMINAL COMMANDS:\n"
            "  help            Display available terminal commands\n"
            "  about           Display Saurav Kumar's biography & identity\n"
            "  skills          List categorized technical skills (Programming, AI/ML, GenAI, Backend, Cloud)\n"
            "  projects        Display the 5 flagship AI & Data Science engineering projects\n"
            "  experience      Display Data Science Internship at EduSkills (AICTE & Siemens)\n"
            "  education       Show B.Tech degree details at MIT ADT University, Pune\n"
            "  certifications  List all 6 verified AI, ML, and Analytics certifications\n"
            "  github          Show GitHub profile URL & flagship repositories\n"
            "  linkedin        Show LinkedIn profile URL\n"
            "  contact         Display email, phone, location & availability status\n"
            "  clear           Clear terminal screen"
        )
        return TerminalCommandResponse(command=raw, output=out)

    if cmd == "about":
        out = (
            f"NAME       : {profile.name}\n"
            f"IDENTITY   : {profile.professional_identity}\n"
            f"LOCATION   : {profile.location}\n"
            f"STATUS     : {profile.availability_status}\n\n"
            f"SUMMARY:\n{profile.bio}"
        )
        return TerminalCommandResponse(command=raw, output=out)

    if cmd == "skills":
        by_cat: dict[str, list[str]] = {}
        for s in skills:
            by_cat.setdefault(s.category, []).append(s.name)
        lines = [f"[{cat.upper()}]\n  " + ", ".join(names) for cat, names in by_cat.items()]
        return TerminalCommandResponse(command=raw, output="\n\n".join(lines))

    if cmd == "projects":
        lines = []
        for idx, p in enumerate(projects, 1):
            lines.append(
                f"0{idx}. {p.title} [{p.subtitle}]\n"
                f"    Desc  : {p.short_description}\n"
                f"    Stack : {', '.join(p.tech_stack)}\n"
                f"    Repo  : {p.github_url}"
            )
        return TerminalCommandResponse(command=raw, output="\n\n".join(lines))

    if cmd == "experience":
        exp = experiences[0] if experiences else None
        if not exp:
            return TerminalCommandResponse(command=raw, output="No experience entries found.")
        bullets = "\n".join(f"  * {h}" for h in exp.highlights)
        out = (
            f"ROLE          : {exp.role}\n"
            f"ORGANIZATION  : {exp.organization} ({exp.collaboration})\n"
            f"DURATION      : {exp.duration} ({exp.mode})\n"
            f"HIGHLIGHTS:\n{bullets}\n"
            f"SKILLS        : {', '.join(exp.skills_applied)}"
        )
        return TerminalCommandResponse(command=raw, output=out)

    if cmd == "education":
        out = (
            f"DEGREE      : {profile.education_degree}\n"
            f"INSTITUTION : {profile.education_institution}\n"
            f"DURATION    : {profile.education_duration}\n"
            f"FOCUS       : {profile.education_focus}"
        )
        return TerminalCommandResponse(command=raw, output=out)

    if cmd == "certifications":
        lines = [f"  [{idx}] {c.title} — {c.domain}" for idx, c in enumerate(certs, 1)]
        lines.append(f"\nVerification Drive: {profile.certifications_drive_url}")
        return TerminalCommandResponse(command=raw, output="\n".join(lines))

    if cmd == "github":
        lines = [f"GitHub Profile: {profile.github_url}\nRepositories:"]
        for p in projects:
            lines.append(f"  -> {p.github_url}")
        return TerminalCommandResponse(command=raw, output="\n".join(lines))

    if cmd == "linkedin":
        return TerminalCommandResponse(
            command=raw,
            output=f"LinkedIn Profile: {profile.linkedin_url}",
        )

    if cmd == "contact":
        out = (
            f"EMAIL        : {profile.email}\n"
            f"PHONE        : {profile.phone}\n"
            f"LOCATION     : {profile.location}\n"
            f"LINKEDIN     : {profile.linkedin_url}\n"
            f"GITHUB       : {profile.github_url}\n"
            f"AVAILABILITY : {profile.availability_status}"
        )
        return TerminalCommandResponse(command=raw, output=out)

    return TerminalCommandResponse(
        command=raw,
        output=f"Command not recognized: '{cmd}'. Type 'help' to view available commands.",
        type="error",
    )

# Portfolio routes for fetching and managing portfolio data, including profile configuration, skills, projects, experiences, and certifications. The routes provide endpoints for retrieving the full portfolio, listing projects and skills with optional filtering, and executing terminal-like commands to display portfolio information in a structured format.