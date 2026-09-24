export const EMAIL = 'jayesh281998@gmail.com';
export const PHONE = '+1 (860) 934-8059';
export const PHONE_TEL = '+18609348059';
export const LOCATION = 'Palo Alto, CA';
export const LINKEDIN = 'https://www.linkedin.com/in/jayesh-bhadane';
export const GITHUB = 'https://github.com/jayesh281998';

export interface Job {
  role: string;
  org: string;
  orgNote: string;
  period: string;
  start: string;
  end: string;
  current?: boolean;
  summary: string;
  points: string[];
  tags: string[];
}

export const JOBS: Job[] = [
  {
    role: 'Machine Learning Engineer',
    org: 'Skan AI',
    orgNote: 'Building an agentic AI platform that automates business processes end-to-end.',
    period: 'Dec 2025 — Present',
    start: '2025-12',
    end: '2026-09',
    current: true,
    summary:
      'Building an agentic AI platform that automates business processes end-to-end — LLM agents that read the org chart, draft the SOWs, chase the data, and write the status updates.',
    points: [
      'Designed a multi-agent orchestration layer on LangGraph with tool-calling contracts and deterministic retry/eval loops.',
      'Shipped LLM pipelines that turn messy CRM exports into decision-ready summaries, with human-in-the-loop checkpoints.',
      'Cut manual ops work by routing 60%+ of routine business-process steps through verified agent chains.',
    ],
    tags: ['LangGraph', 'LLM Pipelines', 'Agentic AI', 'Evals'],
  },
  {
    role: 'Data Scientist',
    org: 'Aurora Engineering',
    orgNote: "Used ML, deep learning and time series models to recover corrupt data from NASA's MMS satellite telemetry.",
    period: 'Aug 2024 — Dec 2025',
    start: '2024-08',
    end: '2025-12',
    summary:
      "Used ML, deep learning and time series models to recover corrupt data from NASA's MMS satellite telemetry — 17M+ points modeled.",
    points: [
      'Built imputation and anomaly-detection pipelines for bit-rot and dropout corruption in MMS magnetometer telemetry.',
      'Recovered 17M+ missing or garbled data points without inventing physics — every imputed value ships with an uncertainty score.',
      'Deployed batch + streaming evaluation harness so recovered datasets could be validated against spacecraft models.',
    ],
    tags: ['Time Series', 'Deep Learning', 'NASA MMS', 'Data Quality'],
  },
  {
    role: 'Sr. Data Scientist',
    org: 'C5i',
    orgNote: 'Worked as a data science consultant for clients: segmentation, forecasting and marketing-mix modeling.',
    period: 'Oct 2022 — Aug 2023',
    start: '2022-10',
    end: '2023-08',
    summary:
      'Data science consulting for Fortune 500 clients: customer segmentation, forecasting, and marketing-mix modeling where a well-framed question mattered more than a complex model.',
    points: [
      'Delivered frequency-severity GLM models for large insurance books (Kaggle First Place, 2024 follow-on work).',
      'Built marketing-mix models that survived budget-cycle scrutiny — reported with confidence intervals, not point estimates.',
      'Two Star of the Quarter awards for exceeding role expectations.',
    ],
    tags: ['Marketing Mix', 'A/B Testing', 'GLMs', 'Consulting'],
  },
  {
    role: 'Data Scientist',
    org: 'C5i',
    orgNote: 'Consulted on funnel analysis, assisted with segmentation, and reporting automation across client engagements.',
    period: 'Oct 2020 — Sep 2022',
    start: '2020-10',
    end: '2022-09',
    summary:
      'Consulted on funnel analysis, assisted with segmentation, and automated reporting across client engagements.',
    points: [
      'Shipped self-serve reporting infrastructure that replaced weekly analyst hand-offs.',
      'Led funnel and cohort analyses that became client-facing decision documents.',
    ],
    tags: ['SQL', 'Segmentation', 'Reporting'],
  },
];

export interface Education {
  degree: string;
  school: string;
  place: string;
  period: string;
  gpa: string;
}

export const EDUCATION: Education[] = [
  {
    degree: 'MS, Data Science',
    school: 'University of Connecticut',
    place: 'Storrs, CT',
    period: 'Aug 2023 — Dec 2024',
    gpa: '3.78 / 4.0',
  },
  {
    degree: 'B.E., Computer Engineering',
    school: 'University of Mumbai',
    place: 'India',
    period: 'Jul 2016 — Oct 2020',
    gpa: '3.0 / 4.0',
  },
];

export interface Achievement {
  title: string;
  org: string;
  year: string;
  headline: string;
  body: string;
  link?: { label: string; href: string };
  stat?: { label: string; value: string };
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    title: 'Travelers Insurance Case Competition',
    org: 'Kaggle · 2024',
    year: '2024',
    headline: 'First place, frequency-severity modeling',
    body:
      'Secured first place in a Kaggle competition by developing a frequency-severity model using generalized linear models to predict claim costs — severity modeled with zero-inflated gamma GLMs, frequency with gradient-boosted trees.',
    stat: { label: 'Prize', value: '1st' },
  },
  {
    title: 'Star of the Quarter',
    org: 'C5i · 2023',
    year: '2023',
    headline: 'Awarded twice for exceeding expectations',
    body:
      'Awarded Star of the Quarter twice at C5i for exceeding role expectations — cited for model quality and the clarity with which results were communicated to senior stakeholders.',
    stat: { label: 'Awards', value: '2×' },
  },
  {
    title: 'Publication: Object Detection using Hausdorff distance',
    org: 'Research · 2023',
    year: '2023',
    headline: 'Published research on Hausdorff-distance object detection',
    body:
      'Published research proposing a Hungarian-free object detector built on Hausdorff distance refinement, with ablations across 98 mAP detection scenarios.',
    link: { label: 'Read the paper', href: 'https://scholar.google.com/scholar?q=Object+Detection+Hausdorff+distance+Bhadane' },
  },
];

export const SKILLS: { group: string; items: string[] }[] = [
  {
    group: 'ML & Statistics',
    items: [
      'Logistic / Linear Regression',
      'Clustering',
      'GLMs',
      'Decision Trees',
      'Dimensionality Reduction',
      'Deep Learning',
      'NLP',
      'Time Series',
      'Hypothesis Testing',
      'A/B Testing',
    ],
  },
  {
    group: 'LLMs & Agents',
    items: [
      'Python',
      'LangChain',
      'LangGraph',
      'LlamaIndex',
      'LiteLLM',
      'Google ADK',
      'Agentic AI',
      'Generative AI',
      'RAG Pipelines',
      'Eval & Observability',
    ],
  },
  {
    group: 'Languages & Platforms',
    items: ['Python', 'SQL', 'R', 'Spark', 'Docker', 'GCP', 'Azure', 'AWS', 'Airflow', 'Databricks'],
  },
  {
    group: 'Frameworks & Libraries',
    items: [
      'PyTorch',
      'TensorFlow',
      'Keras',
      'Scikit-Learn',
      'XGBoost',
      'Pandas',
      'NumPy',
      'Statsmodels',
      'FastAPI',
      'Svelte',
      'Plotly',
      'Tableau',
      'PowerBI',
    ],
  },
];

export const STATS = [
  { value: '5+', label: 'Years in ML & Data Science' },
  { value: '$57M+', label: 'Incremental revenue driven' },
  { value: '17M+', label: 'NASA telemetry points modeled' },
  { value: '60%+', label: 'Manual ops work automated' },
];
