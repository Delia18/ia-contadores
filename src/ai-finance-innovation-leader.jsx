
import React, { useState, useEffect, useMemo } from 'react';

const storage = {
  async get(key) {
    const v = localStorage.getItem(key);
    return v ? { value: v } : null;
  },
  async set(key, value) {
    localStorage.setItem(key, value);
  },
  async delete(key) {
    localStorage.removeItem(key);
  }
};



import { Search, ChevronDown, ChevronRight, ExternalLink, BookOpen, CheckCircle2, Circle, Clock, Target, TrendingUp, Layers, Award, BarChart3, Download, GraduationCap, Lightbulb, Zap, Brain, Sparkles, Briefcase, Rocket, DollarSign, Shield, Globe, Star, Cpu, PieChart, Activity, FileText, Code, Terminal, MessageSquare, Database, Wrench, Youtube, Mail, Users, Lock, Unlock, AlertCircle, Settings, RefreshCw } from 'lucide-react';

// ============ BRANDING ============
const BRANDING = {
  name: "Delia Green",
  title: "AI Transformation Curriculum",
  tagline: "From Finance Professional to AI Innovation Leader",
  logo: "DG", // Initials for logo
  colors: {
    primary: "cyan",
    secondary: "violet", 
    accent: "fuchsia"
  },
  social: {
    newsletter: "DeliaTech Semanal",
    focus: "AI & FinTech in Latin America",
    linkedin: "https://www.linkedin.com/in/delia-green-mbs-a442b734/"
  }
};

// ============ SYSTEM GOVERNANCE ============
const SYSTEM_META = {
  name: "AI Transformation Curriculum",
  type: "CANONICAL_LEARNING_OS",
  version: "1.0.0",
  lastUpdated: "2026-01-24",
  owner: "Delia Green",
  governance: {
    rule1: "Single source of truth for AI learning",
    rule2: "Updates modify existing modules - no duplicates",
    rule3: "Separate from Delia Project OS",
    rule4: "Claude governs structure, progression, mastery",
    rule5: "Dashboard-ready and long-lived"
  },
  storageKeys: {
    progress: "learning-os-progress-v2",
    mastery: "learning-os-mastery-v2",
    notes: "learning-os-notes-v2",
    settings: "learning-os-settings-v2"
  }
};

// ============ MASTERY LEVELS ============
const MASTERY_LEVELS = {
  NOT_STARTED: { level: 0, label: 'Not Started', color: 'slate', icon: Circle },
  IN_PROGRESS: { level: 1, label: 'In Progress', color: 'amber', icon: Clock },
  COMPLETED: { level: 2, label: 'Completed', color: 'emerald', icon: CheckCircle2 },
  MASTERED: { level: 3, label: 'Mastered', color: 'cyan', icon: Star },
  TEACHING: { level: 4, label: 'Can Teach', color: 'violet', icon: GraduationCap }
};

// ============ MODULE REGISTRY ============
// Unique IDs prevent duplicates - updates modify existing entries
const MODULE_REGISTRY = {
  // PHASE 1: FOUNDATION
  "MOD-101": { id: "MOD-101", name: "GenAI & Transformer Foundations", phase: 1, track: 1, duration: "2-3 weeks", prerequisites: [], unlocks: ["MOD-102", "MOD-103"] },
  "MOD-102": { id: "MOD-102", name: "Prompting Fundamentals", phase: 1, track: 2, duration: "2-3 weeks", prerequisites: ["MOD-101"], unlocks: ["MOD-201"] },
  "MOD-103": { id: "MOD-103", name: "RAG Fundamentals", phase: 1, track: 3, duration: "2-3 weeks", prerequisites: ["MOD-101"], unlocks: ["MOD-202"] },
  "MOD-104": { id: "MOD-104", name: "Data Strategy & Governance", phase: 1, track: 4, duration: "2-3 weeks", prerequisites: [], unlocks: ["MOD-401"] },
  
  // PHASE 2: CORE ARCHITECTURE
  "MOD-201": { id: "MOD-201", name: "Advanced Prompt Engineering", phase: 2, track: 6, duration: "3-4 weeks", prerequisites: ["MOD-102"], unlocks: ["MOD-203"] },
  "MOD-202": { id: "MOD-202", name: "Advanced RAG Implementation", phase: 2, track: 5, duration: "4-6 weeks", prerequisites: ["MOD-103"], unlocks: ["MOD-301"] },
  "MOD-203": { id: "MOD-203", name: "LLM Operations & Tools", phase: 2, track: 7, duration: "3-4 weeks", prerequisites: ["MOD-201"], unlocks: ["MOD-204"] },
  "MOD-204": { id: "MOD-204", name: "Agent Frameworks", phase: 2, track: 8, duration: "4-5 weeks", prerequisites: ["MOD-203"], unlocks: ["MOD-301", "MOD-302"] },
  
  // PHASE 3: ADVANCED SYSTEMS
  "MOD-301": { id: "MOD-301", name: "Multi-Agent Systems", phase: 3, track: 9, duration: "4-6 weeks", prerequisites: ["MOD-204"], unlocks: ["MOD-303"] },
  "MOD-302": { id: "MOD-302", name: "Agent Memory & State", phase: 3, track: 10, duration: "3-5 weeks", prerequisites: ["MOD-204"], unlocks: ["MOD-303"] },
  "MOD-303": { id: "MOD-303", name: "Evaluation & Feedback", phase: 3, track: 11, duration: "4-6 weeks", prerequisites: ["MOD-301", "MOD-302"], unlocks: ["MOD-304"] },
  "MOD-304": { id: "MOD-304", name: "Production Optimization", phase: 3, track: 12, duration: "5-7 weeks", prerequisites: ["MOD-303"], unlocks: ["MOD-401", "MOD-402"] },
  
  // PHASE 4: ENTERPRISE
  "MOD-401": { id: "MOD-401", name: "AI Safety & Alignment", phase: 4, track: 13, duration: "3-4 weeks", prerequisites: ["MOD-104"], unlocks: ["MOD-403"] },
  "MOD-402": { id: "MOD-402", name: "Enterprise AI Architecture", phase: 4, track: 14, duration: "6-8 weeks", prerequisites: ["MOD-304"], unlocks: ["MOD-403"] },
  "MOD-403": { id: "MOD-403", name: "Deployment & Scaling", phase: 4, track: 15, duration: "5-7 weeks", prerequisites: ["MOD-401", "MOD-402"], unlocks: ["MOD-404"] },
  "MOD-404": { id: "MOD-404", name: "MLOps & Monitoring", phase: 4, track: 16, duration: "4-6 weeks", prerequisites: ["MOD-403"], unlocks: ["MOD-501"] },
  
  // PHASE 5: LEADERSHIP
  "MOD-501": { id: "MOD-501", name: "Strategic Planning", phase: 5, track: 17, duration: "Ongoing", prerequisites: ["MOD-404"], unlocks: ["MOD-502"] },
  "MOD-502": { id: "MOD-502", name: "AI Governance & Ethics", phase: 5, track: 18, duration: "Ongoing", prerequisites: ["MOD-501"], unlocks: ["MOD-503"] },
  "MOD-503": { id: "MOD-503", name: "Team Building", phase: 5, track: 19, duration: "Ongoing", prerequisites: ["MOD-502"], unlocks: ["MOD-504"] },
  "MOD-504": { id: "MOD-504", name: "Change Management", phase: 5, track: 20, duration: "Ongoing", prerequisites: ["MOD-503"], unlocks: [] }
};

// ============ RESOURCE REGISTRY ============
// Each resource has unique ID, linked to module
const RESOURCE_REGISTRY = {
  // MOD-101 Resources
  "RES-101-001": { id: "RES-101-001", moduleId: "MOD-101", name: "Generative AI with Large Language Models", provider: "DeepLearning.AI + AWS", url: "https://www.deeplearning.ai/courses/generative-ai-with-llms/", type: "course", essential: true },
  "RES-101-002": { id: "RES-101-002", moduleId: "MOD-101", name: "State of GPT", provider: "Andrej Karpathy", url: "https://www.youtube.com/watch?v=bZQun8Y4L2A", type: "video", essential: true },
  "RES-101-003": { id: "RES-101-003", moduleId: "MOD-101", name: "Neural Networks: Zero to Hero", provider: "Andrej Karpathy", url: "https://karpathy.ai/zero-to-hero.html", type: "course", essential: false },
  "RES-101-004": { id: "RES-101-004", moduleId: "MOD-101", name: "Attention Is All You Need", provider: "Vaswani et al., 2017", url: "https://arxiv.org/abs/1706.03762", type: "paper", essential: true },
  "RES-101-005": { id: "RES-101-005", moduleId: "MOD-101", name: "GPT-3 Paper", provider: "OpenAI, 2020", url: "https://arxiv.org/abs/2005.14165", type: "paper", essential: false },
  "RES-101-006": { id: "RES-101-006", moduleId: "MOD-101", name: "Llama 3 Technical Report", provider: "Meta, 2024", url: "https://arxiv.org/abs/2407.21783", type: "paper", essential: true },
  "RES-101-007": { id: "RES-101-007", moduleId: "MOD-101", name: "The Illustrated Transformer", provider: "Jay Alammar", url: "https://jalammar.github.io/illustrated-transformer/", type: "tutorial", essential: true },
  "RES-101-008": { id: "RES-101-008", moduleId: "MOD-101", name: "LLM Visualization", provider: "Brendan Bycroft", url: "https://bbycroft.net/llm", type: "tutorial", essential: false },
  "RES-101-009": { id: "RES-101-009", moduleId: "MOD-101", name: "Hugging Face Transformers Course", provider: "Hugging Face", url: "https://huggingface.co/learn/nlp-course", type: "course", essential: false },
  "RES-101-010": { id: "RES-101-010", moduleId: "MOD-101", name: "OpenAI API Docs", provider: "OpenAI", url: "https://platform.openai.com/docs", type: "docs", essential: true },
  "RES-101-011": { id: "RES-101-011", moduleId: "MOD-101", name: "Anthropic Claude Docs", provider: "Anthropic", url: "https://docs.anthropic.com", type: "docs", essential: true },
  
  // MOD-102 Resources
  "RES-102-001": { id: "RES-102-001", moduleId: "MOD-102", name: "ChatGPT Prompt Engineering for Developers", provider: "DeepLearning.AI", url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/", type: "course", essential: true },
  "RES-102-002": { id: "RES-102-002", moduleId: "MOD-102", name: "Prompt Engineering Guide", provider: "DAIR.AI", url: "https://www.promptingguide.ai/", type: "guide", essential: true },
  "RES-102-003": { id: "RES-102-003", moduleId: "MOD-102", name: "OpenAI Prompt Engineering Guide", provider: "OpenAI", url: "https://platform.openai.com/docs/guides/prompt-engineering", type: "docs", essential: true },
  "RES-102-004": { id: "RES-102-004", moduleId: "MOD-102", name: "Anthropic Prompt Engineering", provider: "Anthropic", url: "https://docs.anthropic.com/claude/docs/prompt-engineering", type: "docs", essential: true },
  "RES-102-005": { id: "RES-102-005", moduleId: "MOD-102", name: "OpenAI Playground", provider: "OpenAI", url: "https://platform.openai.com/playground", type: "tool", essential: false },
  
  // MOD-103 Resources
  "RES-103-001": { id: "RES-103-001", moduleId: "MOD-103", name: "Building Applications with Vector Databases", provider: "DeepLearning.AI", url: "https://www.deeplearning.ai/short-courses/building-applications-vector-databases/", type: "course", essential: true },
  "RES-103-002": { id: "RES-103-002", moduleId: "MOD-103", name: "LangChain for LLM Application Development", provider: "DeepLearning.AI", url: "https://www.deeplearning.ai/short-courses/langchain-for-llm-application-development/", type: "course", essential: true },
  "RES-103-003": { id: "RES-103-003", moduleId: "MOD-103", name: "Pinecone Docs", provider: "Pinecone", url: "https://docs.pinecone.io/", type: "docs", essential: true },
  "RES-103-004": { id: "RES-103-004", moduleId: "MOD-103", name: "Chroma Docs", provider: "Chroma", url: "https://docs.trychroma.com/", type: "docs", essential: true },
  "RES-103-005": { id: "RES-103-005", moduleId: "MOD-103", name: "OpenAI Embeddings Guide", provider: "OpenAI", url: "https://platform.openai.com/docs/guides/embeddings", type: "docs", essential: true },
  
  // MOD-201 Resources
  "RES-201-001": { id: "RES-201-001", moduleId: "MOD-201", name: "Chain-of-Thought Prompting Paper", provider: "Google, 2022", url: "https://arxiv.org/abs/2201.11903", type: "paper", essential: true },
  "RES-201-002": { id: "RES-201-002", moduleId: "MOD-201", name: "ReAct Paper", provider: "2023", url: "https://arxiv.org/abs/2210.03629", type: "paper", essential: true },
  "RES-201-003": { id: "RES-201-003", moduleId: "MOD-201", name: "Tree of Thoughts Paper", provider: "2023", url: "https://arxiv.org/abs/2305.10601", type: "paper", essential: false },
  "RES-201-004": { id: "RES-201-004", moduleId: "MOD-201", name: "DSPy", provider: "Stanford", url: "https://github.com/stanfordnlp/dspy", type: "code", essential: true },
  "RES-201-005": { id: "RES-201-005", moduleId: "MOD-201", name: "Instructor", provider: "Jason Liu", url: "https://github.com/jxnl/instructor", type: "code", essential: true },
  
  // MOD-202 Resources
  "RES-202-001": { id: "RES-202-001", moduleId: "MOD-202", name: "Building and Evaluating Advanced RAG", provider: "DeepLearning.AI", url: "https://www.deeplearning.ai/short-courses/building-evaluating-advanced-rag/", type: "course", essential: true },
  "RES-202-002": { id: "RES-202-002", moduleId: "MOD-202", name: "Original RAG Paper", provider: "Facebook, 2020", url: "https://arxiv.org/abs/2005.11401", type: "paper", essential: true },
  "RES-202-003": { id: "RES-202-003", moduleId: "MOD-202", name: "Self-RAG Paper", provider: "2023", url: "https://arxiv.org/abs/2310.11511", type: "paper", essential: true },
  "RES-202-004": { id: "RES-202-004", moduleId: "MOD-202", name: "GraphRAG Paper", provider: "Microsoft, 2024", url: "https://arxiv.org/abs/2404.16130", type: "paper", essential: true },
  "RES-202-005": { id: "RES-202-005", moduleId: "MOD-202", name: "RAPTOR Paper", provider: "2024", url: "https://arxiv.org/abs/2401.18059", type: "paper", essential: false },
  "RES-202-006": { id: "RES-202-006", moduleId: "MOD-202", name: "LlamaIndex Docs", provider: "LlamaIndex", url: "https://docs.llamaindex.ai/", type: "docs", essential: true },
  "RES-202-007": { id: "RES-202-007", moduleId: "MOD-202", name: "RAGAS", provider: "RAGAS", url: "https://docs.ragas.io/", type: "tool", essential: true },
  
  // MOD-204 Resources
  "RES-204-001": { id: "RES-204-001", moduleId: "MOD-204", name: "AI Agents in LangGraph", provider: "DeepLearning.AI", url: "https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/", type: "course", essential: true },
  "RES-204-002": { id: "RES-204-002", moduleId: "MOD-204", name: "Multi AI Agent Systems with CrewAI", provider: "DeepLearning.AI", url: "https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/", type: "course", essential: true },
  "RES-204-003": { id: "RES-204-003", moduleId: "MOD-204", name: "LangGraph Docs", provider: "LangChain", url: "https://langchain-ai.github.io/langgraph/", type: "docs", essential: true },
  "RES-204-004": { id: "RES-204-004", moduleId: "MOD-204", name: "CrewAI Docs", provider: "CrewAI", url: "https://docs.crewai.com/", type: "docs", essential: true },
  "RES-204-005": { id: "RES-204-005", moduleId: "MOD-204", name: "AutoGen Docs", provider: "Microsoft", url: "https://microsoft.github.io/autogen/", type: "docs", essential: false },
  
  // MOD-301 Resources
  "RES-301-001": { id: "RES-301-001", moduleId: "MOD-301", name: "ChatDev Paper", provider: "2023", url: "https://arxiv.org/abs/2307.07924", type: "paper", essential: true },
  "RES-301-002": { id: "RES-301-002", moduleId: "MOD-301", name: "MetaGPT Paper", provider: "2023", url: "https://arxiv.org/abs/2308.00352", type: "paper", essential: true },
  "RES-301-003": { id: "RES-301-003", moduleId: "MOD-301", name: "Mixture-of-Agents Paper", provider: "2024", url: "https://arxiv.org/abs/2406.04692", type: "paper", essential: true },
  
  // MOD-303 Resources
  "RES-303-001": { id: "RES-303-001", moduleId: "MOD-303", name: "Evaluating and Debugging Generative AI", provider: "DeepLearning.AI", url: "https://www.deeplearning.ai/short-courses/evaluating-debugging-generative-ai/", type: "course", essential: true },
  "RES-303-002": { id: "RES-303-002", moduleId: "MOD-303", name: "Red Teaming LLM Applications", provider: "DeepLearning.AI", url: "https://www.deeplearning.ai/short-courses/red-teaming-llm-applications/", type: "course", essential: true },
  "RES-303-003": { id: "RES-303-003", moduleId: "MOD-303", name: "Constitutional AI Paper", provider: "Anthropic", url: "https://arxiv.org/abs/2212.08073", type: "paper", essential: true },
  "RES-303-004": { id: "RES-303-004", moduleId: "MOD-303", name: "DPO Paper", provider: "Stanford, 2023", url: "https://arxiv.org/abs/2305.18290", type: "paper", essential: true },
  "RES-303-005": { id: "RES-303-005", moduleId: "MOD-303", name: "LangSmith", provider: "LangChain", url: "https://www.langchain.com/langsmith", type: "tool", essential: true },
  
  // MOD-401 Resources
  "RES-401-001": { id: "RES-401-001", moduleId: "MOD-401", name: "NeMo Guardrails", provider: "NVIDIA", url: "https://github.com/NVIDIA/NeMo-Guardrails", type: "code", essential: true },
  "RES-401-002": { id: "RES-401-002", moduleId: "MOD-401", name: "Guardrails AI", provider: "Guardrails AI", url: "https://www.guardrailsai.com/", type: "tool", essential: true },
  "RES-401-003": { id: "RES-401-003", moduleId: "MOD-401", name: "NIST AI RMF", provider: "NIST", url: "https://www.nist.gov/itl/ai-risk-management-framework", type: "framework", essential: true },
  "RES-401-004": { id: "RES-401-004", moduleId: "MOD-401", name: "OWASP Top 10 for LLMs", provider: "OWASP", url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/", type: "framework", essential: true },
  
  // MOD-402 Resources
  "RES-402-001": { id: "RES-402-001", moduleId: "MOD-402", name: "Designing Machine Learning Systems", provider: "Chip Huyen", url: "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/", type: "book", essential: true },
  "RES-402-002": { id: "RES-402-002", moduleId: "MOD-402", name: "AI Engineering", provider: "Chip Huyen, 2024", url: "https://www.oreilly.com/library/view/ai-engineering/9781098166298/", type: "book", essential: true },
  "RES-402-003": { id: "RES-402-003", moduleId: "MOD-402", name: "AWS Well-Architected ML Lens", provider: "AWS", url: "https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/", type: "docs", essential: true },
  
  // MOD-501 Resources
  "RES-501-001": { id: "RES-501-001", moduleId: "MOD-501", name: "Co-Intelligence", provider: "Ethan Mollick, 2024", url: "https://www.amazon.com/Co-Intelligence-Living-Working-Ethan-Mollick/dp/059371671X", type: "book", essential: true },
  "RES-501-002": { id: "RES-501-002", moduleId: "MOD-501", name: "The AI-First Company", provider: "Ash Fontana", url: "https://www.amazon.com/AI-First-Company-Compete-Artificial-Intelligence/dp/0593330315", type: "book", essential: true },
  "RES-501-003": { id: "RES-501-003", moduleId: "MOD-501", name: "McKinsey AI Insights", provider: "McKinsey", url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights", type: "resource", essential: false },
  
  // MOD-502 Resources
  "RES-502-001": { id: "RES-502-001", moduleId: "MOD-502", name: "EU AI Act", provider: "EU", url: "https://artificialintelligenceact.eu/", type: "regulation", essential: true },
  "RES-502-002": { id: "RES-502-002", moduleId: "MOD-502", name: "ISO 42001", provider: "ISO", url: "https://www.iso.org/standard/81230.html", type: "standard", essential: true },
  "RES-502-003": { id: "RES-502-003", moduleId: "MOD-502", name: "Stanford HAI", provider: "Stanford", url: "https://hai.stanford.edu/", type: "resource", essential: false }
};

// ============ PROJECT REGISTRY ============
const PROJECT_REGISTRY = {
  "PROJ-101": { id: "PROJ-101", name: "Custom Chatbot", phase: 1, difficulty: "Beginner", duration: "1 week", prerequisites: ["MOD-101", "MOD-102"], skills: ["API integration", "Prompt engineering", "Python", "Streamlit"] },
  "PROJ-102": { id: "PROJ-102", name: "Document Q&A System", phase: 1, difficulty: "Beginner", duration: "1-2 weeks", prerequisites: ["MOD-103"], skills: ["Embeddings", "Vector DB", "LangChain"] },
  "PROJ-103": { id: "PROJ-103", name: "Finance Prompt Library", phase: 1, difficulty: "Beginner", duration: "1 week", prerequisites: ["MOD-102"], skills: ["Prompt engineering", "YAML", "Jinja2"] },
  "PROJ-201": { id: "PROJ-201", name: "Advanced RAG for 10-K", phase: 2, difficulty: "Intermediate", duration: "2-3 weeks", prerequisites: ["MOD-202"], skills: ["LlamaIndex", "Reranking", "RAGAS"] },
  "PROJ-202": { id: "PROJ-202", name: "AI Excel Assistant", phase: 2, difficulty: "Intermediate", duration: "2 weeks", prerequisites: ["MOD-203"], skills: ["Function calling", "Pandas", "OpenPyXL"] },
  "PROJ-203": { id: "PROJ-203", name: "Report Generator", phase: 2, difficulty: "Intermediate", duration: "2-3 weeks", prerequisites: ["MOD-201"], skills: ["python-docx", "Jinja2", "Charts"] },
  "PROJ-301": { id: "PROJ-301", name: "Multi-Agent Financial Analyst", phase: 3, difficulty: "Advanced", duration: "3-4 weeks", prerequisites: ["MOD-301"], skills: ["CrewAI", "LangGraph", "Agent design"] },
  "PROJ-302": { id: "PROJ-302", name: "AI Audit Assistant", phase: 3, difficulty: "Advanced", duration: "3-4 weeks", prerequisites: ["MOD-302", "MOD-303"], skills: ["Anomaly detection", "Memory", "PostgreSQL"] },
  "PROJ-303": { id: "PROJ-303", name: "Conversational BI", phase: 3, difficulty: "Advanced", duration: "2-3 weeks", prerequisites: ["MOD-202", "MOD-203"], skills: ["Text-to-SQL", "DuckDB", "Plotly"] },
  "PROJ-401": { id: "PROJ-401", name: "Production AI Application", phase: 4, difficulty: "Expert", duration: "4-6 weeks", prerequisites: ["MOD-403", "MOD-404"], skills: ["Docker", "AWS/GCP", "CI/CD"] },
  "PROJ-402": { id: "PROJ-402", name: "AI Transformation Case Study", phase: 4, difficulty: "Expert", duration: "2-3 weeks", prerequisites: ["MOD-501"], skills: ["Technical writing", "Presentation"] },
  "PROJ-403": { id: "PROJ-403", name: "Open Source Contribution", phase: 5, difficulty: "Expert", duration: "Ongoing", prerequisites: ["MOD-204"], skills: ["Git", "Code review", "Documentation"] }
};

// ============ PROMPT ENGINEERING KNOWLEDGE BASE ============
const PROMPT_KNOWLEDGE_BASE = {
  fundamentals: {
    id: "PKB-FUND",
    title: "Fundamentals",
    icon: "📚",
    topics: [
      { id: "PKB-FUND-001", title: "What is Prompt Engineering?", essential: true },
      { id: "PKB-FUND-002", title: "Core Principles", essential: true },
      { id: "PKB-FUND-003", title: "Prompt Structure Template", essential: true }
    ]
  },
  techniques: {
    id: "PKB-TECH",
    title: "Prompting Techniques",
    icon: "🔧",
    topics: [
      { id: "PKB-TECH-001", title: "Zero-Shot Prompting", essential: true },
      { id: "PKB-TECH-002", title: "Few-Shot Prompting", essential: true },
      { id: "PKB-TECH-003", title: "Chain-of-Thought (CoT)", essential: true },
      { id: "PKB-TECH-004", title: "ReAct (Reasoning + Acting)", essential: true },
      { id: "PKB-TECH-005", title: "Tree of Thoughts", essential: false },
      { id: "PKB-TECH-006", title: "Self-Consistency", essential: false }
    ]
  },
  advanced: {
    id: "PKB-ADV",
    title: "Advanced Techniques",
    icon: "🚀",
    topics: [
      { id: "PKB-ADV-001", title: "System Prompts & Personas", essential: true },
      { id: "PKB-ADV-002", title: "Prompt Chaining", essential: true },
      { id: "PKB-ADV-003", title: "Structured Output Control", essential: true },
      { id: "PKB-ADV-004", title: "Iterative Refinement", essential: false },
      { id: "PKB-ADV-005", title: "Meta-Prompting", essential: false }
    ]
  },
  finance: {
    id: "PKB-FIN",
    title: "Finance-Specific Prompts",
    icon: "💰",
    topics: [
      { id: "PKB-FIN-001", title: "Variance Analysis Prompts", essential: true },
      { id: "PKB-FIN-002", title: "Journal Entry Review", essential: true },
      { id: "PKB-FIN-003", title: "Financial Statement Analysis", essential: true },
      { id: "PKB-FIN-004", title: "Audit & Compliance Prompts", essential: true },
      { id: "PKB-FIN-005", title: "Report Generation", essential: true }
    ]
  },
  bestPractices: {
    id: "PKB-BP",
    title: "Best Practices",
    icon: "✅",
    topics: [
      { id: "PKB-BP-001", title: "Quality Control Checklist", essential: true },
      { id: "PKB-BP-002", title: "Common Pitfalls", essential: true },
      { id: "PKB-BP-003", title: "Prompt Testing Framework", essential: false },
      { id: "PKB-BP-004", title: "Building a Prompt Library", essential: false }
    ]
  }
};

// ============ QUICK REFERENCE REGISTRY ============
const QUICK_REFERENCE = {
  models: {
    title: "Foundation Models",
    items: [
      { name: "OpenAI Platform", url: "https://platform.openai.com/", desc: "GPT-4o, GPT-4" },
      { name: "Anthropic Console", url: "https://console.anthropic.com/", desc: "Claude 3.5" },
      { name: "Google AI Studio", url: "https://aistudio.google.com/", desc: "Gemini" },
      { name: "Hugging Face", url: "https://huggingface.co/", desc: "Open source" },
      { name: "Together AI", url: "https://www.together.ai/", desc: "Llama, Mistral" },
      { name: "Groq", url: "https://groq.com/", desc: "Fast inference" }
    ]
  },
  frameworks: {
    title: "AI Frameworks",
    items: [
      { name: "LangChain", url: "https://python.langchain.com/", desc: "LLM apps" },
      { name: "LlamaIndex", url: "https://docs.llamaindex.ai/", desc: "Data framework" },
      { name: "LangGraph", url: "https://langchain-ai.github.io/langgraph/", desc: "Stateful agents" },
      { name: "CrewAI", url: "https://docs.crewai.com/", desc: "Multi-agent" },
      { name: "Semantic Kernel", url: "https://learn.microsoft.com/en-us/semantic-kernel/", desc: "Microsoft" }
    ]
  },
  vectordbs: {
    title: "Vector Databases",
    items: [
      { name: "Pinecone", url: "https://docs.pinecone.io/", desc: "Managed" },
      { name: "Chroma", url: "https://docs.trychroma.com/", desc: "Open source" },
      { name: "Weaviate", url: "https://weaviate.io/", desc: "GraphQL" },
      { name: "Qdrant", url: "https://qdrant.tech/", desc: "High perf" },
      { name: "Milvus", url: "https://milvus.io/", desc: "Distributed" }
    ]
  },
  observability: {
    title: "LLM Observability",
    items: [
      { name: "LangSmith", url: "https://www.langchain.com/langsmith", desc: "LangChain" },
      { name: "Weights & Biases", url: "https://wandb.ai/", desc: "Experiments" },
      { name: "Arize Phoenix", url: "https://phoenix.arize.com/", desc: "Observability" },
      { name: "Braintrust", url: "https://www.braintrust.dev/", desc: "Evals" }
    ]
  },
  newsletters: {
    title: "Newsletters",
    items: [
      { name: "The Batch", url: "https://www.deeplearning.ai/the-batch/", desc: "DeepLearning.AI" },
      { name: "Import AI", url: "https://importai.substack.com/", desc: "Jack Clark" },
      { name: "Ben's Bites", url: "https://bensbites.beehiiv.com/", desc: "Daily" },
      { name: "TLDR AI", url: "https://tldr.tech/ai", desc: "Digest" }
    ]
  },
  youtube: {
    title: "YouTube",
    items: [
      { name: "Andrej Karpathy", url: "https://www.youtube.com/@AndrejKarpathy", desc: "Deep technical" },
      { name: "Yannic Kilcher", url: "https://www.youtube.com/@YannicKilcher", desc: "Papers" },
      { name: "Two Minute Papers", url: "https://www.youtube.com/@TwoMinutePapers", desc: "Research" },
      { name: "AI Explained", url: "https://www.youtube.com/@aiexplained-official", desc: "Accessible" }
    ]
  }
};

// ============ PHASE CONFIGURATION ============
const PHASES = [
  { id: 1, name: "Foundation & Assessment", weeks: "Weeks 1-8", color: "cyan", modules: ["MOD-101", "MOD-102", "MOD-103", "MOD-104"] },
  { id: 2, name: "Core AI Architecture", weeks: "Weeks 9-22", color: "violet", modules: ["MOD-201", "MOD-202", "MOD-203", "MOD-204"] },
  { id: 3, name: "Advanced AI Systems", weeks: "Weeks 23-40", color: "fuchsia", modules: ["MOD-301", "MOD-302", "MOD-303", "MOD-304"] },
  { id: 4, name: "Enterprise Implementation", weeks: "Weeks 41-62", color: "amber", modules: ["MOD-401", "MOD-402", "MOD-403", "MOD-404"] },
  { id: 5, name: "AI Transformation Leadership", weeks: "Ongoing", color: "emerald", modules: ["MOD-501", "MOD-502", "MOD-503", "MOD-504"] }
];

// ============ STYLE CONFIGURATIONS ============
const typeColors = {
  course: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  paper: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  docs: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
  code: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  tool: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  tutorial: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  guide: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  framework: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  book: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  video: 'bg-red-500/20 text-red-300 border-red-500/30',
  resource: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  regulation: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  standard: 'bg-gray-500/20 text-gray-300 border-gray-500/30'
};

const phaseColors = {
  cyan: { gradient: 'from-cyan-500 to-cyan-600', text: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'bg-cyan-500/10' },
  violet: { gradient: 'from-violet-500 to-violet-600', text: 'text-violet-400', border: 'border-violet-500/30', bg: 'bg-violet-500/10' },
  fuchsia: { gradient: 'from-fuchsia-500 to-fuchsia-600', text: 'text-fuchsia-400', border: 'border-fuchsia-500/30', bg: 'bg-fuchsia-500/10' },
  amber: { gradient: 'from-amber-500 to-amber-600', text: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/10' },
  emerald: { gradient: 'from-emerald-500 to-emerald-600', text: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10' }
};

const masteryColors = {
  slate: 'text-slate-400',
  amber: 'text-amber-400',
  emerald: 'text-emerald-400',
  cyan: 'text-cyan-400',
  violet: 'text-violet-400'
};

const difficultyColors = {
  Beginner: 'bg-emerald-500/20 text-emerald-300',
  Intermediate: 'bg-amber-500/20 text-amber-300',
  Advanced: 'bg-rose-500/20 text-rose-300',
  Expert: 'bg-violet-500/20 text-violet-300'
};

// ============ MAIN COMPONENT ============
export default function LearningOS() {
  // State
  const [resourceProgress, setResourceProgress] = useState({});
  const [moduleMastery, setModuleMastery] = useState({});
  const [projectProgress, setProjectProgress] = useState({});
  const [promptProgress, setPromptProgress] = useState({});
  const [expandedPhases, setExpandedPhases] = useState({ 1: true });
  const [expandedModules, setExpandedModules] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('modules');
  const [isLoading, setIsLoading] = useState(true);
  const [showGovernance, setShowGovernance] = useState(false);

  // Load from storage
  useEffect(() => {
    const load = async () => {
      try {
        const rp = await storage.get(SYSTEM_META.storageKeys.progress);
        if (rp?.value) setResourceProgress(JSON.parse(rp.value));
        const mm = await storage.get(SYSTEM_META.storageKeys.mastery);
        if (mm?.value) setModuleMastery(JSON.parse(mm.value));
        const pp = await storage.get('learning-os-projects-v2');
        if (pp?.value) setProjectProgress(JSON.parse(pp.value));
        const prp = await storage.get('learning-os-prompts-v2');
        if (prp?.value) setPromptProgress(JSON.parse(prp.value));
      } catch(e) { console.log('Fresh start'); }
      setIsLoading(false);
    };
    load();
  }, []);

  // Save functions
  const saveResourceProgress = async (data) => {
    setResourceProgress(data);
    try { await storage.set(SYSTEM_META.storageKeys.progress, JSON.stringify(data)); } catch(e) {}
  };

  const saveModuleMastery = async (data) => {
    setModuleMastery(data);
    try { await storage.set(SYSTEM_META.storageKeys.mastery, JSON.stringify(data)); } catch(e) {}
  };

  const saveProjectProgress = async (data) => {
    setProjectProgress(data);
    try { await storage.set('learning-os-projects-v2', JSON.stringify(data)); } catch(e) {}
  };

  const savePromptProgress = async (data) => {
    setPromptProgress(data);
    try { await storage.set('learning-os-prompts-v2', JSON.stringify(data)); } catch(e) {}
  };

  // Toggle resource completion
  const toggleResource = (resId) => {
    const newProgress = { ...resourceProgress };
    if (newProgress[resId]) {
      delete newProgress[resId];
    } else {
      newProgress[resId] = { completedAt: new Date().toISOString() };
    }
    saveResourceProgress(newProgress);
  };

  // Toggle project completion
  const toggleProject = (projId) => {
    const newProgress = { ...projectProgress };
    if (newProgress[projId]) {
      delete newProgress[projId];
    } else {
      newProgress[projId] = { completedAt: new Date().toISOString() };
    }
    saveProjectProgress(newProgress);
  };

  // Toggle prompt topic completion
  const togglePrompt = (topicId) => {
    const newProgress = { ...promptProgress };
    if (newProgress[topicId]) {
      delete newProgress[topicId];
    } else {
      newProgress[topicId] = { completedAt: new Date().toISOString() };
    }
    savePromptProgress(newProgress);
  };

  // Cycle module mastery level
  const cycleMastery = (modId) => {
    const currentLevel = moduleMastery[modId]?.level || 0;
    const newLevel = (currentLevel + 1) % 5;
    const newMastery = { ...moduleMastery, [modId]: { level: newLevel, updatedAt: new Date().toISOString() } };
    saveModuleMastery(newMastery);
  };

  // Check if module is unlocked
  const isModuleUnlocked = (modId) => {
    const mod = MODULE_REGISTRY[modId];
    if (!mod.prerequisites.length) return true;
    return mod.prerequisites.every(prereq => (moduleMastery[prereq]?.level || 0) >= 2);
  };

  // Get resources for a module
  const getModuleResources = (modId) => {
    return Object.values(RESOURCE_REGISTRY).filter(r => r.moduleId === modId);
  };

  // Calculate stats
  const stats = useMemo(() => {
    const totalResources = Object.keys(RESOURCE_REGISTRY).length;
    const completedResources = Object.keys(resourceProgress).length;
    const totalModules = Object.keys(MODULE_REGISTRY).length;
    const masteredModules = Object.values(moduleMastery).filter(m => m.level >= 2).length;
    const totalProjects = Object.keys(PROJECT_REGISTRY).length;
    const completedProjects = Object.keys(projectProgress).length;
    
    const phaseStats = {};
    PHASES.forEach(phase => {
      const phaseResources = Object.values(RESOURCE_REGISTRY).filter(r => 
        phase.modules.includes(r.moduleId)
      );
      const phaseCompleted = phaseResources.filter(r => resourceProgress[r.id]).length;
      phaseStats[phase.id] = {
        total: phaseResources.length,
        completed: phaseCompleted,
        name: phase.name,
        color: phase.color
      };
    });

    return { totalResources, completedResources, totalModules, masteredModules, totalProjects, completedProjects, phaseStats };
  }, [resourceProgress, moduleMastery, projectProgress]);

  // Get mastery info
  const getMasteryInfo = (level) => {
    return Object.values(MASTERY_LEVELS).find(m => m.level === level) || MASTERY_LEVELS.NOT_STARTED;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 text-sm">Loading Learning OS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100" style={{ fontFamily: "'JetBrains Mono', 'SF Mono', monospace" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Delia Green Logo */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 via-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <span className="text-white font-bold text-lg">DG</span>
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                {BRANDING.name}
              </h1>
              <p className="text-xs text-slate-500">{BRANDING.title} • v{SYSTEM_META.version}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowGovernance(!showGovernance)} className="p-2 hover:bg-slate-800 rounded-lg" title="System Governance">
              <Settings className="w-4 h-4 text-slate-400" />
            </button>
            <div className="text-right">
              <p className="text-xl font-bold text-cyan-400">{Math.round(stats.completedResources/stats.totalResources*100)}%</p>
              <p className="text-xs text-slate-500">{stats.completedResources}/{stats.totalResources}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1 bg-slate-800">
        <div className="h-full bg-gradient-to-r from-cyan-500 via-violet-500 to-fuchsia-500 transition-all duration-500" style={{ width: `${(stats.completedResources/stats.totalResources)*100}%` }} />
      </div>

      {/* Governance Panel */}
      {showGovernance && (
        <div className="bg-slate-900/80 border-b border-slate-700/50 px-4 py-4">
          <div className="max-w-7xl mx-auto">
            <h3 className="font-bold text-sm text-cyan-400 mb-2 flex items-center gap-2"><Shield className="w-4 h-4" /> System Governance</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                <p className="text-slate-300 font-medium mb-1">System Type</p>
                <p className="text-slate-500">{SYSTEM_META.type}</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                <p className="text-slate-300 font-medium mb-1">Version</p>
                <p className="text-slate-500">{SYSTEM_META.version} • Updated {SYSTEM_META.lastUpdated}</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
                <p className="text-slate-300 font-medium mb-1">Owner</p>
                <p className="text-slate-500">{SYSTEM_META.owner}</p>
              </div>
            </div>
            <div className="mt-3 text-xs text-slate-500">
              <p className="font-medium text-slate-400 mb-1">Governance Rules:</p>
              <ul className="space-y-1">
                {Object.values(SYSTEM_META.governance).map((rule, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-slate-800/50 px-4 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex gap-1">
          {[
            { id: 'modules', label: 'Modules', icon: Layers },
            { id: 'projects', label: 'Projects', icon: Rocket },
            { id: 'prompts', label: 'Prompt Engineering', icon: MessageSquare },
            { id: 'reference', label: 'Quick Reference', icon: Zap },
            { id: 'analytics', label: 'Analytics', icon: PieChart }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-all ${
                activeTab === tab.id ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}>
              <tab.icon className="w-4 h-4" />{tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Welcome Banner - Shows on first visit or when no progress */}
        {stats.completedResources < 5 && (
          <div className="mb-6 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 rounded-2xl border border-cyan-500/20 overflow-hidden">
            <div className="p-6 relative">
              {/* Decorative gradient orbs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 via-violet-500 to-fuchsia-500 flex items-center justify-center shadow-xl shadow-cyan-500/25">
                    <span className="text-white font-bold text-xl">DG</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{BRANDING.name}</h2>
                    <p className="text-sm text-cyan-400">{BRANDING.tagline}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-cyan-300">{stats.totalResources}+ Resources</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-violet-500/10 border border-violet-500/30 rounded-full">
                    <Layers className="w-4 h-4 text-violet-400" />
                    <span className="text-sm text-violet-300">20 Modules</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-full">
                    <Rocket className="w-4 h-4 text-fuchsia-400" />
                    <span className="text-sm text-fuchsia-300">12 Projects</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full">
                    <GraduationCap className="w-4 h-4 text-amber-400" />
                    <span className="text-sm text-amber-300">5 Mastery Levels</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* MODULES TAB */}
        {activeTab === 'modules' && (
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input type="text" placeholder="Search modules and resources..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-sm" />
            </div>

            {/* Mastery Legend */}
            <div className="flex flex-wrap gap-3 text-xs">
              {Object.values(MASTERY_LEVELS).map(level => (
                <div key={level.level} className="flex items-center gap-1.5">
                  <level.icon className={`w-3.5 h-3.5 ${masteryColors[level.color]}`} />
                  <span className="text-slate-400">{level.label}</span>
                </div>
              ))}
            </div>

            {/* Phases */}
            {PHASES.map(phase => {
              const colors = phaseColors[phase.color];
              const ps = stats.phaseStats[phase.id];
              
              return (
                <div key={phase.id} className={`bg-slate-900/50 rounded-xl border ${colors.border}`}>
                  <button onClick={() => setExpandedPhases(p => ({ ...p, [phase.id]: !p[phase.id] }))}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-800/30">
                    <div className="flex items-center gap-3">
                      {expandedPhases[phase.id] ? <ChevronDown className={`w-4 h-4 ${colors.text}`} /> : <ChevronRight className={`w-4 h-4 ${colors.text}`} />}
                      <div className={`w-1.5 h-10 rounded-full bg-gradient-to-b ${colors.gradient}`} />
                      <div className="text-left">
                        <h2 className="font-bold text-sm">Phase {phase.id}: {phase.name}</h2>
                        <p className="text-xs text-slate-500">{phase.weeks} • {phase.modules.length} modules</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${colors.text}`}>{ps?.completed || 0}/{ps?.total || 0}</span>
                      <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${colors.gradient}`} style={{ width: `${((ps?.completed||0)/(ps?.total||1))*100}%` }} />
                      </div>
                    </div>
                  </button>

                  {expandedPhases[phase.id] && (
                    <div className="px-4 pb-4 space-y-3">
                      {phase.modules.map(modId => {
                        const mod = MODULE_REGISTRY[modId];
                        const resources = getModuleResources(modId);
                        const completedCount = resources.filter(r => resourceProgress[r.id]).length;
                        const mastery = moduleMastery[modId]?.level || 0;
                        const masteryInfo = getMasteryInfo(mastery);
                        const unlocked = isModuleUnlocked(modId);
                        const MasteryIcon = masteryInfo.icon;

                        return (
                          <div key={modId} className={`bg-slate-800/30 rounded-lg border ${unlocked ? 'border-slate-700/30' : 'border-slate-700/20 opacity-60'}`}>
                            <div className="px-3 py-2 flex items-center justify-between">
                              <button onClick={() => unlocked && setExpandedModules(m => ({ ...m, [modId]: !m[modId] }))}
                                className="flex items-center gap-2 flex-1 text-left">
                                {unlocked ? (
                                  expandedModules[modId] ? <ChevronDown className="w-3 h-3 text-slate-500" /> : <ChevronRight className="w-3 h-3 text-slate-500" />
                                ) : (
                                  <Lock className="w-3 h-3 text-slate-600" />
                                )}
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-500">{modId}</span>
                                    <span className="font-medium text-sm">{mod.name}</span>
                                  </div>
                                  <p className="text-xs text-slate-500">{mod.duration} • {completedCount}/{resources.length} resources</p>
                                </div>
                              </button>
                              
                              <div className="flex items-center gap-2">
                                {mod.prerequisites.length > 0 && (
                                  <span className="text-xs text-slate-600" title={`Requires: ${mod.prerequisites.join(', ')}`}>
                                    ← {mod.prerequisites.length}
                                  </span>
                                )}
                                <button onClick={() => unlocked && cycleMastery(modId)} disabled={!unlocked}
                                  className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${unlocked ? 'hover:bg-slate-700/50' : ''}`}
                                  title={unlocked ? "Click to change mastery level" : "Complete prerequisites first"}>
                                  <MasteryIcon className={`w-4 h-4 ${masteryColors[masteryInfo.color]}`} />
                                  <span className={masteryColors[masteryInfo.color]}>{masteryInfo.label}</span>
                                </button>
                              </div>
                            </div>

                            {expandedModules[modId] && unlocked && (
                              <div className="px-3 pb-3 space-y-1">
                                {resources.filter(r => !searchQuery || r.name.toLowerCase().includes(searchQuery.toLowerCase())).map(res => {
                                  const done = !!resourceProgress[res.id];
                                  return (
                                    <div key={res.id} className={`group flex items-center gap-2 p-2 rounded-lg transition-all ${done ? 'bg-emerald-500/5' : 'hover:bg-slate-700/20'}`}>
                                      <button onClick={() => toggleResource(res.id)}>
                                        {done ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Circle className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />}
                                      </button>
                                      <a href={res.url} target="_blank" rel="noopener noreferrer" className={`flex-1 text-sm hover:text-cyan-400 ${done ? 'text-slate-400 line-through' : ''}`}>
                                        {res.name}
                                        {res.essential && <Star className="w-3 h-3 inline ml-1 text-amber-400" />}
                                      </a>
                                      <span className="text-xs text-slate-500">{res.provider}</span>
                                      <span className={`text-xs px-1.5 py-0.5 rounded border ${typeColors[res.type] || 'bg-slate-500/20'}`}>{res.type}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-cyan-500/10 to-violet-500/10 rounded-xl border border-cyan-500/30 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Hands-On Projects</h2>
                  <p className="text-sm text-slate-400">{stats.completedProjects}/{stats.totalProjects} completed • Build real AI applications for finance</p>
                </div>
              </div>
            </div>
            
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {Object.values(PROJECT_REGISTRY).map(proj => {
                const done = !!projectProgress[proj.id];
                const prereqsMet = proj.prerequisites.every(p => (moduleMastery[p]?.level || 0) >= 2);
                const colors = phaseColors[PHASES[proj.phase - 1]?.color || 'cyan'];
                
                return (
                  <div key={proj.id} className={`p-3 rounded-lg border transition-all ${
                    done ? 'bg-emerald-500/5 border-emerald-500/30' : 
                    prereqsMet ? 'bg-slate-800/30 border-slate-700/30' : 'bg-slate-800/20 border-slate-700/20 opacity-60'
                  }`}>
                    <div className="flex justify-between mb-2">
                      <div>
                        <span className="text-xs text-slate-500">{proj.id}</span>
                        <h4 className="font-medium text-sm">{proj.name}</h4>
                      </div>
                      <button onClick={() => prereqsMet && toggleProject(proj.id)} disabled={!prereqsMet}>
                        {done ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : 
                         prereqsMet ? <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" /> :
                         <Lock className="w-5 h-5 text-slate-600" />}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {proj.skills.slice(0,3).map((s, i) => <span key={i} className="text-xs px-1.5 py-0.5 bg-slate-700/50 rounded">{s}</span>)}
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className={`px-1.5 py-0.5 rounded ${difficultyColors[proj.difficulty]}`}>{proj.difficulty}</span>
                      <span className="text-slate-500">{proj.duration}</span>
                    </div>
                    {!prereqsMet && (
                      <p className="text-xs text-slate-600 mt-2">Requires: {proj.prerequisites.join(', ')}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PROMPT ENGINEERING TAB */}
        {activeTab === 'prompts' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-xl border border-violet-500/30 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Prompt Engineering Knowledge Base</h2>
                  <p className="text-sm text-slate-400">Master the art of communicating with AI • Finance-specific templates included</p>
                </div>
              </div>
            </div>
            
            {Object.values(PROMPT_KNOWLEDGE_BASE).map(category => {
              const completedCount = category.topics.filter(t => promptProgress[t.id]).length;
              return (
                <div key={category.id} className="bg-slate-900/50 rounded-xl border border-slate-800/50 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold flex items-center gap-2">
                      <span>{category.icon}</span> {category.title}
                    </h3>
                    <span className="text-xs text-slate-500">{completedCount}/{category.topics.length}</span>
                  </div>
                  <div className="space-y-1">
                    {category.topics.map(topic => {
                      const done = !!promptProgress[topic.id];
                      return (
                        <div key={topic.id} className={`group flex items-center gap-2 p-2 rounded-lg ${done ? 'bg-emerald-500/5' : 'hover:bg-slate-800/50'}`}>
                          <button onClick={() => togglePrompt(topic.id)}>
                            {done ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Circle className="w-4 h-4 text-slate-600 group-hover:text-slate-400" />}
                          </button>
                          <span className={`flex-1 text-sm ${done ? 'text-slate-400 line-through' : ''}`}>
                            {topic.title}
                            {topic.essential && <Star className="w-3 h-3 inline ml-1 text-amber-400" />}
                          </span>
                          <span className="text-xs text-slate-600">{topic.id}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* QUICK REFERENCE TAB */}
        {activeTab === 'reference' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/30 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Quick Reference</h2>
                  <p className="text-sm text-slate-400">Essential tools, platforms, and resources at your fingertips</p>
                </div>
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(QUICK_REFERENCE).map(([key, category]) => (
              <div key={key} className="bg-slate-900/50 rounded-xl border border-slate-800/50 p-4">
                <h3 className="font-bold mb-3 text-cyan-400">{category.title}</h3>
                <div className="space-y-2">
                  {category.items.map((item, i) => (
                    <a key={i} href={item.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/50 group">
                      <div>
                        <p className="text-sm font-medium group-hover:text-cyan-400">{item.name}</p>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                      <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-cyan-400" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-xl border border-emerald-500/30 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                  <PieChart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Learning Analytics</h2>
                  <p className="text-sm text-slate-400">Track your progress, mastery levels, and learning velocity</p>
                </div>
              </div>
            </div>
            
            {/* Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/50 rounded-xl border border-cyan-500/30 p-4">
                <div className="flex items-center gap-3">
                  <Target className="w-8 h-8 text-cyan-400" />
                  <div>
                    <p className="text-2xl font-bold text-cyan-400">{Math.round(stats.completedResources/stats.totalResources*100)}%</p>
                    <p className="text-xs text-slate-500">Overall Progress</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-xl border border-emerald-500/30 p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  <div>
                    <p className="text-2xl font-bold text-emerald-400">{stats.completedResources}</p>
                    <p className="text-xs text-slate-500">Resources Done</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-xl border border-violet-500/30 p-4">
                <div className="flex items-center gap-3">
                  <Layers className="w-8 h-8 text-violet-400" />
                  <div>
                    <p className="text-2xl font-bold text-violet-400">{stats.masteredModules}/{stats.totalModules}</p>
                    <p className="text-xs text-slate-500">Modules Mastered</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900/50 rounded-xl border border-amber-500/30 p-4">
                <div className="flex items-center gap-3">
                  <Rocket className="w-8 h-8 text-amber-400" />
                  <div>
                    <p className="text-2xl font-bold text-amber-400">{stats.completedProjects}/{stats.totalProjects}</p>
                    <p className="text-xs text-slate-500">Projects Done</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase Progress */}
            <div className="bg-slate-900/50 rounded-xl border border-slate-800/50 p-4">
              <h3 className="font-bold mb-4">Progress by Phase</h3>
              <div className="space-y-3">
                {Object.values(stats.phaseStats).map((ps, i) => {
                  const colors = phaseColors[ps.color];
                  const pct = Math.round((ps.completed/ps.total)*100);
                  return (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className={colors.text}>{ps.name}</span>
                        <span className="text-slate-400">{ps.completed}/{ps.total} ({pct}%)</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${colors.gradient}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Module Mastery Overview */}
            <div className="bg-slate-900/50 rounded-xl border border-slate-800/50 p-4">
              <h3 className="font-bold mb-4">Module Mastery Overview</h3>
              <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                {Object.keys(MODULE_REGISTRY).map(modId => {
                  const mastery = moduleMastery[modId]?.level || 0;
                  const masteryInfo = getMasteryInfo(mastery);
                  const MIcon = masteryInfo.icon;
                  return (
                    <div key={modId} className="p-2 bg-slate-800/30 rounded-lg text-center" title={`${modId}: ${masteryInfo.label}`}>
                      <MIcon className={`w-5 h-5 mx-auto ${masteryColors[masteryInfo.color]}`} />
                      <p className="text-xs text-slate-500 mt-1">{modId.split('-')[1]}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Export */}
            <button onClick={() => {
              const report = {
                system: SYSTEM_META,
                exportDate: new Date().toISOString(),
                stats,
                resourceProgress,
                moduleMastery,
                projectProgress,
                promptProgress
              };
              const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `learning-os-export-${new Date().toISOString().split('T')[0]}.json`;
              a.click();
            }} className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-lg hover:bg-cyan-500/30 border border-cyan-500/30">
              <Download className="w-4 h-4" /> Export Full Progress Report
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 px-4 py-6 mt-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 via-violet-500 to-fuchsia-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">DG</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-slate-400">{BRANDING.name}</p>
                  <a href={BRANDING.social.linkedin} target="_blank" rel="noopener noreferrer" 
                    className="text-cyan-400 hover:text-cyan-300 transition-colors" title="Connect on LinkedIn">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
                <p className="text-xs text-slate-600">{BRANDING.title} • v{SYSTEM_META.version}</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-xs text-slate-500">
                📰 Follow <span className="text-cyan-400">{BRANDING.social.newsletter}</span> for {BRANDING.social.focus}
              </p>
              <p className="text-xs text-slate-600 mt-1">Progress saves automatically • Built for the AI transformation journey</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}