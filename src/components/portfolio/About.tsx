import { portfolio } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container-page grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16">
        <div>
          <p className="text-sm font-medium text-primary uppercase tracking-widest">About</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold">A quick intro.</h2>
        </div>
        <div>
          {portfolio.intro.map((paragraph, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "text-lg leading-relaxed text-foreground/90"
                  : "mt-5 text-lg leading-relaxed text-foreground/90"
              }
            >
              {paragraph}
            </p>
          ))}

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {portfolio.highlights.map((h) => (
              <div
                key={h.label}
                className="rounded-2xl border border-border bg-surface p-5 shadow-soft"
              >
                <div className="font-display text-3xl font-semibold tracking-tight">{h.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{h.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
