import os
import sys
import tempfile

# Use an isolated in-memory or temporary SQLite database during test runs
_tmp_db = os.path.join(tempfile.gettempdir(), "saurav_portfolio_unit_test.db")
if os.path.exists(_tmp_db):
    try:
        os.remove(_tmp_db)
    except OSError:
        pass
os.environ["DATABASE_URL"] = f"sqlite:///{_tmp_db}"

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
import pytest
from fastapi import HTTPException
from pydantic import ValidationError
from app.main import health_check
from app.database.db import Base, SessionLocal, engine
from app.database.seed import seed_database
from app.api.routes_portfolio import (
    execute_terminal_command,
    get_full_portfolio,
    get_project_by_slug,
    list_projects,
    list_skills,
)
from app.api.routes_contact import submit_contact_form
from app.api.routes_admin import (
    create_skill,
    delete_skill,
    get_admin_overview,
    update_profile_config,
)
from app.services.ai_assistant import local_rag_response
from app.services.github_service import VERIFIED_FALLBACK_REPOS
from app.schemas.schemas import (
    ContactRequest,
    ProfileConfigUpdate,
    SkillCreate,
    TerminalCommandRequest,
)


@pytest.fixture(scope="module")
def db_session():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    seed_database(db)
    try:
        yield db
    finally:
        db.close()


def test_health_endpoint():
    data = health_check()
    assert data["status"] == "healthy"
    assert "version" in data


def test_full_portfolio_and_seed_integrity(db_session):
    data = get_full_portfolio(db=db_session)
    assert data["profile"].name == "Saurav Kumar"
    assert data["profile"].email == "sauravtiwari2712005@gmail.com"
    assert data["stats"]["flagship_projects"] == 5
    assert data["stats"]["technical_domains"] == 8
    assert len(data["projects"]) == 5
    assert len(data["certifications"]) == 6
    assert len(data["experiences"]) == 1


def test_projects_and_project_detail(db_session):
    projects = list_projects(category=None, db=db_session)
    slugs = [p.slug for p in projects]
    assert "clinical-risk-patient-outcome-intelligence-system" in slugs
    assert "opspilot-ai-incident-intelligence-copilot" in slugs
    assert "autonomous-cyber-defense-system" in slugs
    assert "ai-medical-chatbot" in slugs
    assert "expense-tracker-mcp-server" in slugs

    detail = get_project_by_slug(
        slug="clinical-risk-patient-outcome-intelligence-system",
        db=db_session,
    )
    assert detail.title == "Clinical Risk & Patient Outcome Intelligence System"
    assert len(detail.architecture_nodes) >= 6


def test_skills_filtering_and_search(db_session):
    genai_skills = [
        s.name
        for s in list_skills(
            category="Generative AI and Agentic AI",
            search=None,
            db=db_session,
        )
    ]
    assert "LangChain" in genai_skills
    assert "LangGraph" in genai_skills
    assert "MCP" in genai_skills

    fastapi_matches = list_skills(category=None, search="FastAPI", db=db_session)
    assert any(s.name == "FastAPI" for s in fastapi_matches)


def test_terminal_commands(db_session):
    for cmd in [
        "help",
        "about",
        "skills",
        "projects",
        "experience",
        "education",
        "certifications",
        "github",
        "linkedin",
        "contact",
    ]:
        resp = execute_terminal_command(
            payload=TerminalCommandRequest(command=cmd),
            db=db_session,
        )
        assert len(resp.output) > 15
        assert resp.type == "text"


def test_saurav_ai_assistant_local_rag(db_session):
    reply, sources, followups = local_rag_response(
        "Tell me about the Clinical Risk & Patient Outcome Intelligence System",
        db=db_session,
    )
    assert "Clinical Risk" in reply
    assert "SHAP" in reply
    assert len(sources) > 0
    assert len(followups) > 0

    skills_reply, _, _ = local_rag_response(
        "What are Saurav's skills in Python and FastAPI?",
        db=db_session,
    )
    assert "Python" in skills_reply
    assert "FastAPI" in skills_reply


def test_github_verified_repositories():
    assert len(VERIFIED_FALLBACK_REPOS) >= 5
    repo_names = [r["name"] for r in VERIFIED_FALLBACK_REPOS]
    assert "Clinical-Risk-Patient-Outcome-Intelligence-System" in repo_names
    assert "OpsPilot_AI_Incident_Intelligence" in repo_names


def test_contact_submission_and_validation(db_session):
    valid_payload = ContactRequest(
        name="Recruiter Jane",
        email="jane@techcompany.com",
        subject="AI Engineering Opportunity",
        message="Hi Saurav, we were impressed by your Clinical Risk and OpsPilot AI systems!",
        honeypot="",
    )
    resp = submit_contact_form(payload=valid_payload, db=db_session)
    assert resp.success is True
    assert resp.mailto_fallback_url.startswith("mailto:sauravtiwari2712005@gmail.com")

    # Invalid email format test
    with pytest.raises(ValidationError):
        ContactRequest(
            name="Tester",
            email="not-an-email",
            subject="Test",
            message="Testing email validation rules",
            honeypot="",
        )

    # Spam honeypot test
    with pytest.raises(HTTPException) as exc:
        spam_payload = ContactRequest(
            name="Spam Bot",
            email="bot@spam.com",
            subject="Spam",
            message="Spam message content here",
            honeypot="i_am_a_bot",
        )
        submit_contact_form(payload=spam_payload, db=db_session)
    assert exc.value.status_code == 400


def test_admin_control_dashboard_endpoints(db_session):
    overview = get_admin_overview(db=db_session)
    assert overview["counts"]["projects"] == 5

    updated = update_profile_config(
        payload=ProfileConfigUpdate(
            availability_status="Available for AI / Data Science Opportunities",
            availability_active=True,
        ),
        db=db_session,
    )
    assert updated.availability_active is True

    new_skill = create_skill(
        payload=SkillCreate(
            name="vLLM",
            category="Generative AI and Agentic AI",
            icon_name="Zap",
            description="High-throughput LLM serving engine",
        ),
        db=db_session,
    )
    assert new_skill.name == "vLLM"
    deleted = delete_skill(skill_id=new_skill.id, db=db_session)
    assert deleted["deleted"] is True
