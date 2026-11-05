from datetime import datetime, timezone
from sqlalchemy import Boolean, Column, DateTime, Integer, JSON, String, Text
from app.database.db import Base

# this module defines the SQLAlchemy ORM models for the portfolio application, including ProfileConfig, Skill, Experience, Project, Certification, ContactSubmission, and ChatAuditLog. Each model corresponds to a database table and includes fields with appropriate data types and constraints. The utc_now function provides a consistent way to set timestamps in UTC for created_at and updated_at fields.
def utc_now():
    return datetime.now(timezone.utc)


class ProfileConfig(Base):
    __tablename__ = "profile_config"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    professional_identity = Column(String(255), nullable=False)
    headline = Column(String(255), nullable=False)
    subheadline = Column(Text, nullable=False)
    bio = Column(Text, nullable=False)
    location = Column(String(150), nullable=False)
    email = Column(String(150), nullable=False)
    phone = Column(String(50), nullable=False)
    linkedin_url = Column(String(255), nullable=False)
    github_url = Column(String(255), nullable=False)
    education_degree = Column(String(180), nullable=False)
    education_institution = Column(String(200), nullable=False)
    education_duration = Column(String(60), nullable=False)
    education_focus = Column(String(180), nullable=False)
    availability_status = Column(String(180), nullable=False)
    availability_active = Column(Boolean, default=True, nullable=False)
    certifications_drive_url = Column(String(500), nullable=True)
    updated_at = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)


class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, unique=True)
    category = Column(String(100), nullable=False, index=True)
    icon_name = Column(String(80), nullable=False, default="Cpu")
    description = Column(String(255), nullable=True)
    featured = Column(Boolean, default=True)
    display_order = Column(Integer, default=0)


class Experience(Base):
    __tablename__ = "experiences"

    id = Column(Integer, primary_key=True, index=True)
    role = Column(String(150), nullable=False)
    organization = Column(String(180), nullable=False)
    collaboration = Column(String(180), nullable=True)
    duration = Column(String(100), nullable=False)
    mode = Column(String(80), nullable=False, default="Virtual (10-Week Program)")
    summary = Column(Text, nullable=False)
    highlights = Column(JSON, nullable=False, default=list)
    skills_applied = Column(JSON, nullable=False, default=list)
    certificate_url = Column(String(500), nullable=True)


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(120), nullable=False, unique=True, index=True)
    title = Column(String(200), nullable=False)
    subtitle = Column(String(200), nullable=False)
    category = Column(String(120), nullable=False)
    short_description = Column(Text, nullable=False)
    overview = Column(Text, nullable=False)
    problem_statement = Column(Text, nullable=False)
    proposed_solution = Column(Text, nullable=False)
    architecture_nodes = Column(JSON, nullable=False, default=list)
    architecture_edges = Column(JSON, nullable=False, default=list)
    technical_workflow = Column(JSON, nullable=False, default=list)
    tech_stack = Column(JSON, nullable=False, default=list)
    key_features = Column(JSON, nullable=False, default=list)
    implementation_details = Column(JSON, nullable=False, default=list)
    challenges = Column(JSON, nullable=False, default=list)
    future_improvements = Column(JSON, nullable=False, default=list)
    github_url = Column(String(500), nullable=True)
    disclaimer = Column(Text, nullable=True)
    accent_color = Column(String(50), default="#8b5cf6")
    featured = Column(Boolean, default=True)
    display_order = Column(Integer, default=0)


class Certification(Base):
    __tablename__ = "certifications"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    domain = Column(String(120), nullable=False)
    description = Column(Text, nullable=False)
    verification_url = Column(String(500), nullable=True)
    skills_covered = Column(JSON, nullable=False, default=list)
    display_order = Column(Integer, default=0)


class ContactSubmission(Base):
    __tablename__ = "contact_submissions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    email = Column(String(150), nullable=False)
    subject = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    status = Column(String(50), default="received")
    delivery_method = Column(String(50), default="database_with_mailto_fallback")
    created_at = Column(DateTime(timezone=True), default=utc_now)


class ChatAuditLog(Base):
    __tablename__ = "chat_audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(100), nullable=False, index=True)
    user_message = Column(Text, nullable=False)
    assistant_response = Column(Text, nullable=False)
    mode = Column(String(60), nullable=False)
    created_at = Column(DateTime(timezone=True), default=utc_now)
