import { portfolio } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary uppercase tracking-widest">Experience</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold">Where I've worked.</h2>
        </div>

        <div className="mt-12 relative">
          <div className="absolute left-3 md:left-4 top-2 bottom-2 w-px bg-border" />
          <div className="space-y-10">
            {portfolio.experience.map((job) => (
              <article key={`${job.company}-${job.period}`} className="relative pl-12 md:pl-16">
                <span className="absolute left-0 md:left-1 top-1.5 h-6 w-6 md:h-7 md:w-7 rounded-full border border-border bg-surface flex items-center justify-center shadow-soft">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </span>

                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg md:text-xl font-semibold">
                    {job.role}{" "}
                    <span className="text-muted-foreground font-normal">· {job.company}</span>
                  </h3>
                  <span className="text-sm text-muted-foreground">{job.period}</span>
                </div>

                <ul className="mt-4 space-y-2.5">
                  {job.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="text-sm md:text-base text-foreground/85 leading-relaxed pl-4 relative"
                    >
                      <span className="absolute left-0 top-2.5 h-1.5 w-1.5 rounded-full bg-primary/60" />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
