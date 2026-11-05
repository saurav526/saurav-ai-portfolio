from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.models.models import (
    Certification,
    ChatAuditLog,
    ContactSubmission,
    Experience,
    ProfileConfig,
    Project,
    Skill,
)
from app.schemas.schemas import (
    CertificationCreate,
    CertificationOut,
    ContactSubmissionOut,
    ExperienceOut,
    ExperienceUpdate,
    ProfileConfigOut,
    ProfileConfigUpdate,
    ProjectCreate,
    ProjectOut,
    ProjectUpdate,
    SkillCreate,
    SkillOut,
    SkillUpdate,
)

router = APIRouter(prefix="/api/admin", tags=["Portfolio Control Dashboard"])


@router.get("/overview")
def get_admin_overview(db: Session = Depends(get_db)):
    profile = db.query(ProfileConfig).first()
    return {
        "profile": ProfileConfigOut.model_validate(profile) if profile else None,
        "counts": {
            "projects": db.query(Project).count(),
            "skills": db.query(Skill).count(),
            "certifications": db.query(Certification).count(),
            "experiences": db.query(Experience).count(),
            "contact_submissions": db.query(ContactSubmission).count(),
            "ai_chat_queries": db.query(ChatAuditLog).count(),
        },
        "recent_contacts": [
            ContactSubmissionOut.model_validate(c)
            for c in db.query(ContactSubmission)
            .order_by(ContactSubmission.created_at.desc())
            .limit(10)
            .all()
        ],
    }


@router.put("/profile", response_model=ProfileConfigOut)
def update_profile_config(
    payload: ProfileConfigUpdate,
    db: Session = Depends(get_db),
):
    profile = db.query(ProfileConfig).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile configuration not found")

    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(profile, field, value)

    db.commit()
    db.refresh(profile)
    return profile


@router.post("/skills", response_model=SkillOut)
def create_skill(payload: SkillCreate, db: Session = Depends(get_db)):
    existing = db.query(Skill).filter(Skill.name == payload.name).first()
    if existing:
        raise HTTPException(status_code=400, detail=f"Skill '{payload.name}' already exists")
    skill = Skill(**payload.model_dump())
    db.add(skill)
    db.commit()
    db.refresh(skill)
    return skill


@router.put("/skills/{skill_id}", response_model=SkillOut)
def update_skill(
    skill_id: int,
    payload: SkillUpdate,
    db: Session = Depends(get_db),
):
    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(skill, k, v)
    db.commit()
    db.refresh(skill)
    return skill


@router.delete("/skills/{skill_id}")
def delete_skill(skill_id: int, db: Session = Depends(get_db)):
    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    db.delete(skill)
    db.commit()
    return {"deleted": True, "id": skill_id}


@router.post("/projects", response_model=ProjectOut)
def create_project(payload: ProjectCreate, db: Session = Depends(get_db)):
    existing = db.query(Project).filter(Project.slug == payload.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail=f"Project slug '{payload.slug}' already exists")
    project = Project(**payload.model_dump())
    db.add(project)
    db.commit()
    db.refresh(project)
    return project


@router.put("/projects/{project_id}", response_model=ProjectOut)
def update_project(
    project_id: int,
    payload: ProjectUpdate,
    db: Session = Depends(get_db),
):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(project, k, v)
    db.commit()
    db.refresh(project)
    return project


@router.delete("/projects/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(project)
    db.commit()
    return {"deleted": True, "id": project_id}


@router.put("/experiences/{exp_id}", response_model=ExperienceOut)
def update_experience(
    exp_id: int,
    payload: ExperienceUpdate,
    db: Session = Depends(get_db),
):
    exp = db.query(Experience).filter(Experience.id == exp_id).first()
    if not exp:
        raise HTTPException(status_code=404, detail="Experience not found")
    for k, v in payload.model_dump(exclude_unset=True).items():
        setattr(exp, k, v)
    db.commit()
    db.refresh(exp)
    return exp


@router.post("/certifications", response_model=CertificationOut)
def create_certification(payload: CertificationCreate, db: Session = Depends(get_db)):
    cert = Certification(**payload.model_dump())
    db.add(cert)
    db.commit()
    db.refresh(cert)
    return cert


@router.delete("/certifications/{cert_id}")
def delete_certification(cert_id: int, db: Session = Depends(get_db)):
    cert = db.query(Certification).filter(Certification.id == cert_id).first()
    if not cert:
        raise HTTPException(status_code=404, detail="Certification not found")
    db.delete(cert)
    db.commit()
    return {"deleted": True, "id": cert_id}


@router.get("/contacts", response_model=list[ContactSubmissionOut])
def list_contact_submissions(db: Session = Depends(get_db)):
    return (
        db.query(ContactSubmission)
        .order_by(ContactSubmission.created_at.desc())
        .all()
    )


@router.patch("/contacts/{contact_id}/status", response_model=ContactSubmissionOut)
def update_contact_status(
    contact_id: int,
    status: str,
    db: Session = Depends(get_db),
):
    item = db.query(ContactSubmission).filter(ContactSubmission.id == contact_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Contact submission not found")
    item.status = status
    db.commit()
    db.refresh(item)
    return item


# Admin routes for managing the portfolio, including profile configuration, skills, projects, experiences, certifications, and contact submissions. Each route handles CRUD operations and returns appropriate responses or raises HTTP exceptions for error cases.