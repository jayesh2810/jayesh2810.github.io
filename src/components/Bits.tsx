import type { ReactNode } from 'react';
import { Asterisk } from 'lucide-react';

export function JBMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" fill="#1A1714" rx="8" />
      <rect x="4.5" y="4.5" width="55" height="55" fill="none" stroke="#C2410C" strokeWidth="2.5" rx="5" />
      <text x="32" y="42.5" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontWeight="700" fontSize="30" fill="#F6F1E7">
        JB
      </text>
    </svg>
  );
}

export function SectionHead({
  index,
  kicker,
  title,
  right,
}: {
  index: string;
  kicker: string;
  title: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 border-b-2 border-ink pb-5">
      <div>
        <p className="font-mono text-[11px] tracking-[0.32em] uppercase text-rust">
          {index} · {kicker}
        </p>
        <h2 className="mt-2 font-serif text-4xl md:text-[3.4rem] leading-[1.02] font-black tracking-tight text-ink">
          {title}
        </h2>
      </div>
      {right}
    </div>
  );
}

export function Stamp({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`stamp select-none inline-block px-3.5 py-2 font-mono text-[11px] font-bold uppercase text-rust ${className}`}
    >
      {children}
    </div>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden border-y-2 border-ink bg-ink text-paper">
      <div className="marquee-track flex w-max items-center gap-10 py-3 pr-10">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-mono text-[13px] uppercase tracking-[0.22em] whitespace-nowrap">
            {t}
            <Asterisk className="h-4 w-4 text-rustbright" strokeWidth={2.5} aria-hidden="true" />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Fancy dashed svg divider with an arrow — the "cut here" look */
export function CutLine({ label }: { label?: string }) {
  return (
    <div className="relative my-2 flex items-center gap-4">
      <div className="h-0 flex-1 border-t-2 border-dashed border-ink/50" />
      {label ? (
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-inksoft">{label}</span>
      ) : null}
      <div className="h-0 flex-1 border-t-2 border-dashed border-ink/50" />
    </div>
  );
}
