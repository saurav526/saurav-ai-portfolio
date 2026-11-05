import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from app.api import (routes_admin,routes_chat, routes_contact,routes_github,routes_portfolio)
from app.core.config import settings
from app.database.db import Base, SessionLocal, engine
from app.database.seed import seed_database
# main.py is the entry point for the FastAPI application, setting up the app instance, middleware, and routes. It includes a lifespan context manager to create database tables and seed initial data. The application serves API endpoints for portfolio management, AI assistant interactions, GitHub integration, contact handling, and admin dashboard functionalities. It also serves a compiled frontend SPA bundle if available.

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()
    yield


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description=(
        "Full-Stack AI Engineer & Data Scientist Portfolio Backend for Saurav Kumar. "
        "Provides verified portfolio endpoints, Saurav AI RAG assistant, interactive terminal execution, "
        "GitHub integration with caching, contact handling, and live control center APIs."
    ),
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(routes_portfolio.router)
app.include_router(routes_chat.router)
app.include_router(routes_github.router)
app.include_router(routes_contact.router)
app.include_router(routes_admin.router)


@app.get("/api/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "llm_configured": bool(settings.GROQ_API_KEY or settings.OPENAI_API_KEY),
    }


# Serve compiled frontend SPA bundle if available
_FRONTEND_DIST = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..", "frontend", "dist")
)
if os.path.isdir(_FRONTEND_DIST):
    _ASSETS_DIR = os.path.join(_FRONTEND_DIST, "assets")
    if os.path.isdir(_ASSETS_DIR):
        app.mount("/assets", StaticFiles(directory=_ASSETS_DIR), name="assets")

    @app.get("/{full_path:path}", include_in_schema=False)
    def serve_spa(full_path: str):
        requested = os.path.join(_FRONTEND_DIST, full_path)
        if full_path and os.path.isfile(requested):
            return FileResponse(requested)
        return FileResponse(os.path.join(_FRONTEND_DIST, "index.html"))
