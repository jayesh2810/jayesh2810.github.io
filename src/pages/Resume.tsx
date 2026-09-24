import { Link } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { JOBS, EDUCATION, ACHIEVEMENTS, EMAIL, LOCATION, LINKEDIN, GITHUB, PHONE, PHONE_TEL } from '../data';

export default function Resume() {
  const download = () => {
    // Generate a clean plain-text resume on the fly — always in sync with the site.
    const lines: string[] = [];
    lines.push('JAYESH BHADANE');
    lines.push('Data Scientist & Machine Learning Engineer');
    lines.push(`${LOCATION} · ${EMAIL} · ${PHONE}`);
    lines.push(`LinkedIn: ${LINKEDIN} · GitHub: ${GITHUB}`);
    lines.push('');
    lines.push('SUMMARY');
    lines.push(
      'Data scientist and ML engineer in Los Angeles. Five years across enterprise analytics, applied deep learning, and production AI systems, always asking two questions: "does this work?" and "does this matter?"',
    );
    lines.push('');
    lines.push('EXPERIENCE');
    for (const j of JOBS) {
      lines.push('');
      lines.push(`${j.role} · ${j.org}  (${j.period})`);
      lines.push(j.summary);
    }
    lines.push('');
    lines.push('EDUCATION');
    for (const e of EDUCATION) {
      lines.push(`${e.degree} — ${e.school}, ${e.place}  (${e.period})  GPA ${e.gpa}`);
    }
    lines.push('');
    lines.push('AWARDS & PUBLICATIONS');
    for (const a of ACHIEVEMENTS) {
      lines.push(`${a.title} — ${a.org}: ${a.headline}`);
    }
    lines.push('');
    lines.push('SKILLS');
    lines.push('ML & Statistics: Logistic/linear regression, clustering, GLMs, Bayesian modeling, decision trees, dimensionality reduction, deep learning, NLP, time series, hypothesis testing, A/B testing');
    lines.push('LLMs & Agents: LangChain, LangGraph, LlamaIndex, LiteLLM, Google ADK, Pydantic, agentic AI, generative AI, RAG pipelines, eval & observability');
    lines.push('Platforms: SQL, R, Spark, Docker, GCP, Azure, AWS, Airflow, Databricks');
    lines.push('Frameworks: PyTorch, TensorFlow, Keras, scikit-learn, XGBoost, PyMC, Prophet, pandas, NumPy, statsmodels, FastAPI, Svelte, Plotly, Tableau, PowerBI');

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Jayesh-Bhadane-Resume.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Link to="/" className="inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.18em] text-rust hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to portfolio
      </Link>

      <div className="mt-8 flex flex-wrap items-start justify-between gap-6 border-b-2 border-ink pb-8">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-rust">Curriculum Vitae</p>
          <h1 className="mt-2 font-serif text-4xl font-black tracking-tight sm:text-5xl">Jayesh Bhadane</h1>
          <p className="mt-2 font-mono text-[13px] text-inksoft">
            Data Scientist & ML Engineer · {LOCATION} · {EMAIL} · {PHONE}
          </p>
        </div>
        <button
          type="button"
          onClick={download}
          className="press inline-flex items-center gap-2 border-2 border-ink bg-ink px-5 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-paper shadow-[4px_4px_0_0_var(--color-rust)]"
        >
          <Download className="h-4 w-4" /> Download .txt
        </button>
      </div>

      <div className="mt-10 space-y-10">
        <section>
          <h2 className="font-mono text-[12px] uppercase tracking-[0.3em] text-rust">Summary</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-inksoft">
            Data scientist and ML engineer in Los Angeles. Five years across enterprise analytics,
            applied deep learning, and production AI systems, always asking two questions:
            “does this actually work?” and “does this actually matter?”
          </p>
        </section>

        <section>
          <h2 className="font-mono text-[12px] uppercase tracking-[0.3em] text-rust">Experience</h2>
          <div className="mt-5 space-y-8">
            {JOBS.map((j) => (
              <div key={j.org + j.role} className="grid gap-2 border-l-4 border-ink pl-5 md:grid-cols-[1fr_auto]">
                <div>
                  <p className="font-serif text-lg font-black leading-tight">
                    {j.role} · {j.org}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-inksoft">{j.summary}</p>
                </div>
                <p className="whitespace-nowrap font-mono text-[11.5px] uppercase tracking-[0.1em] text-inksoft">
                  {j.period}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-mono text-[12px] uppercase tracking-[0.3em] text-rust">Education</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {EDUCATION.map((e) => (
              <div key={e.degree} className="ink-border-tight bg-cream p-5">
                <p className="font-serif text-lg font-black leading-tight">{e.degree}</p>
                <p className="mt-1 text-sm text-inksoft">
                  {e.school}, {e.place}
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-inksoft">
                  {e.period} · GPA {e.gpa}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-mono text-[12px] uppercase tracking-[0.3em] text-rust">Awards & Publications</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-inksoft">
            {ACHIEVEMENTS.map((a) => (
              <li key={a.title} className="flex gap-3">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-rust" aria-hidden="true" />
                <span>
                  <span className="font-semibold text-ink">{a.title}</span> — {a.org}: {a.headline}.
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-mono text-[12px] uppercase tracking-[0.3em] text-rust">Skills</h2>
          <div className="mt-4 space-y-1.5 text-sm leading-relaxed text-inksoft">
            <p><span className="font-semibold text-ink">ML & Statistics:</span> logistic / linear regression, clustering, GLMs, Bayesian modeling, decision trees, dimensionality reduction, deep learning, NLP, time series, hypothesis testing, A/B testing.</p>
            <p><span className="font-semibold text-ink">LLMs & Agents:</span> LangChain, LangGraph, LlamaIndex, LiteLLM, Google ADK, Pydantic, agentic AI, generative AI, RAG pipelines, eval & observability.</p>
            <p><span className="font-semibold text-ink">Languages & Platforms:</span> SQL, R, Spark, Docker, GCP, Azure, AWS, Airflow, Databricks.</p>
            <p><span className="font-semibold text-ink">Frameworks:</span> PyTorch, TensorFlow, Keras, scikit-learn, XGBoost, PyMC, Prophet, pandas, NumPy, statsmodels, FastAPI, Svelte, Plotly, Tableau, PowerBI.</p>
          </div>
        </section>

        <section className="border-t-2 border-ink pt-6">
          <h2 className="font-mono text-[12px] uppercase tracking-[0.3em] text-rust">Contact</h2>
          <p className="mt-3 text-sm text-inksoft">
            {EMAIL} · {PHONE} (<a className="text-rust hover:underline" href={`tel:${PHONE_TEL}`}>call</a>) · {LOCATION}
          </p>
          <p className="mt-1 text-sm text-inksoft">
            <a className="font-semibold text-rust hover:underline" href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
            {' · '}
            <a className="font-semibold text-rust hover:underline" href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
          </p>
        </section>
      </div>
    </main>
  );
}
