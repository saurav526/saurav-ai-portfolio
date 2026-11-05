import { GitHubProfileData, PortfolioData } from '../types/portfolio';

import { asset } from '../lib/asset';
export const CERTIFICATIONS_DRIVE_LINK =
  'https://drive.google.com/drive/folders/1izqhjM5cE3UkkPB9Ul8g8MvFZwVWpUuU?usp=sharing';

export const INITIAL_PORTFOLIO_DATA: PortfolioData = {
  profile: {
    id: 1,
    name: 'Saurav Kumar',
    professional_identity:
      'AI Engineer | Data Scientist | Machine Learning Engineer | Generative AI Developer',
    headline: 'Engineering Intelligence. Building Systems That Think.',
    subheadline:
      'I build intelligent systems at the intersection of Data Science, Machine Learning, Generative AI and Agentic AI — transforming complex problems into practical, scalable solutions.',
    bio: 'Data Science & AI student (B.Tech, 2024–2028) at MIT ADT University, Pune, specializing in production-minded Machine Learning and Generative AI. I engineer end-to-end intelligent systems — including Retrieval-Augmented Generation (RAG) pipelines, LangGraph multi-agent workflows, Model Context Protocol (MCP) tool servers, graph-based anomaly detection, and explainable (SHAP) ML APIs. I own the full technical lifecycle from exploratory data analysis and feature engineering to model training, MLflow experiment tracking, FastAPI serving, Docker containerization, and interactive analytical dashboards.',
    location: 'Pune, Maharashtra, India',
    email: 'sauravtiwari2712005@gmail.com',
    phone: '+91 9508578285',
    linkedin_url: 'https://www.linkedin.com/in/saurav-kumar-a90827323/',
    github_url: 'https://github.com/saurav526',
    education_degree: 'Bachelor of Technology (B.Tech)',
    education_institution: 'MIT ADT University, Loni Kalbhor, Pune',
    education_duration: '2024 – 2028',
    education_focus: 'Data Science and Artificial Intelligence',
    availability_status: 'Available for AI / Data Science Internships & Collaborative Projects',
    availability_active: true,
    certifications_drive_url: CERTIFICATIONS_DRIVE_LINK,
  },
  stats: {
    flagship_projects: 6,
    technical_domains: 8,
    programming_languages: 4,
    total_skills: 50,
    certifications_count: 6,
    internship_weeks: 10,
  },
  skills: [
    // Programming
    { id: 1, name: 'Python', category: 'Programming', icon_name: 'Code2', description: 'Primary language for ML pipelines, FastAPI services, and agentic systems', featured: true, display_order: 1 },
    { id: 2, name: 'SQL', category: 'Programming', icon_name: 'Database', description: 'Analytical querying, relational schema design, and parameterized operations', featured: true, display_order: 2 },
    { id: 3, name: 'C++', category: 'Programming', icon_name: 'Terminal', description: 'Data structures, algorithmic problem solving, and systems fundamentals', featured: true, display_order: 3 },
    { id: 4, name: 'HTML', category: 'Programming', icon_name: 'Globe', description: 'Semantic document structure for web interfaces and dashboards', featured: true, display_order: 4 },
    // AI and Machine Learning
    { id: 5, name: 'Machine Learning', category: 'AI and Machine Learning', icon_name: 'BrainCircuit', description: 'Supervised and unsupervised modeling, feature engineering, and benchmarking', featured: true, display_order: 5 },
    { id: 6, name: 'Deep Learning', category: 'AI and Machine Learning', icon_name: 'Network', description: 'Neural network architectures, representation learning, and graph autoencoders', featured: true, display_order: 6 },
    { id: 7, name: 'NLP', category: 'AI and Machine Learning', icon_name: 'MessageSquareCode', description: 'Text processing, TF-IDF vectorization, semantic chunking, and embeddings', featured: true, display_order: 7 },
    { id: 8, name: 'LLMs', category: 'AI and Machine Learning', icon_name: 'Sparkles', description: 'Large Language Model integration, reasoning workflows, and grounded generation', featured: true, display_order: 8 },
    { id: 9, name: 'Anomaly Detection', category: 'AI and Machine Learning', icon_name: 'ShieldAlert', description: 'Isolation Forest and graph autoencoder reconstruction-error detection', featured: true, display_order: 9 },
    { id: 10, name: 'SHAP', category: 'AI and Machine Learning', icon_name: 'BarChart3', description: 'Explainable AI (XAI) feature attribution for clinical and tabular predictions', featured: true, display_order: 10 },
    { id: 11, name: 'Model Evaluation', category: 'AI and Machine Learning', icon_name: 'CheckCircle2', description: 'ROC-AUC benchmarking, cross-validation, and rigorous metric validation', featured: true, display_order: 11 },
    // Generative AI and Agentic AI
    { id: 12, name: 'LangChain', category: 'Generative AI and Agentic AI', icon_name: 'Link', description: 'RAG pipelines, document loaders, conversational memory, and chains', featured: true, display_order: 12 },
    { id: 13, name: 'LangGraph', category: 'Generative AI and Agentic AI', icon_name: 'GitBranch', description: 'Stateful multi-agent orchestration and cyclical graph workflows', featured: true, display_order: 13 },
    { id: 14, name: 'LangSmith', category: 'Generative AI and Agentic AI', icon_name: 'Activity', description: 'LLM tracing, observability, and prompt evaluation', featured: true, display_order: 14 },
    { id: 15, name: 'Multi-Agent Systems', category: 'Generative AI and Agentic AI', icon_name: 'Workflow', description: 'Coordinated autonomous agents with specialized tools and roles', featured: true, display_order: 15 },
    { id: 16, name: 'Tool Calling', category: 'Generative AI and Agentic AI', icon_name: 'Wrench', description: 'Deterministic function invocation connecting LLMs to ML models and databases', featured: true, display_order: 16 },
    { id: 17, name: 'MCP', category: 'Generative AI and Agentic AI', icon_name: 'Server', description: 'Model Context Protocol servers exposing structured tools and live resources', featured: true, display_order: 17 },
    { id: 18, name: 'RAG', category: 'Generative AI and Agentic AI', icon_name: 'SearchCode', description: 'Retrieval-Augmented Generation using FAISS, cosine similarity, and TF-IDF', featured: true, display_order: 18 },
    { id: 19, name: 'Prompt Engineering', category: 'Generative AI and Agentic AI', icon_name: 'TerminalSquare', description: 'System grounding, structured outputs, and hallucination reduction', featured: true, display_order: 19 },
    // Frameworks and Libraries
    { id: 20, name: 'PyTorch', category: 'Frameworks and Libraries', icon_name: 'Flame', description: 'Deep learning tensors, neural architectures, and training loops', featured: true, display_order: 20 },
    { id: 21, name: 'TensorFlow', category: 'Frameworks and Libraries', icon_name: 'Layers', description: 'Deep learning model development and neural network experimentation', featured: true, display_order: 21 },
    { id: 22, name: 'Scikit-learn', category: 'Frameworks and Libraries', icon_name: 'Cpu', description: 'Logistic Regression, Random Forest, Gradient Boosting, and Isolation Forest', featured: true, display_order: 22 },
    { id: 23, name: 'Pandas', category: 'Frameworks and Libraries', icon_name: 'Table', description: 'Dataframe manipulation, cleaning, aggregation, and feature pipelines', featured: true, display_order: 23 },
    { id: 24, name: 'NumPy', category: 'Frameworks and Libraries', icon_name: 'Binary', description: 'Vectorized numerical computation and matrix algebra', featured: true, display_order: 24 },
    { id: 25, name: 'Matplotlib', category: 'Frameworks and Libraries', icon_name: 'LineChart', description: 'Scientific plotting and exploratory data visualization', featured: true, display_order: 25 },
    { id: 26, name: 'Seaborn', category: 'Frameworks and Libraries', icon_name: 'PieChart', description: 'Statistical distribution and correlation heatmaps', featured: true, display_order: 26 },
    { id: 27, name: 'Plotly', category: 'Frameworks and Libraries', icon_name: 'BarChart4', description: 'Interactive analytical charts for clinical and operational dashboards', featured: true, display_order: 27 },
    { id: 28, name: 'Pydantic', category: 'Frameworks and Libraries', icon_name: 'ShieldCheck', description: 'Strict schema validation and typed data serialization', featured: true, display_order: 28 },
    { id: 29, name: 'SQLAlchemy', category: 'Frameworks and Libraries', icon_name: 'Database', description: 'ORM persistence and database abstraction across PostgreSQL and SQLite', featured: true, display_order: 29 },
    // Backend Development
    { id: 30, name: 'FastAPI', category: 'Backend Development', icon_name: 'Zap', description: 'High-performance asynchronous Python REST APIs for ML and agent serving', featured: true, display_order: 30 },
    { id: 31, name: 'REST APIs', category: 'Backend Development', icon_name: 'Webhook', description: 'Clean endpoint design, request validation, and OpenAPI documentation', featured: true, display_order: 31 },
    { id: 32, name: 'API Authentication', category: 'Backend Development', icon_name: 'KeyRound', description: 'API-key-secured inference and agent routes', featured: true, display_order: 32 },
    { id: 33, name: 'Database Integration', category: 'Backend Development', icon_name: 'HardDrive', description: 'Transactional persistence, audit logging, and connection management', featured: true, display_order: 33 },
    // Databases
    { id: 34, name: 'PostgreSQL', category: 'Databases', icon_name: 'Database', description: 'Production relational database for audit logging and application state', featured: true, display_order: 34 },
    { id: 35, name: 'MongoDB', category: 'Databases', icon_name: 'FolderKanban', description: 'Document-oriented NoSQL storage for flexible data schemas', featured: true, display_order: 35 },
    { id: 36, name: 'MySQL', category: 'Databases', icon_name: 'Database', description: 'Relational database management and structured querying', featured: true, display_order: 36 },
    { id: 37, name: 'SQLite', category: 'Databases', icon_name: 'FileSpreadsheet', description: 'Embedded transactional SQL storage for MCP servers and local audit logs', featured: true, display_order: 37 },
    // Cloud and MLOps
    { id: 38, name: 'AWS', category: 'Cloud and MLOps', icon_name: 'Cloud', description: 'Cloud infrastructure and scalable deployment workflows', featured: true, display_order: 38 },
    { id: 39, name: 'Docker', category: 'Cloud and MLOps', icon_name: 'Box', description: 'Containerized ML services and multi-container Docker Compose orchestration', featured: true, display_order: 39 },
    { id: 40, name: 'Kubernetes', category: 'Cloud and MLOps', icon_name: 'Boxes', description: 'Container orchestration and scalable workload management', featured: true, display_order: 40 },
    { id: 41, name: 'MLflow', category: 'Cloud and MLOps', icon_name: 'Activity', description: 'Experiment tracking, metric logging, and model registry management', featured: true, display_order: 41 },
    { id: 42, name: 'Prometheus', category: 'Cloud and MLOps', icon_name: 'Gauge', description: 'Service metrics exposition and operational observability', featured: true, display_order: 42 },
    { id: 43, name: 'Git', category: 'Cloud and MLOps', icon_name: 'GitMerge', description: 'Version control and collaborative branching workflows', featured: true, display_order: 43 },
    { id: 44, name: 'GitHub', category: 'Cloud and MLOps', icon_name: 'Github', description: 'Repository hosting, CI workflows, and open-source project documentation', featured: true, display_order: 44 },
    // Analytics and Development Tools
    { id: 45, name: 'Power BI', category: 'Analytics and Development Tools', icon_name: 'BarChart2', description: 'Business intelligence dashboards and interactive data storytelling', featured: true, display_order: 45 },
    { id: 46, name: 'Excel', category: 'Analytics and Development Tools', icon_name: 'Sheet', description: 'Spreadsheet modeling, pivot analysis, and tabular inspection', featured: true, display_order: 46 },
    { id: 47, name: 'Streamlit', category: 'Analytics and Development Tools', icon_name: 'LayoutDashboard', description: 'Interactive data science and ML operational web applications', featured: true, display_order: 47 },
    { id: 48, name: 'Jupyter Notebook', category: 'Analytics and Development Tools', icon_name: 'BookOpen', description: 'Interactive exploratory data analysis and model prototyping', featured: true, display_order: 48 },
    { id: 49, name: 'VS Code', category: 'Analytics and Development Tools', icon_name: 'Code', description: 'Primary integrated development environment for full-stack AI engineering', featured: true, display_order: 49 },
    { id: 50, name: 'Google Colab', category: 'Analytics and Development Tools', icon_name: 'CloudCog', description: 'Cloud-accelerated notebook environment for deep learning experiments', featured: true, display_order: 50 },
  ],
  experiences: [
    {
      id: 1,
      role: 'Data Science Intern',
      organization: 'EduSkills Foundation',
      collaboration: 'In collaboration with AICTE and Siemens',
      duration: 'April 2026 – June 2026',
      mode: '10-Week Virtual Internship',
      summary:
        'Completed a structured 10-week virtual internship program in data engineering fundamentals, machine learning, and applied AI in collaboration with AICTE and Siemens, applying Python, Pandas, and NumPy to solve practical data problems.',
      highlights: [
        'Completed a 10-week intensive program in data engineering fundamentals, machine learning, and applied AI, applying Python, Pandas, and NumPy to hands-on data problems.',
        'Developed and evaluated machine learning models through systematic data preprocessing, feature engineering, and rigorous model evaluation to improve prediction accuracy.',
        'Built reproducible data preparation and evaluation workflows aligned with industry standards from AICTE and Siemens.',
      ],
      skills_applied: [
        'Data Engineering Fundamentals',
        'Machine Learning',
        'Applied AI',
        'Python',
        'Pandas',
        'NumPy',
        'Data Preprocessing',
        'Feature Engineering',
        'Model Evaluation',
      ],
      certificate_url: CERTIFICATIONS_DRIVE_LINK,
    },
  ],
  projects: [
      { 
  id: 1,
  slug: 'banking-agentic-system',
  title: 'Banking Agentic System',
  subtitle: 'Multi-Agent AI / MCP / Enterprise Security / LLMOps',
  category: 'MCP & Agent Tooling',

  short_description:
    'A security-first multi-agent banking assistant featuring Coordinator and specialist agents, independently deployable MCP servers, JWT authentication, RBAC, anti-BOLA authorization, PII tokenization, human-in-the-loop transaction approval, and agent evaluation.',

  overview:
    'Engineered a security-first multi-agent banking assistant that orchestrates customer requests through a Coordinator agent and specialized Accounts, Transactions, and Service agents. Implemented three independently deployable Model Context Protocol (MCP) servers using JSON-RPC to isolate agent interactions from the core banking system. Designed a defense-in-depth security architecture with JWT authentication, deny-by-default RBAC, account ownership verification against BOLA attacks, prompt-injection detection, WAF signatures, rate limiting, and reversible PII tokenization. Integrated human-in-the-loop confirmation and idempotency keys for sensitive write operations. Added an LLM routing layer supporting mock, self-hosted, and third-party providers, circuit-breaker fallback, distributed execution tracing, token and cost tracking, and a 16-scenario agent evaluation suite.',

  problem_statement:
    'Traditional banking chatbots primarily operate as conversational interfaces without strong authorization boundaries or reliable transaction execution controls. Giving an LLM direct access to banking databases creates risks such as unauthorized account access, prompt injection, sensitive financial information leakage, duplicate transactions, and hallucinated banking operations. A secure architecture must separate reasoning from execution, enforce authorization at every boundary, protect personally identifiable information, and require explicit customer approval before sensitive state-changing operations.',

  proposed_solution:
    'Designed a multi-agent banking architecture in which a central Coordinator interprets user requests and delegates them to specialized Accounts, Transactions, and Service agents. Each agent accesses banking operations exclusively through independently deployable MCP servers. JWT-based identity verification, deny-by-default RBAC, platform-injected customer identity, and repeated account ownership checks enforce zero-trust authorization. A reversible PII tokenization vault protects sensitive information before LLM processing, while human confirmation and idempotency keys protect write operations. An LLM router supports configurable model providers with circuit-breaker fallback, complemented by observability, cost tracking, and automated agent evaluations.',

  architecture_nodes: [
    {
      id: 'user',
      label: 'Banking Customer Interface',
      sublabel: 'Natural Language Requests • Chat UI',
      layer: 'Presentation'
    },
    {
      id: 'edge',
      label: 'Edge Security Gateway',
      sublabel: 'WAF • Rate Limiting • DDoS • API Protection',
      layer: 'Security'
    },
    {
      id: 'auth',
      label: 'JWT Authentication & Authorization',
      sublabel: 'Identity • RBAC • Account Ownership • MFA',
      layer: 'Identity & Access'
    },
    {
      id: 'coordinator',
      label: 'Central Coordinator Agent',
      sublabel: 'Intent Routing • Guardrails • Agent Orchestration',
      layer: 'Agentic Orchestration'
    },
    {
      id: 'accounts',
      label: 'Accounts Specialist Agent',
      sublabel: 'Balance Enquiry • Account Information',
      layer: 'Specialist Agents'
    },
    {
      id: 'transactions',
      label: 'Transactions Specialist Agent',
      sublabel: 'Transaction History • Statements',
      layer: 'Specialist Agents'
    },
    {
      id: 'service',
      label: 'Banking Service Agent',
      sublabel: 'Address • Chequebook • KYC Requests',
      layer: 'Specialist Agents'
    },
    {
      id: 'mcp',
      label: 'Three Independent MCP Servers',
      sublabel: 'JSON-RPC • Typed Tools • Authenticated Calls',
      layer: 'MCP Integration'
    },
    {
      id: 'banking',
      label: 'Core Banking Engine',
      sublabel: 'SQLite Mock • Banking Operations • Ledger',
      layer: 'Data Layer'
    },
    {
      id: 'privacy',
      label: 'PII Tokenization & Privacy Vault',
      sublabel: 'Reversible Tokenization • Output Masking',
      layer: 'Privacy & Security'
    },
    {
      id: 'llm',
      label: 'Intelligent LLM Router',
      sublabel: 'Mock • Self-hosted • Third-party • Fallback',
      layer: 'LLM Infrastructure'
    },
    {
      id: 'ops',
      label: 'Evaluation & Observability',
      sublabel: 'Agent Evals • Tracing • Metrics • Cost Tracking',
      layer: 'LLMOps'
    }
  ],

  architecture_edges: [
    { source: 'user', target: 'edge', label: 'Banking Request' },
    { source: 'edge', target: 'auth', label: 'Protected Request' },
    { source: 'auth', target: 'coordinator', label: 'Verified Identity' },
    { source: 'coordinator', target: 'privacy', label: 'PII Redaction' },
    { source: 'privacy', target: 'llm', label: 'Tokenized Context' },
    { source: 'llm', target: 'coordinator', label: 'Agent & Tool Plan' },
    { source: 'coordinator', target: 'accounts', label: 'Account Intent' },
    { source: 'coordinator', target: 'transactions', label: 'Transaction Intent' },
    { source: 'coordinator', target: 'service', label: 'Service Intent' },
    { source: 'accounts', target: 'mcp', label: 'Authorized Tool Calls' },
    { source: 'transactions', target: 'mcp', label: 'Authorized Tool Calls' },
    { source: 'service', target: 'mcp', label: 'Authorized Tool Calls' },
    { source: 'mcp', target: 'banking', label: 'Validated Operations' },
    { source: 'banking', target: 'mcp', label: 'Structured Results' },
    { source: 'coordinator', target: 'ops', label: 'Execution Traces & Evals' },
    { source: 'mcp', target: 'ops', label: 'Tool & Security Events' }
  ],

  technical_workflow: [
    'Secure Request Ingestion: Receives customer requests through a banking chat interface and applies edge security controls, including WAF signature detection, payload-size limits, rate limiting, and bounded concurrency.',
    'Identity Verification & Authorization: Validates JWT credentials and establishes trusted customer context. Enforces deny-by-default RBAC, agent permissions, tool-level authorization, and account ownership checks.',
    'PII Protection & Guardrails: Detects prompt-injection patterns and applies reversible PII tokenization before sending customer information to an LLM. Masks sensitive account and card numbers in generated responses.',
    'Multi-Agent Orchestration: The Coordinator classifies user intent and delegates tasks to specialized Accounts, Transactions, and Service agents. Supports parallel execution for multi-intent requests.',
    'MCP-Based Banking Integration: Connects specialist agents to three independent JSON-RPC MCP servers using structured tools. MCP servers independently validate authorization and ownership before interacting with the mock core banking engine.',
    'Human-in-the-Loop Transaction Safety: Requires explicit customer confirmation for state-changing operations and uses idempotency keys to prevent duplicate execution.',
    'LLM Routing & Resilience: Supports deterministic mock LLM, self-hosted models, and third-party providers through a configurable routing layer with sensitive-traffic routing, circuit breakers, and fallback chains.',
    'LLMOps & Evaluation: Records agent execution traces, tool calls, latency, system metrics, and token-based cost estimates. Evaluates routing accuracy, tool selection, task completion, and security using 16 golden scenarios.'
  ],

  tech_stack: [
    'Python',
    'FastAPI',
    'Multi-Agent Systems',
    'Model Context Protocol (MCP)',
    'JSON-RPC',
    'JWT',
    'RBAC',
    'SQLite',
    'LLM Routing',
    'OpenAI-Compatible API',
    'Ollama / vLLM',
    'PII Tokenization',
    'Prompt Injection Detection',
    'WAF',
    'Pytest',
    'Docker',
    'Observability',
    'LLM Evaluation'
  ],

  key_features: [
    'Central Coordinator with specialized Accounts, Transactions, and Service agents for intelligent task delegation.',
    'Three independently deployable MCP servers exposing structured banking operations through JSON-RPC.',
    'JWT-based authentication with deny-by-default role-based access control and agent/tool permission policies.',
    'Anti-BOLA protection through repeated account ownership verification and platform-injected customer identity.',
    'Reversible PII tokenization ensuring LLMs receive placeholders instead of raw account and card information.',
    'Prompt-injection detection, WAF signatures, request validation, rate limiting, and bounded concurrency.',
    'Human-in-the-loop confirmation and idempotency keys for safe state-changing banking operations.',
    'Configurable LLM routing supporting mock, self-hosted, and third-party providers with circuit-breaker fallback.',
    'Parallel multi-intent execution with shared session state and coordinated response synthesis.',
    'Agent observability with execution traces, tool-call monitoring, latency metrics, and per-session cost budgets.',
    '16-scenario agent evaluation suite covering routing, tool selection, task completion, and safety.'
  ],

  implementation_details: [
    'Separated orchestration, specialist agents, authentication, authorization, MCP integration, PII handling, LLM routing, and observability into independent Python modules.',
    'Implemented MCP protocol operations including initialize, tools/list, and tools/call for three banking service domains.',
    'Injected trusted customer identity through the platform rather than allowing the LLM to choose account identifiers.',
    'Implemented ownership checks at both the authorization layer and MCP server layer to reduce cross-account access risks.',
    'Designed reversible PII tokenization to preserve references during reasoning while preventing raw account and card details from reaching the LLM.',
    'Introduced a deterministic mock LLM for offline execution and testing, with optional self-hosted and third-party model integrations.',
    'Implemented structured execution tracing, system metrics, and token/USD-based cost tracking with configurable session budgets.',
    'Created integration tests and a golden-scenario evaluation suite for agent behavior and security validation.'
  ],

  challenges: [
    'Preventing cross-customer account access — addressed through platform-injected identity, deny-by-default authorization, and ownership checks inside both authorization and MCP layers.',
    'Protecting sensitive financial information during LLM reasoning — addressed using reversible PII tokenization and response masking.',
    'Avoiding unintended or duplicate financial operations — addressed through explicit customer confirmation and idempotency keys.',
    'Maintaining reliability across multiple LLM providers — addressed through configurable routing, circuit breakers, and fallback providers.',
    'Managing multi-agent execution complexity — addressed through centralized coordination, specialized tool permissions, and shared session state.'
  ],

  future_improvements: [
    'Introduce tamper-evident hash-chained audit logs for stronger financial operation traceability.',
    'Implement output guardrails and response validation against unsupported or unsafe agent-generated claims.',
    'Add tool-output prompt-injection detection and adversarial security evaluation.',
    'Integrate fraud and risk specialist agents with automatic step-up authentication triggers.',
    'Add a RAG-based banking knowledge agent for grounded policy and financial product information.',
    'Integrate OpenTelemetry distributed tracing and Prometheus-based monitoring.',
    'Move session storage and distributed rate limiting to Redis.',
    'Add Kubernetes deployment manifests, load testing, and continuous evaluation gates in CI/CD.'
  ],

  github_url: 'https://github.com/saurav526/Banking-Agent-System-design',

  disclaimer:
    'Educational Engineering Demonstration: Uses a mock LLM and mock core banking database. Not certified or intended for real customer data, production financial transactions, or deployment as a production banking system.',

  accent_color: '#06b6d4',
  featured: true,
  display_order: 1
    },
  {
      id: 2,
      slug: 'clinical-risk-patient-outcome-intelligence-system',
      title: 'Clinical Risk & Patient Outcome Intelligence System',
      subtitle: 'ML / MLOps / Explainable AI (SHAP) / Agentic AI Platform',
      category: 'MLOps & Agentic AI',
      short_description:
        'An AI-powered clinical risk prediction and patient outcome intelligence platform focused on predicting 30-day hospital readmission with SHAP explainability, MLflow tracking, FastAPI serving, PostgreSQL audit logging, Prometheus metrics, and a tool-calling LLM agent.',
      overview:
        'Engineered an end-to-end 30-day hospital readmission predictor on a 5,000-record synthetic clinical dataset (30 features) with data validation and feature engineering, and integrated an LLM agent that calls the trained model through tools (predict, explain, high-risk patients, factors). Benchmarked Logistic Regression, Random Forest, and Gradient Boosting, auto-selecting the best by ROC-AUC with MLflow tracking; added SHAP explanations and deployed an API-key-secured FastAPI service with PostgreSQL audit logs, Prometheus metrics, a Plotly dashboard, Docker Compose, and automated tests.',
      problem_statement:
        'Hospital readmission risk models often operate as opaque black boxes disconnected from operational workflows. Care teams need accurate 30-day readmission probability estimates paired with transparent patient-level feature attributions (why a specific patient is flagged high-risk), full auditability of predictions, and an interactive way to query high-risk cohorts and risk factors.',
      proposed_solution:
        'Architected a full-lifecycle MLOps and Agentic AI platform where deterministic machine learning models handle risk estimation and SHAP computes local/global feature attributions, while a Groq-powered tool-calling agent invokes structured tools (predict_patient, explain_patient, high_risk_patients, readmission_factors, dataset_summary) to answer natural-language clinical queries grounded strictly in model outputs.',
      architecture_nodes: [
        { id: 'data', label: '5,000-Record Synthetic Clinical Dataset', sublabel: '30 Features • Validation & EDA', layer: 'Ingestion' },
        { id: 'fe', label: 'Feature Engineering & Preprocessing', sublabel: 'Imputation • Scaling • Encoding', layer: 'Pipeline' },
        { id: 'train', label: 'Multi-Model Benchmarking', sublabel: 'LogReg • Random Forest • GradBoost', layer: 'Modeling' },
        { id: 'mlflow', label: 'MLflow Registry & SHAP Engine', sublabel: 'ROC-AUC Selection • Feature Attribution', layer: 'Explainability & MLOps' },
        { id: 'fastapi', label: 'API-Key-Secured FastAPI Service', sublabel: 'REST Endpoints • Prometheus /metrics', layer: 'Serving' },
        { id: 'agent', label: 'Groq Tool-Calling Clinical Agent', sublabel: 'predict • explain • high_risk • factors', layer: 'Agentic Layer' },
        { id: 'db', label: 'PostgreSQL / SQLAlchemy Audit Log', sublabel: 'Prediction & Agent Event Persistence', layer: 'Storage' },
        { id: 'ui', label: 'Streamlit + Plotly Intelligence UI', sublabel: 'Cohort Analytics & Patient Explanations', layer: 'Interface' },
      ],
      architecture_edges: [
        { source: 'data', target: 'fe', label: 'Validated Schema' },
        { source: 'fe', target: 'train', label: '30 Engineered Features' },
        { source: 'train', target: 'mlflow', label: 'Best ROC-AUC Model' },
        { source: 'mlflow', target: 'fastapi', label: 'Model + SHAP Explainer' },
        { source: 'fastapi', target: 'agent', label: 'Structured Tools' },
        { source: 'fastapi', target: 'db', label: 'Audit Events' },
        { source: 'fastapi', target: 'ui', label: 'Predictions & Metrics' },
      ],
      technical_workflow: [
        'Data Ingestion & Validation: Validates the 5,000-row, 30-feature synthetic clinical dataset for schema integrity, realistic correlations, and missing values.',
        'Feature Engineering & Benchmarking: Trains Logistic Regression, Random Forest, and Gradient Boosting pipelines, logging metrics to MLflow and auto-selecting the best estimator by ROC-AUC.',
        'SHAP Explainability Generation: Computes local patient-level SHAP values and global readmission risk factors from the serialized estimator.',
        'Secured FastAPI & Observability: Serves predictions and explanations behind API-key authentication, logs every inference and agent invocation via SQLAlchemy (PostgreSQL/SQLite), and exposes Prometheus metrics at /metrics.',
        'Agentic Tool Orchestration: Routes natural-language questions through Groq LLM tool calling (with a deterministic local fallback when offline) and visualizes cohorts in a Plotly + Streamlit dashboard.',
      ],
      tech_stack: [
        'Python', 'Scikit-learn', 'SHAP', 'MLflow', 'FastAPI', 'SQLAlchemy',
        'PostgreSQL', 'Groq', 'Streamlit', 'Plotly', 'Prometheus', 'Docker', 'Pytest',
      ],
      key_features: [
        'Machine learning model benchmarking across Logistic Regression, Random Forest, and Gradient Boosting with automatic ROC-AUC selection',
        'SHAP explainability providing patient-specific risk explanations and global readmission factors',
        'LLM-powered patient analysis using deterministic agent tool calling (predict_patient, explain_patient, high_risk_patients, readmission_factors)',
        'MLflow experiment tracking and model registry metadata persistence',
        'API-key-secured FastAPI inference endpoints with Prometheus monitoring (/metrics)',
        'PostgreSQL / SQLAlchemy audit logging for both ML predictions and AI agent executions',
        'Interactive Plotly + Streamlit dashboard, Docker Compose orchestration, and Pytest automated testing',
      ],
      implementation_details: [
        'Separated ML inference from LLM communication: the agent never fabricates risk numbers; it invokes trained model tools and synthesizes the returned structured JSON.',
        'Implemented a deterministic agent fallback so the system remains 100% functional even without an external GROQ_API_KEY.',
        'Designed SQLAlchemy models supporting seamless switching between SQLite for instant local execution and PostgreSQL via DATABASE_URL in Docker Compose.',
      ],
      challenges: [
        'Preventing LLM hallucination on quantitative clinical risk scores — solved by enforcing strict tool calling where numerical predictions and SHAP attributions come exclusively from the serialized Scikit-learn/SHAP pipeline.',
        'Maintaining low-latency SHAP explanations during interactive API requests — solved by caching the loaded model and explainer artifacts in the FastAPI service layer.',
      ],
      future_improvements: [
        'Add data drift and prediction distribution monitoring over rolling time windows.',
        'Integrate survival analysis (time-to-readmission) alongside binary 30-day classification.',
        'Add role-based access control and cohort export pipelines.',
      ],
      github_url: 'https://github.com/saurav526/Clinical-Risk-Patient-Outcome-Intelligence-System',
      disclaimer:
        'Educational & Engineering Demonstration: Uses a 100% synthetic clinical dataset. Not intended for clinical diagnosis or medical decision-making.',
      accent_color: '#8b5cf6',
      featured: true,
      display_order: 2,
    },
    {
      id: 3,
      slug: 'opspilot-ai-incident-intelligence-copilot',
      title: 'OpsPilot AI — Incident Intelligence Copilot',
      subtitle: 'Anomaly Detection / TF-IDF Runbook RAG / Tool-Using Agent',
      category: 'AIOps & Incident RAG',
      short_description:
        'An AI-assisted incident investigation platform that combines Isolation Forest anomaly detection, TF-IDF cosine-similarity runbook retrieval, and a tool-using investigation agent with FastAPI, Streamlit, and SQLite audit logging.',
      overview:
        'Developed an incident copilot that detects unusual service metrics with Isolation Forest, retrieves runbooks via TF-IDF/cosine similarity, and orchestrates a tool-using agent (optional Groq LLM) to recommend read-only investigation steps. Shipped a REST API (anomalies, investigate, audit endpoints) with request validation, a Streamlit dashboard, SQLite audit logging, Pytest tests, and a no-LLM fallback so it runs without an API key.',
      problem_statement:
        'During service degradation or latency spikes, operational context is scattered across raw telemetry streams and markdown runbooks. On-call engineers spend critical time manually correlating anomalous metrics with troubleshooting guides before knowing which safe diagnostic checks to execute first.',
      proposed_solution:
        'Built OpsPilot AI to unify statistical anomaly detection and runbook retrieval behind a single investigation workflow. Isolation Forest ranks unusual service metric vectors, TF-IDF retrieval surfaces matching operational runbook procedures, and an agent combines both evidence sources into structured, audited, read-only investigation plans.',
      architecture_nodes: [
        { id: 'telemetry', label: 'Service Telemetry Stream', sublabel: 'Latency • Error Rate • CPU • Throughput', layer: 'Telemetry' },
        { id: 'iforest', label: 'StandardScaler + Isolation Forest', sublabel: 'Unsupervised Anomaly Scoring', layer: 'Detection' },
        { id: 'runbooks', label: 'Operational Runbook Corpus', sublabel: 'TF-IDF Vectorizer + Cosine Similarity', layer: 'Retrieval (RAG)' },
        { id: 'agent', label: 'Incident Investigation Agent', sublabel: 'Groq LLM + Deterministic Local Fallback', layer: 'Agentic Orchestration' },
        { id: 'api', label: 'FastAPI REST Service', sublabel: '/anomalies • /investigate • /audit/recent', layer: 'API Layer' },
        { id: 'sqlite', label: 'SQLite Audit Logger', sublabel: 'Immutable Investigation Trace', layer: 'Persistence' },
        { id: 'dashboard', label: 'Streamlit Ops Dashboard', sublabel: 'Anomaly Ranking & Interactive Copilot', layer: 'UI' },
      ],
      architecture_edges: [
        { source: 'telemetry', target: 'iforest', label: 'Metric Vectors' },
        { source: 'iforest', target: 'agent', label: 'Top Anomalies' },
        { source: 'runbooks', target: 'agent', label: 'Top-K Runbooks' },
        { source: 'agent', target: 'api', label: 'Investigation Plan' },
        { source: 'api', target: 'sqlite', label: 'Audit Log Entry' },
        { source: 'api', target: 'dashboard', label: 'REST JSON' },
      ],
      technical_workflow: [
        'Telemetry Ingestion & Scaling: Loads multi-service operational metrics and normalizes feature distributions with StandardScaler.',
        'Unsupervised Anomaly Detection: Trains an Isolation Forest model (scripts/train.py) to score and rank anomalous service intervals.',
        'Runbook Retrieval (RAG): Indexes operational runbooks using TF-IDF and ranks relevant troubleshooting sections via cosine similarity.',
        'Tool-Using Investigation Agent: Combines service summaries, anomaly scores, and retrieved runbook passages to synthesize read-only diagnostic steps (using Groq LLM when configured or deterministic local synthesis).',
        'REST API & Audit Persistence: Exposes validated FastAPI endpoints (/health, /metrics/summary, /anomalies, /investigate, /audit/recent) and records every investigation in SQLite.',
      ],
      tech_stack: [
        'Python', 'Scikit-learn', 'Isolation Forest', 'TF-IDF', 'FastAPI',
        'Streamlit', 'SQLite', 'Groq', 'Pytest',
      ],
      key_features: [
        'Isolation Forest anomaly detection ranking unusual multi-metric service intervals',
        'TF-IDF-based runbook retrieval using cosine similarity ranking',
        'Tool-using AI agent correlating telemetry anomalies with operational runbooks',
        'Optional Groq LLM integration paired with deterministic no-LLM fallback functionality',
        'Strictly read-only incident investigation steps for operational safety',
        'FastAPI REST API (/anomalies, /investigate, /audit) and interactive Streamlit dashboard',
        'SQLite audit logging and Pytest automated test suite',
      ],
      implementation_details: [
        'Modularized into clean packages: src/data.py, src/model.py, src/rag.py, src/agent.py, src/db.py, api/main.py, and app/streamlit_app.py.',
        'Designed deterministic fallback synthesis so automated tests (pytest -q) and local demos succeed without requiring external API keys.',
      ],
      challenges: [
        'Correlating quantitative anomaly scores with textual runbooks — solved by passing structured service context and anomaly metadata into the retrieval query builder.',
        'Ensuring operational safety — constrained agent output strictly to read-only verification steps and logged every query to SQLite.',
      ],
      future_improvements: [
        'Upgrade lexical TF-IDF retrieval to hybrid dense + sparse embeddings for broader runbook phrasing coverage.',
        'Add human-in-the-loop approval gates and webhook notifications for PagerDuty/Slack.',
      ],
      github_url: 'https://github.com/saurav526/OpsPilot_AI_Incident_Intelligence',
      disclaimer:
        'Uses synthetic service telemetry and executes strictly read-only investigation steps.',
      accent_color: '#06b6d4',
      featured: true,
      display_order: 3,
    },
    {
      id: 4,
      slug: 'autonomous-cyber-defense-system',
      title: 'Autonomous Cyber Defense System',
      subtitle: 'Graph Neural Networks / Graph Autoencoder / Reinforcement Learning',
      category: 'Graph ML & Cyber AI',
      short_description:
        'An intelligent cybersecurity system that analyzes synthetic network telemetry as graphs, flags anomalies via a self-supervised graph autoencoder, and selects graduated response actions using reinforcement learning.',
      overview:
        'Simulated a defensive ML environment by synthesizing network telemetry and modeling traffic as graphs with node- and edge-level features to separate normal from malicious behavior. Trained a self-supervised graph autoencoder that flags anomalies by reconstruction error, and implemented a reinforcement-learning policy that selects monitor, rate-limit, isolate, or block actions by threat severity.',
      problem_statement:
        'Traditional signature-based intrusion detection struggles to identify novel lateral movement and coordinated network anomalies because it inspects packets in isolation rather than capturing topological relationships across communicating nodes.',
      proposed_solution:
        'Represented network telemetry as an attributed graph with normalized neighborhood aggregation, trained a self-supervised graph autoencoder on normal traffic patterns to flag high reconstruction-error anomalies, and coupled it with a reinforcement-learning policy engine that maps threat severity to graduated defensive actions.',
      architecture_nodes: [
        { id: 'net', label: 'Synthetic Network Telemetry', sublabel: 'Flows • Packets • Node & Edge Attributes', layer: 'Simulation' },
        { id: 'graph', label: 'Graph Construction & Aggregation', sublabel: 'Normalized Neighborhood Representation', layer: 'Graph Layer' },
        { id: 'gae', label: 'Self-Supervised Graph Autoencoder', sublabel: 'Latent Encoding & Reconstruction', layer: 'Deep Learning' },
        { id: 'err', label: 'Reconstruction Error Thresholding', sublabel: 'Node & Edge Anomaly Scoring', layer: 'Detection' },
        { id: 'rl', label: 'Reinforcement Learning Policy', sublabel: 'Severity-Aware Action Selection', layer: 'Decision Engine' },
        { id: 'act', label: 'Graduated Defensive Response', sublabel: 'Monitor • Rate-Limit • Isolate • Block', layer: 'Response & UI' },
      ],
      architecture_edges: [
        { source: 'net', target: 'graph', label: 'Host/Flow Topology' },
        { source: 'graph', target: 'gae', label: 'Aggregated Features' },
        { source: 'gae', target: 'err', label: 'Reconstruction Error' },
        { source: 'err', target: 'rl', label: 'Threat Severity State' },
        { source: 'rl', target: 'act', label: 'Optimal Defense Policy' },
      ],
      technical_workflow: [
        'Synthetic Telemetry Generation: Simulates normal background traffic alongside injected attack patterns with node- and edge-level telemetry attributes.',
        'Graph Construction & Neighborhood Aggregation: Builds communication graphs and computes normalized neighborhood feature representations.',
        'Self-Supervised Graph Autoencoder: Learns compressed latent representations of normal network topology and reconstructs node/edge features.',
        'Reconstruction-Error Anomaly Detection: Computes per-node reconstruction residuals and flags traffic exceeding calibrated anomaly thresholds.',
        'Reinforcement Learning Response Policy: Evaluates anomaly severity and selects between Monitor, Rate-limit, Isolate, or Block actions in an interactive Streamlit dashboard with CSV export.',
      ],
      tech_stack: [
        'Python', 'Graph Neural Networks', 'Autoencoders', 'Reinforcement Learning', 'Streamlit',
      ],
      key_features: [
        'Synthetic network telemetry generation modeling multi-node traffic flows',
        'Graph-based representation of network activity with node and edge features',
        'Normalized neighborhood aggregation and self-supervised graph autoencoder',
        'Reconstruction-error-based anomaly detection separating normal and malicious traffic',
        'Reinforcement learning-based response policy selecting Monitor, Rate-Limit, Isolate, or Block actions based on severity',
        'Interactive Streamlit dashboard with graph telemetry visualization and CSV export',
      ],
      implementation_details: [
        'Implemented end-to-end pipeline from graph adjacency normalization to autoencoder reconstruction scoring and RL policy evaluation.',
        'Provided interactive threshold tuning and policy inspection inside Streamlit.',
      ],
      challenges: [
        'Balancing false-positive containment actions against severe threats — addressed by designing a graduated 4-tier RL action space (Monitor -> Rate-limit -> Isolate -> Block) proportional to reconstruction error severity.',
      ],
      future_improvements: [
        'Evaluate temporal graph networks (TGN) over streaming packet captures.',
        'Benchmark against public intrusion datasets such as CIC-IDS and UNSW-NB15.',
      ],
      github_url: 'https://github.com/saurav526/autonomous_cyber_defense',
      disclaimer:
        'Educational defensive simulation using synthetic network traffic; response actions do not modify real network infrastructure.',
      accent_color: '#a855f7',
      featured: true,
      display_order: 4,
    },
    {
      id: 5,
      slug: 'ai-medical-chatbot',
      title: 'AI Medical Chatbot',
      subtitle: 'Generative AI / Retrieval-Augmented Generation (RAG) / FAISS',
      category: 'Generative AI & RAG',
      short_description:
        'A conversational AI system using Retrieval-Augmented Generation (RAG), semantic chunking, vector embeddings, FAISS similarity search, and LangChain conversational memory to answer questions from medical knowledge documents.',
      overview:
        'Built a context-aware medical chatbot with LangChain and Hugging Face LLMs, leveraging semantic chunking, embedding retrieval, and conversational memory for multi-turn queries. Architected a RAG pipeline with FAISS search, cosine-similarity ranking, and custom prompts to ground answers in medical knowledge and reduce hallucinations.',
      problem_statement:
        'General-purpose LLMs can hallucinate or provide unverified claims when asked domain-specific medical reference questions, and stateless single-turn Q&A fails to preserve context across follow-up questions.',
      proposed_solution:
        'Architected a Retrieval-Augmented Generation (RAG) pipeline that ingests reference medical documents, splits them into semantic chunks, indexes vector embeddings in FAISS for fast cosine-similarity retrieval, and uses LangChain with custom grounding prompts and conversational memory.',
      architecture_nodes: [
        { id: 'docs', label: 'Medical Knowledge Documents', sublabel: 'Reference PDF / Text Corpus', layer: 'Knowledge Base' },
        { id: 'chunk', label: 'Document Ingestion & Semantic Chunking', sublabel: 'Context-Preserving Text Splits', layer: 'Preprocessing' },
        { id: 'embed', label: 'Hugging Face Vector Embeddings', sublabel: 'Dense Semantic Representations', layer: 'Embedding' },
        { id: 'faiss', label: 'FAISS Vector Database', sublabel: 'Cosine-Similarity Top-K Search', layer: 'Vector Store' },
        { id: 'memory', label: 'LangChain Conversational Memory', sublabel: 'Multi-Turn Context Window', layer: 'Orchestration' },
        { id: 'llm', label: 'Grounded LLM Answer Generation', sublabel: 'Custom Anti-Hallucination Prompts', layer: 'Generation' },
      ],
      architecture_edges: [
        { source: 'docs', target: 'chunk', label: 'Raw Documents' },
        { source: 'chunk', target: 'embed', label: 'Semantic Chunks' },
        { source: 'embed', target: 'faiss', label: 'Dense Vectors' },
        { source: 'faiss', target: 'memory', label: 'Top-K Context' },
        { source: 'memory', target: 'llm', label: 'Prompt + History' },
      ],
      technical_workflow: [
        'Document Ingestion & Semantic Chunking: Loads reference medical documents and segments them into overlapping semantic chunks to preserve clinical context.',
        'Vector Embedding Generation: Encodes document chunks and user queries into dense vector representations using Hugging Face embedding models.',
        'FAISS Vector Indexing & Retrieval: Stores embeddings in a FAISS index and retrieves the highest-ranking passages via cosine similarity.',
        'Conversational Memory & Prompt Engineering: Combines multi-turn conversation history with retrieved passages inside a custom LangChain prompt template that enforces grounded responses.',
        'Grounded Answer Synthesis: Generates cited, context-aware answers while declining out-of-scope claims.',
      ],
      tech_stack: [
        'Python', 'LangChain', 'FAISS', 'Hugging Face', 'Vector Embeddings', 'Prompt Engineering',
      ],
      key_features: [
        'Document ingestion and semantic chunking pipeline preserving medical reference context',
        'Dense vector embeddings generated via Hugging Face models',
        'FAISS vector database indexing with cosine similarity retrieval',
        'LangChain integration with conversational memory for multi-turn dialogue',
        'Custom prompt engineering for grounded answer generation and hallucination reduction',
      ],
      implementation_details: [
        'Configured chunk size and overlap parameters to keep symptom, etiology, and reference descriptions intact within retrieved passages.',
        'Designed strict system prompts instructing the LLM to rely solely on retrieved FAISS context.',
      ],
      challenges: [
        'Preventing unsupported medical claims when a query falls outside the indexed documents — solved via strict grounding instructions in the prompt template and similarity threshold filtering.',
      ],
      future_improvements: [
        'Add cross-encoder reranking and inline page/paragraph citation badges.',
        'Evaluate RAG triad metrics (context relevance, groundedness, answer relevance).',
      ],
      github_url: 'https://github.com/saurav526/GEN-AI-projects/tree/main/Medical_bot2.0',
      disclaimer:
        'IMPORTANT EDUCATIONAL DISCLAIMER: This is an educational AI and RAG engineering project, NOT a clinically validated diagnostic tool or substitute for professional medical advice.',
      accent_color: '#10b981',
      featured: true,
      display_order: 5,
    },
    {
      id: 6,
      slug: 'expense-tracker-mcp-server',
      title: 'Expense Tracker MCP Server',
      subtitle: 'Model Context Protocol (MCP) / FastMCP / LLM Tool Integration',
      category: 'MCP & Agent Tooling',
      short_description:
        'A Model Context Protocol (MCP) server built with FastMCP and SQLite that exposes expense management tools and a live-editable categories resource to compatible AI clients.',
      overview:
        'Developed a FastMCP server that lets an AI assistant manage expenses in plain language, exposing tools to add, list by date range, and summarize by category, plus a live-editable categories resource. Implemented SQLite storage with parameterized queries and auto schema creation, giving LLM clients reliable, structured access to real data.',
      problem_statement:
        'LLM assistants lack safe, standardized access to local transactional data stores and often fail at accurate financial aggregation when relying on unstructured text memory instead of deterministic database queries.',
      proposed_solution:
        'Implemented a compliant Model Context Protocol (MCP) server using FastMCP and SQLite that exposes strongly typed tools (@mcp.tool) and a dynamic resource (expense://categories) so any MCP-compatible AI client can execute reliable CRUD and aggregation queries.',
      architecture_nodes: [
        { id: 'client', label: 'MCP-Compatible AI Client / Assistant', sublabel: 'Natural Language User Request', layer: 'Client Layer' },
        { id: 'fastmcp', label: 'FastMCP Protocol Server', sublabel: 'Tool & Resource Dispatch', layer: 'Protocol Layer' },
        { id: 'tools', label: 'Exposed MCP Tools (@mcp.tool)', sublabel: 'add_expense • list_expenses • summarize', layer: 'Tooling Layer' },
        { id: 'resource', label: 'Live MCP Resource', sublabel: 'expense://categories (categories.json)', layer: 'Resource Layer' },
        { id: 'sqlite', label: 'SQLite Transactional Engine', sublabel: 'Parameterized SQL & Auto Schema Init', layer: 'Persistence Layer' },
      ],
      architecture_edges: [
        { source: 'client', target: 'fastmcp', label: 'MCP JSON-RPC' },
        { source: 'fastmcp', target: 'tools', label: 'Tool Invocation' },
        { source: 'fastmcp', target: 'resource', label: 'Resource Read' },
        { source: 'tools', target: 'sqlite', label: 'Parameterized SQL' },
      ],
      technical_workflow: [
        'Automatic Schema Initialization: On startup (init_db), ensures the SQLite expenses table exists with id, date, amount, category, subcategory, and note columns.',
        'MCP Tool Exposition: Registers add_expense, list_expenses(start_date, end_date), and summarize(start_date, end_date, category) via @mcp.tool() decorators.',
        'Parameterized SQL Execution: Executes safe, injection-resistant parameterized SQLite queries and returns structured dictionaries to the LLM client.',
        'Dynamic Resource Serving: Exposes expense://categories (@mcp.resource) reading categories.json fresh on every request so categories can be updated live without restarting the server.',
      ],
      tech_stack: [
        'Python', 'FastMCP', 'MCP', 'SQLite', 'uv',
      ],
      key_features: [
        'FastMCP server exposing Model Context Protocol tools and resources',
        'add_expense tool with date, amount, category, subcategory, and note support',
        'list_expenses tool with inclusive date-range filtering',
        'summarize tool providing category-based SQL aggregations',
        'Editable expense://categories JSON resource reloaded dynamically without restart',
        'SQLite database with parameterized SQL queries and automatic schema creation',
      ],
      implementation_details: [
        'Uses Python context managers (with sqlite3.connect(DB_PATH)) and ? parameter placeholders across all INSERT and SELECT statements.',
        'Configured with uv for fast, reproducible Python dependency and environment management.',
      ],
      challenges: [
        'Allowing category taxonomy updates without breaking active AI client sessions — solved by exposing categories.json as a live MCP resource read fresh on every invocation.',
      ],
      future_improvements: [
        'Add budget threshold alerts and recurring expense detection tools.',
        'Add multi-currency conversion and CSV/JSON export MCP tools.',
      ],
      github_url: 'https://github.com/saurav526/expense-tracker-MCP-server',
      disclaimer: null,
      accent_color: '#3b82f6',
      featured: true,
      display_order: 6,
    },
  ],
  certifications: [
    {
      id: 1,
      title: 'Generative AI and Large Language Models',
      domain: 'Generative AI & LLMs',
      description: 'Transformer architectures, prompt engineering, retrieval-augmented generation, and large language model application workflows.',
      verification_url: CERTIFICATIONS_DRIVE_LINK,
      skills_covered: ['LLMs', 'Generative AI', 'Prompt Engineering', 'RAG'],
      display_order: 1,
    },
    {
      id: 2,
      title: 'Neural Networks and Deep Learning',
      domain: 'Deep Learning',
      description: 'Deep neural network architectures, forward and backward propagation, optimization, and representation learning.',
      verification_url: CERTIFICATIONS_DRIVE_LINK,
      skills_covered: ['Deep Learning', 'Neural Networks', 'PyTorch', 'TensorFlow'],
      display_order: 2,
    },
    {
      id: 3,
      title: 'Machine Learning Professional Certification',
      domain: 'Machine Learning Engineering',
      description: 'End-to-end supervised and unsupervised machine learning pipelines, model selection, hyperparameter tuning, and evaluation.',
      verification_url: CERTIFICATIONS_DRIVE_LINK,
      skills_covered: ['Machine Learning', 'Model Evaluation', 'Feature Engineering', 'Scikit-learn'],
      display_order: 3,
    },
    {
      id: 4,
      title: 'Machine Learning with Python',
      domain: 'Applied Machine Learning',
      description: 'Practical implementation of classification, regression, clustering, and evaluation pipelines using Python and Scikit-learn.',
      verification_url: CERTIFICATIONS_DRIVE_LINK,
      skills_covered: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
      display_order: 4,
    },
    {
      id: 5,
      title: 'Introduction to Artificial Intelligence',
      domain: 'Artificial Intelligence Fundamentals',
      description: 'Core concepts of artificial intelligence, search, reasoning, machine learning foundations, and real-world AI systems.',
      verification_url: CERTIFICATIONS_DRIVE_LINK,
      skills_covered: ['Artificial Intelligence', 'ML Foundations', 'Problem Solving'],
      display_order: 5,
    },
    {
      id: 6,
      title: 'Power BI for Data Visualization',
      domain: 'Data Analytics & Visualization',
      description: 'Interactive dashboard design, data modeling, KPI reporting, and visual analytics using Microsoft Power BI.',
      verification_url: CERTIFICATIONS_DRIVE_LINK,
      skills_covered: ['Power BI', 'Data Visualization', 'Data Analysis'],
      display_order: 6,
    },
  ],
};

export const FALLBACK_GITHUB_DATA: GitHubProfileData = {
  source: 'verified_repository_snapshot',
  cached: false,
  profile: {
    username: 'saurav526',
    name: 'Saurav Kumar',
    avatar_url: asset('/saurav-profile.jpg'),
    html_url: 'https://github.com/saurav526',
    bio: 'AI Engineer | Data Scientist | Machine Learning Engineer | Generative AI Developer',
    location: 'Pune, Maharashtra, India',
    public_repos: null,
    followers: null,
    following: null,
  },
  repositories: [
    {
      name: 'Clinical-Risk-Patient-Outcome-Intelligence-System',
      html_url: 'https://github.com/saurav526/Clinical-Risk-Patient-Outcome-Intelligence-System',
      description:
        'End-to-end 30-day hospital readmission prediction & clinical intelligence platform with Scikit-learn benchmarking, SHAP explainability, MLflow, FastAPI, PostgreSQL audit logging, Prometheus, and Groq tool-calling agent.',
      language: 'Python',
      topics: ['machine-learning', 'shap', 'mlflow', 'fastapi', 'agentic-ai', 'postgresql', 'docker'],
      stargazers_count: null,
      forks_count: null,
      updated_at: '2026-10-02T23:37:00Z',
    },
    {
      name: 'OpsPilot_AI_Incident_Intelligence',
      html_url: 'https://github.com/saurav526/OpsPilot_AI_Incident_Intelligence',
      description:
        'AI-assisted incident investigation copilot combining Isolation Forest anomaly detection, TF-IDF cosine similarity runbook retrieval, tool-using agent, FastAPI REST API, Streamlit dashboard, and SQLite audit logging.',
      language: 'Python',
      topics: ['anomaly-detection', 'isolation-forest', 'rag', 'fastapi', 'streamlit', 'ai-agent'],
      stargazers_count: null,
      forks_count: null,
      updated_at: '2026-10-13T12:21:00Z',
    },
    {
      name: 'autonomous_cyber_defense',
      html_url: 'https://github.com/saurav526/autonomous_cyber_defense',
      description:
        'Autonomous Cyber Defense simulation modeling network telemetry as graphs with a self-supervised Graph Autoencoder for reconstruction-error anomaly detection and a Reinforcement Learning response policy.',
      language: 'Python',
      topics: ['graph-neural-networks', 'autoencoder', 'reinforcement-learning', 'cybersecurity', 'streamlit'],
      stargazers_count: null,
      forks_count: null,
      updated_at: '2026-09-04T20:22:00Z',
    },
    {
      name: 'GEN-AI-projects',
      html_url: 'https://github.com/saurav526/GEN-AI-projects/tree/main/Medical_bot2.0',
      description:
        'Generative AI repository featuring the AI Medical Chatbot built with LangChain, Hugging Face embeddings, semantic chunking, FAISS vector search, conversational memory, and grounded prompt engineering.',
      language: 'Python',
      topics: ['langchain', 'faiss', 'rag', 'huggingface', 'generative-ai', 'prompt-engineering'],
      stargazers_count: null,
      forks_count: null,
      updated_at: '2026-08-18T20:33:00Z',
    },
    {
      name: 'expense-tracker-MCP-server',
      html_url: 'https://github.com/saurav526/expense-tracker-MCP-server',
      description:
        'Model Context Protocol (MCP) server built with FastMCP, SQLite parameterized queries, automatic schema creation, and a live-editable categories resource for LLM tool integration.',
      language: 'Python',
      topics: ['mcp', 'fastmcp', 'sqlite', 'llm-tools', 'python', 'uv'],
      stargazers_count: null,
      forks_count: null,
      updated_at: '2026-10-01T11:59:00Z',
    },
    {
      name: 'Chatbot-',
      html_url: 'https://github.com/saurav526/Chatbot-',
      description:
        'Conversational AI chatbot engineering workflows and LLM integration pipelines in Python.',
      language: 'Python',
      topics: ['chatbot', 'llm', 'python', 'nlp'],
      stargazers_count: null,
      forks_count: null,
      updated_at: '2026-08-24T23:34:00Z',
    },
  ],
  languages: {
    Python: 6,
    SQL: 2,
    'C++': 1,
    HTML: 1,
  },
};
