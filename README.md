# Saurav Kumar — Advanced Full-Stack AI Engineer & Data Scientist Portfolio

> **"Engineering Intelligence. Building Systems That Think."**

A production-ready, full-stack personal portfolio, AI engineering command dashboard, and interactive 3D technical showcase built for **Saurav Kumar** (*AI Engineer | Data Scientist | Machine Learning Engineer | Generative AI Developer*).

---

## 1. Key Highlights & Architecture

- **Interactive 3D Neural WebGL/Canvas Engine (`ThreeBackground.tsx` & `Section3DBackdrop.tsx`)**:
  - Full-viewport 60fps 3D perspective neural constellation and geometric field that morphs dynamically across sections (`Neural Sphere`, `Tensor Lattice`, `Cyber Helix`, `Quantum Torus`) and reacts to cursor depth and parallax.
  - Slide-complementary 3D orbital gyroscopes, wireframe isometric prisms, and interactive 3D mouse-tracking tilt cards (`Tilt3DCard.tsx`) with specular spotlight glare.
- **5 Flagship AI & ML Engineering Case Studies**:
  1. **Clinical Risk & Patient Outcome Intelligence System** (`ML / MLOps / SHAP / Agentic AI`)
  2. **OpsPilot AI — Incident Intelligence Copilot** (`Isolation Forest / TF-IDF Runbook RAG / Agent`)
  3. **Autonomous Cyber Defense System** (`Graph Neural Networks / Graph Autoencoder / Reinforcement Learning`)
  4. **AI Medical Chatbot** (`LangChain / FAISS / Hugging Face Embeddings / Grounded RAG` — *clearly labeled as an educational AI project*)
  5. **Expense Tracker MCP Server** (`FastMCP / Model Context Protocol / SQLite / uv`)
  - Each project features an **Interactive 3D System Architecture Diagram**, a **Dedicated Case Study URL (`/projects/:slug`)**, and an **Interactive End-to-End Pipeline Execution Simulator**.
- **"Saurav AI" Grounded Portfolio Assistant (`AIChatbotWidget.tsx` + `/api/chat/stream`)**:
  - Conversational AI assistant with streaming SSE token output, conversation history, suggested follow-up queries, and verified source badges.
  - Integrates with Groq / OpenAI when `GROQ_API_KEY` or `OPENAI_API_KEY` is configured in `.env`, and automatically falls back to a deterministic, factual local RAG engine when no API key is configured.
- **Functional AI Developer CLI Terminal (`TerminalSection.tsx` + `/api/terminal`)**:
  - Supports `help`, `about`, `skills`, `projects`, `experience`, `education`, `certifications`, `github`, `linkedin`, `contact`, and `clear`, with command history (`ArrowUp` / `ArrowDown`).
- **Live GitHub Integration (`GitHubSection.tsx` + `/api/github/profile`)**:
  - Connects to `https://github.com/saurav526` with backend TTL caching, rate-limit resilience, language breakdown charts, and verified repository snapshots.
- **Open Portfolio Control Dashboard (`/admin`)**:
  - Accessible directly without login barriers so anyone reviewing or managing the portfolio can test live availability toggling, biography updates, adding/removing skills & projects, and inspecting contact submissions.

---

## 2. Project Directory Structure

```text
saurav-ai-portfolio/
├── frontend/
│   ├── public/
│   │   ├── saurav-profile.jpg          # Uploaded professional photograph
│   │   ├── Saurav_Kumar_Resume.pdf     # Uploaded PDF résumé
│   │   ├── robots.txt
│   │   └── sitemap.xml
│   ├── src/
│   │   ├── components/
│   │   │   ├── ThreeBackground.tsx     # 3D perspective neural & geometric canvas engine
│   │   │   ├── Section3DBackdrop.tsx   # Slide-reactive 3D rings, prisms & beams
│   │   │   ├── Tilt3DCard.tsx          # 3D mouse-tracked tilt card with holographic glare
│   │   │   ├── ArchitectureDiagram.tsx # Interactive node-graph architecture inspector
│   │   │   ├── AIChatbotWidget.tsx     # "Saurav AI" streaming RAG assistant
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── CustomCursor.tsx
│   │   │   └── ScrollProgress.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── SkillsSection.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   ├── TerminalSection.tsx
│   │   │   ├── GitHubSection.tsx
│   │   │   ├── EducationCertificationsSection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── ProjectDetailPage.tsx
│   │   │   ├── AdminDashboardPage.tsx
│   │   │   └── NotFoundPage.tsx
│   │   ├── data/
│   │   │   └── portfolioData.ts
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── portfolio.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── routes_portfolio.py
│   │   │   ├── routes_chat.py
│   │   │   ├── routes_github.py
│   │   │   ├── routes_contact.py
│   │   │   └── routes_admin.py
│   │   ├── core/
│   │   │   └── config.py
│   │   ├── database/
│   │   │   ├── db.py
│   │   │   └── seed.py
│   │   ├── models/
│   │   │   └── models.py
│   │   ├── schemas/
│   │   │   └── schemas.py
│   │   ├── services/
│   │   │   ├── ai_assistant.py
│   │   │   ├── github_service.py
│   │   │   └── email_service.py
│   │   └── main.py
│   ├── tests/
│   │   └── test_api.py
│   ├── pytest.ini
│   ├── requirements.txt
│   └── Dockerfile
├── .github/workflows/ci.yml
├── docker-compose.yml
├── Dockerfile
├── .env.example
└── README.md
```

---

## 3. Quick Start (Local Development)

### Step 1 — Backend Setup (FastAPI + SQLite/PostgreSQL)

```powershell
cd saurav-ai-portfolio/backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy ..\.env.example .env

# Start FastAPI server (auto-creates & seeds SQLite database on startup)
uvicorn app.main:app --reload --port 8000
```

- Open API Docs: `http://127.0.0.1:8000/docs`
- Health Check: `http://127.0.0.1:8000/api/health`

### Step 2 — Run Backend Automated Tests

```powershell
cd saurav-ai-portfolio/backend
pytest -v
```

### Step 3 — Frontend Setup (React + TypeScript + Vite + Tailwind CSS)

```powershell
cd saurav-ai-portfolio/frontend
npm install
npm run dev
```

- Open Portfolio in Browser: `http://localhost:5173`
- Open Control Dashboard: `http://localhost:5173/admin`

### Step 4 — Production Build

```powershell
cd saurav-ai-portfolio/frontend
npm run build
npm run preview
```

---

## 4. Docker & Docker Compose Deployment

To launch PostgreSQL + FastAPI Backend + Nginx Frontend in containers:

```bash
cd saurav-ai-portfolio
docker compose up --build
```

- Frontend UI: `http://localhost:5173`
- Backend API: `http://localhost:8000/docs`

---

## 5. External Services & Graceful Fallbacks

| Feature | Optional Env Var | Built-in Fallback Behavior |
| :--- | :--- | :--- |
| **Database** | `DATABASE_URL` | Uses PostgreSQL when configured; automatically falls back to local `sqlite:///./portfolio.db`. |
| **Saurav AI Assistant** | `GROQ_API_KEY` or `OPENAI_API_KEY` | Uses LLM RAG when configured; automatically falls back to the verified local RAG knowledge engine. |
| **GitHub Integration** | `GITHUB_TOKEN` | Uses GitHub public API with 15-minute TTL caching + verified snapshot fallback when offline/rate-limited. |
| **Contact Email** | `SMTP_HOST`, `SMTP_USER`, `SMTP_PASSWORD` | Persists submissions in the database and provides a pre-filled `mailto:` fallback link when SMTP is unconfigured. |
