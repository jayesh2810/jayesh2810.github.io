import { useState } from 'react';
import { ArrowRight, Check, Mail } from 'lucide-react';
import { EMAIL, LINKEDIN, GITHUB, LOCATION } from '../data';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // no backend: open the user's mail client with a prefilled draft (fully functional, no dead ends)
    const subject = encodeURIComponent(`Portfolio inquiry${name ? ` from ${name}` : ''}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-rust">05 · Contact</p>
      <h1 className="mt-4 font-serif text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl">
        Have a role, project, or collaboration in mind?
      </h1>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-inksoft">
        I'm open to ML engineering, data science, and applied AI opportunities. The fastest way to
        reach me is email — I usually reply within a day.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <form onSubmit={submit} className="ink-border bg-paper p-6 md:p-8">
          <div className="flex items-center gap-2 border-b-2 border-ink pb-4">
            <Mail className="h-5 w-5 text-rust" />
            <h2 className="font-serif text-xl font-black tracking-tight">Email me</h2>
          </div>
          <label className="mt-6 block font-mono text-[11px] uppercase tracking-[0.2em] text-inksoft" htmlFor="cf-name">
            Your name
            <input
              id="cf-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full border-2 border-ink bg-cream px-4 py-3 font-sans text-sm outline-none focus:bg-paper"
              placeholder="Ada Lovelace"
              required
            />
          </label>
          <label className="mt-5 block font-mono text-[11px] uppercase tracking-[0.2em] text-inksoft" htmlFor="cf-msg">
            Message
            <textarea
              id="cf-msg"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="mt-2 w-full resize-none border-2 border-ink bg-cream px-4 py-3 font-sans text-sm outline-none focus:bg-paper"
              placeholder="Tell me about the role, project, or dataset…"
              required
            />
          </label>
          <button
            type="submit"
            className="press mt-6 inline-flex items-center gap-2 border-2 border-ink bg-rust px-6 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-paper shadow-[4px_4px_0_0_var(--color-ink)]"
          >
            {sent ? 'Open in mail app — again' : 'Compose an email'} <ArrowRight className="h-4 w-4" />
          </button>
          {sent && (
            <p className="mt-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-teal">
              <Check className="h-4 w-4" /> Drafted — your mail client should be open.
            </p>
          )}
        </form>

        <div className="space-y-5">
          <div className="ink-border bg-navy p-6 text-paper md:p-7">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold">Direct lines</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={`mailto:${EMAIL}`} className="break-all underline decoration-rustbright decoration-2 underline-offset-4 hover:text-rustbright">
                  {EMAIL}
                </a>
              </li>
              <li>{LOCATION}</li>
              <li>
                <a href={LINKEDIN} target="_blank" rel="noreferrer" className="underline decoration-rustbright decoration-2 underline-offset-4 hover:text-rustbright">
                  LinkedIn — /in/jayesh-bhadane
                </a>
              </li>
              <li>
                <a href={GITHUB} target="_blank" rel="noreferrer" className="underline decoration-rustbright decoration-2 underline-offset-4 hover:text-rustbright">
                  GitHub · jayesh2810
                </a>
              </li>
            </ul>
          </div>
          <div className="ink-border bg-cream p-6 md:p-7">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.24em] text-rust">What to expect</h3>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-inksoft">
              <li className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 rotate-45 bg-rust" /> Reply within one business day.</li>
              <li className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 rotate-45 bg-rust" /> For ML roles: a short async screen, then a working session, not a take-home maze.</li>
              <li className="flex gap-2.5"><span className="mt-2 h-1.5 w-1.5 rotate-45 bg-rust" /> I care as much about the framing of your problem as the model you pitch.</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
