export const EMAIL = 'jayesh281998@gmail.com';
export const PHONE = '+1 (860) 934-8059';
export const PHONE_TEL = '+18609348059';
export const LOCATION = 'Los Angeles, CA';
export const LINKEDIN = 'https://www.linkedin.com/in/jayesh-bhadane';
export const GITHUB = 'https://github.com/jayesh2810';

export interface Job {
  role: string;
  org: string;
  orgNote: string;
  period: string;
  start: string;
  end: string;
  summary: string;
  tags: string[];
}

export const JOBS: Job[] = [
  {
    role: 'Machine Learning Engineer',
    org: 'Skan AI',
    orgNote: 'Built an agentic insurance platform where LLM agents move a submission from intake to decision.',
    period: 'Dec 2025 to Apr 2026',
    start: '2025-12',
    end: '2026-04',
    summary:
      'Built an agentic insurance platform where LLM agents move a submission from intake to decision. Added schema checks and an eval loop to keep the agents reliable, and cut cycle time on those workflows by roughly 70 to 80%.',
    tags: ['Google ADK', 'Agentic AI', 'Evals', 'FastAPI'],
  },
  {
    role: 'Data Scientist',
    org: 'Aurora Engineering',
    orgNote: "Used deep learning and time series models to recover corrupted plasma sensor data from NASA's MMS satellite mission.",
    period: 'Aug 2024 to Dec 2025',
    start: '2024-08',
    end: '2025-12',
    summary:
      "Used deep learning and time series models to recover corrupted plasma sensor data from NASA's MMS satellite mission, reaching an R² of 0.98.",
    tags: ['Deep Learning', 'Time Series', 'NASA MMS', 'Data Quality'],
  },
  {
    role: 'Data Scientist, then Sr. Data Scientist',
    org: 'C5i',
    orgNote: 'Data science consulting for Fortune 500 clients: segmentation, forecasting, NLP, and Bayesian marketing mix modeling.',
    period: 'Oct 2020 to Aug 2023',
    start: '2020-10',
    end: '2023-08',
    summary:
      'Consulted for Fortune 500 clients in tourism, automotive, and beverages. Used customer segmentation to shape targeted marketing, built time series forecasts, and applied NLP to patient-doctor data for a healthcare client. Later built Bayesian marketing mix models to show where marketing budget actually paid off.',
    tags: ['Segmentation', 'Forecasting', 'NLP', 'Marketing Mix'],
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
    org: 'Kaggle · 2023',
    year: '2023',
    headline: 'First place, frequency-severity modeling',
    body:
      'Won first place predicting auto insurance claim cost per policy with a two-step model: a Poisson GLM for claim frequency and a Gamma GLM for severity, scored on normalized Gini with 10-fold cross validation.',
    link: { label: 'See the code', href: 'https://github.com/jayesh2810/2023-Travelers-Analytics-Case-Competition' },
    stat: { label: 'Prize', value: '1st' },
  },
  {
    title: 'Star of the Quarter',
    org: 'C5i · 2023',
    year: '2023',
    headline: 'Awarded twice for exceeding expectations',
    body:
      'Awarded twice at C5i for exceeding role expectations, cited for model quality and for explaining results clearly to senior stakeholders.',
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
      'Bayesian Modeling',
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
      'LangChain',
      'LangGraph',
      'LlamaIndex',
      'LiteLLM',
      'Google ADK',
      'Pydantic',
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
      'PyMC',
      'Prophet',
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
