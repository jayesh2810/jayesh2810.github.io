import { portfolio } from "@/data/portfolio";
import { TechMarquee } from "./TechMarquee";

export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28 bg-surface-muted border-y border-border">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary uppercase tracking-widest">Skills</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold">
            Tools I reach for to ship.
          </h2>
          <p className="mt-3 text-muted-foreground">
            From classical ML and statistics to modern agentic AI stacks and production
            infrastructure.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-4">
          {portfolio.skills.map((group) => (
            <div
              key={group.category}
              className="rounded-2xl border border-border bg-surface p-6 shadow-soft"
            >
              <h3 className="text-base font-semibold">{group.category}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-border bg-background px-3 py-1 text-sm text-foreground/90 hover:border-primary/50 hover:text-primary transition"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <TechMarquee />
    </section>
  );
}
