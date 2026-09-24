import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, Mail, MapPin } from 'lucide-react';
import PortraitArt from '../components/PortraitArt';
import { Marquee, Stamp } from '../components/Bits';
import { EMAIL, LOCATION, STATS, JOBS, ACHIEVEMENTS, SKILLS } from '../data';
import type { Job } from '../data';
import Canvas2D from '../components/Canvas2D';
import {
  trainLogistic,
  mulberry32,
  pca1,
  initMLP,
  mlpTrainStep,
  mlpPredict,
  makeGaussian2D,
  type LinPoint,
  type MLPParams,
} from '../lib/ml';

const INK = '#1A1714';
const RUST = '#C2410C';
const TEAL = '#0F766E';
const GOLD = '#D4A017';
const PAPER = '#F6F1E7';

/* ================================ typewriter ================================ */

function useTypewriter(lines: string[], typingMs = 46, pauseMs = 1500) {
  const [text, setText] = useState('');
  useEffect(() => {
    let line = 0;
    let textC = '';
    let phase: 'typing' | 'pausing' | 'deleting' = 'typing';
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const interval = phase === 'typing' ? typingMs : phase === 'deleting' ? 20 : pauseMs;
      if (now - last >= interval) {
        last = now;
        if (phase === 'typing') {
          textC = lines[line].slice(0, textC.length + 1);
          setText(textC);
          if (textC.length >= lines[line].length) phase = 'pausing';
        } else if (phase === 'pausing') {
          phase = 'deleting';
        } else {
          textC = textC.slice(0, -1);
          setText(textC);
          if (textC.length === 0) {
            line = (line + 1) % lines.length;
            phase = 'typing';
          }
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [lines, typingMs, pauseMs]);
  return text;
}

/* =================================== HOME =================================== */

const TYPE_LINES = [
  'building agentic AI systems',
  'recovering corrupted satellite telemetry',
  'modeling claims risk at scale',
  'shipping LLM pipelines to production',
];

export default function Home() {
  const typed = useTypewriter(TYPE_LINES);

  return (
    <main>
      <section className="relative overflow-hidden border-b-2 border-ink">
        <div className="verticals absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6 lg:pt-14">
          <div className="relative z-10 flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-rust">
                Field notes · Data Science · ML Engineering
              </span>
              <span className="hidden h-px w-24 bg-ink/40 sm:block" aria-hidden="true" />
            </div>

            <h1 className="mt-5 font-serif text-[2.9rem] font-black leading-[0.98] tracking-tight text-ink sm:text-7xl xl:text-[5.2rem]">
              Turning messy data into{' '}
              <em className="relative inline-block text-rust">
                measurable
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 14" fill="none" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M3 10.5 C 60 3, 180 3, 297 8.5" stroke="#1A1714" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </em>{' '}
              outcomes<span className="text-rust">.</span>
            </h1>

            <p className="mt-6 max-w-xl font-mono text-[13px] leading-relaxed text-inksoft sm:text-sm">
              <span className="text-ink">hi, i'm jayesh.</span>{' '}
              <span>
                {typed}
                <span className="caret -mb-1 ml-0.5 inline-block h-[1em] w-[8px] bg-rust align-middle" />
              </span>{' '}
              — from agentic workflows to deep-learning models, always at the intersection of{' '}
              <span className="font-semibold text-ink">does it work?</span> and{' '}
              <span className="font-semibold text-ink">does it matter?</span>
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#notebook"
                className="press group inline-flex items-center gap-2 border-2 border-ink bg-rust px-6 py-3 font-mono text-[13px] uppercase tracking-[0.14em] text-paper shadow-[4px_4px_0_0_var(--color-ink)]"
              >
                Run the notebooks
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <Link
                to="/resume"
                className="press inline-flex items-center gap-2 border-2 border-ink bg-paper px-6 py-3 font-mono text-[13px] uppercase tracking-[0.14em] text-ink shadow-[4px_4px_0_0_var(--color-ink)]"
              >
                Download résumé <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 font-mono text-[12.5px] text-inksoft hover:text-ink">
                <Mail className="h-4 w-4 text-rust" /> {EMAIL}
              </a>
              <span className="flex items-center gap-2 font-mono text-[12.5px] text-inksoft">
                <MapPin className="h-4 w-4 text-rust" /> {LOCATION}
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[380px] lg:max-w-none">
            <div className="absolute -inset-3 rotate-[-1.2deg] rounded-sm border-2 border-ink/15" aria-hidden="true" />
            <div className="relative border-2 border-ink bg-paper shadow-[7px_7px_0_0_var(--color-ink)]">
              <PortraitArt className="block w-full" />
              <div className="tape absolute -top-4 left-1/2 h-8 w-28 -translate-x-1/2 rotate-[-2deg]" aria-hidden="true" />
            </div>
            <Stamp className="absolute -right-3 -top-6 bg-paper sm:-right-8">Available for new reqs</Stamp>
          </div>
        </div>

        <div className="relative border-t-2 border-ink bg-cream">
          <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-ink sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-cream px-5 py-6">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-serif text-3xl font-black tracking-tight text-rust sm:text-4xl">{s.value}</dd>
                <dd className="mt-1 font-mono text-[10.5px] uppercase leading-snug tracking-[0.14em] text-inksoft">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Marquee items={['Logistic Regression', 'Gradient Descent', 'k-NN', 'K-Means', 'PCA', 'Naive Bayes', 'MLP', 'GLMs', 'LangGraph', 'Time Series']} />

      {/* ============================== ABOUT ============================== */}
      <section id="about" className="relative border-b-2 border-ink">
        <div className="dotfield absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
          <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-rust">01 · About</p>
          <div className="mt-4 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <h2 className="font-serif text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">A quick intro.</h2>
              <div className="ruled mt-7 space-y-5 text-[15.5px] leading-[2.3] text-inksoft">
                <p>
                  I'm a data scientist and ML engineer based in the Bay Area. I've spent five years
                  working across enterprise analytics, applied deep learning, and production AI
                  systems — always at the intersection of{' '}
                  <span className="bg-cream px-1 font-semibold text-ink">does this actually work?</span>{' '}
                  and{' '}
                  <span className="bg-cream px-1 font-semibold text-ink">does this actually matter?</span>
                </p>
                <p>
                  At <span className="font-semibold text-ink">C5i</span>, I worked with Fortune 500
                  teams on customer segmentation, marketing mix modeling, and A/B testing — the
                  kind of work where a well-framed question matters more than a complex model.
                  At <span className="font-semibold text-ink">Aurora Engineering</span>, I shifted
                  to spaceflight telemetry for NASA's MMS mission, building pipelines to recover
                  missing data from satellite instruments. Most recently at{' '}
                  <span className="font-semibold text-ink">Skan AI</span>, I've been building
                  agentic AI systems, LLM pipelines, and multi-agent architectures.
                </p>
                <p>
                  I have a Master's in Data Science from UConn. What I care about most is solving
                  problems that sit at the intersection of data, product thinking, and
                  decision-making — and shipping solutions that hold up in the real world.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {['UConn MS, Data Science — GPA 3.78', 'B.E. Computer Engineering, U. Mumbai'].map((c) => (
                  <span key={c} className="ink-border-tight inline-flex items-center bg-paper px-3.5 py-2 font-mono text-[11.5px] uppercase tracking-[0.08em]">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <aside className="ink-border relative bg-navy p-8 text-paper md:p-10">
              <p className="dotfield-light absolute inset-0 opacity-25" aria-hidden="true" />
              <div className="relative">
                <span className="font-serif text-7xl font-black leading-none text-rustbright" aria-hidden="true">“</span>
                <blockquote className="-mt-6 font-serif text-2xl font-bold leading-snug md:text-[1.7rem]">
                  A well-framed question matters more than a complex model.
                </blockquote>
                <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-paper/60">
                  — the working principle behind every engagement
                </p>
                <div className="mt-8 grid grid-cols-3 gap-px border-2 border-paper/25 bg-paper/25">
                  {[
                    ['Fortune 500', 'client teams'],
                    ['NASA MMS', 'telemetry mission'],
                    ['UConn', 'MS Data Science'],
                  ].map(([a, b]) => (
                    <div key={a} className="bg-navy px-3 py-4 text-center">
                      <p className="font-serif text-lg font-black text-gold">{a}</p>
                      <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-paper/60">{b}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ============================== NOTEBOOK ============================== */}
      <section id="notebook" className="relative border-b-2 border-ink bg-paper">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
          <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-rust">02 · Notebook</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-4xl font-black leading-[1.02] tracking-tight md:text-5xl">
              Four models. <span className="italic text-rust">Zero</span> abandoned notebooks.
            </h2>
            <p className="max-w-sm font-mono text-[12px] leading-relaxed text-inksoft">
              Every model below trains live in your browser — gradient descent, k-means, PCA, and a
              from-scratch MLP. Drag points. Watch loss curves move.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <NotebookCell index="A" title="Logistic Regression" subtitle="Binary classifier · gradient descent from scratch" blurb="The model behind a million churn predictions — trained here, live, with hand-rolled gradient descent. Drag a point across the line to flip its label." accent="rust">
              <LogisticDemo />
            </NotebookCell>
            <NotebookCell index="B" title="K-Means" subtitle="Clustering · k-means++ seeding" blurb="Given pure noise, this finds three segments. Drag an × centroid and watch every assignment — and color — react in real time." accent="navy">
              <KmeansDemo />
            </NotebookCell>
            <NotebookCell index="C" title="PCA" subtitle="Dimensionality reduction · first principal component" blurb="The first principal component is the direction of maximum variance. The scatter projects onto that direction in the strip below, live." accent="teal">
              <PcaDemo />
            </NotebookCell>
            <NotebookCell index="D" title="MLP from Scratch" subtitle="2 → 16 → 8 → 1 · backprop on a micro-batch" blurb="A tiny multilayer perceptron with hand-written backpropagation — the math libraries hide from you. Press run and watch the loss curve fall." accent="gold">
              <MlpDemo />
            </NotebookCell>
          </div>
        </div>
      </section>

      {/* ============================== WORK ============================== */}
      <section id="work" className="relative border-b-2 border-ink bg-cream">
        <div className="dotfield absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
          <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-rust">03 · Experience</p>
          <h2 className="mt-4 font-serif text-4xl font-black leading-[1.02] tracking-tight md:text-5xl">Where I've worked.</h2>
          <ol className="mt-12 space-y-6">
            {JOBS.map((j) => (
              <JobCard key={j.org + j.role} job={j} />
            ))}
          </ol>
        </div>
      </section>

      {/* ============================== HONORS ============================== */}
      <section id="honors" className="border-b-2 border-ink">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
          <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-rust">04 · Honors</p>
          <h2 className="mt-4 font-serif text-4xl font-black leading-[1.02] tracking-tight md:text-5xl">Highlights.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {ACHIEVEMENTS.map((a) => (
              <article key={a.title} className="ink-border group relative flex flex-col bg-paper p-6 transition-transform hover:-translate-y-1">
                {a.stat && (
                  <span className="hard-shadow-sm absolute -right-3 -top-3 rotate-6 border-2 border-ink bg-gold px-2.5 py-1.5 font-mono text-xs font-bold uppercase tracking-widest">
                    {a.stat.value}
                  </span>
                )}
                <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-rust">{a.org}</p>
                <h3 className="mt-3 font-serif text-xl font-black leading-tight">{a.title}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-inksoft">{a.headline}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-inksoft">{a.body}</p>
                {a.link && (
                  <a
                    href={a.link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11.5px] uppercase tracking-[0.16em] text-rust hover:underline"
                  >
                    {a.link.label} <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== TOOLBOX ============================== */}
      <section id="toolbox">
        <div className="bg-navy text-paper">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24">
            <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-rustbright">05 · Toolbox</p>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-serif text-4xl font-black leading-[1.02] tracking-tight md:text-5xl">Tools I reach for to ship.</h2>
              <p className="max-w-sm font-mono text-[12px] leading-relaxed text-paper/60">
                From classical ML and statistics to modern agentic AI stacks and production infrastructure.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {SKILLS.map((g) => (
                <div key={g.group} className="border-t-2 border-rustbright pt-4">
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold">{g.group}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((it) => (
                      <li key={it}>
                        <span className="inline-block border border-paper/25 px-2.5 py-1 font-mono text-[11px] tracking-wide text-paper/85 transition-colors hover:border-rustbright hover:text-paper">
                          {it}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================== CONTACT CTA ============================== */}
      <section id="contact" className="relative overflow-hidden">
        <div className="bg-rust">
          <div className="dotfield-light absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-4 py-14 sm:px-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-paper/80">06 · Say hi</p>
              <h2 className="mt-3 font-serif text-3xl font-black leading-[1.05] tracking-tight text-paper sm:text-4xl">
                Let's build something that holds up, together.
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/85">
                Roles, projects, collaborations — my inbox is open and I read everything.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 border-2 border-ink bg-paper px-6 py-3.5 font-mono text-[13px] uppercase tracking-[0.14em] text-ink shadow-[4px_4px_0_0_var(--color-ink)]"
              >
                <Mail className="h-4 w-4 text-rust" /> Email me
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border-2 border-paper bg-transparent px-6 py-3.5 font-mono text-[13px] uppercase tracking-[0.14em] text-paper"
              >
                Contact <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================================ subcomponents ================================ */

function NotebookCell({
  index,
  title,
  subtitle,
  blurb,
  accent,
  children,
}: {
  index: string;
  title: string;
  subtitle: string;
  blurb: string;
  accent: 'rust' | 'navy' | 'teal' | 'gold';
  children: React.ReactNode;
}) {
  const accentMap = {
    rust: 'bg-rust text-paper',
    navy: 'bg-navy text-paper',
    teal: 'bg-teal text-paper',
    gold: 'bg-gold text-ink',
  } as const;
  return (
    <article className="ink-border flex flex-col bg-paper">
      <div className="flex items-center justify-between border-b-2 border-ink px-5 py-3">
        <div className="flex items-center gap-3">
          <span className={`inline-flex h-7 w-7 items-center justify-center border-2 border-ink font-mono text-xs font-bold ${accentMap[accent]}`}>
            {index}
          </span>
          <div>
            <h3 className="font-serif text-lg font-black leading-none tracking-tight">{title}</h3>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-inksoft">{subtitle}</p>
          </div>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-inksoft">live demo</span>
      </div>
      <div className="border-b-2 border-ink bg-cream px-5 py-3">
        <p className="text-[13px] leading-relaxed text-inksoft">{blurb}</p>
      </div>
      {children}
    </article>
  );
}

function JobCard({ job }: { job: Job }) {
  return (
    <li className="ink-border bg-paper p-6 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-rust">
            {job.org} · {job.period}
          </p>
          <h3 className="mt-2 font-serif text-2xl font-black tracking-tight md:text-[1.7rem]">{job.role}</h3>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-inksoft">{job.summary}</p>
        </div>
        {job.current && (
          <span className="flex items-center gap-2 border-2 border-ink bg-teal px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-paper">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-paper opacity-70" />
              <span className="relative h-2 w-2 rounded-full bg-paper" />
            </span>
            Current
          </span>
        )}
      </div>
      <ul className="mt-5 space-y-2.5">
        {job.points.map((p) => (
          <li key={p} className="flex gap-3 text-sm leading-relaxed text-inksoft">
            <span className="mt-[7px] h-2 w-2 shrink-0 rotate-45 bg-rust" aria-hidden="true" />
            {p}
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap gap-2">
        {job.tags.map((t) => (
          <span key={t} className="border border-ink/40 bg-cream px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-inksoft">
            {t}
          </span>
        ))}
      </div>
    </li>
  );
}

/* ================================ LIVE DEMOS ================================ */

function DemoFrame({ children, footer }: { children: React.ReactNode; footer: React.ReactNode }) {
  return (
    <div className="bg-paper">
      {children}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t-2 border-ink bg-cream px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em]">
        {footer}
      </div>
    </div>
  );
}

function grid(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.strokeStyle = 'rgba(26,23,20,0.08)';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 8; i++) {
    ctx.beginPath();
    ctx.moveTo((i / 8) * w, 0);
    ctx.lineTo((i / 8) * w, h);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, (i / 8) * h);
    ctx.lineTo(w, (i / 8) * h);
    ctx.stroke();
  }
}

/* --------------------------- logistic regression --------------------------- */

const LOG_R = 5;

function LogisticDemo() {
  const [pts, setPts] = useState<LinPoint[]>(() => {
    const rng = mulberry32(42);
    const out: LinPoint[] = [];
    for (let i = 0; i < 60; i++) {
      const lab = i < 33 ? 0 : 1;
      out.push({ x: -4.4 + rng() * 8.8, y: lab });
    }
    // make the classes separable-ish so the line starts somewhere interesting
    for (let i = 0; i < out.length; i++) {
      if (out[i].y === 0 && out[i].x > -0.4 + (i % 5) * 0.25) out[i].x = -4.4 + rng() * 3.4;
      if (out[i].y === 1 && out[i].x < 0.6 - (i % 5) * 0.2) out[i].x = 0.9 + rng() * 3.4;
    }
    return out;
  });

  const result = useMemo(() => trainLogistic(pts, 800, 0.35), [pts]);
  const xv = Math.abs(result.w) > 1e-6 ? -result.b / result.w : 0;

  const toPx = (x: number, w: number) => ((x + LOG_R) / (2 * LOG_R)) * w;
  const rowY = (lab: number) => (lab === 1 ? 0.72 : 0.28);
  const jitter = (i: number) => (((i * 37) % 19) / 19 - 0.5) * 0.12;

  return (
    <DemoFrame
      footer={
        <>
          <span>
            acc <span className="font-bold text-rust">{(result.acc * 100).toFixed(1)}%</span>
          </span>
          <span>
            w <span className="font-bold">{result.w.toFixed(2)}</span> · b <span className="font-bold">{result.b.toFixed(2)}</span>
          </span>
          <span className="text-inksoft">drag a point to re-label it</span>
        </>
      }
    >
      <Canvas2D
        className="block h-72 w-full cursor-crosshair"
        draw={(ctx, w, h) => {
          ctx.fillStyle = PAPER;
          ctx.fillRect(0, 0, w, h);
          grid(ctx, w, h);
          ctx.strokeStyle = RUST;
          ctx.lineWidth = 3;
          ctx.setLineDash([10, 8]);
          ctx.beginPath();
          ctx.moveTo(toPx(xv, w), 0);
          ctx.lineTo(toPx(xv, w), h);
          ctx.stroke();
          ctx.setLineDash([]);
          // class labels
          ctx.fillStyle = 'rgba(26,23,20,0.25)';
          ctx.font = '700 20px "IBM Plex Mono", monospace';
          ctx.fillText('y = 1', w - 60, rowY(1) * h - 26);
          ctx.fillText('y = 0', w - 60, rowY(0) * h + 40);
          pts.forEach((p, i) => {
            const px = toPx(p.x, w);
            const py = (rowY(p.y) + jitter(i)) * h;
            ctx.beginPath();
            ctx.arc(px, py, 7, 0, Math.PI * 2);
            ctx.fillStyle = p.y === 1 ? RUST : INK;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = PAPER;
            ctx.stroke();
          });
        }}
        onPointer={(_e, x, y, w, h) => {
          let best = -1;
          let bestD = 36;
          pts.forEach((p, i) => {
            const px = toPx(p.x, w);
            const py = (rowY(p.y) + jitter(i)) * h;
            const d = Math.hypot(px - x, py - y);
            if (d < bestD) {
              bestD = d;
              best = i;
            }
          });
          if (best >= 0) {
            setPts((old) =>
              old.map((p, i) =>
                i === best
                  ? { x: Math.max(-LOG_R + 0.3, Math.min(LOG_R - 0.3, (x / w) * 2 * LOG_R - LOG_R)), y: y < h / 2 ? 1 : 0 }
                  : p,
              ),
            );
          }
        }}
      />
    </DemoFrame>
  );
}

/* --------------------------------- k-means --------------------------------- */

const KM_R = 4.6;

function KmeansDemo() {
  const [pts] = useState(() => makeGaussian2D(5, 42));
  const [centroids, setCentroids] = useState<[number, number][]>([
    [-2.5, -1.2],
    [2.2, -1.4],
    [0.1, 2.3],
  ]);
  const colors = [RUST, TEAL, GOLD];

  const assign = pts.map((p) => {
    let best = 0;
    let bd = Infinity;
    centroids.forEach((c, ci) => {
      const d = (p.x[0] - c[0]) ** 2 + (p.x[1] - c[1]) ** 2;
      if (d < bd) {
        bd = d;
        best = ci;
      }
    });
    return best;
  });

  const toPx = (x: number[], w: number, h: number): [number, number] => [
    ((x[0] + KM_R) / (2 * KM_R)) * w,
    (1 - (x[1] + KM_R) / (2 * KM_R)) * h,
  ];

  return (
    <DemoFrame
      footer={
        <>
          <span>
            clusters <span className="font-bold text-rust">3</span> · points{' '}
            <span className="font-bold">{pts.length}</span>
          </span>
          <span className="text-inksoft">drag an × to move a centroid</span>
        </>
      }
    >
      <Canvas2D
        className="block h-72 w-full cursor-crosshair"
        draw={(ctx, w, h) => {
          ctx.fillStyle = PAPER;
          ctx.fillRect(0, 0, w, h);
          grid(ctx, w, h);
          centroids.forEach((c, ci) => {
            const [cx, cy] = toPx(c, w, h);
            const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 150);
            grad.addColorStop(0, colors[ci] + '33');
            grad.addColorStop(1, colors[ci] + '00');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(cx, cy, 150, 0, Math.PI * 2);
            ctx.fill();
          });
          pts.forEach((p, i) => {
            const [px, py] = toPx(p.x, w, h);
            ctx.beginPath();
            ctx.arc(px, py, 6, 0, Math.PI * 2);
            ctx.fillStyle = colors[assign[i]];
            ctx.fill();
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = INK;
            ctx.stroke();
          });
          centroids.forEach((c, ci) => {
            const [cx, cy] = toPx(c, w, h);
            ctx.strokeStyle = INK;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(cx - 10, cy - 10);
            ctx.lineTo(cx + 10, cy + 10);
            ctx.moveTo(cx + 10, cy - 10);
            ctx.lineTo(cx - 10, cy + 10);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(cx, cy, 14, 0, Math.PI * 2);
            ctx.strokeStyle = colors[ci];
            ctx.lineWidth = 3;
            ctx.stroke();
          });
        }}
        onPointer={(_e, x, y, w, h) => {
          let best = -1;
          let bestD = 30;
          centroids.forEach((c, ci) => {
            const [cx, cy] = toPx(c, w, h);
            const d = Math.hypot(cx - x, cy - y);
            if (d < bestD) {
              bestD = d;
              best = ci;
            }
          });
          if (best >= 0) {
            setCentroids((old) => {
              const next = old.map((c) => [...c] as [number, number]);
              next[best] = [
                Math.max(-KM_R, Math.min(KM_R, (x / w) * 2 * KM_R - KM_R)),
                Math.max(-KM_R, Math.min(KM_R, (1 - y / h) * 2 * KM_R - KM_R)),
              ];
              return next;
            });
          }
        }}
      />
    </DemoFrame>
  );
}

/* ------------------------------------ PCA ------------------------------------ */

const PCA_R = 6.5;

function PcaDemo() {
  const [pts] = useState(() =>
    makeGaussian2D(9, 40).map((p) => ({
      x: [p.x[0] + p.x[1] * 1.4, p.x[1] * 0.45] as [number, number],
      y: p.y,
    })),
  );
  const pca = useMemo(() => pca1(pts.map((p) => ({ x: p.x }))), [pts]);

  const toPx = (x: number[], w: number, h: number): [number, number] => [
    ((x[0] + PCA_R) / (2 * PCA_R)) * w,
    (1 - (x[1] + PCA_R) / (2 * PCA_R)) * h,
  ];

  return (
    <DemoFrame
      footer={
        <>
          <span>
            PC1 direction <span className="font-bold text-rust">({pca.first.axis[0].toFixed(2)}, {pca.first.axis[1].toFixed(2)})</span>
          </span>
          <span className="text-inksoft">projected onto PC1 ↓</span>
        </>
      }
    >
      <Canvas2D
        className="block h-72 w-full"
        draw={(ctx, w, h) => {
          ctx.fillStyle = PAPER;
          ctx.fillRect(0, 0, w, h);
          grid(ctx, w, h);
          const plotH = h - 40;
          const [mx, my] = toPx(pca.first.mean, w, plotH);
          const L = PCA_R * 1.5;
          const p1: [number, number] = [mx + (pca.first.axis[0] * L * w) / (2 * PCA_R), my + (-pca.first.axis[1] * L * plotH) / (2 * PCA_R)];
          const p2: [number, number] = [mx - (pca.first.axis[0] * L * w) / (2 * PCA_R), my - (-pca.first.axis[1] * L * plotH) / (2 * PCA_R)];
          pts.forEach((p) => {
            const [px, py] = toPx(p.x, w, plotH);
            // projection foot
            const v = (p.x[0] - pca.first.mean[0]) * pca.first.axis[0] + (p.x[1] - pca.first.mean[1]) * pca.first.axis[1];
            const fx = mx + (v * pca.first.axis[0] * w) / (2 * PCA_R);
            const fy = my + (-v * pca.first.axis[1] * plotH) / (2 * PCA_R);
            ctx.strokeStyle = 'rgba(194,65,12,0.28)';
            ctx.lineWidth = 1.25;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(fx, fy);
            ctx.stroke();
          });
          ctx.strokeStyle = RUST;
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.moveTo(p1[0], p1[1]);
          ctx.lineTo(p2[0], p2[1]);
          ctx.stroke();
          pts.forEach((p) => {
            const [px, py] = toPx(p.x, w, plotH);
            ctx.beginPath();
            ctx.arc(px, py, 6, 0, Math.PI * 2);
            ctx.fillStyle = INK;
            ctx.fill();
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = PAPER;
            ctx.stroke();
          });
          ctx.beginPath();
          ctx.arc(mx, my, 7, 0, Math.PI * 2);
          ctx.fillStyle = GOLD;
          ctx.fill();
          ctx.lineWidth = 2.5;
          ctx.strokeStyle = INK;
          ctx.stroke();
          // strip
          const stripY = h - 34;
          ctx.fillStyle = '#EFE7D6';
          ctx.fillRect(0, stripY, w, 34);
          ctx.strokeStyle = INK;
          ctx.beginPath();
          ctx.moveTo(0, stripY);
          ctx.lineTo(w, stripY);
          ctx.stroke();
          pca.projected.forEach((v) => {
            const px = ((v - pca.min) / (pca.max - pca.min + 1e-9)) * w;
            ctx.beginPath();
            ctx.arc(px, stripY + 17, 5, 0, Math.PI * 2);
            ctx.fillStyle = RUST;
            ctx.fill();
            ctx.strokeStyle = PAPER;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          });
        }}
      />
    </DemoFrame>
  );
}

/* ------------------------------------ MLP ------------------------------------ */

const MLP_R = 4.2;

function cloneParams(p: MLPParams): MLPParams {
  return {
    w1: p.w1.map((r) => [...r]),
    b1: [...p.b1],
    w2: p.w2.map((r) => [...r]),
    b2: [...p.b2],
    w3: p.w3.map((r) => [...r]),
    b3: [...p.b3],
  };
}

function MlpDemo() {
  const [data] = useState(() => makeGaussian2D(11, 42).map((p) => ({ x: [p.x[0], p.x[1]], y: p.y })));
  const [params, setParams] = useState<MLPParams>(() => initMLP(11));
  const [loss, setLoss] = useState(0.693);
  const [steps, setSteps] = useState(0);
  const [running, setRunning] = useState(false);
  const historyRef = useRef<number[]>([0.693]);
  const paramsRef = useRef(params);

  useEffect(() => {
    paramsRef.current = params;
  }, [params]);

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    const loop = () => {
      const batch: { x: number[]; y: number }[] = [];
      for (let i = 0; i < 12; i++) batch.push(data[Math.floor(Math.random() * data.length)]);
      const np = cloneParams(paramsRef.current);
      const { loss: l } = mlpTrainStep(np, batch, 0.6);
      setParams(np);
      setLoss(l);
      setSteps((s) => s + 1);
      historyRef.current.push(l);
      if (historyRef.current.length > 240) historyRef.current.shift();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running, data]);

  const toPx = (x: number[], w: number, h: number): [number, number] => [
    ((x[0] + MLP_R) / (2 * MLP_R)) * w,
    (1 - (x[1] + MLP_R) / (2 * MLP_R)) * h,
  ];

  return (
    <DemoFrame
      footer={
        <>
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className="border-2 border-ink bg-ink px-4 py-1.5 font-bold uppercase text-paper"
          >
            {running ? 'Pause' : 'Run'}
          </button>
          <button
            type="button"
            onClick={() => {
              setRunning(false);
              setParams(initMLP(11));
              historyRef.current = [0.693];
              setLoss(0.693);
              setSteps(0);
            }}
            className="border-2 border-ink px-3 py-1.5 font-bold uppercase"
          >
            Reset
          </button>
          <span>
            loss <span className="font-bold text-rust">{loss.toFixed(4)}</span>
          </span>
          <span className="text-inksoft">
            step <span className="font-bold text-ink">{steps}</span>
          </span>
        </>
      }
    >
      <Canvas2D
        className="block h-72 w-full"
        draw={(ctx, w, h) => {
          ctx.fillStyle = PAPER;
          ctx.fillRect(0, 0, w, h);
          grid(ctx, w, h);
          const plotH = h - 40;
          data.forEach((s) => {
            const p = mlpPredict(params, s.x);
            const [px, py] = toPx(s.x, w, plotH);
            ctx.beginPath();
            ctx.arc(px, py, 6, 0, Math.PI * 2);
            ctx.fillStyle = s.y === 1 ? RUST : INK;
            ctx.fill();
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = PAPER;
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(px, py, 9.5, -Math.PI / 2, -Math.PI / 2 + p * Math.PI * 2);
            ctx.strokeStyle = s.y === 1 ? RUST : TEAL;
            ctx.lineWidth = 2;
            ctx.stroke();
          });
          const stripY = h - 34;
          ctx.fillStyle = '#EFE7D6';
          ctx.fillRect(0, stripY, w, 34);
          ctx.strokeStyle = INK;
          ctx.beginPath();
          ctx.moveTo(0, stripY);
          ctx.lineTo(w, stripY);
          ctx.stroke();
          const hist = historyRef.current;
          if (hist.length > 1) {
            const hMin = Math.min(...hist) * 0.94;
            const hMax = Math.max(...hist) * 1.06 + 1e-9;
            ctx.strokeStyle = RUST;
            ctx.lineWidth = 2;
            ctx.beginPath();
            hist.forEach((l: number, i: number) => {
              const px = (i / (hist.length - 1)) * w;
              const py = stripY + 30 - ((l - hMin) / (hMax - hMin)) * 26;
              if (i === 0) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            });
            ctx.stroke();
          }
        }}
      />
    </DemoFrame>
  );
}
