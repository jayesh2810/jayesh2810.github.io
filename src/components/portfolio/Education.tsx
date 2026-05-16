import { GraduationCap } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export function Education() {
  return (
    <section id="education" className="py-20 md:py-28 bg-surface-muted border-y border-border">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary uppercase tracking-widest">Education</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold">Academic background.</h2>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-4">
          {portfolio.education.map((e) => (
            <div
              key={e.degree}
              className="rounded-2xl border border-border bg-surface p-6 shadow-soft"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-lg">{e.degree}</h3>
                  <p className="text-muted-foreground text-sm mt-0.5">{e.school}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                    <span className="text-muted-foreground">{e.period}</span>
                    <span className="text-foreground/90">{e.detail}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
