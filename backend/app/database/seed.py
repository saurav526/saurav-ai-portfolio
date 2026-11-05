from sqlalchemy.orm import Session
from app.models.models import (
    Certification,
    Experience,
    ProfileConfig,
    Project,
    Skill,
)


CERTIFICATIONS_DRIVE_LINK = (
    "https://drive.google.com/drive/folders/1izqhjM5cE3UkkPB9Ul8g8MvFZwVWpUuU?usp=sharing"
)


INITIAL_SKILLS = [
    # Programming
    {"name": "Python", "category": "Programming", "icon_name": "Code2", "description": "Primary language for ML pipelines, FastAPI services, and agentic systems"},
    {"name": "SQL", "category": "Programming", "icon_name": "Database", "description": "Analytical querying, relational schema design, and parameterized operations"},
    {"name": "C++", "category": "Programming", "icon_name": "Terminal", "description": "Data structures, algorithmic problem solving, and systems fundamentals"},
    {"name": "HTML", "category": "Programming", "icon_name": "Globe", "description": "Semantic document structure for web interfaces and dashboards"},
    # AI and Machine Learning
    {"name": "Machine Learning", "category": "AI and Machine Learning", "icon_name": "BrainCircuit", "description": "Supervised and unsupervised modeling, feature engineering, and benchmarking"},
    {"name": "Deep Learning", "category": "AI and Machine Learning", "icon_name": "Network", "description": "Neural network architectures, representation learning, and graph autoencoders"},
    {"name": "NLP", "category": "AI and Machine Learning", "icon_name": "MessageSquareCode", "description": "Text processing, TF-IDF vectorization, semantic chunking, and embeddings"},
    {"name": "LLMs", "category": "AI and Machine Learning", "icon_name": "Sparkles", "description": "Large Language Model integration, reasoning workflows, and grounded generation"},
    {"name": "Anomaly Detection", "category": "AI and Machine Learning", "icon_name": "ShieldAlert", "description": "Isolation Forest and graph autoencoder reconstruction-error detection"},
    {"name": "SHAP", "category": "AI and Machine Learning", "icon_name": "BarChart3", "description": "Explainable AI (XAI) feature attribution for clinical and tabular predictions"},
    {"name": "Model Evaluation", "category": "AI and Machine Learning", "icon_name": "CheckCircle2", "description": "ROC-AUC benchmarking, cross-validation, and rigorous metric validation"},
    # Generative AI and Agentic AI
    {"name": "LangChain", "category": "Generative AI and Agentic AI", "icon_name": "Link", "description": "RAG pipelines, document loaders, conversational memory, and chains"},
    {"name": "LangGraph", "category": "Generative AI and Agentic AI", "icon_name": "GitBranch", "description": "Stateful multi-agent orchestration and cyclical graph workflows"},
    {"name": "LangSmith", "category": "Generative AI and Agentic AI", "icon_name": "Activity", "description": "LLM tracing, observability, and prompt evaluation"},
    {"name": "Multi-Agent Systems", "category": "Generative AI and Agentic AI", "icon_name": "Workflow", "description": "Coordinated autonomous agents with specialized tools and roles"},
    {"name": "Tool Calling", "category": "Generative AI and Agentic AI", "icon_name": "Wrench", "description": "Deterministic function invocation connecting LLMs to ML models and databases"},
    {"name": "MCP", "category": "Generative AI and Agentic AI", "icon_name": "Server", "description": "Model Context Protocol servers exposing structured tools and live resources"},
    {"name": "RAG", "category": "Generative AI and Agentic AI", "icon_name": "SearchCode", "description": "Retrieval-Augmented Generation using FAISS, cosine similarity, and TF-IDF"},
    {"name": "Prompt Engineering", "category": "Generative AI and Agentic AI", "icon_name": "TerminalSquare", "description": "System grounding, structured outputs, and hallucination reduction"},
    # Frameworks and Libraries
    {"name": "PyTorch", "category": "Frameworks and Libraries", "icon_name": "Flame", "description": "Deep learning tensors, neural architectures, and training loops"},
    {"name": "TensorFlow", "category": "Frameworks and Libraries", "icon_name": "Layers", "description": "Deep learning model development and neural network experimentation"},
    {"name": "Scikit-learn", "category": "Frameworks and Libraries", "icon_name": "Cpu", "description": "Logistic Regression, Random Forest, Gradient Boosting, and Isolation Forest"},
    {"name": "Pandas", "category": "Frameworks and Libraries", "icon_name": "Table", "description": "Dataframe manipulation, cleaning, aggregation, and feature pipelines"},
    {"name": "NumPy", "category": "Frameworks and Libraries", "icon_name": "Binary", "description": "Vectorized numerical computation and matrix algebra"},
    {"name": "Matplotlib", "category": "Frameworks and Libraries", "icon_name": "LineChart", "description": "Scientific plotting and exploratory data visualization"},
    {"name": "Seaborn", "category": "Frameworks and Libraries", "icon_name": "PieChart", "description": "Statistical distribution and correlation heatmaps"},
    {"name": "Plotly", "category": "Frameworks and Libraries", "icon_name": "BarChart4", "description": "Interactive analytical charts for clinical and operational dashboards"},
    {"name": "Pydantic", "category": "Frameworks and Libraries", "icon_name": "ShieldCheck", "description": "Strict schema validation and typed data serialization"},
    {"name": "SQLAlchemy", "category": "Frameworks and Libraries", "icon_name": "DatabaseBackup", "description": "ORM persistence and database abstraction across PostgreSQL and SQLite"},
    # Backend Development
    {"name": "FastAPI", "category": "Backend Development", "icon_name": "Zap", "description": "High-performance asynchronous Python REST APIs for ML and agent serving"},
    {"name": "REST APIs", "category": "Backend Development", "icon_name": "Webhook", "description": "Clean endpoint design, request validation, and OpenAPI documentation"},
    {"name": "API Authentication", "category": "Backend Development", "icon_name": "KeyRound", "description": "API-key-secured inference and agent routes"},
    {"name": "Database Integration", "category": "Backend Development", "icon_name": "HardDrive", "description": "Transactional persistence, audit logging, and connection management"},
    # Databases
    {"name": "PostgreSQL", "category": "Databases", "icon_name": "Database", "description": "Production relational database for audit logging and application state"},
    {"name": "MongoDB", "category": "Databases", "icon_name": "FolderKanban", "description": "Document-oriented NoSQL storage for flexible data schemas"},
    {"name": "MySQL", "category": "Databases", "icon_name": "Database", "description": "Relational database management and structured querying"},
    {"name": "SQLite", "category": "Databases", "icon_name": "FileSpreadsheet", "description": "Embedded transactional SQL storage for MCP servers and local audit logs"},
    # Cloud and MLOps
    {"name": "AWS", "category": "Cloud and MLOps", "icon_name": "Cloud", "description": "Cloud infrastructure and scalable deployment workflows"},
    {"name": "Docker", "category": "Cloud and MLOps", "icon_name": "Container", "description": "Containerized ML services and multi-container Docker Compose orchestration"},
    {"name": "Kubernetes", "category": "Cloud and MLOps", "icon_name": "Boxes", "description": "Container orchestration and scalable workload management"},
    {"name": "MLflow", "category": "Cloud and MLOps", "icon_name": "Activity", "description": "Experiment tracking, metric logging, and model registry management"},
    {"name": "Prometheus", "category": "Cloud and MLOps", "icon_name": "Gauge", "description": "Service metrics exposition and operational observability"},
    {"name": "Git", "category": "Cloud and MLOps", "icon_name": "GitMerge", "description": "Version control and collaborative branching workflows"},
    {"name": "GitHub", "category": "Cloud and MLOps", "icon_name": "Github", "description": "Repository hosting, CI workflows, and open-source project documentation"},
    # Analytics and Development Tools
    {"name": "Power BI", "category": "Analytics and Development Tools", "icon_name": "BarChart2", "description": "Business intelligence dashboards and interactive data storytelling"},
    {"name": "Excel", "category": "Analytics and Development Tools", "icon_name": "Sheet", "description": "Spreadsheet modeling, pivot analysis, and tabular inspection"},
    {"name": "Streamlit", "category": "Analytics and Development Tools", "icon_name": "LayoutDashboard", "description": "Interactive data science and ML operational web applications"},
    {"name": "Jupyter Notebook", "category": "Analytics and Development Tools", "icon_name": "BookOpen", "description": "Interactive exploratory data analysis and model prototyping"},
    {"name": "VS Code", "category": "Analytics and Development Tools", "icon_name": "Code", "description": "Primary integrated development environment for full-stack AI engineering"},
    {"name": "Google Colab", "category": "Analytics and Development Tools", "icon_name": "CloudCog", "description": "Cloud-accelerated notebook environment for deep learning experiments"},
]


INITIAL_PROJECTS = [
    {
        "slug": "clinical-risk-patient-outcome-intelligence-system",
        "title": "Clinical Risk & Patient Outcome Intelligence System",
        "subtitle": "ML / MLOps / Explainable AI (SHAP) / Agentic AI Platform",
        "category": "MLOps & Agentic AI",
        "short_description": (
            "An end-to-end 30-day hospital readmission prediction and patient outcome intelligence platform "
            "combining benchmarked ML models, SHAP explainability, MLflow tracking, FastAPI serving, "
            "PostgreSQL audit logging, Prometheus monitoring, and a tool-calling LLM agent."
        ),
        "overview": (
            "Engineered an end-to-end 30-day hospital readmission predictor on a 5,000-record synthetic clinical dataset "
            "with 30 features covering patient demographics, vitals, laboratory measurements, comorbidities, and utilization history. "
            "The system benchmarks Logistic Regression, Random Forest, and Gradient Boosting, automatically selecting the top performer "
            "by ROC-AUC with MLflow experiment tracking, and exposes SHAP explanations and tool-calling agent workflows via an API-key-secured FastAPI service."
        ),
        "problem_statement": (
            "Hospital readmission risk models often operate as opaque black boxes disconnected from operational workflows. "
            "Clinicians and care coordinators need not only accurate 30-day readmission probability estimates, but also transparent "
            "patient-level feature attributions (why a patient is flagged high-risk), auditability of every prediction, and an intuitive "
            "interface to query high-risk cohorts and risk factors without manually running scripts."
        ),
        "proposed_solution": (
            "Built a full-lifecycle MLOps and Agentic AI system where deterministic machine learning handles risk estimation and SHAP "
            "computes local/global feature explanations, while a Groq-powered tool-calling agent invokes structured tools "
            "(predict_patient, explain_patient, high_risk_patients, readmission_factors, dataset_summary) to answer natural-language "
            "clinical intelligence queries grounded strictly in model outputs."
        ),
        "architecture_nodes": [
            {"id": "data", "label": "5,000-Record Synthetic Clinical Dataset", "sublabel": "30 Features • Validation & EDA", "layer": "Ingestion"},
            {"id": "fe", "label": "Feature Engineering & Preprocessing", "sublabel": "Imputation • Scaling • Encoding", "layer": "Pipeline"},
            {"id": "train", "label": "Multi-Model Benchmarking", "sublabel": "LogReg • Random Forest • GradBoost", "layer": "Modeling"},
            {"id": "mlflow", "label": "MLflow Registry & SHAP Engine", "sublabel": "ROC-AUC Selection • Feature Attribution", "layer": "Explainability & MLOps"},
            {"id": "fastapi", "label": "API-Key-Secured FastAPI Service", "sublabel": "REST Endpoints • Prometheus /metrics", "layer": "Serving"},
            {"id": "agent", "label": "Groq Tool-Calling Clinical Agent", "sublabel": "predict • explain • high_risk • factors", "layer": "Agentic Layer"},
            {"id": "db", "label": "PostgreSQL / SQLAlchemy Audit Log", "sublabel": "Prediction & Agent Event Persistence", "layer": "Storage"},
            {"id": "ui", "label": "Streamlit + Plotly Intelligence UI", "sublabel": "Cohort Analytics & Patient Explanations", "layer": "Interface"},
        ],
        "architecture_edges": [
            {"source": "data", "target": "fe", "label": "Validated Schema"},
            {"source": "fe", "target": "train", "label": "30 Engineered Features"},
            {"source": "train", "target": "mlflow", "label": "Best ROC-AUC Model"},
            {"source": "mlflow", "target": "fastapi", "label": "Model + SHAP Explainer"},
            {"source": "fastapi", "target": "agent", "label": "Structured Tools"},
            {"source": "fastapi", "target": "db", "label": "Audit Events"},
            {"source": "fastapi", "target": "ui", "label": "Predictions & Metrics"},
        ],
        "technical_workflow": [
            "Data Ingestion & Validation: Validates the 5,000-row, 30-feature synthetic clinical dataset for schema integrity, realistic correlations, and missing values.",
            "Feature Engineering & Benchmarking: Trains Logistic Regression, Random Forest, and Gradient Boosting pipelines, logging metrics to MLflow and auto-selecting the best estimator by ROC-AUC.",
            "SHAP Explainability Generation: Computes local patient-level SHAP values and global readmission risk factors from the serialized estimator.",
            "Secured FastAPI & Observability: Serves predictions and explanations behind API-key authentication, logs every inference and agent invocation via SQLAlchemy (PostgreSQL/SQLite), and exposes Prometheus metrics at /metrics.",
            "Agentic Tool Orchestration: Routes natural-language questions through Groq LLM tool calling (with a deterministic local fallback when offline) and visualizes cohorts in a Plotly + Streamlit dashboard."
        ],
        "tech_stack": [
            "Python", "Scikit-learn", "SHAP", "MLflow", "FastAPI", "SQLAlchemy",
            "PostgreSQL", "Groq", "Streamlit", "Plotly", "Prometheus", "Docker", "Pytest"
        ],
        "key_features": [
            "Machine learning model benchmarking across Logistic Regression, Random Forest, and Gradient Boosting with automatic ROC-AUC selection",
            "Real SHAP explainability providing patient-specific risk drivers and global feature importance",
            "LLM-powered patient analysis using deterministic agent tool calling (predict, explain, high-risk patients, readmission factors)",
            "MLflow experiment tracking and model registry metadata persistence",
            "API-key-secured FastAPI inference endpoints with Prometheus monitoring (/metrics)",
            "PostgreSQL / SQLAlchemy audit logging for both ML predictions and AI agent executions",
            "Interactive Plotly + Streamlit dashboard, Docker Compose orchestration, and Pytest automated test suite"
        ],
        "implementation_details": [
            "Separated ML inference from LLM communication: the agent never fabricates risk numbers; it invokes trained model tools and synthesizes the returned structured JSON.",
            "Implemented a deterministic agent fallback so the system remains 100% functional even without an external GROQ_API_KEY.",
            "Designed SQLAlchemy models supporting seamless switching between SQLite for instant local execution and PostgreSQL via DATABASE_URL in Docker Compose."
        ],
        "challenges": [
            "Preventing LLM hallucination on quantitative clinical risk scores — solved by enforcing strict tool calling where numerical predictions and SHAP attributions come exclusively from the serialized Scikit-learn/SHAP pipeline.",
            "Maintaining low-latency SHAP explanations during interactive API requests — solved by caching the loaded model and explainer artifacts in the FastAPI service layer."
        ],
        "future_improvements": [
            "Add data drift and prediction distribution monitoring over rolling time windows.",
            "Integrate survival analysis (time-to-readmission) alongside binary 30-day classification.",
            "Add role-based access control and cohort export pipelines."
        ],
        "github_url": "https://github.com/saurav526/Clinical-Risk-Patient-Outcome-Intelligence-System",
        "disclaimer": (
            "Educational & Engineering Demonstration: Uses a 100% synthetic clinical dataset. Not intended for clinical diagnosis or medical decision-making."
        ),
        "accent_color": "#8b5cf6",
        "featured": True,
        "display_order": 1,
    },
    {
        "slug": "opspilot-ai-incident-intelligence-copilot",
        "title": "OpsPilot AI — Incident Intelligence Copilot",
        "subtitle": "Anomaly Detection / TF-IDF Runbook RAG / Tool-Using Agent",
        "category": "AIOps & Incident RAG",
        "short_description": (
            "An AI-assisted incident investigation platform combining Isolation Forest service metric anomaly detection, "
            "TF-IDF cosine-similarity runbook retrieval, and a tool-using investigation agent with FastAPI, Streamlit, and SQLite audit logging."
        ),
        "overview": (
            "Developed an end-to-end incident investigation copilot that detects unusual service metric combinations using Isolation Forest, "
            "retrieves relevant operational runbooks via TF-IDF vectorization and cosine similarity, and orchestrates a tool-using AI agent "
            "(with optional Groq LLM integration and deterministic no-LLM fallback) to recommend safe, read-only investigation steps."
        ),
        "problem_statement": (
            "During service degradation or latency spikes, operational context is fragmented across raw telemetry streams and markdown runbooks. "
            "On-call engineers spend critical time manually correlating anomalous metrics with troubleshooting guides before knowing which read-only checks to run first."
        ),
        "proposed_solution": (
            "Created OpsPilot AI to unify statistical anomaly detection and runbook retrieval behind a single investigation workflow. "
            "Isolation Forest ranks unusual service metric vectors, TF-IDF retrieval surfaces matching operational runbook procedures, "
            "and an agent combines both evidence sources into structured, audited, read-only investigation plans."
        ),
        "architecture_nodes": [
            {"id": "telemetry", "label": "Service Telemetry Stream", "sublabel": "Latency • Error Rate • CPU • Throughput", "layer": "Telemetry"},
            {"id": "iforest", "label": "StandardScaler + Isolation Forest", "sublabel": "Unsupervised Anomaly Scoring", "layer": "Detection"},
            {"id": "runbooks", "label": "Operational Runbook Corpus", "sublabel": "TF-IDF Vectorizer + Cosine Similarity", "layer": "Retrieval (RAG)"},
            {"id": "agent", "label": "Incident Investigation Agent", "sublabel": "Groq LLM + Deterministic Local Fallback", "layer": "Agentic Orchestration"},
            {"id": "api", "label": "FastAPI REST Service", "sublabel": "/anomalies • /investigate • /audit/recent", "layer": "API Layer"},
            {"id": "sqlite", "label": "SQLite Audit Logger", "sublabel": "Immutable Investigation Trace", "layer": "Persistence"},
            {"id": "dashboard", "label": "Streamlit Ops Dashboard", "sublabel": "Anomaly Ranking & Interactive Copilot", "layer": "UI"},
        ],
        "architecture_edges": [
            {"source": "telemetry", "target": "iforest", "label": "Metric Vectors"},
            {"source": "iforest", "target": "agent", "label": "Top Anomalies"},
            {"source": "runbooks", "target": "agent", "label": "Top-K Runbooks"},
            {"source": "agent", "target": "api", "label": "Investigation Plan"},
            {"source": "api", "target": "sqlite", "label": "Audit Log Entry"},
            {"source": "api", "target": "dashboard", "label": "REST JSON"},
        ],
        "technical_workflow": [
            "Telemetry Ingestion & Scaling: Loads multi-service operational metrics and normalizes feature distributions with StandardScaler.",
            "Unsupervised Anomaly Detection: Trains an Isolation Forest model (scripts/train.py) to score and rank anomalous service intervals.",
            "Runbook Retrieval (RAG): Indexes operational runbooks using TF-IDF and ranks relevant troubleshooting sections via cosine similarity.",
            "Tool-Using Investigation Agent: Combines service summaries, anomaly scores, and retrieved runbook passages to synthesize read-only diagnostic steps (using Groq LLM when configured or deterministic local synthesis).",
            "REST API & Audit Persistence: Exposes validated FastAPI endpoints (/health, /metrics/summary, /anomalies, /investigate, /audit/recent) and records every investigation in SQLite."
        ],
        "tech_stack": [
            "Python", "Scikit-learn", "Isolation Forest", "TF-IDF", "FastAPI",
            "Streamlit", "SQLite", "Groq", "Pytest"
        ],
        "key_features": [
            "Unsupervised service metric anomaly detection powered by Scikit-learn Isolation Forest",
            "TF-IDF and cosine-similarity runbook retrieval engine for zero-dependency operational RAG",
            "Tool-using AI agent that correlates metric anomalies with runbook guidance",
            "Optional Groq LLM integration paired with a deterministic no-LLM fallback so the system always runs out of the box",
            "Strictly read-only incident investigation recommendations for operational safety",
            "FastAPI REST service (/anomalies, /investigate, /audit) with Pydantic request validation",
            "SQLite audit logging and Pytest automated verification suite"
        ],
        "implementation_details": [
            "Modularized into clean packages: src/data.py, src/model.py, src/rag.py, src/agent.py, src/db.py, api/main.py, and app/streamlit_app.py.",
            "Designed deterministic fallback synthesis so automated tests (pytest -q) and local demos succeed without requiring external API keys."
        ],
        "challenges": [
            "Correlating quantitative anomaly scores with textual runbooks — solved by passing structured service context and anomaly metadata into the retrieval query builder.",
            "Ensuring operational safety — constrained agent output strictly to read-only verification steps and logged every query to SQLite."
        ],
        "future_improvements": [
            "Upgrade lexical TF-IDF retrieval to hybrid dense + sparse embeddings for broader runbook phrasing coverage.",
            "Add human-in-the-loop approval gates and webhook notifications for PagerDuty/Slack."
        ],
        "github_url": "https://github.com/saurav526/OpsPilot_AI_Incident_Intelligence",
        "disclaimer": (
            "Uses synthetic service telemetry and executes strictly read-only investigation steps."
        ),
        "accent_color": "#06b6d4",
        "featured": True,
        "display_order": 2,
    },
    {
        "slug": "autonomous-cyber-defense-system",
        "title": "Autonomous Cyber Defense System",
        "subtitle": "Graph Neural Networks / Graph Autoencoder / Reinforcement Learning",
        "category": "Graph ML & Cyber AI",
        "short_description": (
            "An intelligent cybersecurity simulation platform that models network telemetry as graphs, detects anomalous traffic via a "
            "self-supervised graph autoencoder, and selects automated defensive actions using a reinforcement-learning response policy."
        ),
        "overview": (
            "Simulated a defensive machine learning environment by synthesizing realistic network telemetry and modeling hosts and traffic flows "
            "as graphs with node- and edge-level features. Trained a self-supervised graph autoencoder that flags suspicious communication patterns "
            "via reconstruction error, paired with a reinforcement-learning policy that selects monitor, rate-limit, isolate, or block actions based on threat severity."
        ),
        "problem_statement": (
            "Traditional signature-based intrusion detection struggles to identify novel lateral movement and coordinated network anomalies "
            "because it inspects packets in isolation rather than capturing topological relationships across communicating nodes."
        ),
        "proposed_solution": (
            "Represented network telemetry as an attributed graph with normalized neighborhood aggregation, trained a self-supervised graph autoencoder "
            "on normal traffic patterns to flag high reconstruction-error anomalies, and coupled it with a reinforcement-learning policy engine that maps "
            "threat severity to graduated defensive actions."
        ),
        "architecture_nodes": [
            {"id": "net", "label": "Synthetic Network Telemetry", "sublabel": "Flows • Packets • Node & Edge Attributes", "layer": "Simulation"},
            {"id": "graph", "label": "Graph Construction & Aggregation", "sublabel": "Normalized Neighborhood Representation", "layer": "Graph Layer"},
            {"id": "gae", "label": "Self-Supervised Graph Autoencoder", "sublabel": "Latent Encoding & Reconstruction", "layer": "Deep Learning"},
            {"id": "err", "label": "Reconstruction Error Thresholding", "sublabel": "Node & Edge Anomaly Scoring", "layer": "Detection"},
            {"id": "rl", "label": "Reinforcement Learning Policy", "sublabel": "Severity-Aware Action Selection", "layer": "Decision Engine"},
            {"id": "act", "label": "Graduated Defensive Response", "sublabel": "Monitor • Rate-Limit • Isolate • Block", "layer": "Response & UI"},
        ],
        "architecture_edges": [
            {"source": "net", "target": "graph", "label": "Host/Flow Topology"},
            {"source": "graph", "target": "gae", "label": "Aggregated Features"},
            {"source": "gae", "target": "err", "label": "Reconstruction Error"},
            {"source": "err", "target": "rl", "label": "Threat Severity State"},
            {"source": "rl", "target": "act", "label": "Optimal Defense Policy"},
        ],
        "technical_workflow": [
            "Synthetic Telemetry Generation: Simulates normal background traffic alongside injected attack patterns with node- and edge-level telemetry attributes.",
            "Graph Construction & Neighborhood Aggregation: Builds communication graphs and computes normalized neighborhood feature representations.",
            "Self-Supervised Graph Autoencoder: Learns compressed latent representations of normal network topology and reconstructs node/edge features.",
            "Reconstruction-Error Anomaly Detection: Computes per-node reconstruction residuals and flags traffic exceeding calibrated anomaly thresholds.",
            "Reinforcement Learning Response Policy: Evaluates anomaly severity and selects between Monitor, Rate-limit, Isolate, or Block actions in an interactive Streamlit dashboard with CSV export."
        ],
        "tech_stack": [
            "Python", "Graph Neural Networks", "Autoencoders", "Reinforcement Learning", "Streamlit"
        ],
        "key_features": [
            "Synthetic network telemetry generator modeling multi-node communication topologies",
            "Graph-based representation of network activity incorporating both node and edge features",
            "Normalized neighborhood aggregation and self-supervised graph autoencoder architecture",
            "Unsupervised anomaly detection driven by feature reconstruction error thresholds",
            "Reinforcement learning response policy mapping threat severity to graduated defensive actions (Monitor, Rate-Limit, Isolate, Block)",
            "Interactive Streamlit cyber defense command dashboard with telemetry inspection and CSV export"
        ],
        "implementation_details": [
            "Implemented end-to-end pipeline from graph adjacency normalization to autoencoder reconstruction scoring and RL policy evaluation.",
            "Provided interactive threshold tuning and policy inspection inside Streamlit."
        ],
        "challenges": [
            "Balancing false-positive containment actions against severe threats — addressed by designing a graduated 4-tier RL action space (Monitor -> Rate-limit -> Isolate -> Block) proportional to reconstruction error severity."
        ],
        "future_improvements": [
            "Evaluate temporal graph networks (TGN) over streaming packet captures.",
            "Benchmark against public intrusion datasets such as CIC-IDS and UNSW-NB15."
        ],
        "github_url": "https://github.com/saurav526/autonomous_cyber_defense",
        "disclaimer": (
            "Educational defensive simulation using synthetic network traffic; response actions do not modify real network infrastructure."
        ),
        "accent_color": "#a855f7",
        "featured": True,
        "display_order": 3,
    },
    {
        "slug": "ai-medical-chatbot",
        "title": "AI Medical Chatbot",
        "subtitle": "Generative AI / Retrieval-Augmented Generation (RAG) / FAISS",
        "category": "Generative AI & RAG",
        "short_description": (
            "A context-aware conversational AI system using Retrieval-Augmented Generation (RAG), semantic chunking, Hugging Face embeddings, "
            "FAISS vector search, and LangChain conversational memory to answer questions grounded in medical knowledge documents."
        ),
        "overview": (
            "Built a context-aware medical knowledge chatbot with LangChain and Hugging Face LLMs, leveraging document ingestion, semantic chunking, "
            "dense vector embeddings, FAISS similarity search, and conversational memory for multi-turn queries. Custom prompt engineering grounds "
            "generated answers strictly in retrieved medical literature to minimize hallucinations."
        ),
        "problem_statement": (
            "General-purpose LLMs can hallucinate or provide unverified claims when asked domain-specific medical reference questions, "
            "and stateless single-turn Q&A fails to preserve context across follow-up questions."
        ),
        "proposed_solution": (
            "Architected a Retrieval-Augmented Generation (RAG) pipeline that ingests authoritative medical documents, splits them into semantic chunks, "
            "indexes vector embeddings in FAISS for fast cosine-similarity retrieval, and uses LangChain with custom grounding prompts and conversational memory."
        ),
        "architecture_nodes": [
            {"id": "docs", "label": "Medical Knowledge Documents", "sublabel": "Reference PDF / Text Corpus", "layer": "Knowledge Base"},
            {"id": "chunk", "label": "Document Ingestion & Semantic Chunking", "sublabel": "Context-Preserving Text Splits", "layer": "Preprocessing"},
            {"id": "embed", "label": "Hugging Face Vector Embeddings", "sublabel": "Dense Semantic Representations", "layer": "Embedding"},
            {"id": "faiss", "label": "FAISS Vector Database", "sublabel": "Cosine-Similarity Top-K Search", "layer": "Vector Store"},
            {"id": "memory", "label": "LangChain Conversational Memory", "sublabel": "Multi-Turn Context Window", "layer": "Orchestration"},
            {"id": "llm", "label": "Grounded LLM Answer Generation", "sublabel": "Custom Anti-Hallucination Prompts", "layer": "Generation"},
        ],
        "architecture_edges": [
            {"source": "docs", "target": "chunk", "label": "Raw Documents"},
            {"source": "chunk", "target": "embed", "label": "Semantic Chunks"},
            {"source": "embed", "target": "faiss", "label": "Dense Vectors"},
            {"source": "faiss", "target": "memory", "label": "Top-K Context"},
            {"source": "memory", "target": "llm", "label": "Prompt + History"},
        ],
        "technical_workflow": [
            "Document Ingestion & Semantic Chunking: Loads reference medical documents and segments them into overlapping semantic chunks to preserve clinical context.",
            "Vector Embedding Generation: Encodes document chunks and user queries into dense vector representations using Hugging Face embedding models.",
            "FAISS Vector Indexing & Retrieval: Stores embeddings in a FAISS index and retrieves the highest-ranking passages via cosine similarity.",
            "Conversational Memory & Prompt Engineering: Combines multi-turn conversation history with retrieved passages inside a custom LangChain prompt template that enforces grounded responses.",
            "Grounded Answer Synthesis: Generates cited, context-aware answers while declining out-of-scope claims."
        ],
        "tech_stack": [
            "Python", "LangChain", "FAISS", "Hugging Face", "Vector Embeddings", "Prompt Engineering"
        ],
        "key_features": [
            "End-to-end document ingestion and context-preserving semantic chunking pipeline",
            "Dense vector embedding generation with Hugging Face models",
            "High-speed similarity retrieval powered by FAISS vector database and cosine-similarity ranking",
            "LangChain integration with conversational memory supporting multi-turn follow-up queries",
            "Custom prompt engineering designed to ground answers in retrieved medical knowledge and reduce hallucinations"
        ],
        "implementation_details": [
            "Configured chunk size and overlap parameters to keep symptom, etiology, and reference descriptions intact within retrieved passages.",
            "Designed strict system prompts instructing the LLM to rely solely on retrieved FAISS context."
        ],
        "challenges": [
            "Preventing unsupported medical claims when a query falls outside the indexed documents — solved via strict grounding instructions in the prompt template and similarity threshold filtering."
        ],
        "future_improvements": [
            "Add cross-encoder reranking and inline page/paragraph citation badges.",
            "Evaluate RAG triad metrics (context relevance, groundedness, answer relevance)."
        ],
        "github_url": "https://github.com/saurav526/GEN-AI-projects/tree/main/Medical_bot2.0",
        "disclaimer": (
            "IMPORTANT EDUCATIONAL DISCLAIMER: This is an educational AI and RAG engineering project, NOT a clinically validated diagnostic tool or substitute for professional medical advice."
        ),
        "accent_color": "#10b981",
        "featured": True,
        "display_order": 4,
    },
    {
        "slug": "expense-tracker-mcp-server",
        "title": "Expense Tracker MCP Server",
        "subtitle": "Model Context Protocol (MCP) / FastMCP / LLM Tool Integration",
        "category": "MCP & Agent Tooling",
        "short_description": (
            "A Model Context Protocol (MCP) server built with FastMCP and SQLite that exposes structured expense management tools "
            "and a live-editable categories resource to compatible AI assistants and LLM clients."
        ),
        "overview": (
            "Developed a FastMCP server implementing the Model Context Protocol (MCP) that enables AI assistants to manage expenses in plain language. "
            "Exposes structured tools to add expenses, list entries by date range, and summarize spending by category, backed by a live-editable "
            "categories JSON resource and SQLite persistence with parameterized SQL queries and automatic schema creation."
        ),
        "problem_statement": (
            "LLM assistants lack safe, standardized access to local transactional data stores and often fail at accurate financial aggregation "
            "when relying on unstructured text memory instead of deterministic database queries."
        ),
        "proposed_solution": (
            "Implemented a compliant Model Context Protocol (MCP) server using FastMCP and SQLite that exposes strongly typed tools "
            "(@mcp.tool) and a dynamic resource (expense://categories) so any MCP-compatible AI client can execute reliable CRUD and aggregation queries."
        ),
        "architecture_nodes": [
            {"id": "client", "label": "MCP-Compatible AI Client / Assistant", "sublabel": "Natural Language User Request", "layer": "Client Layer"},
            {"id": "fastmcp", "label": "FastMCP Protocol Server", "sublabel": "Tool & Resource Dispatch", "layer": "Protocol Layer"},
            {"id": "tools", "label": "Exposed MCP Tools (@mcp.tool)", "sublabel": "add_expense • list_expenses • summarize", "layer": "Tooling Layer"},
            {"id": "resource", "label": "Live MCP Resource", "sublabel": "expense://categories (categories.json)", "layer": "Resource Layer"},
            {"id": "sqlite", "label": "SQLite Transactional Engine", "sublabel": "Parameterized SQL & Auto Schema Init", "layer": "Persistence Layer"},
        ],
        "architecture_edges": [
            {"source": "client", "target": "fastmcp", "label": "MCP JSON-RPC"},
            {"source": "fastmcp", "target": "tools", "label": "Tool Invocation"},
            {"source": "fastmcp", "target": "resource", "label": "Resource Read"},
            {"source": "tools", "target": "sqlite", "label": "Parameterized SQL"},
        ],
        "technical_workflow": [
            "Automatic Schema Initialization: On startup (init_db), ensures the SQLite expenses table exists with id, date, amount, category, subcategory, and note columns.",
            "MCP Tool Exposition: Registers add_expense, list_expenses(start_date, end_date), and summarize(start_date, end_date, category) via @mcp.tool() decorators.",
            "Parameterized SQL Execution: Executes safe, injection-resistant parameterized SQLite queries and returns structured dictionaries to the LLM client.",
            "Dynamic Resource Serving: Exposes expense://categories (@mcp.resource) reading categories.json fresh on every request so categories can be updated live without restarting the server."
        ],
        "tech_stack": [
            "Python", "FastMCP", "MCP", "SQLite", "uv"
        ],
        "key_features": [
            "FastMCP server compliant with the Model Context Protocol (MCP) specification",
            "add_expense tool with date, amount, category, subcategory, and note persistence",
            "list_expenses tool supporting inclusive date-range filtering ordered chronologically",
            "summarize tool computing category-based SQL SUM aggregations over arbitrary date ranges",
            "Live-editable expense://categories MCP resource (application/json) reloaded without server restart",
            "SQLite database integration with parameterized SQL queries and automatic schema creation"
        ],
        "implementation_details": [
            "Uses Python context managers (with sqlite3.connect(DB_PATH)) and ? parameter placeholders across all INSERT and SELECT statements.",
            "Configured with uv for fast, reproducible Python dependency and environment management."
        ],
        "challenges": [
            "Allowing category taxonomy updates without breaking active AI client sessions — solved by exposing categories.json as a live MCP resource read fresh on every invocation."
        ],
        "future_improvements": [
            "Add budget threshold alerts and recurring expense detection tools.",
            "Add multi-currency conversion and CSV/JSON export MCP tools."
        ],
        "github_url": "https://github.com/saurav526/expense-tracker-MCP-server",
        "disclaimer": None,
        "accent_color": "#3b82f6",
        "featured": True,
        "display_order": 5,
    },
]


INITIAL_CERTIFICATIONS = [
    {
        "title": "Generative AI and Large Language Models",
        "domain": "Generative AI & LLMs",
        "description": "Transformer architectures, prompt engineering, retrieval-augmented generation, and large language model application workflows.",
        "verification_url": CERTIFICATIONS_DRIVE_LINK,
        "skills_covered": ["LLMs", "Generative AI", "Prompt Engineering", "RAG"],
        "display_order": 1,
    },
    {
        "title": "Neural Networks and Deep Learning",
        "domain": "Deep Learning",
        "description": "Deep neural network architectures, forward and backward propagation, optimization, and representation learning.",
        "verification_url": CERTIFICATIONS_DRIVE_LINK,
        "skills_covered": ["Deep Learning", "Neural Networks", "PyTorch", "TensorFlow"],
        "display_order": 2,
    },
    {
        "title": "Machine Learning Professional Certification",
        "domain": "Machine Learning Engineering",
        "description": "End-to-end supervised and unsupervised machine learning pipelines, model selection, hyperparameter tuning, and evaluation.",
        "verification_url": CERTIFICATIONS_DRIVE_LINK,
        "skills_covered": ["Machine Learning", "Model Evaluation", "Feature Engineering", "Scikit-learn"],
        "display_order": 3,
    },
    {
        "title": "Machine Learning with Python",
        "domain": "Applied Machine Learning",
        "description": "Practical implementation of classification, regression, clustering, and evaluation pipelines using Python and Scikit-learn.",
        "verification_url": CERTIFICATIONS_DRIVE_LINK,
        "skills_covered": ["Python", "Scikit-learn", "Pandas", "NumPy"],
        "display_order": 4,
    },
    {
        "title": "Introduction to Artificial Intelligence",
        "domain": "Artificial Intelligence Fundamentals",
        "description": "Core concepts of artificial intelligence, search, reasoning, machine learning foundations, and real-world AI systems.",
        "verification_url": CERTIFICATIONS_DRIVE_LINK,
        "skills_covered": ["Artificial Intelligence", "ML Foundations", "Problem Solving"],
        "display_order": 5,
    },
    {
        "title": "Power BI for Data Visualization",
        "domain": "Data Analytics & Visualization",
        "description": "Interactive dashboard design, data modeling, KPI reporting, and visual analytics using Microsoft Power BI.",
        "verification_url": CERTIFICATIONS_DRIVE_LINK,
        "skills_covered": ["Power BI", "Data Visualization", "Data Analysis"],
        "display_order": 6,
    },
]


def seed_database(db: Session) -> None:
    profile = db.query(ProfileConfig).first()
    if not profile:
        profile = ProfileConfig(
            name="Saurav Kumar",
            professional_identity="AI Engineer | Data Scientist | Machine Learning Engineer | Generative AI Developer",
            headline="Engineering Intelligence. Building Systems That Think.",
            subheadline=(
                "I build intelligent systems at the intersection of Data Science, Machine Learning, "
                "Generative AI and Agentic AI — transforming complex problems into practical, scalable solutions."
            ),
            bio=(
                "Data Science & AI student (B.Tech, 2024–2028) at MIT ADT University, Pune, specializing in "
                "production-minded Machine Learning and Generative AI. I engineer end-to-end intelligent systems — "
                "including Retrieval-Augmented Generation (RAG) pipelines, LangGraph multi-agent workflows, "
                "Model Context Protocol (MCP) tool servers, graph-based anomaly detection, and explainable (SHAP) ML APIs. "
                "I own the full technical lifecycle from exploratory data analysis and feature engineering to model training, "
                "MLflow experiment tracking, FastAPI serving, Docker containerization, and interactive analytical dashboards."
            ),
            location="Pune, Maharashtra, India",
            email="sauravtiwari2712005@gmail.com",
            phone="+91 9508578285",
            linkedin_url="https://www.linkedin.com/in/saurav-kumar-a90827323/",
            github_url="https://github.com/saurav526",
            education_degree="Bachelor of Technology (B.Tech)",
            education_institution="MIT ADT University, Loni Kalbhor, Pune",
            education_duration="2024 – 2028",
            education_focus="Data Science and Artificial Intelligence",
            availability_status="Available for AI / Data Science Internships & Collaborative Projects",
            availability_active=True,
            certifications_drive_url=CERTIFICATIONS_DRIVE_LINK,
        )
        db.add(profile)

    if db.query(Skill).count() == 0:
        for idx, item in enumerate(INITIAL_SKILLS, start=1):
            db.add(
                Skill(
                    name=item["name"],
                    category=item["category"],
                    icon_name=item["icon_name"],
                    description=item["description"],
                    featured=True,
                    display_order=idx,
                )
            )

    if db.query(Experience).count() == 0:
        db.add(
            Experience(
                role="Data Science Intern",
                organization="EduSkills Foundation",
                collaboration="In collaboration with AICTE and Siemens",
                duration="April 2026 – June 2026",
                mode="10-Week Virtual Internship",
                summary=(
                    "Completed a structured 10-week virtual internship program in data engineering fundamentals, "
                    "machine learning, and applied AI in collaboration with AICTE and Siemens, applying Python, "
                    "Pandas, and NumPy to solve practical data problems."
                ),
                highlights=[
                    "Completed a 10-week intensive program in data engineering fundamentals, machine learning, and applied AI, applying Python, Pandas, and NumPy to hands-on data problems.",
                    "Developed and evaluated machine learning models through systematic data preprocessing, feature engineering, and rigorous model evaluation to improve prediction accuracy.",
                    "Built reproducible data preparation and evaluation workflows aligned with industry standards from AICTE and Siemens."
                ],
                skills_applied=[
                    "Data Engineering Fundamentals",
                    "Machine Learning",
                    "Applied AI",
                    "Python",
                    "Pandas",
                    "NumPy",
                    "Data Preprocessing",
                    "Feature Engineering",
                    "Model Evaluation",
                ],
                certificate_url=CERTIFICATIONS_DRIVE_LINK,
            )
        )

    if db.query(Project).count() == 0:
        for proj in INITIAL_PROJECTS:
            db.add(Project(**proj))

    if db.query(Certification).count() == 0:
        for cert in INITIAL_CERTIFICATIONS:
            db.add(Certification(**cert))

    db.commit()
