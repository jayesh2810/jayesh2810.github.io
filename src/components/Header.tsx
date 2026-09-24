import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, FileDown } from 'lucide-react';
import { JBMark } from './Bits';
import { useActiveSection } from '../hooks/useActiveSection';

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'notebook', label: 'Notebook' },
  { id: 'work', label: 'Work' },
  { id: 'honors', label: 'Honors' },
  { id: 'toolbox', label: 'Toolbox' },
  { id: 'contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV.map((n) => n.id));

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper/92 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3" aria-label="Home">
          <JBMark size={38} />
          <span className="leading-none">
            <span className="block font-serif text-[17px] font-black tracking-tight">Jayesh Bhadane</span>
            <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.22em] text-inksoft">
              Data Scientist · ML Engineer
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`navlink font-mono text-[12.5px] uppercase tracking-[0.14em] ${active === n.id ? 'active text-ink' : 'text-inksoft hover:text-ink'}`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 rounded-full border-2 border-ink bg-cream px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] md:inline-flex">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
            </span>
            Open to opportunities
          </span>
          <Link
            to="/resume"
            className="press hidden items-center gap-2 border-2 border-ink bg-ink px-4 py-2 font-mono text-[12px] uppercase tracking-[0.14em] text-paper shadow-[3px_3px_0_0_var(--color-rust)] sm:inline-flex"
          >
            <FileDown className="h-4 w-4" />
            Resume
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center border-2 border-ink bg-paper lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden border-t-2 border-ink bg-paper lg:hidden"
            aria-label="Mobile"
          >
            <div className="space-y-1 px-4 py-4 sm:px-6">
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className={`block border-b border-ink/15 py-3 font-mono text-sm uppercase tracking-[0.16em] last:border-0 ${active === n.id ? 'text-rust' : 'text-ink'}`}
                >
                  {n.label}
                </a>
              ))}
              <Link
                to="/resume"
                className="mt-2 flex items-center justify-center gap-2 border-2 border-ink bg-ink px-4 py-3 font-mono text-sm uppercase tracking-[0.14em] text-paper"
                onClick={() => setOpen(false)}
              >
                <FileDown className="h-4 w-4" /> Resume
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
