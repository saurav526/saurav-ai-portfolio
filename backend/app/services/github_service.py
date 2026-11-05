import time
from typing import Any
import httpx
from app.core.config import settings

_GITHUB_CACHE: dict[str, Any] = {
    "timestamp": 0.0,
    "data": None,
}
CACHE_TTL_SECONDS = 900  # 15 minutes


VERIFIED_FALLBACK_REPOS = [
    {
        "name": "Clinical-Risk-Patient-Outcome-Intelligence-System",
        "html_url": "https://github.com/saurav526/Clinical-Risk-Patient-Outcome-Intelligence-System",
        "description": "End-to-end 30-day hospital readmission prediction & clinical intelligence platform with Scikit-learn benchmarking, SHAP explainability, MLflow, FastAPI, PostgreSQL audit logging, Prometheus, and Groq tool-calling agent.",
        "language": "Python",
        "topics": ["machine-learning", "shap", "mlflow", "fastapi", "agentic-ai", "postgresql", "docker"],
        "stargazers_count": None,
        "forks_count": None,
        "updated_at": "2026-10-02T23:37:00Z",
    },
    {
        "name": "OpsPilot_AI_Incident_Intelligence",
        "html_url": "https://github.com/saurav526/OpsPilot_AI_Incident_Intelligence",
        "description": "AI-assisted incident investigation copilot combining Isolation Forest anomaly detection, TF-IDF cosine similarity runbook retrieval, tool-using agent, FastAPI REST API, Streamlit dashboard, and SQLite audit logging.",
        "language": "Python",
        "topics": ["anomaly-detection", "isolation-forest", "rag", "fastapi", "streamlit", "ai-agent"],
        "stargazers_count": None,
        "forks_count": None,
        "updated_at": "2026-10-13T12:21:00Z",
    },
    {
        "name": "autonomous_cyber_defense",
        "html_url": "https://github.com/saurav526/autonomous_cyber_defense",
        "description": "Autonomous Cyber Defense simulation modeling network telemetry as graphs with a self-supervised Graph Autoencoder for reconstruction-error anomaly detection and a Reinforcement Learning response policy.",
        "language": "Python",
        "topics": ["graph-neural-networks", "autoencoder", "reinforcement-learning", "cybersecurity", "streamlit"],
        "stargazers_count": None,
        "forks_count": None,
        "updated_at": "2026-09-04T20:22:00Z",
    },
    {
        "name": "GEN-AI-projects",
        "html_url": "https://github.com/saurav526/GEN-AI-projects/tree/main/Medical_bot2.0",
        "description": "Generative AI repository featuring the AI Medical Chatbot built with LangChain, Hugging Face embeddings, semantic chunking, FAISS vector search, conversational memory, and grounded prompt engineering.",
        "language": "Python",
        "topics": ["langchain", "faiss", "rag", "huggingface", "generative-ai", "prompt-engineering"],
        "stargazers_count": None,
        "forks_count": None,
        "updated_at": "2026-08-18T20:33:00Z",
    },
    {
        "name": "expense-tracker-MCP-server",
        "html_url": "https://github.com/saurav526/expense-tracker-MCP-server",
        "description": "Model Context Protocol (MCP) server built with FastMCP, SQLite parameterized queries, automatic schema creation, and a live-editable categories resource for LLM tool integration.",
        "language": "Python",
        "topics": ["mcp", "fastmcp", "sqlite", "llm-tools", "python", "uv"],
        "stargazers_count": None,
        "forks_count": None,
        "updated_at": "2026-10-01T11:59:00Z",
    },
    {
        "name": "Chatbot-",
        "html_url": "https://github.com/saurav526/Chatbot-",
        "description": "Conversational AI chatbot engineering workflows and LLM integration pipelines in Python.",
        "language": "Python",
        "topics": ["chatbot", "llm", "python", "nlp"],
        "stargazers_count": None,
        "forks_count": None,
        "updated_at": "2026-08-24T23:34:00Z",
    },
]


async def fetch_github_portfolio_data() -> dict[str, Any]:
    now = time.time()
    if _GITHUB_CACHE["data"] is not None and (now - _GITHUB_CACHE["timestamp"]) < CACHE_TTL_SECONDS:
        return {**_GITHUB_CACHE["data"], "cached": True}

    username = settings.GITHUB_USERNAME or "saurav526"
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "Saurav-Kumar-AI-Portfolio",
    }
    if settings.GITHUB_TOKEN:
        headers["Authorization"] = f"Bearer {settings.GITHUB_TOKEN}"

    try:
        async with httpx.AsyncClient(timeout=8.0, headers=headers) as client:
            user_resp = await client.get(f"https://api.github.com/users/{username}")
            repos_resp = await client.get(
                f"https://api.github.com/users/{username}/repos?sort=updated&per_page=12"
            )

            if user_resp.status_code == 200 and repos_resp.status_code == 200:
                user_json = user_resp.json()
                repos_json = repos_resp.json()

                repos_formatted = []
                lang_counts: dict[str, int] = {}

                for r in repos_json:
                    if r.get("fork"):
                        continue
                    lang = r.get("language") or "Python"
                    lang_counts[lang] = lang_counts.get(lang, 0) + 1
                    repos_formatted.append(
                        {
                            "name": r.get("name"),
                            "html_url": r.get("html_url"),
                            "description": r.get("description")
                            or "AI, Machine Learning, and Data Science engineering repository.",
                            "language": lang,
                            "topics": r.get("topics") or [],
                            "stargazers_count": r.get("stargazers_count"),
                            "forks_count": r.get("forks_count"),
                            "updated_at": r.get("updated_at"),
                        }
                    )

                result = {
                    "source": "github_live_api",
                    "cached": False,
                    "profile": {
                        "username": user_json.get("login", username),
                        "name": user_json.get("name") or "Saurav Kumar",
                        "avatar_url": user_json.get("avatar_url"),
                        "html_url": user_json.get("html_url") or f"https://github.com/{username}",
                        "bio": user_json.get("bio")
                        or "AI Engineer | Data Scientist | Machine Learning & Generative AI Developer",
                        "location": user_json.get("location") or "Pune, Maharashtra, India",
                        "public_repos": user_json.get("public_repos"),
                        "followers": user_json.get("followers"),
                        "following": user_json.get("following"),
                    },
                    "repositories": repos_formatted if repos_formatted else VERIFIED_FALLBACK_REPOS,
                    "languages": lang_counts or {"Python": 6, "SQL": 2, "C++": 1, "HTML": 1},
                }
                _GITHUB_CACHE["timestamp"] = now
                _GITHUB_CACHE["data"] = result
                return result
    except Exception:
        pass

    fallback = {
        "source": "verified_repository_snapshot",
        "cached": False,
        "profile": {
            "username": username,
            "name": "Saurav Kumar",
            "avatar_url": "/saurav-profile.jpg",
            "html_url": f"https://github.com/{username}",
            "bio": "Data Science & AI Engineer building RAG pipelines, LangGraph multi-agent workflows, MCP servers, and explainable ML systems.",
            "location": "Pune, Maharashtra, India",
            "public_repos": None,
            "followers": None,
            "following": None,
        },
        "repositories": VERIFIED_FALLBACK_REPOS,
        "languages": {"Python": 5, "SQL": 2, "C++": 1, "HTML": 1},
    }
    return fallback
