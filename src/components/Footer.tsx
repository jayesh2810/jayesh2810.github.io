import { ArrowUp, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { EMAIL, GITHUB, LINKEDIN, LOCATION, PHONE, PHONE_TEL } from '../data';

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="font-serif text-3xl font-black tracking-tight">
              Jayesh B<span className="text-rustbright">.</span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-paper/70">
              Data scientist &amp; ML engineer building analytics and agentic AI systems that turn
              messy data into measurable outcomes.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-paper/50">Say hi</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 transition-colors hover:text-rustbright">
                  <Mail className="h-4 w-4" /> {EMAIL}
                </a>
              </li>
              <li>
                <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 transition-colors hover:text-rustbright">
                  <Phone className="h-4 w-4" /> {PHONE}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-paper/70">
                <MapPin className="h-4 w-4" /> {LOCATION}
              </li>
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-paper/50">Elsewhere</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={LINKEDIN} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-rustbright">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </li>
              <li>
                <a href={GITHUB} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-rustbright">
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </li>
            </ul>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-6 inline-flex items-center gap-2 border-2 border-paper/60 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors hover:border-paper hover:bg-paper hover:text-ink"
            >
              <ArrowUp className="h-4 w-4" /> Back to top
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-paper/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/50">
            © {new Date().getFullYear()} Jayesh Bhadane · Built with care &amp; receipts
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/50">
            Every demo on this page trains in your browser
          </p>
        </div>
      </div>
    </footer>
  );
}
