from datetime import datetime
from typing import Annotated, Any, Optional
from pydantic import BaseModel, ConfigDict, Field, StringConstraints

EmailType = Annotated[
    str,
    StringConstraints(
        strip_whitespace=True,
        min_length=5,
        max_length=150,
        pattern=r"^[^@\s]+@[^@\s]+\.[^@\s]+$",
    ),
]


class ProfileConfigOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    professional_identity: str
    headline: str
    subheadline: str
    bio: str
    location: str
    email: str
    phone: str
    linkedin_url: str
    github_url: str
    education_degree: str
    education_institution: str
    education_duration: str
    education_focus: str
    availability_status: str
    availability_active: bool
    certifications_drive_url: Optional[str] = None


class ProfileConfigUpdate(BaseModel):
    name: Optional[str] = None
    professional_identity: Optional[str] = None
    headline: Optional[str] = None
    subheadline: Optional[str] = None
    bio: Optional[str] = None
    location: Optional[str] = None
    email: Optional[EmailType] = None
    phone: Optional[str] = None
    linkedin_url: Optional[str] = None
    github_url: Optional[str] = None
    education_degree: Optional[str] = None
    education_institution: Optional[str] = None
    education_duration: Optional[str] = None
    education_focus: Optional[str] = None
    availability_status: Optional[str] = None
    availability_active: Optional[bool] = None
    certifications_drive_url: Optional[str] = None


class SkillBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    category: str = Field(..., min_length=2, max_length=100)
    icon_name: str = "Cpu"
    description: Optional[str] = None
    featured: bool = True
    display_order: int = 0


class SkillCreate(SkillBase):
    pass


class SkillUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    icon_name: Optional[str] = None
    description: Optional[str] = None
    featured: Optional[bool] = None
    display_order: Optional[int] = None


class SkillOut(SkillBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


class ExperienceOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    role: str
    organization: str
    collaboration: Optional[str] = None
    duration: str
    mode: str
    summary: str
    highlights: list[str]
    skills_applied: list[str]
    certificate_url: Optional[str] = None


class ExperienceUpdate(BaseModel):
    role: Optional[str] = None
    organization: Optional[str] = None
    collaboration: Optional[str] = None
    duration: Optional[str] = None
    mode: Optional[str] = None
    summary: Optional[str] = None
    highlights: Optional[list[str]] = None
    skills_applied: Optional[list[str]] = None
    certificate_url: Optional[str] = None


class ArchitectureNode(BaseModel):
    id: str
    label: str
    sublabel: Optional[str] = None
    layer: str


class ArchitectureEdge(BaseModel):
    source: str
    target: str
    label: Optional[str] = None


class ProjectBase(BaseModel):
    slug: str = Field(..., min_length=2, max_length=120)
    title: str = Field(..., min_length=2, max_length=200)
    subtitle: str = Field(..., min_length=2, max_length=200)
    category: str = Field(..., min_length=2, max_length=120)
    short_description: str
    overview: str
    problem_statement: str
    proposed_solution: str
    architecture_nodes: list[dict[str, Any]] = Field(default_factory=list)
    architecture_edges: list[dict[str, Any]] = Field(default_factory=list)
    technical_workflow: list[str] = Field(default_factory=list)
    tech_stack: list[str] = Field(default_factory=list)
    key_features: list[str] = Field(default_factory=list)
    implementation_details: list[str] = Field(default_factory=list)
    challenges: list[str] = Field(default_factory=list)
    future_improvements: list[str] = Field(default_factory=list)
    github_url: Optional[str] = None
    disclaimer: Optional[str] = None
    accent_color: str = "#8b5cf6"
    featured: bool = True
    display_order: int = 0


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    category: Optional[str] = None
    short_description: Optional[str] = None
    overview: Optional[str] = None
    problem_statement: Optional[str] = None
    proposed_solution: Optional[str] = None
    architecture_nodes: Optional[list[dict[str, Any]]] = None
    architecture_edges: Optional[list[dict[str, Any]]] = None
    technical_workflow: Optional[list[str]] = None
    tech_stack: Optional[list[str]] = None
    key_features: Optional[list[str]] = None
    implementation_details: Optional[list[str]] = None
    challenges: Optional[list[str]] = None
    future_improvements: Optional[list[str]] = None
    github_url: Optional[str] = None
    disclaimer: Optional[str] = None
    accent_color: Optional[str] = None
    featured: Optional[bool] = None
    display_order: Optional[int] = None


class ProjectOut(ProjectBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


class CertificationBase(BaseModel):
    title: str
    domain: str
    description: str
    verification_url: Optional[str] = None
    skills_covered: list[str] = Field(default_factory=list)
    display_order: int = 0


class CertificationCreate(CertificationBase):
    pass


class CertificationOut(CertificationBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailType
    subject: str = Field(..., min_length=3, max_length=200)
    message: str = Field(..., min_length=10, max_length=4000)
    honeypot: Optional[str] = Field(default="", description="Spam trap field; must remain empty")


class ContactResponse(BaseModel):
    success: bool
    message: str
    submission_id: Optional[int] = None
    delivery_mode: str
    mailto_fallback_url: Optional[str] = None


class ContactSubmissionOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: str
    subject: str
    message: str
    status: str
    delivery_method: str
    created_at: datetime


class ChatHistoryItem(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    session_id: str = Field(default="default-visitor")
    history: list[ChatHistoryItem] = Field(default_factory=list)


class ChatResponse(BaseModel):
    reply: str
    mode: str
    sources: list[str] = Field(default_factory=list)
    suggested_followups: list[str] = Field(default_factory=list)


class TerminalCommandRequest(BaseModel):
    command: str = Field(..., min_length=1, max_length=300)


class TerminalCommandResponse(BaseModel):
    command: str
    output: str
    type: str = "text"
