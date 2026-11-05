from fastapi import APIRouter
from app.services.github_service import fetch_github_portfolio_data

router = APIRouter(prefix="/api/github", tags=["GitHub Integration"])


@router.get("/profile")
async def get_github_profile():
    return await fetch_github_portfolio_data()

# GitHub integration routes for fetching portfolio data from GitHub. The route retrieves the user's GitHub profile and repositories, returning the data in a structured format for use in the portfolio application.
